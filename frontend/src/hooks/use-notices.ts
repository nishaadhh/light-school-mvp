import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertNotice } from "@shared/schema";
import { API_BASE_URL } from "@/lib/config";

export function useNotices() {
  return useQuery({
    queryKey: [api.notices.list.path],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}${api.notices.list.path}`);
      if (!res.ok) throw new Error("Failed to fetch notices");
      return api.notices.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateNotice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertNotice) => {
      const res = await fetch(`${API_BASE_URL}${api.notices.create.path}`, {
        method: api.notices.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create notice");
      return api.notices.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.notices.list.path] });
    },
  });
}
