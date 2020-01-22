<template>

	<div class="card">

		<div class="card-header">
			<h5>Paramètres</h5>
		</div>

		<div class="card-body">

			<div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
				Modifications enregistrées.
				<button type="button" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>


			<ul class="nav nav-tabs" id="settingsTab" role="tablist">
				<li class="nav-item">
					<a class="nav-link active" id="company-tab" data-toggle="tab" href="#company" role="tab" aria-controls="company" aria-selected="true">Paramètres de la société</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="logo-tab" data-toggle="tab" href="#logo" role="tab" aria-controls="logo" aria-selected="false">Logo</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="interface-tab" data-toggle="tab" href="#interface" role="tab" aria-controls="interface" aria-selected="false">Paramètres de l'interface</a>
				</li>
			</ul>
		

			<div class="tab-content" id="settingsTabContent">
				<div class="tab-pane fade show active" id="company" role="tabpanel" aria-labelledby="company-tab">

					<div class="row mt-4">

						<div class="col-xl-4">

							<div class="form-group">
								<label>Nom de la société</label>
								<input type="text" v-model="setting.company_name" class="form-control">
							</div>
							<div class="form-group">
								<label>Adresse</label>
								<input type="text" v-model="setting.company_street" class="form-control">
							</div>
							<div class="row form-group">
								<div class="col-xl-6">
									<label>Code postal</label>
									<input type="text" v-model="setting.company_zip_code" class="form-control">
								</div>
								<div class="col-xl-6">
									<label>Ville</label>
									<input type="text" v-model="setting.company_city" class="form-control">
								</div>
							</div>

						</div>

						<div class="col-xl-4">

							<div class="form-group">
								<label>Email de la société</label>
								<input type="email" v-model="setting.company_email" class="form-control">
							</div>
							<div class="form-group">
								<label>Téléphone de la société</label>
								<input type="text" v-model="setting.company_phone" class="form-control">
							</div>

						</div>

						<div class="col-xl-4">

							<div class="form-group">
								<label>Numéro de TVA intracommunautaire</label>
								<input type="text" v-model="setting.company_tva" class="form-control">
							</div>
							<div class="form-group">
								<label>Numéro de SIRET</label>
								<input type="text" v-model="setting.company_siret" class="form-control">
							</div>
							<div class="form-group">
								<label>IBAN</label>
								<input type="text" v-model="setting.company_iban" class="form-control">
							</div>

						</div>

					</div>

				</div>

				<div class="tab-pane fade" id="logo" role="tabpanel" aria-labelledby="logo-tab">
					<div class="row mt-4">

						<div class="col-xl-6">

							<form @submit="uploadImage" enctype="multipart/form-data">

								<div class="form-group">
									<input type="file" class="form-control" v-on:change="onImageChange" accept="image/*">
								</div>
								<div class="form-group">
									<button class="btn btn-success btn-block" type="submit">Enregistrer l'image</button>
								</div>

							</form>

						</div>

						<div class="col-xl-6">
							<img v-if="imageData.length > 0" :src="image" alt="Logo" class="img-responsive" height="100">
							<img v-else :src="setting.company_logo_url" alt="Logo" class="img-responsive" height="100">
						</div>

					</div>
				</div>


				<div class="tab-pane fade" id="interface" role="tabpanel" aria-labelledby="interface-tab">

					<div class="row mt-4">

						<div class="col-xl-6">

							<div class="form-group">
								<label>Couleur de l'interface</label>
								<input type="color" v-model="setting.background_color" class="form-control">
							</div>
							<div class="form-group">
								<label>Langue de l'interface</label>
								<select v-model="setting.lang" class="form-control">
									<option value="fr">Français</option>
								</select>
							</div>

						</div>

						<div class="col-xl-6">

							<div class="alert alert-warning">Vous pouvez desactiver la double authentification dans vox locaux en renseignant votre adresse IP publique</div>
							<div class="form-group">
								<label>Adresse IP</label>
								<input type="text" v-model="setting.company_ip" class="form-control">
							</div>

						</div>

					</div>

				</div>

			</div>

		</div>

		<div class="card-footer">
			<button class="btn btn-success" @click="updateSetting">Mettre à jour</button>
		</div>

	</div>

</template>

<script>

    export default {

        data(){
            return {
            	setting: window.settings,
            	success: false,
            	image: '',
            	imageData: '',
            }
        },

        methods: {

        	updateSetting() {
        		this.success = false;
        		axios.patch('/settings/1', this.setting).then(response => {
        			this.success = true;
        			window.settings = this.setting;
        			$('body').css('background-color', window.settings.background_color);
        		})
        	},

            onImageChange(event) {
				this.image = event.target.files[0];

				var input = event.target;

				if (input.files && input.files[0]) {
					var reader = new FileReader();
					reader.onload = (e) => {
	                    this.imageData = e.target.result;
	                }
	                reader.readAsDataURL(input.files[0]);
	            }
            },

            uploadImage(e){
                e.preventDefault();
                let currentObj = this;
 
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }

                let formData = new FormData();
                formData.append('image', this.image);
 
                axios.post('/settings/upload', formData, config)
                .then(function (response) {
                    currentObj.success = response.data.success;
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
            },
        }

    }

</script>