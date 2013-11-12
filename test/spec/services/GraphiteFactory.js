'use strict';

describe('Service: GraphiteFactory', function () {

  // load the service's module
  beforeEach(module('napPlayAdminApp'));

  // instantiate service
  var GraphiteFactory, GraphiteValue, Url, Target, RenderQuery, RenderQueryValue;
  
  beforeEach(inject(function(_GraphiteFactory_, _GraphiteValue_) {
	
	GraphiteFactory = _GraphiteFactory_;
	GraphiteValue = _GraphiteValue_;
	Target = 'consumer_live.1.love.add.anon.ok.count';
	RenderQuery = 'width';
	RenderQueryValue = '200px';
    
    GraphiteValue[RenderQuery] = RenderQueryValue;
    Url = GraphiteFactory.getGraph(Target);

  }));

  /*
    tests
  */

  it('getGraph should return a graph url containing the target value', inject(function (GraphiteFactory) {
    expect(Url.indexOf('?target=' + Target)).not.toEqual(-1);
  }));

  it('getGraph should return a graph url containing render values if one or more exists', inject(function (GraphiteFactory) {
    expect(Url.indexOf('&' + RenderQuery + '=' + RenderQueryValue)).not.toEqual(-1);
  }));  

  it('getGraph should return a graph url not containing render values if none exists', inject(function (GraphiteFactory, GraphiteValue) {
    for(var key in GraphiteValue){
    	GraphiteValue[key] = '';
    }

    Url = GraphiteFactory.getGraph(Target);
    expect(Url.indexOf('&')).toEqual(-1);
  }));

});
