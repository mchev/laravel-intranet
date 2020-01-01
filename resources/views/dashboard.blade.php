@extends('layouts.app')

@section('content')
<div class="container-fluid">

    <div class="row justify-content-center">

        <div class="col-xl-4 mb-3">

            <add-hours></add-hours>

        </div>

        <div class="col-xl-4 mb-3">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in!
                    
                </div>
            </div>
        </div>

        <div class="col-xl-4">
            <board type="user"></board>
        </div>


    </div>
</div>

@endsection
