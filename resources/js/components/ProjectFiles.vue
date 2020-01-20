<template>

    <div>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Opération</th>
                    <th>Ouvert le</th>
                    <th>Budget</th>
                    <th>Heures</th>
                    <th>Devis</th>
                    <th>Facture</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row.id">
                    <td><a href="#" @click="editFile(row)">{{ row.title }}</a></td>
                    <td>{{ row.opened_at | moment("DD/MM/YYYY") }}</td>
                    <td><input type="number" step="any" class="form-control"></td>
                    <td>{{ row.hours | seconds }}</td>
                    <td><button class="btn btn-secondary"><i class="fas fa-plus"></i> Créer un devis</button></td>
                    <td><button class="btn btn-secondary"><i class="fas fa-plus"></i> Créer une facture</button></td>
                    <td><button class="btn btn-warning"><i class="fas fa-lock"></i> Clôturer</button></td>
                </tr>
            </tbody>
        </table>

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
                return (Math.floor(time / 3600)) + "h " + ("0" + Math.floor(time / 60) % 60).slice(-2) + "m";
            }
        }


    }

</script>


<style scoped>

    .table > tbody > tr > td {
         vertical-align: middle;
    }

</style>