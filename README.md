# Cypress Framework Sample - SauceDemo E2E

Framework E2E test web application SauceDemo, xay dung voi Cypress, co ho tro:
- Chay test theo moi truong dev, staging, prod
- To chuc Page Object Model
- Custom command cho login va login theo session
- Bao cao test bang Mochawesome (HTML + JSON)
- Pipeline Jenkins de chay tu dong va publish report

## 1. Tong quan

Project nay tap trung vao bai toan kiem thu luong dang nhap tren trang SauceDemo:
- Login thanh cong voi tai khoan hop le
- Login that bai voi tai khoan sai thong tin
- Login that bai voi tai khoan bi khoa

Ngoai bo test mau, project duoc to chuc theo huong de mo rong them nhieu spec khac trong tuong lai.

## 2. Cong nghe su dung

- Node.js + npm
- Cypress 15.8.1
- Mochawesome, mochawesome-merge, mochawesome-report-generator
- TypeScript (song song voi ban JavaScript)
- Jenkins Pipeline (CI)

## 3. Cau truc thu muc

- cypress/e2e/
  - login.cy.ts: spec TypeScript
  - login.cy.js: spec JavaScript
- cypress/pages/
  - LoginPage.ts: Page Object TypeScript
  - LoginPage.js: Page Object JavaScript
- cypress/support/
  - commands.ts, commands.js: custom commands
  - e2e.ts, e2e.js: diem vao support
  - index.d.ts: khai bao typing cho custom command
- cypress/fixtures/auth/users.json: du lieu user test
- cypress.config.ts, cypress.config.js: cau hinh Cypress
- reports/mochawesome/: report dau ra
- Jenkinsfile: pipeline CI

Luu y:
Project dang duy tri dong thoi ca JS va TS cho cung luong test login.

## 4. Kich ban test hien co

Bo test login gom 3 test case:
1. Login thanh cong voi user hop le.
2. Login that bai voi user sai username/password.
3. Login that bai voi user bi khoa.

Du lieu test duoc quan ly trong fixture:
- validUser
- invalidUser
- lockedUser

## 5. Page Object va Custom Commands

### Page Object

LoginPage dong vai tro gom locator va hanh dong:
- Truy cap trang login
- Nhap username
- Nhap password
- Bam nut login

### Custom Commands

- cy.login(username, password)
  - Login qua UI, phu hop cho test negative.
- cy.loginBySession(username, password)
  - Login thong qua cy.session de tai su dung session.
  - Co ham validate de dam bao session van hop le truoc khi su dung.

## 6. Cau hinh moi truong va baseUrl

Cau hinh ho tro map moi truong sang baseUrl:
- dev: mac dinh https://www.saucedemo.com/
- staging: lay tu CYPRESS_BASE_URL_STAGING neu co
- prod: lay tu CYPRESS_BASE_URL_PROD neu co

Thu tu uu tien baseUrl:
1. env baseUrl truyen truc tiep cho Cypress
2. bien moi truong CYPRESS_BASE_URL
3. baseUrl theo environment (dev/staging/prod)
4. fallback ve dev

Chon moi truong chay qua bien env environment hoac TEST_ENV.

## 7. Retry, timeout, video, screenshot

Project da cau hinh:
- retries runMode = 2, openMode = 0
- defaultCommandTimeout = 8000
- requestTimeout = 15000
- responseTimeout = 30000
- pageLoadTimeout = 60000
- screenshotOnRunFailure = true
- video = true

Toi uu artifact:
- Video se bi xoa neu spec pass 100% (hook after:spec), giup giam dung luong report artifact.

## 8. Scripts npm

Trong package.json co cac script chinh:

- npm test
  - Chay test voi environment=dev
- npm run test:dev
- npm run test:staging
- npm run test:prod
- npm run test:login
  - Chay rieng spec login.cy.js
- npm run merge-reports
  - Gop cac file JSON report thanh report.json
- npm run generate-report
  - Sinh file HTML report tu report.json
- npm run test:report
  - Chay test + merge report + generate report

## 9. Huong dan chay local

### Buoc 1: Cai dependency

npm ci

### Buoc 2: Cai binary Cypress

npx cypress install

### Buoc 3: Chay test

Chay mac dinh dev:

npm test

Chay theo moi truong:

npm run test:staging
npm run test:prod

Chay 1 spec:

npm run test:login

### Buoc 4: Tao report tong hop

npm run test:report

Report HTML duoc tao tai:
- reports/mochawesome/mochawesome.html

## 10. Jenkins CI pipeline

Pipeline gom cac stage:
1. Checkout
2. Install Dependencies (npm ci)
3. Install Cypress (npx cypress install)
4. Run Cypress Tests + Build Report (npm run test:report)
5. Archive Artifacts (reports/mochawesome/**/*)

Diem noi bat:
- Co lich cron chay tu dong cac ngay trong tuan.
- Publish report HTML len Jenkins bang publishHTML.
- Luu artifact report de truy vet ket qua lich su.

## 11. Bao cao test

Project dung Mochawesome:
- Moi lan run tao json/html rieng (overwrite=false)
- Co the merge nhieu json thanh mot report tong
- Da co du lieu report mau trong thu muc reports/mochawesome

Thong ke report mau hien tai:
- Suites: 1
- Tests: 3
- Passes: 3
- Failures: 0

## 12. TypeScript support

- tsconfig goc bat strict mode.
- cypress/tsconfig.json mo rong tu tsconfig goc va them types cho Cypress + Node.
- cypress/support/index.d.ts khai bao typing cho custom commands.

## 13. Cach mo rong framework

Goi y mo rong:
- Them page object cho man hinh moi trong cypress/pages
- Them custom command dung chung vao cypress/support/commands.ts
- Them fixture theo domain vao cypress/fixtures
- Tao spec moi trong cypress/e2e
- Them script chay theo tag/spec neu can

## 14. Luu y van hanh

- Hien tai ton tai song song file JS va TS cho cung nghiep vu login. Nhom nen thong nhat huong su dung (uu tien TS hoac JS) de tranh trung lap ve lau dai.
- Neu su dung Jenkins hoac moi truong CI khac, can dam bao bien moi truong base URL duoc truyen dung theo tung environment.

## 15. Lenh nhanh

npm ci
npx cypress install
npm run test:report

---

Neu ban muon, co the tach them 2 tai lieu rieng:
- CONTRIBUTING.md (quy uoc them test)
- TROUBLESHOOTING.md (xu ly loi thuong gap khi chay Cypress tren CI)
