LoginView = Parse.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },
	events: {
        "submit form.login-form": "logIn"    },
	logIn: function(e) {
      	var self = this;
      	var username = this.$("#login-username").val();
      	var password = this.$("#login-password").val();
      
      Parse.User.logIn(username, password, {
        success: function(user) {
          app.navigate("home", true);
		  $('.loggedInMenu').show();
		  window.location.reload();
        },

        error: function(user, error) {
          self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
          this.$(".login-form button").removeAttr("disabled");
        }
      });

      this.$(".login-form button").attr("disabled", "disabled");

      return false;
    },

});