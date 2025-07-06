# Real-time Monitoring Educational Platform for Renewable Energy

[![Deploy to GitHub Pages](https://github.com/{username}/plat-edu-bad-front/actions/workflows/deploy.yml/badge.svg)](https://github.com/{username}/plat-edu-bad-front/actions/workflows/deploy.yml)

This platform provides real-time monitoring and educational resources for renewable energy systems. Built with React 18, TypeScript, Vite, Tailwind CSS, React Router, and Recharts.

## Features
- Real-time data visualization
- Educational content and resources
- Modern, responsive UI
- Interactive dashboards
- Equipment monitoring
- Floor plan visualization

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts
- ESLint & Prettier

## Project Structure
```
src/
  components/   # Reusable UI components
  pages/        # Page components for routing
  utils/        # Utility functions
  styles/       # Tailwind and custom styles
  types/        # TypeScript interfaces
  services/     # API services
  hooks/        # Custom React hooks
```

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Lint and format code:
   ```bash
   npm run lint
   npm run format
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Prerequisites
1. Push your code to a GitHub repository
2. Ensure your repository is public (or you have GitHub Pro for private repos)

### Setup GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The deployment will automatically trigger on pushes to `main` or `master` branch

### Manual Deployment
If you need to deploy manually:
1. Run the build command: `npm run build`
2. The built files will be in the `dist/` directory
3. Deploy the contents of `dist/` to your web server

### Environment Variables
For production deployment, you may need to configure:
- API endpoints for real-time data
- WebSocket connections
- Environment-specific configurations

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Code Quality
This project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

---

This project is a starting point for building educational and research tools in the renewable energy domain.
