# Linter Auto Backend

A Node.js Express application built with TypeScript, featuring automated linting, code formatting, and development tools.

## 🚀 Features

- **TypeScript**: Full TypeScript support with strict type checking
- **Express.js**: Fast, unopinionated web framework for Node.js
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit linting
- **Nodemon**: Auto-restart on file changes during development
- **Jade Templates**: Server-side templating engine

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd linter-auto-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Git hooks** (automatically done by the prepare script)
   ```bash
   npm run prepare
   ```

## 🚀 Available Scripts

### Development

- `npm run dev` - Start development server with auto-restart
- `npm start` - Start production server
- `npm run build` - Build TypeScript to JavaScript
- `npm run build:watch` - Build TypeScript with watch mode

### Code Quality

- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm run type-check` - Run TypeScript compiler for type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted

### Git Hooks

- `npm run validate-pr` - Validate pull request descriptions

## 🏗️ Project Structure

```
linter-auto-backend/
├── bin/
│   └── www.ts              # Application entry point
├── routes/
│   ├── index.ts            # Home route
│   └── users.ts            # Users API routes
├── views/
│   ├── error.jade          # Error page template
│   ├── index.jade          # Home page template
│   └── layout.jade         # Layout template
├── scripts/
│   └── validate-pr-description.ts  # PR validation script
├── app.ts                  # Express application setup
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── eslint.config.js        # ESLint configuration
```

## 🌐 API Endpoints

- `GET /` - Home page
- `GET /users` - Users listing

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)

- Strict type checking enabled
- ES2020 target
- CommonJS module system

### ESLint (`eslint.config.js`)

- TypeScript-aware linting
- Prettier integration
- Import sorting

### Prettier

- Consistent code formatting
- Integrated with ESLint

## 🐛 Development Workflow

1. **Start development server**

   ```bash
   npm run dev
   ```

2. **Make code changes** - The server will automatically restart

3. **Before committing** - Code is automatically formatted and linted via Git hooks

4. **Type checking**
   ```bash
   npm run type-check
   ```

## 📝 Code Style

This project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks
- **lint-staged** for staged file processing

All code is automatically formatted and linted before commits.

## 🧪 Testing

Currently, the project includes test files:

- `test-clean.ts`
- `test-linter-errors.ts`

Run tests with:

```bash
npm test
```

## 🚀 Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## Pull Request Validation

This project includes automated PR description validation to ensure all pull requests follow a consistent template structure.

### PR Template

All pull requests must include the following sections:

- **General Description** - Summary of changes and purpose
- **What type of PR is this?** - Checkboxes for Bugfix, Feature, Enhancement, etc.
- **Related Tickets & Documents** - Links to related issues
- **QA Instructions, Screenshots, Recordings** - Testing instructions
- **Did you create or update documentation in the README?** - Documentation updates
- **Environment Variables Updated?** - Environment changes
- **Added/updated tests?** - Test coverage
- **Did you test this feature in all browsers?** - Browser testing
- **Are there any post-deployment tasks we need to perform?** - Deployment tasks
- **Did you read the Code Style and does your PR comply with that?** - Code style compliance

### Validation

The validation automatically extracts all `###` headers from the PR template and checks if they're present in the PR description. It runs on:

- **GitHub Actions**: Every PR creation/update via `.github/workflows/pr-validation.yml`
- **Local Development**: Use `npm run validate-pr "<PR_DESCRIPTION>"` to test locally

**Blocking Behavior:**

- ❌ **Failed validation**: Blocks merge button, adds failure comment with missing sections
- ✅ **Passed validation**: Allows merge, adds success comment
- 📝 **Automatic comments**: Detailed feedback on what's missing or confirmation of success

### Setup

1. **Branch Protection**: Configure branch protection rules to require the "PR Description Validation" status check
2. **Template**: The PR template is automatically loaded from `.github/pull_request_template.md`
3. **Local Testing**: Test your PR description locally before creating the PR

### Example Usage

```bash
# Test a PR description locally
npm run validate-pr "### General Description
This PR adds user authentication features.

### What type of PR is this?
- [x] Feature
- [ ] Bugfix

### Related Tickets & Documents
- Closes #123

### QA Instructions, Screenshots, Recordings
Test the login flow with different user types.

### Did you create or update documentation in the README?
- [ ] No

### Environment Variables Updated?
- [ ] No

### Added/updated tests?
- [x] Yes

### Did you test this feature in all browsers?
- [x] Chrome
- [x] Firefox
- [ ] Safari
- [ ] Edge
- [ ] No, Here is WHY: Limited testing resources

### Are there any post-deployment tasks we need to perform?
None

### Did you read the Code Style and does your PR comply with that?
- [x] Yes"
```
