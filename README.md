# trust-spec — the reserved home of `trust/1`

`trust/1` is the Magician network's **edge format**: a consented, decaying,
multidimensional edge between two people. LinkedIn knows that Michael knows
Sarah; a `trust/1` edge knows what that connection is made of — which domains
she is authoritative in and on whose word, how strong the working relationship
has *measured*, what events the claim stands on, and how long ago anyone last
renewed it.

This repository is the **reserved standalone home** for that format's
specification, schema, conformance corpus and dependency-free checker. Today it
holds the AAO charter, this description, and a charter-conformance check — it
does **not** yet hold a published spec bundle, and this file says plainly why,
and where the format actually lives now.

## Where `trust/1` lives today

The authoritative specification of `trust/1` is its **parser**, in
[`magician`](https://github.com/magician-network/magician) —
`packages/core/src/edge.ts`. The parser *is* the spec, and its test file is the
conformance suite. There is a machine-readable structural view beside it —
`schemas/trust-1.schema.json` (JSON Schema, necessary-but-not-sufficient) and
`schemas/vectors/trust-1.vectors.json` (the conformance corpus) — held next to
the parser and run through it by `packages/core/src/formats.test.ts`.

A JSON Schema cannot express the semantic refusals below; only the parser can.
So there is **no dependency-free standalone checker** (`vendor-trust.mjs`) to
copy here yet: the checker is TypeScript today, and this repository refuses to
fabricate a second one. Fabricating a spec or a checker that disagrees with the
parser would create exactly the drift the estate's vendoring rules exist to
prevent — two implementations of one rule, silently disagreeing about the field
somebody just changed.

## The publish gate — why the bundle is not here yet

`trust/1` (and `introduction/1`) are **gated**: they are published as Apache-2.0
standards — a served schema plus a standalone verifier — only on the **first
independent adopter**, the Stage 4 gate stated on Magician's `/roadmap`. Until
then the schema and vectors are *held* beside the parser, not served, and the
registry marks the format `open: false`. Opening the gate is a decision, not a
file.

Publishing the normative bundle into this repository before that adopter exists
would break that promise. So this repository is a **reservation**, honestly
empty of normative content, rather than a premature publication.

## What `trust/1` refuses — the format, described honestly

These are the parser's rules, quoted from `edge.ts` and `registers.ts` in
`magician`. They are described here for a reader without that checkout; they are
**not** a normative restatement, and where this prose and the parser disagree,
the parser wins.

**Private by default.** `tier` defaults to `private`, and a private edge is
indistinguishable from a missing one to everybody but its owner — existence is
itself relationship data. `tier` is one of `private · circle · public`; absent
means private, never public.

**Decay is derived, never accepted.** There is no `expires` field. A document
carrying `expires`, `expiry`, `expiresAt` or `ttl` fails the parse. Decay is
derived from `renewed`; a caller who could write their own expiry could keep an
edge fresh without anyone re-checking the fact, which is the one way to defeat
decay.

**The parser refuses; it does not guess.** Unknown fields (unless `x-`
prefixed), out-of-range strengths, and unlabeled numbers are parse failures with
the fix in the message. A store that half-loads hides exactly the half that
dropped.

**A basis is required exactly when a claim is made.** A rated strength or a
shared (`circle`/`public`) edge is a claim and must name at least one
`provenance` event it stands on — one of `transaction · introduction · invested
· worked-with · hearsay`. A private, `unrated` edge claims nothing, so it needs
no provenance and no number: a name-only add is a legal edge, and the moment its
owner rates it or shares it, the basis becomes required.

**Registers everywhere, and a combination is as weak as its weakest input.**
Every magnitude says how it is known — `measured` (from sealed outcomes or
recorded behaviour), `asserted` (somebody said so, and we can name who),
`estimated` (inferred), or `unrated` (recorded to exist, no magnitude claimed,
value `null`). `unrated` is the honest floor and the opposite of a defaulted
number, not a softer version of one. There is no unlabeled number.

**Hearsay caps at estimated; stale edges cap at estimated.** An edge that
stands on hearsay alone cannot claim better than `estimated`, whatever its
author typed. An edge nobody has renewed in over a year (`STALE_AFTER_DAYS =
365`) still routes — a year-old relationship is a lead, not a lie — but
contributes at no better than `estimated`, so a path built on stale edges says
so in its own register. These thresholds are constants, not config: a caller who
could widen them could defeat decay one setting at a time.

## What this repository holds

- `flashyos.roles.json` — the AAO charter: five roles (`canon`, `conformance`,
  `release`, `adoption`, `review`), one standing job each. It validates against
  the estate's real dependency-free checker with **zero issues**, and
  `test/charter-conformance.test.mjs` pins that.
- `directory.fragment.json` — this org's `directory/1` node: the org, one agent
  per role, and the accountable person.
- `MESH.md` — how this property sits on the FlashyOS mesh.
- `vendor-aao-check.mjs` — a **byte-identical** copy of the aao repository's
  charter checker. Re-vendor from `../aao`, never edit; the drift test reports
  UNKNOWN — never a pass — when that checkout is not beside this one.

## Commands

Node 22. Nothing to install — this repository has no dependencies.

```bash
npm run lint                                      # node --check over every .mjs
npm test                                          # node --test test/
node vendor-aao-check.mjs validate flashyos.roles.json   # 0 issues
```

## Roadmap — the next real step

The estate register in `flashyos` `tools/estate-licences.mjs` already names this
repository as the home of "trust/1 — the vendor-neutral spec, schema, vectors
and checker". Making that true is a **with-history extraction** of the standalone
bundle out of `magician/packages/core` — the same `git subtree split` path the
estate uses to graduate a project with its real commit history — carried out
**when the publish gate opens** (the first independent adopter), never before.
A checker extracted here must be pinned against the parser it came from, the way
every vendored checker in the estate is pinned against its canon.

## Licence

Licensed under Apache-2.0 (holder Flashy Labs); the estate register in flashyos
`tools/estate-licences.mjs` is the authority.
