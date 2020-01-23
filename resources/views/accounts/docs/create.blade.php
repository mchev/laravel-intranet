@extends('layouts.app')

@section('content')
	<create-doc :type="'{{ $type }}'" @if($file) :file="{{ $file->toJson() }}" @endif></create-doc>
@endsection