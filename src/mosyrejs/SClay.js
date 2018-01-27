'use strict'
const Clay = require('./Clay');
const AttribClay = require('./AttribClay');

class SClay extends AttribClay{
    constructor(agr){
        super(agr);
        this.createProp("build",(clay)=>{})
    }

    onCommunication(fromClay,atConnectionPoint,signal){

    }

    onConnection(withClay,atConnectionPoint){

    }

    onBuild(){
        return this.build();
    }
}

// Enginering things