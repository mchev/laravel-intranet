<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class BoardController extends Controller
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


    public function index(Request $request) {

        if($request->ajax()){

        	$boards = User::with('tasks')->orderBy('name')->get()->toArray();
            $projects = \App\Project::select('id', 'customer_id', 'name')->with('customer')->get();

            $projects->map(function($project) {
                $project->name = $project->customer->name . ' - ' . $project->name;
                return $project;
            });

            return response()->json([
            	'boards' => $boards,
            	'projects' => $projects
            ]);

        } else {

            return view('tasks.index');

        }

    }

    public function tasks($id)
    {

        $tasks = User::findOrFail($id)->tasks()->orderBy('order', 'ASC')->orderBy('updated_at', 'DESC')->get();

        return response()->json($tasks);
    }

}