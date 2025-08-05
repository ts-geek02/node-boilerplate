#!/usr/bin/env node

/**
 * PR Description Validator
 * Validates that PR descriptions follow the required template structure
 */

import fs from 'fs';
import path from 'path';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  missingHeaders?: string[];
}

function extractHeadersFromTemplate(): string[] {
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

    return headers.map((header: string) => header.trim());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Error reading template file:', (error as Error).message);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
}

function validatePRDescription(prBody: string): ValidationResult {
  if (!prBody || prBody.trim() === '') {
    return {
      isValid: false,
      errors: [
        'PR description is empty. Please provide a description following the template.',
      ],
    };
  }

  const requiredHeaders = extractHeadersFromTemplate();
  const errors: string[] = [];
  const missingHeaders: string[] = [];

  // Debug: Print the headers we're looking for
  // eslint-disable-next-line no-console
  console.log('🔍 Required headers from template:');
  requiredHeaders.forEach((header: string) => {
    // eslint-disable-next-line no-console
    console.log(`   • ${header}`);
  });

  // Check if each required header is present in the PR description
  for (const header of requiredHeaders) {
    // Simple string inclusion check
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

function printResults(results: ValidationResult): void {
  // eslint-disable-next-line no-console
  console.log('\n📋 PR Description Validation Results\n');

  if (results.isValid) {
    // eslint-disable-next-line no-console
    console.log('✅ PR description is valid!');
  } else {
    // eslint-disable-next-line no-console
    console.log('❌ PR description validation failed:');
    results.errors.forEach((error: string) => {
      // eslint-disable-next-line no-console
      console.log(`   • ${error}`);
    });
  }

  if (results.missingHeaders && results.missingHeaders.length > 0) {
    // eslint-disable-next-line no-console
    console.log('\n📝 Missing required sections:');
    results.missingHeaders.forEach((header: string) => {
      // eslint-disable-next-line no-console
      console.log(`   • ${header}`);
    });
  }

  // eslint-disable-next-line no-console
  console.log('\n📖 Template reference: .github/pull_request_template.md');
}

// Main execution
const prBody = process.argv[2] || process.env['PR_BODY'] || '';

if (!prBody) {
  // eslint-disable-next-line no-console
  console.error(
    '❌ No PR body provided. Please provide the PR description as an argument or set PR_BODY environment variable.'
  );
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

const results = validatePRDescription(prBody);
printResults(results);

// Output missing sections for GitHub Actions
if (!results.isValid && results.missingHeaders) {
  const missingSectionsText = results.missingHeaders
    .map((header: string) => `- ${header}`)
    .join('\n');
  // eslint-disable-next-line no-console
  console.log(`MISSING_SECTIONS="${missingSectionsText}"`);
}

if (!results.isValid) {
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

export { validatePRDescription };
