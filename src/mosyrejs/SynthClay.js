'use strict'

const AttribClay = require("./AttribClay");
const Conduit = require("./Conduit");

class SynthClay extends AttribClay {
    constructor(props) {
        super(props);
        this.createProp("buildfx", SynthClay.CONST.defaultBuild);
        this.contacts = [];
        const builtin = this.__.builtin = this.buildfx();


        builtin.forEach(triple => {
            const clay = triple[1];
            const internalPoint = triple[2];            
            AttribClay.connect(this,clay,internalPoint);            
        });
        
    }

    onConnection(withClay, atConnectionPoint) {
        const contacts = this.contacts;
        const r = contacts.find(x=>{
            return this.isSameConnectionPoint(x[0],atConnectionPoint)
            && x[1] === withClay
        })
        !r&&contacts.push([atConnectionPoint,withClay]);

    }

    onCommunication(fromClay, atConnectionPoint, signal) {
        //Does it come from inside;
        const {builtin} = this.__;
        const pair = builtin.find(x=>{
            return x[1] === fromClay
        })
        if(pair){ //From Intenral
            
        }
    }
}

SynthClay.CONST = {
    defaultBuild: function () {
        return {}
    }
}

//Map of built
// x = {
//     ["A", clay  ,"X"],
//     ["B", clay2 ,"Y"],
//     ["D", clay2 ,"B"]
// }



module.exports = SynthClay;