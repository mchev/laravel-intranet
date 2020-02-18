@extends('layouts.app')

@section('content')


    <div class="row mb-3">

        <div class="col-md-6">
            <h2>Archives</h2>
            {{ $projects->links() }}
        </div>

        <div class="col-md-6 text-right">
            <a href="/projects"  class="btn btn-info" title="Consulter les archives"><i class="fas fa-folder-open"></i> Retour aux projets</a>
        </div>

    </div>

	<div class="card">

		<table class="table table-striped">
			
			<thead>
				<tr>
					<th>Client</th>
					<th>Projet</th>
					<th>Date de création</th>
					<th>Date d'archivage</th>
					<th></th>
				</tr>
			</thead>

			<tbody>

				@foreach($projects as $project)

					<tr>
						<td>{{ $project->customer->name }}</td>
						<td>{{ $project->name }}</td>
						<td>{{ date('d/m/Y', strtotime($project->created_at)) }}</td>
						<td>{{ date('d/m/Y', strtotime($project->deleted_at)) }}</td>
						<td><a class="btn btn-info" href="/projects/{{ $project->id }}/restore">Restaurer</a></td>
					</tr>

				@endforeach

			</tbody>

		</table>

	</div>

@endsection