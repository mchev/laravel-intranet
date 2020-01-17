<template>

	<div>

        <div class="row mb-3">

            <div class="col-md-6">
                <input type="text" class="form-control" v-model="query" @keyup="fetch" placeholder="Rechercher">
            </div>

            <div class="col-md-6 text-right">
                <button class="btn btn-secondary" disabled>{{ pagination.total }} utilisateurs</button>
                <button class="btn btn-success" title="Ajouter un client" data-toggle="modal" data-target="#editUserModal" @click="createUser">
                    <i class="fas fa-plus"></i> Ajouter un utilisateur
                </button>
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
                    <td><a href="#" data-toggle="modal" data-target="#editUserModal" @click="editUser(row)">{{ row.name }}</a></td>
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


        <!-- EDIT USER -->
        <div v-if="editingUser" class="modal" id="editUserModal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5>Utilisateur</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div v-if="errors_exist" class="alert alert-danger" role="alert">
                            <ul>
                                <div v-for="error in errors">
                                    <li>{{ error[0] }}</li>
                                </div>
                            </ul>
                        </div>

                        <form autocomplete="off">
                            <div class="form-group">
                                <label>Nom</label>
                                <input class="form-control" type="text" v-model="editingUser.name" required>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input class="form-control" type="text" v-model="editingUser.email" autocomplete="off" required>
                            </div>
                            <div class="form-group">
                                <label>Mot de passe</label>
                                <small class="text-danger">Remplace le mot de passe actuel.</small>
                                <input class="form-control" type="password" v-model="editingUser.newpassword" autocomplete="off">
                            </div>
                            <div v-if="user.is_admin" class="form-group">
                                <div class="custom-control custom-checkbox">
                                    <input v-model="editingUser.is_admin" type="checkbox" class="custom-control-input" id="adminChek">
                                    <label class="custom-control-label" for="adminChek">Administrateur</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                        <button v-if="newUser" class="btn btn-success" @click="storeUser">Enregistrer</button>
                        <button v-else class="btn btn-success" @click="updateUser">Enregistrer</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

    export default {

        props: ['user'],

        data(){
            return {
                columns: [
                    {label: 'id', field: 'id'},
                    {label: 'Nom', field: 'name'},
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
                editingUser: null,
                newUser: false,
                errors: null,
                errors_exist: false,
            }
        },

        methods : {

            fetch() {
                axios.get('/users?page=' + this.pagination.currentPage + '&paginate=' + this.pagination.perPage + '&q=' + this.query + '&order=' + this.order).then(response => {
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

            createUser() {
                this.newUser = true;
                this.editingUser = {
                    name: '',
                    email: '',
                    password: '',
                }
            },

            editUser(user) {
                this.editingUser = user;
            },

            storeUser() {

                this.errors_exist = false;

                axios.post('/users', this.editingUser).then(response => {
                    $('#editUserModal').modal('hide');
                    this.fetch();
                }).catch(error => {
                    this.errors_exist = true;
                    if(error.response.status === 422) {
                        this.errors = error.response.data.errors || {};
                    }
                });
            },

            updateUser() {
                axios.patch('/users/' + this.editingUser.id, this.editingUser).then(response => {
                    $('#editUserModal').modal('hide');
                    this.fetch();
                })
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