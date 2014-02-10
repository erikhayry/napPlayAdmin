'use strict';

describe('app scenario url tests', function () {

	/*
        App navigation
    */

	describe('app navigation', function () {
		it('should redirect to stats page as default', function () {
			browser().navigateTo('/');
			expect(browser().location().url()).toEqual('/en/stats/flurry/app-metrics');
		});

		it('should redirect preferd language if language not supported', function () {
			browser().navigateTo('/#/madeuplang/stats/flurry/event-metrics');
			expect(browser().location().url()).toEqual('/en/stats/flurry/event-metrics');
		});

		it('should redirect to stats page as default if language missing', function () {
			browser().navigateTo('/#/stats/flurry/event-metrics');
			expect(browser().location().url()).toEqual('/en/stats/flurry/app-metrics');
		});
	});

});
