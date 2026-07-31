# LOGIC LIMIT — Project Guide

## Product identity
LOGIC LIMIT is a pure deduction game built around the classic 1A2B rule. Its identity is logical verification: each guess should reduce uncertainty and help the player establish facts.

The project should not drift toward story, character, crime-scene, RPG, or immersion-first design. New systems must strengthen deduction rather than decorate it.

## Core design principles
1. Preserve fixed, understandable judging rules.
2. Reward deliberate information gathering instead of random guessing.
3. Never reveal information that cannot be proven from the player's visible guess history.
4. Preserve Classic, Explorer, Challenge, Time Attack, and Trial behavior.
5. Keep additions small and compatible with the existing single-file game structure.

## Current release
Version 5.6.1 redesigns Logic Lab around three interacting constraints: an Answer Specification, an Input Specification, and an Experiment Procedure. The answer is generated to satisfy both structural specifications, while the temporary procedure changes how the opening guesses must be constructed.

Logic Lab continues to use the existing answer generator, judge, input flow, notes, save handling, and result flow. Rule validation is kept directly in `index.html`; invalid Logic Lab guesses are rejected before the existing judge runs and do not consume an attempt.

No Rule Engine, registry, factory, plugin system, modular rewrite, story layer, or RPG system is introduced.

## Supported distributions
- Windows Electron project
- iPhone/mobile PWA suitable for GitHub Pages

Both distributions remain behaviorally aligned and share the same game and solver code.
