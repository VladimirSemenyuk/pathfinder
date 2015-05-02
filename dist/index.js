(function(global) {
    global.pcg = {
        models: {},
        collections: {},
        views: {},

        races: {}
    };

    Backbone.history.start();

})(window);;
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
            },

            maxHp: 4,

            freeSkillPoints: 0
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

            if (this.increaseAbility) {
                for (var i in this.increaseAbility) {
                    var newValue = this.get('abilitiesBase.'+i) + this.increaseAbility[i];

                    this.set('abilitiesBase.'+i, newValue);
                }
            }

            this.levelsCollection = new pcg.collections.LevelsCollection();
            this.activeLevelsCollection = new pcg.collections.LevelsCollection();
            this.featuresCollection = new pcg.collections.FeaturesCollection();
            this.skillsCollection = new pcg.collections.SkillsCollection();

            this._initSkills();
            this._updateSkills();
            this._updateSkillsRanks();

            this.levelsCollection.on({
                'add remove reset': this._setLevelCount,
                'add remove reset change:active': this._resetActiveLevels
            }, this);

            this.activeLevelsCollection.on('add remove reset', function() {
                this._setActiveFeatures();
                this._setBaseAttack();
                this._setSaveThrows();
                this._setClassSkills();
                this._setBaseAttack();
                this._updateSkillsRanks();
                this._updateMaxHp();
            }, this);

            this.featuresCollection.on('add remove reset', function() {
                this._setSpeed();
                this._setArmorClass();
                this._updateSkills();
                this._updateSkillsRanks();
            }, this);

            this.on({
                'change:race': function() {
                    this._setActiveFeatures();
                    this._setSpeed();
                    this._setArmorClass();
                },
                'change:strMod change:dexMod change:conMod change:intMod change:wisMod change:chaMod': function() {
                    this._updateSkills();
                    this._updateMaxHp();
                },
                'change:level': function() {
                    this._updateSkillsRanks();
                }
            }, this);

            this._setActiveFeatures();
            this._setSaveThrows();
        },

        _updateMaxHp: function() {
            var hp = this.activeLevelsCollection.pluck('hp');

            var result = 0;

            for (var i = 0; i < hp.length; i++) {
                result += hp[i];
            }

            this.set('maxHp', result);
        },

        _initSkills: function() {
            for (var i = 0; i < pcg.skills.length; i++) {
                this.skillsCollection.add(pcg.skills.at(i).clone());
            }
        },

        _updateSkills: function() {
            var self = this,
                featuresSkillModsRaw = _(self.featuresCollection.pluck('skillMods'))
                    .without(undefined)
                    .value(),
                featuresSkillMods = {};

            for (var i = 0; i < featuresSkillModsRaw.length; i++) {
                for (var f in featuresSkillModsRaw[i]) {
                    if (featuresSkillModsRaw[i].hasOwnProperty(f)) {
                        if (featuresSkillMods[f]) {
                            featuresSkillMods[f] += featuresSkillModsRaw[i][f];
                        } else{
                            featuresSkillMods[f] = featuresSkillModsRaw[i][f];
                        }
                    }
                }
            }

            this.skillsCollection.each(function(skill) {
                var mods = {
                    ability: self.get(skill.get('ability') + 'Mod')
                };

                if (featuresSkillMods[skill.get('id')]) {
                    mods.other = featuresSkillMods[skill.get('id')];
                }

                skill.set('mods', mods);
            });
        },

        _updateSkillsRanks: function() {
            var skillsCollections = this.activeLevelsCollection.map(function(level) {
                return level.skillsCollection;
            }),
            skillsIds = pcg.skills.pluck('id'),
            ranksObj = {};

            for (var i = 0; i < skillsIds.length; i++) {
                ranksObj[skillsIds[i]] = 0
            }

            for (var j = 0; j < skillsCollections.length; j++) {
                skillsCollections[j].each(function(skill) {
                    ranksObj[skill.get('id')] += skill.get('rank');
                });
            }

            this.skillsCollection.each(function(skill) {
                skill.set('rank', ranksObj[skill.get('id')]);
            });

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

        _setClassSkills: function() {
            var skills = [],
                skillNames = [],
                classes = this._getClasses();

            _.each(_.pluck(classes, 'classSkillsCollection'), function(collection) {
                for (var i = 0; i < collection.length; i++) {
                    var skill = collection.at(i);

                    if (skillNames.indexOf(skill.get('name')) === -1) {
                        skillNames.push(skill.get('name'));
                        skills.push(skill);
                    }
                }
            });

            for (var i = 0; i< skills.length; i++) {
                this.skillsCollection.get(skills[i].get('id')).set('isClassSkill', true)
            }
        },

        _getClasses: function() {
            return _.uniq(this.activeLevelsCollection.pluck('class'));
        },

        _addLevel: function(level, wantSkillPoint) {
            level._character = this;

            level.initSkills();

            if (!this.get('level')) {
                level.setMaxHp();
            } else {
                level.initHp();
            }
            //level._updateSkills();



            var additionalPoints = 0,
                skillPoints = this.get('intMod') + level.get('skillPointsPerLevel');

            if (level.get('prefered')) {
                if (wantSkillPoint) {
                    additionalPoints = 1;
                } else {
                    level.set('hp', level.get('hp') +1);

                    //this.set('hp', this.get('hp') + 1); //todo доработать

                }
            }


            this.set('freeSkillPoints', this.get('freeSkillPoints') + skillPoints + additionalPoints);

            this.levelsCollection.add(level);

            return this.levelsCollection.length;
        },

        addLevelByClassName: function(clss) {
            if (typeof  clss !== 'string') {
                clss = clss.get('name');
            }

            var currentLevelsInClass = this.levelsCollection.where({className: clss}),
                nextLevelOrder = 1;

            if (currentLevelsInClass.length) {
                nextLevelOrder = currentLevelsInClass.length + 1;
            }

            if (!this.get('level')) {
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

                this._addLevel(nextLevel);

                return nextLevel;
            } else {
                return undefined;
            }
        }
    });
})();;
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
})();;
(function() {
    pcg.models.Feature = Backbone.Ribs.Model.extend({
        defaults: {
            name: '',
            description: ''
        }
    });
})();;
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
})();;
(function() {
    pcg.models.Race = Backbone.Ribs.Model.extend({
        defaults: {
            name: '',
            abilityMods: {},
            size: new Backbone.Ribs.Model(),
            traits: new Backbone.Collection()
        },

        computeds: {
           speed: {
                deps: ['size'],
                get: function(size) {
                    return size.get('speed');
                }
            }
        },

        initialize: function(data, args) {
            var features = data.features || [];



            this.featuresCollection = new pcg.collections.FeaturesCollection(features);

            delete data.features;

            _.extend(this, args);
        }
    });
})();;
(function() {
    pcg.models.Size = Backbone.Ribs.Model.extend({
        defaults: {
            name: '',
            description: '',
            speed: 30
        }
    });
})();;
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

        _setRank: function(rank) {
            this.set('rank', rank);

            if (this._character) {
                this._character.trigger('change:level');

                return this._character.skillsCollection.get(this.get('id')).get('level');
            }
        },

        addRank: function(delta) {
            var freePoints = this._character.get('freeSkillPoints');

            if (!this._character || (this.get('rank') + delta < 0) || (freePoints - delta) < 0) {
                return;
            }

            if (this._character.get('level') >= this.get('rank') + delta) {
                this._character.set('freeSkillPoints', freePoints - delta)

                return this._setRank(this.get('rank') + delta);
            }
        },

        increaseRank: function() {
            return  this.addRank(1);
        },

        decreaseRank: function() {
            return  this.addRank(-1);
        }
    });
})();;
(function() {
    pcg.views.AbilitiesFormView = Backbone.Ribs.View.extend({
        bindings: {
            '.js-str': 'text:model.str',
            '.js-dex': 'text:model.dex',
            '.js-con': 'text:model.con',
            '.js-wis': 'text:model.wis',
            '.js-int': 'text:model.int',
            '.js-cha': 'text:model.cha',
            '.js-str-base': 'value:model.abilitiesBase.str',
            '.js-dex-base': 'value:model.abilitiesBase.dex',
            '.js-con-base': 'value:model.abilitiesBase.con',
            '.js-wis-base': 'value:model.abilitiesBase.wis',
            '.js-int-base': 'value:model.abilitiesBase.int',
            '.js-cha-base': 'value:model.abilitiesBase.cha',
            '.js-str-mod': 'text:mod(model.strMod)',
            '.js-dex-mod': 'text:mod(model.dexMod)',
            '.js-con-mod': 'text:mod(model.conMod)',
            '.js-wis-mod': 'text:mod(model.wisMod)',
            '.js-int-mod': 'text:mod(model.intMod)',
            '.js-cha-mod': 'text:mod(model.chaMod)'
        },

        filters: {
            mod: function(mod) {

                return (mod >= 0) ? ('+' + mod) : ('' + mod);
            }
        },

        template: _.template('<form class="abilities-form"><div class="abilities-form__header"></div><ul class="abilities-form__items"><li class="abilities-form__item"><span class="">STR</span><input class="js-str-base"><span class="js-str"></span><span class="js-str-mod"></span></li><li class="abilities-form__item"><span class="">DEX</span><input class="js-dex-base"><span class="js-dex"></span><span class="js-dex-mod"></span></li><li class="abilities-form__item"><span class="">CON</span><input class="js-con-base"><span class="js-con"></span><span class="js-con-mod"></span></li><li class="abilities-form__item"><span class="">INT</span><input class="js-int-base"><span class="js-int"></span><span class="js-int-mod"></span></li><li class="abilities-form__item"><span class="">WIS</span><input class="js-wis-base"><span class="js-wis"></span><span class="js-wis-mod"></span></li><li class="abilities-form__item"><span class="">CHA</span><input class="js-cha-base"><span class="js-cha"></span><span class="js-cha-mod"></span></li></ul></form>'),

        initialize: function(args) {
            _.extend(this, args);

            this.render();
        },

        render: function() {
            this.setElement(this.template({}));

            this.$placeholder.append(this.$el);
        }
    });
})();;
(function() {
    pcg.views.CharacterMainSettingsView = Backbone.Ribs.View.extend({
        bindings: {
            '.js-char-name': 'value:model.name',
            '.js-player-name': 'value:model.player',
            '.js-alignment': 'value:model.alignment',
            '.js-level': 'text:model.level'
        },

        filters: {

        },

        template: _.template('<form class="main-settings"><label for="charName">Name</label><input id="charName" class="js-char-name"><label for="playerName">Player</label><input id="playerName" class="js-player-name"><label for="alignment">Alignment</label><select id="alignment" class="js-alignment"><option value="Lawfull Good">Lawfull Good</option><option value="Neutral Good">Neutral Good</option><option value="Chaotic Good">Chaotic Good</option><option value="Lawfull Neutral">Lawfull Neutral</option><option value="True Neutral"   >True Neutral</option><option value="Chaotic Neutral">Chaotic Neutral</option><option value="Lawfull Evil">Lawfull Evil</option><option value="Neutral Evil">Neutral Evil</option><option value="Chaotic Evil">Chaotic Evil</option></select><span class="js-level"></span></form>'),

        initialize: function(args) {
            _.extend(this, args);

            this.render();
        },

        render: function() {
            this.setElement(this.template({}));

            this.$placeholder.append(this.$el);
        }
    });
})();;
(function() {
    pcg.views.SkillItemView = Backbone.Ribs.View.extend({
        tagName: 'li',
        className: 'js-skills-list__item',

        bindings: {
            'el': 'text:nameAndLevel(model.name,model.level),classes:{classed:model.isClassSkill}'
        },

        filters: {
            'nameAndLevel': function(name, level) {
                return name + ' ' + level + '';
            }
        },

        initialize: function(args) {
            _.extend(this, args);

            //this.render();

        },

        render: function() {
            //this.setElement(this.template({}));
        }
    });
})();;
(function() {
    pcg.views.SkillsListView = Backbone.Ribs.View.extend({
        SkillItemView: pcg.views.SkillItemView,

        bindings: {
            'el': 'collection:{col:collection,view:SkillItemView}'
        },

        filters: {

        },

        template: _.template('<ul class="js-skills-list"></ul>'),

        initialize: function(args) {
            _.extend(this, args);

            this.render();
        },

        render: function() {
            this.setElement(this.template({}));

            this.$placeholder.append(this.$el);
        }
    });
})();