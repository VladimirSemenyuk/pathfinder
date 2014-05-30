(function() {
    pcg.collections.RaceCollection = Backbone.Collection.extend({
        model: pcg.models.Race
    });

    pcg.races = new pcg.collections.RaceCollection([
        {
            id: 'dwarf',
            name: 'Dwarf',
            abilityMods: {
                con: 2,
                wis: 2,
                cha: -2
            },
            size: pcg.sizes.get('medium'),
            features:[
                pcg.traits.get('slowAndSteady').clone(),
                pcg.traits.get('darkvision').clone(),
                pcg.traits.get('defensiveTraining').clone()
            ]
        }
    ]);
})();