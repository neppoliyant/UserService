window.DashboardView = Backbone.View.extend({

    initialize: function () {
        var id = 'WO1';
    	this.workout = new Workout({_id: id});
    	var self = this;
    	this.workout.fetch({
            success: function (response) {
                self.weeklyExercise = response.attributes.weeklyExercise;
                self.render();
            }
        }, self);
    },

    render: function () {
        $(this.el).html(this.template({weeklyExercises : this.weeklyExercise, user: app.model.attributes}));
        return this;
    }
});

window.DashboardTraiverView = Backbone.View.extend({

    initialize: function () {
        this.trainees = new Trainees({_id: app.model.attributes._id});
        var self = this;
        this.trainees.fetch({
            success: function (response) {
                self.trainees = response;
                self.render();
            }
        }, self);
    },

    events: {
        "click .update"   : "updateWorkout"
    },

    updateWorkout:  function(event) {
        alert($(event.currentTarget).data('value'));
    },

    render: function () {
        $(this.el).html(this.template({trainees: this.trainees.attributes.trainees, user: app.model.attributes}));
        return this;
    }
});