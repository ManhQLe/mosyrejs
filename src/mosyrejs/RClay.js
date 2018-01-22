'use strict'
const Clay = require('./Clay');
const AttribClay = require('./AttribClay');

//This function is for checking signal collection, staging and responsible for response
function* sensor(me){                   
    const collected = new Set();
    let init = 0;
    while(true){            
        const {connectPoint, signal} = yield;            
        ++init===1 && me.init();

        const {contacts, signalStore} = me.__;
        const {connectPoints} = me;  

        if(connectPoints.indexOf(connectPoint)>=0)
        {
            signalStore[connectPoint] = signal;                
            collected.add(connectPoint);
            if(collected.size === connectPoints.length){      
                me.staged&&collected.clear();
                me.response(me.__.center);
                //setTimeout.call(me,me.response,0,me.__.center);                
            }                
        }
        else{
            const clays = contacts.get(connectPoint)
            clays&&clays.forEach(clay=>Clay.vibrate(clay,connectPoint,signal,me))            
        }
    }
}

class ResponsiveClay extends AttribClay {
    constructor(agreement) {
        super(agreement);   
        this.contacts = new Map();

        this.__.signalStore = {};
        this.__.sensor = sensor(this);

        /*-------------------Agreement definition--------------------*/
        this.createProp("staged", false);
        this.createProp("connectPoints",[]);
        this.createProp("response", function () {})
        this.createProp("init",function(){})
        
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
        let clays = contacts.get(atConnectPoint);
        clays || (clays = []);        
        clays.indexOf(withClay)<0 && clays.push(withClay);
        contacts.set(atConnectPoint,clays);
    }

    onCommunication(fromClay, atConnectPoint, signal){       
        const {contacts} = this;
        const {connectPoints} = this;
        const others = contacts.get(atConnectPoint);


        connectPoints.find((c)=>{return this.isSameConnectionPoint(c,atConnectPoint)})
        && others && others.indexOf(fromClay)>=0
        && (this.__.center[atConnectPoint] = signal)                    
    }

}

module.exports = ResponsiveClay;