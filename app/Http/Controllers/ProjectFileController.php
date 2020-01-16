<?php

namespace App\Http\Controllers;

use App\Project;
use App\ProjectFile;
use Illuminate\Http\Request;

class ProjectFileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Project $project)
    {
        $files = $project->files;
        $states = \App\State::all();

        return response()->json([
            'files' => $files,
            'states' => $states,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProjectFile  $projectFile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProjectFile $projectFile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProjectFile  $projectFile
     * @return \Illuminate\Http\Response
     */
    public function validation(Request $request, ProjectFile $file)
    {
        dd($file);
    }

}
