const LogicalClay = require('mosyrejs/LogicalClay');
const Conduit = require('mosyrejs/Conduit');
const cur = require('./cursor');

/**
 * SIMPLE ORDER
 * 
 * Setup of the game
 * Actors (clays):
 *  . Customer
 *  . Orderer Taker
 *  . Money Collector
 *  . Patty Griller
 *  . Buns Warmer
 *  . Cheese Slicer
 *  . Burger Dresser
 *  . Order Wrapper
 * 
 *  . Distributor
 *  Items:
 *      Cheese: Cheddar, Blue cheese, Swiss, Pepper Jack ($1 each)
 *      Patty: 
 *          
 * 
 */

const OrderTaker = new LogicalClay({
    connectPoints:["ORDER"],
    currentOrder:next,    
    logic:(agg)=>{
        
    }
})