window.ProfileView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
    	app.model.attributes.picture = "http://localhost:3000/rest/picture/" + app.model.attributes.email;
        $(this.el).html(this.template(app.model.toJSON()));
        return this;
    }
});