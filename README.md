# YHTML5-CLI 

![npm version] ![node version] ![Build Status] ![downloads total] ![author]

CLI for scaffolding front-end projects based on the create-react-app project.

### Installation

Prerequisites: [Node.js](https://nodejs.org/en/) (>=4.x, 7.x preferred) and [Git](https://git-scm.com/).

``` bash
$ npm install -g yhtml5-cli
```

### Usage

``` bash
$ yhtml5 init <project-name>
```

Example:

``` bash
$ yhtml5 init my-project
```

The above command pulls the template from [YHTML5 template][YHTML5-Seed-apps] , prompts for some information, and generates the project at `./my-project/`.

### Official Templates

The purpose of official project templates are to provide opinionated, 
battery-included development tooling setups so that users can get started with actual app code as fast as possible. 
However, these templates are un-opinionated in terms of how you structure your app code and what libraries you use in addition to [YHTML5 template][YHTML5-Seed-apps].

All official project templates are repos in the [YHTML5-Seed]. 
When a new template is added to the organization, you will be able to run `vue init <template-name> <project-name>` to use that template. 
You can also run `yhtml5 list` to see all available official templates.

Current available templates include:

- [react][YHTML5-Seed-react] - A full-featured Webpack + React setup with hot reload, code splitting & lazy loading.

### question

* npm link fail
```
File exists: /Users/path
npm ERR! Move it away, and try again.

rm -rf /Users/path
npm link
```

### Thank

The inspiration for this project comes from [vue-cli](https://github.com/vuejs/vue-cli)

### License

[MIT](http://opensource.org/licenses/MIT)

[author]:https://img.shields.io/badge/author-yhtml5-blue.svg
[Build Status]:https://img.shields.io/circleci/project/vuejs/vue-cli/master.svg
[downloads total]:https://img.shields.io/github/downloads/atom/atom/total.svg
[npm version]:https://img.shields.io/badge/npm-v4.2.0-blue.svg
[node version]:https://img.shields.io/badge/node-v7.8.0-blue.svg

[YHTML5-Seed-apps]:https://github.com/yhtml5/YHTML5-Seed/tree/master/apps
[YHTML5-Seed-react]:https://github.com/yhtml5/YHTML5-Seed/tree/master/apps/react
[YHTML5-Seed]:https://github.com/yhtml5/YHTML5-Seed
[create-react-app]:https://github.com/facebookincubator/create-react-app
