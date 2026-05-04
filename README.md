# Cypress Framework Sample - SauceDemo E2E

E2E framework cho ứng dụng SauceDemo, viết bằng **TypeScript + Cypress**, có:

- Chạy test theo môi trường `dev` / `staging` / `prod`
- Page Object Model với fluent API
- Custom commands: login UI, login bằng `cy.session` (cache cross-spec)
- Báo cáo Mochawesome (HTML + JSON, có merge)
- Pipeline Jenkins tự động chạy + publish report

## 1. Cấu trúc thư mục

```
cypress.config.ts                  # Cypress config + setupNodeEvents
tsconfig.json                      # TS config gốc
cypress/
  tsconfig.json                    # TS config cho test code
  config/
    environment.ts                 # Helper resolve baseUrl + report title
  e2e/
    login.cy.ts                    # Spec login
  pages/
    LoginPage.ts                   # Page Object
  support/
    commands.ts                    # Custom commands (cy.login, cy.loginBySession)
    constants.ts                   # Routes + thông điệp lỗi
    types.ts                       # Domain types (User, UsersFixture)
    index.d.ts                     # Khai báo type cho custom commands
    e2e.ts                         # Entry point support
  fixtures/
    auth/users.json                # Test data
reports/mochawesome/               # HTML + JSON report
Jenkinsfile                        # CI pipeline
```

## 2. Kịch bản test

Spec `login.cy.ts` cover:

1. Login thành công với user hợp lệ (qua `cy.loginBySession`)
2. Login thất bại với user sai thông tin (assert thông điệp lỗi)
3. Login thất bại với user bị khóa

User test được khai báo trong `cypress/fixtures/auth/users.json`: `validUser`, `lockedUser`, `invalidUser`.

## 3. Custom commands

| Command | Khi nào dùng |
| --- | --- |
| `cy.login(user)` | Login qua UI — phù hợp cho negative test cần kiểm tra UI lỗi |
| `cy.loginBySession(user)` | Login cache bằng `cy.session`, reuse session giữa các test/spec |

`cy.loginBySession` có `validate` để re-login khi session hết hạn và `cacheAcrossSpecs: true` để giảm thời gian chạy.

## 4. Cấu hình môi trường

`cypress/config/environment.ts` resolve `baseUrl` theo thứ tự ưu tiên:

1. `--env baseUrl=...` truyền qua CLI
2. Biến môi trường `CYPRESS_BASE_URL`
3. URL theo environment (`dev` / `staging` / `prod`)
4. Fallback về `dev`

Chọn môi trường qua `--env environment=staging` hoặc biến `TEST_ENV`. Staging/Prod URL có thể override bằng `CYPRESS_BASE_URL_STAGING` / `CYPRESS_BASE_URL_PROD`.

## 5. Cấu hình test (cypress.config.ts)

- `retries`: runMode = 2, openMode = 0
- `defaultCommandTimeout` = 8000
- `requestTimeout` = 15000, `responseTimeout` = 30000, `pageLoadTimeout` = 60000
- `video` = true — tự xoá video khi spec pass 100% để giảm artifact
- `screenshotOnRunFailure` = true

Report title được enrich bằng metadata CI (BUILD_NUMBER, GIT_BRANCH, GIT_COMMIT) khi chạy trên Jenkins.

## 6. Scripts npm

| Script | Mô tả |
| --- | --- |
| `npm run cy:open` | Mở Cypress runner |
| `npm test` / `npm run test:dev` | Chạy test môi trường dev |
| `npm run test:staging` | Chạy test môi trường staging |
| `npm run test:prod` | Chạy test môi trường prod |
| `npm run test:login` | Chạy riêng spec login |
| `npm run clean:reports` | Xoá thư mục report |
| `npm run report:merge` | Merge các JSON report thành `report.json` |
| `npm run report:generate` | Sinh HTML từ `report.json` |
| `npm run test:report` | Pipeline đầy đủ: clean → test → merge → generate |

## 7. Chạy local

```bash
npm ci
npx cypress install
npm test                    # chạy dev
npm run test:staging        # chạy staging
npm run test:report         # chạy + tạo report tổng hợp
```

Report HTML tổng hợp ở `reports/mochawesome/mochawesome.html`.

## 8. Jenkins CI

Pipeline (`Jenkinsfile`):

1. Checkout
2. `npm ci`
3. `npx cypress install`
4. `npm run test:report` + `publishHTML`
5. Archive `reports/mochawesome/**/*`

Có cron `H 1 * * 1-5` (khoảng 1h sáng giờ VN, T2-T6).

## 9. Mở rộng framework

- Thêm Page Object mới ở `cypress/pages/`
- Thêm route/thông điệp dùng chung ở `cypress/support/constants.ts`
- Thêm types domain ở `cypress/support/types.ts`
- Thêm custom command ở `cypress/support/commands.ts` và khai báo trong `index.d.ts`
- Thêm fixture theo domain ở `cypress/fixtures/<domain>/`
- Thêm spec ở `cypress/e2e/<feature>.cy.ts`
