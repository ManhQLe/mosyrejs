'use strict'

const AttribClay = require("./AttribClay");
const Conduit = require("./Conduit");

class SynthClay extends AttribClay {
    constructor(props){
        super(props);                                    
        this.createProp("buildfx",SynthClay.CONST.defaultBuild)
        this.contacts = new Map();
    }
    
    

    onConnection(withClay,atConnectionPoint){
        
    }

    onCommunication(withClay,atConnectionPoint,signal){
        
    }
}

SynthClay.CONST ={
    defaultBuild:function(){
        return {}
    },
    CrystalizationProces:function(){
        
    }
}

module.exports = SynthClay;

