<template>

	<div>

        <div class="row mb-3">

            <div class="col-md-4">
                <input type="text" class="form-control" v-model="query" @keyup="fetch" placeholder="Rechercher">
            </div>

            <div class="col-md-4">
                <datetime range :max-date="maxDate" format="YYYY-MM-DD" formatted="DD/MM/YYYY" :custom-shortcuts="shortcuts" v-on:validate="fetch" v-model="range" label="Sélectionner une plage de dates"></datetime>
            </div>

            <div class="col-md-4 text-right">
                <button class="btn btn-info" @click="print" title="Imprimer"><i class="fas fa-print"></i></button>
                <div v-if="project" class="btn btn-info disabled">Total : {{ project.total_seconds | seconds }}</div>
                <a href="#" data-toggle="modal" data-target="#createHoursModal" class="btn btn-success" title="Ajouter un client"><i class="fas fa-plus"></i> <span v-if="!project">Ajouter des heures</span></a>
            </div>

        </div>

        <div id="print" class="table-responsive">

            <table class="table bg-white table-striped">
                
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th v-if="!project">Projet</th>
                        <th>Date</th>
                        <th>Temps</th>
                        <th>Commentaire</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="row in rows">
                        <td>{{ row.user.name }}</td>
                        <td v-if="!project">{{ row.project.customer.name }} - {{ row.project.name }}</td>
                        <td>{{ row.date | moment('DD/MM/Y') }}</td>
                        <td>
                            <input v-if="$userId === row.user_id && !project" class="form-control" type="time" readonly @dblclick="toggleReadonly" @keyup.enter="updateHour($event, row)" @blur="updateHour($event, row)" v-model="row.time"/>
                            <span v-else>{{ row.time }}</span>
                        </td>
                        <td>
                            <input v-if="$userId === row.user_id && !project" class="form-control" type="text" readonly @dblclick="toggleReadonly" @keyup.enter="updateHour($event, row)" @blur="updateHour($event, row)" v-model="row.comment"/>
                            <span v-else>{{ row.comment }}</span>
                        </td>
                        <th><button class="btn btn-default text-danger" @click="deleteHour(row)"><i class="far fa-trash-alt"></i></button></th>
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
                users: [],
                project_id: (this.project) ? this.project.id : null,
                rows: [],
                pagination: {
                    perPage: 30,
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
                order: 'date',
                range: {
                    start: moment().subtract(1, "month").format('YYYY-MM-DD'),
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
            }
        },

        methods : {

            fetch() {
                axios.get('/hours?page=' + this.pagination.currentPage + '&paginate=' + this.pagination.perPage + '&project=' + this.project_id + '&q=' + this.query + '&order=' + this.order + '&start=' + this.range.start + '&end=' + this.range.end).then(response => {
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

            updateHour(event, hour) {
                event.preventDefault();
                event.target.setAttribute('readonly', 'readonly');
                axios.patch('/hours/' + hour.id, hour).then(response => {
                    this.fetch();
                })
            },

            deleteHour(hour) {
                axios.delete('/hours/' + hour.id).then(response => {
                    this.fetch();
                })
            },

            toggleReadonly(event){
                event.preventDefault()
                if(event.target.getAttribute('readonly') == 'readonly'){
                    event.target.removeAttribute('readonly')
                }
            },

            print() {
                // Get HTML to print from element
                const prtHtml = document.getElementById('print').innerHTML;

                // Get all stylesheets HTML
                let stylesHtml = '';
                for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                  stylesHtml += node.outerHTML;
                }

                // Open the print window
                const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

                WinPrint.document.write(`<!DOCTYPE html>
                <html>
                  <head>
                    ${stylesHtml}
                  </head>
                  <body>
                    ${prtHtml}
                  </body>
                </html>`);

                WinPrint.document.close();
                WinPrint.focus();
                WinPrint.print();
                WinPrint.close();
            }

        },

        mounted() {
            this.fetch()
        },

        filters: {
            seconds: function (time) {
                return (Math.floor(time / 3600)) + "h" + ("0" + Math.floor(time / 60) % 60).slice(-2) + "m";
            }
        }

    }

</script>