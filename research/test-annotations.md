# Playwright Test Annotations — Complete Guide

## From Beginner to Advanced + Interview Preparation

> Technology: Playwright Test with TypeScript

## 1. What Are Test Annotations?

Annotations are metadata or test controls used to modify, describe, or organize Playwright test execution.

Common built-in annotations include:

- `test.skip()`
- `test.fixme()`
- `test.fail()`
- `test.slow()`

Related Playwright test-runner features include:

- `test.describe()`
- `test.describe.configure()`
- `test.use()`
- `test.setTimeout()`
- `test.step()`
- `test.info()`
- Tags
- Custom annotations

The key idea is:

> Annotations communicate test intent and provide execution control or metadata without changing the core business logic of the test.

---

## 2. Why Do We Need Annotations?

Real automation suites contain tests that have different execution requirements.

Examples:

- A feature is not available in a particular environment.
- A test is known to be broken and needs maintenance.
- A product defect causes a test to fail.
- A workflow legitimately takes longer.
- A test belongs to a particular regression category.
- A test needs an owner, requirement ID, or defect ID.

Instead of commenting out a test:

```ts
// test('payment test', async ({ page }) => {
//   ...
// });
```

use:

```ts
test.skip('payment test', async ({ page }) => {
  // ...
});
```

This keeps the test visible and lets Playwright report it as skipped.

---

# 3. Basic Playwright Test

```ts
import { test, expect } from '@playwright/test';

test('verify login', async ({ page }) => {
  await page.goto('https://example.com');

  await expect(page).toHaveTitle(/Example/);
});
```

Annotations and related test-runner features add behavior or metadata around this test.

---

# 4. test.skip()

`test.skip()` prevents a test from executing.

```ts
test.skip('verify payment', async ({ page }) => {
  await page.goto('/payment');

  await expect(page.getByText('Payment Successful')).toBeVisible();
});
```

### Typical use cases

Use `test.skip()` when:

- A test is temporarily not applicable.
- A feature is disabled.
- A browser does not support the feature.
- An environment does not contain the feature.
- You intentionally want to exclude the test.

Do not use it simply to hide an unexplained failure.

---

# 5. Conditional test.skip()

```ts
test('verify mobile menu', async ({ page, browserName }) => {
  test.skip(
    browserName === 'firefox',
    'Mobile menu is not supported in this project'
  );

  await page.goto('/');
});
```

The test is skipped only when the condition is true.

---

# 6. Describe-Level Skip

You can skip an entire group.

```ts
test.describe.skip('Payment Tests', () => {

  test('credit card payment', async ({ page }) => {
    // ...
  });

  test('debit card payment', async ({ page }) => {
    // ...
  });

});
```

This is useful when an entire feature is temporarily unavailable.

---

# 7. test.fixme()

`test.fixme()` indicates that a test currently needs to be fixed.

```ts
test.fixme('verify file upload', async ({ page }) => {
  await page.goto('/upload');

  // Known broken test
});
```

The test does not execute.

### test.skip() vs test.fixme()

`test.skip()` communicates:

> Do not run this test.

`test.fixme()` communicates:

> This test needs to be fixed.

Use `fixme` when the automation itself needs correction.

---

# 8. Conditional test.fixme()

```ts
test('verify legacy browser flow', async ({ browserName }) => {
  test.fixme(
    browserName === 'webkit',
    'Known issue in WebKit'
  );

  // test steps
});
```

---

# 9. test.fail()

`test.fail()` marks a test as expected to fail.

```ts
test.fail('verify known defect', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByText('Invalid password')).toBeVisible();
});
```

This is useful when the automated test represents correct expected behavior but the application currently has a known defect.

### Expected failure behavior

If the test fails:

> Expected failure.

If the test unexpectedly passes:

> Unexpected pass.

That can indicate that the underlying defect may have been fixed.

---

# 10. Conditional test.fail()

```ts
test('verify known defect', async ({ browserName }) => {
  test.fail(
    browserName === 'firefox',
    'Known Firefox issue'
  );

  // test
});
```

---

# 11. test.slow()

`test.slow()` marks a test as slow and applies Playwright's slow-test timeout behavior.

```ts
test('large file upload', async ({ page }) => {
  test.slow();

  await page.goto('/upload');

  // large upload
});
```

Typical use cases:

- Large file uploads.
- Large downloads.
- Complex reports.
- Long-running workflows.
- Slow integrations.

---

# 12. test.setTimeout()

Use `test.setTimeout()` when an explicit timeout is required.

```ts
test('large report generation', async ({ page }) => {
  test.setTimeout(120000);

  await page.goto('/reports');

  // long-running operation
});
```

`120000 ms` is 120 seconds, or 2 minutes.

### test.slow() vs test.setTimeout()

`test.slow()` means:

> This test is expected to be slow.

`test.setTimeout()` means:

> Use this specific timeout value.

---

# 13. test.describe()

`test.describe()` groups related tests.

```ts
test.describe('Login Tests', () => {

  test('valid login', async ({ page }) => {
    // ...
  });

  test('invalid login', async ({ page }) => {
    // ...
  });

});
```

It improves organization and provides a scope for shared configuration and hooks.

---

# 14. test.describe.configure()

This controls configuration for a test group.

For example:

```ts
test.describe.configure({
  mode: 'serial'
});
```

### Serial execution

Serial mode can be appropriate when tests have a genuine unavoidable dependency.

However:

> Independent tests should normally remain independent.

Do not use serial mode simply because tests happen to be written sequentially.

---

# 15. test.use()

`test.use()` configures or overrides fixtures and browser context settings.

Example:

```ts
test.use({
  viewport: {
    width: 1280,
    height: 720
  }
});
```

Another example:

```ts
test.use({
  baseURL: 'https://staging.example.com'
});
```

The exact options depend on the available Playwright fixtures and project configuration.

---

# 16. Describe-Level test.use()

```ts
test.describe('Mobile Tests', () => {

  test.use({
    viewport: {
      width: 390,
      height: 844
    }
  });

  test('mobile login', async ({ page }) => {
    // ...
  });

});
```

This lets one group use different settings.

---

# 17. test.step()

`test.step()` creates a named step in the Playwright test report.

```ts
test('login test', async ({ page }) => {

  await test.step('Open login page', async () => {
    await page.goto('/login');
  });

  await test.step('Enter credentials', async () => {
    await page.getByLabel('Username').fill('user1');
    await page.getByLabel('Password').fill('password');
  });

  await test.step('Verify dashboard', async () => {
    await expect(page.getByText('Dashboard')).toBeVisible();
  });

});
```

### Why use it?

It improves:

- Reporting.
- Debugging.
- Failure analysis.
- Trace readability.
- Large end-to-end test readability.

---

# 18. test.info()

`test.info()` provides information about the currently executing test.

```ts
test('test information', async ({ page }) => {
  const info = test.info();

  console.log(info.title);
  console.log(info.status);
});
```

It is particularly useful for advanced reporting and custom framework utilities.

---

# 19. Custom Annotations

You can add custom metadata using `test.info().annotations`.

```ts
test('verify payment', async ({ page }) => {

  test.info().annotations.push({
    type: 'owner',
    description: 'Payments Team'
  });

  await page.goto('/payment');
});
```

Another example:

```ts
test.info().annotations.push({
  type: 'issue',
  description: 'BUG-1025'
});
```

---

# 20. Multiple Custom Annotations

A test can have multiple custom annotations.

```ts
test('verify payment', async ({ page }) => {

  test.info().annotations.push(
    {
      type: 'owner',
      description: 'Payments Team'
    },
    {
      type: 'requirement',
      description: 'REQ-1001'
    },
    {
      type: 'issue',
      description: 'BUG-1025'
    }
  );

  // test steps
});
```

This is useful for enterprise automation frameworks.

---

# 21. Why Use Custom Annotations?

Common uses include:

- Test ownership.
- Requirement IDs.
- Defect IDs.
- Business modules.
- External test-management integration.
- Custom reporting.
- Traceability.

A mature framework can connect:

```text
Requirement
    ↓
Automated Test
    ↓
Execution
    ↓
Defect
    ↓
Report
```

---

# 22. Tags

Tags categorize tests.

```ts
test('login test', {
  tag: '@smoke'
}, async ({ page }) => {

  await page.goto('/login');

});
```

Multiple tags can be used:

```ts
test('payment test', {
  tag: ['@smoke', '@payment']
}, async ({ page }) => {

  // ...
});
```

Tags are useful for categories such as:

```text
@smoke
@sanity
@regression
@critical
@login
@payment
@api
@ui
```

---

# 23. Running Tagged Tests

If tests use:

```ts
tag: '@smoke'
```

you can select them with:

```bash
npx playwright test --grep @smoke
```

For regression:

```bash
npx playwright test --grep @regression
```

This is especially useful in CI/CD.

---

# 24. Tags vs Custom Annotations

### Tags

Best for:

> Categorizing and selecting tests.

Example:

```ts
tag: '@smoke'
```

### Custom annotations

Best for:

> Storing metadata.

Example:

```ts
test.info().annotations.push({
  type: 'owner',
  description: 'Payments Team'
});
```

---

# 25. test.only()

`test.only()` focuses execution on one test.

```ts
test.only('debug login test', async ({ page }) => {
  // ...
});
```

It is useful for local debugging.

### Important warning

Never intentionally commit `test.only()` to the main branch.

It can prevent the rest of the suite from executing.

Use it temporarily, then remove it before committing.

---

# 26. test.describe.only()

You can focus an entire group.

```ts
test.describe.only('Login Tests', () => {

  test('valid login', async () => {
    // ...
  });

  test('invalid login', async () => {
    // ...
  });

});
```

Again, this should normally be temporary debugging code.

---

# 27. Browser-Specific Conditions

A common enterprise use case is browser-specific behavior.

```ts
test('verify feature', async ({ page, browserName }) => {

  test.skip(
    browserName === 'webkit',
    'Feature is not supported in WebKit'
  );

  await page.goto('/feature');
});
```

---

# 28. Environment-Specific Conditions

Suppose a feature exists only in staging.

```ts
test('verify new payment feature', async ({ page }) => {

  test.skip(
    process.env.TEST_ENV === 'production',
    'Feature is not enabled in production'
  );

  await page.goto('/payment');
});
```

This lets one test suite adapt to different environments.

---

# 29. Project-Specific Behavior

Playwright projects can represent different execution targets, such as:

```text
Chromium
Firefox
WebKit
Mobile Chrome
Mobile Safari
Staging
Production
API
UI
```

Conditional annotations can be used when a test is not applicable to a particular target.

---

# 30. Annotations in Hooks

Hooks can access test information.

Example:

```ts
test.beforeEach(async () => {

  test.info().annotations.push({
    type: 'setup',
    description: 'Login setup executed'
  });

});
```

Use this carefully because metadata added in a hook can affect every test using that hook.

---

# 31. Annotations and Fixtures

Fixtures can work with test metadata.

```ts
test('admin validation', async ({ page }) => {

  test.info().annotations.push({
    type: 'role',
    description: 'Admin'
  });

  // test
});
```

In a custom framework, fixtures can standardize metadata and setup.

---

# 32. Annotations and Reports

Annotations are particularly useful with:

- HTML reports.
- CI pipelines.
- Custom reporting.
- Test-management integrations.
- Dashboards.

For example:

```text
Test:
Payment validation

Tags:
@smoke
@payment

Owner:
Payments QA

Requirement:
PAY-1001

Defect:
BUG-4567
```

This provides much more context than only Pass/Fail.

---

# 33. Annotations and CI/CD

Tags can be used to run different suites.

Smoke:

```bash
npx playwright test --grep @smoke
```

Regression:

```bash
npx playwright test --grep @regression
```

A CI pipeline can therefore execute a fast smoke suite on every build and a larger regression suite on a schedule or release pipeline.

---

# 34. Expected Failure vs Actual Failure

This distinction is very important.

Normal test:

```ts
test('test', async () => {
  // expected to pass
});
```

Known expected failure:

```ts
test.fail('test', async () => {
  // expected to fail
});
```

If the normal test fails:

> Unexpected failure.

If the expected-failure test fails:

> Expected failure.

If the expected-failure test passes:

> Unexpected pass.

---

# 35. test.fail() Is Not a Replacement for Defect Tracking

A known product defect should normally still exist in the team's defect-management process.

Example:

```ts
test('verify incorrect tax calculation', async ({ page }) => {

  test.fail();

  test.info().annotations.push({
    type: 'issue',
    description: 'BUG-2045'
  });

  // test
});
```

This keeps both the execution expectation and defect traceability.

---

# 36. Dynamic Annotations

Custom annotations can be generated at runtime.

```ts
test('environment validation', async ({ page }) => {

  const environment = process.env.TEST_ENV || 'unknown';

  test.info().annotations.push({
    type: 'environment',
    description: environment
  });

  await page.goto('/');
});
```

This can record which environment the test was executed against.

---

# 37. Requirement Metadata

```ts
test('verify loan eligibility', async ({ page }) => {

  test.info().annotations.push({
    type: 'requirement',
    description: 'REQ-LOAN-001'
  });

  // test
});
```

This supports requirement-to-test traceability.

---

# 38. Ownership Metadata

```ts
test('verify payment settlement', async ({ page }) => {

  test.info().annotations.push({
    type: 'owner',
    description: 'Payments QA Team'
  });

  // test
});
```

This can be valuable in large automation suites.

---

# 39. Combining Tags and Annotations

```ts
test('critical payment validation', {
  tag: ['@smoke', '@critical', '@payment']
}, async ({ page }) => {

  test.info().annotations.push({
    type: 'owner',
    description: 'Payments Team'
  });

  test.info().annotations.push({
    type: 'requirement',
    description: 'PAY-1001'
  });

  // test
});
```

Here:

```text
Tags
→ classification/filtering

Annotations
→ metadata
```

---

# 40. Combining Tags, Annotations, and Steps

```ts
test('payment validation', {
  tag: ['@smoke', '@payment']
}, async ({ page }) => {

  test.info().annotations.push({
    type: 'owner',
    description: 'Payments QA'
  });

  await test.step('Open payment page', async () => {
    await page.goto('/payment');
  });

  await test.step('Enter payment details', async () => {
    // ...
  });

  await test.step('Verify payment status', async () => {
    // ...
  });

});
```

This gives the test:

- Classification.
- Ownership.
- Readable reporting.
- Structured execution.

---

# 41. Real-World Enterprise Example

```ts
import { test, expect } from '@playwright/test';

test.describe('Deal Upload Tests', () => {

  test('successful document upload', {
    tag: ['@smoke', '@deal']
  }, async ({ page }) => {

    test.info().annotations.push({
      type: 'owner',
      description: 'Deal QA Team'
    });

    test.info().annotations.push({
      type: 'requirement',
      description: 'DEAL-UPLOAD-001'
    });

    await test.step('Open upload page', async () => {
      await page.goto('/upload');
    });

    await test.step('Upload document', async () => {
      // upload steps
    });

    await test.step('Verify successful upload', async () => {
      await expect(
        page.getByText('Upload Successful')
      ).toBeVisible();
    });

  });

  test('known document processing defect', async ({ page }) => {

    test.fail();

    test.info().annotations.push({
      type: 'issue',
      description: 'BUG-1025'
    });

    // test
  });

  test('large document processing', async ({ page }) => {

    test.slow();

    await page.goto('/upload');

    // long-running operation
  });

  test.skip('legacy upload workflow', async ({ page }) => {
    // legacy feature
  });

});
```

---

# 42. Annotation Decision Tree

```text
Should the test run?
        |
        +-- No
        |    |
        |    +-- Temporarily excluded?
        |    |       → test.skip()
        |    |
        |    +-- Automation needs fixing?
        |            → test.fixme()
        |
        +-- Yes
             |
             +-- Expected to fail?
             |       → test.fail()
             |
             +-- Expected to take longer?
             |       → test.slow()
             |
             +-- Need exact timeout?
             |       → test.setTimeout()
             |
             +-- Need metadata?
                     → custom annotations
```

---

# 43. Common Mistakes

## Mistake 1: Commenting out tests

Avoid:

```ts
// test('payment', async () => {
// });
```

Prefer:

```ts
test.skip('payment', async () => {
});
```

---

## Mistake 2: Committing test.only()

Avoid committing:

```ts
test.only(...)
```

Always remove it before pushing code.

---

## Mistake 3: Using test.skip() to hide bugs

If the test represents correct expected behavior but the application has a known defect, consider `test.fail()` instead.

---

## Mistake 4: Using test.fail() for flaky tests

Do not use `test.fail()` to hide random failures.

Investigate:

- Synchronization.
- Locators.
- Test data.
- Application instability.
- Network conditions.
- Timing.
- Environment problems.

---

## Mistake 5: Excessive timeout

Do not solve every failure with:

```ts
test.setTimeout(600000);
```

Investigate the real cause first.

---

## Mistake 6: Unnecessary serial execution

Do not make every suite serial. Keep independent tests independent.

---

# 44. Best Practices

## 44.1 Give skip/fixme/fail a reason

Prefer:

```ts
test.skip(
  condition,
  'Feature is not available in the current environment'
);
```

The reason helps developers, QA engineers, reviewers, and future maintainers.

## 44.2 Use consistent tags

For example:

```text
@smoke
@sanity
@regression
@critical
@payment
```

## 44.3 Keep tests independent

Annotations cannot fix poor test architecture.

## 44.4 Use test.step() for large workflows

```ts
await test.step('Create deal', async () => {
  // ...
});

await test.step('Upload document', async () => {
  // ...
});

await test.step('Verify document', async () => {
  // ...
});
```

## 44.5 Use metadata only when it has value

Do not create custom annotations that nobody consumes.

---

# 45. Quick Comparison Table

| API | Purpose | Test Body Executes? |
|---|---|---:|
| `test.skip()` | Skip test | No |
| `test.fixme()` | Test needs fixing | No |
| `test.fail()` | Failure is expected | Yes |
| `test.slow()` | Test is slow | Yes |
| `test.only()` | Focus execution | Yes |
| `test.describe()` | Group tests | Depends |
| `test.use()` | Configure tests | Yes |
| `test.setTimeout()` | Set explicit timeout | Yes |
| `test.step()` | Create report step | Yes |
| `test.info()` | Access runtime test information | Yes |
| `test.describe.configure()` | Configure group execution | Depends |
| Tags | Categorize/filter tests | Yes |
| Custom annotations | Add metadata | Yes |

---

# 46. Interview Questions and Answers

## Q1. What are annotations in Playwright?

**Answer:**

Annotations are metadata or test controls used to modify or describe test behavior. Common built-in annotations include `test.skip()`, `test.fixme()`, `test.fail()`, and `test.slow()`. Playwright also supports custom annotations through `test.info()`.

---

## Q2. What is test.skip()?

**Answer:**

`test.skip()` marks a test as skipped, so Playwright does not execute its test body. It can be used unconditionally or conditionally.

```ts
test.skip('payment test', async ({ page }) => {
  // ...
});
```

---

## Q3. What is test.fixme()?

**Answer:**

`test.fixme()` indicates that a test currently needs to be fixed and should not execute. It is useful for known broken automation.

---

## Q4. Difference between test.skip() and test.fixme()?

**Answer:**

`test.skip()` means the test should not currently run. `test.fixme()` communicates that the test itself needs fixing. Both prevent execution, but their intent is different.

---

## Q5. What is test.fail()?

**Answer:**

`test.fail()` marks a test as expected to fail. It is useful when a known product defect currently causes the correct automated test to fail.

---

## Q6. What happens if a test marked test.fail() passes?

**Answer:**

It is treated as an unexpected pass. This can be a signal that the underlying defect has been fixed.

---

## Q7. Difference between test.fail() and test.skip()?

**Answer:**

`test.skip()` does not execute the test. `test.fail()` executes the test while telling Playwright that failure is expected.

---

## Q8. What is test.slow()?

**Answer:**

`test.slow()` marks a test as slow and uses Playwright's slow-test timeout behavior.

---

## Q9. Difference between test.slow() and test.setTimeout()?

**Answer:**

`test.slow()` communicates that the test is expected to be slow. `test.setTimeout()` lets me specify an exact timeout.

---

## Q10. Can skip be conditional?

**Answer:**

Yes.

```ts
test('feature test', async ({ browserName }) => {
  test.skip(
    browserName === 'firefox',
    'Known Firefox limitation'
  );
});
```

---

## Q11. Can test.fail() be conditional?

**Answer:**

Yes.

```ts
test('browser-specific defect', async ({ browserName }) => {
  test.fail(
    browserName === 'webkit',
    'Known WebKit issue'
  );
});
```

---

## Q12. What is test.only()?

**Answer:**

`test.only()` focuses execution on a particular test and is mainly used for local debugging.

---

## Q13. Why should test.only() not be committed?

**Answer:**

Because it can prevent other tests from running. It should be removed before code is committed or pushed.

---

## Q14. What is test.describe()?

**Answer:**

`test.describe()` groups related tests and provides a scope for common hooks and configuration.

---

## Q15. What is test.describe.configure()?

**Answer:**

It configures execution behavior for a test group. One example is configuring serial execution.

```ts
test.describe.configure({
  mode: 'serial'
});
```

---

## Q16. What is test.use()?

**Answer:**

`test.use()` configures or overrides fixtures and browser context settings for a test or test group.

---

## Q17. What is test.step()?

**Answer:**

`test.step()` creates a named step in the test report, improving debugging and failure analysis.

---

## Q18. Why use test.step()?

**Answer:**

It breaks a large workflow into meaningful business steps such as Login, Create Deal, Upload Document, and Verify Result. This makes reports and debugging clearer.

---

## Q19. What is test.info()?

**Answer:**

`test.info()` provides runtime information about the current test and can be used for advanced reporting and custom annotations.

---

## Q20. How do you add a custom annotation?

**Answer:**

```ts
test.info().annotations.push({
  type: 'owner',
  description: 'Payments QA'
});
```

---

## Q21. What are custom annotations useful for?

**Answer:**

They can store owner, requirement ID, defect ID, business module, or other metadata needed by reporting and framework utilities.

---

## Q22. What are tags?

**Answer:**

Tags categorize tests and allow teams to filter or select specific test groups.

```ts
test('login', {
  tag: ['@smoke', '@login']
}, async ({ page }) => {
  // ...
});
```

---

## Q23. Difference between tags and custom annotations?

**Answer:**

Tags are mainly used for categorization and test selection, while custom annotations are mainly used for storing metadata.

---

## Q24. How would you run only smoke tests?

**Answer:**

If smoke tests have the `@smoke` tag:

```bash
npx playwright test --grep @smoke
```

---

## Q25. How would you mark a known product bug?

**Answer:**

I would use `test.fail()` if the failure is expected and associate the defect ID using custom annotation metadata.

```ts
test('verify known defect', async ({ page }) => {
  test.fail();

  test.info().annotations.push({
    type: 'issue',
    description: 'BUG-1025'
  });
});
```

---

## Q26. How would you skip a test only in Firefox?

**Answer:**

```ts
test('feature test', async ({ browserName }) => {
  test.skip(
    browserName === 'firefox',
    'Not supported in Firefox'
  );
});
```

---

## Q27. How would you make a test slower?

**Answer:**

Use:

```ts
test.slow();
```

For an exact timeout:

```ts
test.setTimeout(120000);
```

---

## Q28. Can annotations be used at group level?

**Answer:**

Yes. Tests can be grouped with `test.describe()`, and related configuration and behavior can be scoped to the group.

---

## Q29. What is the purpose of conditional annotations?

**Answer:**

They allow test behavior to change based on runtime conditions such as browser, environment, platform, or other test data.

---

## Q30. Should serial mode be used for all dependent tests?

**Answer:**

No. Tests should ideally be independent. Serial mode should be used only when there is a genuine unavoidable dependency.

---

## Q31. Can custom annotations help with test ownership?

**Answer:**

Yes.

```ts
test.info().annotations.push({
  type: 'owner',
  description: 'Payments QA'
});
```

---

## Q32. Can annotations contain defect IDs?

**Answer:**

Yes.

```ts
test.info().annotations.push({
  type: 'issue',
  description: 'BUG-1234'
});
```

---

## Q33. How do annotations help CI/CD?

**Answer:**

They help classify, control, and report test execution. Tags can select smoke or regression suites, expected-failure annotations can represent known defects, and custom annotations can provide additional reporting metadata.

---

## Q34. Should a failing test always be marked test.fail()?

**Answer:**

No. `test.fail()` should only be used when the failure is expected and understood, such as a known product defect. It should not hide flaky or unexplained failures.

---

## Q35. What would you do if a test randomly fails?

**Answer:**

I would investigate the root cause rather than immediately using `test.fail()` or `test.skip()`. I would check synchronization, locators, test data, application behavior, network conditions, retries, and traces.

---

## Q36. What would you do if a feature is not implemented yet?

**Answer:**

Depending on the situation and team convention, I could use `test.skip()` or `test.fixme()`. `test.fixme()` is useful when the automation itself needs fixing.

---

## Q37. What would you do if the application has a known bug?

**Answer:**

If the test correctly represents the expected behavior and the product bug is known, I would use `test.fail()` so the test executes and its failure is treated as expected. I would associate the defect ID when useful.

---

## Q38. What would you do if a test takes two minutes because it uploads a large file?

**Answer:**

First I would verify that the duration is expected. If it is an inherently long operation, I would use `test.slow()` or an appropriate explicit `test.setTimeout()`.

---

## Q39. Why are annotations useful in large projects?

**Answer:**

Large projects can have thousands of tests. Annotations and tags provide structure, test intent, ownership, defect traceability, and execution control, making the suite easier to maintain and report.

---

## Q40. What is the difference between metadata and execution control?

**Answer:**

Execution controls change how the test runner behaves, such as skipping or expecting failure. Metadata describes the test, such as owner, requirement, or defect ID.

---

# 47. Scenario-Based Interview Questions

## Scenario 1 — Known Bug

**Question:** A login test fails because of a known application defect. What will you do?

**Answer:**

I would not delete the test or hide it with an arbitrary skip. If the test correctly represents expected behavior and the application defect is known, I would mark it with `test.fail()` and associate the defect ID using a custom annotation when appropriate.

---

## Scenario 2 — Browser Limitation

**Question:** A test works in Chromium and Firefox but is unsupported in WebKit. What will you do?

**Answer:**

I would conditionally skip it for WebKit.

```ts
test('feature test', async ({ browserName }) => {
  test.skip(
    browserName === 'webkit',
    'Feature is currently unsupported in WebKit'
  );
});
```

---

## Scenario 3 — Large File Upload

**Question:** A test uploads a large file and takes longer than normal. What will you do?

**Answer:**

First I would confirm that the duration is genuinely expected. If it is, I would use `test.slow()` or an appropriate explicit timeout instead of adding arbitrary waits.

---

## Scenario 4 — Debugging One Test

**Question:** You have 500 tests but want to debug only one.

**Answer:**

I would temporarily use:

```ts
test.only('login test', async ({ page }) => {
  // ...
});
```

After debugging, I would remove `test.only()` before committing.

---

## Scenario 5 — Entire Feature Disabled

**Question:** The payment module is disabled for the current release.

**Answer:**

I could skip the relevant group:

```ts
test.describe.skip('Payment Tests', () => {
  // tests
});
```

I would also document the reason and track the feature status through the normal team process.

---

## Scenario 6 — Requirement Traceability

**Question:** How would you connect an automated test with a requirement?

**Answer:**

I can add custom annotation metadata:

```ts
test.info().annotations.push({
  type: 'requirement',
  description: 'REQ-1234'
});
```

This can then be consumed by reporting or framework utilities.

---

# 48. Advanced Interview Questions

## Q41. Can annotations be dynamically generated?

**Answer:**

Yes. Custom annotations can be created at runtime from environment, test data, ownership, defect information, or other runtime values.

---

## Q42. Can one test have multiple annotations?

**Answer:**

Yes.

```ts
test.info().annotations.push(
  {
    type: 'owner',
    description: 'QA Team'
  },
  {
    type: 'requirement',
    description: 'REQ-100'
  }
);
```

---

## Q43. Can tags and annotations be used together?

**Answer:**

Yes. Tags can be used for filtering while custom annotations provide metadata.

---

## Q44. Why should annotations not replace good test design?

**Answer:**

Annotations provide metadata and execution controls, but they do not solve poor test architecture. Good tests still need maintainable locators, controlled data, fixtures, independent execution, meaningful assertions, and good structure.

---

## Q45. What is a good enterprise annotation strategy?

**Answer:**

I would define a small consistent convention.

For example:

```text
Tags:
@smoke
@regression
@critical
@module

Custom annotations:
owner
requirement
defect
```

The convention should be documented and consistently used.

---

## Q46. How would you prevent test.only from reaching CI?

**Answer:**

I would use project configuration and/or CI validation to detect focused tests, and I would use code review or pre-commit checks if required. Developers should also remove `test.only()` before pushing.

---

## Q47. What is the benefit of test.step() in CI?

**Answer:**

It makes failures easier to diagnose because the report can identify the business step where the failure occurred instead of only showing that the overall test failed.

---

## Q48. How do annotations improve debugging?

**Answer:**

They provide context such as requirement, owner, environment, or defect ID. This helps the team understand the test's purpose and ownership quickly.

---

## Q49. Can annotations be used with hooks?

**Answer:**

Yes. `test.info()` can be used from appropriate lifecycle contexts. However, hook-level metadata should be used carefully because it can apply to every test using the hook.

---

## Q50. What is your preferred approach to skip vs fixme vs fail?

**Answer:**

My decision is based on intent:

```text
Should not execute
    → test.skip()

Automation needs fixing
    → test.fixme()

Application defect causes expected failure
    → test.fail()
```

I would never use these merely to hide unexplained failures.

---

# 49. One-Minute Interview Answer

If the interviewer asks:

> Explain Playwright test annotations.

You can answer:

> "Playwright provides several test annotations and related test metadata features that help control and describe test execution. The commonly used built-in annotations are `test.skip()`, `test.fixme()`, `test.fail()`, and `test.slow()`. I use `test.skip()` when a test should not currently execute, `test.fixme()` when the automation itself needs fixing, `test.fail()` when a test is expected to fail because of a known issue, and `test.slow()` when a test is expected to take longer than normal. Playwright also provides features such as `test.describe()`, `test.use()`, `test.setTimeout()`, `test.step()`, and `test.info()`. With `test.info()` I can add custom annotations such as requirement IDs, defect IDs, and ownership. I also use tags such as `@smoke` and `@regression` to categorize and selectively execute tests. In a real project, I use these features carefully so that known conditions are documented instead of simply hiding failures."

---

# 50. Learning Roadmap

### Level 1 — Basic

1. `test.skip()`
2. `test.only()`
3. `test.fail()`
4. `test.fixme()`
5. `test.slow()`

### Level 2 — Test Organization

6. `test.describe()`
7. `test.describe.configure()`
8. `test.use()`
9. `test.setTimeout()`

### Level 3 — Reporting

10. `test.step()`
11. `test.info()`
12. Tags

### Level 4 — Advanced Metadata

13. Custom annotations
14. Requirement metadata
15. Defect metadata
16. Ownership metadata
17. Dynamic annotations

### Level 5 — Framework and CI

18. Browser-specific conditions
19. Environment-specific conditions
20. Project-specific behavior
21. CI test filtering
22. Reporting integration
23. Annotation conventions
24. Governance and code review

---

# 51. Final Interview Checklist

Before an interview, make sure you can explain:

- What annotations are.
- Why annotations are useful.
- `test.skip()`.
- Conditional skip.
- `test.fixme()`.
- Difference between skip and fixme.
- `test.fail()`.
- Expected failure vs actual failure.
- `test.slow()`.
- `test.setTimeout()`.
- Difference between slow and timeout.
- `test.only()`.
- Why `test.only()` is dangerous in CI.
- `test.describe()`.
- `test.describe.configure()`.
- `test.use()`.
- `test.step()`.
- `test.info()`.
- Custom annotations.
- Tags.
- Tags vs annotations.
- Browser-specific conditions.
- Environment-specific conditions.
- Defect traceability.
- Requirement traceability.
- Test ownership.
- Annotation usage in CI/CD.
- Best practices.
- Common mistakes.
- Real-world scenarios.

---

# 52. Final Key Concept

The most important concept is:

> **Annotations are not just syntax. They communicate test intent.**

A mature Playwright framework should make it clear:

```text
What is this test?
        ↓
What feature does it belong to?
        ↓
Who owns it?
        ↓
What requirement does it validate?
        ↓
Does it currently run?
        ↓
If it fails, is the failure expected?
        ↓
How long is it expected to take?
        ↓
Where exactly did it fail?
```

Playwright annotations, tags, steps, metadata, fixtures, and configuration work together to make an automation framework easier to maintain, debug, execute, and scale.
