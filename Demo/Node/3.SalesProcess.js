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


const Marketing = new LogicalClay({
    connectPoints: ["ORDER"],
    logicAtCenter() {
        if(Math.random()>.5){
            this.COUPON = true
        }
        else
            this.COUPON = false;
    }
})

const Shipping = new LogicalClay({
    connectPoints:["ORDER"],
    CostTable:{
        "TX":3,
        "CA":5,
        "HI":4,        
    },
    logicAtCenter(agg){
        const Order = this.ORDER;
        this.SHIPPINGCOST =  agg.CostTable[Order.shipTo] || 8;
    }
})