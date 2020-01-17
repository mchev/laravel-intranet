<template>

    <div class="row">

        <div class="col" v-for="user in users" :key="user.id">

            <div class="card mb-3">

                <div class="card-header">
                    <h5 class="card-title">{{ user.name }}</h5>
                </div>

                <div class="card-body">

                    <table class="table table-bordered">

                        <thead>
                            <tr>
                                <th>Cette semaine</th>
                                <th>Mois en cours</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{{ user.week_hours | seconds }}</td>
                                <td>{{ user.month_hours | seconds }}</td>
                            </tr>
                        </tbody>

                    </table>

                </div>

            </div>

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