<template>

    <div class="card">

        <div class="card-header">
            <h5 class="card-title">Dossiers de gestion</h5>
        </div>

        <div class="card-body">

            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Opération</th>
                            <th>Date d'ouverture</th>
                            <th>Date de fermeture</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in rows" :key="row.id">
                            <td>{{ row.title }}</td>
                            <td>{{ row.opened_at | moment("calendar") }}</td>
                            <td>{{ row.closed_at }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>

</template>

<script>

    export default {

        props: ['project'],

        data(){
            return {
                rows: {},
            }
        },

        methods : {

            fetch() {
                axios.get('/project/' + this.project.id + '/files').then(response => {
                    this.rows = response.data;
                });
            },

        },

        mounted() {
            this.fetch()
        },

    }

</script>