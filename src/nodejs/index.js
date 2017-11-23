//contactPoints:[]
//connect()
//onCommunication()
//
var X = {};

class Clay {
    constructor(props) {
    }
    connect(clay, atMedium) {}

    onCommunication(fromClay, atMedium, signal) {}

    interact(withClay,atMedium,sigal){
        withClay.onCommunication(this,atMedium,signal);
    }

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


class Entity extends Clay {
    constructor(props) {
        super(props);   
        this.__.props = props||{};     
        this.__.contacts = new Map();
        this.__.signalStore = {};
        this.__.sensor = Entity.sensor(this);
       

        this.createProp("staged", true);
        this.createProp("responsefx", function () {})
        this.createProp("initfx",function(){})
        this.createProp("contactPoints", []);
        this.createProp("props", undefined, function () {
            return this.__.props;
        }, function () {})

        this.createProp("ports", undefined, function () {
            return this.__.ports;
        }, function () {})

        this.__.ports = new Proxy(this,{
            get(target,atMedium){
                return target.__.signalStore[atMedium];
            },
            set(target,atMedium,signal){
                target.__.sensor({atMedium,signal});
            }
        });
       
    }

    connect(clay, atMedium) {
        const inPorts = this.inPorts;
        const {contacts} = this.__;               
        contacts.set(atMedium,clay);
    }

    onCommunication(fromClay, atMedium, signal){        
    }

    static *sensor(Entity){
        let i = 0;
        const max= Entity.contactPoints.length;
        Entity.initfx()
        while(true){
            const {atMedium,signal} = yield;
            
        }
    }
}


export default Entity;