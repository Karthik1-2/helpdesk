# 📋 Complaint Management Workflow Guide

## Overview

This guide explains the complete workflow of the College Complaint Management System from submission to resolution.

## 🎯 Complaint Lifecycle

```
┌─────────────┐
│   Student   │
│  Submits    │
│ Complaint   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Pending   │ ← Initial Status (Yellow)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  In Review  │ ← Admin reviewing (Blue)
└──────┬──────┘
       │
       ├──────────────┬──────────────┐
       ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Resolved   │ │  Rejected   │ │  Pending    │
│   (Green)   │ │    (Red)    │ │  (Yellow)   │
└─────────────┘ └─────────────┘ └─────────────┘
```

## 🚀 Quick Start Guide

### For Students

#### 1. **Registration**
1. Navigate to the landing page
2. Click "Register" or "Login as Student"
3. Fill in:
   - Full Name
   - Email (use .edu domain)
   - Department (select from dropdown)
   - Password (min 6 characters)
4. Click "Register Now"
5. You'll be automatically logged in and redirected to your dashboard

#### 2. **Submit a Complaint**
1. From the sidebar, click "Submit Complaint"
2. Fill in the form:
   - **Title**: Brief description (e.g., "Library AC not working")
   - **Department**: Select relevant department (IT, Infrastructure, etc.)
   - **Type**: Select complaint type (Maintenance, Technical, etc.)
   - **Priority**: Choose Low, Medium, or High
   - **Description**: Detailed explanation of the issue
   - **Files** (Optional): Attach supporting documents
3. Click "Submit Complaint"
4. You'll receive a confirmation notification
5. The complaint will appear in your "Track Complaints" section

#### 3. **Track Complaints**
1. Click "Track Status" in the sidebar
2. View all your complaints with:
   - Color-coded status badges
   - Priority levels
   - Submission and update dates
   - Timeline information
3. Use the search bar to find specific complaints
4. Filter by status (All, Pending, In Review, Resolved, Rejected)

#### 4. **View Dashboard**
1. Click "Dashboard" in the sidebar
2. See:
   - Total complaints count
   - Pending, Resolved, and Rejected counts
   - Pie chart of status distribution
   - Bar chart of complaint types
   - Recent complaints table

#### 5. **Check Notifications**
1. Click "Notifications" in the sidebar
2. View all status updates
3. Unread notifications are highlighted
4. Click "Mark as read" to clear individual notifications
5. Use "Mark all as read" to clear all at once

#### 6. **Update Profile**
1. Click "Profile" in the sidebar
2. Click "Edit Profile"
3. Update your name or department
4. Click "Save Changes"

### For Admins

#### 1. **Login**
1. Navigate to the landing page
2. Click "Login as Admin"
3. Enter credentials:
   - Email: admin@college.edu
   - Password: admin123
4. Click "Access Admin Panel"

#### 2. **View All Complaints**
1. You'll land on the Admin Dashboard
2. See statistics:
   - Total complaints
   - Pending count
   - Resolved count
   - Total students
3. View charts:
   - Complaints by Department (Bar Chart)
   - Status Distribution (Pie Chart)

#### 3. **Manage Complaints**
1. Scroll to "All Complaints" table
2. Filter by status using the dropdown
3. View complaint details:
   - Student name
   - Title and department
   - Type and priority
   - Current status
   - Submission date
4. Click the Edit icon (pencil) to update status

#### 4. **Update Complaint Status**
1. Click the Edit icon on any complaint
2. A modal will appear with:
   - Complaint details
   - Current status
   - Status update buttons
3. Click on the desired status:
   - **Pending**: Move back to pending
   - **In Review**: Mark as under investigation
   - **Resolved**: Mark as completed
   - **Rejected**: Decline the complaint
4. The student will automatically receive a notification
5. The complaint's updated timestamp will be recorded

## 📊 Department Categories

| Department | Typical Issues |
|------------|----------------|
| **Infrastructure** | Building maintenance, AC, electrical |
| **IT** | Internet, computers, software |
| **Academics** | Course issues, exam problems |
| **Administration** | Documentation, registration |
| **Hostel** | Room issues, cleanliness |
| **Library** | Books, seating, hours |
| **Canteen** | Food quality, hygiene |
| **Transport** | Bus service, routes |

## 🏷️ Complaint Types

| Type | Description |
|------|-------------|
| **Maintenance** | Physical repairs, cleaning |
| **Technical** | IT-related issues |
| **Academic** | Course, exam, faculty issues |
| **Facility** | Amenities, services |
| **Administrative** | Paperwork, processes |
| **Harassment** | Bullying, discrimination |
| **Other** | Miscellaneous issues |

## 🎯 Priority Guidelines

### High Priority
- Safety hazards
- Complete service outages
- Harassment cases
- Urgent health issues
- Exam-related problems during exam period

### Medium Priority
- Partial service disruptions
- Uncomfortable conditions
- Regular maintenance needs
- Documentation delays

### Low Priority
- Cosmetic issues
- Minor inconveniences
- Non-urgent requests
- General suggestions

## ⏱️ Expected Response Times

| Status | Expected Time |
|--------|---------------|
| **Acknowledgment** | Within 24 hours |
| **In Review** | 1-3 days |
| **Resolution** | 3-7 days (varies by type) |

## 📧 Notification Types

### For Students
- ✅ **Success**: Complaint submitted, resolved
- ℹ️ **Info**: Status changed to In Review
- ⚠️ **Warning**: Complaint rejected

### For Admins
- New complaint submitted (auto-added to dashboard)

## 🔄 Status Change Flow

### Student View
```
Submit → Notification → Track → Get Updates → Resolved
```

### Admin View
```
Review Inbox → Assign Priority → Investigate → Update Status → Send Notification
```

## 💡 Best Practices

### For Students
1. ✅ **Be specific** in your complaint title
2. ✅ **Provide details** in the description
3. ✅ **Choose correct** department and type
4. ✅ **Set appropriate** priority level
5. ✅ **Attach evidence** when possible
6. ✅ **Track regularly** for updates
7. ✅ **Read notifications** promptly

### For Admins
1. ✅ **Review daily** for new complaints
2. ✅ **Prioritize** based on urgency
3. ✅ **Update status** regularly
4. ✅ **Communicate** resolution steps
5. ✅ **Track metrics** for improvements
6. ✅ **Resolve quickly** when possible

## 🛡️ Tips & Tricks

### Students
- 🔍 Use the **search feature** to find old complaints quickly
- 🎨 Toggle **dark mode** for comfortable night viewing
- 📊 Check the **dashboard** for an overview of all your complaints
- 🔔 Enable browser notifications to stay updated

### Admins
- 📈 Use **charts** to identify problem areas
- 🎯 **Filter by department** to assign to staff
- 📊 Monitor **pending count** to prioritize work
- 🔄 Update status to **In Review** to acknowledge receipt

## ❓ Common Issues

### "I can't log in"
- Verify email and password
- Check if you're using the correct portal (Student vs Admin)
- Try registering if you're a new student

### "My complaint isn't showing"
- Check the status filter (set to "All")
- Try refreshing the page
- Verify you're logged in

### "Status hasn't updated"
- Check notifications for updates
- Contact admin if pending too long
- Verify you're viewing the correct complaint

## 📞 Support

For technical issues or questions:
- 📧 Email: support@college.edu
- 📞 Phone: +1 (555) 123-4567
- 📍 Office: Admin Building, Room 101

---

**Remember:** This system is designed to help resolve issues quickly. Be clear, be patient, and check your notifications regularly!
