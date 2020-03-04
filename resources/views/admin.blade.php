@extends('layouts.app')

@section('content')

    <div class="container-fluid">

        <div class="row">

            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                
                <div class="card border-left-primary shadow h-100 py-2">
                    <a href="/customers">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Clients</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $customers_count }}</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-user-tie fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                
                <div class="card border-left-info shadow h-100 py-2">
                    <a href="/projects">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Projets</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $projects_count }}</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-folder-open fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                
                <div class="card border-left-warning shadow h-100 py-2">
                    <a href="/boards">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Tâches en cours</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $tasks_count }}</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-tasks fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

            </div>

            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                
                <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Budget total</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $budget_total }} €</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-euro-sign fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div class="row">

            <div class="col-md-7">

                <div class="card mb-3">
                    <div class="card-header">
                        <a href="/projects/billable" class="btn btn-info float-right"><i class="fas fa-link"></i> Projets à facturer</a>
                        <h5>Suivi facturation</h5>
                    </div>
                    <div class="card-body">
                        <invoices-graph :labels="{{ $stats['labels'] }}" :estimates="{{ $stats['estimates'] }}" :invoices="{{ $stats['invoices'] }}"></invoices-graph>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h5>Factures</h5>
                    </div>
                    <div class="card-body">
                        <list-doc :type="'invoice'"></list-doc>
                    </div>
                </div>
            </div>

            <div class="col-md-5">
                <users-hours></users-hours>
            </div>

        </div>

    </div>

@endsection