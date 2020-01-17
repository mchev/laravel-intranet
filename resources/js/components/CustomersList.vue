<template>

	<div>

        <div class="row mb-3">

            <div class="col-md-6">
                <input type="text" class="form-control" v-model="query" @keyup="fetch" placeholder="Rechercher">
            </div>

            <div class="col-md-6 text-right">
                <button class="btn btn-secondary" disabled>{{ pagination.total }} clients</button>
                <a href="/customers/create"  class="btn btn-success" title="Ajouter un client"><i class="fas fa-plus"></i> Ajouter un client</a>
            </div>

        </div>


        <table class="table bg-white table-striped">
            
            <thead>
                <tr>
                    <th v-for="column in columns" @click="changeOrder(column.field)"><a href="#" class="text-dark">{{ column.label }}</a></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="row in rows">
                    <td>{{ row.id }}</td>
                    <td><a :href="'/customers/' + row.id">{{ row.name }}</a></td>
                    <td>{{ row.phone }}</td>
                    <td><a :href="'mailto:' + row.email">{{ row.email }}</a></td>
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
                columns: [
                    {label: 'id', field: 'id'},
                    {label: 'Nom', field: 'name'},
                    {label: 'Téléphone', field: 'phone'},
                    {label: 'Email', field: 'email'},
                ],
                rows: [],
                pagination: {
                    perPage: 20,
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
                order: 'name'
            }
        },

        methods : {

            fetch() {
                axios.get('/customers?page=' + this.pagination.currentPage + '&paginate=' + this.pagination.perPage + '&q=' + this.query + '&order=' + this.order).then(response => {
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

        },

        mounted() {
            this.fetch()
        },

        created: function(){
            
        },

        computed: {

        },

    }

</script>