<template>

    <div>

        <div class="row mb-3">

            <div class="col-md-6">
                <input type="text" class="form-control" v-model="query" @keyup="fetch" placeholder="Rechercher">
            </div>

            <div class="col-md-6 text-right">
                <button class="btn btn-success" title="Créer une facture" data-toggle="modal" data-target=".invoice-modal-lg"><i class="fas fa-plus"></i> Créer une facture</button>
            </div>

        </div>

        <div class="table-responsive">

            <table class="table">

                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Date limite</th>
                        <th>Facture</th>
                        <th>Client</th>
                        <th>Balance</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr class="pl-2" v-for="invoice in rows">
                        <td><button class="btn btn-success">Payée</button></td>
                        <td>12/01/2020</td>
                        <td>FAC-20-0019</td>
                        <td>Elimeca</td>
                        <td>540€</td>
                        <td><i class="far fa-file-pdf"></i></td>
                    </tr>
                </tbody>

            </table>

        </div>


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
                    perPage: 5,
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
                axios.get('/projects?page=' + this.pagination.currentPage + '&paginate=' + this.pagination.perPage + '&q=' + this.query + '&order=' + this.order).then(response => {
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

            convertSeconds(seconds) {
                return moment('2000-01-01').add(seconds, 'seconds').format('HH:mm');
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