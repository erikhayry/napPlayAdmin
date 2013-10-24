describe('app scenario Test', function(){
    describe('Setup item view', function(){
            
            beforeEach(function(){
                    browser().navigateTo('/');
            });

            it('go to /', function(){
                    expect(browser().location().url()).toEqual('/');
            })
    });        

});