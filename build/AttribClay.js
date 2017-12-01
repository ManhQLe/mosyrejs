'use strict'
const Clay = require('./Clay');

class AttribClay extends Clay {
    constructor(agreement) {
        super(agreement);
        this.__= {
            agreement : agreement||{},
            contacts:null,
        }        
        
        this.createProp("agreement", undefined, 
        AttribClay.CONST.defaultGet,
        AttribClay.CONST.defaultSet,
        this.__)

        this.createProp("contacts",undefined,
        AttribClay.CONST.defaultGet,
        AttribClay.CONST.defaultSet,
        this.__)
    }    
    
    createProp(name, defVal, get, set, store = this.__.agreement) {
        AttribClay.createProp(this, name, defVal, get, set, store);
    }

    
    isSameConnectionPoint(a,b){
        return a===b;
    }

    static createProp(O, name, defVal, getFx, setFx, storage) {
        getFx ? 1 : getFx = AttribClay.CONST.defaultGet;
        setFx ? 1 : setFx = AttribClay.CONST.defaultSet;

        Object.defineProperty(O, name, {
            get: function () {
                return getFx.call(this, name, storage, defVal);
            },
            set: function (val) {
                setFx.call(this, name, storage, val)
            }
        })
    }
}

AttribClay.CONST = {
    noSet(){},
    defaultGet(name, store, defVal) {
        //store.hasOwnProperty(name)||defVal===undefined ? 1 : this[name] = defVal;
        !(store.hasOwnProperty(name)||defVal===undefined) && (this[name] = defVal);
        return store[name];
    },
    defaultSet(name, store, val) {
        store[name] = val;
    }
}

module.exports = AttribClay;