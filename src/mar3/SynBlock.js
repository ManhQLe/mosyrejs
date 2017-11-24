'use strict'

const Clay = require("./PropClay");
const Conduit = require("./Conduit");

class SynBlock extends PropClay {
    constructor(props){
        super(props);        
        this.createProp("portDefinition",{})
        this.createProp("buildfx",SynBlock.CONST.defaultBuild);

        //Building and merging port
        var def = this.buildfx();
        const {inPorts} = this;
        Object.assign(inPorts,this.buildfx);
    }

    onConnection(withClay,atMedium){
        const def = this.inPorts;
        const clay = 1;
    }

    onCommunication(fromClay,atMedium,signal){

    }
}

SynBlock.CONST ={
    defaultBuild:function(){
        return {}
    }
}

module.exports = SynBlock;

