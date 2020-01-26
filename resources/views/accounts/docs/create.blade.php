@extends('layouts.app')

@section('content')
	<create-doc :type="'{{ $type }}'" @if($file) :file="{{ $file->toJson() }}" @endif :doc_ref="'{{ $doc_ref }}'"></create-doc>
@endsection