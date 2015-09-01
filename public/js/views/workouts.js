window.WorkoutsView = Backbone.View.extend({

    initialize: function () {
    	console.log(app.model);
    	var id = app.model.id + 'Trainees';
    	this.user = new User({_id: id});
    	var self = this;
    	this.user.fetch({
            success: function (response) {
            	console.log(response);
                self.render();
            }
        }, self);
    },

    render: function () {
    	var tree = new BackTree.Tree({
        collection : this.user.Trainees
    });
    	console.log(tree.render().$el);
        $(this.el).html(this.template(this.user));
        return this;
    }
});