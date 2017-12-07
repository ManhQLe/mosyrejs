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
 * 
 */



cur.clear();
cur.write('123',0,2);