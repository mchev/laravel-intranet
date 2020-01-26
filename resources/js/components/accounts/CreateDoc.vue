<template>

	<div>

		<div class="row mb-3">

			<div class="col-md-6">
				<a v-if="invoice.project_ref" class="btn btn-primary" :href="'/projects/' + invoice.project_id + '/edit'"><i class="fas fa-chevron-left"></i> Retour au projet</a>
				<a class="btn btn-primary" href="/accounts">Retour à la comptabilité</a>
			</div>

			<div class="col-md-6 text-right">
				<template v-if="doc">
					<button class="btn btn-primary" @click="updateDoc"><i class="fas fa-save"></i> Mettre à jour</button>
					<a :href="'/docs/' + invoice.id" class="btn btn-primary"><i class="fas fa-eye"></i> Visualiser</a>
					<button class="btn btn-success" @click="updateDoc"><i class="fas fa-lock"></i> Valider pour envoi</button>
					<button class="btn btn-danger" @click="deleteDoc"><i class="fas fa-trash"></i> Supprimer</button>
				</template>
				<template v-else>
					<button class="btn btn-primary" @click="storeDoc"><i class="fas fa-save"></i> Enregistrer</button>
				</template>
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
								<input class="form-control" type="date" v-model="invoice.date" @change="updateExpiration">
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
								<input v-if="invoice.project_ref" class="form-control" type="text" v-model="invoice.project_ref">
								<input v-else class="form-control" type="text" readonly>
							</div>
						</div>
					</div>

				</div>


			</div>

			<div class="row">

				<div class="col-md-12">
					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<span class="input-group-text">Objet</span>
						</div>
						<input class="form-control" v-model="invoice.title" required />
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
					    <tr v-for="(item, index) in invoice.items">
					    	<td>
					    		<input class="form-control mb-2" v-model="item.ref" placeholder="Référence du produit" required />
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
					    			<option value="20.00">20%</option>
					    			<option value="10.00">10%</option>
					    			<option value="5.50">5,5%</option>
					    			<option value="00.00">0%</option>
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
					    		<strong>{{ (item.price * item.quantity) * (1 - item.discount/100) | rounded }} {{ currency }}</strong><br>
					    		<small>{{ (item.price * item.quantity) * (1 - item.discount/100) + (((item.price * item.quantity) * (1 - item.discount/100)) * item.tva/100) | rounded }} {{ currency }} TTC</small>
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
					    	<td>Total HT : {{ total + discount | rounded }} {{ currency }}</td>
					    </tr>
					    <tr v-if="discount">
					    	<td>Remise : {{ discount | rounded }} {{ currency }}</td>
					    </tr>
					    <tr v-if="discount">
					    	<td>Total HT avec remise : {{ total | rounded }} {{ currency }}</td>
					    </tr>
					    <tr>
					    	<td>Total TVA : {{ tva | rounded }} {{ currency }}</td>
					    </tr>
					    <tr>
					    	<th>TOTAL TTC en euros : {{ total + tva | rounded }} {{ currency }}</th>
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
		  file: {
		    default: false,
		  },
		  doc_ref: {
		  	default: '',
		  },
		  doc: {
		  	defaut: null,
		  }
		},

        data(){
            return {
            	settings: window.settings,
            	customers: [],
            	currency: '€',
            	invoice: {
            		items: []
            	},
            }
        },

        mounted() {

            this.getCustomers();

            if (this.doc) {
            	axios.get('/docs/' + this.doc.id).then(response => {
                    this.invoice = response.data;
                });
            } else {
            	this.invoice = {
            		title: this.file.title,
            		customer: this.file.project.customer,
            		project_id: this.file.project.id,
            		project_file_id: this.file.id,
            		status_id: 1,
            		project_ref: this.file.project.ref,
            		type: this.type,
            		ref: this.doc_ref,
            		comments: "",
	            	date: moment().format('YYYY-MM-DD'),
	            	expire_at: moment().add(1, 'M').format('YYYY-MM-DD'),
	            	total: 0,
	            	discount: 0,
	            	tva: 0,
				    items: [
				      { ref: "", unit: "U", description: "", quantity: 1, price: 0, tva: "20.00", discount: 0 }
				    ]
            	}
            }

        },

		computed: {
			total: {
				get: function() {
					return this.invoice.items.reduce(
						(acc, item) => acc + (item.price * item.quantity) * (1 - item.discount/100), 0
					)
				}
			},
			discount: {
				get: function() {
					return this.invoice.items.reduce(
						(acc, item) => acc + ((item.price * item.quantity) * (item.discount/100)), 0
					)
				}
			},
			tva: {
				get: function() {
					return this.invoice.items.reduce(
						(acc, item) => acc + ((item.price * item.quantity) * (1 - item.discount/100)) * (item.tva/100), 0
					)
				}
			}
		},

		watch: {
			total(total) {
				this.invoice.total = total;
			},
			discount(discount) {
				this.invoice.discount = discount;
			},
			tva(tva) {
				this.invoice.tva = tva;
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
			  this.invoice.items.push({ ref: "", unit: "U", description: "", quantity: 1, price: 0, tva: "20.00", discount: 0 });
			},

			removeItem(index) {
				this.invoice.items.splice(index,1);
			},

			updateExpiration() {
				this.invoice.expire_at = moment(this.invoice.created_at).add(1, 'M').format('YYYY-MM-DD');
			},

			storeDoc() {
				axios.post('/docs', this.invoice).then(response => {
                    var doc = response.data;
                    window.location.href = "/docs/" + doc.id + "/edit";
                });
			},

			updateDoc() {
				axios.patch('/docs/' + this.doc.id, this.invoice).then(response => {
                    console.log(response.data);
                });
			},

			deleteDoc() {
				axios.delete('/docs/' + this.doc.id);
				window.location.href = "/accounts";
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