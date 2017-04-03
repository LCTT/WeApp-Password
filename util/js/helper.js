function  inArray(needle, haystack) {
    /**
     * inArray 源自 Jquey
     */
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i].secret == needle) return true;
    }
    return false;
  }
function toRad(d) {  return d * Math.PI / 180; }
function getDisance(lat1, lng1, lat2, lng2) {

    var dis = 0;
    var radLat1 = toRad(lat1);
    var radLat2 = toRad(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = toRad(lng1) - toRad(lng2);
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return parseInt(dis * 6378137);
}

module.exports = {
    inArray:inArray,
    getDisance:getDisance
}