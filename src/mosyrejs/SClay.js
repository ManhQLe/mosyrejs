'use strict'
const Clay = require('./Clay');
const Conduit = require('./Conduit');
const AttribClay = require('./AttribClay');

class SClay extends AttribClay{
    constructor(agr){
        super(agr);
        this.createProp("layoutMap",[])
        this.createProp("build",(clay)=>{return clay.agreement.layoutMap})
        this.__.map = this.onBuild();
        this.links = [];        
        const map = this.__.map;

        map.forEach(e=>{
            const {ip,connections} = e;
            if(ip)
            {
                let pair = this.links.find(c=>this.isSameConnectionPoint(ip,c.cp))
                if(pair)
                    pair.conduit.link(connections);
                else
                {
                    pair = {cp:ip,link:Conduit.fromArray(connections)}
                    this.links.push(pair);
                }
            }
            else
                Conduit.fromArray(connections)
        })
       
    }

    onCommunication(fromClay,atConnectPoint,signal){
    }

    //<-- Someone wants to connect to me through my point"
    onConnection(withClay,atConnectPoint){      
        let pair = this.links.find(c=>this.isSameConnectionPoint(atConnectPoint,c.cp))
        if(pair){
            pair.link.link([withClay,atConnectPoint])                
        }
    }

    onBuild(){
        return this.build(this);
    }
}

// Enginering building things

/*
    [
        {ip:abc, connections:[clay,point,....]},
        {ip:abc, connections:[clay,point,....]}
    ]
*/

module.exports = SClay;