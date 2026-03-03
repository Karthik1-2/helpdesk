// Initialize default data
export const initializeData = () => {
  // Initialize admin account if not exists
  if (!localStorage.getItem('admins')) {
    const defaultAdmin = [{
      id: 'admin1',
      name: 'Admin',
      email: 'admin@college.edu',
      password: 'admin123',
      role: 'admin',
    }];
    localStorage.setItem('admins', JSON.stringify(defaultAdmin));
  }

  // Initialize sample students if not exists
  if (!localStorage.getItem('students')) {
    const defaultStudents = [
      {
        id: 'student1',
        name: 'John Doe',
        email: 'john@student.edu',
        password: 'student123',
        department: 'Computer Science',
        createdAt: new Date().toISOString(),
        profilePicture: '',
      },
    ];
    localStorage.setItem('students', JSON.stringify(defaultStudents));
  }

  // Initialize complaints if not exists
  if (!localStorage.getItem('complaints')) {
    const defaultComplaints = [
      {
        id: 'complaint1',
        title: 'Library AC not working',
        description: 'The air conditioning in the library has not been working for the past 3 days.',
        department: 'Infrastructure',
        type: 'Maintenance',
        status: 'In Review',
        priority: 'Medium',
        studentId: 'student1',
        studentName: 'John Doe',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        assignedTo: '',
      },
      {
        id: 'complaint2',
        title: 'Hostel internet issues',
        description: 'Internet connection is very slow and frequently disconnects.',
        department: 'IT',
        type: 'Technical',
        status: 'Pending',
        priority: 'High',
        studentId: 'student1',
        studentName: 'John Doe',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        assignedTo: '',
      },
    ];
    localStorage.setItem('complaints', JSON.stringify(defaultComplaints));
  }

  // Initialize notifications if not exists
  if (!localStorage.getItem('notifications')) {
    localStorage.setItem('notifications', JSON.stringify([]));
  }
};

export interface Complaint {
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

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  createdAt: string;
}

export const getComplaints = (): Complaint[] => {
  return JSON.parse(localStorage.getItem('complaints') || '[]');
};

export const addComplaint = (complaint: Complaint) => {
  const complaints = getComplaints();
  complaints.push(complaint);
  localStorage.setItem('complaints', JSON.stringify(complaints));
};

export const updateComplaint = (id: string, updates: Partial<Complaint>) => {
  const complaints = getComplaints();
  const index = complaints.findIndex(c => c.id === id);
  if (index !== -1) {
    complaints[index] = { ...complaints[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem('complaints', JSON.stringify(complaints));
  }
};

export const getNotifications = (userId: string): Notification[] => {
  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
  return notifications.filter((n: Notification) => n.userId === userId);
};

export const addNotification = (notification: Notification) => {
  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
  notifications.push(notification);
  localStorage.setItem('notifications', JSON.stringify(notifications));
};

export const markNotificationAsRead = (id: string) => {
  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
  const index = notifications.findIndex((n: Notification) => n.id === id);
  if (index !== -1) {
    notifications[index].read = true;
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }
};
