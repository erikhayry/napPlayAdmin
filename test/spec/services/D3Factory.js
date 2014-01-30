'use strict';

describe('Service: D3Factory', function () {

	// load the service's module
	beforeEach(module('napPlayAdminApp'));

	// instantiate service
	var D3Factory;
	beforeEach(inject(function (_D3Factory_) {
		D3Factory = _D3Factory_;
	}));

	it('should do something', function () {
		console.log(D3Factory.d3)
		expect( !! D3Factory).toBe(true);
	});
});
