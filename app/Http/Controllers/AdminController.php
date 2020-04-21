<?php

namespace App\Http\Controllers;

use DB;
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

        $stats = $this->invoices();

        return view('admin', compact('customers_count', 'projects_count', 'tasks_count', 'budget_total', 'stats'));
    }


    public function invoices()
    {

        $estimates = \App\ProjectFile::withTrashed()
            ->select(
                DB::raw('sum(invoice_estimated) as total'), 
                DB::raw("DATE_FORMAT(updated_at,'%m/%Y') as month")
            )
            ->where('invoice_estimated', '!=', NULL)
            ->groupBy('month')
            ->get()
            ->pluck('total');

        $invoices = \App\ProjectFile::withTrashed()
            ->select(
                DB::raw('sum(invoice_total) as total'), 
                DB::raw("DATE_FORMAT(updated_at,'%m/%Y') as month")
            )
            ->where('invoice_total', '!=', NULL)
            ->groupBy('month')
            ->get()
            ->pluck('total');

        $labels = \App\ProjectFile::withTrashed()
            ->select(
                DB::raw("DATE_FORMAT(updated_at,'%m/%Y') as month")
            )
            ->where('invoice_estimated', '!=', NULL)
            ->groupBy('month')
            ->get()
            ->pluck('month');


        return [
            'labels' => $labels,
            'estimates' => $estimates,
            'invoices' => $invoices
        ];

    }

}
