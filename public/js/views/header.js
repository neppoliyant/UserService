window.HeaderView = Backbone.View.extend({

    initialize: function () {
        this.render();
        this.on('Loggedin', this.doSomething, this);
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    doSomething: function (menuItem) {
        console.log(menuItem);
    },

    selectMenuItem: function (menuItem) {
        $('.nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }

});

window.LoggedHeaderView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});