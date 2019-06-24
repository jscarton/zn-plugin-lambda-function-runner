'use strict';

var Http = require('zengo').znHttpFake;
var Firebase = require('zengo').firebaseFake;
var Config = require('../../config');

var createFakeEndpointFactory = function() {

	var factory = {};

	factory.Http = Http();
	factory.Firebase = Firebase;

	factory.config = Config;

	return factory;

};

module.exports = createFakeEndpointFactory;
