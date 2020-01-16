<template>
	
	<div class="card">

	  <div class="card-header">
	    Ajouter des heures
	  </div>

	  <div class="card-body">

	  	<div v-if="response" class="alert alert-success">
	  		{{ response.time }}h ont été ajoutée au projet {{ response.project.name }}
	  	</div>

		<form v-on:submit.prevent="store" action="#" method="post">

			<div class="form-group">
				<label>Projet</label>
				<v-select :options="projects" v-model="selected" label="name">
					<template #search="{attributes, events}">
						<input
							class="vs__search"
							:required="!selected"
							v-bind="attributes"
							v-on="events"
						/>
					</template>					
				</v-select>
			</div>

			<div class="row mb-3">

				<div class="col-md-6">
					<label>Date</label>
                    <datetime v-model="date" type="date" formatted="DD/MM/YYYY" auto-close no-button no-header only-date noLabel format="YYYY-MM-DD"/>

				</div>

				<div class="col-md-6">
					<label>Temps</label>
                    <!--<input class="form-control" type="time" v-model="time" step="00:15" required>-->
                    <datetime v-model="time" type="time" formatted="HH:mm" no-header only-time minute-interval="15" noLabel format="HH:mm"/>
				</div>

			</div>

			<div class="form-group">
				<label>Commentaire</label>
				<textarea class="form-control" v-model="comment"></textarea>
			</div>

			<div class="form-group text-right">
				<button type="submit" class="btn btn-primary">Valider</button>
			</div>

		</form>

	  </div>

	</div>


</template>

<script>
	
export default {
    
    created() {

        this.getProjects();

    },

    data() {
        return {
        	selected: 0,
        	date: moment().format('YYYY-MM-DD'),
        	time: '00:15',
        	comment: '',
            projects: [],
            response: null
        }
    },

    methods: {

    	reset() {
        	this.selected = 0;
        	this.date = '';
        	this.time = '';
        	this.comment = '';
    	},
        
        getProjects(){
            axios.get('/projects/list')
                .then(response => {
                    this.projects = response.data;
                })
                .catch(errors => {
                    console.log(errors);
                });
        },

        store() {

        	this.response = null;

        	let vm = this;

        	var post = {
        		project_id: this.selected.id,
        		date: this.date,
        		time: this.time,
        		comment: this.comment
        	}

        	axios.post('/hours', post)
                .then(response => {
                    console.log(response.data);
                    vm.response = response.data;
                    vm.reset();
                })
                .catch(errors => {
                    console.log(errors);
                });

        }

    }

}

</script>