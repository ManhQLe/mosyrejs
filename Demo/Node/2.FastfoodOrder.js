const LogicalClay = require('mosyrejs/LogicalClay');
const Conduit = require('mosyrejs/Conduit');
const cur = require('./cursor');

/**
 * SIMPLE ORDER
 * 
 * 1. Order a burger
 *  a. Select number of patties (2sec delay per patty), 1.5 dollar/ patty
 *  b. Select bun
 *  c. Add cheese + bacon
 *  
 * 
 * 
 */



cur.clear();
cur.write('123',0,2);