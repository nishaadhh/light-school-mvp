import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { API_BASE_URL } from "@/lib/config";

export function useFees() {
  return useQuery({
    queryKey: [api.fees.list.path],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}${api.fees.list.path}`);
      if (!res.ok) throw new Error("Failed to fetch fees");
      return api.fees.list.responses[200].parse(await res.json());
    },
  });
}

export function useStudentFees(studentId: number) {
  return useQuery({
    queryKey: [api.fees.getForStudent.path, studentId],
    queryFn: async () => {
      const url = buildUrl(api.fees.getForStudent.path, { id: studentId });
      const res = await fetch(`${API_BASE_URL}${url}`);
      if (!res.ok) throw new Error("Failed to fetch student fees");
      return api.fees.getForStudent.responses[200].parse(await res.json());
    },
    enabled: !!studentId,
  });
}
