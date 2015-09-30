window.Register = Backbone.Model.extend({

    urlRoot: "/rest/register",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.email = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a email"};
        };

        this.validators.password = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a password"};
        };

        this.validators.confirmPassword = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a password"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        picture: null
    }
});

window.Login = Backbone.Model.extend({

    urlRoot: "/rest/login",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.email = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a email"};
        };

        this.validators.password = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a password"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }
        console.log(_.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true});
        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        email: "",
        password: ""
    }
});

window.User = Backbone.Model.extend({

    urlRoot: "/rest/user",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.email = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a email"};
        };

        this.validators.password = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a password"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }
        console.log(_.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true});
        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        email: "",
        password: "",
        name: "",
        id: ""
    }
});

window.Trainer = Backbone.Model.extend({

    urlRoot: "/rest/trainer",

    initialize: function () {
    },

    defaults: {
        id: null,
        email: "",
        name: "",
        description: "",
        picture: "",
        ratings: "",
        siteUrl: "",
        id: ""
    }
});

window.Workout = Backbone.Model.extend({

    urlRoot: "/rest/workout",

    idAttribute: "_id",

    initialize: function () {
    },

    defaults: {
        id: null,
        body: {},
        weeklyExercise: []
    }
});