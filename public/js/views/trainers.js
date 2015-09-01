window.TrainersView = Backbone.View.extend({

    initialize: function () {
    	this.collection = new TrainerCollection();
        this.on({
  "change:author": authorPane.update,
  "change:title change:subtitle": titleView.update,
  "destroy": bookView.remove
});

        var self = this;
        this.collection.fetch({
            success: function (collection, response) {
                self.render();
            }
        }, self);
    },

    render: function () { 
        $(this.el).html(this.template({ clients: this.collection.toJSON() }));
                return this;
    	
    }
});

window.TrainerCollection = Backbone.Collection.extend({
	model: Trainer,
    url: "rest/trainers"
});