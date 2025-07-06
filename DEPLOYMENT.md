# Deployment Guide

This guide will help you deploy the Educational Platform for Renewable Energy Monitoring to GitHub Pages using GitHub Actions.

## Prerequisites

1. **GitHub Account**: You need a GitHub account
2. **Repository**: Your code should be in a GitHub repository
3. **Repository Visibility**: 
   - For free GitHub Pages: Repository must be public
   - For private repositories: You need GitHub Pro or higher

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

If you haven't already, push your code to a GitHub repository:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/{username}/plat-edu-bad-front.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

### 3. Configure Repository Settings

1. Go to **Settings** → **Actions** → **General**
2. Ensure **Actions permissions** is set to **Allow all actions and reusable workflows**
3. Scroll down and click **Save**

### 4. Update Badge URL (Optional)

In the `README.md` file, replace `{username}` with your actual GitHub username in the deployment badge:

```markdown
[![Deploy to GitHub Pages](https://github.com/YOUR_USERNAME/plat-edu-bad-front/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/plat-edu-bad-front/actions/workflows/deploy.yml)
```

### 5. Trigger Deployment

The deployment will automatically trigger when you:
- Push to the `main` or `master` branch
- Create a pull request to `main` or `master`

To manually trigger a deployment:
1. Go to **Actions** tab in your repository
2. Click on **Deploy to GitHub Pages**
3. Click **Run workflow**

## Deployment Process

The GitHub Actions workflow will:

1. **Checkout** the code
2. **Setup Node.js** (version 18)
3. **Install dependencies** using `npm ci`
4. **Run linting** to check code quality
5. **Build the project** using `npm run build`
6. **Deploy to GitHub Pages**

## Accessing Your Deployed Site

Once deployment is complete, your site will be available at:
```
https://{username}.github.io/plat-edu-bad-front/
```

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check the Actions tab for error details
   - Ensure all dependencies are properly installed
   - Verify TypeScript compilation passes

2. **404 Errors on Routes**
   - The 404.html file handles client-side routing
   - Ensure the base path in `vite.config.ts` matches your repository name

3. **Assets Not Loading**
   - Check that the `base` path in `vite.config.ts` is correct
   - Verify all assets are in the `public/` directory

### Environment Variables

For production deployment, you may need to configure:

```bash
# API endpoints
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_WS_URL=wss://your-api-domain.com/ws

# Feature flags
VITE_ENABLE_REAL_TIME=true
VITE_ENABLE_ANALYTICS=true
```

Add these as repository secrets if needed:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add your environment variables as secrets

## Monitoring Deployment

- **Actions Tab**: Monitor deployment progress
- **Pages Tab**: Check deployment status and settings
- **Badge**: The README badge shows deployment status

## Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Add a CNAME record pointing to `{username}.github.io`
4. Create a `CNAME` file in the `public/` directory with your domain

## Security Considerations

- Never commit sensitive information (API keys, passwords)
- Use environment variables for configuration
- Keep dependencies updated
- Review GitHub Actions logs regularly

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify all configuration files are correct
3. Ensure your repository settings are properly configured
4. Check GitHub Pages documentation for additional help 