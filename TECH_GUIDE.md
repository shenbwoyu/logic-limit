# LOGIC LIMIT — Technical Guide

## Project layout
- `app/index.html`: main game UI and existing game logic for Electron.
- `app/solver.js`: platform-neutral Deduction Engine.
- `tests/solver.test.js`: Node-based engine tests.
- `main.js`, `preload.js`: Electron shell.
- `package.json`: development, test, and build scripts.

The PWA package mirrors `index.html` and `solver.js` at its root.

## Deduction Engine API
The engine is available as:
- Browser: `window.LogicLimitSolver`
- Node: `require('./app/solver.js')`

### Analyze a position
```js
const analysis = LogicLimitSolver.analyze({
  symbols: 'ABCDEFG',
  length: 4,
  history: [
    { guess: 'ABCD', result: '1A2B' },
    { guess: 'EFGA', result: '0A1B' }
  ]
});
```

### Main output
```js
{
  solver: {
    status,
    complete,
    searchSpace,
    candidates,
    candidateCount
  },
  facts: {
    status,
    complete,
    candidateCount,
    impossibleLetters,
    confirmedLetters,
    impossiblePositions,
    confirmedPositions,
    basedOnGuessIndexes
  }
}
```

## Soundness rule
Facts may be emitted only when enumeration is complete. When the search space or candidate limit is exceeded, `complete` is false and the fact arrays remain empty.

A contradictory history returns `status: 'contradiction'`, candidate count `0`, and no invented facts.

## Search limits
The initial implementation uses exact permutation enumeration with safeguards:
- default maximum search space: 2,000,000 permutations
- default maximum stored candidates: 250,000

Large later stages can exceed these limits. Version 5.6.1 does not run automatic candidate enumeration for Logic Lab. Other modes also remain unchanged.

## Logic Lab integration
- Logic Lab rules remain directly inside `index.html` as a small `RULE_POOL`.
- One Answer Specification, one different-family Input Specification, and one Experiment Procedure are drawn for every round.
- The hidden answer is generated to satisfy both structural specifications.
- Input and procedure validation runs before the existing judge; rejected guesses do not consume an attempt.
- No Rule changes A/B scoring, the answer generator used by other modes, statistics format, or save format.

## Commands
```bash
npm test
npm run check
npm start
npm run build
```
