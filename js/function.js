TestFunction = function(prop1, prop2) {
  this.prop1 = prop1;
  this.prop2 = prop2;
}

TestFunction.prototype.testPrototype = function() {
  return this.prop1 + this.prop2;
}

module.exports = TestFunction;
