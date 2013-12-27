'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var EgzpoGenerator = module.exports = function EgzpoGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  var skipMessage = options['skip-install-message'];
  var skipInstall = options['skip-install'];

  this.on('end', function () {
    this.installDependencies({
      skipInstall: skipInstall,
      skipMessage: skipMessage
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(EgzpoGenerator, yeoman.generators.Base);

EgzpoGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  console.log(this.yeoman);
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Normalize and Typeplate.');

  var prompts = [{
    name: 'userName',
    message: 'What is your GitHub username?'
  },
  {
    name: 'themeName',
    message: 'What do you want to call your theme?',
    default: 'eGzpo'
  }, {
    type: 'confirm',
    name: 'includeModernizr',
    message: 'Would you like to include Modernizr?',
    default: true
  }, {
    type: 'confirm',
    name: 'includePlato',
    message: 'Would you like to include Plato?',
    default: true
  }, {
    type: 'confirm',
    name: 'includeLogo',
    message: 'Would you like to support rel=logo?',
    default: true
  }, {
    type: 'confirm',
    name: 'includeHumans',
    message: 'Would you like to include humans.txt?',
    default: true
  }, {
    type: 'confirm',
    name: 'windows',
    message: 'Are you using a VM on Windows?',
    default: true
  }];

  this.prompt(prompts, function (props) {

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.userName = props.userName;
    this.themeName = props.themeName;
    this.includeModernizr = props.includeModernizr;
    this.includePlato = props.includePlato;
    this.includeLogo = props.includeLogo;
    this.includeHumans = props.includeHumans;
    this.windows = props.windows;

    cb();
  }.bind(this));
};

EgzpoGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

EgzpoGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

EgzpoGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
};

EgzpoGenerator.prototype.md = function md() {
  this.copy('README.md', 'README.md');
  this.copy('TODO.md', 'TODO.md');
};

EgzpoGenerator.prototype.bower = function bower() {
  this.copy('_bower.json', 'bower.json');
};

EgzpoGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

EgzpoGenerator.prototype.csslint = function csslint() {
  this.copy('csslintrc', '.csslintrc');
};

EgzpoGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

EgzpoGenerator.prototype.travis = function travis() {
  this.copy('travis.yml', '.travis.yml');
};

EgzpoGenerator.prototype.assets = function assets() {
  this.mkdir('app/assets');
  this.mkdir('app/assets/img');
  this.mkdir('app/assets/img/favicons');
  this.mkdir('app/assets/img/icons');
  this.mkdir('app/assets/js');
  if (this.includeLogo) {
    this.copy('logo.svg', 'app/assets/img/logo.svg');
  }
  this.copy('main.js', 'app/assets/js/main.js');
};

EgzpoGenerator.prototype.lang = function lang() {
  this.directory('lang', 'app/lang');
};

EgzpoGenerator.prototype.lib = function lib() {
  this.directory('lib', 'app/lib');
};

EgzpoGenerator.prototype.sass = function sass() {
  this.directory('sass', 'app/sass');
};

EgzpoGenerator.prototype.templates = function templates() {
  this.directory('templates', 'app/templates');
};

EgzpoGenerator.prototype.templates = function templates() {
  this.directory('templates', 'app/templates');
};

EgzpoGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.copy('404.php', 'app/404.php');
  this.copy('base.php', 'app/base.php');
  this.copy('functions.php', 'app/functions.php');
  if (this.includeHumans) {
    this.copy('humans.txt', 'app/humans.txt');
  }
  this.copy('index.php', 'app/index.php');
  this.copy('page.php', 'app/page.php');
  this.copy('screenshot.png', 'app/screenshot.png');
  this.copy('single.php', 'app/single.php');
  this.copy('style.css', 'app/style.css');
  this.copy('template-custom.php', 'app/template-custom.php');
};