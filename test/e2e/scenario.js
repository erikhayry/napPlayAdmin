describe('app scenario Test', function(){

    /*
        App navigation
    */
    
    describe('app navigation', function(){            
            
            beforeEach(function(){
                browser().navigateTo('/');
            });

            it('redirects to notification page as default', function(){
            	expect(browser().location().url()).toEqual('/notifications');
            });

            it('loades stats page when clicked in nav', function(){
            	element('#stats-page-link').click();
            	expect(browser().location().url()).toEqual('/stats');
            });

            it('loades notification page when clicked in nav', function(){
            	browser().navigateTo('/#/stats');
            	element('#notifications-page-link').click();
            	expect(browser().location().url()).toEqual('/notifications');
            });
    });

    /*
        Pages
    */

    describe('Pages', function(){
        
        describe('Notification Page', function(){
            it('Should have the correct title', function(){
                browser().navigateTo('/#/notifications');
                expect(element('#page-title').text()).toEqual('Notification Page');
            });
        });

        describe('Stats Page', function(){
            it('Should have the correct title', function(){
                browser().navigateTo('/#/stats');
                expect(element('#page-title').text()).toEqual('Stats Page');
            });
        });
    })
});