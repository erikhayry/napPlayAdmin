'use strict';

describe('app scenario Test', function () {
	describe('Pages', function () {

		describe('App metrics Page', function () {
			it('Should have the correct title', function () {

				browser.get('/#/en/stats/flurry/app-metrics');
				var _pageName = element(by.binding('pageName'));

				expect(_pageName.getText()).toEqual('STATS - FLURRY - APP METRICS');
			}, 30000);
		});

		describe('Event metrics Page', function () {
			it('Should have the correct title', function () {

				browser.get('/#/en/stats/flurry/event-metrics');
				var _pageName = element(by.binding('pageName'));

				expect(_pageName.getText()).toEqual('STATS - FLURRY - EVENT METRICS');
			}, 30000);
		});
	});
});
