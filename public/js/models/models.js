window.Wine = Backbone.Model.extend({

    urlRoot: "/wines",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.grapes = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a grape variety"};
        };

        this.validators.country = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a country"};
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
        grapes: "",
        country: "USA",
        region: "California",
        year: "",
        description: "",
        picture: null
    }
});

window.WineCollection = Backbone.Collection.extend({

    model: Wine,

    url: "/wines"

});

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