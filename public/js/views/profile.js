window.ProfileView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(app.model.toJSON()));
        return this;
    }
});