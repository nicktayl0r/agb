# Project Editor

## Description

Project Editor is a suite of tools used to manage project configuration data and create project content files.

## Project Structure

This project has has two main parts.

### grapes-plugin

"grapes-plugin" (aka Grapes) is a plugin written to modify the [Grapes HTML Editor](https://grapesjs.com/). We've made modifications to:

- Preview our Case-Vue-App components
- Configure our Case-Vue-App components
- Customizing "Blocks"
- Easy access to project assets

### project_editor

"project_editor" is a collection of html pages with included wysiwig JSON editors for editing project configuration files. It primarily:

- Edits project data
- Edits rubrique data
- Edits project-wide blocks to use in Grapes.
- Uploads rubrique information to dev, stage, and prod environments

## Development

### Getting Started

Developing locally requires a few startup commands so files are in the right location.

`yarn install` will run yarn in both sides of the project.

`yarn build:all` will build in both sides of the project. This is required for certain files to be findable by webpack.

After these steps you can `yarn start` in either folder.

### grapes-plugin development

After the steps above, `yarn start` will build and launch local copy of of the plugin and load the Grapes editor.

> It's important to note that certain functionality (editing widget props, asset manager, project defined blocks) will not work alone. To see this functionality start up a case project in parallel. Refreshing your Grapes development tab will initiate detecting the other project.

> Even with running a case project in parallel, some assets will not load correctly due to pathing differences between the grapes-plugin webserver and the separate case project web server.

### project_editor development

After the steps above, `yarn start` will build and launch a local copy of an empty editor.

> Running a case project in parallel will automatically load the project data in the editor.

## Building

`yarn build:all` from the root directory will build in both sides of the project to the /dist directory. More build options are availble in project.json.

`yarn build` from the grapes-plugin or project_editor directory will build those individually.

# Publishing

This code is used within the local_api submodule of our case project.

To publish just...wip
