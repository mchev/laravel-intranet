<template>

    <div>

        <table class="table table-striped">
            <thead>
                <tr class="text-center">
                    <th>Ouvert</th>
                    <th>Clos</th>
                    <th>Montant à facturer</th>
                    <th>Date estimée de facturation</th>
                    <th>Heures</th>
                    <th>Devis</th>
                    <th>Facture</th>
                    <th>Montant facturé</th>
                    <th>Total achats</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row.id">

                    <td class="text-center">
                        {{ row.opened_at | moment("DD/MM") }}<br>
                        {{ row.opened_at | moment("YYYY") }}
                    </td>

                    <td class="text-center">
                        <template v-if="row.closed_at">
                            {{ row.closed_at | moment("DD/MM") }}<br>
                            {{ row.closed_at | moment("YYYY") }}
                        </template>
                        <button v-else class="btn btn-warning" @click="validateFile(row)" title="Clôturer"><i class="fas fa-lock"></i></button>
                    </td>

                    <td>
                        <input type="number" step="any" class="form-control" v-model="row.invoice_estimated" :readonly="row.closed_at">
                    </td>

                    <td><input type="date" class="form-control" v-model="row.estimated_facturation_date" :readonly="row.closed_at"></td>
                    <td>{{ row.hours | seconds }}</td>
                    <td>
                        <a v-if="row.estimate && row.estimate.status_id === 1" :href="'/docs/' + row.estimate.id + '/edit'" class="btn btn-info" title="Modifier un devis">{{ row.estimate.ref }}</a>
                        <a v-else :href="'/docs/create?file=' + row.id + '&type=estimate'" class="btn btn-secondary" title="Créer un devis"><i class="fas fa-plus"></i> Devis</a>
                    </td>
                    <td>
                        <a v-if="row.invoice && row.invoice.status_id === 1" :href="'/docs/' + row.invoice.id + '/edit'" class="btn btn-info" title="Modifier une facture">{{ row.invoice.ref }}</a>
                        <a v-else :href="'/docs/create?file=' + row.id + '&type=invoice'" class="btn btn-secondary" title="Créer une facture"><i class="fas fa-plus"></i> Facture</a>
                    </td>
                    <td><input type="number" step="any" v-model="row.invoice_total_ht" class="form-control"></td>
                    <td><input type="number" step="any" v-model="row.invoice_total_purchases" class="form-control"></td>
                    <td><button class="btn btn-success" @click="updateFile(row)"><i class="far fa-save"></i></button></td>
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
                axios.patch('/project/files/' + file.id + '/update', file).then(response => {
                    //this.fetch();
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