'use strict'
const Clay = require('./Clay');
const AttribClay = require('./AttribClay');

//This function is for checking signal collection, staging and responsible for response
function* sensor(me){                   
    const collected = new Set();
    me.cystalize();
    while(true){            
        const {connectPoint, signal} = yield;            
        const {contacts, signalStore} = me.__;
        const {connectPoints} = me;  

        if(connectPoints.indexOf(connectPoint)>=0)
        {
            signalStore[connectPoint] = signal;                
            collected.add(connectPoint);
            if(collected.size == connectPoints.length){      
                me.staged&&collected.clear();
                setTimeout.call(me,me.response,0,me.__.center);                
            }                
        }
        else{
            const clay = contacts.get(connectPoint)
            clay&&Clay.vibrate(clay,connectPoint,signal,me);
        }
    }
}

class BehavioralClay extends AttribClay {
    constructor(agreement) {
        super(agreement);   
        this.contacts = new Map();
        this.__.signalStore = {};
        this.__.sensor = sensor(this);

        /*-------------------Agreement definition--------------------*/
        this.createProp("staged", false);
        this.createProp("connectPoints",[]);
        this.createProp("response", function () {})
        this.createProp("cystalize",function(){})
        
        this.__.center = new Proxy(this,{
            get(target,connectPoint){
                return target.__.signalStore[connectPoint];
            },
            set(target,connectPoint,signal){
                target.__.sensor.next({connectPoint,signal});
                return true;
            }
        });      
        this.__.sensor.next(); 
    }

    onConnection(withClay, atConnectPoint) {  
        const {contacts} = this;               
        contacts.set(atConnectPoint,withClay);
    }

    onCommunication(fromClay, atConnectPoint, signal){       
        const {contacts} = this;
        const {connectPoints} = this;

        connectPoints.find((c)=>{return this.isSameConnectionPoint(c,atConnectPoint)})
        &&contacts.get(atConnectPoint) === fromClay
           && (this.__.center[atConnectPoint] = signal)
    }
}

module.exports = BehavioralClay;