<?php

namespace App\Http\Controllers;

use App\Project;
use App\ProjectFile;
use App\Customer;
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
                    ->with('projects')
                    ->paginate($request->paginate);
            }

            return response()->json($projects);

        } else {

            return view('projects.index');

        }
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

        $project = new Project;

        $project->name = $request->name;
        $project->description = $request->description;
        $project->type_id = $request->type_id;
        $project->state_id = $request->state_id;
        $project->customer_id = $request->customer_id;
        $project->budget = $request->budget;
        $project->user_id = auth()->user()->id;

        $project->save();

        /*
        $project_file = new ProjectFile;
        $project_file->project_id = $project->id;
        $project_file->title = $project->name;
        $project_file->opened_at = $project->created_at;
        $project_file->state_id = 1;
        $project_file->save();
        */
   
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
