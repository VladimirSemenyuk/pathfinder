(function() {
    pcg.collections.SizeCollection = Backbone.Collection.extend({
        model: pcg.models.Size
    });

    pcg.sizes = new pcg.collections.SizeCollection([
        {
            id: 'medium',
            name: 'Medium',
            speed: 30
        }

    ]);


})();