# Node Boilerplate

A Node.js boilerplate with Express, TypeScript, and modern development tools.

## Features

- Express.js server with TypeScript
- ESLint and Prettier for code quality
- Husky for Git hooks
- GitHub Actions for CI/CD
- PR description validation
- Branch protection rules

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Pull Request Validation

This repository includes automatic PR description validation to ensure all pull requests follow the required template.

### Setting Up Branch Protection

To prevent merging PRs that don't meet the description requirements, you need to set up branch protection rules manually:

#### Manual Setup (Required)

1. Go to your repository Settings > Branches
2. Add rule for main/master branch
3. Enable "Require status checks to pass before merging"
4. Add "validate-pr-description" as a required status check
5. Enable "Require pull request reviews before merging"
6. Set required approving reviews to 1
7. Enable "Dismiss stale PR approvals when new commits are pushed"
8. Save changes

#### What This Does

- ✅ Requires "validate-pr-description" status check to pass before merging
- ✅ Requires 1 approving review before merging
- ✅ Dismisses stale PR approvals when new commits are pushed
- ✅ Prevents force pushes and branch deletion

### PR Description Template

All pull requests must include the following sections:

- **General Description**: Summary of changes and purpose
- **PR Type**: Bugfix, Feature, Enhancement, Documentation, Chore, or Refactor
- **Related Tickets & Documents**: Links to related issues
- **QA Instructions**: Testing instructions and screenshots
- **Documentation Updates**: Whether README was updated
- **Environment Variables**: Any environment variable changes
- **Tests**: Whether tests were added/updated
- **Browser Testing**: Which browsers were tested
- **Post-deployment Tasks**: Any tasks needed after deployment
- **Code Style Compliance**: Confirmation of code style adherence

### Validation Process

1. When a PR is created or updated, the validation workflow runs
2. It checks if the PR description includes all required sections
3. If validation fails:
   - A comment is posted explaining what's missing
   - The PR cannot be merged until the description is updated
4. If validation passes:
   - A success comment is posted
   - The PR can be merged (subject to other requirements)

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass: `npm run lint && npm run format:check`
4. Create a pull request with a proper description following the template
5. Wait for validation to pass
6. Get approval from a reviewer
7. Merge when ready

## License

MIT
