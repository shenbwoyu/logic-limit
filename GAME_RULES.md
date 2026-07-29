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
Every Logic Lab round draws one Rule from each group.

### Information
- At least one vowel: A, E, I, O, or U.
- No repeated symbol.
- At least one letter from A–M.
- At least one letter from N–Z.

### Discovery
- After guess four, show Remaining Candidates.
- After guess five, show letters the Deduction Engine can prove impossible. Nothing is shown when no impossible letter has been proven.

### Challenge
- Guess Limit is 8 instead of the normal 10.
- Logic Lab Score is multiplied by 1.3.

Logic Lab Score awards 100 points for each remaining guess allowance including the successful guess, with a minimum base of 100 points. The multiplier applies only when its Rule is active and is not added to the existing statistics screen.

## Deduction Engine rules
The engine does not change A/B judging and does not inspect the hidden answer to create a fact.

It may establish only facts that hold for every answer compatible with all visible guesses, results, and the active Logic Lab Information Rule:
- impossible symbol
- candidate count

## Failure behavior
When a stage ends unsuccessfully, the correct answer is appended to the history display.
