'use strict'

const AttribClay = require("./AttribClay");
const Conduit = require("./Conduit");

class SynthClay extends AttribClay {
    constructor(props) {
        super(props);
        this.createProp("buildfx", SynthClay.CONST.defaultBuild);
        //Building and merging port
        this.contacts = new Map();

        this.__.map = this.buildfx();
        const {
            outward
        } = this.__.map;

        var keys = Object.keys(outward);
        const insiders = this.__.insiders = [];
        keys.forEach(k => {
            const pair = outward[k];
            const sym = {};
            insiders.push(Conduit.link(this,sym,pair[0],pair[1]));
        });
    }

    onConnection(withClay, atConnectionPoint) {
        this.contacts.set(atConnectionPoint, withClay);
    }

    onCommunication(fromClay, atConnectionPoint, signal) {
        const {insiders} = this.__;
        const clay = insiders.find(c=>c===fromClay);
        if(clay){            
        }
    }
}

SynthClay.CONST = {
    defaultBuild: function () {
        return {}
    }
}

//Map of built
x = {
    "inward": {
        "A": ["A", clay],
        "B": ["X", clay2]
    },
    "outward": {
        "D": ["A", clay2]
    }
}



module.exports = SynthClay;