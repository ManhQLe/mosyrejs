'use strict'

const AttribClay = require("./AttribClay");
const Conduit = require("./Conduit");

class SynthClay extends AttribClay {
    constructor(props) {
        super(props);
        this.createProp("buildfx", SynthClay.CONST.defaultBuild);
        this.contacts = [];
        const builtin = this.__.builtin = this.build();


        builtin.forEach(trinity => {
            const clay = trinity[1];
            const internalPoint = trinity[2];            
            AttribClay.connect(this,clay,internalPoint);            
        });
        
    }

    build(){
        return this.buildfx();
    }

    onConnection(withClay, atConnectionPoint) {
        const contacts = this.contacts;
        const r = contacts.find(x=>{
            return this.isSameConnectionPoint(x[0],atConnectionPoint)
            && x[1] === withClay
        })
        !r&&contacts.push([withClay,atConnectionPoint]);

    }

    onCommunication(fromClay, atConnectionPoint, signal) {
        //fromClay can be from in or out

        const {builtin} = this.__;
        const {contacts} = this;
        const trinity = builtin.find(x=>{
            return x[1] === fromClay && this.isSameConnectionPoint(x[2],atConnectionPoint);
        })
        if(trinity){ //From Internal radiates outward
            const [outPoint,inClay] = trinity;
            const pairs = contacts.filter(c=>
                this.isSameConnectionPoint(c[1],outPoint)                
                &&AttribClay.vibrate(c[0],outPoint,signal,this)
            );
      
        }
        else{
            builtin.forEach(tri=>{
                this.isSameConnectionPoint(atConnectionPoint,tri[0])
                && tri[1]!==fromClay
                && AttribClay.vibrate(tri[1],tri[2],signal,this);

            })
        }
    }
}

SynthClay.CONST = {
    defaultBuild: function () {
        return []
    }
}

//Map of built
// x = {
//     ["A", clay  ,"X"],
//     ["B", clay2 ,"Y"],
//     ["D", clay2 ,"B"]
// }



module.exports = SynthClay;