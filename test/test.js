var assert = require('assert')

var raytopoly = require('../index.js')

function close(x, y) {
	return (x - y) < .01
}

function check(x, y) {
	assert.equal(close(x, y), true)
}


point = [0,0]
angle = 90
lines = [[[-1,1],[1,1],[1,3],[-1,3]],
  [[2, 2], [2, 3]]]
results = raytopoly(point, angle, lines)
check(results.distance, 1)
check(results.angle, -90)
check(results.intesection[0], 0)
check(results.intesection[1], 1)
