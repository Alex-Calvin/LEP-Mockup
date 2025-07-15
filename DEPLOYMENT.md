# 🚀 Deployment Guide - Louisiana Educator Portal

This guide will help you deploy your Louisiana Educator Portal to GitHub and make it accessible via GitHub Pages and GitHub Codespaces.

## 📋 Prerequisites

- GitHub account
- Git installed on your local machine
- Node.js 18+ installed

## 🔧 Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in to your account
2. **Click "New repository"** or the "+" icon in the top right
3. **Repository settings:**
   - **Repository name**: `lep-mockup`
   - **Description**: `Louisiana Educator Portal - A comprehensive web application for managing educator evaluations, roster verification, and data visualization`
   - **Visibility**: Public (for GitHub Pages)
   - **Initialize with**: Don't initialize (we'll push our existing code)
4. **Click "Create repository"**

## 📤 Step 2: Push Code to GitHub

Run these commands in your project directory:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/lep-mockup.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 3: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll down to "Pages"** section
4. **Source**: Select "Deploy from a branch"
5. **Branch**: Select "gh-pages" (this will be created by our GitHub Action)
6. **Folder**: Leave as "/ (root)"
7. **Click "Save"**

## 🤖 Step 4: Enable GitHub Actions

The GitHub Actions workflow is already configured in `.github/workflows/deploy.yml`. It will:

- Build your application when you push to main
- Deploy to GitHub Pages automatically
- Create the `gh-pages` branch

**Your site will be available at**: `https://YOUR_USERNAME.github.io/lep-mockup/`

## 💻 Step 5: Enable GitHub Codespaces

1. **Go to your repository** on GitHub
2. **Click the green "Code" button**
3. **Click "Codespaces" tab**
4. **Click "Create codespace on main"**

This will:
- Create a cloud development environment
- Install all dependencies automatically
- Start the development server
- Provide a URL to access your application

## 🔄 Step 6: Update README Links

After deployment, update the README.md file:

1. **Replace** `your-username` with your actual GitHub username
2. **Update the live demo link** to your actual GitHub Pages URL

## 🎯 Step 7: Test Your Deployment

### GitHub Pages
- Visit: `https://YOUR_USERNAME.github.io/lep-mockup/`
- Test all features: login, navigation, data visualization
- Verify responsive design on mobile devices

### GitHub Codespaces
- Open your repository in Codespaces
- The development server should start automatically
- Test all functionality in the cloud environment

## 🔧 Troubleshooting

### GitHub Pages Not Working
- Check if the `gh-pages` branch was created
- Verify the GitHub Action ran successfully
- Check repository settings for Pages configuration

### Codespaces Issues
- Ensure the `.devcontainer/devcontainer.json` file is present
- Check if Node.js 18+ is available in the container
- Verify port forwarding is working

### Build Errors
- Check the GitHub Actions logs
- Ensure all dependencies are in `package.json`
- Verify the build command works locally

## 📱 Sharing Your Application

### For Job Applications
- **GitHub Repository**: `https://github.com/YOUR_USERNAME/lep-mockup`
- **Live Demo**: `https://YOUR_USERNAME.github.io/lep-mockup/`
- **Codespaces**: One-click development environment

### For Portfolio
- Include screenshots of key features
- Highlight the responsive design
- Mention the modern tech stack (React, Vite, Tailwind CSS)

## 🎉 Success!

Your Louisiana Educator Portal is now:
- ✅ Hosted on GitHub
- ✅ Deployed to GitHub Pages
- ✅ Available via GitHub Codespaces
- ✅ Accessible to anyone with the link
- ✅ Ready for job applications and portfolio

## 🔗 Quick Links

- **Repository**: `https://github.com/YOUR_USERNAME/lep-mockup`
- **Live Demo**: `https://YOUR_USERNAME.github.io/lep-mockup/`
- **Codespaces**: Click "Code" → "Codespaces" → "Create codespace on main"

---

**Note**: Remember to replace `YOUR_USERNAME` with your actual GitHub username throughout this guide. 