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
                $users = User::where('name', 'like', '%' . $request->q . '%')->orderBy($request->order)->paginate($request->paginate);
            } else {
                $users = User::orderBy($request->order)->paginate($request->paginate);
            }

            return response()->json($users);

        } else {

            return view('users.index');

        }
    }

    public function board() {

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

    public function create() {
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

        if (isset($request->newpassword) && !empty($request->newpassword)) {
            $user->password = Hash::make($request->newpassword);
        }

        $user->save();

        return response()->json($user);
    }


}
