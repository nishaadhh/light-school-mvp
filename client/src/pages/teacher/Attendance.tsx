import { useStudents } from "@/hooks/use-students";
import { useAttendance, useMarkAttendance } from "@/hooks/use-attendance";
import { useState } from "react";
import { format } from "date-fns";
import { Check, X, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

export default function AttendancePage() {
  const [date, setDate] = useState<Date>(new Date());
  const formattedDate = format(date, "yyyy-MM-dd");
  
  const { data: students } = useStudents();
  const { data: attendanceRecords } = useAttendance(formattedDate);
  const markAttendance = useMarkAttendance();

  // Helper to check status
  const getStatus = (studentId: number) => {
    const record = attendanceRecords?.find(a => a.studentId === studentId);
    return record?.present; // true, false, or undefined
  };

  const handleMark = (studentId: number, present: boolean) => {
    markAttendance.mutate(
      { studentId, date: formattedDate, present },
      {
        onSuccess: () => {
          toast({
            title: present ? "Marked Present" : "Marked Absent",
            duration: 1500,
          });
        }
      }
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto mb-20 md:mb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Daily Attendance</h1>
          <p className="text-muted-foreground">Class LKG A • {format(date, "EEEE, MMMM do, yyyy")}</p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students?.map((student) => {
          const status = getStatus(student.id);
          
          return (
            <div 
              key={student.id} 
              className={cn(
                "p-4 rounded-2xl border transition-all duration-300",
                status === true ? "bg-green-50 border-green-200" : 
                status === false ? "bg-red-50 border-red-200" : 
                "bg-white border-border shadow-sm"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-500">Roll No: {student.rollNo}</p>
                </div>
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  status === true ? "bg-green-500" : 
                  status === false ? "bg-red-500" : 
                  "bg-gray-300"
                )} />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleMark(student.id, true)}
                  className={cn(
                    "flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors",
                    status === true 
                      ? "bg-green-500 text-white shadow-lg shadow-green-500/30" 
                      : "bg-white border border-gray-200 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                  )}
                >
                  <Check className="w-4 h-4" /> Present
                </button>
                <button
                  onClick={() => handleMark(student.id, false)}
                  className={cn(
                    "flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors",
                    status === false 
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/30" 
                      : "bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  )}
                >
                  <X className="w-4 h-4" /> Absent
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
