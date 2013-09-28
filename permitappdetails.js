
PermitAppView = Parse.View.extend({

    initialize: function () {
        this.render();
		$("#building, #street2, #sidewalk").hide();

    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change",
        "click .save"   : "savePermitApp",
        "click .delete" : "deletePermitApp",
        "drop #picture" : "dropHandler",
		"change #permitType" : "changePermitType"
		
		
		
    },
	changePermitType: function() {
		if ($('#permitType').val()=="street"){
			$("#sidewalk, #building").hide();
			$("#street2").show("slide", { direction: "up" }, 2000);
			}
		else if ($('#permitType').val()=="building"){
			$("#street2, #sidewalk").hide();
			$("#building").show("slide", { direction: "up" }, 2000);
			}
		else if ($('#permitType').val()=="sidewalk")
			{
			$("#building, #street2").hide();
			$("#sidewalk").show("slide", { direction: "up" }, 2000);
			}
		else {
			$("#building, #street2, #sidewalk").hide("slide", { direction: "up" }, 2000);
			
			}
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

    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        // Upload picture file if a new file was dropped in the drop area
        if (this.pictureFile) {
            this.model.set("picture", this.pictureFile.name);
            utils.uploadFile(this.pictureFile,
                function () {
                    self.savePermitApp();
                }
            );
        } else {
            this.savePermitApp();
        }
        return false;
    },

    savePermitApp: function () {
        var self = this;
        this.model.save(null,  {
            success: function (model) {
                self.render();
                app.navigate('permitapps/' + model.id, false);
				utils.showAlert('Success!', 'Application saved successfully', 'alert-success');

            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to save this item', 'alert-error');
            }
        });
    },

    deletePermitApp: function () {
        this.model.destroy({
            success: function () {
                alert('Application deleted successfully');
                window.history.back();
            }
        });
        return false;
    },

    dropHandler: function (event) {
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];

        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function () {
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    }
	

});
