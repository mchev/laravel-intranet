@extends('layouts.app')

@section('content')
<div class="container-fluid">

    <div class="row justify-content-center pt-4">

        <div class="col-xl-4">
            <board type="user"></board>
        </div>

        <div class="col-xl-4 mb-3">
            <dashboard-hours></dashboard-hours>
            <add-hours></add-hours>
        </div>

        <div class="col-xl-4 mb-3">
        </div>

    </div>
</div>

@endsection
