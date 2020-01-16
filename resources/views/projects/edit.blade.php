@extends('layouts.app')

@section('content')

	<div class="container-fluid">

		<div class="alert alert-info">
			<h1>{{ $project->name }} ({{ $project->ref }})</h1>
			<p>{{ $project->customer->name }}</p>
		</div>

		<div class="row">

			<div class="col-md-4 mb-3">

				<div class="card">

				  <div class="card-header">
				    Modifier un projet
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

				      <form method="post" action="{{ route('projects.update', $project->id) }}">

				          <div class="form-group">
				              @csrf
				              @method('PUT')
				              <label for="ref">Numéro de dossier / Référence</label>
				              <input type="number" class="form-control" name="ref" value="{{ $project->ref }}"/>
				          </div>

				          <div class="form-group">
				              <label for="name">Nom du projet</label>
				              <input type="text" class="form-control" name="name" value="{{ $project->name }}"/>
				          </div>

				          <div class="row">

					          	<div class="col-md-6">
									<div class="form-group">
										<label for="customer_id">Client</label>
										<select class="form-control" name="customer_id" required>
											@foreach($customers as $customer)
												<option @if($project->customer_id == $customer->id) selected @endif value="{{ $customer->id }}">{{ $customer->name }}</option>
											@endforeach
										</select>
									</div>
					          	</div>

					          	<div class="col-md-6">
									<div class="form-group">
										<label for="type_id">Type</label>
										<select class="form-control" name="type_id">
											@foreach($types as $type)
												<option @if($project->type_id == $type->id) selected @endif value="{{ $type->id }}">{{ $type->label }}</option>
											@endforeach
										</select>
									</div>
					          	</div>

				          	</div>

				          	<div class="row">

					          	<div class="col-md-6">
									<div class="form-group">
										<label for="state_id">État</label>
										<select class="form-control" name="state_id">
											@foreach($states as $state)
												<option @if($project->state_id == $state->id) selected @endif value="{{ $state->id }}">{{ $state->label }}</option>
											@endforeach
										</select>
									</div>
					          	</div>

					          	<div class="col-md-6">
									<div class="form-group">
										<label for="budget">Budget</label>
										<input class="form-control" type="number" value="{{ $project->budget }}" step="any" name="budget">
									</div>
					          	</div>

					        </div>


				          <div class="form-group">
				              <label for="description">Description</label>
				              <textarea class="form-control" name="description">{{ $project->description }}</textarea>
				          </div>

				          <button type="submit" class="float-right btn btn-primary ml-2">Enregistrer</button>
				          <a href="{{ route('projects.archive', $project) }}" class="float-right btn btn-secondary"><i class="fas fa-archive"></i> Archiver</a>

				      </form>

				  </div>
				</div>

			</div>

			<div class="col-md-8 mb-3">


				<project-files :project="{{ $project->toJson() }}" class="mb-3"></project-files>

				<div class="card">

					<div class="card-header">
						<h5>Heures du projet</h5>
					</div>

					<div class="card-body">
						<hours-list :project="{{ $project->toJson() }}"></hours-list>
					</div>

				</div>

			</div>

		</div>

	</div>


@endsection