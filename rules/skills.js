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
            untrained: false
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
            untrained: false
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
            untrained: false
        },
        {
            id: 'knowledgeDungeoneering',
            name: 'Knowledge (dungeoneering)',
            ability: 'int',
            untrained: false
        },
        {
            id: 'knowledgeEngineering',
            name: 'Knowledge (engineering)',
            ability: 'int',
            untrained: false
        },
        {
            id: 'knowledgeGeography',
            name: 'Knowledge (geography)',
            ability: 'int',
            untrained: false
        },
        {
            id: 'knowledgeHistory',
            name: 'Knowledge (history)',
            ability: 'int',
            untrained: false
        },
        {
            id: 'knowledgeLocal',
            name: 'Knowledge (local)',
            ability: 'int',
            untrained: false
        },
        {
            id: 'knowledgeNature',
            name: 'Knowledge (nature)',
            ability: 'int',
            untrained: false
        },
        {
            id: 'knowledgeNobility',
            name: 'Knowledge (nobility)',
            ability: 'int',
            untrained: false
        },
        {
            id: 'knowledgePlanes',
            name: 'Knowledge (planes)',
            ability: 'int',
            untrained: false
        },
        {
            id: 'knowledgeReligion',
            name: 'Knowledge (religion)',
            ability: 'int',
            untrained: false
        },
        {
            id: 'linguistics',
            name: 'Linguistics',
            ability: 'int',
            untrained: false
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
            untrained: false
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
            untrained: false
        },
        {
            id: 'spellcraft',
            name: 'Spellcraft',
            ability: 'int',
            untrained: false
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
            ability: 'Str'
        },
        {
            id: 'useMagicDevice',
            name: 'Use Magic Device',
            ability: 'cha',
            untrained: false
        }
    ]);
})();