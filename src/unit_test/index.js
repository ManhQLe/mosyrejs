const TestConduit = require('./TestConduit');
const TestRClay = require('./TestRClay');

var t0 = new TestRClay();
t0.Start();

var t1 = new TestConduit()
t1.Start();

