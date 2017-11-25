'use strict'
const Clay = require('./Clay');
const PropClay = require('./PropClay');

class ProgrammableClay extends PropClay {
    constructor(props) {
        super(props);   
        this.__.contacts = new Map();
        this.__.signalStore = {};
        this.__.sensor = ProgrammableClay.sensor(this);        
        this.__.fxReady = false;

        this.createProp("staged", false);
        this.createProp("inputNames",[]);
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
        const {inputNames} = this;
        if(inputNames.indexOf(atMedium)>=0&&contacts.get(atMedium) === fromClay){
            //this.__.ports[atMedium] = signal <-- Calling this will result in recursive Generator calls (Generator is already running)
            this.__.sensor.next({portName:atMedium,signal})
            this.__.fxReady?(this.__.fxReady = false,this.fx(this.__.ports)):1;
        }                
    }

    //This function is for checking inputs collection and staging;
    static *sensor(me){                   
        const collected = new Set();
        while(true){            
            const {portName,signal} = yield;            
            const {contacts,signalStore} = me.__;
            const {inputNames} = me;  

            if(inputNames.indexOf(portName)>=0)
            {
                signalStore[portName] = signal;                
                collected.add(portName);
                const {inputNames} = me;
                if(me.__.fxReady = collected.size == inputNames.length){                    
                    me.staged?collected.clear():0;
                }                
            }
            else{
                const clay = contacts.get(portName)
                clay?Clay.vibrate(clay,portName,signal,me):1;                
            }
        }
    }
}

module.exports = ProgrammableClay;