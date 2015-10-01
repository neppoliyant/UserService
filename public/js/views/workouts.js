window.WorkoutsView = Backbone.View.extend({
    events: {
        "change #country-selector": "countrySelected"
    },
    countrySelected: function(e){
        var intVal = e.target.value - 1;
       $(this.el).html(this.template({weeklyExercises : this.weeklyExercise, workout : this.weeklyExercise[intVal] }));
       $("#country-selector option[value='" + e.target.value + "']").attr("selected", "selected");
        return this;
    },
    initialize: function () {
    	console.log(app.model);
        //var id = app.model.id + 'WO1';
    	var id = 'WO1';
    	this.workout = new Workout({_id: id});
    	var self = this;
    	this.workout.fetch({
            success: function (response) {
            	console.log(response);
                self.weeklyExercise = response.attributes.weeklyExercise;
                self.render();
            },
            error: function (error) {

            }
        }, self);
    },

    render: function () {
        $(this.el).html(this.template({weeklyExercises : this.weeklyExercise, workout : this.weeklyExercise[0] }));
        return this;
    }
});