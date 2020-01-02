@extends('layouts.app')

@section('content')
<div class="container-fluid">

    <h1>Mon tableau de bord</h1>

    <div class="row justify-content-center pt-4">

        <div class="col-xl-3">
            <board type="user"></board>
        </div>

        <div class="col-xl-4 mb-3">
            <add-hours></add-hours>
        </div>

        <div class="col-xl-5 mb-3">
        </div>

    </div>
</div>

@endsection
