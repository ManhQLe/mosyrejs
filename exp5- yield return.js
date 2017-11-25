function *Gen(f){
    do{
        console.log("Start inputing")
        const x = yield;
        if(x==5)
            break;
        else
        console.log("Input ",f++,x);
        yield f;
        
    }
    while(true);
    console.log("end");
}


var k = Gen(7);
k.next();
console.log("Log",k.next(1));
k.next();
console.log("Log",k.next(1));
k.next();
console.log("Log",k.next(1));
k.next();
console.log("Log",k.next(1));


