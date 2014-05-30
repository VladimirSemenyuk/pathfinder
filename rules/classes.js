(function() {
    pcg.collections.ClassCollection = Backbone.Collection.extend({
        model: pcg.models.Class
    });

    pcg.classes = new pcg.collections.ClassCollection([
        {
            id: 'barbarian',
            name: 'Barbarian'
        }
    ]);
})();