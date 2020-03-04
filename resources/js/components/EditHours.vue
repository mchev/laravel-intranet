<template>
	
	<div class="card">

	  <div class="card-header">
	    Ajouter des heures
	  </div>

	  <div class="card-body">

		<form v-on:submit.prevent="store" action="#" method="post">

			<div class="form-group">
				<label>Projet</label>
				<v-select :options="projects" v-model="hour.project_id" label="name">
					<template #search="{attributes, events}">
						<input
							class="vs__search"
							:required="!hour.project_id"
							v-bind="attributes"
							v-on="events"
						/>
					</template>
				</v-select>
			</div>

			<div class="row mb-3">

				<div class="col-md-6">
					<label>Date</label>
                    <datetime v-model="hour.date" type="date" formatted="DD/MM/YYYY" :max-date="date" auto-close no-button no-header only-date noLabel format="YYYY-MM-DD"/>

				</div>

				<div class="col-md-6">
					<label>Temps</label>
                    <!--<input class="form-control" type="time" v-model="time" step="00:15" required>-->
                    <datetime v-model="hour.time" type="time" formatted="HH:mm" no-header only-time minute-interval="15" noLabel format="HH:mm"/>
				</div>

			</div>

			<div class="form-group">
				<label>Commentaire</label>
				<textarea class="form-control" v-model="hour.comment"></textarea>
			</div>

			<div class="form-group text-right">
				<button type="submit" class="btn btn-primary">Valider les modifications</button>
			</div>

		</form>

	  </div>

	</div>


</template>

<script>
	
export default {

    props: ['hour'],
    
    created() {

        this.getProjects();

    },

    data() {
        return {
            date: moment().format('YYYY-MM-DD'),
            projects: [],
            response: false,
        }
    },

    methods: {

        
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

            let vm = this;

            axios.patch('/hours/' + this.hour.id, this.hour).then(response => {
                this.$emit('update-hour', this.hour);
            });

        }

    }

}

</script>