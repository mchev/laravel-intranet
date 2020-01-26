<template>

    <div>

        <template v-if="rows.length">

            <div class="row mb-3">

                <div class="col-md-6">
                    <input type="text" class="form-control" v-model="query" @keyup="fetch" placeholder="Rechercher">
                </div>

                <div class="col-md-6 text-right">
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
                        <tr class="pl-2" v-for="row in rows">
                            <td><button class="btn" :class="'btn-' + row.status.color">{{ row.status.label }}</button></td>
                            <td>{{ row.expire_at }}</td>
                            <td>{{ row.ref }}</td>
                            <td>{{ row.customer.name }}</td>
                            <td>{{ row.total + row.tva | rounded }}€ TTC</td>
                            <td><a title="Visualiser" :href="'/docs/' + row.id"><i class="far fa-eye"></i></a></td>
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

        </template>

        <template v-else>
            <div class="alert alert-info">
                Aucun document
            </div>
        </template>

    </div>

</template>

<script>

    export default {

        data(){
            return {
                rows: [],
                type: 'invoice',
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
                order: 'expire_at'
            }
        },

        methods : {

            fetch() {
                axios.get('/docs/list?type=' + this.type + '&page=' + this.pagination.currentPage + '&paginate=' + this.pagination.perPage + '&q=' + this.query + '&order=' + this.order).then(response => {
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