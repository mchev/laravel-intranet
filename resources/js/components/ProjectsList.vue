<template>

    <div>

        <div class="row mb-3">

            <div class="col-md-6">
                <input type="text" class="form-control" v-model="query" @keyup="fetch" placeholder="Rechercher (Client, Nom, Référence)">
            </div>

            <div class="col-md-6 text-right">
                <a href="/projects/create"  class="btn btn-success" title="Ajouter un projet"><i class="fas fa-plus"></i> Ajouter un projet</a>
                <a href="/projects/billable"  class="btn btn-info" title="Voir la liste des projets à facturer"><i class="fas fa-filter"></i> À facturer</a>
                <a href="/projects/archives"  class="btn btn-info" title="Consulter les archives"><i class="fas fa-archive"></i> Consulter les archives</a>
            </div>

        </div>


        <div class="card my-3" v-for="customer in rows">

            <div class="card-header">

                <div class="row">

                    <div class="col">
                        <h5><a :href="'/customers/' + customer.id + '/edit'">{{ customer.name }}</a></h5>
                    </div>

                </div>

            </div>

            <div class="card-body">

                <div class="table-responsive">

                    <table class="table table-striped">

                        <thead>
                            <tr>
                                <th>Référence</th>
                                <th>Nom</th>
                                <th>Type</th>
                                <th>Statut</th>
                                <th>Budget</th>
                                <th>Heures</th>
                                <th>À facturer le</th>
                                <th>Modifié le</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr class="pl-2" v-for="project in customer.projects">
                                <td>{{ project.ref }}</td>
                                <td width="20%"><a :href="'/projects/' + project.id + '/edit'">{{ project.name }}</a></td>
                                <td width="10%">{{ project.type.label }}</td>
                                <td width="10%">{{ project.state.label }}</td>
                                <td width="10%">{{ project.budget }} <span v-if="project.budget">€</span></td>
                                <td width="10%">{{ project.total_seconds | seconds }}</td>
                                <td width="20%" v-if="project.file[0]">{{ project.file[0].estimated_facturation_date | moment('DD/MM/Y') }}</td>
                                <td width="20%" v-else></td>
                                <td width="20%">{{ project.updated_at | moment('DD/MM/Y HH:mm') }}</td>
                                <td><a :href="'/projects/' + project.id + '/edit'" title="Modifier"><i class="far fa-edit"></i></a></td>
                            </tr>
                        </tbody>

                    </table>

                </div>

            </div>

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
                columns: [
                    {label: 'id', field: 'id'},
                    {label: 'Nom', field: 'name'},
                    {label: 'Téléphone', field: 'phone'},
                    {label: 'Email', field: 'email'},
                ],
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
                order: 'name',
            }
        },

        methods : {

            fetch() {
                axios.get('/projects?page=' + this.pagination.currentPage + '&paginate=' + this.pagination.perPage + '&q=' + this.query + '&order=' + this.order).then(response => {
                    this.rows = response.data.data;
                    console.log(this.rows)

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
            this.fetch();
        },

        created: function(){
            
        },

        filters: {
            seconds: function (time) {
                return (Math.floor(time / 3600)) + "h" + ("0" + Math.floor(time / 60) % 60).slice(-2);
            },
        },

    }

</script>