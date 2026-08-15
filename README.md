# Playwright Page Object Model with TypeScript

This repository demonstrates the implementation of the Page Object Model (POM) design pattern with Playwright. This project is designed to provide a robust and maintainable testing framework for web applications using Playwright and TypeScript, with a focus on the Page Object Model pattern. The site under test is [Swag Labs](https://www.saucedemo.com) , a demo eCommerce store.

## Features
- Playwright for reliable end-to-end web testing
- TypeScript for type-safe and maintainable test code
- Page Object Model (POM) for better code organization and reusability
- Multi-environment support for running tests against different environments
- Environment-specific configuration using .env files
- Secure secret management using .env.*.secret files
- Authentication setup using Playwright's auth.setup to persist login state
- Cookie/session reuse to avoid logging in before every test
- Reusable page objects and test utilities
- Easy-to-maintain test structure suitable for scaling automation suites

## Installation
Before executing the command `npm install`, please ensure that npm and node are installed on your machine.

**NOTE: BEFORE RUNNING THE TESTS, CREATE `.env.dev.secret` FILE AND ADD THE REQUIRED `PASSWORD` VALUE TO IT.**

## Execution
- Run all the test cases from the "./tests" folder
  ```bash
  npm run test:dev
  ```
- Run test cases for a specific file
  ```bash
  npm run test:{env} {file-name.spec.ts}
  ```
- Run test cases in headed mode
  ```bash
  npm run test:{env} -- --headed
  ```
- Run test cases using tag
  ```bash
  npm run test:{env} -- --grep "{@tag-name}"
  ```
- Run test cases with a specific browser
  ```bash
  npm run test:{env} -- --project {browser-name}
  ```
