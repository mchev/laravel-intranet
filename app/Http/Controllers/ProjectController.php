<?php

namespace App\Http\Controllers;

use App\Project;
use App\ProjectFile;
use App\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProjectController extends Controller
{


    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }


     /**       
     * Display a listing of the resource.
     *
     * @param  Illuminate\Http\Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        if($request->ajax()){

            if ($request->q) {
                $projects = Customer::where('name', 'like', '%' . $request->q . '%')
                    ->orWhereHas('projects', function ($query) use ($request) {
                        $query->where('name', 'like', '%' . $request->q . '%');
                    })
                    ->orWhereHas('projects', function ($query) use ($request) {
                        $query->where('ref', 'like', '%' . $request->q . '%');
                    })
                    ->orderBy($request->order)
                    ->with('projects')
                    ->paginate($request->paginate);
            } else {
                $projects = Customer::orderBy('name')
                    ->orderBy($request->order)
                    ->whereHas('projects')
                    ->with('projects')
                    ->paginate($request->paginate);
            }

            return response()->json($projects);

        } else {

            return view('projects.index');

        }
    }

    public function archives(Request $request)
    {

        $projects = Project::onlyTrashed()->orderBy('deleted_at', 'DESC')->with('customer')->paginate(10);
        return view('projects.archives', compact('projects'));

    }

    public function billable(Request $request)
    {
        setlocale(LC_TIME, 'fr_FR');

        $files = ProjectFile::whereHas('project')
                    ->where('closed_at', NULL)
                    ->where('estimated_facturation_date', '!=', NULL)
                    ->with('project')
                    ->orderBy('estimated_facturation_date')
                    ->get()
                    ->sortBy(function ($file) {
                        return $file->project->customer->name;
                    });

        foreach ($files as $file) {
            $date = new Carbon($file['estimated_facturation_date']);
            $months[$date->formatLocalized('%B')][] = $file;
        }

        return view('projects.billable', compact('months'));

    }

    public function restore($id)
    {
        $project = Project::withTrashed()->findOrFail($id);
        $project->restore();
        return redirect()->route('projects.edit', [$project]);
    }


    public function list()
    {
        $projects = Project::with('customer')
                            ->select('id', 'customer_id', 'name', \DB::raw('(SELECT name FROM customers WHERE projects.customer_id = customers.id ) as customer_name'))
                            ->orderBy('customer_name')
                            ->orderBy('name')
                            ->get();

        $projects->map(function($project) {
            $project->name = $project->customer->name . ' - ' . $project->name;
            return $project;
        })->sortBy('name');

        return response()->json($projects);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        $types = \App\Type::all();
        $states = \App\State::all();
        $customers = \App\Customer::orderBy('name')->get();

        return view('projects.create', compact('types', 'states', 'customers'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'type_id' => 'required|integer',
            'state_id' => 'required|integer',
            'customer_id' => 'required|integer'
        ]);

        // Project reference based on YEAR and MONTH
        $ref_prefix = date('y') . date('m');
        $new_month = $ref_prefix . '01';

        $latest_ref = Project::select('ref')
                            ->withTrashed()
                            ->where(\DB::raw('substr(ref, 1, 4)'), '=', $ref_prefix)
                            ->orderBy('ref', 'DESC')
                            ->first();
        $ref = ( $latest_ref ) ? intval($latest_ref->ref) + 1 : $new_month;

        $project = new Project;

        $project->name = $request->name;
        $project->description = $request->description;
        $project->type_id = $request->type_id;
        $project->state_id = $request->state_id;
        $project->customer_id = $request->customer_id;
        $project->budget = $request->budget;
        $project->user_id = auth()->user()->id;
        $project->ref = intval($ref);

        $project->save();

        // Create associated project file
        $project_file = new ProjectFile;
        $project_file->project_id = $project->id;
        $project_file->title = $project->name;
        $project_file->opened_at = $project->created_at;
        $project_file->state_id = 1;
        $project_file->save();
   
        return redirect()->route('projects.edit', $project);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        return redirect()->route('projects.edit', [$project]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {

        $types = \App\Type::all();
        $states = \App\State::all();
        $customers = \App\Customer::orderBy('name')->get();

        return view('projects.edit', compact('project', 'customers', 'types', 'states'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        $request->validate([
            'ref' => 'required|integer',
            'name' => 'required|max:255',
            'type_id' => 'required|integer',
            'state_id' => 'required|integer',
            'customer_id' => 'required|integer'
        ]);

        $project->ref = $request->ref;
        $project->name = $request->name;
        $project->description = $request->description;
        $project->type_id = $request->type_id;
        $project->state_id = $request->state_id;
        $project->customer_id = $request->customer_id;
        $project->budget = $request->budget;

        $project->save();
   
        return redirect()->route('projects.edit', [$project])->with('success', 'Le projet a été modifié.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index');
    }
}
