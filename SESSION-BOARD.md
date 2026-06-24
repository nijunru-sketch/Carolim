# Session Board

This file is the shared coordination layer for parallel page work.

## Operating Rules

- One dispatcher session owns integration and conflict resolution.
- One visible session should own one page.
- Do not hide page work inside subagents when the intent is to keep progress visible.
- If a page gets stuck, open a fresh visible session for that page instead of waiting on a stalled one.
- Finalized page work must be handed back to the dispatcher with changed files, verification, and any follow-up notes.

## Current Ownership

| Surface | Status | Owner |
| --- | --- | --- |
| `home` | frozen | dispatcher |
| `loading` | frozen | dispatcher |
| `career-zuijiao` | frozen | dispatcher |
| `career-moody` | in progress | visible page session |
| `why cork` | in progress | visible page session |
| `Contact me` | pending | new visible session |
| `future pages` | pending | new visible session per page |

## Handoff Format

When a page session finishes, send back:

1. Changed file paths
2. Summary of what changed
3. Verification performed
4. Open risks or follow-up items
5. Anything that depends on another page
