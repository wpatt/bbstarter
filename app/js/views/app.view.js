
// App View
// --------

bbs.appView = Backbone.View.extend({
  el: document.getElementById('bbstarter'),
  template: _.template( $('#nodeView').html() ),

  initialize: function(options) {

    this.listenTo(this.collection, 'reset', this.renderAll);

    // Kick-off the rendering process by fetching the nodes from the server.
    // Functions listening to the "reset" event will respond.
    this.collection.fetch({
      reset: true,
      collection: this.collection
    });

  },

  renderAll: function() {
    var ul = $('<ul></ul>');
    this.collection.each(function(node) {
      ul.append( this.template(node.attributes) );
    }, this);
    this.$el.html( ul );
  }

});