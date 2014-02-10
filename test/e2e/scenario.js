'use strict';

describe('app scenario Test', function () {
	/*
        Pages
    */

	describe('Pages', function () {

		describe('App metrics Page', function () {
			it('Should have the correct title', function () {
				browser().navigateTo('/#/en/stats/flurry/app-metrics');
				expect(element('#page-title').text()).toEqual('Stats - Flurry - App Metrics');
			});
		});

		describe('Event metrics Page', function () {
			it('Should have the correct title', function () {
				browser().navigateTo('/#/en/stats/flurry/event-metrics');
				expect(element('#page-title').text()).toEqual('Stats - Flurry - Event Metrics');
			});
		});
	});
});
