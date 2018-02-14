'use strict'
const Clay = require('./Clay');
const AttribClay = require('./AttribClay');

class SClay extends AttribClay{
    constructor(agr){
        super(agr);
        this.createProp("layoutMap",[])
        this.createProp("build",(clay)=>{return clay.agreement.layoutMap})
        this.__.map = this.onBuild();
        this.contacts = [];
        this.contactPoints = [];


        map.forEach(e=>{
            const [myPoint,InternalClay,internalPoint] = e; 
            this.contactPoints.push(myPoint)           
            Clay.connect(this,InternalClay,myPoint,internalPoint);
            
        })

    }

    onCommunication(fromClay,atConnectionPoint,signal){
        const map = this.__.map;
        const {contacts} = this;
        //Check to see if he is from map
        const r =  map.find(m=>m[1] === fromClay)
        if(r){
            const pair = contacts.find(p=>this.isSameConnectionPoint(p.cp, atConnectionPoint))
            const {clays} = pair
            clays.forEach(c=>{                
                c!==fromClay && Clay.vibrate(c,atConnectionPoint,signal,this);                
            })
        }
        else{
            //Not from map
            const pair = contacts.find(p=>this.isSameConnectionPoint(p.cp, atConnectionPoint))
            pair && map.forEach(([mp,clay,hp])=>{
                if(this.isSameConnectionPoint(mp,atConnectionPoint))
                    Clay.vibrate(clay,hp,signal,this);
            })
        }

    }

    //<-- Someone wants to connect to me through my point"
    onConnection(withClay,atConnectionPoint){         
        const {contacts} = this;
        let pair = contacts.find(p=>this.isSameConnectionPoint(p.cp, atConnectionPoint))
        pair || (pair = {clays:[],cp:atConnectionPoint},contacts.push(pair) )
        const {clays,cp} = pair;
        clays.find(c=>c===withClay) || clays.push(withClay)
    }

    onBuild(){
        return this.build();
    }
}

// Enginering building things

/* 
    [Me,S1 ------- Clay,Port]
    [Me,S2 --------Clay,Port]
*/

