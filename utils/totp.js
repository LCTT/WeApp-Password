function generateCode(o) {
    function e(o) {
        function e(o, e) {
            return o << e | o >>> 32 - e
        }
        function r(o) {
            var r = e(g, 5) + l + C + p + s[o];
            C = v,
            v = d,
            d = e(i, 30),
            i = g,
            g = r
        }
        var t = o.length,
        n = o.concat([1 << 31]),
        f = 1732584193,
        h = 2290649224,
        a = 271733878,
        u = a ^ h,
        c = 3285377520;
        h ^= f;
        do n.push(0);
        while (n.length + 1 & 15);
        for (n.push(32 * t); n.length;) {
            for (var l, p, s = n.splice(0, 16), g = f, i = h, d = u, v = a, C = c, M = 12; ++M < 77;) s.push(e(s[M] ^ s[M - 5] ^ s[M - 11] ^ s[M - 13], 1));
            for (p = 1518500249, M = 0; 20 > M; r(M++)) l = i & d | ~i & v;
            for (p = 1859775393; 40 > M; r(M++)) l = i ^ d ^ v;
            for (p = 2400959708; 60 > M; r(M++)) l = i & d | i & v | d & v;
            for (p = 3395469782; 80 > M; r(M++)) l = i ^ d ^ v;
            f += g,
            h += i,
            u += d,
            a += v,
            c += C
        }
        return [f, h, u, a, c]
    }
    for (var r = Math.floor((new Date).getTime() / 1e3), t = Math.floor(r / 30), n = [], f = [], h = 0, a = 0, u = 0; h < o.length;) u = 32 * u + "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".indexOf(o.charAt(h++).toUpperCase()),
    (a += 5) > 31 && (n.push(Math.floor(u / (1 << (a -= 32)))), u &= 31);
    for (a && n.push(u << 32 - a), h = 0; 16 > h; ++h) f.push(1785358954 ^ (n[h] = 1549556828 ^ n[h]));
    var c = e(n.concat(e(f.concat([0, t])))),
    l = 15 & c[4];
    return ((c[l >> 2] << 8 * (3 & l) | (3 & l ? c[(l >> 2) + 1] >>> 8 * (4 - l & 3) : 0)) & -1 >>> 1) % 1e6
}
function getCode(o){
    var code = generateCode(o).toString();
    if(code.length == 5){
        
        code = '0'+code;
    }
    if(code.length == 4){
        code = '00' + code;
    }
    code = code.substr(0,3)+' '+code.substr(3,6)
    return code;
}
module.exports.getCode = getCode;