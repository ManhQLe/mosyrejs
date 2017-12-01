'use strict'

const AttribClay = require("./AttribClay");
const Conduit = require("./Conduit");

class SynthClay extends AttribClay {
    constructor(props){
        super(props);        
        this.createProp("portDefinition",{})
        this.createProp("buildfx",SynthClay.CONST.defaultBuild);

        //Building and merging port
        var def = this.buildfx();
        const {inPorts} = this;
        Object.assign(inPorts,this.buildfx());
    }

    onConnection(withClay,atMedium){
        const def = this.portDefinition;
        const clay = def[atMedium];
        clay?AttribClay.connect(withClay,clay,atMedium):1
    }

    onCommunication(fromClay,atMedium,signal){
        const def = this.portDefinition;
        const clay = def[atMedium];
        clay?AttribClay.vibrate(clay,atMedium,signal):1;
    }
}

SynthClay.CONST ={
    defaultBuild:function(){
        return {}
    }
}

module.exports = SynthClay;

