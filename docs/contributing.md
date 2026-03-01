# Contributing

Thanks for your interest in contributing.

## Development setup

1. Fork and clone the repo.
2. Run `npm install` at the root.
3. Copy `.env.example` to `.env` and set any required variables.
4. Run the API and web app (see [Getting started](getting-started.md)).

## Code quality

- **Lint**: We use ESLint. Run `npm run lint` from the root. Fix auto-fixable issues with `npm run lint:fix` in each app or the root.
- **Format**: We use Prettier. Run `npm run format` to format, `npm run format:check` to check.
- **Pre-commit**: Husky runs lint-staged on commit. Staged JS/TS/JSON/MD files are linted and formatted; fix any errors before committing.

## Pull requests

- Open a PR from a feature branch.
- Keep changes focused; link any related issues.
- Ensure `npm run lint` and `npm run build` pass.

## Questions

Open a GitHub Discussion or an issue.
