describe('app scenario Test', function () {

	/*
        App navigation
    */

	describe('app navigation', function () {
		beforeEach(function () {
			browser().navigateTo('/');
		});

		it('redirects to stats page as default', function () {
			expect(browser().location().url()).toEqual('/stats/flurry/app-metrics');
		});
	});

	/*
        Pages
    */

	describe('Pages', function () {
		
		describe('App metrics Page', function () {
			it('Should have the correct title', function () {
				browser().navigateTo('/#/stats/flurry/app-metrics');
				expect(element('#page-title').text()).toEqual('Stats - Flurry - App metrics');
			});
		});

		describe('Event metrics Page', function () {
			it('Should have the correct title', function () {
				browser().navigateTo('/#/stats/flurry/event-metrics');
				expect(element('#page-title').text()).toEqual('Stats - Flurry - Event metrics');
			});
		});
	})
});
