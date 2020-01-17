<template>

	<div>

        <div class="row mb-3">

            <div class="col-md-6">
                <input type="text" class="form-control" v-model="query" @keyup="fetch" placeholder="Rechercher">
            </div>

            <div class="col-md-6 text-right">
                <button class="btn btn-secondary" disabled>{{ pagination.total }} mot<span v-if="pagination.total > 1">s</span> de passe</button>
            </div>

        </div>

        <table class="table bg-white table-striped">
            
            <thead>
                <tr>
                    <th>Client</th>
                    <th>Type</th>
                    <th>Nom</th>
                    <th>Url</th>
                    <th></th>
                    <th>Identifiant</th>
                    <th>Mot de passe</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>
                        <v-select :options="customers" v-model="create.customer_id" label="name">
                            <template #search="{attributes, events}">
                                <input
                                    class="vs__search"
                                    :required="!create.customer_id"
                                    v-bind="attributes"
                                    v-on="events"
                                />
                            </template>                 
                        </v-select>                        
                    </td>
                    <td>
                        <select v-model="create.type" class="form-control">
                            <option value="Wordpress">Wordpress</option>
                            <option value="FTP">FTP</option>
                            <option value="SQL">SQL</option>
                            <option value="OVH">OVH</option>
                            <option value="Email">Email</option>
                            <option value="Autres">Autres</option>
                        </select>
                    </td>
                    <td><input type="text" v-model="create.name" class="form-control"></td>
                    <td><input type="text" v-model="create.url" class="form-control" placeholder="https://"></td>
                    <td></td>
                    <td><input type="text" v-model="create.user" class="form-control"></td>
                    <td><input type="text" v-model="create.password" class="form-control"></td>
                    <td><button class="btn btn-success" @click="storePassword"><i class="fas fa-plus"></i></button></td>
                </tr>
                <tr v-for="(row, index) in rows">
                    <td>{{ row.customer.name }}</td>
                    <td>{{ row.type }}</td>
                    <td><input class="form-control" type="text" readonly @dblclick="toggleReadonly" @keyup.enter="updatePassword($event, row)" @blur="updatePassword($event, row)" v-model="row.name"/></td>
                    <td><input class="form-control" type="text" readonly @dblclick="toggleReadonly" @keyup.enter="updatePassword($event, row)" @blur="updatePassword($event, row)" v-model="row.url"/></td>
                    <td><a :href="row.url" class="btn btn-sm btn-secondary" target="_blank"><i class="fas fa-external-link-alt"></i></a></td>
                    <td><input class="form-control" type="text" readonly @dblclick="toggleReadonly" @keyup.enter="updatePassword($event, row)" @blur="updatePassword($event, row)" v-model="row.user"/></td>
                    <td><input class="form-control" type="text" readonly @dblclick="toggleReadonly" @keyup.enter="updatePassword($event, row)" @blur="updatePassword($event, row)" v-model="row.password"/></td>
                    <td><button class="btn btn-sm btn-danger" @click="deletePassword(row, index)"><i class="far fa-trash-alt"></i></button></td>
                </tr>
            </tbody>

        </table>

        <nav v-if="pagination.total > pagination.perPage">
          <ul class="pagination">
            <li class="page-item" :disabled="pagination.prevPage ? false : true"><a class="page-link" @click="gotoPage(pagination.prevPageId)" href="#" title="Précédent">
                <i class="fas fa-chevron-left"></i></a>
            </li>
            <li v-for="i in Math.ceil(pagination.total / pagination.perPage)" :key="i" class="page-item" :class="{active: i == pagination.currentPage}">
                <a class="page-link" @click="gotoPage(i)" href="#">{{ i }}</a>
            </li>
            <li class="page-item" :disabled="pagination.nextPage ? false : true">
                <a class="page-link" @click="gotoPage(pagination.nextPageId)" href="#" title="Suivant"><i class="fas fa-chevron-right"></i></a>
            </li>
          </ul>
        </nav>

    </div>

</template>

<script>

    export default {

        data(){
            return {
                rows: [],
                pagination: {
                    perPage: 30,
                    currentPage: 1,
                    total: 0,
                    nextPage: '',
                    prevPage: '',
                    nextPageId: 2,
                    prevPageId: 1,
                    firstPage: '',
                    lastPage: '',
                    from: '',
                    to: ''
                },
                query: '',
                order: 'name',
                customers: [],
                type: 'password',
                create: {
                    customer_id: null,
                    type: 'Wordpress',
                    name: null,
                    url: null,
                    user: null,
                    password: null,
                },
                passwordFieldType: 'password'
            }
        },

        methods : {

            fetch() {
                axios.get('/passwords?page=' + this.pagination.currentPage + '&paginate=' + this.pagination.perPage + '&q=' + this.query + '&order=' + this.order).then(response => {
                    this.rows = response.data.data;
                    this.pagination = {
                        perPage: this.pagination.perPage,
                        currentPage: response.data.current_page,
                        total: response.data.total,
                        nextPage: response.data.next_page_url,
                        prevPage: response.data.prev_page_url,
                        nextPageId: parseInt(response.data.current_page) + 1,
                        prevPageId: parseInt(response.data.current_page) - 1,
                        firstPage: response.data.first_page_url,
                        lastPage: response.data.last_page_url,
                        from: response.data.from,
                        to: response.data.to,
                    };
                });
            },

            changeOrder(field) {
                this.order = field;
                this.fetch();
            },

            gotoPage(id) {
                this.pagination.currentPage = id;
                this.fetch();
            },

            storePassword() {

                this.create.customer_id = this.create.customer_id.id;

                axios.post('/passwords', this.create)
                    .then(response => {
                        this.rows.unshift(response.data);
                        this.pagination.total++;
                        this.create = {
                            customer_id: null,
                            type: 'Wordpress',
                            name: null,
                            url: null,
                            user: null,
                            password: null,
                        }
                    })
                    .catch(errors => {
                        console.log(errors);
                    });          
            },

            updatePassword(event, row) {
                event.preventDefault()
                event.target.setAttribute('readonly', 'readonly')
                axios.patch('/passwords/' + row.id, row)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(errors => {
                        console.log(errors);
                    });
            },

            deletePassword(password, index) {
                axios.delete('/passwords/' + password.id)
                    .then(response => {
                        this.rows.splice(index,1);
                    })
                    .catch(errors => {
                        console.log(errors);
                    });
            },

            getCustomers(){
                axios.get('/customers/list')
                    .then(response => {
                        this.customers = response.data;
                    })
                    .catch(errors => {
                        console.log(errors);
                    });
            },

            toggleReadonly(event){
                event.preventDefault()
                if(event.target.getAttribute('readonly') == 'readonly'){
                    event.target.removeAttribute('readonly')
                }
            },


        },

        mounted() {
            this.fetch();
            this.getCustomers();
        },

        created: function(){
            
        },

        computed: {

        },

    }

</script>