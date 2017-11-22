class One{
    constructor(){
        return new Proxy(this,{
            get(target,name){
                console.log(name)
            }
        })
    }
    get2(){
        return "A"
    }
}

var y = new One();
y.get2();

