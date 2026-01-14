## [1.11.0](https://github.com/fivaz/fit-v2/compare/v1.10.0...v1.11.0) (2026-01-14)

### ✨ Features

* add settings page with 3 theme modes options ([d20fa34](https://github.com/fivaz/fit-v2/commit/d20fa34baac3c416a4ad9c8b98c313cd9d9d4c4e))
* implement log out ([729138f](https://github.com/fivaz/fit-v2/commit/729138f4fd8efafa7b555ed1925c616c9e83757e))
* implement update body stats in settings ([d28e4c4](https://github.com/fivaz/fit-v2/commit/d28e4c4229c2030f7134bf8866a1f67dbe90a637))
* make settings-detail fetch current body metrics ([48295a6](https://github.com/fivaz/fit-v2/commit/48295a683b040d729691f6b9e446cb22816a1418))
* replace version hard coded with true value ([55bdb34](https://github.com/fivaz/fit-v2/commit/55bdb342f26802892575160d199a737b82142f42))
* separate user and metrics forms in settings ([0a025bf](https://github.com/fivaz/fit-v2/commit/0a025bf7c82b5fc13d287e2812efb6b19bcbb849))

### ♻️ Refactoring

* remove unnecessary imports ([0e53a8d](https://github.com/fivaz/fit-v2/commit/0e53a8db1eceb2c9d2970bd558c5309be7a0c7d0))

### 🧹 Chores

* add body metrics table ([9af6535](https://github.com/fivaz/fit-v2/commit/9af65354d1140f6e30abaa98725fa72f752794b3))
* add settings page ([4496cf0](https://github.com/fivaz/fit-v2/commit/4496cf077487eed32b44417eea2482d1a47163c4))
* log errors in use-optimistic-store, and allow optional update and delete ([db1c8fe](https://github.com/fivaz/fit-v2/commit/db1c8fe56042dd083965831295fc09c4f2ae4df9))
* modify user and body stats form ([afc4282](https://github.com/fivaz/fit-v2/commit/afc4282704079a5a4219560ead5e9031e53cccc2))
* remove any type ([5297800](https://github.com/fivaz/fit-v2/commit/529780075122f2fe6da34b7263df705714d4f0a7))
* rename body metrics table ([aa637f6](https://github.com/fivaz/fit-v2/commit/aa637f619910a899bbbac2de891a529bd49153e9))
* update files to test release locally ([e2178e5](https://github.com/fivaz/fit-v2/commit/e2178e57313c823848124a73e0f6b7ac38151e28))

## [1.10.0](https://github.com/fivaz/fit-v2/compare/v1.9.0...v1.10.0) (2026-01-14)

### ✨ Features

* add a redirect in home page back to the active workout ([526251c](https://github.com/fivaz/fit-v2/commit/526251cc5956167f0101651c2c55acddc504d13d))
* add a timer for workout ([47fe32d](https://github.com/fivaz/fit-v2/commit/47fe32de0d054460f9d115bb2f453c800690fbd5))
* add confirm prompts to delete set and end workout ([2a09b33](https://github.com/fivaz/fit-v2/commit/2a09b338b841055df67ee40cc28d41f1625b78fd))

## [1.9.0](https://github.com/fivaz/fit-v2/compare/v1.8.0...v1.9.0) (2026-01-14)

### ✨ Features

* implement workout page ([d270a51](https://github.com/fivaz/fit-v2/commit/d270a51a45016d84c8077112565ff6ee1f46d26d))

### ♻️ Refactoring

* replace hardcoded types with prisma generated types ([0c66add](https://github.com/fivaz/fit-v2/commit/0c66addea9bd4867c5dced55a88beff213f0c047))
* simplify conditional layout ([2971e35](https://github.com/fivaz/fit-v2/commit/2971e351a2112f25345d6685f99e5c890d81c3be))

### ⚡ Performance

* reduce the number of attributes sent from the db ([c107b4b](https://github.com/fivaz/fit-v2/commit/c107b4b4a6d822678702d1737c5d7f84d06d9c62))

### 🧹 Chores

* add functions to create and fetch workout ([738915d](https://github.com/fivaz/fit-v2/commit/738915d9821c1638686ee7d150a29f2a5af00786))
* add imageUrl to program ([56de60c](https://github.com/fivaz/fit-v2/commit/56de60c58e65e4fb5935c27d9f21211685edf042))
* add workout and related tables ([29d4cb1](https://github.com/fivaz/fit-v2/commit/29d4cb1dbe1b5ad9edda8f6c1f0a6947e9740a79))
* create design for workout page ([0482600](https://github.com/fivaz/fit-v2/commit/0482600cb085ac4afd48cc3410196b16f7a2d20f))

## [1.8.0](https://github.com/fivaz/fit-v2/compare/v1.7.0...v1.8.0) (2026-01-14)

### ✨ Features

* change primary color ([435335f](https://github.com/fivaz/fit-v2/commit/435335faaba8d583cda4b461d821d78284bd6ff3))
* rework layout ([58df88a](https://github.com/fivaz/fit-v2/commit/58df88a03ebd67b6d34bb4990ff6867afc49d8a4))
* update program page design ([8062d1c](https://github.com/fivaz/fit-v2/commit/8062d1c9a0b5966f65fb4904a2abfceb0905872c))
* update programs design ([cf73c9d](https://github.com/fivaz/fit-v2/commit/cf73c9d9b9650b2674aa7c5adac4005758ec68ca))
* upgrade program exercise row design ([44af27e](https://github.com/fivaz/fit-v2/commit/44af27ebd708dc1b34bbd79ee4b2ce17391af954))

### 🧹 Chores

* add design for exercises ([316af3b](https://github.com/fivaz/fit-v2/commit/316af3b5645bba9b6defad7249a60a48e8e3d007))
* add design for progress bar ([43ecc61](https://github.com/fivaz/fit-v2/commit/43ecc615541ab54fdcaefe5d7270a181aa1c153f))

## [1.7.0](https://github.com/fivaz/fit-v2/compare/v1.6.0...v1.7.0) (2026-01-14)

### ✨ Features

* add debounce to reorder items ([efde887](https://github.com/fivaz/fit-v2/commit/efde88763b6db6ff84e73ea20b3de2085642c471))
* implement add exercises to program ([b0cd1fb](https://github.com/fivaz/fit-v2/commit/b0cd1fb3bc6abb377c80c3521294842b5f764310))
* implement drag and drop for program's exercises ([95ef747](https://github.com/fivaz/fit-v2/commit/95ef7470fe36f010a073307631fcb85e42e57958))
* show exercises in program page ([fd89a7a](https://github.com/fivaz/fit-v2/commit/fd89a7a4d108114ef6f9d1a5fad940044e12ea8f))

### 🐛 Bug Fixes

* add exercise form was not closing on submit ([89bff27](https://github.com/fivaz/fit-v2/commit/89bff27043752103c65b5a85de063e487bfc5b45))

### ♻️ Refactoring

* modify table program to exercise relationship ([92430cb](https://github.com/fivaz/fit-v2/commit/92430cbfb66b92b4a0890c849730feac51736dc5))
* move sort programs to use useOptimisticStore ([a35a6c7](https://github.com/fivaz/fit-v2/commit/a35a6c7d8b021c9042d17472ec0529eca36cf8e9))

### 🧹 Chores

* add page of exercises in program page ([3a0d8df](https://github.com/fivaz/fit-v2/commit/3a0d8df6b8f4112cc0d0b53337444c1f55cb1c33))

## [1.6.0](https://github.com/fivaz/fit-v2/compare/v1.5.0...v1.6.0) (2026-01-14)

### ✨ Features

* implement create exercise ([217f1b6](https://github.com/fivaz/fit-v2/commit/217f1b69e6f398fe22fed43d59841779a65b63dc))
* implement exercise search and filtering ([34145a7](https://github.com/fivaz/fit-v2/commit/34145a7a07842dc3d63faef030485daf408c5172))
* implement update and delete exercise ([2bf1ac3](https://github.com/fivaz/fit-v2/commit/2bf1ac3f2526198e5a7214e43a74e27c6603808d))

### 🏗️ Build

* improve detection of out of sync pnpm-lock ([36fbcf8](https://github.com/fivaz/fit-v2/commit/36fbcf8d2cbf09be7cb6190859fb11c3a0285544))
* modify script to check the pnpm-lock after installing dependencies ([8616111](https://github.com/fivaz/fit-v2/commit/8616111e55ca9eaae6d234d0e45459ade723cef8))

### 🧹 Chores

* move exercise search and muscle filtering to client component ([2420f72](https://github.com/fivaz/fit-v2/commit/2420f7265586ba7df9c4ea2bfef3c9f5f773d644))
* wip - creat exercise components ([1b80878](https://github.com/fivaz/fit-v2/commit/1b80878b496b125b47dce5c2f3f06050e27928e5))

## [1.5.0](https://github.com/fivaz/fit-v2/compare/v1.4.0...v1.5.0) (2026-01-14)

### ✨ Features

* add delete program ([5cff15c](https://github.com/fivaz/fit-v2/commit/5cff15ccad8336d4330e2448172ede9dde411e91))
* add edit program ([fe61ec3](https://github.com/fivaz/fit-v2/commit/fe61ec3206385fbdd6346aec3df3604868f6058f))
* add images for each muscle in program form ([cb22991](https://github.com/fivaz/fit-v2/commit/cb22991f89fdf45498914568dedfe0e09af33dc4))
* return user to programs page after deleting the current program ([5417157](https://github.com/fivaz/fit-v2/commit/54171578d8512c7de6bd411955cad75a34091749))

### 🐛 Bug Fixes

* assets were not appearing ([28085f5](https://github.com/fivaz/fit-v2/commit/28085f5ce8cde579e8b50ce7731a6447725f85ec))

### ♻️ Refactoring

* move hooks, context and provider entangled to specific folders ([710ad5d](https://github.com/fivaz/fit-v2/commit/710ad5def01d6f9dd53f802c9ee71926729f9fc5))
* simplify hook create-optimistic-list ([cdda70a](https://github.com/fivaz/fit-v2/commit/cdda70af6d544cd70092b1ee7b6f73a21a23ded2))
* simplify program add using optimistic store hook ([30229b6](https://github.com/fivaz/fit-v2/commit/30229b6b29efe2cd0c2512e9024beb3a43283294))
* simplify program update and delete using optimistic store hook ([a980b23](https://github.com/fivaz/fit-v2/commit/a980b238de4ba9b03e5ca016ee150450665ed4a7))
* simplify types of use optimistic list ([b61edbe](https://github.com/fivaz/fit-v2/commit/b61edbe80ea63b29c3351d6124745a4b722a791a))

### 🏗️ Build

* sync pnpm-lock ([42564db](https://github.com/fivaz/fit-v2/commit/42564db1d53dd988414f2650b553acef907502f9))

### 🧹 Chores

* centralize logging ([0127a2c](https://github.com/fivaz/fit-v2/commit/0127a2c8cb7a39d099fa480c6af0e59c4a861e6d))
* wip - add optimistic-store ([b4cbff7](https://github.com/fivaz/fit-v2/commit/b4cbff765e6eaa489792826b60cc354ed1b745ab))

## [1.4.0](https://github.com/fivaz/fit-v2/compare/v1.3.0...v1.4.0) (2026-01-14)

### ✨ Features

* add exercise page ([385213f](https://github.com/fivaz/fit-v2/commit/385213f0285738db14b781e7fece7daa36820346))
* add icons for pwa ([be2cc89](https://github.com/fivaz/fit-v2/commit/be2cc8943fd22ee8b1e0bcf325ef493a4217d4e8))
* add program page ([a68eb05](https://github.com/fivaz/fit-v2/commit/a68eb05be28276405a128a005a28586ace22134c))
* recreate design for programs list ([2ec4e28](https://github.com/fivaz/fit-v2/commit/2ec4e286d4f43333145b147cfd80e6b71ba38beb))

## [1.3.0](https://github.com/fivaz/fit-v2/compare/v1.2.0...v1.3.0) (2026-01-14)

### ✨ Features

* implement sort programs ([cd64da2](https://github.com/fivaz/fit-v2/commit/cd64da293392f76bdce7d83e607039da1cc98539))

### 🏗️ Build

* sync pnpm-lock before push ([6a38164](https://github.com/fivaz/fit-v2/commit/6a381642778b8752846704b4e4136545003b37de))
* try to build app locally before pushing it ([290d789](https://github.com/fivaz/fit-v2/commit/290d7896f170fd30abad4dc91b9b906f1cb46d9c))

### 🧹 Chores

* add seed ([e9e25f2](https://github.com/fivaz/fit-v2/commit/e9e25f26de81d0936320008b7505404c641f16bc))

## [1.2.0](https://github.com/fivaz/fit-v2/compare/v1.1.0...v1.2.0) (2026-01-14)

### ✨ Features

* implement add program ([c2cffaa](https://github.com/fivaz/fit-v2/commit/c2cffaa4070bcafbb97f2803e758d123d0135f59))

### ♻️ Refactoring

* run prettier ([afc07b1](https://github.com/fivaz/fit-v2/commit/afc07b1c97806f3bd43ce0ac65b6eaa053a79d86))

### 👷 CI

* fix ci by updating pnpm-lock ([6168813](https://github.com/fivaz/fit-v2/commit/6168813608f9e9d8b8ba441fd9a83431ad16ceb9))

### 🧹 Chores

* add muscles images to program form ([91cdb04](https://github.com/fivaz/fit-v2/commit/91cdb04a9037092a7d04e065a213e4b501fd4931))
* add optimistic list, program table and fetch programs ([822d2c7](https://github.com/fivaz/fit-v2/commit/822d2c7cdfd004ba24ed1161d4282b6b55ca0ef2))
* add program form ([90fb10f](https://github.com/fivaz/fit-v2/commit/90fb10f93f1dcd1c2b22a3d0bdc9c7481052d2d5))

## [1.1.0](https://github.com/fivaz/fit-v2/compare/v1.0.0...v1.1.0) (2026-01-14)

### ✨ Features

* add complete authentication ([a5e883b](https://github.com/fivaz/fit-v2/commit/a5e883b0de57ef1bdf23bd1bf87fbfba4eb7a74f))

### 🧹 Chores

* add dashboard navigation ([44ee226](https://github.com/fivaz/fit-v2/commit/44ee2262118d604afb7bc1addc8fcfcf95724c13))
* add prisma and better auth ([b458f27](https://github.com/fivaz/fit-v2/commit/b458f2768716379b85ce37de19e45acf706e9039))
* add shadcn with theme ([46001b7](https://github.com/fivaz/fit-v2/commit/46001b737efc6fcbcfff9410ec3517ed27f3e1ed))
* add theme provider, confirm-dialog and mode-toggle ([99e8e51](https://github.com/fivaz/fit-v2/commit/99e8e51c7a0beb4a5ceda44c7c2657c9c2502193))

## 1.0.0 (2026-01-14)

### 🏗️ Build

* add conventional commit and semantic release ([5228b38](https://github.com/fivaz/fit-v2/commit/5228b38cacd31fb55ed08c5f924f3dac585d4ca8))
* add prettier and eslint libs ([03df006](https://github.com/fivaz/fit-v2/commit/03df006cfc1815f71e4a74c4ff34c79242251bbc))

### 👷 CI

* add more commits to generate releases ([55853e8](https://github.com/fivaz/fit-v2/commit/55853e839787a639405a2b19c1b1b8207c426017))
* change release branch ([c687ff2](https://github.com/fivaz/fit-v2/commit/c687ff202efb578fce4537a3da7d3fe53e3d5654))

### 🧹 Chores

* add .ide files ([d1d0345](https://github.com/fivaz/fit-v2/commit/d1d034551f0e3c60f050e6b73f3888ad9708e2f4))
* update files to test release locally ([57e3fbc](https://github.com/fivaz/fit-v2/commit/57e3fbc28623bc36a5de4cde2953a8c7d89f6999))
