<?php

namespace App\Http\Controllers;

use App\Project;
use App\ProjectFile;
use Carbon\Carbon;
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
    public function update(Request $request, ProjectFile $file)
    {

        $file->invoice_estimated = $request->invoice_estimated;
        $file->estimated_facturation_date = $request->estimated_facturation_date;
        $file->invoice_total_ht = $request->invoice_total_ht;
        $file->invoice_total_purchases = $request->invoice_total_purchases;
        $file->update();
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

        $file->closed_at = Carbon::now();
        $file->update();

        // Create associated project file
        $project_file = new ProjectFile;
        $project_file->project_id = $file->project_id;
        $project_file->opened_at = Carbon::now()->addDay();;
        $project_file->state_id = 1;
        $project_file->save();

        return response()->json([
            'status' => 'success'
        ]);
    }

}
