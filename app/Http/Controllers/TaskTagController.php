<?php

namespace App\Http\Controllers;

use App\TaskTag;
use Illuminate\Http\Request;

class TaskTagController extends Controller
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
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TaskTag  $taskTag
     * @return \Illuminate\Http\Response
     */
    public function show(TaskTag $taskTag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\TaskTag  $taskTag
     * @return \Illuminate\Http\Response
     */
    public function edit(TaskTag $taskTag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TaskTag  $taskTag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TaskTag $taskTag)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TaskTag  $taskTag
     * @return \Illuminate\Http\Response
     */
    public function destroy(TaskTag $taskTag)
    {
        //
    }
}
