@extends('layouts.app')

@section('content')


    <div class="row mb-3">

        <div class="col-md-6">
            <h2>Projets à facturer</h2>
        </div>

        <div class="col-md-6 text-right">
            <a href="/projects"  class="btn btn-info" title="Consulter les archives"><i class="fas fa-folder-open"></i> Retour aux projets</a>
        </div>

    </div>


	@foreach($months as $month => $files)

		<div class="card mb-3">

			
			<div class="card-header">
				<h2>{{ $month }}</h2>
			</div>

			<div class="card-body">

				<table class="table table-striped">
					
					<thead>
						<tr>
							<th>Client</th>
							<th>Projet</th>
							<th>Heures à facturer</th>
							<th>Montant à facturer</th>
							<th>Date de facturation prévue</th>
							<th></th>
						</tr>
					</thead>

					<tbody>

						@foreach($files as $file)

							<tr>
								<td><a href="/customers/{{ $file->project->customer->id }}/edit">{{ $file->project->customer->name }}</a></td>
								<td><a href="/projects/{{ $file->project->id }}/edit">{{ $file->project->name }}</a></td>
								<td>{{ \Carbon\CarbonInterval::seconds($file->hours)->cascade()->forHumans() }}</td>
								<td>{{ $file->invoice_estimated }}€</td>
								<td>{{ date('d/m/Y', strtotime($file->estimated_facturation_date)) }}</td>
								<td><a class="btn btn-info" href="/projects/{{ $file->project->id }}/edit"><i class="fas fa-eye"></i> Consulter</a></td>
							</tr>

						@endforeach

					</tbody>

				</table>

			</div>

		</div>

	@endforeach

@endsection