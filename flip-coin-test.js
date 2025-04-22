// import http from 'k6/http';
// import { check } from 'k6';

// export let options = {
//     stages: [
//       { duration: '10s', target: 10 }, // ramp-up to 10 users
//       { duration: '20s', target: 10 }, // stay at 10 users
//       { duration: '10s', target: 0 }, // ramp-down
//     ],
//   };


// // Randomly choose 'heads' or 'tails'
// function getRandomBet() {
//     return Math.random() < 0.5 ? 'heads' : 'tails';
// }

// export default function () {
//     const bet = getRandomBet();
//     const url = `https://test.k6.io/flip_coin.php?bet=${bet}`;
//     const res = http.get(url);

//     // Simple check: did we win?
//     const won = res.body.includes("You won!");
//     const lost = res.body.includes("You lost!");

//     check(res, {
//         "request succeeded": (r) => r.status === 200,
//         "bet result is valid": () => won || lost,
//         "bet was a win or loss": () => won || lost,
//     });

//     console.log(`Bet on: ${bet} | Result: ${won ? "WON 🎉" : lost ? "LOST 😞" : "UNKNOWN 🧐"}`);
// }

import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

// 🔹 Custom counters for wins and losses
const wins = new Counter('coin_wins');
const losses = new Counter('coin_losses');

export let options = {
  stages: [
    { duration: '10s', target: 10 },  // ramp-up to 10 users
    { duration: '20s', target: 10 },  // stay at 10 users
    { duration: '10s', target: 0 },   // ramp-down
  ],
};

function getRandomBet() {
  return Math.random() < 0.5 ? 'heads' : 'tails';
}

export default function () {
  const bet = getRandomBet();
  const url = `https://test.k6.io/flip_coin.php?bet=${bet}`;
  const res = http.get(url);

  const won = res.body.includes("You won!");
  const lost = res.body.includes("You lost!");

  // ✅ Log to custom counters
  if (won) {
    wins.add(1);
  } else if (lost) {
    losses.add(1);
  }

  check(res, {
    "request succeeded": (r) => r.status === 200,
    "bet result is valid": () => won || lost,
  });

  console.log(`Bet on: ${bet} | Result: ${won ? "WON 🎉" : lost ? "LOST 😞" : "UNKNOWN 🧐"}`);
}
