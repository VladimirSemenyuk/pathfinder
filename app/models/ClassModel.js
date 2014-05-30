(function() {
    pcg.models.Class = Backbone.Ribs.Model.extend({
        defaults: {
            name: '',


        },

        computeds: {

        },

        initialize: function(data, args) {
            _.extend(this, args);
        }
    });
})();