import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import {
  users, students, attendance, fees, notices,
  type User, type InsertUser,
  type Student, type InsertStudent,
  type Attendance, type InsertAttendance,
  type Fee, type InsertFee,
  type Notice, type InsertNotice
} from "./shared/schema.js";

const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);

// Middleware
app.use(cors());
app.use(express.json());

// Types for new features
interface AuditLog {
  id: number;
  user: string;
  role: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
}

interface SchoolSettings {
  name: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  academicYear: string;
  principal: string;
  motto: string;
  establishedYear: number;
}

// In-memory storage
class MemStorage {
  private users: Map<number, User>;
  private students: Map<number, Student>;
  private attendance: Map<number, Attendance>;
  private fees: Map<number, Fee>;
  private notices: Map<number, Notice>;
  private auditLogs: AuditLog[];
  private schoolSettings: SchoolSettings;

  private userIdCounter = 1;
  private studentIdCounter = 1;
  private attendanceIdCounter = 1;
  private feeIdCounter = 1;
  private noticeIdCounter = 1;

  constructor() {
    this.users = new Map();
    this.students = new Map();
    this.attendance = new Map();
    this.fees = new Map();
    this.notices = new Map();
    this.auditLogs = [];

    this.schoolSettings = {
      name: "Light International School",
      logo: "",
      address: "MG Road, Ernakulam, Kochi, Kerala 682016",
      phone: "+91 484 2345678",
      email: "info@lightintl.edu.in",
      academicYear: "2025-2026",
      principal: "Dr. Lakshmi Menon",
      motto: "Nurturing Bright Futures",
      establishedYear: 2018
    };

    this.seedData();
  }

  private seedData() {
    // Users — superadmin + admin + 3 teachers + parent
    this.createUser({ username: "superadmin", password: "123", role: "superadmin", name: "System Owner" });
    this.createUser({ username: "admin", password: "123", role: "admin", name: "Principal Lakshmi" });
    this.createUser({ username: "teacher", password: "123", role: "teacher", name: "Anjali Teacher" });
    this.createUser({ username: "teacher2", password: "123", role: "teacher", name: "Priya Teacher" });
    this.createUser({ username: "teacher3", password: "123", role: "teacher", name: "Reshma Teacher" });
    this.createUser({ username: "parent", password: "123", role: "parent", name: "Mr. Rajesh Kumar" });

    // Students - 12 Kerala names across 3 classes
    const studentData: InsertStudent[] = [
      // LKG A - 4 students
      { name: "Anu Nair", class: "LKG A", rollNo: 1, parentName: "Ramesh Nair", parentPhone: "9846012345", address: "Kochi, Kerala", dob: "2020-05-15", medicalNotes: "No allergies" },
      { name: "Aarav Varghese", class: "LKG A", rollNo: 2, parentName: "Suresh Varghese", parentPhone: "9846012346", address: "Trivandrum, Kerala", dob: "2020-08-20", medicalNotes: "Mild asthma" },
      { name: "Aisha Rahman", class: "LKG A", rollNo: 3, parentName: "Abdul Rahman", parentPhone: "9846012353", address: "Kozhikode, Kerala", dob: "2020-04-10", medicalNotes: "None" },
      { name: "Advaith Menon", class: "LKG A", rollNo: 4, parentName: "Krishnan Menon", parentPhone: "9846012354", address: "Kannur, Kerala", dob: "2020-07-22", medicalNotes: "Lactose intolerant" },

      // LKG B - 4 students
      { name: "Meera S", class: "LKG B", rollNo: 1, parentName: "George Thomas", parentPhone: "9846012347", address: "Kottayam, Kerala", dob: "2020-03-10", medicalNotes: "Peanut allergy" },
      { name: "Alphy Thomas", class: "LKG B", rollNo: 2, parentName: "Thomas K", parentPhone: "9846012348", address: "Palakkad, Kerala", dob: "2020-11-25", medicalNotes: "None" },
      { name: "Nikhil Krishnan", class: "LKG B", rollNo: 3, parentName: "Vijay Krishnan", parentPhone: "9846012355", address: "Ernakulam, Kerala", dob: "2020-06-18", medicalNotes: "None" },
      { name: "Sara Joseph", class: "LKG B", rollNo: 4, parentName: "Joseph Mathew", parentPhone: "9846012356", address: "Pathanamthitta, Kerala", dob: "2020-09-05", medicalNotes: "None" },

      // UKG A - 4 students
      { name: "Riya K", class: "UKG A", rollNo: 1, parentName: "Vijayan Pillai", parentPhone: "9846012349", address: "Kollam, Kerala", dob: "2019-02-14", medicalNotes: "None" },
      { name: "Devika P", class: "UKG A", rollNo: 2, parentName: "Mathew Varghese", parentPhone: "9846012350", address: "Thrissur, Kerala", dob: "2019-06-30", medicalNotes: "None" },
      { name: "Arjun S", class: "UKG A", rollNo: 3, parentName: "Sunil Kumar", parentPhone: "9846012357", address: "Malappuram, Kerala", dob: "2019-09-12", medicalNotes: "None" },
      { name: "Maya V", class: "UKG A", rollNo: 4, parentName: "Unnikrishnan", parentPhone: "9846012358", address: "Alappuzha, Kerala", dob: "2019-12-05", medicalNotes: "None" },
    ];

    studentData.forEach(s => this.createStudent(s));

    // Notices - 6 notices with varied types
    const noticesData = [
      { title: "Onam Celebration", content: "School will be celebrating Onam on Friday. Students should come in traditional attire (kasavu mundu/set saree).", type: "event", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "Parent Teacher Meeting", content: "PTM for LKG A is scheduled for next Saturday at 10 AM. Please ensure attendance.", type: "general", date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "Annual Day Preparations", content: "Annual Day will be held on March 15th. Costume requirements will be shared next week.", type: "event", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "Fee Payment Reminder", content: "Kindly clear pending fees for the month of June by the 10th to avoid late charges.", type: "general", date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "Independence Day Celebration", content: "School will celebrate Independence Day on August 15th. Flag hoisting at 9 AM.", type: "event", date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "Health Checkup Camp", content: "Free dental and eye checkup camp for all students on July 20th. Consent forms attached.", type: "general", date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() }
    ];
    noticesData.forEach(n => this.createNotice(n));

    // Fees - Mixed paid/pending statuses
    this.students.forEach((student, index) => {
      const isPaid = index % 3 !== 0;
      const dueDate = new Date();
      dueDate.setDate(10);
      this.fees.set(this.feeIdCounter, {
        id: this.feeIdCounter++,
        studentId: student.id,
        amount: 2500,
        month: "June 2024",
        status: isPaid ? "paid" : "pending",
        dueDate: dueDate.toISOString(),
        paidDate: isPaid ? new Date().toISOString() : null
      });
    });

    // Audit Logs - seed with realistic data
    this.auditLogs = [
      { id: 1, user: "Principal Lakshmi", role: "admin", action: "Created", target: "Student: Anu Nair", details: "Added new student to LKG A", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 2, user: "System Owner", role: "superadmin", action: "Updated", target: "School Settings", details: "Changed academic year to 2025-2026", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 3, user: "Principal Lakshmi", role: "admin", action: "Created", target: "Notice: Onam Celebration", details: "Published event notice for all classes", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 4, user: "Anjali Teacher", role: "teacher", action: "Updated", target: "Attendance: LKG A", details: "Marked attendance for 4 students", timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 5, user: "System Owner", role: "superadmin", action: "Created", target: "User: Principal Lakshmi", details: "Created admin account", timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 6, user: "Principal Lakshmi", role: "admin", action: "Updated", target: "Fee: Anu Nair", details: "Marked June fee as paid (₹2,500)", timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 7, user: "Priya Teacher", role: "teacher", action: "Created", target: "Activity: Art Class", details: "Uploaded daily activity for LKG B", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 8, user: "System Owner", role: "superadmin", action: "Backup", target: "System Data", details: "Full system backup completed", timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 9, user: "Principal Lakshmi", role: "admin", action: "Deleted", target: "Notice: Old Holiday List", details: "Removed outdated notice", timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 10, user: "Reshma Teacher", role: "teacher", action: "Updated", target: "Attendance: UKG A", details: "Marked attendance for 4 students", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ];
  }

  // User Methods
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  createUser(insertUser: InsertUser): User {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Student Methods
  async getStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  createStudent(insertStudent: InsertStudent): Student {
    const id = this.studentIdCounter++;
    const student: Student = {
      ...insertStudent,
      id,
      photoUrl: insertStudent.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${insertStudent.name}`,
      address: insertStudent.address || null,
      dob: insertStudent.dob || null,
      medicalNotes: insertStudent.medicalNotes || null
    };
    this.students.set(id, student);
    return student;
  }

  // Attendance Methods
  async getAttendance(date?: string): Promise<Attendance[]> {
    return Array.from(this.attendance.values());
  }

  markAttendance(record: InsertAttendance): Attendance {
    const id = this.attendanceIdCounter++;
    const attendance: Attendance = { ...record, id };
    this.attendance.set(id, attendance);
    return attendance;
  }

  // Fees Methods
  async getFees(): Promise<(Fee & { studentName: string })[]> {
    return Array.from(this.fees.values()).map(fee => {
      const student = this.students.get(fee.studentId);
      return { ...fee, studentName: student?.name || "Unknown" };
    });
  }

  // Notices Methods
  async getNotices(): Promise<Notice[]> {
    return Array.from(this.notices.values()).sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  createNotice(notice: InsertNotice): Notice {
    const id = this.noticeIdCounter++;
    const newNotice: Notice = { ...notice, id };
    this.notices.set(id, newNotice);
    return newNotice;
  }

  // Stats
  async getDashboardStats() {
    return {
      totalStudents: this.students.size,
      totalTeachers: 3,
      presentToday: Math.floor(this.students.size * 0.9),
      pendingFees: Array.from(this.fees.values()).filter(f => f.status === "pending").length,
      totalRevenue: Array.from(this.fees.values()).filter(f => f.status === "paid").reduce((sum, f) => sum + f.amount, 0),
      totalPending: Array.from(this.fees.values()).filter(f => f.status === "pending").reduce((sum, f) => sum + f.amount, 0),
    };
  }

  // Audit Logs
  async getAuditLogs(): Promise<AuditLog[]> {
    return this.auditLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  // School Settings
  async getSettings(): Promise<SchoolSettings> {
    return this.schoolSettings;
  }

  async updateSettings(settings: Partial<SchoolSettings>): Promise<SchoolSettings> {
    this.schoolSettings = { ...this.schoolSettings, ...settings };
    return this.schoolSettings;
  }

  // Staff (teachers)
  async getStaff(): Promise<User[]> {
    return Array.from(this.users.values()).filter(u => u.role === "teacher");
  }

  // Reports
  async getReports() {
    const allStudents = Array.from(this.students.values());
    const allFees = Array.from(this.fees.values());

    const classCounts: Record<string, number> = {};
    allStudents.forEach(s => {
      classCounts[s.class] = (classCounts[s.class] || 0) + 1;
    });

    return {
      studentsByClass: Object.entries(classCounts).map(([cls, count]) => ({ class: cls, count })),
      feeCollection: {
        collected: allFees.filter(f => f.status === "paid").reduce((s, f) => s + f.amount, 0),
        pending: allFees.filter(f => f.status === "pending").reduce((s, f) => s + f.amount, 0),
        total: allFees.reduce((s, f) => s + f.amount, 0),
      },
      attendanceSummary: [
        { day: "Mon", present: 11, absent: 1 },
        { day: "Tue", present: 10, absent: 2 },
        { day: "Wed", present: 12, absent: 0 },
        { day: "Thu", present: 9, absent: 3 },
        { day: "Fri", present: 11, absent: 1 },
      ]
    };
  }

  // System stats for super admin
  async getSystemStats() {
    const allUsers = Array.from(this.users.values());
    return {
      totalUsers: allUsers.length,
      totalStudents: this.students.size,
      totalTeachers: allUsers.filter(u => u.role === "teacher").length,
      totalAdmins: allUsers.filter(u => u.role === "admin").length,
      totalRevenue: Array.from(this.fees.values()).filter(f => f.status === "paid").reduce((s, f) => s + f.amount, 0),
      systemHealth: "Operational",
      uptime: "99.9%",
      lastBackup: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }
}

const storage = new MemStorage();

// ─── Routes ───

// Auth
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await storage.getUserByUsername(username);
  if (user && user.password === password) {
    res.json({ ok: true, user: { id: user.id, username: user.username, role: user.role, name: user.name } });
  } else {
    res.status(401).json({ ok: false, message: "Invalid credentials" });
  }
});

// Students
app.get("/api/students", async (req, res) => {
  const students = await storage.getStudents();
  res.json(students);
});
app.post("/api/students", async (req, res) => {
  const student = storage.createStudent(req.body);
  res.json(student);
});

// Attendance
app.get("/api/attendance", async (req, res) => {
  const attendance = await storage.getAttendance();
  res.json(attendance);
});
app.post("/api/attendance", async (req, res) => {
  const record = storage.markAttendance(req.body);
  res.json(record);
});

// Fees
app.get("/api/fees", async (req, res) => {
  const fees = await storage.getFees();
  res.json(fees);
});

// Notices
app.get("/api/notices", async (req, res) => {
  const notices = await storage.getNotices();
  res.json(notices);
});
app.post("/api/notices", async (req, res) => {
  const notice = storage.createNotice(req.body);
  res.json(notice);
});

// Stats (admin)
app.get("/api/stats", async (req, res) => {
  const stats = await storage.getDashboardStats();
  res.json(stats);
});

// ─── NEW: Super Admin & Admin endpoints ───

// System stats (superadmin)
app.get("/api/system-stats", async (req, res) => {
  const stats = await storage.getSystemStats();
  res.json(stats);
});

// Audit Logs
app.get("/api/audit-logs", async (req, res) => {
  const logs = await storage.getAuditLogs();
  res.json(logs);
});

// School Settings
app.get("/api/settings", async (req, res) => {
  const settings = await storage.getSettings();
  res.json(settings);
});
app.put("/api/settings", async (req, res) => {
  const settings = await storage.updateSettings(req.body);
  res.json(settings);
});

// Staff
app.get("/api/staff", async (req, res) => {
  const staff = await storage.getStaff();
  res.json(staff.map(s => ({ id: s.id, name: s.name, username: s.username, role: s.role })));
});

// Users (superadmin)
app.get("/api/users", async (req, res) => {
  const users = await storage.getUsers();
  res.json(users.map(u => ({ id: u.id, name: u.name, username: u.username, role: u.role })));
});

// Reports
app.get("/api/reports", async (req, res) => {
  const reports = await storage.getReports();
  res.json(reports);
});

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Light International School API Server", status: "running" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
