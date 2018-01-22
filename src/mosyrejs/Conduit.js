'use strict'
const Clay = require('./Clay')
const AttribClay = require('./AttribClay')

class Conduit extends AttribClay {
    constructor(agreement) {
        super(agreement)
        this.contacts = new Map();
    }

    onConnection(withClay, atConnectPoint) {
        let cps =this.contacts.get(withClay);
        cps || (cps = []);
        if(cps.length >0 && (withClay instanceof Conduit))
            return;
        
        let shouldInclude = true;
        for(cp of cps){
            if(this.isSameConnectionPoint(cp,atConnectPoint))
            {
                shouldInclude = false;
                break;
            }
        }

        shouldInclude &&
        (
            cps.Add(atConnectPoint),
            this.contacts.set(withClay,cps)
        )
    }

    onCommunication(fromClay, atConnectPoint, signal) {
        const cps = this.contacts.get(atConnectPoint);
        if(cps && cps.find(cp=>this.isSameConnectionPoint(cp,atConnectPoint))){
            this.contacts.forEach((cps,clay)=>{

                cps.forEach((cp)=>{
                    if(!this.isSameConnectionPoint(cp,atConnectPoint) || clay!==fromClay)
                    {
                        setTimeout(()=>{},)
                    }
                })

            })
        }
    }
}

Conduit.link = function (clay1, p1, p2, clay2) {
    var con = new Conduit();
    Clay.connect(clay1, con, p1);
    (p2 && clay2) ? Clay.connect(clay2, con, p2): 1;
    return con;
}

Conduit.multiLink = function (...args) {
    var con = new Conduit();
    for (let x = 0; x < args.length; x += 2) {
        Clay.connect(args[x], con, args[x + 1])
    }
    return con;
}

module.exports = Conduit;