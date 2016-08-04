var Tree = function(value) {
  var newTree = {};
  newTree.value = value;
  newTree.parent = null;
  newTree.children = [];
  return _.extend(newTree, treeMethods);
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var newTree = Tree(value);
  newTree.parent = this;
  this.children.push(newTree);
};

treeMethods.contains = function(target) {
  return this.find(this, target);
};

treeMethods.find = function(node, target) {
  var result = false;
  node.children.forEach(function(child) {
    if (child.value === target) {
      result = true;
    } else {
      if (!result) {
        result = treeMethods.find(child, target);
      }
    }
  });
  return result;
};

treeMethods.removeFromParent = function() {
  this.parent.children.splice(this.parent.children.indexOf(this), 1);
  this.parent = null;
  return this;
};

treeMethods.traverse = function(cb) {
  cb(this.value);
  if (this.children.length) {
    this.children.forEach(function (child) {
      child.traverse(cb);
    });
  }
};