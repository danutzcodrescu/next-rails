"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: "input",
        name: "model",
        message: "Name your model"
      },
      {
        type: "input",
        name: "properties",
        message: "list of properties (comma separated)"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = {
        ...props,
        properties: props.properties.split(","),
        modelClass: props.model.charAt(0).toUpperCase() + props.model.slice(1)
      };
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("service.ts"),
      this.destinationPath(`src/services/${this.props.model}.service.ts`),
      {
        model: this.props.model,
        modelClass: this.props.modelClass,
        properties: this.props.properties
      }
    );
    this.fs.copyTpl(
      this.templatePath("model.ts"),
      this.destinationPath(`src/models/${this.props.modelClass}.model.ts`),
      {
        model: this.props.model,
        modelClass: this.props.modelClass,
        properties: this.props.properties
      }
    );
    this.fs.copyTpl(
      this.templatePath("page.edit.tsx"),
      this.destinationPath(`pages/${this.props.model}.edit.tsx`),
      {
        model: this.props.model,
        modelClass: this.props.modelClass,
        properties: this.props.properties
      }
    );
    this.fs.copyTpl(
      this.templatePath("page.list.tsx"),
      this.destinationPath(`pages/${this.props.model}s.tsx`),
      {
        model: this.props.model,
        modelClass: this.props.modelClass,
        properties: this.props.properties
      }
    );
    this.fs.copyTpl(
      this.templatePath("page.view.tsx"),
      this.destinationPath(`pages/${this.props.model}.tsx`),
      {
        model: this.props.model,
        modelClass: this.props.modelClass,
        properties: this.props.properties
      }
    );
  }
};
