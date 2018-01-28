'use strict'
const Clay = require('./Clay');
const AttribClay = require('./AttribClay');

class SClay extends AttribClay{
    constructor(agr){
        super(agr);
        this.createProp("layoutMap",[])
        this.createProp("build",(clay)=>{return clay.agreement.layoutMap})
        
    }

    onCommunication(fromClay,atConnectionPoint,signal){

    }

    onConnection(withClay,atConnectionPoint){

    }

    onBuild(){
        return this.build();
    }
}

// Enginering building things

/* 
    [Me,S1 ------- Clay,Port]
    [Me,S2 --------Clay,Port]
*/

