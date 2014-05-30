(function() {
    pcg.collections.ClassCollection = Backbone.Collection.extend({
        model: pcg.models.Class
    });

    pcg.classes = new pcg.collections.ClassCollection([
        {
            id: 'barbarian',
            name: 'Barbarian',
            classSkills: [
                pcg.skills.get('acrobatics'),
                pcg.skills.get('climb'),
                pcg.skills.get('craft'),
                pcg.skills.get('handleAnimal'),
                pcg.skills.get('intimidate'),
                pcg.skills.get('knowledgeNature'),
                pcg.skills.get('perception'),
                pcg.skills.get('ride'),
                pcg.skills.get('survival'),
                pcg.skills.get('swim')
            ]
        }
    ]);
})();