<template>

	<div>

        <div class="row mb-3">

            <div class="col">
                <input type="text" class="form-control" v-model="query" @keyup="fetch" placeholder="Rechercher (Nom, Projet, Client)">
            </div>

            <div class="col">
                <datetime range :max-date="maxDate" format="YYYY-MM-DD" formatted="DD/MM/YYYY" :custom-shortcuts="shortcuts" v-on:validate="fetch" v-model="range" class="w-100" label="Sélectionner une plage de dates"></datetime>
            </div>

            <div class="col text-right">
                <button class="btn btn-info d-print-none" @click="print" title="Imprimer">
                    <i class="fas fa-print"></i>
                </button>
                <div class="btn btn-info"><i class="far fa-clock"></i> {{ total | seconds }}</div>
                <a href="#" data-toggle="modal" data-target="#createHoursModal" class="btn btn-success d-print-none" title="Ajouter un client"><i class="fas fa-plus"></i> <span v-if="!project">Ajouter des heures</span></a>
            </div>

        </div>

        <div class="row mb-3">

            <div v-for="group in groups" class="col">

                <div class="card">
                    <div class="card-header">
                        {{ group[0].user.name }}
                    </div>
                    <div class="card-body">
                        {{ group | totalseconds | seconds }}
                    </div>
                </div>

            </div>

        </div>

        <div class="table-responsive">

            <table class="table bg-white table-bordered table-striped">
                
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th v-if="!project">Projet</th>
                        <th>Date</th>
                        <th>Temps</th>
                        <th>Commentaire</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="row in rows">
                        <td>{{ row.user.name }}</td>
                        <td v-if="!project">{{ row.project.customer.name }} - {{ row.project.name }}</td>
                        <td>{{ row.date | moment('DD/MM/Y') }}</td>
                        <td>{{ row.time }}</td>
                        <td>{{ row.comment }}</td>
                        <td>
                            <button class="btn btn-default text-info" @click="editHour(row)">
                                <i class="far fa-edit"></i>
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-default text-danger" @click="deleteHour(row)">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>


        <div class="modal fade" id="createHoursModal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
                <add-hours></add-hours>
            </div>
          </div>
        </div>

        <div class="modal fade" id="editHoursModal" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
                <edit-hours v-if="current" :hour="current" @update-hour="updateHour"></edit-hours>
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
                users: [],
                project_id: (this.project) ? this.project.id : null,
                rows: [],
                query: '',
                order: 'date',
                range: {
                    start: (this.project) ? moment(this.project.created_at).format('YYYY-MM-DD') : moment().subtract(1, "month").format('YYYY-MM-DD'),
                    end: moment().format('YYYY-MM-DD')
                },
                shortcuts : [
                  { key: 'thisWeek', label: 'Cette semaine', value: 'isoWeek' },
                  { key: 'lastWeek', label: 'Sem. dernière', value: '-isoWeek' },
                  { key: 'last7Days', label: '-7 jours', value: 7 },
                  { key: 'last30Days', label: '-30 jours', value: 30 },
                  { key: 'thisMonth', label: 'Mois en cours', value: 'month' },
                  { key: 'lastMonth', label: 'Le mois dernier', value: '-month' },
                  { key: 'thisYear', label: 'Cette année', value: 'year' },
                  //{ key: 'lastYear', label: 'L\'année dernière', value: '-year' }
                ],
                maxDate: moment().format('YYYY-MM-DD'),
                current: null,
            }
        },

        methods : {

            fetch() {
                axios.get('/hours?project=' + this.project_id + '&q=' + this.query + '&order=' + this.order + '&start=' + this.range.start + '&end=' + this.range.end).then(response => {
                    this.rows = response.data;
                });
            },

            changeOrder(field) {
                this.order = field;
                this.fetch();
            },

            editHour(row) {
                this.current = row;
                $('#editHoursModal').modal('show');
            },

            updateHour(e) {
                $('#editHoursModal').modal('hide');
            },

            deleteHour(hour) {
                axios.delete('/hours/' + hour.id).then(response => {
                    this.fetch();
                })
            },

            print() {
                window.print();
            },

            groupBy(array, key){
              const result = {}
              array.forEach(item => {
                if (!result[item[key]]){
                  result[item[key]] = []
                }
                result[item[key]].push(item)
              })
              return result
            }

        },

        mounted() {
            this.fetch();
        },

        computed: {

            total: function() {
                return this.rows.reduce(function(total, item) {
                    var time = moment.duration(item.time).asSeconds();
                    return total + time; 
                },0);
            },

            groups: function() {
                return this.groupBy(this.rows, 'user_id')
            }
        },

        filters: {
            seconds: function (time) {
                return (Math.floor(time / 3600)) + "h" + ("0" + Math.floor(time / 60) % 60).slice(-2);
            },
            totalseconds: function(rows) {
                return rows.reduce(function(total, item) {
                    var time = moment.duration(item.time).asSeconds();
                    return total + time; 
                },0);
            },
        }

    }

</script>