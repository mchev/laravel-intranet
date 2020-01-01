<template>

	<div>

        <div class="row mb-3">

            <div class="col-md-6">
                <input type="text" class="form-control" v-model="query" @keyup="fetch" placeholder="Rechercher">
            </div>

            <div class="col-md-6 text-right">
                <div v-if="project" class="btn btn-secondary disabled">{{ project.total_seconds }}</div>
                <a href="#" data-toggle="modal" data-target="#createHoursModal" class="btn btn-success" title="Ajouter un client"><i class="fas fa-plus"></i> <span v-if="!project">Ajouter des heures</span></a>
            </div>

        </div>

        <div class="table-responsive">

            <table class="table bg-white table-striped">
                
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th v-if="!project">Projet</th>
                        <th>Date</th>
                        <th>Temps</th>
                        <th>Commentaire</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="row in rows">
                        <td>{{ row.user.name }}</td>
                        <td v-if="!project">{{ row.project.customer.name }} - {{ row.project.name }}</td>
                        <td>{{ row.date | moment('DD/MM/Y') }}</td>
                        <td>{{ row.time }}</td>
                        <td>{{ row.comment }}</td>
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


        <div class="modal fade" id="createHoursModal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
                <add-hours></add-hours>
            </div>
          </div>
        </div>


    </div>

</template>

<script>

    export default {

        props: ['project'],

        data(){
            return {
                project_id: (this.project) ? this.project.id : null,
                rows: [],
                pagination: {
                    perPage: 10,
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
                order: 'date'
            }
        },

        methods : {

            fetch() {
                axios.get('/hours?page=' + this.pagination.currentPage + '&paginate=' + this.pagination.perPage + '&project=' + this.project_id + '&q=' + this.query + '&order=' + this.order).then(response => {
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