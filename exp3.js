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


class A {}

class B extends A {}

class C extends B {};

var t1 = new C();

console.log("t1 is instance of B",(t1 instanceof B))
console.log("t1 is instance of A",(t1 instanceof A))
console.log("t1 is instance of C",(t1 instanceof C))   

let t2 = "123"
let t3 = "123"

console.log("t2 = t3", t2===t3)

