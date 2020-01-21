<template>

	<div>

		<div class="row mb-3">

			<div class="col-md-12 text-right">
				<button class="btn btn-primary"><i class="fas fa-save"></i> Enregistrer</button>
			</div>

		</div>


		<div class="card p-4 mb-3">

			<div class="row mb-3 d-flex align-items-center">

				<div class="col-md-6 p-4">
					<button v-if="type === 'invoice'" class="btn btn-block btn-secondary mb-4">FACTURE</button>
					<button v-else class="btn btn-block btn-secondary mb-4">DEVIS</button>

	            	<div class="row" v-if="invoice.customer">
	            		<div class="col-1">
	            			<button class="btn btn-sm btn-secondary" @click="invoice.customer = null"><i class="fas fa-times"></i></button>
	            		</div>
	            		<div class="col-11">
	            			{{ invoice.customer.name }}<br>
		            		{{ invoice.customer.street }}<br>
		            		{{ invoice.customer.zip_code }} {{ invoice.customer.city }}
		            	</div>
	            	</div>
	            	<v-select v-else class="btn btn-block btn-lg p-4 btn-secondary" :options="customers" @search="getCustomers" v-model="invoice.customer" label="name" placeholder="Sélectionner un client"></v-select>
				</div>

				<div class="col-md-6">

					<div class="row mb-3">
						<div class="col-md-6">
							<label class="mr-2">Date : </label>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text" id="basic-addon1"><i class="far fa-calendar-alt"></i></span>
								</div>
								<input class="form-control" type="date" v-model="invoice.created_at" @change="updateExpiration">
							</div>
						</div>
						<div class="col-md-6">
							<label class="mr-2">Date limite : </label>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text" id="basic-addon1"><i class="far fa-calendar-alt"></i></span>
								</div>
								<input class="form-control" type="date" v-model="invoice.expire_at">
							</div>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-md-6">
							<label class="mr-2">Numéro de facture : </label>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text" id="basic-addon1"><i class="fas fa-hashtag"></i></span>
								</div>
								<input class="form-control" type="text" v-model="invoice.ref" @change="updateExpiration">
							</div>
						</div>
						<div class="col-md-6">
							<label class="mr-2">Référence projet : </label>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text" id="basic-addon1"><i class="far fa-user"></i></span>
								</div>
								<input v-if="invoice.customer" class="form-control" type="text" v-model="invoice.project_ref">
								<input v-else class="form-control" type="text" readonly>
							</div>
						</div>
					</div>

				</div>


			</div>

			<div class="table-responsive">

	    		<table class="table table-striped">

					<colgroup>
						<col style="width: 35%;"> 
						<col style="width: 10%;"> 
						<col style="width: 10%;"> 
						<col style="width: 15%;"> 
						<col style="width: 10%;"> 
						<col style="width: 10%;"> 
						<col style="width: 10%;">
						<!----> 
					</colgroup>

	    			<thead>
					    <tr>
					      <th>Produit</th>
					      <th>Unité</th>
					      <th>Qté</th>
					      <th>Prix</th>
					      <th>TVA</th>
					      <th>Remise</th>
					      <th>Total H.T</th>
					      <th></th>
					    </tr>
	    			</thead>

	    			<tbody>
					    <tr v-for="(item, index) in items">
					    	<td>
					    		<input class="form-control mb-2" v-model="item.ref" placeholder="Référence du produit" />
					    		<textarea class="form-control" v-model="item.description" placeholder="Description du produit (facultatif)"></textarea>
					    	</td>
					    	<td>
					    		<select class="form-control" v-model="item.unit">
					    			<option value="H">Heure</option>
					    			<option value="J">Jour</option>
					    			<option value="F">Forfait</option>
					    			<option value="U">Unité</option>
					    			<option value="Kg">Kg</option>
					    		</select>
					    	</td>
					    	<td><input class="form-control" type="number" step="any" v-model="item.quantity" /></td>
						    <td>
						      	<div class="input-group">
						      		<input class="form-control" type="number" step="any" v-model="item.price" />
						      		<div class="input-group-append">
						      			<span class="input-group-text">{{ currency }}</span>
						      		</div>
						      	</div>
						    </td>
					    	<td>
					    		<select class="form-control" v-model="item.tva">
					    			<option value="20">20%</option>
					    			<option value="10">10%</option>
					    			<option value="5.5">5,5%</option>
					    			<option value="0">0%</option>
					    		</select>
					    	</td>
						    <td>
						      	<div class="input-group">
						      		<input class="form-control" type="number" v-model="item.discount" />
						      		<div class="input-group-append">
						      			<span class="input-group-text">%</span>
						      		</div>
						      	</div>
						    </td>
					    	<td>
					    		<strong>{{ (item.price * item.quantity) - ((item.price * item.quantity) * item.discount/100) | rounded }} {{ currency }}</strong><br>
					    		<small>{{ (item.price * item.quantity) - ((item.price * item.quantity) * item.discount/100) + ((item.price * item.quantity) * item.tva/100) | rounded }} {{ currency }} TTC</small>
					    	</td>
					    	<td>
					    		<button @click="removeItem(index)" class="btn btn-default">
					    			<i class="far fa-trash-alt"></i>
					    		</button>
					    	</td>
					    </tr>
					</tbody>
				</table>

			</div>

			<button class="btn btn-block btn-info" @click="addItem"><i class="fas fa-plus"></i> Ajouter une ligne</button>

			<div class="row mt-5 mb-3 d-flex align-items-center">

				<div class="col-md-8">

					<textarea class="form-control" v-model="invoice.comments" placeholder="Ajouter une note"></textarea>

				</div>

				<div class="col-md-4">

					<table class="table">

					    <tr>
					    	<td>Total HT : {{ total | rounded }} {{ currency }}</td>
					    </tr>
					    <tr>
					    	<td>TVA {{ tva }}% : {{ total * (tva/100) | rounded }} {{ currency }}</td>
					    </tr>
					    <tr>
					    	<th>TOTAL TTC en euros : {{ total + ( total * (tva/100) ) }} {{ currency }}</th>
					    </tr>

					</table>

				</div>

			</div>

		</div>

	</div>

</template>


<script>
	
    export default {

		props: {
		  type: {
		    default: "estimate",
		  },
		  project: {
		    default: false,
		  },
		},

        data(){
            return {
            	settings: window.settings,
            	customers: [],
            	tva: 20,
            	currency: '€',
            	invoice: {
            		customer: this.project.customer,
            		project_id: this.project.id,
            		project_ref: this.project.ref,
            		ref: "",
            		comments: "",
	            	created_at: moment().format('YYYY-MM-DD'),
	            	expire_at: moment().add(1, 'M').format('YYYY-MM-DD'),
            	},
			    items: [
			      { ref: "", unit: "U", description: "", quantity: 1, price: 0, tva: 20, discount: 0 }
			    ]
            }
        },

        mounted() {

            this.getCustomers();


        },

		computed: {
			total() {
			  return this.items.reduce(
			    (acc, item) => acc + (item.price * item.quantity) - ((item.price * item.quantity) * item.discount/100),
			    0
			  );
			}
		},

		methods: {

			getCustomers(search = '') {
				if (search == '') {
					axios.get('/customers').then(response => {
	                    this.customers = response.data.data;
	                });
	            } else {
					axios.get('/customers?q=' + search).then(response => {
	                    this.customers = response.data.data;
	                });
	            }
			},

			addItem() {
			  this.items.push({ ref: "", description: "", quantity: 1, price: 0, tva: 20, discount: 0 });
			},

			removeItem(index) {
				this.items.splice(index,1);
			},

			updateExpiration() {
				this.invoice.expire_at = moment(this.invoice.created_at).add(1, 'M').format('YYYY-MM-DD');
			}
		},

		filters: {
			rounded(value) {
			  return value.toFixed(2);
			}
		}

    }

</script>


<style scoped>

	textarea {
		width: 100%;
		padding: 8px 13px;
		text-align: left;
		background: transparent;
		border: none;
		box-sizing: border-box;
		border-radius: 5px;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 21px;
		resize: none;
	}

</style>