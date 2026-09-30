// This repository is an HONEST reservation: it says where trust/1 actually
// lives, that it is gated, and it carries no fabricated normative bundle. These
// are the claims that keep it honest, pinned so a later change cannot quietly
// turn a reservation into a premature or fabricated publication.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (f) => readFileSync(join(ROOT, f), 'utf8')

test('the LICENSE is the Apache-2.0 text with the estate-registered holder', () => {
  const license = read('LICENSE')
  assert.match(license, /Apache License/, 'LICENSE is not the Apache-2.0 text')
  assert.match(license, /Copyright 2026 Flashy Labs/, 'LICENSE does not name the estate-registered holder')
})

test('the README states the licence in the exact estate words', () => {
  const readme = read('README.md')
  assert.match(
    readme,
    /Licensed under Apache-2\.0 \(holder Flashy Labs\); the estate register in flashyos\s+`tools\/estate-licences\.mjs` is\s+the authority\./,
    'README does not carry the estate licence line',
  )
})

test('the README is honest about where trust/1 lives and the publish gate', () => {
  const readme = read('README.md')
  // Canon is the parser in magician, not a bundle here.
  assert.match(readme, /packages\/core\/src\/edge\.ts/, 'README does not point at the authoritative parser')
  assert.match(readme, /parser \*is\* the spec/, 'README does not say the parser is the spec')
  // The gate is stated, not silently ignored.
  assert.match(readme, /publish gate/i, 'README does not name the publish gate')
  assert.match(readme, /first independent adopter/i, 'README does not state the gate condition')
  // The next step is an extraction with history, not a hand-authored spec.
  assert.match(readme, /with-history extraction/i, 'README does not describe the extraction path')
})

test('no fabricated trust/1 spec bundle is committed', () => {
  // The publish gate is not open. A standalone checker, a served schema or a
  // vector corpus appearing here would be a premature publication — and the one
  // thing this reservation must never do is fabricate normative content. When
  // the gate opens, the bundle is EXTRACTED from magician with its history; a
  // file added here by hand is what this test refuses.
  for (const forbidden of ['vendor-trust.mjs', 'SPEC.md']) {
    assert.ok(!existsSync(join(ROOT, forbidden)), `${forbidden} present — the publish gate is not open; extract from magician, do not author here`)
  }
  assert.ok(!existsSync(join(ROOT, 'schema')), 'a schema/ directory is present — the trust/1 schema is held in magician until the gate opens')
  assert.ok(!existsSync(join(ROOT, 'vectors')), 'a vectors/ directory is present — the trust/1 corpus is held in magician until the gate opens')
})
