<template>

	<div>

		<div class="modal-header bg-primary text-white">
    		<h5 class="modal-title">Étiquettes</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
  		</div>
  		<div class="modal-body">

            <template v-if="newTag">
                <div class="form-group">
                    <label>Titre</label>
                    <input class="form-control" type="text" v-model="tag.label">
                </div>
                <div class="form-group">
                    <div v-for="color in colors" class="form-check form-check-inline">
                        <input type="radio" :id="'color-' + color" class="form-check-input" :value="color" v-model="tag.color"/>
                        <label :for="'color-' + color" class="btn p-3" :class="'btn-' + color"></label>
                    </div>
                </div>
                <button class="btn btn-secondary" @click="newTag = false">Annuler</button>
                <button class="btn btn-success" @click="storeTag(tag)">Valider</button>
                <button v-if="tag.id" class="btn btn-danger" @click="deleteTag(tag)">Supprimer</button>
            </template>

            <template v-else>
                <div class="row d-flex align-items-center mb-1" v-for="tag in tags" :key="tag.id">
                    <div class="col-10 pr-0">
                        <button class="btn btn-block" :class="'card-label-' + tag.color" @click="attachTag(tag.id)">{{ tag.label }}</button>
                    </div>
                    <div class="col-2 p-0 text-center">
                        <button class="btn btn-default" @click="editTag(tag)"><i class="fas fa-pen"></i></button>
                    </div>
                </div>
                <button class="btn btn-block btn-secondary mt-2" @click="createTag"><i class="fas fa-plus"></i> Créer une nouvelle étiquette</button>
            </template>

    	</div>

    </div>

</template>

<script>

    export default {

    	props: ['task'],

        data(){
            return {
            	tags: {},
                newTag: false,
                updatedTask : null,
                colors: ['green', 'yellow', 'orange', 'red', 'purple', 'blue', 'sky', 'lime', 'pink', 'black', 'null'],
            	tag: {
            		label: '',
            		color: '',
            	}
            }
        },

        methods : {

            fetch() {
                axios.get('tags').then(response => {
                    this.tags = response.data;
                });
            },

            createTag(board) {
                this.tag = {
                    label: '',
                    color: '',
                };
                this.newTag = true;
            },

            editTag(tag) {

                this.newTag = true;
                this.tag = {
                    id: tag.id,
                    label: tag.label,
                    color: tag.color
                }

            },

            storeTag(tag) {

                if ('id' in this.tag) {
                    axios.patch('/tags/' + this.tag.id, this.tag).then(response => {
                        this.fetch();
                        this.newTag = false;
                    });
                } else {
                    axios.post('/tags', this.tag).then(response => {
                        this.fetch();
                        this.newTag = false;
                    });
                }

            },

            deleteTag(tag) {
                axios.delete('/tags/' + this.tag.id).then(response => {
                    this.fetch();
                    this.newTag = false;
                });
            },

            attachTag(tag_id) {
	            axios.post('/task/' + this.task.id + '/tags', {tag_id: [tag_id]}).then(response => {
	                this.updatedTask = response.data;
                    this.$emit('update:task', this.updatedTask);
	            });
            },


        },

        mounted() {

            this.fetch()
        },

        computed: {

        },

    }

</script>

<style scoped>

    .form-check-inline .form-check-input {
        position: absolute;
        left: 32%;
        top: 23%;
    }

</style>