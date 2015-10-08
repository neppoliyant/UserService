window.ChatView = Backbone.View.extend({

    initialize:function () {
    	if (this.created) {
    		return;
    	} else {
    		this.render();
    	}
    },

    events: {
        "click .chatSend"   : "sendChat"
    },

    sendChat: function() {
    	var obj = {};
    	obj.sender = app.model.attributes.name;
    	console.log($('#m').val());
    	obj.message = $('#m').val();
    	$('#m').val('');
    	app.socket.emit('instantMessage', obj);
    },

    render:function () {
    	this.created = true;
        $(this.el).html(this.template(app.model.toJSON()));
        return this;
    }

});