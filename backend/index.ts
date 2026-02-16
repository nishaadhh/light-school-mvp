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
    // ─── Users (9 total) ───
    this.createUser({ username: "superadmin", password: "123", role: "superadmin", name: "System Owner" });
    this.createUser({ username: "admin", password: "123", role: "admin", name: "Principal Lakshmi" });
    this.createUser({ username: "teacher", password: "123", role: "teacher", name: "Anjali Teacher" });
    this.createUser({ username: "teacher2", password: "123", role: "teacher", name: "Priya Teacher" });
    this.createUser({ username: "teacher3", password: "123", role: "teacher", name: "Reshma Teacher" });
    this.createUser({ username: "teacher4", password: "123", role: "teacher", name: "Divya Teacher" });
    this.createUser({ username: "teacher5", password: "123", role: "teacher", name: "Meena Teacher" });
    this.createUser({ username: "parent", password: "123", role: "parent", name: "Mr. Rajesh Kumar" });
    this.createUser({ username: "parent2", password: "123", role: "parent", name: "Mrs. Sneha Pillai" });

    // ─── Students (30 across 5 classes) ───
    const studentData: InsertStudent[] = [
      // LKG A — 6 students (Anjali Teacher)
      { name: "Anu Nair", class: "LKG A", rollNo: 1, parentName: "Ramesh Nair", parentPhone: "9846012345", address: "Fort Kochi, Ernakulam", dob: "2021-05-15", medicalNotes: "No allergies" },
      { name: "Aarav Varghese", class: "LKG A", rollNo: 2, parentName: "Suresh Varghese", parentPhone: "9846012346", address: "Pattom, Trivandrum", dob: "2021-08-20", medicalNotes: "Mild asthma — uses inhaler" },
      { name: "Aisha Rahman", class: "LKG A", rollNo: 3, parentName: "Abdul Rahman", parentPhone: "9846012353", address: "Kozhikode Beach Road", dob: "2021-04-10", medicalNotes: "None" },
      { name: "Advaith Menon", class: "LKG A", rollNo: 4, parentName: "Krishnan Menon", parentPhone: "9846012354", address: "Thavakkara, Kannur", dob: "2021-07-22", medicalNotes: "Lactose intolerant" },
      { name: "Lakshmi Das", class: "LKG A", rollNo: 5, parentName: "Mohan Das", parentPhone: "9846012370", address: "Kakkanad, Kochi", dob: "2021-01-18", medicalNotes: "None" },
      { name: "Vivaan Pillai", class: "LKG A", rollNo: 6, parentName: "Sneha Pillai", parentPhone: "9846012371", address: "Vyttila, Kochi", dob: "2021-11-03", medicalNotes: "Egg allergy" },

      // LKG B — 6 students (Priya Teacher)
      { name: "Meera S", class: "LKG B", rollNo: 1, parentName: "George Thomas", parentPhone: "9846012347", address: "Changanassery, Kottayam", dob: "2021-03-10", medicalNotes: "Peanut allergy" },
      { name: "Alphy Thomas", class: "LKG B", rollNo: 2, parentName: "Thomas K", parentPhone: "9846012348", address: "Palakkad Town", dob: "2021-11-25", medicalNotes: "None" },
      { name: "Nikhil Krishnan", class: "LKG B", rollNo: 3, parentName: "Vijay Krishnan", parentPhone: "9846012355", address: "Aluva, Ernakulam", dob: "2021-06-18", medicalNotes: "None" },
      { name: "Sara Joseph", class: "LKG B", rollNo: 4, parentName: "Joseph Mathew", parentPhone: "9846012356", address: "Thiruvalla, Pathanamthitta", dob: "2021-09-05", medicalNotes: "None" },
      { name: "Ishaan Nambiar", class: "LKG B", rollNo: 5, parentName: "Rajeev Nambiar", parentPhone: "9846012372", address: "Perinthalmanna, Malappuram", dob: "2021-02-28", medicalNotes: "None" },
      { name: "Fatima Begum", class: "LKG B", rollNo: 6, parentName: "Hussain Ali", parentPhone: "9846012373", address: "Thalassery, Kannur", dob: "2021-12-14", medicalNotes: "Dust allergy" },

      // UKG A — 6 students (Reshma Teacher)
      { name: "Riya K", class: "UKG A", rollNo: 1, parentName: "Vijayan Pillai", parentPhone: "9846012349", address: "Kollam Town", dob: "2020-02-14", medicalNotes: "None" },
      { name: "Devika P", class: "UKG A", rollNo: 2, parentName: "Mathew Varghese", parentPhone: "9846012350", address: "Thrissur Swaraj Round", dob: "2020-06-30", medicalNotes: "None" },
      { name: "Arjun S", class: "UKG A", rollNo: 3, parentName: "Sunil Kumar", parentPhone: "9846012357", address: "Manjeri, Malappuram", dob: "2020-09-12", medicalNotes: "None" },
      { name: "Maya V", class: "UKG A", rollNo: 4, parentName: "Unnikrishnan", parentPhone: "9846012358", address: "Alappuzha Town", dob: "2020-12-05", medicalNotes: "None" },
      { name: "Kabir Sheikh", class: "UKG A", rollNo: 5, parentName: "Salim Sheikh", parentPhone: "9846012374", address: "Kasaragod Town", dob: "2020-03-19", medicalNotes: "None" },
      { name: "Ananya Raj", class: "UKG A", rollNo: 6, parentName: "Deepak Raj", parentPhone: "9846012375", address: "Nedumangad, Trivandrum", dob: "2020-08-07", medicalNotes: "Glasses prescribed" },

      // UKG B — 6 students (Divya Teacher)
      { name: "Rohit Menon", class: "UKG B", rollNo: 1, parentName: "Anil Menon", parentPhone: "9846012376", address: "Muvattupuzha, Ernakulam", dob: "2020-01-23", medicalNotes: "None" },
      { name: "Sneha Krishnan", class: "UKG B", rollNo: 2, parentName: "Mahesh Krishnan", parentPhone: "9846012377", address: "Guruvayoor, Thrissur", dob: "2020-05-11", medicalNotes: "None" },
      { name: "Mohammed Riyas", class: "UKG B", rollNo: 3, parentName: "Abdul Riyas", parentPhone: "9846012378", address: "Kondotty, Malappuram", dob: "2020-10-02", medicalNotes: "None" },
      { name: "Diya Nair", class: "UKG B", rollNo: 4, parentName: "Gopinath Nair", parentPhone: "9846012379", address: "Attingal, Trivandrum", dob: "2020-07-15", medicalNotes: "Mild eczema" },
      { name: "Vihaan George", class: "UKG B", rollNo: 5, parentName: "Elias George", parentPhone: "9846012380", address: "Pala, Kottayam", dob: "2020-04-28", medicalNotes: "None" },
      { name: "Thanvi S", class: "UKG B", rollNo: 6, parentName: "Suresh Babu", parentPhone: "9846012381", address: "Irinjalakuda, Thrissur", dob: "2020-11-30", medicalNotes: "None" },

      // Nursery — 6 students (Meena Teacher)
      { name: "Kiara Philip", class: "Nursery", rollNo: 1, parentName: "Philip Varghese", parentPhone: "9846012382", address: "Chengannur, Alappuzha", dob: "2022-01-10", medicalNotes: "None" },
      { name: "Aadhya Mohan", class: "Nursery", rollNo: 2, parentName: "Mohan Kumar", parentPhone: "9846012383", address: "Chalakudy, Thrissur", dob: "2022-04-22", medicalNotes: "None" },
      { name: "Ryan Fernandez", class: "Nursery", rollNo: 3, parentName: "Daniel Fernandez", parentPhone: "9846012384", address: "Fort Kochi", dob: "2022-07-08", medicalNotes: "None" },
      { name: "Nandana R", class: "Nursery", rollNo: 4, parentName: "Radhakrishnan", parentPhone: "9846012385", address: "Wadakkanchery, Thrissur", dob: "2022-03-14", medicalNotes: "Milk allergy" },
      { name: "Zayan Hussain", class: "Nursery", rollNo: 5, parentName: "Faisal Hussain", parentPhone: "9846012386", address: "Tirur, Malappuram", dob: "2022-09-19", medicalNotes: "None" },
      { name: "Myra Suresh", class: "Nursery", rollNo: 6, parentName: "Suresh Nair", parentPhone: "9846012387", address: "Perumbavoor, Ernakulam", dob: "2022-06-25", medicalNotes: "None" },
    ];

    studentData.forEach(s => this.createStudent(s));

    // ─── Notices (10 across event/general/urgent) ───
    const noticesData = [
      { title: "Republic Day Celebration", content: "Republic Day will be celebrated on January 26th. Flag hoisting at 9 AM followed by cultural performances by UKG students.", type: "event", date: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "Annual Day — Save the Date!", content: "Our Annual Day is on March 15th at Town Hall Auditorium. Costume fittings begin next week. All parents are invited.", type: "event", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "Parent Teacher Meeting — LKG", content: "PTM for LKG A & LKG B is scheduled for Saturday, Feb 22nd at 10 AM. Please bring your child's progress card.", type: "general", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "February Fee Reminder", content: "Kindly pay February fees (₹3,500) before February 10th to avoid late charges of ₹100. Pay online or at the school office.", type: "general", date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "Sports Day Registration", content: "Sports Day is on Feb 28th. Register your child for events: Running Race, Spoon & Lemon, Sack Race. Forms available at reception.", type: "event", date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "Health Checkup Camp", content: "Free dental and eye checkup camp for all students on Feb 20th. Consent forms must be signed and returned by Feb 18th.", type: "general", date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "School Closed — Maha Shivaratri", content: "School will remain closed on February 26th (Wednesday) on account of Maha Shivaratri.", type: "general", date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "Art Competition Winners", content: "Congratulations to Anu Nair (1st), Riya K (2nd), and Meera S (3rd) for winning the inter-class drawing competition!", type: "event", date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "New Library Books Available", content: "20 new picture books and story books have been added to the school library. Students can borrow one book per week.", type: "general", date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
      { title: "Uniform & ID Card Reminder", content: "All students must wear proper school uniform daily. Replacement ID cards available at office for ₹50.", type: "general", date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
    ];
    noticesData.forEach(n => this.createNotice(n));

    // ─── Fees (multi-month, realistic) ───
    const months = ["October 2025", "November 2025", "December 2025", "January 2026", "February 2026"];
    this.students.forEach((student) => {
      months.forEach((month, mi) => {
        const dueDate = new Date(2025, 9 + mi, 10);
        const isCurrentMonth = mi === months.length - 1;
        const isPaid = !isCurrentMonth && !(mi === months.length - 2 && student.id % 4 === 0);
        this.fees.set(this.feeIdCounter, {
          id: this.feeIdCounter++,
          studentId: student.id,
          amount: 3500,
          month,
          status: isPaid ? "paid" : "pending",
          dueDate: dueDate.toISOString(),
          paidDate: isPaid ? new Date(dueDate.getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString() : null
        });
      });
    });

    // ─── Attendance (last 5 school days) ───
    const today = new Date();
    for (let d = 1; d <= 5; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - d);
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      const dateStr = date.toISOString().split("T")[0];
      this.students.forEach((student) => {
        const present = Math.random() > 0.1;
        this.markAttendance({
          studentId: student.id,
          date: dateStr,
          status: present ? "present" : "absent",
          markedBy: "teacher"
        });
      });
    }

    // ─── Audit Logs (15 entries) ───
    this.auditLogs = [
      { id: 1, user: "Principal Lakshmi", role: "admin", action: "Created", target: "Student: Kiara Philip", details: "Enrolled new student in Nursery", timestamp: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 2, user: "Anjali Teacher", role: "teacher", action: "Updated", target: "Attendance: LKG A", details: "Marked attendance for 6 students", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 3, user: "Principal Lakshmi", role: "admin", action: "Created", target: "Notice: Republic Day", details: "Published event notice for all classes", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 4, user: "System Owner", role: "superadmin", action: "Updated", target: "School Settings", details: "Updated phone number and email", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 5, user: "Priya Teacher", role: "teacher", action: "Created", target: "Activity: Rhyme Time", details: "Posted rhyme session for LKG B", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 6, user: "Principal Lakshmi", role: "admin", action: "Updated", target: "Fee: Aarav Varghese", details: "Marked January fee as paid (₹3,500)", timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 7, user: "Reshma Teacher", role: "teacher", action: "Updated", target: "Attendance: UKG A", details: "Marked attendance for 6 students", timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 8, user: "System Owner", role: "superadmin", action: "Created", target: "User: Divya Teacher", details: "Created teacher account for UKG B", timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 9, user: "Divya Teacher", role: "teacher", action: "Created", target: "Activity: Art & Craft", details: "Paper flower making — UKG B", timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 10, user: "Principal Lakshmi", role: "admin", action: "Created", target: "Student: Myra Suresh", details: "Enrolled new student in Nursery", timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 11, user: "Meena Teacher", role: "teacher", action: "Updated", target: "Attendance: Nursery", details: "Marked attendance for 6 students", timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 12, user: "System Owner", role: "superadmin", action: "Backup", target: "System Data", details: "Full system backup completed", timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 13, user: "Principal Lakshmi", role: "admin", action: "Deleted", target: "Notice: Old Holiday List", details: "Removed outdated 2024 holiday list", timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 14, user: "System Owner", role: "superadmin", action: "Updated", target: "Roles & Permissions", details: "Updated teacher permissions for notices", timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 15, user: "Principal Lakshmi", role: "admin", action: "Created", target: "Report: Monthly Summary", details: "Generated January 2026 performance report", timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
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
        { day: "Mon", present: 27, absent: 3 },
        { day: "Tue", present: 25, absent: 5 },
        { day: "Wed", present: 29, absent: 1 },
        { day: "Thu", present: 24, absent: 6 },
        { day: "Fri", present: 28, absent: 2 },
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
