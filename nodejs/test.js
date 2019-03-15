const assert = require('assert')
const fs = require('fs')

describe('加法函数的测试', function() {
  it('add test', function(done) {
    assert.equal(fs.readFile('./test.js', () => {
        console.log('111');
    }), 111)
  });

});



function add(x, y) {
    return x + y
}