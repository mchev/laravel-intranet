<?php

namespace App\Http\Controllers;

use App\TaskChecklist;
use Illuminate\Http\Request;

class TaskChecklistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $items = TaskChecklist::where('task_id', $request->task_id)->orderBy('created_at')->get();
        $checked = TaskChecklist::where('task_id', $request->task_id)->where('checked', true)->count();
        return response()->json([
            "items" => $items,
            "checked" => $checked
        ]);
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
            'title' => 'required|string',
            'task_id' => 'required|integer'
        ]);

        $item = new TaskChecklist;
        $item->task_id = $request->task_id;
        $item->user_id = auth()->user()->id;
        $item->title = $request->title;
        $item->checked = $request->checked;
        $item->save();

        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TaskChecklist  $checklist
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TaskChecklist $checklist)
    {

        $request->validate([
            'title' => 'required|string'
        ]);

        $checklist->checked = intval($request->checked);
        $checklist->title = $request->title;
        $checklist->save();

        return response()->json($checklist);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TaskChecklist  $checklist
     * @return \Illuminate\Http\Response
     */
    public function destroy(TaskChecklist $checklist)
    {
        $checklist->delete();
    }
}
