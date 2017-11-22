var C = {
    name:"Test"
}

Object.defineProperty(C,"key",{
    get:function(){
        return this.name;
    }
})

console.log(C.key);


