
const mosyrejs = require("../mosyrejs");
const {Clay,ResponsiveClay,PropClay,Conduit} = mosyrejs;

class Clay2 extends PropClay{
    constructor(props){
        super(props);        
        this.createProp("X",0);
        this.createProp("Y","Hello");
    }

    onCommunication(fromClay,atMedium,sig){
        console.log(fromClay,atMedium,sig);
    }
}

console.log("---------------------TESTING CLAY---------------------")

const c = new Clay2({
    "X":1,    
})

console.log(c.X);
console.log(c.Y);

Clay.vibrate(c,"Test Test Test",1,{});

const c1 = new Clay2({
    "Y":2
})

console.log("---------------------TESTING ResponsiveClay---------------------")

const c2 = new ResponsiveClay({
    "response":function(center){
        console.log(center.A);
        console.log(center.B);
     
        //center.B = 1.5;
    },
    staged:true,
    "inputNames":["A","B"],
})
Clay.connect(c,c2,"A");
Clay.connect(c1,c2,"B");

Clay.vibrate(c2,"A",1,c);
Clay.vibrate(c2,"B",3,c1);
Clay.vibrate(c2,"B",4,c1);
Clay.vibrate(c2,"B",5,c1);
Clay.vibrate(c2,"B",6,c1);
setTimeout(()=>{
    Clay.vibrate(c2,"A",5,c);
    Clay.vibrate(c2,"B",8,c1);
    
},2000)







