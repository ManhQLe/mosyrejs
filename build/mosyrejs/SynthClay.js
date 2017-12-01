'use strict'

const PropClay = require("./PropClay");
const Conduit = require("./Conduit");

class SynthClay extends PropClay {
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
        clay?PropClay.connect(withClay,clay,atMedium):1
    }

    onCommunication(fromClay,atMedium,signal){
        const def = this.portDefinition;
        const clay = def[atMedium];
        clay?PropClay.vibrate(clay,atMedium,signal):1;
    }
}

SynthClay.CONST ={
    defaultBuild:function(){
        return {}
    }
}

module.exports = SynthClay;

