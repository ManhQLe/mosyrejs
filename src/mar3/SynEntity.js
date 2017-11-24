'use strict'
const Clay = require('./Clay')

class SynEntity extends Clay {
    constructor(props) {
        super(props);   
        this.__.contacts = new Map();
        this.__.signalStore = {};
        this.__.sensor = SynEntity.sensor(this);        

        this.createProp("staged", true);
        this.createProp("inPortNames",[]);
        this.createProp("fx", function () {})
        this.createProp("initfx",function(){})
        this.createProp("props", undefined, function () {
            return this.__.props;
        }, function () {})

        this.__.ports = new Proxy(this,{
            get(target,portName){
                return target.__.signalStore[portName];
            },
            set(target,portName,signal){
                target.__.sensor.next({portName,signal});
                return true;
            }
        });
        this.__.sensor.next();
    }

    onConnection(withClay, atMedium) {        
        const {contacts} = this.__;               
        contacts.set(atMedium,withClay);
    }

    onCommunication(fromClay, atMedium, signal){
        const {contacts} = this.__;
        const {inPortNames} = this;
        inPortNames.indexOf(atMedium)>=0&&contacts.get(atMedium) === fromClay?
        this.__.ports[atMedium] = signal:1;                
    }

    //This function is for checking input collection and staging;
    static *sensor(me){                   
        const collected = new Set();
        while(true){            
            const {portName,signal} = yield;            
            const {contacts,signalStore} = me.__;
            const {inPortNames} = me;                        
            if(inPortNames.indexOf(portName)>=0)
            {
                signalStore[portName] = signal;                
                collected.add(portName);
                const {inPortNames} = me;
                if(collected.size == inPortNames.length){
                    const sigs = me.__.signalStore;
                    me.stage?collected.clear():0;
                    me.fx(me.__.ports,sigs);
                }                
            }
            else{
                const clay = contacts.get(portName)
                clay?Creation.vibrate(clay,portName,signal,me):1;                
            }                                    
            
        }
    }
}

module.exports = SynEntity;