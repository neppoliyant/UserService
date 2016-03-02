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
        picture: "./pics/male_avatar.jpg",
        type: "",
        height: "",
        weight: "",
        alcohol: "",
        smoking: "",
        alergies: "",
        bodyPicture: "./pics/male_avatar.jpg",
        age: "",
        description: "",
        siteUrl: "",
        ratings: "",
        trainer: ""
    }
});

window.Login = Backbone.Model.extend({

    urlRoot: "http://localhost:3001/rest/obb/login",

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

window.Trainees = Backbone.Model.extend({

    urlRoot: "/rest/trainees",
    
    idAttribute: "_id",

    initialize: function () {
    },

    defaults: {
        id: null,
        email: "",
        name: ""
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

window.Picture = Backbone.Model.extend({

    urlRoot: "/rest/picture",

    idAttribute: "_id",

    initialize: function () {
    },

    defaults: {
        id: null,
        body: {},
        weeklyExercise: []
    }
});

window.Suggestion = Backbone.Model.extend({

    urlRoot: "/rest/suggestion",

    idAttribute: "_id",

    initialize: function () {
    },

    defaults: {
        _id: null,
        name: "",
        suggestion: ""
    }
});

window.Subscribe = Backbone.Model.extend({

    urlRoot: "/rest/subscribe",

    initialize: function () {
    },

    defaults: {
        id: null,
        name: "",
        trainerId: "",
        trainerName: "",
        packageSubscribe: "",
        ExpiryDate: ""
    }
});

window.Messages = Backbone.Model.extend({

    urlRoot: "/rest/chat/messages",

    idAttribute: "_id",

    initialize: function () {
    },

    defaults: {
        _id: null,
        name: "",
        message: "",
        date: ""
    }
});