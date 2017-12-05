const stdout = process.stdout;
const cur = {
    write(s, x = 0, y = 0) {
      stdout.write("\033"+`[${y};${x}f${s}`)
    },
    clearLine(l=0){
        stdout.write("\033"+`[${l}`+";0f\033[K")
    },
    clear(){
        stdout.write("\033[2J")
    }
}

module.exports = cur;