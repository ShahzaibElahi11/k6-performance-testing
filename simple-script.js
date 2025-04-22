import { check, sleep } from 'k6';
import http from 'k6/http';

export let options = {
  vus: 3, //virtual user
  durations: '10s' //test duration 
};


export default function () {
  let res = http.get('https://test.k6.io/news.php');

  check(res, {
    'status is 200' : (r) => r.status ===200,
    'response has news date ': (r) => r.body.includes("The Internet's symbolic birth date: publication of RFC 1.")
  });
  
  sleep(1);
}