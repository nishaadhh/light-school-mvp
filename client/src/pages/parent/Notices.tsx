import { useNotices } from "@/hooks/use-notices";
import { format } from "date-fns";
import { Megaphone, Calendar } from "lucide-react";

export default function ParentNotices() {
  const { data: notices, isLoading } = useNotices();

  return (
    <div className="min-h-screen bg-gray-50 pb-24 p-6">
      <h1 className="text-2xl font-display font-bold text-gray-900 mb-6">School Notices</h1>

      <div className="space-y-4">
        {isLoading ? (
          <div>Loading notices...</div>
        ) : (
          notices?.map((notice) => (
            <div key={notice.id} className="bg-white p-5 rounded-2xl shadow-sm border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
                      {notice.type}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(), "MMM d")}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{notice.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{notice.content}</p>
                </div>
              </div>
            </div>
          ))
        )}

        {notices?.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No notices found.
          </div>
        )}
      </div>
    </div>
  );
}
