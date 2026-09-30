# Security

## Reporting

Email **security@flashylabs** — this is the estate's private channel and the
address is to be confirmed before launch; if it does not resolve, open an issue
that says only "security report, please contact me" and a maintainer will reach
out privately. Do not put the finding in the issue.

Include what you found, how to reproduce it, and what you think the impact is.
No formal disclosure timeline is promised; one will be agreed with you rather
than imposed.

## What this repository is

The reserved home of the `trust/1` specification. Today it holds an AAO charter
(JSON), a description, and a dependency-free charter checker
(`vendor-aao-check.mjs`) that reads a JSON file passed on the command line and
makes no network request. It runs no service, holds no data, and has no
dependencies. The authoritative `trust/1` parser lives in
[magician](https://github.com/magician-network/magician), `packages/core`, and
is not in this repository.

## What is a vulnerability here

- The vendored charter checker accepting a charter the aao specification says is
  refused, or the reverse — but the fix for that belongs in the aao repository,
  which this copy is byte-identical to; a divergence here is itself the defect.
- Any input to the checker that causes code execution rather than a refusal.
- A secret, credential or private relationship datum committed to this
  repository or its history.

## What is not

This repository publishes no `trust/1` documents and serves no endpoint. A
charter published on the mesh proves someone can write to that host and nothing
more; it is not an identity or an authorisation. Validate any fragment before
you act on it.
