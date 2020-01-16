<template>

    <div class="card">

        <div class="card-header">
            <h5 class="card-title">Dossiers de gestion</h5>
        </div>

        <div class="card-body">

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Opération</th>
                            <th>Statut</th>
                            <th>Date d'ouverture</th>
                            <th>Date de clôture</th>
                            <th>Devis</th>
                            <th>Date Facturation</th>
                            <th>Heures</th>
                            <th>Montant HT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in rows" :key="row.id">
                            <td><a href="#" @click="editFile(row)">{{ row.title }}</a></td>
                            <td>
                                <v-select :options="states" v-model="row.state_id" :reduce="label => label.id" label="label"></v-select>
                            </td>
                            <td>{{ row.opened_at | moment("calendar") }}</td>
                            <td><input type="date" class="form-control" v-model="row.closed_at"></td>
                            <td>
                                <div class="form-check form-check-inline">
                                    <input type="checkbox" class="form-check-input" v-model="row.is_quoted">
                                </div>
                            </td>
                            <td><input type="date" class="form-control" v-model="row.facturation_date"></td>
                            <td>{{ row.hours | seconds }}</td>
                            <td><input class="form-control" type="text" v-model="row.invoice_total_ht"></td>
                            <td>
                                <div class="btn-group">
                                    <button class="btn btn-info" @click="editFile(row)"><i class="far fa-eye"></i></button>
                                    <button class="btn btn-warning">A facturer</button>
                                    <button class="btn btn-success" @click="validateFile(row)">Valider</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>


        </div>

    </div>

</template>

<script>

    export default {

        props: ['project'],

        data(){
            return {
                rows: {},
                states: {},
                file: null,
            }
        },

        methods : {

            fetch() {
                axios.get('/project/' + this.project.id + '/files').then(response => {
                    this.rows = response.data.files;
                    this.states = response.data.states;
                });
            },

            editFile(file) {
                this.file = file;
            },

            updateFile(file) {
                axios.patch('/project/' + this.project.id + '/files', file).then(response => {
                    this.rows = response.data.files;
                    this.states = response.data.states;
                });
            },

            validateFile(file) {
                axios.patch('/project/files/' + file.id + '/validate', file).then(response => {
                    this.fetch();
                });          
            }

        },

        mounted() {
            this.fetch()
        },

        filters: {
            seconds: function (time) {
                return (Math.floor(time / 3600)) + ":" + ("0" + Math.floor(time / 60) % 60).slice(-2) + ":" + ("0" + time % 60).slice(-2)
            }
        }


    }

</script>


<style scoped>

    .table > tbody > tr > td {
         vertical-align: middle;
    }

</style>