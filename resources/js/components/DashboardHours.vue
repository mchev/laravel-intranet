<template>

    <div class="row mb-3">

        <div class="col-md-6">

            <div class="card">

                <div class="card-header">
                    <h5 class="card-title">Semaine</h5>
                </div>

                <div class="card-body">
                    {{ week | seconds }}
                </div>

            </div>

        </div>

        <div class="col-md-6">

            <div class="card">

                <div class="card-header">
                    <h5 class="card-title">Mois</h5>
                </div>

                <div class="card-body">
                    {{ month | seconds }}
                </div>

            </div>

        </div>

    </div>

</template>

<script>

    export default {

        data(){
            return {
                week: 0,
                month: 0
            }
        },

        methods : {

            fetch() {
                axios.get('/user/hours').then(response => {
                    this.week = response.data.week;
                    this.month = response.data.month;
                });
            },

        },

        mounted() {
            this.fetch()
        },

        filters: {
            seconds: function (time) {
                return (Math.floor(time / 3600)) + ":" + ("0" + Math.floor(time / 60) % 60).slice(-2) + ":" + ("0" + time % 60).slice(-2)
            }
        }

    }

</script>