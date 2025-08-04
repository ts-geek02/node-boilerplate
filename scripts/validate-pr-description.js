#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

/**
 * PR Description Validator
 * Validates that PR descriptions follow the required template structure
 */

const fs = require('fs');
const path = require('path');

function extractHeadersFromTemplate() {
  try {
    const templatePath = path.join(
      __dirname,
      '..',
      '.github',
      'pull_request_template.md'
    );
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // Extract all ### headers from the template
    const headerRegex = /^### .+$/gm;
    const headers = templateContent.match(headerRegex) || [];

    return headers.map(header => header.trim());
  } catch (error) {
    console.error('❌ Error reading template file:', error.message);
    process.exit(1);
  }
}

function validatePRDescription(prBody) {
  if (!prBody || prBody.trim() === '') {
    return {
      isValid: false,
      errors: [
        'PR description is empty. Please provide a description following the template.',
      ],
    };
  }

  const requiredHeaders = extractHeadersFromTemplate();
  const errors = [];
  const missingHeaders = [];

  // Check if each required header is present in the PR description
  for (const header of requiredHeaders) {
    if (!prBody.includes(header)) {
      missingHeaders.push(header);
      errors.push(`Missing required section: ${header}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    missingHeaders,
  };
}

function printResults(results) {
  console.log('\n📋 PR Description Validation Results\n');

  if (results.isValid) {
    console.log('✅ PR description is valid!');
  } else {
    console.log('❌ PR description validation failed:');
    results.errors.forEach(error => {
      console.log(`   • ${error}`);
    });
  }

  if (results.missingHeaders && results.missingHeaders.length > 0) {
    console.log('\n📝 Missing required sections:');
    results.missingHeaders.forEach(header => {
      console.log(`   • ${header}`);
    });
  }

  console.log('\n📖 Template reference: .github/pull_request_template.md');
}

// Main execution
const prBody = process.argv[2] || process.env.PR_BODY || '';

if (!prBody) {
  console.error(
    '❌ No PR body provided. Please provide the PR description as an argument or set PR_BODY environment variable.'
  );
  process.exit(1);
}

const results = validatePRDescription(prBody);
printResults(results);

// Output missing sections for GitHub Actions
if (!results.isValid && results.missingHeaders) {
  const missingSectionsText = results.missingHeaders
    .map(header => `- ${header}`)
    .join('\n');
  console.log(`::set-output name=missing_sections::${missingSectionsText}`);
  console.log(`MISSING_SECTIONS="${missingSectionsText}"`);
}

if (!results.isValid) {
  process.exit(1);
}

module.exports = { validatePRDescription };