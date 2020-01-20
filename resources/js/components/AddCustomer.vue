<template>

	<div class="card">

		<div class="card-header">
			Ajouter un nouveau client
		</div>

		<div class="card-body">

			<div v-if="response" class="alert" :class="{ 'alert-success' : response.status, 'alert-danger' : !response.status}">
				{{ response.message }}
			</div>

		    <form method="post" @submit.prevent="submitData">
		        
		        <div class="form-group">
		            <label for="name">Nom du client</label>
		            <input type="text" class="form-control" v-model="customer.name" required />
		        </div>

	          	<div class="row">

		          	<div class="col-md-6">
				        <div class="form-group">
				            <label for="phone">Téléphone</label>
				            <input type="text" class="form-control" v-model="customer.phone"/>
				        </div>
		          	</div>

		          	<div class="col-md-6">
				        <div class="form-group">
				            <label for="email">Email</label>
				            <input type="email" class="form-control" v-model="customer.email"/>
				        </div>
		          	</div>

	          	</div>

	          	<hr>

	          	
		        <div class="form-group">
		            <label for="street">Adresse</label>
		            <input type="text" class="form-control" v-model="customer.street"/>
		        </div>
	          	

	        	<div class="row">

		          	<div class="col-md-4">
				        <div class="form-group">
				            <label for="zip_code">Code Postal</label>
				            <input type="text" class="form-control" v-model="customer.zip_code"/>
				        </div>
		          	</div>

		          	<div class="col-md-4">
				        <div class="form-group">
				            <label for="city">Ville</label>
				            <input type="text" class="form-control" v-model="customer.city"/>
				        </div>
		          	</div>

		          	<div class="col-md-4">
				        <div class="form-group">
				            <label for="state">Pays</label>
				            <input type="text" class="form-control" v-model="customer.state"/>
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
					            <input type="text" class="form-control" v-model="customer.contact_first_name"/>
					        </div>
			          	</div>

			          	<div class="col-md-6">
					        <div class="form-group">
					            <label for="contact_last_name">Nom</label>
					            <input type="text" class="form-control" v-model="customer.contact_last_name"/>
					        </div>
			          	</div>

		        	</div>

		        	<div class="row">

			          	<div class="col-md-6">
					        <div class="form-group">
					            <label for="contact_phone">Téléphone</label>
					            <input type="text" class="form-control" v-model="customer.contact_phone"/>
					        </div>
			          	</div>

			          	<div class="col-md-6">
					        <div class="form-group">
					            <label for="contact_email">Email</label>
					            <input type="email" class="form-control" v-model="customer.contact_email"/>
					        </div>
			          	</div>

		        	</div>

	        	</fieldset>

	        	<hr>

	          	<div class="form-group">
	            	<label for="comment">Commentaires</label>
	            	<textarea class="form-control" v-model="customer.comment"></textarea>
	          	</div>

	          <button type="submit" class="float-right btn btn-primary">Enregistrer</button>

	    	</form>

		</div>

	</div>

</template>

<script>

	export default {

	    data(){
	    	return {
	        	customer: {},
	        	response: false,
	        }
	    },

	    methods: {

	        submitData() {
	        	this.response = false;
	            axios.post('/customers', this.customer).then(response => {
	            	this.response = response.data;
	            	window.location.href = "/customers";
                });
	        }

	    }

	}

</script>