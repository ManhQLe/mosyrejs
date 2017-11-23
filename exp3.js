function *Gen(f){
    do{
        const x = yield;
        if(x==5)
        break;
        else
        console.log("Input ",f++,x);
    }
    while(true);
    console.log("end");
}


var k = Gen(7);
k.next();
k.next(9);
k.next(7);
k.next(2);
k.next(3);
k.next(5);
k.next(3);
k.next(3);
k.next(3);

