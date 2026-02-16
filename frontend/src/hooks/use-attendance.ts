import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertAttendance } from "@shared/schema";

export function useAttendance(date?: string) {
  return useQuery({
    queryKey: [api.attendance.list.path, date],
    queryFn: async () => {
      // Build URL with query params
      const url = date 
        ? `${api.attendance.list.path}?date=${date}`
        : api.attendance.list.path;
        
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch attendance");
      return api.attendance.list.responses[200].parse(await res.json());
    },
  });
}

export function useMarkAttendance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertAttendance) => {
      const res = await fetch(api.attendance.mark.path, {
        method: api.attendance.mark.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to mark attendance");
      return api.attendance.mark.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.attendance.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.dashboard.stats.path] });
    },
  });
}

export function useStudentAttendance(studentId: number) {
  return useQuery({
    queryKey: [api.attendance.getForStudent.path, studentId],
    queryFn: async () => {
      const url = buildUrl(api.attendance.getForStudent.path, { id: studentId });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch student attendance");
      return api.attendance.getForStudent.responses[200].parse(await res.json());
    },
    enabled: !!studentId,
  });
}
