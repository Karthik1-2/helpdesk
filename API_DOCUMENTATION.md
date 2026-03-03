# College Complaint Management System - API Documentation

## Overview

This is a complete College Complaint Management System built with React, TypeScript, and LocalStorage for data persistence. The application features a beautiful UI with dark/light mode, animations, charts, and comprehensive complaint tracking.

## Features

### 🎨 UI/UX Features
- **Modern, colorful gradient-based design**
- **Dark/Light mode toggle** with persistent theme
- **Smooth animations** using Motion (formerly Framer Motion)
- **Responsive design** that works on all devices
- **Glassmorphism effects** for cards and overlays
- **Toast notifications** for user feedback
- **Interactive charts** (Pie, Bar charts) using Recharts

### 🔐 Authentication
- **Student Login/Registration** with email and password
- **Admin Login** with separate credentials
- **Protected routes** based on user role
- **Persistent sessions** using localStorage

### 📋 Student Features
- **Submit Complaints** with title, department, type, priority, and description
- **Track Complaints** with search and filter functionality
- **View Dashboard** with stats and analytics
- **Manage Profile** with editable information
- **View Notifications** for complaint updates
- **Color-coded status** (Pending: Yellow, In Review: Blue, Resolved: Green, Rejected: Red)

### 👨‍💼 Admin Features
- **View All Complaints** from all students
- **Update Complaint Status** (Pending, In Review, Resolved, Rejected)
- **Analytics Dashboard** with charts showing complaints by department and status
- **Filter Complaints** by status
- **Auto-notifications** sent to students when status changes

### 🔔 Notification System
- **Real-time notifications** when complaints are submitted or updated
- **Unread count badge** on notifications page
- **Mark as read** functionality
- **Color-coded notification types** (Info, Success, Warning)

### 📊 Dashboard Analytics
- **Statistics cards** showing total, pending, resolved, and rejected complaints
- **Pie charts** for status distribution
- **Bar charts** for complaints by type/department
- **Recent complaints table** with full details

## Tech Stack

- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **React Router 7** - Navigation and routing
- **Tailwind CSS v4** - Styling
- **Motion** - Animations
- **Recharts** - Charts and graphs
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **LocalStorage** - Data persistence

## Demo Credentials

### Student Account
- **Email:** john@student.edu
- **Password:** student123

### Admin Account
- **Email:** admin@college.edu
- **Password:** admin123

## Data Storage

The application uses **localStorage** to persist data. The following data structures are stored:

### Students Collection
```typescript
interface Student {
  id: string;
  name: string;
  email: string;
  password: string;
  department: string;
  createdAt: string;
  profilePicture: string;
}
```

### Admins Collection
```typescript
interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin';
}
```

### Complaints Collection
```typescript
interface Complaint {
  id: string;
  title: string;
  description: string;
  department: string;
  type: string;
  status: 'Pending' | 'In Review' | 'Resolved' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High';
  studentId: string;
  studentName: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  files?: string[];
}
```

### Notifications Collection
```typescript
interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  createdAt: string;
}
```

## Application Routes

### Public Routes
- `/` - Landing page
- `/student/login` - Student login page
- `/student/register` - Student registration page
- `/admin/login` - Admin login page

### Protected Student Routes
- `/student/dashboard` - Student dashboard with analytics
- `/student/submit-complaint` - Submit new complaint form
- `/student/track-complaints` - View and track all complaints
- `/student/profile` - Manage student profile
- `/student/notifications` - View notifications

### Protected Admin Routes
- `/admin/dashboard` - Admin dashboard with all complaints

## Key Components

### Context Providers
- **AuthContext** - Manages authentication state and user sessions
- **ThemeContext** - Manages dark/light theme toggle

### Shared Components
- **Sidebar** - Navigation sidebar for authenticated users
- **ProtectedRoute** - Route wrapper for authentication checks

### Utility Functions
- **initializeData()** - Initializes default admin and sample data
- **getComplaints()** - Retrieves all complaints from storage
- **addComplaint()** - Adds a new complaint
- **updateComplaint()** - Updates complaint status
- **getNotifications()** - Gets notifications for a user
- **addNotification()** - Creates a new notification
- **markNotificationAsRead()** - Marks notification as read

## Future Enhancements

To make this production-ready, consider adding:

1. **Backend Integration**
   - Replace localStorage with a real database (PostgreSQL, MongoDB)
   - Implement proper RESTful API or GraphQL
   - Add JWT-based authentication

2. **Email Notifications**
   - Integrate Nodemailer or SendGrid
   - Send emails on status updates

3. **File Upload**
   - Implement actual file upload functionality
   - Store files in cloud storage (AWS S3, Cloudinary)

4. **Advanced Features**
   - PDF export of complaints
   - Admin staff assignment
   - Email verification for new accounts
   - Forgot password functionality
   - Real-time updates using WebSockets
   - Advanced analytics and reporting

5. **Security**
   - Implement proper password hashing (bcrypt)
   - Add rate limiting
   - CSRF protection
   - Input validation and sanitization
   - XSS protection

## Development

### Running the Application
```bash
npm install
npm run dev
```

### Building for Production
```bash
npm run build
```

## Notes

- This is a **frontend-only demonstration** using localStorage for persistence
- Passwords are stored in plain text (NOT suitable for production)
- Data is stored locally in the browser and will be lost if browser data is cleared
- For production use, implement a proper backend with database and security measures
- The application is designed for educational purposes and prototyping

## License

This project is for educational and demonstration purposes.
