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
Version 5.6.0 adds Logic Lab as the final mode update. Each round draws one Information Rule, one Discovery Rule, and one Challenge Rule.

Logic Lab uses the existing answer generator, judge, input flow, notes, save handling, and result flow. Only Logic Lab answer generation is filtered by the active Information Rule. Discovery Rules query the existing Deduction Engine only after their stated guess threshold.

No Rule Engine, registry, factory, plugin system, modular rewrite, story layer, or RPG system is introduced.

## Supported distributions
- Windows Electron project
- iPhone/mobile PWA suitable for GitHub Pages

Both distributions remain behaviorally aligned and share the same game and solver code.
