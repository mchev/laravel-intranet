<?php

namespace App\Http\Controllers;

use App\Hour;
use Carbon\Carbon;
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

            $start = ($request->start == 'undefined') ? null : Carbon::parse($request->start)->startOfDay();
            $end = ($request->end == 'undefined') ? null : Carbon::parse($request->end)->endOfDay();

            if ($request->project !== 'null')
            {
                $hours = Hour::where('project_id', $request->project)
                    ->whereBetween('date', [$start, $end])
                    ->whereHas('user', function ($query) use ($request) {
                        $query->where('name', 'like', '%' . $request->q . '%');
                    })
                    ->orderBy('date', 'DESC')
                    ->with('user')
                    ->get();

            } 
            else if ($request->q)
            {
                $hours = Hour::whereBetween('date', [$start, $end])
                    ->whereHas('user', function ($query) use ($request) {
                        $query->where('name', 'like', '%' . $request->q . '%');
                    })
                    ->orderBy('date', 'DESC')
                    ->orderBy('updated_at', 'DESC')
                    ->with('project')
                    ->with('user')
                    ->get();
            }
            else
            {
                $hours = Hour::whereBetween('date', [$start, $end])
                    ->orderBy('date', 'DESC')
                    ->orderBy('updated_at', 'DESC')
                    ->with('project')
                    ->with('user')
                    ->get();
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
            'date' => 'required|date'
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Hour  $hour
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Hour $hour)
    {
        $hour->project_id = $request->project_id;
        $hour->date = $request->date;
        $hour->time = $request->time;
        $hour->comment = $request->comment;
        $hour->update();
        return response()->json($hour);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Hour  $hour
     * @return \Illuminate\Http\Response
     */
    public function destroy(Hour $hour)
    {
        $hour->delete();
    }
}
