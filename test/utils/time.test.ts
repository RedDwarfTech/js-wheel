import mocha from 'mocha'
var expect = require('chai').expect;

mocha.setup('bdd');

describe('Add', function() {
  it('1 + 1', async function() {
    expect(1+ 1).to.be.equal(2);
  });
});

mocha.run();