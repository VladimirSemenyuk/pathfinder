(function() {
    pcg.models.Class = Backbone.Ribs.Model.extend({
        defaults: {
            name: ''
        },

        computeds: {

        },

        initialize: function(data, args) {
            data = data || {};

            var skills = data.classSkills || [];

            this.classSkillsCollection = new pcg.collections.SkillsCollection(skills);

            delete data.classSkills;

            _.extend(this, args);
        }
    });
})();