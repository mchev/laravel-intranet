@extends('layouts.app')

@section('content')

	<div class="card">

	  <div class="card-header">
	    Ajouter un nouveau projet
	  </div>

	  <div class="card-body">

	    @if ($errors->any())
	      <div class="alert alert-danger">
	        <ul>
	            @foreach ($errors->all() as $error)
	              <li>{{ $error }}</li>
	            @endforeach
	        </ul>
	      </div><br />
	    @endif

	      <form method="post" action="{{ route('projects.store') }}">

	          <div class="form-group">
	              @csrf
	              <label for="name">Nom du projet</label>
	              <input type="text" class="form-control" name="name"/>
	          </div>

	          <div class="row">

	          	<div class="col-md-3">
					<div class="form-group">
						<label for="customer_id">Client</label>
						<select class="form-control" name="customer_id" required>
							@foreach($customers as $customer)
								<option value="{{ $customer->id }}">{{ $customer->name }}</option>
							@endforeach
						</select>
					</div>
	          	</div>

	          	<div class="col-md-3">
					<div class="form-group">
						<label for="type_id">Type</label>
						<select class="form-control" name="type_id" required>
							@foreach($types as $type)
								<option value="{{ $type->id }}">{{ $type->label }}</option>
							@endforeach
						</select>
					</div>
	          	</div>

	          	<div class="col-md-3">
					<div class="form-group">
						<label for="state_id">État</label>
						<select class="form-control" name="state_id" required>
							@foreach($states as $state)
								<option value="{{ $state->id }}">{{ $state->label }}</option>
							@endforeach
						</select>
					</div>
	          	</div>

	          	<div class="col-md-3">
					<div class="form-group">
						<label for="budget">Budget</label>
						<input class="form-control" type="number" step="any" name="budget">
					</div>
	          	</div>

	          </div>


	          <div class="form-group">
	              <label for="description">Description</label>
	              <textarea class="form-control" name="description"></textarea>
	          </div>

	          <button type="submit" class="float-right btn btn-primary">Enregistrer</button>

	      </form>

	  </div>
	</div>

@endsection