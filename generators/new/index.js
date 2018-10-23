"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the classy ${chalk.red("generator-next-rails")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "projectName",
        message: "Your project name"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.destinationRoot(props.projectName);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      { projectName: this.props.projectName }
    );
    this.fs.copy(this.templatePath("config"), this.destinationPath(""));
    this.fs.copy(this.templatePath("src"), this.destinationPath("src"));
    this.fs.copy(this.templatePath("server"), this.destinationPath("server"));
    this.fs.copyTpl(this.templatePath("pages"), this.destinationPath("pages"), {
      projectName: this.props.projectName
    });
  }

  install() {
    this.log(
      `${chalk.yellow.bold("Installing dependencies. Grab a coffee!!!")}`
    );
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
    this.log(`${chalk.green.bold("Have fun with the project")}`);
  }
};
