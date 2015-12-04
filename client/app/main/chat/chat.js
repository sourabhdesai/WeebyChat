'use strict';

angular.module('weebyChatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('chat', {
        url: '/chat/:roomname',
        templateUrl: 'app/main/chat/chat.html',
        controller: 'ChatCtrl'
      });
  });