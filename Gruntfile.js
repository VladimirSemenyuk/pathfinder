module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';\n'
            },
            index: {
                src: ['app/**/*.js'],
                dest: 'dist/index.js'
            },
            config: {
                src: [
                    'rules/config.js',
                    'rules/sizes.js',
                    'rules/features.js',
                    'rules/races.js',
                    'rules/classes.js',
                    'rules/levels.js'
                ],
                dest: 'dist/rules.js'
            }
        },

        copy: {
            dist: {
                files: [
                    // includes files within path
                    {expand: true, flatten: true, src: ['conf/config.js'], dest: 'dist/', filter: 'isFile'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('insert-templates', function() {
        var content = grunt.file.read('dist/index.js'),
            placeholders = content.match(/\<\%([^\<\>\%]+)\%\>/g),
            templates = [];

        for (var i = 0; i < placeholders.length; i++) {
            var fileName = placeholders[i].slice(2, -2),
                file = grunt.file.read('app/templates/'+fileName+'.template.html');

            if (file) {
                content = content.replace(placeholders[i], file.replace(/\n/g, '').replace(/\>\s+\</gm, '><'));
            }
        }

        grunt.file.write('dist/index.js', content);
    });

    grunt.registerTask('default', [
        'concat',
        'insert-templates'
        //'copy'
    ]);

};