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
})();