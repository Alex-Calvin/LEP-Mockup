# Louisiana Educator Portal (LEP) Mockup

A modern React-based web application for Louisiana educators to manage rosters, certifications, evaluations, and data visualization.

## 🚀 Features

- **Dashboard**: Overview of key metrics and recent activities
- **Roster Verification**: Manage and verify student rosters
- **Data Visualization**: Interactive charts and analytics
- **Evaluation Workflow**: Streamlined teacher evaluation process
- **Certifications**: Track and manage educator certifications
- **Authentication**: Secure user login and session management

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with GitHub Actions

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Alex-Calvin/LEP-Mockup.git
cd LEP-Mockup
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Build

To build for production:
```bash
npm run build
```

## 🚀 Deployment

This project is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy to GitHub Pages using the GitHub Actions workflow

### Repository Settings

Ensure the following are configured in your GitHub repository:

1. **GitHub Pages**: Enable from Settings > Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`
   - Folder: `/ (root)`

2. **Actions Permissions**: Enable from Settings > Actions > General
   - Allow all actions and reusable workflows
   - Allow GitHub Actions to create and approve pull requests

## 🏗️ Development

### Project Structure

```
src/
├── components/          # React components
│   ├── Authentication.jsx
│   ├── Certifications.jsx
│   ├── Dashboard.jsx
│   ├── DataVisualization.jsx
│   ├── EvaluationWorkflow.jsx
│   ├── Header.jsx
│   ├── RosterVerification.jsx
│   └── Sidebar.jsx
├── data/               # Mock data
│   └── mockDatabase.json
├── services/           # Data services
│   └── databaseService.js
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔧 Configuration

### Vite Configuration

The project uses Vite for fast development and building. The configuration is optimized for GitHub Pages deployment with the correct base path.

### Tailwind CSS

Tailwind CSS is configured for utility-first styling with custom color schemes and responsive design.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please open an issue on GitHub.

---

**Note**: This is a mockup/demo application for educational purposes. It uses mock data and is not connected to real Louisiana education systems. 