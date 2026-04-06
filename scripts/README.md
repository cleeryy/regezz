# Test Case Validation System

This directory contains scripts to validate and fix test cases for regex exercises.

## Problem

Test cases in lessons and practice problems can become outdated or incorrect when:
- The regex pattern changes
- Test case expectations are manually added without proper testing
- Edge cases are misunderstood

## Solution

Automated validation system that:
1. **Validates** all test cases against their regex patterns
2. **Reports** errors with clear details
3. **Prevents** bad test cases from being committed (via git hooks)
4. **Runs** automatically in CI/CD pipeline

## Usage

### Validate all test cases
```bash
npm run validate
```

This runs `scripts/validate-exercises.ts` and reports any test cases where the `shouldMatch` value doesn't match what the regex actually produces.

### View detailed errors
```bash
npm run validate:fix
```

This runs `scripts/fix-test-cases.ts` in dry-run mode, showing detailed information about each error including the expected vs actual results.

## How It Works

1. **`validate-exercises.ts`** - Validates all test cases and reports pass/fail counts
   - Loads all lessons and problems
   - Tests each test case input against its regex pattern
   - Reports any mismatches
   
2. **`fix-test-cases.ts`** - Detailed error reporting and suggested fixes
   - Shows each error in detail
   - Provides pattern, input, expected, and actual values
   - Can be used to identify what needs manual fixing

## Git Hooks

A pre-commit hook is installed at `.git-hooks/pre-commit` that:
- Runs validation before every commit
- Blocks commits if test cases are invalid
- Shows clear error messages

The hook is automatically used by git (configured via `git config core.hooksPath .git-hooks`).

## CI/CD

GitHub Actions workflow at `.github/workflows/validate-test-cases.yml`:
- Runs on every push/PR to main/master
- Validates test cases automatically
- Fails the build if test cases are invalid
- Only runs when data files change (efficient)

## Adding New Lessons/Problems

When adding new lessons or problems:

1. Write the regex pattern
2. Add test cases with your expected `shouldMatch` values
3. Run `npm run validate` to check your work
4. Fix any incorrect expectations
5. Commit (the pre-commit hook will validate again)

## Common Errors

### "Expected: false, Got: true"
The regex matches more than expected. Common causes:
- Pattern matches substrings (not anchored with `^` and `$`)
- Pattern is too permissive
- Test case expectation is wrong

### "Expected: true, Got: false"  
The regex doesn't match when expected. Common causes:
- Pattern is too restrictive
- Missing flags (case-insensitive, etc.)
- Test case expectation is wrong

## Files

- `validate-exercises.ts` - Main validation script
- `fix-test-cases.ts` - Detailed error reporter
- `../.git-hooks/pre-commit` - Pre-commit hook
- `../.github/workflows/validate-test-cases.yml` - CI workflow
