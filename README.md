# 🎓 College Complaint Management System

A modern, full-featured complaint management system built with React, TypeScript, and Tailwind CSS. This application provides a beautiful interface for students to submit and track complaints while allowing administrators to manage and resolve them efficiently.

![Modern UI](https://img.shields.io/badge/UI-Modern%20%26%20Colorful-blue)
![Dark Mode](https://img.shields.io/badge/Theme-Dark%20%2F%20Light-purple)
![Responsive](https://img.shields.io/badge/Design-Responsive-green)

## ✨ Features

### 🎨 Beautiful UI/UX
- **Gradient-based modern design** with blue, purple, and pink color schemes
- **Glassmorphism effects** for cards and modals
- **Smooth animations** using Motion
- **Dark/Light mode toggle** with persistent theme preference
- **Fully responsive** design for mobile, tablet, and desktop
- **Interactive charts** for data visualization

### 👨‍🎓 Student Portal
- ✅ Register and login with email/password
- ✅ Submit complaints with title, department, type, priority, and description
- ✅ Track complaint status in real-time
- ✅ View dashboard with personal statistics and analytics
- ✅ Manage profile information
- ✅ Receive notifications on status updates
- ✅ Search and filter complaints
- ✅ Color-coded status indicators

### 👨‍💼 Admin Portal
- ✅ View all complaints from all students
- ✅ Update complaint status (Pending → In Review → Resolved/Rejected)
- ✅ View analytics dashboard with charts
- ✅ Filter complaints by status
- ✅ Auto-send notifications to students
- ✅ Department-wise complaint breakdown

### 📊 Dashboard Analytics
- **Pie charts** showing complaint status distribution
- **Bar charts** showing complaints by type/department
- **Statistics cards** with total, pending, resolved counts
- **Recent complaints table** with full details
- **Timeline tracker** for complaint lifecycle

### 🔔 Notification System
- Real-time notifications when complaints are updated
- Unread notification badges
- Mark as read/Mark all as read functionality
- Color-coded notification types (Info, Success, Warning)

## 🚀 Demo Credentials

### Student Account
```
Email: john@student.edu
Password: student123
```

### Admin Account
```
Email: admin@college.edu
Password: admin123
```

## 📁 Project Structure

```
college-complaint-system/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/              # Reusable UI components
│   │   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   │   └── ProtectedRoute.tsx
│   │   ├── context/
│   │   │   ├── AuthContext.tsx  # Authentication state
│   │   │   └── ThemeContext.tsx # Theme management
│   │   ├── pages/
│   │   │   ├── Landing.tsx
│   │   │   ├── StudentLogin.tsx
│   │   │   ├── StudentRegister.tsx
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── SubmitComplaint.tsx
│   │   │   ├── TrackComplaints.tsx
│   │   │   ├── StudentProfile.tsx
│   │   │   ├── Notifications.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   └── AdminDashboard.tsx
│   │   ├── utils/
│   │   │   └── storage.ts       # LocalStorage utilities
│   │   ├── App.tsx
│   │   └── routes.tsx
│   └── styles/
│       ├── index.css
│       ├── theme.css            # Dark/Light theme variables
│       └── tailwind.css
├── API_DOCUMENTATION.md
└── README.md
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **React Router 7** | Navigation |
| **Tailwind CSS v4** | Styling |
| **Motion** | Animations |
| **Recharts** | Charts & Graphs |
| **Lucide React** | Icons |
| **Sonner** | Toast Notifications |
| **LocalStorage** | Data Persistence |

## 📋 Available Pages

### Public Pages
- **Landing (/)** - Hero section with features, testimonials, and call-to-action
- **Student Login** - Email/password authentication for students
- **Student Register** - New student registration with department selection
- **Admin Login** - Secure admin portal access

### Student Pages (Protected)
- **Dashboard** - Analytics, charts, and recent complaints
- **Submit Complaint** - Form to submit new complaints
- **Track Complaints** - View all complaints with search/filter
- **Profile** - Manage personal information
- **Notifications** - View complaint updates

### Admin Pages (Protected)
- **Admin Dashboard** - Manage all complaints, update status, view analytics

## 🎯 Status Colors

| Status | Color | Description |
|--------|-------|-------------|
| **Pending** | 🟡 Yellow | Complaint awaiting review |
| **In Review** | 🔵 Blue | Complaint under investigation |
| **Resolved** | 🟢 Green | Complaint successfully resolved |
| **Rejected** | 🔴 Red | Complaint rejected with reason |

## 🎨 Priority Levels

- **Low** - Non-urgent issues
- **Medium** - Regular priority issues
- **High** - Urgent issues requiring immediate attention

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔐 Security Notes

⚠️ **Important:** This is a demo application using localStorage for data persistence.

**Current limitations:**
- Passwords are stored in plain text (NOT production-ready)
- No server-side validation
- Data is stored locally in browser
- No rate limiting or CSRF protection

**For production use, implement:**
- Backend API with database (PostgreSQL, MongoDB)
- Password hashing (bcrypt)
- JWT authentication
- Input validation and sanitization
- HTTPS/SSL
- Rate limiting
- Email verification
- File upload to cloud storage

## 🚧 Future Enhancements

- [ ] Backend integration with Node.js/Express
- [ ] MongoDB/PostgreSQL database
- [ ] Email notifications via Nodemailer
- [ ] File upload functionality (attachments)
- [ ] PDF export of complaints
- [ ] Advanced analytics and reporting
- [ ] Admin staff assignment
- [ ] Email verification for new accounts
- [ ] Forgot password functionality
- [ ] Real-time updates using WebSockets
- [ ] Multi-language support

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1440px+)

## 🎨 Design Highlights

- **Gradient backgrounds** for login/register pages
- **Glassmorphism cards** with backdrop blur
- **Smooth transitions** on all interactive elements
- **Hover effects** with scale animations
- **Loading spinners** for async actions
- **Toast notifications** for user feedback
- **Color-coded status badges**
- **Interactive charts** that update in real-time

## 📊 Data Models

### Complaint
```typescript
{
  id: string;
  title: string;
  description: string;
  department: string; // IT, Infrastructure, Academics, etc.
  type: string; // Maintenance, Technical, Academic, etc.
  status: 'Pending' | 'In Review' | 'Resolved' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High';
  studentId: string;
  studentName: string;
  createdAt: string;
  updatedAt: string;
}
```

## 🤝 Contributing

This is a demonstration project. Feel free to fork and modify for your needs!

## 📄 License

This project is for educational and demonstration purposes.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- Animations by [Motion](https://motion.dev/)
- Styling by [Tailwind CSS](https://tailwindcss.com/)

---

Built with ❤️ using React + TypeScript + Tailwind CSS
