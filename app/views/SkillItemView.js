(function() {
    pcg.views.SkillItemView = Backbone.Ribs.View.extend({
        tagName: 'li',
        className: 'js-skills-list__item',

        bindings: {
            'el': 'text:nameAndLevel(model.name,model.level),classes:{classed:model.isClassSkill}'
        },

        filters: {
            'nameAndLevel': function(name, level) {
                return name + ' ' + level + '';
            }
        },

        initialize: function(args) {
            _.extend(this, args);

            //this.render();

        },

        render: function() {
            //this.setElement(this.template({}));
        }
    });
})();