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

Large later stages can exceed these limits. Version 5.6.0 invokes exact analysis only inside Logic Lab, whose board is fixed at 26 symbols and a four-symbol answer. Analysis runs only after the active Discovery Rule reaches guess four or five. Other modes do not run automatic candidate analysis.

## Logic Lab integration
- Logic Lab rules remain directly inside `index.html` as a small `RULE_POOL`.
- One rule is selected from each of the three groups at the start of every round.
- Information Rules filter generated answers before play begins.
- Discovery Rules call `LogicLimitSolver.solve` using visible guess history and then apply the active Information Rule to the candidate list.
- Challenge Rules adjust only Logic Lab's guess limit or result score multiplier.

## Commands
```bash
npm test
npm run check
npm start
npm run build
```
