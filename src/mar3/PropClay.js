'use strict'
const Clay = require('./Clay');

class PropClay extends Clay {
    constructor(props) {
        super(props);
        this.__= {props : props||{}}
    }    
   
    createProp(name, defVal, get, set) {
        PropClay.createProp(this, name, defVal, get, set, this.__.props)
    }

    static createProp(O, name, defVal, getFx, setFx, storage) {
        getFx ? 1 : getFx = PropClay.CONST.defaultGet;
        setFx ? 1 : setFx = PropClay.CONST.defaultSet;

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

PropClay.CONST = {
    defaultGet(name, store, defVal) {
        store.hasOwnProperty(name)||defVal===undefined ? 1 : this[name] = defVal;
        return store[name];
    },
    defaultSet(name, store, val) {
        store[name] = val;
    }
}

module.exports = PropClay;