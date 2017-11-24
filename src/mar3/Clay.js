'use strict'

class Clay {
    constructor(props) {
        this.__= {props : props||{}}
    }    
   
    onCommunication(fromClay, atMedium, signal) {}

    onConnection(withClay,atMedium){}

    createProp(name, defVal, get, set) {
        Clay.createProp(this, name, defVal, get, set, this.__.props)
    }

    static createProp(O, name, defVal, getFx, setFx, storage) {
        getFx ? 1 : getFx = Clay.CONST.defaultGet;
        setFx ? 1 : setFx = Clay.CONST.defaultSet;

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

Clay.CONST = {
    defaultGet(name, store, defVal) {
        store.hasOwnProperty(name)||defVal===undefined ? 1 : this[name] = defVal;
        return store[name];
    },
    defaultSet(name, store, val) {
        store[name] = val;
    }
}

module.exports = Clay;