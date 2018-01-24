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
        let cps =this.contacts[withClay];
        cps || (cps = []);
        if(cps.length >0 && (withClay instanceof Conduit))
            return;
        
        let shouldInclude = true;
        for(let cp of cps){
            if(this.isSameConnectionPoint(cp,atConnectPoint))
            {
                shouldInclude = false;
                break;
            }
        }

        shouldInclude &&
        (
            cps.push(atConnectPoint),
            this.contacts[withClay] = cps
        )
    }

    onCommunication(fromClay, atConnectPoint, signal) {
        let cps = this.contacts[fromClay];        
        if(cps && cps.find(cp=>this.isSameConnectionPoint(cp,atConnectPoint))){
            
            for(let clay in this.contacts)
            {
                console.log(clay.toString())
               if(this.contacts.hasOwnProperty(clay))
               {
                    cps = this.contacts[clay];
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
}


Conduit.link = function (...args) {
    var con = new Conduit();
    for (let x = 0; x < args.length; x += 2) {
        Clay.connect(args[x], con, args[x + 1])
    }
    return con;
}

module.exports = Conduit;