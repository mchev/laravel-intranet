<template>

	<div id="clock">
	  
		<div v-if="done" class="alert alert-info" role="alert">
		  {{ doneTime }} ont été ajouté au projet {{ task.project.name }}.
		</div>

		<button class="btn btn-block btn-outline-primary time mb-1">{{ time }}</button>

		<div class="btn-group w-100" role="group">
			<button v-if="!running" v-on:click="start()" type="button" class="btn btn-secondary" :class="{ 'btn-success': running }"><i class="fas fa-play"></i></button>
			<button v-if="running" v-on:click="stop()" type="button" class="btn btn-secondary" :class="{ 'active': timeStopped && !running }"><i class="fas fa-pause"></i></button>
			<button v-on:click="reset()" type="button" class="btn btn-secondary"><i class="fas fa-stop"></i></button>
			<button v-on:click="store" type="button" class="btn btn-success"><i class="fas fa-stop"></i> <i class="fas fa-save"></i></button>
		</div>
	  
	</div>

</template>

<script>

export default {

	props: ['task'],

    created() {

    },

    data() {
        return {
        	time: '00:00:00',
			timeBegan: null,
			timeStopped: null,
			stoppedDuration: 0,
			started: null,
			running: false,
			done: false,
			doneTime: null,
        }
    },

    methods: {

    	store() {

    		if(this.time !== '00:00:00') {

    			this.done = false;

    			var post = {
    				date: moment().format('YYYY-MM-DD'),
    				time: this.time,
    				project_id: this.task.project.id,
    				comment: this.task.name
    			}

	        	axios.post('/hours', post)
	                .then(response => {
	                	var seconds = moment(post.time, 'HH:mm:ss').diff(moment().startOf('day'), 'seconds');
	                	this.doneTime = moment.duration(seconds, "seconds").humanize();
	                	this.done = true;
	                    this.reset();
	                })
	                .catch(errors => {
	                    console.log(errors);
	                });

    		}
    	},

		start() {

			this.done = false;
			
		  if(this.running) return;
		  
		  if (this.timeBegan === null) {
		    this.reset();
		    this.timeBegan = new Date();
		  }

		  if (this.timeStopped !== null) {
		    this.stoppedDuration += (new Date() - this.timeStopped);
		  }

		  this.started = setInterval(this.clockRunning, 10);	
		  this.running = true;
		},

		stop() {
		  this.running = false;
		  this.timeStopped = new Date();
		  clearInterval(this.started);
		},

		reset() {
		  this.running = false;
		  clearInterval(this.started);
		  this.stoppedDuration = 0;
		  this.timeBegan = null;
		  this.timeStopped = null;
		  this.time = "00:00:00";
		},

		clockRunning(){
		  var currentTime = new Date()
		  , timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
		  , hour = timeElapsed.getUTCHours()
		  , min = timeElapsed.getUTCMinutes()
		  , sec = timeElapsed.getUTCSeconds()
		  , ms = timeElapsed.getUTCMilliseconds();

		  this.time = 
		    this.zeroPrefix(hour, 2) + ":" + 
		    this.zeroPrefix(min, 2) + ":" + 
		    this.zeroPrefix(sec, 2);
		},

		zeroPrefix(num, digit) {
		  var zero = '';
		  for(var i = 0; i < digit; i++) {
		    zero += '0';
		  }
		  return (zero + num).slice(-digit);
		}

    }

}

</script>