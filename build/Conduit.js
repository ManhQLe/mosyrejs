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
        if(withClay === this)
            return;

        let pair =this.contacts.find(({clay})=>withClay === clay);

        if(pair && (withClay instanceof Conduit))
            return;

        pair || (pair={clay:withClay,cps:[]},this.contacts.push(pair))
        const {cps} = pair;
        
        
        
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
                        setTimeout(Clay.vibrate,0,clay,cp,signal,this)                        
                        :clay.onCommunication(this,cp,signal);                        
                    }
                })
                
            }
        }
    }

    link(array){
        for(let x = 0;x<array.length;x+=2){
            Clay.connect(array[x],this,array[x+1]);
        }
        return this;
    }
}


Conduit.createLink = function (...args) {
    var con = new Conduit();
    return con.link(args);
}

Conduit.link = function(A,pA,pB,B){
    return Conduit.fromArray([A,pA,B,pB])
}

Conduit.fromArray = function(array){
    var con = new Conduit();
    return con.link(array);
}

module.exports = Conduit;