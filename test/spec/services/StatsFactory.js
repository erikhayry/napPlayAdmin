'use strict';

describe('Service: StatsFactory', function () {

  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  // instantiate service
  var StatsFactory, RenderValue, Url, Target, RenderQuery, RenderQueryValue;
  
  beforeEach(inject(function(_StatsFactory_, _RenderValue_) {
	
	StatsFactory = _StatsFactory_;
	RenderValue = _RenderValue_;
	Target = 'consumer_live.1.love.add.anon.ok.count';
	RenderQuery = 'width';
	RenderQueryValue = '200px';
    
    RenderValue[RenderQuery] = RenderQueryValue;
    Url = StatsFactory.getGraph(Target);

  }));

  /*
    tests
  */

  it('getGraph should return a graph url containing the target value', inject(function (StatsFactory) {
    expect(Url.indexOf('?target=' + Target)).not.toEqual(-1);
  }));

  it('getGraph should return a graph url containing render values if one or more exists', inject(function (StatsFactory) {
    expect(Url.indexOf('&' + RenderQuery + '=' + RenderQueryValue)).not.toEqual(-1);
  }));  

  it('getGraph should return a graph url not containing render values if none exists', inject(function (StatsFactory, RenderValue) {
    for(var key in RenderValue){
    	RenderValue[key] = '';
    }

    Url = StatsFactory.getGraph(Target);
    expect(Url.indexOf('&')).toEqual(-1);
  }));

});
