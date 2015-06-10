
// Collection of nodes
// -------------------

bbs.NodeCollection = Backbone.Collection.extend({
  model: bbs.Node,

  url: '/node.json',

  parse: function (response) {
    return response.list;
  }

});