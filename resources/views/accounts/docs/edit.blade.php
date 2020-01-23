@extends('layouts.app')

@section('content')
	<create-doc :type="'{{ $doc->type }}'" :doc="{{ $doc->toJson() }}"></create-doc>
@endsection