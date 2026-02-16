# Scanner Privacy Model

`scan.sh` never uploads API keys, secrets, or file contents.

Uploaded fields:
- OpenClaw version
- category scores/status/details
- skill names
- hashed machine ID (or `anonymous` with `--anonymous`)
- timestamp

Use `--local` to disable network upload entirely.
