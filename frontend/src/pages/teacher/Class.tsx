import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Users, Eye, MessageSquare, Search } from "lucide-react";
import { useState } from "react";

export default function TeacherClass() {
    const { data: students } = useQuery({
        queryKey: ["/api/students"],
        queryFn: () => fetch("http://localhost:5000/api/students").then(r => r.json()),
    });

    const [search, setSearch] = useState("");
    const [selectedClass] = useState("LKG A");

    const classStudents = (students || []).filter((s: any) =>
        s.class === selectedClass &&
        (search === "" || s.name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-display font-bold text-gray-900 flex items-center gap-3">
                    <Users className="w-8 h-8 text-primary" /> My Class — {selectedClass}
                </h1>
                <p className="text-muted-foreground mt-1">{classStudents.length} students</p>
            </motion.div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                />
            </div>

            {/* Student Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classStudents.map((student: any, i: number) => (
                    <motion.div
                        key={student.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card p-5 rounded-2xl hover:shadow-xl transition-all"
                    >
                        <div className="flex items-start gap-4">
                            <img
                                src={student.photoUrl}
                                alt={student.name}
                                className="w-16 h-16 rounded-2xl bg-primary/10 object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-lg">{student.name}</h3>
                                <p className="text-sm text-muted-foreground">Roll No: {student.rollNo}</p>
                                <div className="flex gap-2 mt-2">
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{student.class}</span>
                                    {student.medicalNotes && student.medicalNotes !== "None" && student.medicalNotes !== "No allergies" && (
                                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-bold">⚕️ Medical Note</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
                            <div>
                                <p className="text-xs text-muted-foreground">Parent</p>
                                <p className="text-sm font-medium text-gray-900">{student.parentName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Phone</p>
                                <p className="text-sm font-medium text-gray-900">{student.parentPhone}</p>
                            </div>
                        </div>

                        {student.medicalNotes && student.medicalNotes !== "None" && student.medicalNotes !== "No allergies" && (
                            <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                                <p className="text-xs text-amber-700">⚕️ {student.medicalNotes}</p>
                            </div>
                        )}

                        <div className="flex gap-2 mt-4">
                            <button className="flex-1 py-2 bg-primary/10 text-primary rounded-lg text-sm font-semibold hover:bg-primary/20 transition-colors flex items-center justify-center gap-1">
                                <Eye className="w-3.5 h-3.5" /> View Profile
                            </button>
                            <button className="flex-1 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition-colors flex items-center justify-center gap-1">
                                <MessageSquare className="w-3.5 h-3.5" /> Add Note
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
