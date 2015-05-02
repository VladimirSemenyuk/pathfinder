(function() {



})();;
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


})();;
(function() {
    pcg.collections.FeaturesCollection = Backbone.Collection.extend({
        model: pcg.models.Feature
    });

    pcg.traits = new pcg.collections.FeaturesCollection([
        {
            id: 'slowAndSteady',
            name: 'Slow and Steady',
            description: 'Speed is never modified by armor or encumbrance.',
            effect: function(char) {
                //trait context
                //char.removeComputed('speed');
                //char.set('speed', 20); //todo зказать Валере, что 'computed name "speed" is already used'
            },
            speedMod: -10
        },
        {
            id: 'darkvision',
            name: 'Darkvision',
            description: 'Can see in the dark up to 60 feet.'
        },
        {
            id: 'intimidating',
            name: 'Intimidating',
            description: 'Character receives a +2 racial bonus on Intimidate skill checks.',
            skillMods: {
                intimidate: 2
            }
        },
        {
            id: 'defensiveTraining',
            name: 'Defensive Training',
            description: 'Get a +4 dodge bonus to AC against monsters of the giant subtype.',
            effect: function(char) {
                char.addComputed('ACvsGiantType', {
                    deps: [],
                    get: function(AC) {
                        return AC + 4; //todo зказать Валере, что не работает зависомость от другого компутеда
                    }
                })
            }
        }



    ]);

    pcg.classFeatures = new pcg.collections.FeaturesCollection([
        {
            id: 'fastMovement',
            name: 'Fast Movement',
            description: 'A barbarian\'s base speed is faster than the norm for her race by +10 feet. This benefit applies only when she is wearing no armor, light armor, or medium armor, and not carrying a heavy load.',
            speedMod: 10

        }
    ]);
})();;
(function() {
    pcg.collections.SkillsCollection = Backbone.Collection.extend({
        model: pcg.models.Skill
    });

    pcg.skills = new pcg.collections.SkillsCollection([
        {
            id: 'acrobatics',
            name: 'Acrobatics',
            ability: 'dex'
        },
        {
            id: 'appraise',
            name: 'Appraise',
            ability: 'int'
        },
        {
            id: 'bluff',
            name: 'Bluff',
            ability: 'cha'
        },
        {
            id: 'climb',
            name: 'Climb',
            ability: 'str'
        },
        {
            id: 'craft',
            name: 'Craft',
            ability: 'int'
        },
        {
            id: 'diplomacy',
            name: 'Diplomacy',
            ability: 'cha'
        },
        {
            id: 'disableDevice',
            name: 'Disable Device',
            ability: 'dex',
            isUntrained: false
        },
        {
            id: 'disguise',
            name: 'Disguise',
            ability: 'cha'
        },
        {
            id: 'escapeArtist',
            name: 'Escape Artist',
            ability: 'dex'
        },
        {
            id: 'fly',
            name: 'Fly',
            ability: 'dex'
        },
        {
            id: 'handleAnimal',
            name: 'Handle Animal',
            ability: 'cha',
            isUntrained: false
        },
        {
            id: 'heal',
            name: 'Heal',
            ability: 'wis'
        },
        {
            id: 'intimidate',
            name: 'Intimidate',
            ability: 'cha'
        },
        {
            id: 'knowledgeArcana',
            name: 'Knowledge (arcana)',
            ability: 'int',
            isUntrained: false
        },
        {
            id: 'knowledgeDungeoneering',
            name: 'Knowledge (dungeoneering)',
            ability: 'int',
            isUntrained: false
        },
        {
            id: 'knowledgeEngineering',
            name: 'Knowledge (engineering)',
            ability: 'int',
            isUntrained: false
        },
        {
            id: 'knowledgeGeography',
            name: 'Knowledge (geography)',
            ability: 'int',
            isUntrained: false
        },
        {
            id: 'knowledgeHistory',
            name: 'Knowledge (history)',
            ability: 'int',
            isUntrained: false
        },
        {
            id: 'knowledgeLocal',
            name: 'Knowledge (local)',
            ability: 'int',
            isUntrained: false
        },
        {
            id: 'knowledgeNature',
            name: 'Knowledge (nature)',
            ability: 'int',
            isUntrained: false
        },
        {
            id: 'knowledgeNobility',
            name: 'Knowledge (nobility)',
            ability: 'int',
            isUntrained: false
        },
        {
            id: 'knowledgePlanes',
            name: 'Knowledge (planes)',
            ability: 'int',
            isUntrained: false
        },
        {
            id: 'knowledgeReligion',
            name: 'Knowledge (religion)',
            ability: 'int',
            isUntrained: false
        },
        {
            id: 'linguistics',
            name: 'Linguistics',
            ability: 'int',
            isUntrained: false
        },
        {
            id: 'perception',
            name: 'Perception',
            ability: 'wis'
        },
        {
            id: 'perform',
            name: 'Perform',
            ability: 'cha'
        },
        {
            id: 'profession',
            name: 'Profession',
            ability: 'wis',
            isUntrained: false
        },
        {
            id: 'ride',
            name: 'Ride',
            ability: 'dex'
        },
        {
            id: 'senseMotive',
            name: 'Sense Motive',
            ability: 'wis'
        },
        {
            id: 'sleightOfHand',
            name: 'Sleight of Hand',
            ability: 'dex',
            isUntrained: false
        },
        {
            id: 'spellcraft',
            name: 'Spellcraft',
            ability: 'int',
            isUntrained: false
        },
        {
            id: 'stealth',
            name: 'Stealth',
            ability: 'dex'
        },
        {
            id: 'survival',
            name: 'Survival',
            ability: 'wis'
        },
        {
            id: 'handleAnimal',
            name: 'Handle Animal',
            ability: 'cha'
        },
        {
            id: 'swim',
            name: 'Swim',
            ability: 'str'
        },
        {
            id: 'useMagicDevice',
            name: 'Use Magic Device',
            ability: 'cha',
            isUntrained: false
        }
    ]);
})();;
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
        },

        {
            id: 'halfOrc',
            name: 'Half-Orc',
            abilityMods: {
                wis: 2,
            },
            size: pcg.sizes.get('medium'),
            features:[
                pcg.traits.get('darkvision').clone(),
                pcg.traits.get('intimidating').clone()
            ]
        }


    ]);
})();;
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
            ],
            skillPointsPerLevel: 4,
            hitDice: 12,
        }
    ]);
})();;
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