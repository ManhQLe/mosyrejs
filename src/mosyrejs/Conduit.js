'use strict'
const Clay = require('./Clay')
const AttribClay = require('./AttribClay')

class Conduit extends AttribClay {
    constructor(agreement) {
        super(agreement)
        this.contacts = [];
        this.createProp("ParallelTrx",true);
    }

    onConnection(withClay, atConnectPoint) {
        let pair =this.contacts.find(({clay})=>withClay === clay);

        pair || (pair={clay:null,cps:[]},this.contacts.push(pair))
        const {clay,cps} = pair;
        
        if((withClay instanceof Conduit))
            return;
        
        let shouldInclude = true;
        for(let cp of cps){
            if(this.isSameConnectionPoint(cp,atConnectPoint))
            {
                shouldInclude = false;
                break;
            }
        }

        shouldInclude && (pair.clay = withClay, cps.push(atConnectPoint))
    }

    onCommunication(fromClay, atConnectPoint, signal) {        
        const pair = this.contacts.find(({clay})=>clay===fromClay);        

        if(pair && pair.cps.find(cp=>this.isSameConnectionPoint(cp,atConnectPoint))){
            
            for(let contact of this.contacts)
            {
                const {cps,clay} = contact;

                cps.forEach((cp)=>{
                    if(!this.isSameConnectionPoint(cp,atConnectPoint) || clay!==fromClay)
                    {                        
                        this.ParallelTrx?
                        setTimeout(clay,clay.onCommunication,0,this,cp,signal)
                        :clay.onCommunication(this,cp,signal);

                    }
                })
                
            }
        }
    }
}


Conduit.link = function (...args) {
    var con = new Conduit();
    for (let x = 0; x < args.length; x += 2) {
        Clay.connect(args[x], con, args[x + 1])
    }
    return con;
}

module.exports = Conduit;