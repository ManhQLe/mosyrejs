'use strict'

const AttribClay = require("./AttribClay");
const Conduit = require("./Conduit");

class SynthClay extends AttribClay {
    constructor(props) {
        super(props);
        this.createProp("buildfx", SynthClay.CONST.defaultBuild);
        this.contacts = [];
        const builtin = this.__.builtin = this.buildfx();


        builtin.forEach(trinity => {
            const clay = trinity[1];
            const internalPoint = trinity[2];            
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
        
        const {builtin} = this.__;
        const {contacts} = this;
        const trinity = builtin.find(x=>{
            return x[1] === fromClay && this.isSameConnectionPoint(x[2],atConnectionPoint);
        })
        if(trinity){ //From Internal
            const clay = contacts.get(trinity[0]);
            clay && AttribClay.vibrate(clay,trinity[0],sinal,this);
        }
        else{
            builtin.forEach(tri=>{
                this.isSameConnectionPoint(atConnectionPoint,x[0])
                && AttribClay.vibrate(tri[1],tri[2],sinal,this);

            })
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