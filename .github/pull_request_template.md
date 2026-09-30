## What was wrong

<!-- The reason, not the diff. -->

## Where this change belongs

This repository is the reserved home of `trust/1`; the authoritative parser
lives in `magician` (`packages/core`), and the format is under a publish gate.
Tick what applies:

- [ ] This changes what a valid `trust/1` document is — it was made in
      `magician` `packages/core/src/edge.ts` first, and this PR only follows a
      landed extraction. (Link: )
- [ ] This is the charter, the description, or the conformance check — it
      belongs here.
- [ ] This does **not** add a fabricated spec, schema, vector corpus or checker
      ahead of the publish gate (first independent adopter).

## Checks

- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] no dependency or install step was added; vendored files are byte-identical
      to their source
- [ ] the licence is unchanged (Apache-2.0, holder Flashy Labs, per the estate
      register)
- [ ] no figure or adoption claim was added that a test does not assert

## Branch measured

<!-- `git symbolic-ref --short refs/remotes/origin/HEAD` and the branch you ran the suite on. -->
