<template>

	<div>

		<div class="row mb-3 d-print-none">
			<div class="col-md-6">
				<button @click="print" class="btn btn-primary"><i class="fas fa-print"></i> Imprimer</button>
				<a :href="'/docs/' + doc.id + '/edit'" class="btn btn-info"><i class="fas fa-pen"></i> Corriger</a>
				<button @click="print" class="btn btn-success"><i class="fas fa-plus"></i> Ajouter un paiement</button>
			</div>
		</div>

		<div class="card p-4 mb-3">

			<div class="row mb-3 d-flex align-items-center">

				<div class="col-md-6 p-4">

					<button v-if="doc.type === 'invoice'" class="btn btn-block btn-secondary mb-4">FACTURE - {{ doc.ref }}</button>
					<button v-else class="btn btn-block btn-secondary mb-4">DEVIS - {{ doc.ref }}</button>

        			{{ doc.customer.name }}<br>
            		{{ doc.customer.street }}<br>
            		{{ doc.customer.zip_code }} {{ doc.customer.city }}

				</div>

				<div class="col-md-6">

						<p>Date : {{ doc.date }}<br>
						Date limite : {{ doc.expire_at }}<br>
						Référence projet : {{ doc.project_ref }}</p>

				</div>


			</div>

			<div class="row">

				<div class="col-md-12">
					Objet : {{ doc.title }}
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
					    </tr>
	    			</thead>

	    			<tbody>
					    <tr v-for="(item, index) in items">
					    	<td>
					    		<p><strong>{{ item.ref }}</strong></p>
					    		<p v-if="item.description">{{ item.description }}</p>
					    	</td>
					    	<td>
					    		{{ item.unit}}
					    	</td>
					    	<td>{{ item.quantity }}</td>
						    <td>{{ item.price }} {{ currency }}</td>
					    	<td>{{ item.tva }}%</td>
						    <td v-if="item.discount">{{ item.discount }}%</td>
						    <td v-else> - </td>
					    	<td>
					    		<strong>{{ (item.price * item.quantity) - ((item.price * item.quantity) * item.discount/100) | rounded }} {{ currency }}</strong><br>
					    		<small>{{ (item.price * item.quantity) - ((item.price * item.quantity) * item.discount/100) + ((item.price * item.quantity) * item.tva/100) | rounded }} {{ currency }} TTC</small>
					    	</td>
					    </tr>
					</tbody>
				</table>

			</div>

			<div class="row mt-5 mb-3 d-flex align-items-center">

				<div class="col-md-8">

					<p v-if="doc.comments">{{ doc.comments }}</p>

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

    	name: 'showdoc',

		props: ['doc'],

        data(){
            return {
            	name: '',
            	settings: window.settings,
            	currency: '€',
			    items: this.doc.items,
            }
        },

        mounted() {

        },

		computed: {
			total: {
				get: function() {
					return this.doc.items.reduce(
						(acc, item) => acc + (item.price * item.quantity) * (1 - item.discount/100), 0
					)
				}
			},
			discount: {
				get: function() {
					return this.doc.items.reduce(
						(acc, item) => acc + ((item.price * item.quantity) * (item.discount/100)), 0
					)
				}
			},
			tva: {
				get: function() {
					return this.doc.items.reduce(
						(acc, item) => acc + ((item.price * item.quantity) * (1 - item.discount/100)) * (item.tva/100), 0
					)
				}
			}
		},

		watch: {
			total(total) {
				this.doc.total = total;
			},
			discount(discount) {
				this.doc.discount = discount;
			},
			tva(tva) {
				this.doc.tva = tva;
			}
		},

		methods: {

            print() {
                window.print();
            },

		},

		filters: {
			rounded(value) {
			  return value.toFixed(2);
			}
		}

    }

</script>

<style scoped>

	@media print {
	  @page { margin: 0; }
	  body { margin: 1.6cm; }
	}

</style>