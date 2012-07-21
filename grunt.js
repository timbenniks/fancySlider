/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:fancySlider.jquery.json>',
    meta: {
      banner: 
        '/*!\n' +
		'*	@Class:			<%= pkg.title || pkg.name %>\n'+
		'*	@Version:		<%= pkg.version %>\n'+
		'*	@Created on:	<%= grunt.template.today("yyyy-mm-dd") %>\n'+
		'*	@Description:	<%= pkg.description %>\n'+
		'*	@Author:		<%= pkg.author.name %>\n'+
		'*	@Licence:		<%= _.pluck(pkg.licenses, "type").join(", ") %>\n'+
		'*	@Project page:	<%= pkg.homepage %>\n'+
		' ---------------------------------------------------------------------------- */'
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.<%= pkg.version %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.<%= pkg.version %>.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');

};
