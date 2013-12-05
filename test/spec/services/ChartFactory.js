'use strict';

describe('Service: ChartFactory', function () {

  // load the service's module
  beforeEach(module('napPlayAdminApp'));


  // instantiate service
  var ChartFactory,
      metrics = [];

  beforeEach(inject(function(_ChartFactory_) {
    ChartFactory = _ChartFactory_;
    metrics = [
                {"days":[159,182,166,138,186,147,129,118,151,134,122,110,208,135,123],"labels":["2013-10-01","2013-10-04","2013-10-07","2013-10-10","2013-10-13","2013-10-16","2013-10-19","2013-10-22","2013-10-25","2013-10-28","2013-10-31","2013-11-03","2013-11-06","2013-11-09","2013-11-12"]},
                {"days":[556,577,412,314,286,265,226,193,281,194,231,174,553,228,294],"labels":["2013-10-01","2013-10-04","2013-10-07","2013-10-10","2013-10-13","2013-10-16","2013-10-19","2013-10-22","2013-10-25","2013-10-28","2013-10-31","2013-11-03","2013-11-06","2013-11-09","2013-11-12"]}
                ];
  }));

  describe('getDataSet', function(){
    it('should return a Chart dataset', function () {
      var chartData = ChartFactory.getDataSet(metrics, 'bar');

      expect(chartData.length).toBe(2);
      expect(metrics[0].days[0]).toBe(chartData[0].data[0]);
      expect(metrics[1].days[0]).toBe(chartData[1].data[0]);
    });
  });

  describe('getOptions', function(){
    it('should return and chart options object', function(){
      var barOptions = ChartFactory.getOptions('bar'),
          lineOptions = ChartFactory.getOptions('line'),
          emptyOptions = ChartFactory.getOptions('foo');

      expect(barOptions).toEqual(jasmine.any(Object));    
      expect(lineOptions).toEqual(jasmine.any(Object));
      expect(emptyOptions).not.toBeDefined(); 

    })
  })


});
