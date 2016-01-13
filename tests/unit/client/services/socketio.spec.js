describe('Service: socketio Service', function() {
  beforeEach(module('frodocms'));

  var $rootScope, socketio;
  var eventName = 'event',
    data = 'data',
    callback = 'callback';

  beforeEach(angular.mock.inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    socketio = $injector.get('socketio');
    socketio = $injector.get('socketio');
    spyOn(socketio, 'on').and.callThrough();
    spyOn(socketio, 'emit').and.callThrough();
    socketio.on(eventName, callback);
    socketio.emit(eventName, data, callback);
  }));

  it('should verify that on function exists and is called', function() {
    expect(socketio.on).toBeDefined();
    expect(socketio.on).toHaveBeenCalled();
  });
  it('should verify that emit function exists and is called', function() {
    expect(socketio.emit).toBeDefined();
    expect(socketio.emit).toHaveBeenCalled();
  });
});
