describe('app scenario Test', function(){
    
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

});