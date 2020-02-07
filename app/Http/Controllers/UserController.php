<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
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

            $request->order = (isset($request->order)) ? $request->order : 'name';

            if ($request->q) {
                $users = User::where('name', 'like', '%' . $request->q . '%')
                            ->orderBy($request->order)
                            ->paginate($request->paginate);
            } else {
                $users = User::orderBy($request->order)
                            ->paginate($request->paginate);
            }

            return response()->json($users);

        } else {

            return view('users.index');

        }
    }

    /**       
    * Get the user hours by week or month
    *
    * @param  Illuminate\Http\Request $request
    * @return Response
    */
    public function hours(Request $request)
    {

        $week = auth()->user()->weekHours();
        $month = auth()->user()->monthHours();

        return response()->json([
            'week' => $week,
            'month' => $month
        ]);
    }

    /**       
    * Get the hours by week or month for all users
    *
    * @return Response
    */
    public function allhours()
    {
        $users = User::orderBy('name')->get();

        $users->map(function($user) {
            $user->week_hours = $user->weekHours();
            $user->month_hours = $user->monthHours();
            return $user;
        });

        return response()->json($users);
    }


    public function board()
    {

        $boards = User::where('id', auth()->user()->id)->with('tasks')->get()->toArray();
        $projects = \App\Project::doesntHave('children')->orWhere('parent_id', '!=', null)->select('id', 'parent_id', 'name')->with('parent')->get();

        $projects->map(function($project) {
            $project->name = ($project->parent) ? $project->parent->name . ' - ' . $project->name : $project->name;
            return $project;
        });

        return response()->json([
            'boards' => $boards,
            'projects' => $projects
        ]);

    }

    public function create()
    {
        return view('users.create');
    }



    public function store(Request $request) {

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'newpassword' => ['required', 'string', 'min:6'],
        ]);

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->newpassword);

        $user->save();
   
        return response()->json($user);
    }

    public function update(Request $request, User $user) {

        $user->name = $request->name;
        $user->email = $request->email;
        $user->is_admin = $request->is_admin;
        $user->visible_in_tasks = $request->visible_in_tasks;

        if (isset($request->newpassword) && !empty($request->newpassword)) {
            $user->password = Hash::make($request->newpassword);
        }

        $user->save();

        return response()->json($user);
    }


}
