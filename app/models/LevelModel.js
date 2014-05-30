(function() {
    pcg.models.Level = Backbone.Ribs.Model.extend({
        defaults: {
            order: 1,
            description: '',
            class: new pcg.models.Class(),

            baseAttackBonus: 0,

            fortSave: 0,
            refSave: 0,
            willSave: 0
        },

        computeds: {
            className: {
                deps: ['class'],
                get: function(clss) {
                    return clss.get('name');
                }
            }
        },

        initialize: function(data, args) {
            var features = data.features || [];

            this.featuresCollection = new pcg.collections.FeaturesCollection(features);

            delete data.features;

            _.extend(this, args);
        }
    });
})();