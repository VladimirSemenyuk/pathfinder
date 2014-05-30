(function() {
    pcg.views.AbilitiesFormView = Backbone.Ribs.View.extend({
        bindings: {
            '.js-str': 'text:model.str',
            '.js-dex': 'text:model.dex',
            '.js-con': 'text:model.con',
            '.js-wis': 'text:model.wis',
            '.js-int': 'text:model.int',
            '.js-cha': 'text:model.cha',
            '.js-str-base': 'value:model.abilitiesBase.str',
            '.js-dex-base': 'value:model.abilitiesBase.dex',
            '.js-con-base': 'value:model.abilitiesBase.con',
            '.js-wis-base': 'value:model.abilitiesBase.wis',
            '.js-int-base': 'value:model.abilitiesBase.int',
            '.js-cha-base': 'value:model.abilitiesBase.cha',
            '.js-str-mod': 'text:mod(model.strMod)',
            '.js-dex-mod': 'text:mod(model.dexMod)',
            '.js-con-mod': 'text:mod(model.conMod)',
            '.js-wis-mod': 'text:mod(model.wisMod)',
            '.js-int-mod': 'text:mod(model.intMod)',
            '.js-cha-mod': 'text:mod(model.chaMod)'
        },

        filters: {
            mod: function(mod) {

                return (mod >= 0) ? ('+' + mod) : ('' + mod);
            }
        },

        template: _.template('<%abilitiesForm%>'),

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