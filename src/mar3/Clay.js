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

Clay.connect = function(clay1,clay2,atMedium){
    clay1.onConnection(clay2,atMedium);
    clay2.onConnection(clay1,atMedium);
},
Clay.vibrate =function(clay,atMedium,signal,soureClay){
    clay.onCommunication(soureClay,atMedium,signal);
}    

module.exports = Clay;