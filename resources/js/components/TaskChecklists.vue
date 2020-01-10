<template>

	<div>

        <template v-if="checklist.length">

            <div class="row d-flex align-items-center mb-2">
                <div class="col-1">
                    <small>{{ percentage }}%</small>
                </div>
                <div class="col-11">
                    <div class="progress" style="height:5px">
                        <div class="progress-bar" role="progressbar" :style="'width: ' + percentage +'%'" :aria-valuenow="percentage" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>

            <div v-for="item in checklist" :key="item.id" class="form-group m-0">
                <input :id="'check-' + item.id" class="form-check-input" type="checkbox" true-value="1" false-value="0" v-model.number="item.checked" @click="updateItem(item)">
                <label :for="'check-' + item.id" :class="{strike: item.checked}">
                    <span></span>{{ item.title }}
                    <a href="#" class="delete-button text-danger" @click="deleteItem(item)"><i class="far fa-trash-alt"></i></a>
                </label>
            </div>

        </template>

        <template v-if="creatingItem">
            <div class="form-group">
                <textarea class="form-control" placeholder="Ajouter un élément" @keyup.enter="storeItem" v-model="newItem.title" style="overflow: hidden; overflow-wrap: break-word; height: 56px;"></textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-success" @click="storeItem">Ajouter</button>
                <button class="btn btn-default" @click="creatingItem = false"><i class="fas fa-times"></i></button>
            </div>
        </template>

        <button v-if="!creatingItem" class="btn btn-secondary my-3" @click="createItem">Ajouter un élément</button>

    </div>

</template>

<script>

    export default {

    	props: ['task'],

        data(){
            return {
            	checklist: {},
                creatingItem: false,
                newItem: null,
                percentage: 0,
            }
        },

        methods : {

            fetch() {
                axios.get('/checklists?task_id=' + this.task.id).then(response => {
                    this.checklist = response.data.items;
                    this.percentage = Math.ceil(response.data.checked / this.checklist.length * 100);
                });
            },

            createItem() {
                this.creatingItem = true;
                this.newItem = {
                    task_id: this.task.id,
                    checked: 0,
                    title: ''
                };
            },

            storeItem() {
                axios.post('/checklists', this.newItem).then(response => {
                    this.creatingItem = false;
                    this.fetch();
                });
            },

            updateItem(item) {
                item.checked = (parseInt(item.checked)) ? 0 : 1;

                axios.patch('/checklists/' + item.id, item).then(response => {
                    this.fetch();
                });
            },

            deleteItem(item) {
                axios.delete('/checklists/' + item.id).then(response => {
                    this.fetch();
                });
            }


        },

        mounted() {

            this.fetch();

        },

        computed: {

        },

    }

</script>

<style scoped>

    .strike {
        text-decoration: line-through;
        opacity: 0.8;
    }

    label {
      display: inline-block;
      cursor: pointer;
      position: relative;
    }

    label span {
      display: inline-block;
      position: relative;
      background-color: transparent;
      width: 20px;
      height: 20px;
      border: 2px solid #212529;
      border-radius: 2px;
      margin-right: 10px;
      vertical-align: middle;
    }

    .delete-button {
        opacity:0;
        cursor: pointer;
        margin-left: 1rem;
    }

    label:hover .delete-button {
        opacity: 1;
    }

    label span:before {
        content: "";
        position: absolute;
        font-size: 200%;
        top: -100%;
        left: 0;
        color: green;
    }

    input[type="checkbox"] {
      display: none;
    }

    input[type="checkbox"]:checked + label span:before {
        content: "✓";
    }


</style>