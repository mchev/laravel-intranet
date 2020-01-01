@extends('layouts.app')

@section('content')

	<div class="card">

	  <div class="card-header">
	    Modifier un client
	  </div>

	  <div class="card-body">

	    @if ($errors->any())
	      <div class="alert alert-danger">
	        <ul class="list-group">
	            @foreach ($errors->all() as $error)
	              <li class="list-group-item">{{ $error }}</li>
	            @endforeach
	        </ul>
	      </div><br />
	    @endif

		    <form method="post" action="{{ route('customers.update', $customer->id) }}">

				@csrf
				@method('PUT')
		        
		        <div class="form-group">
		            <label for="name">Nom du client</label>
		            <input type="text" class="form-control" value="{{ $customer->name }}" name="name" required />
		        </div>

	          	<div class="row">

		          	<div class="col-md-6">
				        <div class="form-group">
				            <label for="phone">Téléphone</label>
				            <input type="text" class="form-control" value="{{ $customer->phone }}" name="phone"/>
				        </div>
		          	</div>

		          	<div class="col-md-6">
				        <div class="form-group">
				            <label for="email">Email</label>
				            <input type="email" class="form-control" value="{{ $customer->email }}" name="email"/>
				        </div>
		          	</div>

	          	</div>

	          	<hr>

	          	
		        <div class="form-group">
		            <label for="street">Adresse</label>
		            <input type="text" class="form-control" value="{{ $customer->street }}" name="street"/>
		        </div>
	          	

	        	<div class="row">

		          	<div class="col-md-4">
				        <div class="form-group">
				            <label for="zip_code">Code Postal</label>
				            <input type="text" class="form-control" value="{{ $customer->zip_code }}" name="zip_code"/>
				        </div>
		          	</div>

		          	<div class="col-md-4">
				        <div class="form-group">
				            <label for="city">Ville</label>
				            <input type="text" class="form-control" value="{{ $customer->city }}" name="city"/>
				        </div>
		          	</div>

		          	<div class="col-md-4">
				        <div class="form-group">
				            <label for="state">Pays</label>
				            <input type="text" class="form-control" value="{{ $customer->state }}" name="state"/>
				        </div>
		          	</div>

	        	</div>

	        	<hr>

	        	<fieldset class="form-group">
	        		<legend>Contact</legend>
	        		
		        	<div class="row">

			          	<div class="col-md-6">
					        <div class="form-group">
					            <label for="contact_first_name">Prénom</label>
					            <input type="text" class="form-control" value="{{ $customer->contact_first_name }}" name="contact_first_name"/>
					        </div>
			          	</div>

			          	<div class="col-md-6">
					        <div class="form-group">
					            <label for="contact_last_name">Nom</label>
					            <input type="text" class="form-control" value="{{ $customer->contact_last_name }}" name="contact_last_name"/>
					        </div>
			          	</div>

		        	</div>

		        	<div class="row">

			          	<div class="col-md-6">
					        <div class="form-group">
					            <label for="contact_phone">Téléphone</label>
					            <input type="text" class="form-control" value="{{ $customer->contact_phone }}" name="contact_phone"/>
					        </div>
			          	</div>

			          	<div class="col-md-6">
					        <div class="form-group">
					            <label for="contact_email">Email</label>
					            <input type="email" class="form-control" value="{{ $customer->contact_email }}" name="contact_email"/>
					        </div>
			          	</div>

		        	</div>

	        	</fieldset>

	        	<hr>

	          	<div class="form-group">
	            	<label for="comment">Commentaires</label>
	            	<textarea class="form-control" value="{{ $customer->comment }}" name="comment"></textarea>
	          	</div>

	          	<div class="form-group float-right">
					<button type="submit" class="btn btn-primary">Enregistrer</button>
				</div>

	      </form>

	  </div>
	</div>

@endsection