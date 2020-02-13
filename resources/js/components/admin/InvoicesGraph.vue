<script>

    import { Line } from 'vue-chartjs'

    export default {

        extends: Line,

        props: ['labels', 'estimates', 'invoices'],

        mounted () {

            // Overwriting base render method with actual data.
            this.renderChart({

                labels: this.labels,
                datasets: [
                    {
                        label: 'Facturation estimée',
                        backgroundColor: '#f2d600',
                        borderColor: '#f2d600',
                        fill: false,
                        data: this.estimates
                    },
                    {
                        label: 'Facturé',
                        backgroundColor: '#61bd4f',
                        borderColor: '#61bd4f',
                        fill: false,
                        data: this.invoices
                    }
                ]
            }, {
                animation: {
                    'easing': 'linear',
                },
                responsive: true,
                maintainAspectRatio: false
            })
        }

    }

</script>