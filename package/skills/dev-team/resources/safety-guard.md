# Safety Guard — Destructive Command Blocking

All team members are bound by this safety guard. No exceptions. No overrides by any role — only the user can authorize a blocked command.

## Blocked Command Categories

### 1. File Destruction
- `rm -rf /`, `rm -rf *`, `rm -r /` or any recursive delete targeting root or broad paths
- `del /s /q` (Windows equivalent)
- Deleting entire project directories or critical system paths

### 2. Git Destructive
- `git push --force` / `git push -f` (use `--force-with-lease` if needed, with user approval)
- `git reset --hard` (discards uncommitted work)
- `git clean -fd` (deletes untracked files permanently)
- `git branch -D` (force-deletes branches without merge check)
- `git checkout .` / `git restore .` (discards all working changes)
- `git rebase` on shared/remote branches

### 3. Database Destructive
- `DROP TABLE`, `DROP DATABASE`, `DROP SCHEMA`
- `TRUNCATE TABLE`
- `DELETE FROM` without a `WHERE` clause
- `ALTER TABLE ... DROP COLUMN` on production data
- Any migration that destroys data without a rollback path

### 4. System-Level
- `chmod 777` (world-writable permissions)
- `chmod -R` on broad paths
- `kill -9` on unknown processes
- `mkfs` (formats drives)
- `shutdown`, `reboot`
- Running as root/admin when not necessary

### 5. Secrets & Config Overwrite
- Overwriting `.env`, `.env.production`, `credentials.json`, `secrets.yaml`
- Hardcoding API keys, tokens, passwords, or connection strings in source code
- Committing files matching: `.env*`, `*secret*`, `*credential*`, `*.pem`, `*.key`

## Secret Detection

All developer roles (Senior Dev, Junior Devs) must scan their own code for hardcoded secrets before handoff. The Tester's security tests serve as a second layer.

### Patterns to Scan For
| Pattern | Examples |
|---|---|
| **API keys** | Strings matching `sk-`, `pk-`, `api_key`, `apiKey`, `API_KEY` followed by a literal value |
| **Tokens** | `token = "..."`, `bearer ...`, `auth_token`, `access_token` with inline values |
| **Passwords** | `password = "..."`, `passwd`, `pwd`, `secret` assigned to string literals |
| **Connection strings** | `mongodb://user:pass@`, `postgres://`, `mysql://` with embedded credentials |
| **Private keys** | `-----BEGIN RSA PRIVATE KEY-----`, `-----BEGIN EC PRIVATE KEY-----` |
| **AWS credentials** | `AKIA...` (access key ID pattern), `aws_secret_access_key` with literal value |
| **Generic high-entropy strings** | Long base64/hex strings assigned to auth-related variable names |

### Correct Approach
Instead of hardcoding secrets, code must use:
- Environment variables (`process.env.API_KEY`, `os.environ["API_KEY"]`)
- Config files excluded from version control (`.env` files in `.gitignore`)
- Secret management services (vault, cloud provider secret managers)
- Placeholder values with clear comments (e.g. `"YOUR_API_KEY_HERE"`)

### If a Secret Is Detected
1. **Do NOT commit the code**
2. Replace the hardcoded secret with an environment variable reference
3. Add the appropriate env var to a `.env.example` file (with a placeholder, not the real value)
4. Log the finding in the sprint output

## Protected Config Files

Linter, formatter, and compiler strictness configs must not be weakened to make code pass. These files are **read-only for Junior Devs** (Phase 3d). Only the Senior Dev may modify them, with justification logged in the sprint output.

**Protected patterns:**
- Linters: `.eslintrc*`, `.flake8`, `.pylintrc`, `.stylelintrc*`, `tslint.json`, `.golangci.yml`, `clippy.toml`
- Formatters: `.prettierrc*`, `.editorconfig`, `rustfmt.toml`, `.clang-format`
- Compiler strictness: `tsconfig*.json` (strict fields), `pyproject.toml` (tool.mypy/ruff/pylint sections)
- Static analysis: `sonar-project.properties`, `.codeclimate.yml`

**If a Junior Dev encounters a config issue:**
1. Do NOT edit the config file
2. Flag it as a question in their output
3. Senior Dev evaluates during code review (Phase 3e) and makes the change if justified

## When a Blocked Command Is Needed

If any role determines that a blocked command is genuinely necessary:

1. **Do NOT execute it**
2. **Escalate to Manager** with:
   - What command is needed and why
   - What the impact/risk is
   - What alternatives were considered
3. **Manager presents to user** at the next checkpoint (or immediately if mid-sprint)
4. **User explicitly authorizes** the specific command before it runs
5. **Log the authorization** in the session state file under `Safety Overrides`

## Production Risk Flag

During Phase 1 (Manager Intake), the Manager assesses whether the task touches production systems:

| Risk Level | Criteria | Guard Behavior |
|---|---|---|
| **NONE** | Greenfield project, local-only, no deployments | Standard guard |
| **LOW** | Existing codebase, no production deployment in scope | Standard guard |
| **MEDIUM** | Task modifies code that runs in production | Standard guard + Manager warns at CP1 |
| **HIGH** | Task involves direct production access (DB, infra, deployments) | Standard guard + all write operations require explicit user approval at CP3 |

The risk level is recorded in the session state and displayed at Checkpoint 1.
