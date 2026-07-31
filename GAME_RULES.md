# LOGIC LIMIT — Game Rules

## Base rule
The answer contains distinct symbols selected from the stage's available symbol pool.

For every guess:
- `A`: correct symbol in the correct position.
- `B`: correct symbol in the wrong position.

Symbols may not repeat in either the answer or a valid guess.

## Modes
- Classic: four distinct digits, unlimited guesses, rating based on time and guesses.
- Explorer: smaller letter pools and forgiving limits.
- Challenge: larger pools and stricter limits.
- Time Attack: stage-specific countdown and guess limit.
- Logic Lab: one four-letter answer from A–Z with three Rules drawn for each round.
- Trial: fifteen consecutive puzzles; one failure ends the run.

## Logic Lab Rules
Every Logic Lab round draws one Rule from each group. The Answer Specification and Input Specification are always different families, and the generated answer satisfies both.

### Answer Specification
One structural fact about the hidden four-letter answer, selected from:
- exactly one vowel;
- two letters from A–M and two from N–Z;
- first and last letters from opposite halves;
- one letter from each band A–F, G–M, N–S, T–Z;
- alphabetical span of at least 15;
- no alphabetically adjacent pair.

### Input Specification
Every submitted guess must obey one of the same structural families. A violating guess is rejected without consuming an attempt. Because the answer is generated to satisfy this specification, the final answer is always a valid input.

### Experiment Procedure
The opening probes also follow one temporary procedure:
- the first two guesses share no letters;
- each of the first three guesses contains at least two previously untested letters;
- guesses two through four keep no letter in the same position as the previous guess;
- guesses two through four share exactly one letter with the previous guess; or
- guesses two through four share exactly two letters with the previous guess.

The exact answer may always be submitted, so the temporary procedure cannot prevent completion.

## Deduction Engine rules
The existing Deduction Engine remains available to the project, but Logic Lab v5.6.1 no longer invokes automatic candidate or impossible-letter reveals. A/B judging remains unchanged.

## Failure behavior
When a stage ends unsuccessfully, the correct answer is appended to the history display.
