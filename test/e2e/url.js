'use strict';

describe('app scenario url tests', function () {

	/*
        App navigation
    */

	describe('app navigation', function () {
		it('should redirect to stats page as default', function () {
			browser.get('/');
			expect(browser.getCurrentUrl()).toContain('/en/stats/flurry/app-metrics');
		}, 30000);

		it('should redirect preferd language if language not supported', function () {
			browser.get('/#/madeuplang/stats/flurry/event-metrics');
			expect(browser.getCurrentUrl()).toContain('/en/stats/flurry/event-metrics');
		}, 30000);

		it('should redirect to stats page as default if language missing', function () {
			browser.get('/#/stats/flurry/event-metrics');
			expect(browser.getCurrentUrl()).toContain('/en/stats/flurry/app-metrics');
		}, 30000);
	});

});
