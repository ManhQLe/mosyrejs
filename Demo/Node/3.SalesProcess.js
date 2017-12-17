const LogicalClay = require('mosyrejs/LogicalClay');
const BehavioralClay = require('mosyrejs/BehavioralClay');
const Conduit = require('mosyrejs/Conduit');

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);


/**
 *  SALES ORDER
 * 
 *                    .--------------------->------------.          .----------------.
 *                    |     .------------.               |          | EMAIL TRACKING |
 *                    +-->--| MARKETING  |--->-------.   |          '-----+----------'
 *                    |     '------------'           |   |                |
 *                    |     .---------------.    .---+---+--.       .-----+------.
 *                    +-->--| SHIPPING COST |->--| BILLING  |--->---| SHIP ORDER |
 *    .--------.      |     '---------------'    '-+--+--+--'       '------------'
 *    | ORDER  |------+                       .->--'  |  '-->-.    .--------------------.
 *    '--------'      |     .------------.    | .-----+----.  '->--| EMAIL BILL CHARGED |
 *                    '-->--| SALES COST |-->-+-| TAX COST |       '--------------------'
 *                          '------------'      '----------'
 *
 * 
 */

const items = {
    "MP3": 169,
    "BlurayPlayer":400,
    "4KTV": 2000,
    "iPhone7": 800,
    "ThinkPadP71":5000,
    "Oral-BPro8000":105
}

const ShippingCosts ={
    "TX":3,
    "CA":5,
    "HI":4,        
    "WA":2,
    "NY":2.5,
    "MA":1.5
}

class Email extends LogicalClay{
    constructor(agr){
        super(agr);
        this.connectPoints = ["EMAIL"]
    }
    logicAtCenter(agr){
        const email = this.EMAIL;
        console.log("Sending email to: "+ email.To);
        console.log(email.Title);
    }
}


const Ship = new LogicalClay({
    connectPoints:["ORDER"],
    logic(center){
        console.log("Shipping order...");
        const Order = center.ORDER;
        setTimeout(()=>{
            console.log("Order shipped");
            center.EMAIL = {                
                "To": Order.Customer.Email,
                "Title":`Your Order ${Order.orderNumber} has been shipped`,
                "Body":`Here is your tracking number ${Date.now()}. Please allow 3-5 business day for the order to arrived.`
            }
        },2000)
    }
})

const Billing = new LogicalClay({
    connectPoints:["ORDER","COUPON","SALES","SHIPPING","TAX"],
    staged:true,
    logic(center){
        const Order = center.ORDER;
        Order.Billing = {
            "Sales": center.SALES,
            "Shipping":center.SHIPPING,
            "Tax" : center.TAX,
            "SubTotal": center.SALES + center.SHIPPING,
            "Total": center.SALES + center.SHIPPING + center.TAX,
            "Coupon": center.COUPON
        }
        center.SHIP = Order;
        center.EMAIL = {
            "To":Order.Customer.Email,
            "Title":`Order confirmation ${DateTime.now()}`,
            "Body":"Order has been bill: $" + Order.Billing.Total
        }
    }
})

const  Sales = new LogicalClay({
    connectPoints:["ORDER"],
    items,
    logic(center){
        const Order = center.ORDER;
        let Sum = 0;
        Order.items.forEach(i=>{Sum+=arg.items[i]})
        center.SALESCOST = Sum;
    }
})

const Tax = new LogicalClay({
    connectPoints:["SALES"],
    logic(){
        this.TAXCOST = this.SALES * .8;
    }
})

const Marketing = new LogicalClay({
    connectPoints: ["ORDER"],
    logic(center) {
        if(Math.random()>.5){
            center.COUPON = true
        }
        else
        center.COUPON = false;
    }
})

const Shipping = new LogicalClay({
    connectPoints:["ORDER"],
    ShippingCosts,
    logic(center){
        const Order = center.ORDER;
        center.SHIPPINGCOST =  this.ShippingCosts[Order.shipTo] || 8;
    }
})

const OrderInferface = new LogicalClay({
    connectPoints:["START"],
    Steps:[
        {
            "Question": "Please select your product",
            "Map":"items"
        },
        {
            "Question":"",
            "Map":""
        }
    ],
    Order:{
        Customer:{}
    },
    logic(center){

    },
})