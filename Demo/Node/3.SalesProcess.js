const LogicalClay = require('mosyrejs/LogicalClay');
const BehavioralClay = require('mosyrejs/BehavioralClay');
const Conduit = require('mosyrejs/Conduit');

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);


/**
 *  SALES ORDER
 * 
 *                    .----------------------------------.          .----------------.
 *                    |     .------------.               |          | EMAIL TRACKING |
 *                    +-->--| MARKETING  |--->-------.   |          '----+-----------'
 *                    |     '------------'           |   |               |
 *                    |     .---------------.    .---+---+-.       .-----+------.
 *                    +-->--| SHIPPING COST |->--| BILLING |--+-->-| SHIP ORDER |
 *    .--------.      |     '---------------'    '-+--+----'  |    '------------'
 *    | ORDER  |------+                       .----'  |       |    .--------------------.
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

const Billing = new LogicalClay({
    connectPoints:["ORDER","COUPON","SALES","SHIPPING","TAX"],
    staged:true,
    logic(){
        const Order = this.ORDER;
        Order.Billing = {
            "Sales": this.SALES,
            "Shipping":this.SHIPPING,
            "Tax" : this.TAX,
            "SubTotal": this.SALES + this.SHIPPING,
            "Total": this.SALES + this.SHIPPING + this.TAX,
            "Coupon": this.COUPON
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
    logic() {
        if(Math.random()>.5){
            this.COUPON = true
        }
        else
            this.COUPON = false;
    }
})

const Shipping = new LogicalClay({
    connectPoints:["ORDER"],
    ShippingCosts,
    logic(agg){
        const Order = center.ORDER;
        center.SHIPPINGCOST =  agg.ShippingCosts[Order.shipTo] || 8;
    }
})