import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // --- USERS / AUTH ---
  app.post(api.users.login.path, async (req, res) => {
    try {
      const { role } = api.users.login.input.parse(req.body);
      // Demo login: just return the first user of that role or a mock one
      // For simplicity in this demo, we'll just mock a successful response based on role
      let user;
      if (role === 'admin') user = await storage.getUserByUsername('admin');
      else if (role === 'teacher') user = await storage.getUserByUsername('teacher');
      else user = await storage.getUserByUsername('parent');
      
      if (user) {
        res.json(user);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (err) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  // --- STUDENTS ---
  app.get(api.students.list.path, async (req, res) => {
    const students = await storage.getStudents();
    res.json(students);
  });

  app.get(api.students.get.path, async (req, res) => {
    const student = await storage.getStudent(Number(req.params.id));
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  });

  app.post(api.students.create.path, async (req, res) => {
    try {
      const input = api.students.create.input.parse(req.body);
      const student = await storage.createStudent(input);
      res.status(201).json(student);
    } catch (err) {
      if (err instanceof z.ZodError) {
         res.status(400).json({ message: err.errors[0].message });
      } else {
         res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // --- ATTENDANCE ---
  app.get(api.attendance.list.path, async (req, res) => {
    const date = req.query.date as string | undefined;
    const records = await storage.getAttendance(date);
    res.json(records);
  });
  
  app.get(api.attendance.getForStudent.path, async (req, res) => {
    const records = await storage.getStudentAttendance(Number(req.params.id));
    res.json(records);
  });

  app.post(api.attendance.mark.path, async (req, res) => {
    try {
      const input = api.attendance.mark.input.parse(req.body);
      const record = await storage.markAttendance(input);
      res.status(201).json(record);
    } catch (err) {
        res.status(400).json({ message: "Invalid input" });
    }
  });

  // --- FEES ---
  app.get(api.fees.list.path, async (req, res) => {
    const fees = await storage.getFees();
    res.json(fees);
  });

  app.get(api.fees.getForStudent.path, async (req, res) => {
    const fees = await storage.getStudentFees(Number(req.params.id));
    res.json(fees);
  });

  // --- NOTICES ---
  app.get(api.notices.list.path, async (req, res) => {
    const notices = await storage.getNotices();
    res.json(notices);
  });

  app.post(api.notices.create.path, async (req, res) => {
    try {
      const input = api.notices.create.input.parse(req.body);
      const notice = await storage.createNotice(input);
      res.status(201).json(notice);
    } catch (err) {
        res.status(400).json({ message: "Invalid input" });
    }
  });

  // --- DASHBOARD ---
  app.get(api.dashboard.stats.path, async (req, res) => {
    const stats = await storage.getDashboardStats();
    res.json(stats);
  });

  return httpServer;
}
