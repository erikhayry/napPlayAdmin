describe('app scenario Test', function () {

	/*
        App navigation
    */

	describe('app navigation', function () {
		beforeEach(function () {
			browser().navigateTo('/');
		});

		it('redirects to stats page as default', function () {
			expect(browser().location().url()).toEqual('/stats/flurry');
		});
	});

	/*
        Pages
    */

	describe('Pages', function () {
		describe('Stats Page', function () {
			it('Should have the correct title', function () {
				browser().navigateTo('/#/stats');
				expect(element('#page-title').text()).toEqual('Stats - Flurry');
			});
		});
	})
});
