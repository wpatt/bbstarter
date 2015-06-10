
var bbs = bbs || {};

(function($){

  // this is the actual logic that is run on document.ready
  Drupal.behaviors.bbs = {
    attach: function (context, settings) {
      if(context != document) return;

      var nodes = new bbs.NodeCollection();

      Drupal.bbs = new bbs.appView({
        collection: nodes
      });
    }
  };

})(jQuery);
