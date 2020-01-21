@extends('layouts.app')

@section('content')
	<create-doc :type="'{{ $type }}'" @if($project) :project="{{ $project->toJson() }}" @endif></create-doc>
@endsection