# Louisiana Educator Portal (LEP) - LES Module Mockup

An interactive, code-based frontend mockup for the Louisiana Educator Portal focusing on the Louisiana Evaluator System (LES) module. This project demonstrates modern UX/UI practices with a focus on accessibility, mobile-first design, and Louisiana state branding.

## 🎯 Project Overview

This mockup showcases a comprehensive educator evaluation system with:
- **Role-based Dashboard**: Personalized greeting and summary cards with VAM timeline
- **Multi-step Evaluation Workflow**: Interactive form with progress tracking
- **Roster Verification System**: Complete VAM roster verification workflow
- **Data Visualization**: Responsive charts and analytics
- **Mobile-First Design**: Fully responsive across all devices
- **Accessibility Features**: ARIA labels, keyboard navigation, semantic HTML

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will be available at `http://localhost:5173`

### GitHub Codespaces
1. Click the "Code" button on this repository
2. Select "Open with Codespaces"
3. Wait for the environment to build
4. The development server will start automatically

### Login Credentials
Use these test credentials to access the application:
- **Username**: `alex.calvin`
- **Password**: Any password with 6+ characters

## 🎨 Design Decisions & UX/UI Priorities

### 1. Louisiana State Branding
- **Color Palette**: Blue (#1e40af), Gold (#f59e0b), White (#ffffff)
- **Inspiration**: Based on Louisiana.gov design patterns
- **Consistency**: Applied throughout all components and interactions

### 2. Accessibility-First Approach
- **Semantic HTML**: Proper heading hierarchy and landmark roles
- **ARIA Labels**: Screen reader support for all interactive elements
- **Keyboard Navigation**: Full keyboard accessibility with focus indicators
- **Color Contrast**: WCAG AA compliant color combinations
- **Reduced Motion**: Respects user's motion preferences

### 3. Mobile-First Responsive Design
- **Breakpoints**: xs (475px), sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive layouts
- **Touch-Friendly**: Minimum 44px touch targets
- **Progressive Enhancement**: Core functionality works without JavaScript

### 4. User Experience Enhancements
- **Progressive Disclosure**: Information revealed as needed
- **Clear Visual Hierarchy**: Consistent typography and spacing
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: User-friendly error messages and validation
- **Save Functionality**: Draft saving to prevent data loss

## 🏗️ Architecture & Tech Stack

### Frontend Framework
- **React 18**: Modern hooks-based components
- **React Router**: Client-side routing with nested routes
- **State Management**: Local component state with React hooks

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable component classes
- **CSS Variables**: Louisiana state colors as CSS custom properties

### Data Visualization
- **Recharts**: Responsive chart library
- **Mock Data**: Realistic sample data for demonstration
- **Interactive Charts**: Tooltips, legends, and responsive containers

### Icons & UI Elements
- **Lucide React**: Consistent icon library
- **Custom Components**: Button, card, input field components
- **Animation**: Subtle transitions and hover effects

## 📱 Key Features

### Dashboard View
- **Role-based Greeting**: Time-aware personalized welcome message
- **Summary Cards**: Pending evaluations, completion stats, roster verification progress
- **VAM Timeline**: Official roster verification timeline with phase indicators
- **Quick Actions**: Direct access to common tasks including roster verification
- **Recent Activity**: Timeline of recent actions
- **VAM Information**: Value-Added Model eligibility and weight information

### Evaluation Workflow
- **Multi-step Form**: 4-step evaluation process
- **Progress Tracking**: Visual progress bar and step indicators
- **Save Draft**: Auto-save functionality
- **Form Validation**: Real-time validation with helpful messages
- **Rating System**: 1-5 scale with clear descriptions

### Roster Verification System
- **VAM Timeline**: Official 2024-2025 verification timeline
- **Course Eligibility**: Clear indication of VAM-eligible courses
- **Verification Workflow**: Step-by-step roster verification process
- **Status Tracking**: Real-time verification status updates
- **Export Functionality**: Download roster data and verification reports

### Data Visualization
- **Trend Analysis**: Line charts showing evaluation trends
- **Subject Breakdown**: Pie chart of evaluations by subject
- **Rating Distribution**: Bar chart of rating frequencies
- **School Performance**: Comparative school analytics
- **Export Functionality**: Data export capabilities

### Mobile Responsiveness
- **Collapsible Sidebar**: Mobile-friendly navigation
- **Touch Gestures**: Swipe-friendly interactions
- **Responsive Tables**: Horizontal scrolling on mobile
- **Adaptive Charts**: Charts resize for mobile screens

## 🎯 UX/UI Design Decisions Explained

### 1. Why Multi-step Evaluation Form?
- **Reduces Cognitive Load**: Breaks complex process into manageable steps
- **Progress Indication**: Users know exactly where they are in the process
- **Save Functionality**: Prevents data loss during long evaluation sessions
- **Validation**: Step-by-step validation prevents errors

### 2. Why Louisiana State Colors?
- **Brand Recognition**: Familiar colors for Louisiana educators
- **Professional Appearance**: Government-appropriate color scheme
- **Accessibility**: High contrast ratios for readability
- **Consistency**: Matches existing Louisiana state websites

### 3. Why Mobile-First Design?
- **Educator Workflow**: Many evaluations happen on tablets/mobile devices
- **Field Work**: Classroom observations often require mobile access
- **Inclusive Design**: Ensures access across all device types
- **Future-Proof**: Mobile usage continues to grow

### 4. Why Interactive Charts?
- **Data Insights**: Visual representation of evaluation trends
- **Decision Support**: Helps identify patterns and areas for improvement
- **Professional Reporting**: Supports administrative decision-making
- **Engagement**: Interactive elements increase user engagement

## 🔧 Customization

### Adding New Features
1. Create new components in `src/components/`
2. Add routes in `src/App.js`
3. Update navigation in the sidebar
4. Follow existing patterns for consistency

### Modifying Colors
Update CSS variables in `src/index.css`:
```css
:root {
  --la-blue: #1e40af;
  --la-gold: #f59e0b;
  /* Add more custom colors as needed */
}
```

### Adding New Charts
1. Import chart components from Recharts
2. Create data structure
3. Add to DataVisualization component
4. Ensure responsive behavior

## 🌐 Deployment

### GitHub Pages
The application is automatically deployed to GitHub Pages when changes are pushed to the main branch.

**Live Demo**: [View Live Demo](https://your-username.github.io/lep-mockup/)

### Manual Deployment
1. Build the application: `npm run build`
2. Deploy the `dist/` folder to your hosting provider

### GitHub Codespaces
- **One-click setup**: Open with Codespaces for instant development environment
- **Pre-configured**: All dependencies and extensions included
- **Port forwarding**: Automatic port forwarding for development server

## 📊 Performance Considerations

- **Code Splitting**: React Router enables lazy loading
- **Optimized Images**: SVG icons for scalability
- **Minimal Dependencies**: Only essential packages included
- **Efficient Rendering**: React.memo for expensive components
- **Bundle Size**: Tree-shaking removes unused code

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📝 Future Enhancements

- **Real API Integration**: Connect to actual backend services
- **User Authentication**: Role-based access control
- **Offline Support**: Service workers for offline functionality
- **Advanced Analytics**: Machine learning insights
- **Multi-language Support**: Internationalization
- **Dark Mode**: Accessibility and user preference support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow existing code patterns
4. Test on multiple devices
5. Submit a pull request

## 📄 License

This project is created for demonstration purposes as part of a job interview process.

---

**Note**: This is a frontend mockup with mock data. In a production environment, you would integrate with real backend services, implement proper authentication, and add comprehensive error handling. 