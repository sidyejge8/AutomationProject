# Step 0 — Your current situation

You said:

> **“and also currently nothing is present in the project folder”**

So we will start completely from the beginning.

Your project folder is currently empty:

```text
PlaywrightAutomation
└── (nothing here)
```

We will create the Playwright project first, then initialize Git, connect it to GitHub, and finally follow a professional feature-branch → commit → push → PR → review → merge workflow.

We will use **VS Code UI as much as possible** and avoid Git commands for now.

---

# Step 1 — Open the empty project folder in VS Code

Open your empty project folder in VS Code.

For example:

```text
C:\Users\Siddheshwar Yejge\OneDrive\Desktop\PlaywrightAutomation
```

In VS Code:

**File → Open Folder**

Select:

```text
PlaywrightAutomation
```

At this point the Explorer should show an empty folder.

---

# Step 2 — Create the Playwright project

Open:

**Terminal → New Terminal**

Run:

```bash
npm init playwright@latest
```

This starts the Playwright project setup.

VS Code will ask you several questions.

### Question 1 — Where to put your end-to-end tests?

Select:

```text
tests
```

### Question 2 — Add a GitHub Actions workflow?

Select:

```text
No
```

We will learn the GitHub workflow separately first.

### Question 3 — Install Playwright browsers?

Select:

```text
Yes
```

Playwright will install the required browsers.

Wait until the installation finishes successfully.

---

# Step 3 — Check the generated Playwright project

After installation, your project should contain files similar to:

```text
PlaywrightAutomation
│
├── tests
│   └── example.spec.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

The exact generated files can vary slightly depending on the Playwright version, but the important point is that the Playwright project has now been created.

---

# Step 4 — Run the Playwright test

Before connecting GitHub, first make sure the Playwright project works.

Open:

**Terminal → New Terminal**

Run:

```bash
npx playwright test
```

Playwright should execute the generated example test.

If the test passes, your Playwright project is working correctly.

You can also run the test in headed mode later when you want to watch the browser.

---

# Step 5 — Open Source Control in VS Code

Now we will start the Git setup using the VS Code UI.

Click the:

**Source Control** icon

on the left side of VS Code.

Because Git has not yet been initialized in this folder, VS Code should provide an option similar to:

**Initialize Repository**

Click:

**Initialize Repository**

This creates the local `.git` repository.

---

# Step 6 — Make sure Git is initialized

After initialization, Source Control should start tracking the files in your Playwright project.

You should see your project files under:

```text
Changes
```

For example:

```text
.gitignore
package.json
package-lock.json
playwright.config.ts
tsconfig.json
tests/example.spec.ts
```

Do not worry if the exact list is slightly different.

The important point is that Git is now initialized locally.

---

# Step 7 — Understand what we have completed

At this point we have:

```text
Empty folder
     ↓
Open in VS Code
     ↓
Create Playwright project
     ↓
Run Playwright test
     ↓
Initialize Git
```

We have **not connected GitHub yet**.

We will do that next.

The next steps will cover:

```text
Local Playwright project
        ↓
Connect to GitHub repository
        ↓
Push main
        ↓
Create feature branch
        ↓
Practice
        ↓
Commit
        ↓
Push
        ↓
Create PR
        ↓
Self-review
        ↓
Merge
```


# Step 8 — Make sure your local branch is `main`

Look at the **bottom-left of VS Code**.

You should see something like:

```
```

```
main
```

If it already says:

```
```

```
main
```

✅ Good. Continue to Step 9.

If it says:

```
```

```
master
```

don't worry. We can rename it to `main` before pushing.

---

# Step 9 — Open your GitHub repository

Open GitHub in your browser.

Go to your repository:

**automation project**

Because it is empty, you should see something similar to:

```
```

```
Quick setup
```

You will see options such as:

```
```

```
HTTPS
SSH
```

Select:

**HTTPS**

Then GitHub will show a repository URL similar to:

```
```

```
https://github.com/your-username/automation-project.git
```

**Copy that URL.**

Don't send me your password or token. The repository URL itself is fine.

---

# Step 10 — Connect your local project to GitHub using VS Code

Now return to VS Code.

Press:

```
```

```
Ctrl + Shift + P
```

This opens the **Command Palette**.

Type:

```
```

```
Git: Add Remote
```

Select:

**Git: Add Remote**

VS Code may ask:

```
```

```
Enter remote name
```

Enter:

```
```

```
origin
```

Press Enter.

Then VS Code will ask for the repository URL.

Paste the GitHub HTTPS URL you copied.

For example:

```
```

```
https://github.com/your-username/automation-project.git
```

Press Enter.

---

# Step 11 — What is `origin`?

This is important to understand.

Your computer has:

```
```

```
PlaywrightAutomation
```

GitHub has:

```
```

```
automation project
```

We need a name for the GitHub location.

The standard name is:

```
```

```
origin
```

So now Git understands:

```
```

```
origin
   ↓
GitHub automation project
```

You can think of it as:

```
```

```
Local Git
   │
   │ origin
   ↓
GitHub
```

`origin` is just a conventional nickname for the remote repository.

---

# Step 12 — Verify the remote through VS Code

Again press:

```
```

```
Ctrl + Shift + P
```

Search:

```
```

```
Git: Manage Remotes
```

Select it.

You should see something similar to:

```
```

```
origin
https://github.com/your-username/automation-project.git
```

If you see `origin` pointing to your **automation project** repository:

✅ Your local project is connected to GitHub.

---

# Step 13 — Now stage your initial Playwright project

Go to:

**Source Control**

You should see files under:

```
```

```
Changes
```

For example:

```
```

```
Changes

U .gitignore
U package.json
U package-lock.json
U playwright.config.ts
U tsconfig.json
U tests/example.spec.ts
```

You can stage all the files.

At the top of **Changes**, click the:

**+**

This stages all appropriate files.

You should now see:

```
```

```
Staged Changes

.gitignore
package.json
package-lock.json
playwright.config.ts
tsconfig.json
tests/example.spec.ts
```

---

# Step 14 — Create your first commit

At the top of Source Control, enter:

```
```

```
Initial Playwright project setup
```

Then click:

**Commit**

Your first commit is now created.

Think of it as:

```
```

```
Your Playwright project
        ↓
First snapshot
        ↓
"Initial Playwright project setup"
```

---

# Step 15 — Push `main` to GitHub

Now we need to send your local `main` branch to GitHub.

Look at the bottom-left.

You should have:

```
```

```
main
```

Then look around the Source Control area or status bar.

You may see:

**Publish Branch**

Click:

**Publish Branch**

If VS Code asks where to publish, select your GitHub account/repository as appropriate.

Because we already configured `origin`, it should use:

```
```

```
origin
```

and push:

```
```

```
main → origin/main
```

---

# Step 16 — What does this mean?

Before pushing:

```
```

```
LOCAL

main
 │
 └── Initial Playwright project setup
```

After pushing:

```
```

```
LOCAL                         GITHUB

main       ───────────────→   main
```

Now your GitHub repository is no longer empty.

You should see your Playwright files on GitHub.

---

# Step 17 — Check GitHub

Refresh your GitHub repository.

You should now see something like:

```
```

```
automation project

tests/
.gitignore
package.json
package-lock.json
playwright.config.ts
tsconfig.json
```

You should also see:

```
```

```
main
```

as the current branch.

🎉 Your local Playwright project is now connected to GitHub.

---

# Step 18 — Now start the professional workflow

Your initial project setup is complete.

From this point onward, **don't normally work directly on `main`**.

Suppose today you want to practice:

> Playwright locators

We'll create a feature branch.

At the bottom-left, click:

```
```

```
main
```

Select:

**Create new branch...**

Enter:

```
```

```
feature/playwright-locators
```

Press Enter.

VS Code should now show:

```
```

```
feature/playwright-locators
```

at the bottom-left.

---

# Step 19 — Understand what just happened

You now have:

```
```

```
GitHub

main
  │
  └── feature/playwright-locators
```

Your local VS Code is currently working on:

```
```

```
feature/playwright-locators
```

So any practice you do now will go into this branch.

---

# Step 20 — Create your Playwright practice

For example, create:

```
```

```
tests/locator-practice.spec.ts
```

Add your practice code.

For example:

```
```

```
import { test, expect } from '@playwright/test';

test('practice Playwright locators', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.getByRole('link', { name: 'Get started' }).click();

  await expect(page).toHaveTitle(/Playwright/);
});
```

Save it.

---

# Step 21 — Run your test

Before committing:

Open:

**Terminal → New Terminal**

Run:

```
```

```
npx playwright test
```

Make sure your test passes.

You can also run:

```
```

```
npx playwright test tests/locator-practice.spec.ts
```

This is your local validation.

---

# Step 22 — Review changes in VS Code

Go to:

**Source Control**

You should see:

```
```

```
Changes

U tests/locator-practice.spec.ts
```

Click the file.

Review the diff.

This is your first code review before creating the PR.

---

# Step 23 — Stage the change

Click the `+` next to:

```
```

```
tests/locator-practice.spec.ts
```

It moves to:

```
```

```
Staged Changes
```

Now enter:

```
```

```
Add Playwright locator practice
```

Click:

**Commit**

---

# Step 24 — Push your feature branch

Because this is the first time this branch is being sent to GitHub, VS Code should show:

**Publish Branch**

Click it.

Now you have:

```
```

```
GitHub

main
│
└── feature/playwright-locators
```

Your practice code is on GitHub, but **it has not been merged into `main` yet**.

That's exactly what we want.

---

# Step 25 — Create the Pull Request

Open your GitHub repository.

GitHub should detect that you recently pushed:

```
```

```
feature/playwright-locators
```

You may see:

**Compare & pull request**

Click it.

---

# Step 26 — Check the most important PR settings

Before creating the PR, carefully check:

```
```

```
base repository: automation project
base: main

compare: feature/playwright-locators
```

You want:

```
```

```
feature/playwright-locators
              ↓
             main
```

This means:

> Merge my feature branch into main.

---

# Step 27 — Write your PR

Use:

**Title**

```
```

```
Add Playwright locator practice
```

**Description**

```
```

```
## Summary

- Added Playwright locator practice test
- Added getByRole locator example
- Added page title assertion

## Testing

- Playwright test executed successfully
```

Then click:

**Create pull request**

---

# Step 28 — Now perform your self-review

This is something you specifically wanted to practice.

Open the PR.

Go to:

**Files changed**

Review every change.

Check:

```
```

```
✓ Is the test name meaningful?
✓ Is the locator correct?
✓ Is there an assertion?
✓ Is there unnecessary code?
✓ Did I accidentally modify another file?
✓ Did I add any secret/password?
✓ Does the code follow my project structure?
✓ Did the test pass?
```

This is essentially practicing a real QA/SDET PR-review process.

---

# Step 29 — Merge the PR

After your review:

Click:

**Merge pull request**

Then:

**Confirm merge**

Now:

```
```

```
feature/playwright-locators
              ↓
             main
```

The changes are officially part of `main`.

---

# Step 30 — Delete the feature branch

GitHub will normally show:

**Delete branch**

Click it.

Delete:

```
```

```
feature/playwright-locators
```

Why?

Because the work is already merged.

You don't need to keep the completed feature branch around.

---

# Step 31 — Come back to VS Code

Your local VS Code may still show:

```
```

```
feature/playwright-locators
```

Switch to:

```
```

```
main
```

using the bottom-left branch selector.

Then use:

**Source Control → ... → Pull**

This updates your local `main` with the version you just merged on GitHub.

---

# Step 32 — Tomorrow's workflow

Tomorrow, suppose you're learning:

**Playwright Assertions**

You do:

```
```

```
main
 ↓
Pull
 ↓
Create branch
 ↓
feature/playwright-assertions
```

Then:

```
```

```
Write tests
 ↓
Run tests
 ↓
Review changes
 ↓
Stage
 ↓
Commit
 ↓
Publish/Push
 ↓
Create PR
 ↓
Self-review
 ↓
Merge
 ↓
Delete branch
 ↓
Switch to main
 ↓
Pull
```

---

# Your complete VS Code + GitHub process

Save this as your reference:

```
```

```
                    FIRST TIME SETUP

Empty folder
     ↓
Open in VS Code
     ↓
npm init playwright@latest
     ↓
Create .gitignore
     ↓
Initialize Git
     ↓
Create main
     ↓
Add GitHub remote
     ↓
Commit
     ↓
Push main
     ↓
             SETUP COMPLETE
```

After that, your **daily workflow** is:

```
```

```
                 DAILY WORKFLOW

                      main
                       ↓
                 Pull latest code
                       ↓
              Create feature branch
                       ↓
            feature/playwright-xxxxx
                       ↓
                Practice Playwright
                       ↓
                  Run tests
                       ↓
               Review in VS Code
                       ↓
                    Stage
                       ↓
                   Commit
                       ↓
                Publish / Push
                       ↓
              Create Pull Request
                       ↓
               Review Files Changed
                       ↓
                    Merge
                       ↓
                Delete branch
                       ↓
                 Switch to main
                       ↓
                     Pull
                       ↓
              Start next practice
```
