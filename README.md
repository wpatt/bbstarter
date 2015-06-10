# bbstarter
Starter for a Drupal backbone app

Blog post: [https://echo.co/blog/getting-started-backbone-js-and-restws-drupal-7](https://echo.co/blog/getting-started-backbone-js-and-restws-drupal-7)

This is a starter module for providing a backbone app as a page in Drupal. It depends on another custom module to provide the Libraries API integration. See [restws_settings](https://github.com/wpatt/restws_settings).

## Install

1. First make sure you have node and the grunt-cli installed.
2. Then clone this repo in your modules directory.
3. Then run `npm install`.

## File structure

```
app/                source files
  css/
  js/
    models/         backbone models, each as it's own file
    collections/    backbone collections
    views/          backbone views
      app.view.js   master view
    app.js          defines the namespace and overrides Backbone methods
    bbstarter.js    kick-starts the app on document.ready
    
build/              files built by grunt
  css/
  js/
    app.min.js      all the backbone js minified
    app.min.js.map  a map file
    bbstarter.js    just copied :/
```

This starter module is mostly useful for the Gruntfile. Having a build process allows each Backbone "class" to be kept in it's own file. Grunt will then concatenate those files, wrap them in an anonymous function `(function($){...})(jQuery);`, and minify. It also creats a map file :)
