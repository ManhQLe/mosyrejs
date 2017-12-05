const Clay = require('./Clay');

class UniflowClay extends Clay {
    constructor(agreement) {
        super(agreement);
        this.__ = {
            IN:[],
            OUT:[]
        }
        
    }

    onConnection(withClay, atConnectPoint) {
        if (atConnectPoint !== "IN" || atConnectPoint !== "OUT")
            throw "Only accept IN or OUT"
        const {IN,OUT} = this.__;

        atConnectPoint==="IN" && !IN.find(x=>x === withClay) &&IN.push(withClay);
        atConnectPoint==="OUT" && !OUT.find(x=>x === withClay) && OUT.push(withClay);
    }

    onCommunication(fromClay, atConnectPoint, signal){
        var clay;
        atConnectPoint==="IN"
        &&(clay = this.IN.find(x=>x===fromClay))
        &&this.__.OUT.forEach(toClay => {
            Clay.vibrate(toClay,"OUT")
        });
    }
}

export default UniflowClay;
