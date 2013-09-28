$(document).ready(function(){
var AppRouter = Parse.Router.extend({

    routes: {
        "": "login",
        "permitapps/page/:page": "list",
        "permitapps/add": "addPermitApp",
        "home": "list", //for now, gotta finish hooking the template up, it looks very hum drum
        "about": "about",
		"previousapps": "list",
		"permitapps/:id": "permitAppDetails",
		"logout": "logout"
		
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

	list: function(page) {
		// Parse queries are not that complicated
		var query = new Parse.Query(PermitApp);
		query.equalTo("user", Parse.User.current());
		var collection = new PermitAppCollection();
		collection.query = query;
		collection.fetch({
		  success: function(collection) {
			
				console.log(collection);
				var listItemView = new PermitAppListView({model: collection}).el;
				console.log(listItemView);
				$('#content').append(listItemView);
		  },
		  error: function(collection, error) {
			// The collection could not be retrieved, it should work so don't worry about this.
		  }
		});
        this.headerView.selectMenuItem('home-menu');
		
    },

    permitAppDetails: function (id) {
		var currentUser = Parse.User.current();
		
		if (currentUser) {
			var permitApp = new PermitApp({objectId: id})
			permitApp.fetch({success: function(results){
				console.log(results);
				var permitAppView= new PermitAppView({model: results}).el;
				console.log(permitAppView);
				$('#content').html(permitAppView);
				
			}});
			this.headerView.selectMenuItem();
		}
		else{
			if (!this.loginView) {
				this.loginView = new LoginView();
				$('#content').html(this.loginView.el);
			}
			
		}
    },

	addPermitApp: function() {
		// For sneaky mother effers... Log in at least!
		var currentUser = Parse.User.current();
		if(!currentUser){
			this.loginView = new LoginView();
			$('#content').html(this.loginView.el);
		}
			else{
			var permitApp = new PermitApp()
			console.log(permitApp);
			$('#content').html(new PermitAppView({model: permitApp}).el);
			// Minor visual tweaks go HERE for the permit application
			$("#building, #street2, #sidewalk, #sidewalkWork, #streetWork").hide();
			this.headerView.selectMenuItem('add-menu');
		}
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },
	login: function () {
		var currentUser = Parse.User.current();
		if(!currentUser){
			if (!this.loginView) {
				this.loginView = new LoginView();
			}
			$('#content').html(this.loginView.el);
			$('.loggedInMenu').remove();
		}
		else {
				var permitApp = new PermitApp();
				$('#content').html(new PermitAppView({model: permitApp}).el);
				this.headerView.selectMenuItem('add-menu');
		}
	},
	logout: function(){
		Parse.User.logOut();
		this.loginView = new LoginView();
		$('#content').html(this.loginView.el);
		$(".login-form button").removeAttr("disabled");
		$('.loggedInMenu').hide();

			
	}
});
	utils.loadTemplate(['HeaderView', 'PermitAppView', 'PermitAppListItemView', 'AboutView', 'LoginView'], function() {
    app = new AppRouter();
    Parse.history.start();
	});
});