import { useStudents } from "@/hooks/use-students";
import { useAttendance, useMarkAttendance } from "@/hooks/use-attendance";
import { useState } from "react";
import { format } from "date-fns";
import { Check, X, Calendar as CalendarIcon, CheckCheck, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { MonthlyAttendanceChart } from "@/components/attendance/MonthlyChart";

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
            title: present ? "✓ Marked Present" : "✗ Marked Absent",
            duration: 1500,
          });
        }
      }
    );
  };

  const handleMarkAllPresent = () => {
    students?.forEach((student) => {
      if (getStatus(student.id) !== true) {
        markAttendance.mutate({ studentId: student.id, date: formattedDate, present: true });
      }
    });
    toast({
      title: "📋 All students marked present",
      description: "Parents will be notified",
      duration: 2000,
    });
  };

  const presentCount = students?.filter(s => getStatus(s.id) === true).length || 0;
  const totalCount = students?.length || 0;

  return (
    <div className="p-6 max-w-7xl mx-auto mb-20 md:mb-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
            Daily Attendance
          </h1>
          <p className="text-muted-foreground text-lg">Class LKG A • {format(date, "EEEE, MMMM do, yyyy")}</p>
        </div>

        <div className="flex gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("justify-start text-left font-normal rounded-xl", !date && "text-muted-foreground")}>
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

          <Button
            onClick={handleMarkAllPresent}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-lg shadow-green-500/30"
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All Present
          </Button>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4 rounded-2xl mb-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Present Today</p>
            <p className="text-2xl font-bold text-green-600">{presentCount}/{totalCount}</p>
          </div>
          <div className="h-12 w-px bg-gray-200"></div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
            <p className="text-2xl font-bold text-primary">
              {totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0}%
            </p>
          </div>
        </div>
        <Button variant="outline" className="rounded-xl" size="sm">
          <Bell className="w-4 h-4 mr-2" />
          Notify Parents
        </Button>
      </motion.div>

      {/* Student Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {students?.map((student, idx) => {
          const status = getStatus(student.id);

          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                "glass-card p-5 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl",
                status === true ? "border-green-300 bg-green-50/50" :
                  status === false ? "border-red-300 bg-red-50/50" :
                    "border-white/30"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{student.name}</h3>
                    <p className="text-xs text-gray-500">Roll No: {student.rollNo}</p>
                  </div>
                </div>
                <div className={cn(
                  "w-3 h-3 rounded-full shadow-lg",
                  status === true ? "bg-green-500 shadow-green-500/50" :
                    status === false ? "bg-red-500 shadow-red-500/50" :
                      "bg-gray-300"
                )} />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleMark(student.id, true)}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all",
                    status === true
                      ? "bg-green-500 text-white shadow-lg shadow-green-500/30 scale-105"
                      : "bg-white border-2 border-gray-200 hover:bg-green-50 hover:text-green-600 hover:border-green-300"
                  )}
                >
                  <Check className="w-4 h-4" /> Present
                </button>
                <button
                  onClick={() => handleMark(student.id, false)}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all",
                    status === false
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105"
                      : "bg-white border-2 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                  )}
                >
                  <X className="w-4 h-4" /> Absent
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Monthly Chart */}
      <MonthlyAttendanceChart />
    </div>
  );
}
