(function() {
    pcg.models.Race = Backbone.Ribs.Model.extend({
        defaults: {
            name: '',
            abilityMods: {},
            size: new Backbone.Ribs.Model(),
            traits: new Backbone.Collection()
        },

        computeds: {
           speed: {
                deps: ['size'],
                get: function(size) {
                    return size.get('speed');
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