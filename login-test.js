// file: login-test.js
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 1,
  duration: '10s',
};

export default function () {
  // Step 1: Log in and get cookies
  let loginRes = http.post('https://reqres.in/api/login', {
    email: 'eve.holt@reqres.in',       // username
    password: 'cityslicka',      // password
  });

  check(loginRes, {
    'logged in successfully': (res) => res.body.includes('QpwL5tke4Pnpja7X4'),
  });

}
