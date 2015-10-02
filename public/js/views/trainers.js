window.TrainersView = Backbone.View.extend({
    events: {
        "click .searchTrainer" : "search",
        "click .Subscribe" : "subscribe"
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

    subscribe: function(e){
        /*if (!app.model) {
            alert("Please login to subscribe");
            return;
        }*/
        app.trainerDetail = e.target.value;
        app.navigate('trainer', true);
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

window.TrainerIndividualView = Backbone.View.extend({
    events: {
    },
    initialize: function () {
        this.trainer = new Trainer({id : app.trainerDetail});
        var self = this;
        this.trainer.fetch({
            success: function (trainer) {
                console.log(trainer);
                self.render(trainer);
            },
            error: function (error) {
                app.navigate('trainers', true);
            }
        }, self);
    },

    render: function (trainer) {
        $(this.el).html(this.template(trainer.toJSON()));
        return this;
    }
});