# Deployment Guide - Louisiana Educator Portal Mockup

This guide provides step-by-step instructions for deploying the LEP Mockup to GitHub Pages using GitHub Actions.

## 🚀 Quick Deployment

### Prerequisites
- GitHub account
- Git installed on your local machine
- Node.js and npm installed

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository: `LEP-Mockup`
5. Make it **Public** (required for GitHub Pages)
6. **Do NOT** initialize with README, .gitignore, or license (we'll push our existing code)
7. Click "Create repository"

### Step 2: Push Your Code

```bash
# Navigate to your project directory
cd /path/to/lep-mockup

# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit the changes
git commit -m "Initial commit: LEP Mockup application"

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/LEP-Mockup.git

# Push to main branch
git push -u origin main
```

### Step 3: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select **gh-pages** and **/(root)**
6. Click **Save**

### Step 4: Configure GitHub Actions Permissions

1. In your repository, go to **Settings** > **Actions** > **General**
2. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
3. Click **Save**

### Step 5: Trigger Deployment

The deployment will automatically trigger when you push to the main branch. To manually trigger:

1. Go to **Actions** tab in your repository
2. Click on **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select **main** branch
5. Click **Run workflow**

## 🔧 Troubleshooting

### Common Issues

#### 1. Permission Denied Error (403)
**Error**: `remote: Permission to USERNAME/REPO.git denied to github-actions[bot]`

**Solution**:
- Ensure repository is **Public**
- Check Actions permissions in Settings > Actions > General
- Verify workflow has correct permissions (already configured in our workflow)

#### 2. Build Fails
**Error**: Build step fails with npm errors

**Solution**:
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (we use v18)
- Verify all import statements are correct

#### 3. Pages Not Updating
**Issue**: Changes pushed but GitHub Pages not reflecting updates

**Solution**:
- Wait 2-5 minutes for deployment to complete
- Check Actions tab for deployment status
- Verify gh-pages branch was created and updated
- Clear browser cache

#### 4. 404 Errors on GitHub Pages
**Issue**: Pages load but show 404 for routes

**Solution**:
- This is expected for React Router - GitHub Pages doesn't support client-side routing by default
- Our Vite config includes base path configuration for GitHub Pages
- Users should navigate from the home page, not directly to routes

### Manual Deployment (Alternative)

If GitHub Actions fails, you can deploy manually:

```bash
# Build the project
npm run build

# Install gh-pages package
npm install --save-dev gh-pages

# Add deploy script to package.json
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

## 📋 Repository Settings Checklist

Before deployment, ensure these settings are configured:

### ✅ Repository Settings
- [ ] Repository is **Public**
- [ ] GitHub Pages enabled (Settings > Pages)
- [ ] Source: Deploy from a branch
- [ ] Branch: `gh-pages`
- [ ] Folder: `/ (root)`

### ✅ Actions Settings
- [ ] Actions enabled (Settings > Actions > General)
- [ ] Workflow permissions: Read and write
- [ ] Allow GitHub Actions to create and approve pull requests

### ✅ Code Settings
- [ ] All files committed and pushed
- [ ] No build errors in local development
- [ ] Vite config includes base path for GitHub Pages

## 🌐 Post-Deployment

### Accessing Your Application

Once deployed, your application will be available at:
```
https://YOUR_USERNAME.github.io/LEP-Mockup/
```

### Updating the Application

To update your deployed application:

1. Make changes to your code
2. Commit and push to main branch:
```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```
3. GitHub Actions will automatically rebuild and deploy

### Monitoring Deployments

- Check **Actions** tab to monitor deployment progress
- View deployment logs for any errors
- Verify gh-pages branch is updated with latest build

## 🔒 Security Considerations

### For Production Use

If you plan to use this in production:

1. **Environment Variables**: Move sensitive data to environment variables
2. **API Keys**: Never commit API keys to the repository
3. **Authentication**: Implement proper authentication system
4. **HTTPS**: GitHub Pages provides HTTPS by default
5. **CORS**: Configure CORS if connecting to external APIs

### Current Mockup Status

This application is currently a **mockup/demo** with:
- Mock data (no real database connection)
- Simulated authentication
- Demo functionality only

## 📞 Support

If you encounter issues:

1. Check the **Actions** tab for detailed error logs
2. Verify all settings match the checklist above
3. Try the manual deployment method
4. Open an issue on GitHub with error details

## 🎯 Next Steps

After successful deployment:

1. **Test the Application**: Verify all features work correctly
2. **Share the URL**: Use the GitHub Pages URL for demos or portfolios
3. **Customize**: Modify colors, content, or functionality as needed
4. **Add Features**: Extend the application with additional modules

---

**Note**: This deployment guide is specifically for GitHub Pages. For other hosting platforms (Netlify, Vercel, etc.), refer to their respective documentation. 