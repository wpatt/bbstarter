// app.js
//
// Namespace definition and "global" properties

window.bbs = window.bbs || {};

// @see https://lostechies.com/derickbailey/2012/04/03/revisiting-the-backbone-event-aggregator-lessons-learned/
bbs.vent = _.extend({}, Backbone.Events);

/* // DEBUG

bbs.done = function(data, textStatus, jqXHR) {
  console.log('jqXHR::done()');
};

bbs.fail = function(jqXHR, textStatus, errorThrown){
  console.log('jqXHR::fail()');
  console.log(textStatus + ' ' + errorThrown);
  if (jqXHR.responseText[0] == '[' || jqXHR.responseText[0] == '{') {
    console.log( JSON.parse(jqXHR.responseText) );
  }
  else {
    console.log(jqXHR.responseText);
  }
};

$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
  jqXHR.done(bbs.done).fail(bbs.fail);
});

// */

var ENTER_KEY = 13,
    TAB_KEY = 9,
    CSRF_TOKEN = $('meta[name=x-csrf-token]').attr('content') || null;

// make sure that backbone submits with our CSRF token
var oldSync = Backbone.sync;
Backbone.sync = function(method, model, options){
  var options = options || {};
  var oldBeforeSend = options.beforeSend || $.noop;

  options.beforeSend = function(xhr){
    xhr.setRequestHeader('X_CSRF_TOKEN', CSRF_TOKEN);
    oldBeforeSend(xhr);
  };

  // restws doesn't support PATCH
  if (method === 'patch') options.type = 'PUT';

  return oldSync(method, model, options);
};
