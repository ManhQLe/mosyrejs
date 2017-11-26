class A {
    IN = []
    constructor(){
        console.log(IN);
    }
}

class B extends A{
    IN = ["A","B"];
    constructor(){
        super();
    }
}


const x = new B();