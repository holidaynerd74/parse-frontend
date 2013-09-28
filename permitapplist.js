PermitAppListView = Parse.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var permitApps = this.model.models;
        var len = permitApps.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = 0; i < len; i++) {
			console.log(permitApps[i]);
            $('.thumbnails', this.el).append(new PermitAppListItemView({model: permitApps[i]}).render().el);
			
        }

        $("#content").html(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

PermitAppListItemView = Parse.View.extend({

	tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});