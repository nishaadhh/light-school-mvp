import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { API_BASE_URL } from "@/lib/config";

export function useStats() {
  return useQuery({
    queryKey: [api.dashboard.stats.path],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}${api.dashboard.stats.path}`);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return api.dashboard.stats.responses[200].parse(await res.json());
    },
  });
}
