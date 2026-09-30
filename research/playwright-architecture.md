# Playwright Architecture

> Interview-ready explanation and learning notes for a Playwright + TypeScript project.

## 1. What is Playwright?

Playwright is an open-source end-to-end testing and browser automation framework developed by Microsoft.

It supports:
- Chromium
- Firefox
- WebKit

When using `@playwright/test`, it also provides:
- Test execution
- Fixtures
- Assertions
- Parallel execution
- Retries
- Projects
- Reporting
- Screenshots
- Videos
- Tracing
- Debugging

### Interview point

Playwright is not only a browser automation library. With `@playwright/test`, it also provides a test runner and features required to build and execute an end-to-end automation framework.

---

## 2. Playwright Architecture - High-Level View

```text
Test Script
     |
     v
Playwright Test Runner
     |
     v
Worker / Fixtures
     |
     v
Playwright API
     |
     v
Browser Communication
     |
     +-------------------+-------------------+
     |                   |                   |
     v                   v                   v
 Chromium             Firefox             WebKit
     |
     v
Browser Context
     |
     v
Page / Tab
     |
     v
Web Application
```

Overall flow:

**Test code → Playwright → Browser → Web Application**

---

## 3. Main Components

| Component | Purpose | Example |
|---|---|---|
| Test Script | Contains test scenarios and automation steps | `page.goto()` |
| Playwright Test Runner | Executes and manages tests | `test()`, `expect()` |
| Worker | Process used to execute tests | Parallel workers |
| Browser | Represents browser process | Chromium |
| Browser Context | Provides isolated browser session | `browser.newContext()` |
| Page | Represents a browser tab | `context.newPage()` |
| Locator | Identifies web elements | `page.getByRole()` |
| Assertion | Verifies expected behavior | `expect(page).toHaveTitle()` |
| Fixture | Provides reusable test setup | `page`, `context` |
| Reporter | Generates execution results | HTML report |

---

## 4. Browser, Browser Context and Page

### Browser

The Browser represents the browser process controlled by Playwright.

```typescript
const browser = await chromium.launch();
```

### Browser Context

A Browser Context is an isolated browser session. It can have its own cookies, local storage, permissions and authentication state.

```typescript
const context = await browser.newContext();
```

### Page

A Page represents a browser tab.

```typescript
const page = await context.newPage();
```

Hierarchy:

```text
Browser
   |
   +---- Context 1
   |       |
   |       +---- Page 1
   |       +---- Page 2
   |
   +---- Context 2
           |
           +---- Page 3
```

### Interview answer

> Browser represents the browser process, Browser Context represents an isolated browser session, and Page represents a browser tab inside that context.

---

## 5. Basic Browser Architecture Code

```typescript
const browser = await chromium.launch();

const context = await browser.newContext();

const page = await context.newPage();

await page.goto('https://example.com');
```

Execution flow:

```text
chromium.launch()
       |
       v
Browser
       |
       v
browser.newContext()
       |
       v
Browser Context
       |
       v
context.newPage()
       |
       v
Page
       |
       v
page.goto()
       |
       v
Web Application
```

---

## 6. Playwright Test Runner

When using:

```typescript
import { test, expect } from '@playwright/test';
```

we are using the Playwright Test framework.

The Test Runner manages:
- Test discovery
- Test execution
- Fixtures
- Workers
- Parallel execution
- Retries
- Projects
- Assertions
- Reporting
- Test isolation
- Hooks

Example:

```typescript
import { test, expect } from '@playwright/test';

test('verify page title', async ({ page }) => {
  await page.goto('https://example.com');

  await expect(page).toHaveTitle(/Example/);
});
```

Here, the Playwright Test Runner provides the `page` fixture.

---

## 7. Worker

A Worker is a separate process managed by the Playwright Test Runner to execute tests.

```text
Test Suite
    |
    +---------- Worker 1
    |             |
    |             +--- Test A
    |             +--- Test B
    |
    +---------- Worker 2
    |             |
    |             +--- Test C
    |             +--- Test D
    |
    +---------- Worker 3
                  |
                  +--- Test E
                  +--- Test F
```

### Important interview point

A worker is **not the same thing as a browser tab**. A worker is an execution process managed by the Playwright Test Runner.

---

## 8. Fixtures

Fixtures provide reusable test setup and teardown.

Built-in fixtures include:
- `page`
- `context`
- `browser`
- `browserName`

Example:

```typescript
test('login test', async ({ page }) => {
  await page.goto('https://example.com/login');
});
```

Here, `page` is a Playwright fixture.

---

## 9. Test Execution Flow

```text
1. Test starts
       |
       v
2. Test Runner identifies the test
       |
       v
3. Worker executes the test
       |
       v
4. Fixtures are prepared
       |
       v
5. Browser Context is created
       |
       v
6. Page is created
       |
       v
7. Locator identifies the element
       |
       v
8. Action is performed
       |
       v
9. Web application responds
       |
       v
10. Assertion validates the result
       |
       v
11. Test result is generated
       |
       v
12. Report / Screenshot / Trace is collected
```

---

## 10. Locators

A Locator is used to identify elements on a web page.

Examples:

```typescript
page.getByRole('button', { name: 'Login' });
```

```typescript
page.getByText('Welcome');
```

```typescript
page.getByLabel('Username');
```

```typescript
page.locator('#username');
```

Recommended locator styles include:
- `getByRole()`
- `getByLabel()`
- `getByText()`
- `getByPlaceholder()`
- `getByTestId()`
- `locator()`

Example:

```typescript
const loginButton = page.getByRole('button', {
  name: 'Login'
});

await loginButton.click();
```

---

## 11. Auto-Waiting

Playwright provides automatic waiting for many actions and assertions.

For example:

```typescript
await page.getByRole('button', {
  name: 'Login'
}).click();
```

Playwright can wait for relevant conditions such as the element being:
- Visible
- Enabled
- Stable
- Able to receive the action

Avoid unnecessary hard waits such as:

```typescript
await page.waitForTimeout(5000);
```

### Interview answer

> Playwright provides automatic waiting for many actions and web-first assertions. This reduces synchronization problems and the need for arbitrary sleep statements.

---

## 12. Assertions

Playwright provides web-first assertions using `expect`.

```typescript
await expect(page).toHaveTitle(/Playwright/);
```

```typescript
await expect(
  page.getByRole('button', { name: 'Login' })
).toBeVisible();
```

Common assertions include:

```text
toBeVisible()
toBeEnabled()
toBeDisabled()
toHaveText()
toContainText()
toHaveValue()
toHaveAttribute()
toHaveURL()
toHaveTitle()
```

---

## 13. Browser Communication

The high-level communication flow is:

```text
TypeScript / JavaScript
          |
          v
Playwright Client API
          |
          v
Browser Automation Communication
          |
          v
Browser
          |
          v
Web Application
```

For interviews, focus on the high-level communication flow rather than making an overly specific claim about one internal protocol being used identically for every supported browser.

---

## 14. Multi-Browser Architecture

Playwright supports:
- Chromium
- Firefox
- WebKit

Example configuration:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});
```

Architecture:

```text
             Test Suite
                 |
        Playwright Test Runner
                 |
       +---------+---------+
       |         |         |
       v         v         v
   Chromium   Firefox    WebKit
```

---

## 15. Parallel Execution

Playwright Test supports parallel execution using multiple workers.

```text
Test Suite
     |
     +---------- Worker 1
     |              |
     |              +--- Login Test
     |              +--- Search Test
     |
     +---------- Worker 2
     |              |
     |              +--- Checkout Test
     |              +--- Payment Test
     |
     +---------- Worker 3
                    |
                    +--- Profile Test
                    +--- Logout Test
```

Parallel execution can reduce overall execution time.

Tests should be designed carefully when they use shared data, shared accounts or common external resources.

---

## 16. Playwright Projects

Projects allow the same test suite to run with different configurations.

Examples:
- Chromium
- Firefox
- WebKit
- Different environments
- Different device configurations
- Different authentication states

---

## 17. Hooks

Common Playwright lifecycle hooks are:

```typescript
beforeAll()
afterAll()
beforeEach()
afterEach()
```

Example:

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://example.com');
});
```

Hooks are useful for common setup and cleanup.

---

## 18. Debugging and Reporting

Playwright provides:
- HTML reports
- Screenshots
- Videos
- Trace Viewer
- UI Mode
- Debug mode
- Console information
- Network information

To view a generated HTML report:

```bash
npx playwright show-report
```

---

## 19. Trace Viewer

Tracing is useful when debugging failed tests.

A trace can provide:
- Test actions
- Screenshots
- DOM snapshots
- Network activity
- Timing information

Example configuration:

```typescript
use: {
  trace: 'on-first-retry'
}
```

---

## 20. Complete Playwright Architecture

```text
                  Test Script
                      |
                      v
            Playwright Test Runner
                      |
                      v
              Worker / Fixtures
                      |
                      v
                Playwright API
                      |
                      v
            Browser Communication
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
      Chromium     Firefox     WebKit
          |
          v
    Browser Context
          |
          v
        Page
          |
          v
      Locator
          |
          v
       Action
          |
          v
  Web Application
          |
          v
      Assertion
          |
          v
   Test Result / Report
```

---

## 21. One-Line Architecture

Remember this line for interviews:

> **Test → Test Runner → Worker/Fixtures → Browser Context → Page → Locator/Action → Browser → Web Application → Assertion → Report**

---

# 22. Interview Answer - 1 to 2 Minutes

### Question: Explain Playwright Architecture.

**Sample answer:**

> Playwright follows a layered architecture. At the top, we have our test scripts written using languages such as TypeScript or JavaScript. When we use the Playwright Test framework, the Test Runner manages test discovery, fixtures, workers, parallel execution, retries and reporting.
>
> The Test Runner uses Playwright's API to communicate with the browser. Playwright supports Chromium, Firefox and WebKit.
>
> Inside the browser, Playwright uses Browser Contexts to provide isolated browser sessions. Each context can contain one or more Pages, where a Page represents a browser tab.
>
> On the Page, we use Locators to identify elements and perform actions such as click, fill and select. Playwright also provides automatic waiting and web-first assertions through the `expect` API.
>
> After the test is executed, Playwright can generate reports and debugging artifacts such as screenshots, videos and traces.
>
> So, the overall flow is: **Test Script → Test Runner → Worker and Fixtures → Browser Context → Page → Locator and Action → Browser → Web Application → Assertion → Report.**

---

# 23. Common Interview Follow-Up Questions

### Q1. What is the difference between Browser, Context and Page?

> Browser represents the browser process. Browser Context represents an isolated browser session, and Page represents a browser tab inside that context.

### Q2. Why does Playwright use Browser Context?

> Browser Context provides isolation for cookies, storage, permissions and authentication state. This helps tests remain independent.

### Q3. What is a Worker?

> A Worker is a process managed by the Playwright Test Runner that executes tests. Multiple workers can be used for parallel execution.

### Q4. What is auto-waiting?

> Auto-waiting means Playwright automatically waits for relevant conditions before performing many actions and assertions, reducing synchronization issues and unnecessary hard waits.

### Q5. Which browsers does Playwright support?

> Playwright supports Chromium, Firefox and WebKit.

### Q6. Is Playwright only an automation library?

> Playwright provides browser automation APIs. When we use `@playwright/test`, it also provides a test runner with fixtures, assertions, projects, parallel execution, retries and reporting.

### Q7. How does Playwright support parallel execution?

> The Playwright Test Runner can use multiple worker processes to execute tests concurrently. Proper test-data isolation is important when running tests in parallel.

### Q8. What is a Locator?

> A Locator is an object used to identify elements on a page and interact with them. Locators also work with Playwright's automatic waiting and retry mechanisms.

### Q9. What is the difference between `page.locator()` and `getByRole()`?

> `page.locator()` can locate elements using CSS selectors, XPath and other locator strategies. `getByRole()` is a user-facing locator based on an element's accessible role and is generally preferred when it clearly identifies the intended element.

Example:

```typescript
page.locator('#loginButton');
```

```typescript
page.getByRole('button', { name: 'Login' });
```

---

# 24. Example End-to-End Test

```typescript
import { test, expect } from '@playwright/test';

test('verify example page', async ({ page }) => {

  await page.goto('https://example.com');

  await expect(page).toHaveTitle(/Example/);

  await expect(
    page.getByRole('heading', { name: /Example Domain/ })
  ).toBeVisible();

});
```

Architecture for this test:

```text
test()
  |
  v
Playwright Test Runner
  |
  v
Worker
  |
  v
page fixture
  |
  v
Browser Context
  |
  v
Page
  |
  +---- page.goto()
  |
  +---- getByRole()
  |
  +---- expect()
  |
  v
Browser
  |
  v
Web Application
```

---

# 25. Suggested Project Structure

```text
PlaywrightAutomation/
│
├── tests/
│   ├── login.spec.ts
│   ├── codegen.spec.ts
│   └── ...
│
├── pages/
│   └── ...
│
├── fixtures/
│   └── ...
│
├── utils/
│   └── ...
│
├── docs/
│   ├── playwright-architecture.md
│   ├── playwright-locators.md
│   ├── playwright-fixtures.md
│   ├── playwright-waiting.md
│   └── playwright-api-testing.md
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

# 26. Quick Revision

Before an interview, remember:

1. **Playwright** - browser automation and end-to-end testing framework.
2. **Test Runner** - manages test execution.
3. **Worker** - process that executes tests.
4. **Fixture** - reusable test setup and resources.
5. **Browser** - browser process.
6. **Context** - isolated browser session.
7. **Page** - browser tab.
8. **Locator** - identifies elements.
9. **Action** - click, fill, select, etc.
10. **Auto-waiting** - reduces synchronization problems.
11. **Assertion** - validates expected behavior.
12. **Projects** - support different browser/configuration combinations.
13. **Parallel execution** - uses workers to run tests concurrently.
14. **Trace** - helps debug test execution.
15. **Report** - shows test results.

---

# 27. Final Interview Summary

> **Playwright architecture consists of the Test Script, Playwright Test Runner, Workers and Fixtures, Browser Context, Page, Locators and Actions, Browser Communication, and the Web Application. Playwright supports Chromium, Firefox and WebKit, provides isolated browser contexts, automatic waiting, web-first assertions, parallel execution, and debugging capabilities such as traces, screenshots and reports.**

---

# Recommended Next Topics

After understanding architecture, study these topics in this order:

1. Playwright Locators
2. Auto-Waiting
3. Assertions
4. Browser Context and Page
5. Fixtures
6. Hooks
7. Playwright Configuration
8. Page Object Model
9. Test Data Management
10. API Testing with Playwright
11. Authentication and Storage State
12. Parallel Execution
13. Retry and Failure Handling
14. Trace Viewer
15. CI/CD with Jenkins
16. GitHub Actions
17. Playwright MCP
18. AI-assisted Playwright testing
