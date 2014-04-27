module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },

    mochaTest: {
      options: {
        reporter: 'spec',
        ui: 'tdd'
      },
      nodejs: ['src/**/*.js', 'test/**/*.js']
    },

    watch: {
      options: {
        nospawn: true
      },
      all: {
        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        tasks: ['test']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask('test', ['newer:jshint', 'mochaTest']);
  grunt.registerTask('publish', ['mochaTest', 'release']);
  grunt.registerTask('default', ['test', 'watch']);
};
