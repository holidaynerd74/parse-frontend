Parse.initialize("GrOPytPkFt7S40jnWEGL290LFR5Wt1tdUpglpHvu", "5csby6KrS9yd73xMWzxqqaar3ACu6Z9FPEGDY4pl");
window.PermitApp = Parse.Object.extend({

    className: "PermitApps",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.houseNumber = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a house number"};
        };

        this.validators.street = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a street"};
        };
		 this.validators.fromDate = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a start date"};
        };
		 
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

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
        name: "",
		permiteeId:"",
        houseNumber: "",
        street: "",
        crossStreet: "",
        crossStreetTwo: "",
        fromDate: "",
		toDate: "",
		stipulations: "",
		description: "",
		permits: "",
		borough: "",
        picture: null,
		workingOn: "",
		roadType: "",
		sidewalkType: "",
		user: Parse.User.current()
    }
});
window.PermitAppCollection = Parse.Collection.extend({
	className: "PermitApps",
    model: PermitApp
});
