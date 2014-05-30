(function() {
    pcg.collections.LevelsCollection = Backbone.Collection.extend({
        model: pcg.models.Level
    });

    var barbarianClass = pcg.classes.get('barbarian');

    pcg.levels = new pcg.collections.LevelsCollection([
        {
            order: 1,
            class: barbarianClass,

            baseAttackBonus: 1,

            saveThrowsBonus: {
                fort: 2,
                ref: 0,
                will: 0
            },

            features: [
                pcg.classFeatures.get('fastMovement')
            ]
        },
        {
            order: 2,
            class: barbarianClass,

            baseAttackBonus: 1,

            saveThrowsBonus: {
                fort: 1,
                ref: 0,
                will: 0
            }
        }
    ]);
})();