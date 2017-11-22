//inPort
//makeContact
//onVibration
//
var X ={};

class Unit {
    constructor(props){
        this.__={
            props:props||{}
        }
    }
    makeContact(unit,atMedium){
    }

    onVibration(fromUnit,atMedium,signal){
    }

    createProp(name,defVal,get,set){
        Unit.createProp(this,name,defVal,get,set,this.__.props)
    }

    static createProp(O,name,def,getFx,setFx,storage){
        getFx?1:getFx=function(name,store,defVal){
            store.hasOwnproperty(name)?1:store[name] = defVal;
            return store[name];
        }
        setFx?1:setFx=function(name,store,val){
            store[name] = val;
        }
        Object.defineProperty(O,name,{
            get:function(){
                getFx.call(this,name,storage,defVal);
            },
            set:function(val){
                setFx.call(this,name,storage,val)
            }
        })
    }
}



