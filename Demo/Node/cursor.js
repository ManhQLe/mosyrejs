const stdout = process.stdout;
const cur = {
    write(s, x, y) {
        stdout.write("\033"+`[${y};${x}f${s}`)
    },
    clearLine(l){
        stdout.write((l!==undefined?"\033["+l+";0f":"")+"\033[K")
    },
    clear(){
        stdout.write("\033[2J")
    }
}

module.exports = cur;