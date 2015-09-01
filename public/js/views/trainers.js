window.TrainersView = Backbone.View.extend({
    events: {
        "click .searchTrainer" : "search"
    },

    initialize: function () {
    	this.collection = new TrainerCollection();

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
    	
    },

    search: function(e){
        var letters = $("#searchTask").val();
        var collection = this.collection.byName(letters);
        $(this.el).html(this.template({ clients: collection.toJSON() }));
        return this;
    },
});

window.TrainerCollection = Backbone.Collection.extend({
	model: Trainer,
    url: "rest/trainers",

    byName: function (name) {
        var pattern = new RegExp(name,"gi");
        filtered = this.filter(function (data) {
            return pattern.test(data.get("name"));
        });
        return new TrainerCollection(filtered);
    }
});