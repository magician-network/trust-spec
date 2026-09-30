# Contributing

This repository is the **reserved home** of the `trust/1` specification. Today
it holds the AAO charter, the honest description in `README.md`, and a
charter-conformance check. It does **not** yet hold a published spec, schema,
vectors or checker — those live in the reference implementation,
[magician](https://github.com/magician-network/magician), `packages/core`,
where the parser *is* the spec.

## Where a change belongs

- **A change to what a valid `trust/1` document is** belongs in `magician`
  `packages/core/src/edge.ts` first — the parser is the authoritative spec, and
  its test file is the conformance suite. It follows here only when the
  standalone bundle is extracted (see below).
- **A feature** — an emitter, a CLI, a merge behaviour — belongs in `magician`,
  never here. This repository is a specification home, not an implementation.
- **The charter, this description, or the conformance check** belongs here.

## The publish gate

`trust/1` is published as an Apache-2.0 standard — a served schema and a
standalone verifier — only on the **first independent adopter** (the Stage 4
gate stated on Magician's `/roadmap`). Do not add a normative spec, schema,
vector corpus or checker to this repository before that gate opens: a premature
publication breaks the promise the gate exists to keep. When the gate opens, the
bundle is brought over by a **with-history extraction** from `magician`, not
hand-authored here, and any checker is pinned against the parser it came from.

## Never fabricate normative content

There is exactly one authoritative definition of `trust/1` — the parser. A spec
or checker written here that disagrees with it is a second, silently-drifting
standard. If you find a rule the parser gets wrong, fix it in `magician` and say
which document breaks it; do not paper over it with a divergent copy here.

## Running it

Node 22. Nothing to install.

```bash
npm run lint    # node --check over every .mjs
npm test        # node --test test/
```

## What a change needs

- **A test that fails without it.** Not a test that exercises the code; one that
  would have caught the thing.
- **A reason in the commit message.** What was wrong, not what you did.
- **No dependencies.** `node:` builtins only. A pull request adding a
  `dependencies` key or an install step to CI will be declined.
- **Vendored files stay byte-identical.** `vendor-aao-check.mjs` is a copy of the
  aao repository's checker. Re-vendor from `../aao`; never edit it here.

## The licence is not decided here

The licence is Apache-2.0 (holder Flashy Labs), declared once in the estate
register in flashyos `tools/estate-licences.mjs`; that register is the
authority, not a decision made in this repository.
