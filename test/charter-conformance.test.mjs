// The AAO charter passes the real checker, not only its shape.
//
// This repository's only executable normative claim today is that its charter
// is a valid AAO charter document. A shape check cannot see a cross-reference
// (a role that works in a repository the charter does not declare); the
// vendored static half of @flashyos/aao can, and it imports nothing but node:
// builtins, so it runs here with nothing installed.
//
// `vendor-aao-check.mjs` is a byte-identical copy of the aao repository's
// `vendor-aao-check.mjs`. Re-vendor, never edit; the drift test below compares
// the copy against a checkout beside this repository and reports UNKNOWN —
// never a pass — when there is nothing to compare against.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateCharterDocument, conform } from '../vendor-aao-check.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const VENDORED = 'vendor-aao-check.mjs'
const SOURCE = join(ROOT, '..', 'aao', VENDORED)
const CHARTER_PATH = join(ROOT, 'flashyos.roles.json')

const loadCharter = () => JSON.parse(readFileSync(CHARTER_PATH, 'utf8'))

test('the committed charter validates as an AAO charter document — zero issues', () => {
  const issues = validateCharterDocument(loadCharter())
  assert.deepEqual(
    issues,
    [],
    `flashyos.roles.json fails aao validate:\n  ${issues.map((i) => `${i.path}: ${i.message}`).join('\n  ')}`,
  )
})

test('every static conformance question passes; the live ones are deferred, never claimed', () => {
  const report = conform(loadCharter())
  assert.ok(
    report.ok,
    `aao conform failed: ${JSON.stringify(report.issues)} ${JSON.stringify(report.results.filter((r) => r.status === 'fail'))}`,
  )
  for (const r of report.results) {
    assert.ok(
      r.status === 'pass' || (r.kind === 'live' && r.status === 'deferred'),
      `${r.id} is ${r.status}`,
    )
  }
})

test('every worksIn names a declared repository, and every repository has an owning role', () => {
  // The exact fault the checker catches on a mesh charter, pinned by name so it
  // reads as a rule and not as a line in a report somebody has to re-run.
  const c = loadCharter()
  const repos = new Set(c.repositories.map((r) => r.name))
  for (const role of c.roles) {
    for (const w of role.worksIn ?? []) {
      assert.ok(repos.has(w), `role "${role.name}" works in "${w}", which is not a declared repository`)
    }
  }
  const covered = new Set(c.roles.flatMap((r) => r.worksIn ?? []))
  for (const r of repos) assert.ok(covered.has(r), `no role works in "${r}"`)
  // And the declared repository is the real one.
  assert.ok(
    c.repositories.some((r) => r.url === 'github.com/magician-network/trust-spec'),
    'the charter does not name the repository it lives in',
  )
})

test('the vendored checker imports nothing but node: builtins', () => {
  const src = readFileSync(join(ROOT, VENDORED), 'utf8')
  for (const [, spec] of src.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
    assert.ok(spec.startsWith('node:'), `${VENDORED} imports "${spec}"`)
  }
})

test('the vendored checker matches the aao source byte for byte, when it is beside us', (t) => {
  if (!existsSync(SOURCE)) {
    t.diagnostic(`../aao is not checked out beside this repository — ${VENDORED} drift status UNKNOWN, not current`)
    return
  }
  assert.ok(
    readFileSync(join(ROOT, VENDORED)).equals(readFileSync(SOURCE)),
    `${VENDORED} has drifted from ../aao/${VENDORED} — re-vendor, never edit`,
  )
})
