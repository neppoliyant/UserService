var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "home"              : "Loggedhome",
        "logout"	        : "logout",
        "dashboard"	        : "dashboard",
        "profile"           : "profile",
        "settings"          : "settings",
        "about"             : "about",
        "register"          : "register",
        "contactus"         : "contactus",
        "trainers"          : "trainers",
        "workouts"          : "workouts",
        "trainer"           : "trainer",
        "suggestion"        : "suggestion",
        "chat"              : "chat"

    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    suggestion: function() {
        var sug = new Suggestion();
        this.homeView = new SugestionView({model: sug});
        $('#content').html(this.homeView.el);
    },

    chat: function() {
        this.homeView = new ChatView();
        $('#content').html(this.homeView.el);
    },

    home: function (id) {
        var login = new Login({_id: id});
        if (!this.homeView) {
            this.homeView = new HomeView({model: login});
        } else {
            if (app.logout) {
                this.headerView = new HeaderView();
                this.homeView = new HomeView({model: login});
                $('.header').html(this.headerView.el);
            }
        }
        $('#content').html(this.homeView.el);
    },

    Loggedhome: function (id) {
        app.model.attributes.chat = 1;
        this.headerView = new LoggedHeaderView({model: app.model, chat: 1});
        if (!app.model.attributes.isRegistered) {
            if (app.model.attributes.type == "Trainee") {
                this.homeView = new RegisterViewT1({model: app.model});
            } else {
                this.homeView = new RegisterViewT2({model: app.model});
            }
        } else {
            if (app.model.attributes.type == "Trainee") {
                this.homeView = new DashboardView({model: app.model});
            } else {
                this.homeView = new DashboardTraiverView({model: app.model});
            }
            
        }
        $('.header').html(this.headerView.el);
        $('#content').html(this.homeView.el);
    },

    trainer: function (id) {
        this.homeView = new TrainerIndividualView({model: app.model});
        $('.header').html(this.headerView.el);
        $('#content').html(this.homeView.el);
    },

	logout: function(page) {
        app.model = null;
        app.logout = true;
        app.navigate('', true);
    },

    dashboard: function (id) {
        if (app.model.attributes.type == "Trainee") {
                $('#content').html(new DashboardView({model: app.model}).el);
            } else {
                $('#content').html(new DashboardTraiverView({model: app.model}).el);
            }
        
    },

	profile: function() {
        $('#content').html(new ProfileView().el);
	},

    register: function() {
        var register = new Register();
        $('#content').html(new RegisterView({model: register}).el);
        this.headerView.selectMenuItem('add-menu');
    },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },

    settings: function() {
        $('#content').html(new SettingsView().el);
    },

    contactus: function () {
        $('#content').html(new ContactusView().el);
    },

    trainers: function () {
        $('#content').html(new TrainersView().el);
    },

    workouts: function () {
        $('#content').html(new WorkoutsView().el);
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'AboutView', 'RegisterView', 'LoggedHomeView', 'LoggedHeaderView', 'ProfileView', 'DashboardView', 'SettingsView', 'TrainersView', 'ContactusView', 'WorkoutsView', 'TrainerIndividualView', 'RegisterViewT1', 'RegisterViewT2', 'SugestionView', 'DashboardTraiverView', 'ChatView'], function() {
    app = new AppRouter();
    app.config = {};
    app.config.serverUrl = "http://96.119.5.107:3000/rest/";
    Backbone.history.start();
});