(function() {
    pcg.models.Level = Backbone.Ribs.Model.extend({
        defaults: {
            order: 1,
            description: '',
            class: undefined,

            baseAttackBonus: 0,

            /*freeSkillsPoints: 0,*/

        },

        computeds: {
            className: {
                deps: ['class'],
                get: function(clss) {
                    return clss.get('name');
                }
            },
            skillPointsPerLevel: {
                deps: ['class'],
                get: function(clss) {
                    return clss.get('skillPointsPerLevel');
                }
            }
        },

        initialize: function(data, args) {
            var features = data.features || [];

            this.featuresCollection = new pcg.collections.FeaturesCollection(features);

            delete data.features;

            _.extend(this, args);

            this.skillsCollection = new pcg.collections.SkillsCollection();

            /*if (this._character) {
                var skillRanks = this._character.get('intMod') + this.get('skillRanksPerLevel');

                this.set('freeSkillRanks', this.get('freeSkillRanks') + skillRanks);
            }*/
        },

        initSkills: function() {
            for (var i = 0; i < pcg.skills.length; i++) {
                var skill = pcg.skills.at(i).clone();

                skill._character = this._character;

                this.skillsCollection.add(skill);
            }
        },

        initHp: function() {


            var rand =  Math.round(0.5 + Math.random()*(this.get('class').get('hitDice'))),
                misk = this._character.get('conMod');


            this.set('hp', rand + misk);
        },

        setMaxHp: function() {
            this.set('hp', this.get('class').get('hitDice') + this._character.get('conMod'));
        }
    });
})();