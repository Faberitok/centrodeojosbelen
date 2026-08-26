<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan at:
`specs/001-landing-page/plan.md`
<!-- SPECKIT END -->

## Available Skills

The following skills are installed in `.github/skills/` and must be used when their domain applies:

| Skill | Path | When to use |
|-------|------|-------------|
| `frontend-design` | `.github/skills/frontend-design/SKILL.md` | Building any UI component, section, page, or layout. Enforces production-grade design quality and avoids generic AI aesthetics. |
| `landing-page-copywriter` | `.github/skills/landing-page-copywriter/SKILL.md` | Writing or reviewing any copy: headlines, CTAs, section text, value propositions. Uses PAS/AIDA/StoryBrand frameworks. |
| `next-best-practices` | `.github/skills/next-best-practices/SKILL.md` | Any Next.js code: RSC boundaries, async APIs, fonts, images, metadata, route handlers, error handling, bundling. |
| `speckit-git-feature` | `.github/skills/speckit-git-feature/SKILL.md` | Creating a new feature branch before starting work. |
| `speckit-git-commit` | `.github/skills/speckit-git-commit/SKILL.md` | Committing changes after a speckit command completes. |
| `speckit-git-validate` | `.github/skills/speckit-git-validate/SKILL.md` | Validating the current branch name follows conventions. |
| `speckit-git-initialize` | `.github/skills/speckit-git-initialize/SKILL.md` | Initializing the Git repo if not already done. |
| `speckit-git-remote` | `.github/skills/speckit-git-remote/SKILL.md` | Detecting the GitHub remote URL for integrations. |

**Rule**: Before generating any frontend code, read `frontend-design` and `next-best-practices`. Before writing any copy, read `landing-page-copywriter`. Always read the skill file in full before applying it.

## Project Documentation

All project context lives in `docu/`:
- `docu/constitution.md` — non-negotiable development rules
- `docu/requirements.md` — what to build and why, including sections, palette, typography, and asset placeholders
- `docu/plan.md` — technical stack, design tokens, component structure, env vars, and open decisions

Read these files before planning or implementing anything.
