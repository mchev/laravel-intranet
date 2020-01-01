<?php

namespace App\Http\Controllers;

use App\Password;
use Illuminate\Http\Request;

class PasswordController extends Controller
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
                $passwords = Password::where('name', 'like', '%' . $request->q . '%')
                    ->orWhere('url', 'like', '%' . $request->q . '%')
                    ->orWhereHas('customer', function ($query) use ($request) {
                        $query->where('name', 'like', '%' . $request->q . '%');
                    })
                    ->orderBy($request->order)
                    ->with('customer')
                    ->paginate($request->paginate);
            } else {
                $passwords = Password::orderBy($request->order)
                    ->with('customer')
                    ->paginate($request->paginate);
            }

            return response()->json($passwords);

        } else {

            return view('passwords.index');

        }
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
            'customer_id' => 'required|integer',
            'type' => 'required|string',
        ]);

        $password = Password::create($request->all());

        $password->customer;

        return response()->json($password);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Password  $password
     * @return \Illuminate\Http\Response
     */
    public function edit(Password $password)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Password  $password
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Password $password)
    {
        $password->name = $request->name;
        $password->url = $request->url;
        $password->user = $request->user;
        $password->password = $request->password;
        $password->save();
        
        return response()->json('Password edited');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Password  $password
     * @return \Illuminate\Http\Response
     */
    public function destroy(Password $password)
    {
        $password->delete();
    }
}
