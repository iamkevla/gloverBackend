'use strict';

/*jshint quotmark:false */ //beacuse we have json in api payload

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var should = require('chai').should(),
  //expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('https://localhost:3001/api/v1/');


describe(' API > ', function() {


  var baseGet = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'en-US,en;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Host': 'localhost:3001',
    'Origin': 'https://localhost:3001',
    'Pragma': 'no-cache',
    'Referer': 'https://localhost:3001/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.6 Safari/537.36' // jshint ignore:line
  };

  var basePost = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json; charset=UTF-8',
    'Host': 'localhost:3001',
    'Origin': 'https://localhost:3001',
    'Pragma': 'no-cache',
    'Referer': 'https://localhost:3001/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.6 Safari/537.36' // jshint ignore:line
  };


  describe('Login', function() {

    it(' should reject unauthorised users', function(done) {
      api.get('Users')
        .set(baseGet)
        .expect(401)
        .end(done);
    });

    it(' should have CORS enambled for session post', function(done) {
      api.options('users/login')
        .set('Accept', '*/*')
        .set('Accept-Encoding', 'gzip, deflate, sdch')
        .set('Accept-Language', 'en-US,en;q=0.8')
        .set('Access-Control-Request-Headers', 'accept, content-type')
        .set('Access-Control-Request-Method', 'POST')
        .set('Cache-Control', 'no-cache')
        .set('Connection', 'keep-alive')
        .set('Host', 'localhost:3001')
        .set('Origin', 'https://localhost:3001')
        .set('Pragma', 'no-cache')
        .set('Referer', 'https://localhost:3001/')
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.6 Safari/537.36') // jshint ignore:line
      .expect(200)
        .end(done);
    });

    it(' should be able to login', function(done) {
      var dataPost = '{"username":"kevin.vlahos@m2.com.au","password":"Gl0riou$","isPrivateComputer":false}';
      api.post('users/login')
        .set(basePost)
        .set('Content-Length', dataPost.length.toString())
        .send(dataPost)
        .expect(200)
        .end(function(err) {
          should.not.exist(err);
          var dataPost = '{"username":"kevin.vlahos@m2.com.au","isPrivateComputer":false,"extra":"123456"}';
          api.post('users/login')
            .set(basePost)
            .set('Content-Length', dataPost.length.toString())
            .send(dataPost)
            .expect(200)
            .end(function(err) {
              should.not.exist(err);
              done();
            });
        });
    });

  });

});
