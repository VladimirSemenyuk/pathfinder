(function() {

    pcg.models.Character = Backbone.Ribs.Model.extend({
        defaults: {
            name: '',
            player: '',
            alignment: 'True Neutral',

            abilitiesBase: {
                str: 10,
                dex: 10,
                con: 10,
                wis: 10,
                int: 10,
                cha: 10
            },

            level: 0,

            speed: 30,
            armorClass: 10,
            baseAttack: [0],

            race: undefined,

            saveThrows: {
                fort: 0,
                ref: 0,
                will: 0
            }
        },

        computeds: {
            abilities: {
                deps: ['abilitiesBase', 'race'],
                get: function(base, race) {
                    var result = {};

                    for (var ability in base) {
                        if (base.hasOwnProperty(ability)) {
                            result[ability] = base[ability];

                            var raceAbilityMod = race.get('abilityMods.' + ability);

                            if (raceAbilityMod) {
                                result[ability] += raceAbilityMod;
                            }
                        }
                    }

                    return result;
                }
            },
            str: {
                deps: ['abilities'],
                get: function(abilities) {
                    return abilities.str;
                },
                set: function(val) {
                    return {'abilitiesBase.str': parseInt(val, 10)};
                }
            },
            dex: {
                deps: ['abilities'],
                get: function(abilities) {
                    return abilities.dex;
                },
                set: function(val) {
                    return {'abilitiesBase.dex': parseInt(val, 10)};
                }
            },
            con: {
                deps: ['abilities'],
                get: function(abilities) {
                    return abilities.con;
                },
                set: function(val) {
                    return {'abilitiesBase.con': parseInt(val, 10)};
                }
            },
            wis: {
                deps: ['abilities'],
                get: function(abilities) {
                    return abilities.wis;
                },
                set: function(val) {
                    return {'abilitiesBase.wis': parseInt(val, 10)};
                }
            },
            int: {
                deps: ['abilities'],
                get: function(abilities) {
                    return abilities.int;
                },
                set: function(val) {
                    return {'abilitiesBase.int': parseInt(val, 10)};
                }
            },
            cha: {
                deps: ['abilities'],
                get: function(abilities) {
                    return abilities.cha;
                },
                set: function(val) {
                    return {'abilitiesBase.cha': parseInt(val, 10)};
                }
            },

            strMod: {
                deps: ['str'],
                get: function(str) {
                    return Math.floor((str - 10) / 2);
                }
            },
            dexMod: {
                deps: ['dex'],
                get: function(str) {
                    return Math.floor((str - 10) / 2);
                }
            },
            conMod: {
                deps: ['con'],
                get: function(str) {
                    return Math.floor((str - 10) / 2);
                }
            },
            wisMod: {
                deps: ['wis'],
                get: function(str) {
                    return Math.floor((str - 10) / 2);
                }
            },
            intMod: {
                deps: ['int'],
                get: function(str) {
                    return Math.floor((str - 10) / 2);
                }
            },
            chaMod: {
                deps: ['cha'],
                get: function(str) {
                    return Math.floor((str - 10) / 2);
                }
            },

            size: {
                deps: ['race'],
                get: function(race) {
                    return race.get('size');
                }
            },

            fortSave: {
                deps: ['saveThrows'],
                get: function(saveThrows) {
                    return saveThrows.fort;
                }
            },
            refSave: {
                deps: ['saveThrows'],
                get: function(saveThrows) {
                    return saveThrows.ref;
                }
            },
            willSave: {
                deps: ['saveThrows'],
                get: function(saveThrows) {
                    return saveThrows.will;
                }
            }


        },

        initialize: function(data, args) {
            _.extend(this, args);

            this.levelsCollection = new pcg.collections.LevelsCollection();
            this.activeLevelsCollection = new pcg.collections.LevelsCollection();
            this.featuresCollection = new pcg.collections.FeaturesCollection();

            this.levelsCollection.on({
                'add remove reset': this._setLevelCount,
                'add remove reset change:active': this._resetActiveLevels
            }, this);

            this.activeLevelsCollection.on({
                'add remove reset': this._setActiveFeatures,
                'add remove reset': this._setBaseAttack,
                'add remove reset': this._setSaveThrows
            }, this);

            this.featuresCollection.on({
                'add remove reset': this._setSpeed,
                'add remove reset': this._setArmorClass
            }, this);

            this.on({
                'change:race': this._setActiveFeatures,
                'change:race': this._setSpeed,
                'change:race': this._setArmorClass
            }, this);

            this._setActiveFeatures();
            this._setSaveThrows();
        },

        _setLevelCount: function() {
            this.set('level', this.levelsCollection.length);
        },

        _resetActiveLevels: function() {
            this.activeLevelsCollection.reset(this.levelsCollection.where({active: true}));
        },

        _setActiveFeatures: function() {
            var raceTraits = this.get('race').featuresCollection.toArray(),
                classFeatures = _.flatten(this.activeLevelsCollection.map(function(level) {
                    return level.featuresCollection.toJSON();
                }));
            //todo добавить фиты

            var allFeatures = []
                .concat(raceTraits || [])
                .concat(classFeatures || []);

            this.featuresCollection.reset(allFeatures);
        },

        _setSpeed: function() {
            var speedMod = 0;

            this.featuresCollection.each(function(model) {
                var newMod = model.get('speedMod');

                if (newMod) {
                    speedMod += model.get('speedMod');
                }
            });

            this.set('speed', this.get('race').get('speed') + speedMod);
        },

        _setArmorClass: function() {
            var acMod = 0;

            this.featuresCollection.each(function(model) {
                var newMod = model.get('armorClassMod');

                if (newMod) {
                    acMod += model.get('armorClassMod');
                }
            });

            this.set('armorClass', 10 + acMod)
        },

        _setBaseAttack: function() {
            var result = 0;

            _.each(this.activeLevelsCollection.pluck('baseAttackBonus'), function(bab) {
                result += bab;
            });

            this.set('baseAttack', _.range(result, 0, -5));
        },

        _setSaveThrows: function() {
            var result = {
                fort: this.get('conMod'),
                ref: this.get('dexMod'),
                will: this.get('wisMod')
            };

            _.each(this.activeLevelsCollection.pluck('saveThrowsBonus'), function(saves) {
                result.fort += saves.fort;
                result.ref += saves.ref;
                result.will += saves.will;
            });

            this.set('saveThrows', result);
        },

        addLevel: function(level) {
            this.levelsCollection.add(level);

            return this.levelsCollection.length;
        },

        addLevelByClass: function(clss) {
            if (typeof  clss !== 'string') {
                clss = clss.get('name');
            }

            var currentLevelsInClass = this.levelsCollection.where({className: clss}),
                nextLevelOrder = 1;

            if (currentLevelsInClass.length) {
                nextLevelOrder = currentLevelsInClass.length + 1;
            } else {
                this._preferedClassName = clss;
            }

            var nextLevel = pcg.levels.where({className: clss, order: nextLevelOrder})[0];

            if (nextLevel) {
                nextLevel = nextLevel.clone();

                var settings = {active:true};

                if (clss === this._preferedClassName) {
                    settings.prefered = true;
                }

                nextLevel.set(settings);

                this.addLevel(nextLevel);

                return nextLevel;
            } else {
                return undefined;
            }
        }
    });
})();