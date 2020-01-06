<template>
	
	<div class="invoice-box">

	  <table cellpadding="0" cellspacing="0">
	    <tr class="top">
	      <td colspan="5">
	        <table>
	          <tr>
	            <td class="title">
	              <img src="https://www.sparksuite.com/images/logo.png" style="width:100%; max-width:300px;">
	            </td>

	            <td>
	            	<button class="btn btn-secondary btn-block btn-lg">FACTURE</button>
	              Facture #123<br>
	              <div class="float-right form-group form-inline">
	              	<label class="mr-2">Date : </label>
	              	<input class="form-control" type="date" v-model="created_at" @change="updateExpiration">
	              </div>
	              <div class="float-right form-group form-inline">
	              	<label class="mr-2">Date limite : </label>
	              	<input class="form-control" type="date" v-model="expire_at">
	              </div>
	            </td>
	          </tr>
	        </table>
	      </td>
	    </tr>

	    <tr class="information">
	      <td colspan="5">
	        <table>
	          <tr>
	            <td>
	              Sparksuite, Inc.<br> 12345 Sunny Road<br> Sunnyville, CA 12345
	            </td>

	            <td>
	            	<v-select :options="customers" @search="getCustomers" v-model="invoice.customer" label="name" placeholder="Choisir un client"></v-select>
	            	<template v-if="invoice.customer">
	            		{{ invoice.customer.street }}<br>
	            		{{ invoice.customer.zip_code }} {{ invoice.customer.city }}<br>	            		
	            	</template>
	            </td>
	          </tr>
	        </table>
	      </td>
	    </tr>

	    <tr>
	    	<td colspan="5">
	    		<table class="table table-striped">

	    			<thead>
					    <tr>
					      <th>Produit</th>
					      <th>Désignation</th>
					      <th>Unité</th>
					      <th>Qté</th>
					      <th>Prix</th>
					      <th>TVA</th>
					      <th>Remise (%)</th>
					      <th>
					      	<strong>Total H.T</strong><br>
					      	<small>Total TTC</small>
					      </th>
					    </tr>
	    			</thead>

	    			<tbody>
					    <tr v-for="item in items">
					    	<td><input class="form-control" v-model="item.ref" /></td>
					    	<td><input class="form-control" v-model="item.description" /></td>
					    	<td>
					    		<select class="form-control" v-model="item.unit">
					    			<option value="H">H</option>
					    			<option value="J">J</option>
					    			<option value="Forfait">Forfait</option>
					    			<option value="U">U</option>
					    			<option value="U">Kg</option>
					    			<option value="U">U</option>
					    			<option value="U">U</option>
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
					    		<small>{{ (item.price * item.quantity) - ((item.price * item.quantity) * item.discount/100) + ((item.price * item.quantity) * item.tva/100) | rounded }} {{ currency }}</small>
					    	</td>
					    </tr>
					</tbody>
				</table>

			</td>
		</tr>

	    <tr>
	      <td colspan="4">
	        <button class="btn btn-info btn-sm" @click="addRow">Ajouter une ligne</button>
	      </td>
	    </tr>

	    <tr class="">
	    	<td colspan="3"></td>
	    	<td colspan="2">Total HT : {{ total | rounded }} {{ currency }}</td>
	    </tr>
	    <tr class="">
	    	<td colspan="3"></td>
	    	<td colspan="2">TVA {{ tva }}% : {{ total * (tva/100) | rounded }} {{ currency }}</td>
	    </tr>
	    <tr class="total">
	    	<td colspan="3"></td>
	    	<td colspan="2">TOTAL TTC en euros : {{ total + ( total * (tva/100) ) }} {{ currency }}</td>
	    </tr>


	  </table>

	</div>

</template>


<script>
	
    export default {

        data(){
            return {
            	customers: [],
            	tva: 20,
            	currency: '€',
            	created_at: moment().format('YYYY-MM-DD'),
            	expire_at: moment().add(1, 'M').format('YYYY-MM-DD'),
            	invoice: {
            		customer: null,
            	},
			    items: [
			      { ref: "PR-001", description: "Website design", unit: "H", quantity: 1, price: 300, tva: 20, discount:0 },
			      { ref: "PR-001", description: "Website design", unit: "H", quantity: 1, price: 300, tva: 20, discount:0 },
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

			addRow() {
			  this.items.push({ description: "", quantity: 1, price: 0, discount: 0 });
			},

			updateExpiration() {
				this.expire_at = moment(this.created_at).add(1, 'M').format('YYYY-MM-DD');
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

	.invoice-box {
	  max-width: 100%;
	  margin: auto;
	  padding: 30px;
	  border: 1px solid #eee;
	  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
	  font-size: 16px;
	  line-height: 24px;
	  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
	  color: #555;
	}

	.invoice-box table {
	  width: 100%;
	  line-height: inherit;
	  text-align: left;
	}

	.invoice-box table td {
	  padding: 5px;
	  vertical-align: top;
	}

	.invoice-box table tr td:nth-child(n + 2) {
	  text-align: right;
	}

	.invoice-box table tr.top table td {
	  padding-bottom: 20px;
	}

	.invoice-box table tr.top table td.title {
	  font-size: 45px;
	  line-height: 45px;
	  color: #333;
	}

	.invoice-box table tr.information table td {
	  padding-bottom: 40px;
	}

	.invoice-box table tr.heading td {
	  background: #eee;
	  border-bottom: 1px solid #ddd;
	  font-weight: bold;
	}

	.invoice-box table tr.details td {
	  padding-bottom: 20px;
	}

	.invoice-box table tr.item td {
	  border-bottom: 1px solid #eee;
	}

	.invoice-box table tr.item.last td {
	  border-bottom: none;
	}

	.invoice-box table tr.item input {
	  padding-left: 5px;
	}

	.invoice-box table tr.item td:first-child input {
	  margin-left: -5px;
	  width: 100%;
	}

	.invoice-box table tr.total td:nth-child(2) {
	  border-top: 2px solid #eee;
	  font-weight: bold;
	}

	.invoice-box input[type="number"] {
	  width: 60px;
	}

	@media only screen and (max-width: 600px) {
	  .invoice-box table tr.top table td {
	    width: 100%;
	    display: block;
	    text-align: center;
	  }

	  .invoice-box table tr.information table td {
	    width: 100%;
	    display: block;
	    text-align: center;
	  }
	}

</style>