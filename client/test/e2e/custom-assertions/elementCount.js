exports.assertion = function (selector, count) {
  this.message = `Testing if element <${selector}>  has count: ${count}`;
  this.expected = count;
  this.pass = value => value === this.expected;
  this.value = result => result.value;

  this.command = callback => {
    const self = this;
    return this.api.execute(sel => document.querySelectorAll(sel).length,
      [selector],
      result => {
        callback.call(self, result);
      }
    );
  };
};
