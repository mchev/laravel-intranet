<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
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

    public function index()
    {
        return response()->json(Task::all()->toArray());
    }

    public function store(Request $request)
    {
        $task = Task::create([
            'name' => $request->name,
            'board_id' => $request->board_id,
            'project_id' => $request->project_id,
            'user_id' => auth()->user()->id,
            'order' => $request->order
        ]);

        $task->project;

        return response()->json([
            'status' => (bool) $task,
            'data'   => $task,
            'message' => $task ? 'Task Created!' : 'Error Creating Task'
        ]);
    }

    public function show(Task $task)
    {   
       return response()->json($task); 
    }

    public function update(Request $request, Task $task)
    {
        $status = $task->update(
            $request->only(['name', 'description', 'due_date', 'board_id', 'project_id', 'order'])
        );

        $task->touch(); // For updating the order based on updated_at

        return response()->json([
            'status' => $status,
            'message' => $status ? 'Task Updated!' : 'Error Updating Task'
        ]);
    }

    public function tags(Request $request, Task $task)
    {
        $task->tags()->sync($request->tag_id);
        $task->tags;
        return response()->json($task);
    }

    public function archive(Task $task)
    {
        $status = $task->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? 'Task Archived!' : 'Error Archiving Task'
        ]);
    }

    public function destroy(Task $task)
    {
        $status = $task->forceDelete();

        return response()->json([
            'status' => $status,
            'message' => $status ? 'Task Deleted!' : 'Error Deleting Task'
        ]);
    }
    
}
