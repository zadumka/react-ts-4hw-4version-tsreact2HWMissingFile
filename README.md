# Guest House Admin — шаблон домашнього завдання 4

Шаблон для домашнього завдання 4 курсу React v4: форма бронювання кімнати.

## Що вже є в шаблоні

- проєкт на Vite: React, TypeScript, React Compiler, ESLint;
- встановлені `modern-normalize`, `react-hook-form`, `zod`, `@hookform/resolvers` і `sonner`; у `src/main.tsx` підключено `modern-normalize` і глобальні стилі `src/index.css`;
- аліас `@/` для папки `src`: імпорти з інших папок пиши через `@/`, файли з тієї ж папки — через `./`;
- компонент `App` у `src/components/App/App.tsx`;
- готові стилі всіх компонентів у файлах `.module.css` у папках `src/components`;
- файл `.env.example` з адресою бекенду; `.env` уже додано в `.gitignore`.

Стилі писати не треба. Файли компонентів `.tsx`, сервіс запитів, типи і `src/vite-env.d.ts` ти створюєш сам.

## Як почати

1. Натисни **Use this template** → **Create a new repository** і створи репозиторій `04-react-booking` у своєму акаунті.
2. Склонуй свій репозиторій і встанови залежності:

   ```bash
   npm install
   ```

3. Скопіюй `.env.example` у `.env`:

   ```bash
   cp .env.example .env
   ```

4. Запусти проєкт:

   ```bash
   npm run dev
   ```

## Перевірка перед здачею

```bash
npm run lint
npm run build
```

Обидві команди мають виконатися без помилок.
