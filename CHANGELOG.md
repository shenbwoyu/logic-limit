# Changelog

## 5.6.1 — Logic Lab Rule Redesign

- Replaced the fixed Discovery and score/guess-limit Rules with three interacting rule groups: Answer Specification, Input Specification, and Experiment Procedure.
- Every round now combines two structural constraints that both narrow the valid answer space.
- Input Specification is enforced before a guess is accepted; invalid guesses do not consume an attempt.
- Experiment Procedure changes the first several probes through no-reuse, fresh-letter, position-rotation, or controlled-overlap conditions.
- Exact answers remain submit-able even when an early experiment procedure would otherwise block the probe.
- Existing Classic, Explorer, Challenge, Time Attack, and Trial behavior is unchanged.
- Legacy v5.6.0 Logic Lab saves restart only their current Logic Lab round with a new compatible rule set.
- Windows package and PWA cache updated to 5.6.1.

## 5.6.0 — Logic Lab

### Added
- New Logic Lab mode using the existing 1A2B game flow.
- One Information, one Discovery, and one Challenge Rule are drawn for every new round.
- Information Rules constrain answer generation without changing the normal judge.
- Remaining Candidates reveal after guess four when selected.
- Deduction Engine impossible-letter reveal after guess five when selected and proven information exists.
- Guess Limit 8 and Score ×1.3 Challenge Rules.
- Compact Today's Rules panel above the guess area.

### Preserved
- Classic, Explorer, Challenge, Time Attack, and Trial gameplay remain unchanged.
- Existing A/B judging, answer uniqueness, save structure, unlock chain, and statistics UI are retained.

### Changed
- Windows package version updated to 5.6.0.
- PWA cache updated to `logic-limit-v5.6.0`.

## 5.5.0 — Deduction Engine Foundation

### Added
- Platform-neutral `solver.js` for exact 1A2B candidate enumeration.
- Fact extraction for impossible symbols, confirmed symbols, impossible positions, confirmed positions, and candidate count.
- Safe handling of contradictory histories and incomplete searches.
- Search-space and candidate-count safeguards.
- Node test suite for scoring, enumeration, filtering, fact soundness, contradictions, and large-search protection.
- Project, technical, rule, and workflow documentation.

### Changed
- Windows package version updated to 5.5.0.
- PWA cache updated to `logic-limit-v5.5.0` and now caches `solver.js`.
- Both front ends load the solver foundation without displaying new UI.

### Notes
This release intentionally does not show Deduction Feed information to players. Large boards still require a future optimized solver before real-time UI integration.

## 5.4.0
- Unified statistics for Explorer, Time Attack, and Challenge.
- Classic ranking uses time and guess count.
- Time Attack stage 5 grants 60 additional seconds.
- Later stages increase symbol-pool complexity without increasing answer length at stages 6 and 7.
- Failed-stage history displays the correct answer.
- Escape on the home screen asks whether to quit.
