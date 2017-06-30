'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    this.args = args || {};
    this.options = options || {};
    this.pkg = require(path.normalize(path.join(__dirname, '../../package.json')));
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the breathtaking ' + chalk.red.bold(this.appname) + ' generator!'
    ));

    const prompts = [{
      name: 'appname',
      message: 'What is your application name?'
    }, {
      name: 'appid',
      message: 'What is your application id (eg: com.yourname.yourapp)?'
    },
    {
      name: 'author',
      message: 'What is your application author\'s name?'
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'Which features do you want to include in your application?',
      choices: [
        {
          name: 'Bootstrap',
          value: 'bootstrap',
          checked: true
        },
        {
          name: 'Font Awesome',
          value: 'fontawesome',
          checked: true
        },
        {
          name: 'Modernizr',
          value: 'modernizr',
          checked: true
        },
        {
          name: 'LESS',
          value: 'less',
          checked: true
        }
      ]
    }];

    return this.prompt(prompts).then(props => {
      this.appname = props.appname;
      this.appid = props.appid;
      this.author = props.author;
      this.features = {
        bootstrap: props.features.indexOf('bootstrap') !== -1,
        fontawesome: props.features.indexOf('fontawesome') !== -1,
        modernizr: props.features.indexOf('modernizr') !== -1,
        less: props.features.indexOf('less') !== -1
      };
    });
  }

  writing() {
    const genFiles = [
      ['app.css', 'css/app.css'],
      ['_README.md', 'README.md'],
      ['_index.html', 'index.html'],
      ['_main.js', 'app/main.js'],
      ['shell.js', 'app/viewmodels/shell.js'],
      ['_home.js', 'app/viewmodels/home.js'],
      ['_shell.html', 'app/views/shell.html'],
      ['_home.html', 'app/views/home.html'],
      ['_gruntfile.js', 'Gruntfile.js'],
      ['_package.json', 'package.json'],
      ['gitignore', '.gitignore'],
      ['gitattributes', '.gitattributes'],
      ['_bower.json', 'bower.json'],
      ['jshintrc', '.jshintrc'],
      ['editorconfig', '.editorconfig']
    ];
    for (var idx = 0, len = genFiles.length; idx < len; idx++) {
      var el = genFiles[idx];
      if (this.features.less) {
        el[0] = el[0].replace(/css$/, 'less');
        el[1] = el[1].replace(/css$/, 'less');
        console.log(el[0], ', ', el[1]);
      }
      if (el[0].indexOf('_') > -1) {
        this.fs.copyTpl(
          this.templatePath(el[0]),
          this.destinationPath(el[1]),
          this
        );
      } else {
        this.fs.copy(
          this.templatePath(el[0]),
          this.destinationPath(el[1])
        );
      }
    }
  }

  install() {
    this.installDependencies({skipInstall: this.options['skip-install']});
  }

  end() {
    this.log('Finishing', chalk.yellow(this.appname), 'installation');
  }
};
