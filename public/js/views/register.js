window.RegisterView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change",
        "change input[type=file]": "uploadFile",
        "click .save"   : "beforelogin"
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    uploadFile: function (event) {
    },

    beforelogin: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.login();
        return false;
    },

    login: function () {
        var self = this;

        var file = this.$('form :file')[0].files[0];

        if (!file.type.match('image.*')) {
            alert("Please select only image");
            return;
        }

        var reader = new FileReader();

        var self = this;

        reader.onload = (function(theFile) {
            return function(e) {
                    var picture = new Picture({_id : self.model.attributes.email});
                    picture.attributes.body.imageData = e.target.result;
                    picture.save(null, {
                    success: function (response) {
                        console.log(response);
                    }
                }, self);
            };
        })(file);

        reader.readAsBinaryString(file);

        this.model.save(null, {
            success: function (model) {
                self.render();
                if (model.attributes.isValid) {
                    app.model = model;
                    app.navigate('home', true);
                } else {
                    utils.showAlert('Error', 'Invalid email and password', 'alert-error');
                }
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to get user details', 'alert-error');
            }
        });
    }
});