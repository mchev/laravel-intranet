<template>

    <div>

        <div class="board">

            <div class="list-wrapper" v-for="board in boards" :key="board.id">

                <div class="list">

                    <div class="list-header">
                        {{board.name}}
                    </div>

                    <div class="list-cards">

                        <draggable tag="div" v-model="task" v-bind="dragOptions" @start="drag = true" @end="changeOrder">

                            <transition-group type="transition" :id="board.id" :name="!drag ? 'flip-list' : null">

                                <a v-if="task" class="list-card" v-for="task in board.tasks" :key="task.id" @click="editTask(task)" :id="task.id" data-toggle="modal" data-target="#editTaskModal">

                                    <div class="list-card-details">

                                        <div class="list-card-labels">
                                            <span v-if="task.project" class="card-label tag card-label-null">{{ task.project.customer.name }} - {{ task.project.name }}</span>
                                            <div v-for="tag in task.tags" class="card-label tag" :class="'card-label-' + tag.color">{{ tag.label }}</div>
                                        </div>

                                        <div class="list-card-title">
                                            {{ task.name }}
                                        </div>

                                        <div class="badges">
                                            <div v-if="task.due_date" class="badge badge-default" :title="task.due_date | moment('from', 'now')">
                                                <i class="far fa-clock"></i> {{ task.due_date | moment("calendar") }}
                                            </div>
                                        </div>

                                    </div>

                                </a>

                                <a v-else class="list-card" style="min-height:1rem;">
                                    <div class="list-card-details">
                                    </div>
                                </a>

                            </transition-group>

                        </draggable>

                        <div v-if="creatingTask && creatingTask.id == board.id" class="card-composer">
                            <div class="list-card">
                                <div class="list-card-details">
                                    <textarea v-focus placeholder="Saisissez un titre pour cette carte..." v-model="newTaskName" @keyup.enter="storeTask" class="list-card-composer-textarea"></textarea>
                                    <v-select :options="projects" v-model="newTaskProject" label="name" class="mb-2" placeholder="Choisir un projet"></v-select>
                                    <button class="btn btn-success mb-2" @click="storeTask">Ajouter une carte</button>
                                    <button class="btn btn-secondary mb-2" @click="creatingTask = null"><i class="fas fa-times"></i></button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div v-if="!creatingTask || creatingTask.id !== board.id" class="card-composer-container">
                        <button class="btn btn-board btn-sm" @click="createTask(board)"><i class="fas fa-plus"></i> Ajouter une autre carte</button>
                    </div>

                </div>

            </div>

        </div>

        <!-- MODALS -->
        <div v-if="editingTask" class="modal fade" id="editTaskModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" v-text="editingTask.name" contenteditable @keydown.enter.prevent="editTitle" @blur="editTitle"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                <div class="row">

                    <div class="col-md-8 mb-3">

                        <h4><i class="far fa-folder-open"></i> Projet</h4>
                        <v-select :options="projects" @input="endEditing" v-model="editingTask.project_id" :reduce="name => name.id" label="name" class="mb-2" placeholder="Choisir un projet"></v-select>

                        <h4><i class="fas fa-align-left"></i> Description</h4>
                        <textarea-autosize class="form-control description-content" v-model="editingTask.description" @blur.native="endEditing" placeholder="Ajouter une description plus détaillée...">{{ editingTask.description }}</textarea-autosize>

                        <h4><i class="fas fa-tasks"></i> Checklist</h4>
                        <task-checklists :task="editingTask" :key="editingTask.id"></task-checklists>

                    </div>

                    <div class="col-md-4">

                        <button class="btn btn-block text-left btn-secondary" data-toggle="modal" data-target="#tagsModal"><i class="fas fa-tag"></i> Étiquettes</button>
                        <button v-for="tag in editingTask.tags" class="btn btn-block card-label" :class="'card-label-' + tag.color" data-toggle="modal" data-target="#tagsModal">
                            {{ tag.label }}
                        </button>
                        <hr>
                        <h6>Date limite</h6>
                        <datetime v-model="editingTask.due_date" type="datetime" v-on:validate="endEditing" noLabel format="YYYY-MM-DD HH:mm:ss"/>
                        <template v-if="editingTask.project">
                            <hr>
                            <h6>Chronomètre</h6>
                            <chronometer :task="editingTask" :key="editingTask.id"></chronometer>
                        </template>
                        <hr>
                        <button class="btn btn-block text-left btn-secondary" @click="archiveTask"><i class="fas fa-archive"></i> Archiver</button>
                        <button class="btn btn-block text-left btn-danger" @click="deleteTask"><i class="fas fa-trash"></i> Supprimer</button>


                    </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- TAGS -->
        <div v-if="editingTask" class="modal" id="tagsModal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="false">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <tags :task.sync="editingTask"></tags>
                </div>
            </div>
        </div>


    </div>

</template>

<script>

    import draggable from 'vuedraggable'

    export default {

        props: ['type'],

        components: {
            draggable
        },

        data(){
            return {
                ajaxUrl: (this.type == 'user') ? '/user/board' : '/boards',
                drag: null,
                boards: [],
                projects: [],
                task: null,
                editingTask : null,
                creatingTask: null,
                newTaskName: '',
                newTaskProject: null
            }
        },

        methods : {

            fetch() {
                axios.get(this.ajaxUrl).then(response => {
                    this.boards = response.data.boards;
                    this.projects = response.data.projects;
                });
            },

            createTask(board) {

                this.creatingTask = board;

            },

            storeTask() {

                if(this.newTaskName !== "") {

                    let board = this.creatingTask;

                    let name = this.newTaskName
                    let order = board.tasks.length + 100
                    let board_id = board.id
                    let project_id = (this.newTaskProject) ? this.newTaskProject.id : null

                    axios.post('/task', {name, order, board_id, project_id}).then(response => {
                        board.tasks.push(response.data.data);
                        this.creatingTask = null;
                        this.newTaskName = '';
                        this.fetch();
                    })

                } else {
                    this.creatingTask = null;
                }

            },

            changeOrder(data) {

                let task_id = data.item.id;
                let board_id = data.to.id;
                let order = data.newIndex;

                axios.patch(`/task/${task_id}`, {order, board_id}).then(response => {
                    this.fetch();
                });

            },

            endEditing() {
                axios.patch(`/task/${this.editingTask.id}`, this.editingTask).then(response => {
                    this.fetch();
                })
            },

            editTask(task){
                this.editingTask = task;
            },

            editTitle(event) {
                var src = event.target.innerText
                this.editingTask.name = src;
                this.endEditing();
            },

            archiveTask() {
               if(confirm("Voulez-vous vraiment archiver cette carte ?")){
                    axios.get('/task/archive/'+this.editingTask.id)
                    .then(resp => {
                        this.fetch();
                        $('#editTaskModal').modal('hide');
                        this.editingTask = null;
                    })
                    .catch(error => {
                        console.log(error);
                    })
               }
            },

            deleteTask() {
               if(confirm("Voulez-vous supprimer définitivement cette carte ?")){
                    axios.delete('/task/'+this.editingTask.id)
                    .then(resp => {
                        this.fetch();
                        $('#editTaskModal').modal('hide');
                        this.editingTask = null;
                    })
                    .catch(error => {
                        console.log(error);
                    })
               }

            },

        },

        mounted() {

            this.fetch();

        },

        computed: {
            dragOptions() {
              return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
              };
            }
        },

    }

</script>