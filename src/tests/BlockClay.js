const {RClay} = require("./../mosyrejs")
const readline = require('readline');

class BlockClay extends RClay{
    constructor(agr){
        super(agr)
        this.connectPoints.push("EXIT")

        readline.emitKeypressEvents(process.stdin);
        process.stdin.on('keypress', () => {
        })
    }

    onResponse(){
        process.exit();
    }    
}

module.exports = BlockClay