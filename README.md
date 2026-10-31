# Playwright Portfolio

![Playwright Tests](https://github.com/yanivi71/playwright-portfolio/actions/workflows/playwright.yml/badge.svg)

UI and API test automation project built with **Playwright** and **TypeScript**.

## What is tested

| Area | Target | Tests |
|------|--------|-------|
| UI | [saucedemo.com](https://www.saucedemo.com) | Login (valid / invalid), add to cart, full checkout |
| API | [restful-booker](https://restful-booker.herokuapp.com) | GET, POST, PUT, DELETE with token authentication |

## Project structure

```
pages/        Page Objects (LoginPage, InventoryPage, CheckoutPage)
fixtures/     Custom fixtures that inject page objects into tests
tests/        UI specs
tests/api/    API specs
playwright.config.ts   Separate "ui" and "api" projects with their own baseURL
.github/workflows/     CI pipeline (GitHub Actions)
```

## Key concepts demonstrated

- Page Object Model
- Custom fixtures (`test.extend`)
- Separate UI and API projects with `baseURL` in config
- API CRUD flow: create, read back, update, delete, verify 404
- Token-based authentication in API tests
- CI on every push with HTML report uploaded as an artifact

## Run locally

```bash
npm ci
npx playwright install chromium
npx playwright test --project=ui
npx playwright test --project=api
npx playwright show-report
```