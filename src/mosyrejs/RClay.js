'use strict'
const Clay = require('./Clay');
const AttribClay = require('./AttribClay');

//This function is for checking signal collection, staging and responsible for response
function* sensor(me){                   
    const collected = new Set();
    let init = 0;
    while(true){            
        const {connectPoint, signal} = yield;            
        ++init===1 && me.onInit(me);

        const {contacts, signalStore} = me.__;
        const {connectPoints} = me;  

        if(connectPoints.indexOf(connectPoint)>=0)
        {
            signalStore[connectPoint] = signal;                
            collected.add(connectPoint);
            if(collected.size === connectPoints.length){      
                me.staged&&collected.clear();
                me.onResponse(connectPoint); //<---Calling this without setTimeOut will cause 
                //function generator already started.
                //setTimeout.call(me,me.response,0,me.__.center);               
            }                
        }
        else{
            const clays = contacts.get(connectPoint)
            clays&&clays.forEach(clay=>Clay.vibrate(clay,connectPoint,signal,me))            
        }
    }
}

function __Process(me,connectPoint,signal){    
    ++me.__.init===1 && me.onInit();

    const {contacts, signalStore,collected} = me.__;
    const {connectPoints} = me;  

    if(connectPoints.indexOf(connectPoint)>=0)
    {
        signalStore[connectPoint] = signal;                
        collected.add(connectPoint);
        if(collected.size === connectPoints.length){      
            me.staged&&collected.clear();
            me.onResponse(connectPoint);
            //setTimeout.call(me,me.response,0,me.__.center);                
        }                
    }
    else{
        let pair = contacts.find(p=>me.isSameConnectionPoint(p.cp, connectPoint))
        pair&&pair.clays.forEach(clay=>Clay.vibrate(clay,connectPoint,signal,me))
    }
}

class RClay extends AttribClay {
    constructor(agreement) {
        super(agreement);   
        this.contacts = []

        this.__.signalStore = {};
        //this.__.sensor = sensor(this);

        this.__.init = 0;
        this.__.collected = new Set();

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
                //target.__.sensor.next({connectPoint,signal});
                __Process(target,connectPoint,signal);
                return true;
            }
        });

        //this.__.sensor.next();
    }

    onConnection(withClay, atConnectPoint) {        
        const {contacts} = this;
        let pair = contacts.find(p=>this.isSameConnectionPoint(p.cp, atConnectPoint))
        pair || (pair = {clays:[],cp:atConnectPoint},contacts.push(pair) )
        const {clays,cp} = pair;
        clays.indexOf(withClay)>=0 || clays.push(withClay)
    }

    onCommunication(fromClay, atConnectPoint, signal){  
                
        const {contacts} = this;
        const {connectPoints} = this;
        const pair = contacts.find(p=>this.isSameConnectionPoint(p.cp, atConnectPoint))

        connectPoints.find((c)=>{return this.isSameConnectionPoint(c,atConnectPoint)})
        && pair && pair.clays.indexOf(fromClay)>=0
        && (this.__.center[atConnectPoint] = signal)                    
    }

    onResponse(connectPoint){
        this.response(this.__.center,this)
    }

    onInit(){
        this.init();
    }

    getCenter(){
        return this.__.center;
    }
}

module.exports = RClay;