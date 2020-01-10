<template>

	<div>

		<div class="modal-header">
    		<h5 class="modal-title">Étiquettes</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
  		</div>
  		<div class="modal-body">

            <template v-if="newTag">
                <div class="form-group">
                    <label>Titre</label>
                    <input class="form-control" type="text" v-model="tag.label">
                </div>
                <button class="btn btn-secondary" @click="newTag = false">Annuler</button>
                <button class="btn btn-success" @click="storeTag">Ajouter</button>
            </template>

            <template v-else>
                <button v-for="tag in tags" :key="tag.id" class="btn btn-block" :class="'card-label-' + tag.color" @click="attachTag(tag.id)">{{ tag.label }}</button>
                <button class="btn btn-block btn-default" @click="newTag = true"><i class="fas fa-plus"></i> Créer une nouvelle étiquette</button>
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
            	tag: {
            		label: '',
            		color: '',
            	}
            }
        },

        methods : {

            createTag(board) {


            },

            storeTag() {


            },

            attachTag(tag_id) {
	            axios.post('/task/' + this.task.id + '/tags', {tag_id: [tag_id]}).then(response => {
	                this.updatedTask = response.data;
                    this.$emit('update:task', this.updatedTask);
	            });
            },


        },

        mounted() {

            console.log(this.task.id);

            axios.get('tags').then(response => {
                this.tags = response.data;
            });

        },

        computed: {

        },

    }

</script>