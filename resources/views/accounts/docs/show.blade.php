@extends('layouts.app')

@section('content')
	<show-doc :doc="{{ $doc->toJson() }}"></show-doc>
@endsection