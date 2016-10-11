var _ = require('lodash')
var raytoline = require('ray-to-line')


function patoline(point, angle, line) {
  var result = raytoline([math.cos(angle)])
  if (result) return {point: [result.point[0] + point[0], result.point[1] + point[1]], distance: result.distance}
  return false
}

module.exports = function (point, angle, lines) {
  // deterimine interesction point of ray with poly by calling ray to line on each polygon segment
  var line
  var results = []
  for (var k = 0; k < lines.length; k++) {
    var poly = lines[k]
    for (var i = 0, j = 1; i < poly.length-1; i++) {
      j = i+1
      line = [[poly[i][0], poly[i][1]], [poly[j][0], poly[j][1]]];
      var hit = raytoline(point, angle, line)
      hit.id = i
      hit.component = k
      if (hit) results.push(hit)
    }
  }

  if (results.length) {
    var ind = _.indexOf(results, _.min(results, function (i) { return i.distance }))
    // if multiple minima, average together angles and return results
    return results[ind]
  }
  return {startPoint: point, distance:Infinity, angle:angle, intersection:point, id:false, component:false};
}



