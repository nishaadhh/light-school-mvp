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
    // Users
    this.createUser({ username: "admin", password: "123", role: "admin", name: "Principal Lakshmi" });
    this.createUser({ username: "teacher", password: "123", role: "teacher", name: "Anjali Teacher" });
    this.createUser({ username: "parent", password: "123", role: "parent", name: "Mr. Rajesh Kumar" });

    // Students (Kerala names according to requirements)
    const studentData: InsertStudent[] = [
      { name: "Anu Nair", class: "LKG A", rollNo: 1, parentName: "Ramesh Nair", parentPhone: "9846012345", address: "Kochi, Kerala", dob: "2020-05-15", medicalNotes: "No allergies" },
      { name: "Aarav Varghese", class: "LKG A", rollNo: 2, parentName: "Suresh Varghese", parentPhone: "9846012346", address: "Trivandrum, Kerala", dob: "2020-08-20", medicalNotes: "Mild asthma" },
      { name: "Meera S", class: "LKG B", rollNo: 1, parentName: "George Thomas", parentPhone: "9846012347", address: "Kottayam, Kerala", dob: "2020-03-10", medicalNotes: "Peanut allergy" },
      { name: "Alphy Thomas", class: "LKG B", rollNo: 2, parentName: "Thomas K", parentPhone: "9846012348", address: "Palakkad, Kerala", dob: "2020-11-25", medicalNotes: "None" },
      { name: "Riya K", class: "UKG A", rollNo: 1, parentName: "Vijayan Pillai", parentPhone: "9846012349", address: "Kollam, Kerala", dob: "2019-02-14", medicalNotes: "None" },
      { name: "Devika P", class: "UKG A", rollNo: 2, parentName: "Mathew Varghese", parentPhone: "9846012350", address: "Thrissur, Kerala", dob: "2019-06-30", medicalNotes: "None" },
      { name: "Arjun S", class: "UKG B", rollNo: 1, parentName: "Abdul Ryan", parentPhone: "9846012351", address: "Malappuram, Kerala", dob: "2019-09-12", medicalNotes: "None" },
      { name: "Maya V", class: "UKG B", rollNo: 2, parentName: "Unnikrishnan", parentPhone: "9846012352", address: "Alappuzha, Kerala", dob: "2019-12-05", medicalNotes: "None" },
    ];
    
    studentData.forEach(s => this.createStudent(s));

    // Notices
    this.createNotice({ 
      title: "Onam Celebration", 
      content: "School will be celebrating Onam on Friday. Students should come in traditional attire.", 
      type: "event",
      date: new Date().toISOString()
    });
    this.createNotice({ 
      title: "Parent Teacher Meeting", 
      content: "PTM for LKG A is scheduled for next Saturday at 10 AM.", 
      type: "general",
      date: new Date().toISOString()
    });

    // Fees
    // Seed some pending fees
    this.students.forEach(student => {
        this.fees.set(this.feeIdCounter, {
            id: this.feeIdCounter++,
            studentId: student.id,
            amount: 2500,
            month: "June 2024",
            status: student.id % 2 === 0 ? "paid" : "pending",
            paidDate: student.id % 2 === 0 ? new Date().toISOString() : null
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
    const student: Student = { ...insertStudent, id, photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${insertStudent.name}` };
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
    const record: Attendance = { ...insertAttendance, id };
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
    const notice: Notice = { ...insertNotice, id, date: new Date().toISOString() };
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
