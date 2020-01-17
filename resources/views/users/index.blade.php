@extends('layouts.app')

@section('content')

	<h1>Utilisateurs</h1>

	<users-list :user="{{ auth()->user()->toJson() }}"></users-list>

	
@endsection