import {
  users, students, attendance, fees, notices,
  type User, type InsertUser,
  type Student, type InsertStudent,
  type Attendance, type InsertAttendance,
  type Fee, type InsertFee,
  type Notice, type InsertNotice
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Students
  getStudents(): Promise<Student[]>;
  getStudent(id: number): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;

  // Attendance
  getAttendance(date?: string): Promise<Attendance[]>;
  getStudentAttendance(studentId: number): Promise<Attendance[]>;
  markAttendance(record: InsertAttendance): Promise<Attendance>;

  // Fees
  getFees(): Promise<(Fee & { studentName: string })[]>;
  getStudentFees(studentId: number): Promise<Fee[]>;

  // Notices
  getNotices(): Promise<Notice[]>;
  createNotice(notice: InsertNotice): Promise<Notice>;

  // Stats
  getDashboardStats(): Promise<{
    totalStudents: number;
    totalTeachers: number;
    presentToday: number;
    pendingFees: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private students: Map<number, Student>;
  private attendance: Map<number, Attendance>;
  private fees: Map<number, Fee>;
  private notices: Map<number, Notice>;

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

    this.seedData();
  }

  private seedData() {
    // Users - 3 teachers + 1 admin + parents
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
      {
        title: "Onam Celebration",
        content: "School will be celebrating Onam on Friday. Students should come in traditional attire (kasavu mundu/set saree).",
        type: "event",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: "Parent Teacher Meeting",
        content: "PTM for LKG A is scheduled for next Saturday at 10 AM. Please ensure attendance.",
        type: "general",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: "Annual Day Preparations",
        content: "Annual Day will be held on March 15th. Costume requirements will be shared next week.",
        type: "event",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: "Fee Payment Reminder",
        content: "Kindly clear pending fees for the month of June by the 10th to avoid late charges.",
        type: "general",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: "Independence Day Celebration",
        content: "School will celebrate Independence Day on August 15th. Flag hoisting at 9 AM.",
        type: "event",
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: "Health Checkup Camp",
        content: "Free dental and eye checkup camp for all students on July 20th. Consent forms attached.",
        type: "general",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    noticesData.forEach(n => this.createNotice(n));

    // Fees - Mixed paid/pending statuses with due dates
    this.students.forEach((student, index) => {
      const isPaid = index % 3 !== 0; // 2 out of 3 paid
      const dueDate = new Date();
      dueDate.setDate(10); // Due on 10th of month

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
  }

  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Student Methods
  async getStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async getStudent(id: number): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
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
    const all = Array.from(this.attendance.values());
    if (date) {
      return all.filter(a => a.date === date);
    }
    return all;
  }

  async getStudentAttendance(studentId: number): Promise<Attendance[]> {
    return Array.from(this.attendance.values()).filter(a => a.studentId === studentId);
  }

  async markAttendance(insertAttendance: InsertAttendance): Promise<Attendance> {
    const id = this.attendanceIdCounter++;
    const record: Attendance = {
      ...insertAttendance,
      id,
      present: insertAttendance.present ?? true
    };
    this.attendance.set(id, record);
    return record;
  }

  // Fee Methods
  async getFees(): Promise<(Fee & { studentName: string })[]> {
    return Array.from(this.fees.values()).map(fee => {
      const student = this.students.get(fee.studentId);
      return { ...fee, studentName: student?.name || "Unknown" };
    });
  }

  async getStudentFees(studentId: number): Promise<Fee[]> {
    return Array.from(this.fees.values()).filter(f => f.studentId === studentId);
  }

  // Notice Methods
  async getNotices(): Promise<Notice[]> {
    return Array.from(this.notices.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async createNotice(insertNotice: InsertNotice): Promise<Notice> {
    const id = this.noticeIdCounter++;
    const notice: Notice = {
      ...insertNotice,
      id,
      date: insertNotice.date || new Date().toISOString(),
      type: insertNotice.type || "general"
    };
    this.notices.set(id, notice);
    return notice;
  }

  // Stats
  async getDashboardStats() {
    return {
      totalStudents: this.students.size,
      totalTeachers: 8, // Mock
      presentToday: Math.floor(this.students.size * 0.9), // Mock 90% attendance
      pendingFees: Array.from(this.fees.values()).filter(f => f.status === "pending").length
    };
  }
}

export const storage = new MemStorage();
