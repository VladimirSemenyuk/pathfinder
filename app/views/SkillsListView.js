(function() {
    pcg.views.SkillsListView = Backbone.Ribs.View.extend({
        SkillItemView: pcg.views.SkillItemView,

        bindings: {
            'el': 'collection:{col:collection,view:SkillItemView}'
        },

        filters: {

        },

        template: _.template('<ul class="js-skills-list"></ul>'),

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