# HealthCheck

![screenshot](https://github.com/user-attachments/assets/950aeff6-8d64-46f7-bafd-d3008bb0698d)

HealthCheck is a tool to assess the readiness of a GitHub repository for contributors. Enter a GitHub repository URL to check its health, including dependency setup, contributor guidelines, and best practices.

## Live Preview
[HealthCheck Mini](https://healthcheck-mini.vercel.app/)

## Features

- **GitHub Repository Health Check**: Analyze repositories for contributor readiness.
- **Dependency Overview**: Displays required dependencies and dev dependencies.
- **Best Practices Compliance**: Ensures the repository follows standard practices.
- **Next.js & Tailwind Powered**: Built using Next.js 14, TailwindCSS, and modern UI components.

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/eddiejaoude/healthcheck-mini
cd healthcheck-mini
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start checking repository health.

## Usage
1. Enter a **GitHub Repository URL**.
2. Click **Check Health**.
3. Get a detailed report on repository readiness for contributors.

## Technologies Used
- **Framework**: [Next.js 14](https://nextjs.org/)
- **UI Library**: [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [clsx](https://github.com/lukeed/clsx)
- **State Management**: [Radix Slot](https://www.radix-ui.com/docs/primitives/utilities/slot)
- **Testing**: [Jest](https://jestjs.io/), [Testing Library](https://testing-library.com/)

## Dependencies
```json
{
  "dependencies": {
    "@radix-ui/react-icons": "^1.3.0",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-slot": "^1.1.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.446.0",
    "next": "14.2.13",
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@types/jest": "^29.5.13",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.13",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "ts-jest": "^29.2.5",
    "ts-node": "^10.9.2",
    "typescript": "^5"
  }
}
```

## Contributing
We welcome contributions! Follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to your fork (`git push origin feature-branch`).
5. Open a Pull Request.

## License
This project is licensed under the [MIT License](LICENSE).

## Deploy on Vercel
Deploy your own instance with [Vercel](https://vercel.com/).

---
Developed with ❤️ by Eddie Jaoude