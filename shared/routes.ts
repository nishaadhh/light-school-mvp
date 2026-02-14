import { z } from 'zod';
import { 
  insertUserSchema, 
  insertStudentSchema, 
  insertAttendanceSchema, 
  insertFeeSchema, 
  insertNoticeSchema,
  users,
  students,
  attendance,
  fees,
  notices 
} from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  // --- USERS / AUTH (Mock) ---
  users: {
    login: {
      method: 'POST' as const,
      path: '/api/login' as const,
      input: z.object({
        role: z.enum(["admin", "teacher", "parent"]),
        username: z.string().optional(), // Optional for demo simplified login
        password: z.string().optional()
      }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.validation
      }
    }
  },

  // --- STUDENTS ---
  students: {
    list: {
      method: 'GET' as const,
      path: '/api/students' as const,
      responses: {
        200: z.array(z.custom<typeof students.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/students/:id' as const,
      responses: {
        200: z.custom<typeof students.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/students' as const,
      input: insertStudentSchema,
      responses: {
        201: z.custom<typeof students.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },

  // --- ATTENDANCE ---
  attendance: {
    list: {
      method: 'GET' as const,
      path: '/api/attendance' as const,
      // Query params: ?date=YYYY-MM-DD
      input: z.object({ date: z.string().optional() }).optional(),
      responses: {
        200: z.array(z.custom<typeof attendance.$inferSelect>()),
      },
    },
    mark: {
      method: 'POST' as const,
      path: '/api/attendance' as const,
      input: insertAttendanceSchema,
      responses: {
        201: z.custom<typeof attendance.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    getForStudent: {
      method: 'GET' as const,
      path: '/api/students/:id/attendance' as const,
      responses: {
        200: z.array(z.custom<typeof attendance.$inferSelect>()),
      },
    }
  },

  // --- FEES ---
  fees: {
    list: {
      method: 'GET' as const,
      path: '/api/fees' as const,
      responses: {
        200: z.array(z.custom<typeof fees.$inferSelect & { studentName: string }>()), 
      },
    },
    getForStudent: {
      method: 'GET' as const,
      path: '/api/students/:id/fees' as const,
      responses: {
        200: z.array(z.custom<typeof fees.$inferSelect>()),
      },
    }
  },

  // --- NOTICES ---
  notices: {
    list: {
      method: 'GET' as const,
      path: '/api/notices' as const,
      responses: {
        200: z.array(z.custom<typeof notices.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/notices' as const,
      input: insertNoticeSchema,
      responses: {
        201: z.custom<typeof notices.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  
  // --- DASHBOARD STATS ---
  dashboard: {
    stats: {
      method: 'GET' as const,
      path: '/api/dashboard/stats' as const,
      responses: {
        200: z.object({
          totalStudents: z.number(),
          totalTeachers: z.number(),
          presentToday: z.number(),
          pendingFees: z.number()
        })
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
