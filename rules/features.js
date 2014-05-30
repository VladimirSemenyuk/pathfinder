(function() {
    pcg.collections.FeaturesCollection = Backbone.Collection.extend({
        model: pcg.models.Feature
    });

    pcg.traits = new pcg.collections.FeaturesCollection([
        {
            id: 'slowAndSteady',
            name: 'Slow and Steady',
            description: 'Speed is never modified by armor or encumbrance.',
            effect: function(char) {
                //trait context
                //char.removeComputed('speed');
                //char.set('speed', 20); //todo зказать Валере, что 'computed name "speed" is already used'
            },
            speedMod: -10
        },
        {
            id: 'darkvision',
            name: 'Darkvision',
            description: 'Can see in the dark up to 60 feet.'
        },
        {
            id: 'defensiveTraining',
            name: 'Defensive Training',
            description: 'Get a +4 dodge bonus to AC against monsters of the giant subtype.',
            effect: function(char) {
                char.addComputed('ACvsGiantType', {
                    deps: [],
                    get: function(AC) {
                        return AC + 4; //todo зказать Валере, что не работает зависомость от другого компутеда
                    }
                })
            }
        },



    ]);

    pcg.classFeatures = new pcg.collections.FeaturesCollection([
        {
            id: 'fastMovement',
            name: 'Fast Movement',
            description: 'A barbarian\'s base speed is faster than the norm for her race by +10 feet. This benefit applies only when she is wearing no armor, light armor, or medium armor, and not carrying a heavy load.',
            speedMod: 10

        }
    ]);
})();