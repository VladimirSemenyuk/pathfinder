(function() {
    pcg.views.CharacterMainSettingsView = Backbone.Ribs.View.extend({
        bindings: {
            '.js-char-name': 'value:model.name',
            '.js-player-name': 'value:model.player',
            '.js-alignment': 'value:model.alignment',
            '.js-level': 'text:model.level'
        },

        filters: {

        },

        template: _.template('<%characterMainSettings%>'),

        initialize: function(args) {
            _.extend(this, args);

            this.render();
        },

        render: function() {
            this.setElement(this.template({}));

            this.$placeholder.append(this.$el);
        }
    });
})();