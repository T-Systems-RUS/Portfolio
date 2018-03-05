// Pass arguments from test
exports.assertion = function (selector, property, styleValue) {
  // Message to display on test run
  this.message = `Testing if element <${selector}> CSS property "${property}" contains "${styleValue}"`;
  // Expected value to compare
  this.expected = true;
  // Chain methods
  this.pass = value => value === this.expected;
  this.value = result => result.value;
  // Actual logic/command to run
  this.command = callback => {
    const self = this;
    // Function to execute
    return this.api.execute((sel, prop, style) => {
        // Find element
        const element = document.querySelectorAll(sel)[0];
        // Get element style and check if specified contains text
        return window.getComputedStyle(element).getPropertyValue(prop).indexOf(style) >= 0;
      },
      // Pass parameters to function above
      [selector, property, styleValue],
      result => {
        callback.call(self, result);
      }
    );
  };
};
