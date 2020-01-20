<template>

    <div class="card">

        <div class="card-header">
            <h5 class="card-title">Heures en cours</h5>
        </div>

        <div class="card-body">

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Utilisateur</th>
                        <th>Semaine</th>
                        <th>Mois</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.week_hours | seconds }}</td>
                        <td>{{ user.month_hours | seconds }}</td>
                    </tr>
                </tbody>
            </table>

        </div>

    </div>

</template>

<script>

    export default {

        data(){
            return {
                users: {}
            }
        },

        methods : {

            fetch() {
                axios.get('/users/hours').then(response => {
                    this.users = response.data;
                });
            },

        },

        mounted() {
            this.fetch()
        },

        filters: {
            seconds: function (time) {
                return (Math.floor(time / 3600)) + "h" + ("0" + Math.floor(time / 60) % 60).slice(-2)
            }
        }

    }

</script>