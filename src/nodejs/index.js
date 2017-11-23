//contactPoints:[]
//connect()
//onCommunication()
//
var X = {};

class Clay {
    constructor(props) {
    }

    connect(withClay, atMedium) {
        this.onConnection(withClay,atMedium);
    }    

    interact(withClay,atMedium,sigal){
        withClay.onCommunication(this,atMedium,signal);
    }

    onCommunication(fromClay, atMedium, signal) {}

    onConnection(withClay,atMedium){}

    createProp(name, defVal, get, set) {
        Clay.createProp(this, name, defVal, get, set, this.__.props)
    }

    static createProp(O, name, def, getFx, setFx, storage) {
        getFx ? 1 : getFx = Clay.CONST.defaultGet;
        setFx ? 1 : setFx = Clay.CONST.defaultSet;

        Object.defineProperty(O, name, {
            get: function () {
                getFx.call(this, name, storage, defVal);
            },
            set: function (val) {
                setFx.call(this, name, storage, val)
            }
        })
    }

    static CONST = {
        defaultGet(name, store, defVal) {
            store.hasOwnproperty(name)||defVal===undefined ? 1 : this[name] = defVal;
            return store[name];
        },
        defaultSet(name, store, val) {
            store[name] = val;
        }
    }
}

export default Clay;


class SynEntity extends Clay {
    constructor(props) {
        super(props);   
        this.__.props = props||{};     
        this.__.contacts = new Map();
        this.__.signalStore = {};
        this.__.sensor = SynEntity.sensor(this);        
       

        this.createProp("staged", true);
        this.createProp("inPortNames",[]);
        this.createProp("responsefx", function () {})
        this.createProp("initfx",function(){})
        this.createProp("props", undefined, function () {
            return this.__.props;
        }, function () {})

        this.createProp("ports", undefined, function () {
            return this.__.ports;
        }, function () {})

        this.__.ports = new Proxy(this,{
            get(target,portName){
                return target.__.signalStore[portName];
            },
            set(target,portName,signal){
                target.__.sensor.next({portName,signal});
            }
        });
        this.__.sensor.next();
    }

    onConnection(withClay, atMedium) {
        const inPortNames = this.inPortNames;
        const {contacts} = this.__;               
        contacts.set(atMedium,withClay);
    }

    onCommunication(fromClay, atMedium, signal){
        const {contacts} = me.__;
        contacts.get(atMedium) === fromClay?
        this.__.ports[atMedium] = signal:1;
        
    }

    //This function is really just for checking input collection and staging;
    static *sensor(me){
        let i = 0;                
        const collected = new Set();
        while(true){            
            const {portName,signal} = yield;            
            const {contacts,signalStore} = me.__;
                                    
            if(inPortNames.indexOf(portName)>=0)
            {
                signalStore[portName] = signal;
                collected.add(portName);
                const {inPortNames} = me;
                if(collected.size == inPortNames.length){
                    const sigs = me.__.signalStore;
                    if(me.stage){
                        me.__.signalStore = {};
                        collected.clear();
                    }
                }                
            }
            else{
                const clay = contacts.get(portName)
                clay?clay.interact(me,portName,signal):0;
            }                                    
            
        }
    }
}


export default SynEntity;