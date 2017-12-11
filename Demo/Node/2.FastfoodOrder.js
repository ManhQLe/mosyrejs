const LogicalClay = require('mosyrejs/LogicalClay');
const BehavioralClay = require('mosyrejs/BehavioralClay');
const Conduit = require('mosyrejs/Conduit');
const cur = require('./cursor');

/**
 * SIMPLE ORDER
 * 
 * Beef Grinder
 * Patty Griller
 * Buns Warmer
 * Cheese Slicer
 * Order Assembler
 * Order Taker 
 * 
 *                                       (Ready to Order)
 *         .-------------------------------<-----------------------------. 
 *         |               .-------------.     .----------.              |
 *         |          .->--+ Buns Warmer |-----| Dressing |---.          |
 *  .------+------.   |    '-------------'     '----------'   |          |
 *  | Order Taker |---'                                  .----+-------.  |
 *  '------+----+-'   .---------------.                  | Assembling |--+
 *         |    '-->--| Cheese Slicer |--.               '----+----+--'  
 *         |          '---------------'  |                    |    |
 *    .----+---------.        .----------+----.               |    |     .--------.
 *    | Beef Grinder |--->----| Patty Griller |------>--------'    '-->--| Pickup |
 *    '--------------'        '---------------'                          '--------'
 */

