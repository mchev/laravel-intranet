<?php

namespace App\Http\Controllers;

use App\Hour;
use Illuminate\Http\Request;

class HourController extends Controller
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

            if ($request->project !== 'null')
            {
                $hours = Hour::where('project_id', $request->project)
                    ->orderBy('date', 'DESC')
                    ->with('user')
                    ->paginate($request->paginate);

            } 
            else if ($request->q)
            {
                $hours = Hour::where('user_id', auth()->user()->id)
                    ->where('date', 'like', '%' . $request->q . '%')
                    ->orWhereHas('project', function ($query) use ($request) {
                        $query->where('name', 'like', '%' . $request->q . '%')
                            ->orWhereHas('customer', function ($query) use ($request) {
                                $query->where('name', 'like', '%' . $request->q . '%');
                            });
                    })
                    ->orWhereHas('user', function ($query) use ($request) {
                        $query->where('name', 'like', '%' . $request->q . '%');
                    })
                    ->orderBy('date', 'DESC')
                    ->orderBy('updated_at', 'DESC')
                    ->with('project')
                    ->with('user')
                    ->paginate($request->paginate);
            }
            else
            {
                $hours = Hour::where('user_id', auth()->user()->id)
                    ->orderBy('date', 'DESC')
                    ->orderBy('updated_at', 'DESC')
                    ->with('project')
                    ->with('user')
                    ->paginate($request->paginate);
            }

            return response()->json($hours);

        } else {

            return view('hours.index');

        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $projects = \App\Project::all();

        return view('hours.create', compact('projects'));

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
            'project_id' => 'required|integer',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i:s'
        ]);

        $hour = new Hour;

        $hour->user_id = auth()->user()->id;
        $hour->project_id = $request->project_id;
        $hour->date = $request->date;
        $hour->time = $request->time;
        $hour->comment = $request->comment;

        $hour->save();

        $hour->project; // With the project object

        return response()->json($hour);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Hour  $hour
     * @return \Illuminate\Http\Response
     */
    public function show(Hour $hour)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Hour  $hour
     * @return \Illuminate\Http\Response
     */
    public function edit(Hour $hour)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Hour  $hour
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Hour $hour)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Hour  $hour
     * @return \Illuminate\Http\Response
     */
    public function destroy(Hour $hour)
    {
        //
    }
}
