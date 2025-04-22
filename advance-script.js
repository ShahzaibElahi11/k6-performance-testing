import { check } from 'k6';
import http from 'k6/http';

export let options = {
    stages: [
      { duration: '10s', target: 10 }, // ramp-up to 10 users
      { duration: '20s', target: 10 }, // stay at 10 users
      { duration: '10s', target: 0 }, // ramp-down
    ],
  };

export default function(){

    let loginRes = http.post('https://reqres.in/api/users/', {
        name: 'admin',       
        job: '123',     
      });

      check(loginRes, { 'Post status was 201': (r) => r.status === 201 })

      check(loginRes, {
        'user created successfully': (res) => res.body.includes('admin'),
      });
}
