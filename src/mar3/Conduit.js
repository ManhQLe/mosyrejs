'use strict'


class Conduit extends Clay{
    constructor(props){
        super(props)
        this.__.contacts = [];

        this.createProp("signal",null,function(){},function(name,store,signal){
            onCommunication(this,undefined,signal);
        })
    }

    onConnection(withClay,atMedium){
        const {contacts} = this.__;
        const x = contacts.find(c=>{return c.withClay === withClay});
        x&&(x.withMedium===atMedium|| (x.withClay instanceof Conduit))
        ?1
        :contacts.push({withClay,withMedium});
    }

    onCommunication(fromClay,atMedium,signal){
        const {contacts} = this.__;
        for(const c of contacts){
            const {withClay,withMedium} = c;            
            withClay!==fromClay && withMedium!==atMedium
            ?setTimeout(Creation.connect,0,withClay,withMedium,signal,this)
            :0
        }
    }
}


module.exports = Conduit;