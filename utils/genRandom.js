export function genRandom() {
    var id = ""
    var i;
    for (i = 0; i < 6; i++) {
        if (i == 0) {
            id += (String(Math.floor(Math.random() * 9) + 1))
        }
        else {
            id += String(Math.floor(Math.random() * 10))
        }
    }
    return id
}