window.DashboardView = Backbone.View.extend({

    initialize: function () {
        var id = 'WO1';
    	this.workout = new Workout({_id: id});
    	var self = this;
    	this.workout.fetch({
            success: function (response) {
            	console.log(response);
                self.weeklyExercise = response.attributes.weeklyExercise;
                self.render();
            }
        }, self);
    },

    render: function () {

        $(this.el).html(this.template({weeklyExercises : this.weeklyExercise}));
        return this;
    }
});