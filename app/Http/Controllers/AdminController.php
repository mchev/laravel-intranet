<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth', 'admin']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {

        $customers_count = \App\Customer::count();
        $projects_count = \App\Project::count();
        $tasks_count = \App\Task::count();
        $budget_total = \App\Project::sum('budget');
        $estimated = \App\ProjectFile::where('closed_at', NULL)->sum('invoice_estimated');
        $invoice_total = \App\ProjectFile::where('closed_at', "!=", NULL)->sum('invoice_total');

        return view('admin', compact('customers_count', 'projects_count', 'tasks_count', 'budget_total', 'estimated', 'invoice_total'));
    }


    public function import()
    {

        

    }

}
