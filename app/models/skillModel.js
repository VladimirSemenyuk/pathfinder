(function() {
    pcg.models.Skill = Backbone.Ribs.Model.extend({
        defaults: {
            name: '',
            description: '',
            ability: 'str',
            mods: {
                ability: 0
            },
            rank: 0,
            isUntrained: true,
            isClassSkill: false
        },

        computeds: {
            level: {
                deps: ['rank', 'isClassSkill', 'mods', 'isUntrained'],
                get: function(rank, isClassSkill, mods, isUntrained) {
                    var mod = 0;

                    for (var m in mods) {
                        if (mods.hasOwnProperty(m)) {
                            mod += mods[m];
                        }
                    }

                    if (isClassSkill && rank) {
                        return rank + 3 + mod;
                    } else if (!rank && !isUntrained) {
                        return 0;
                    } else {
                        return rank + mod;
                    }
                }
            }
        },

        setRank: function(rank) {
            this.set('rank', rank);

            if (this._character) {
                this._character.trigger('change:level');

                return this._character.skillsCollection.get(this.get('id')).get('level');
            }
        },

        addRank: function(delta) {
            if (!this._character || (this.get('rank') + delta < 0)) {
                return;
            }

            if (this._character.get('level') >= this.get('rank') + delta) {
                return this.setRank(this.get('rank') + delta);
            }
        },

        increaseRank: function() {
            return  this.addRank(1);
        },

        decreaseRank: function() {
            return  this.addRank(-1);
        }
    });
})();