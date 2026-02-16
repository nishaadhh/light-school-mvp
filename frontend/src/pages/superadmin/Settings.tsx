import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Settings, Save, School, MapPin, Phone, Mail, Calendar, Award } from "lucide-react";
import { useState } from "react";

export default function SchoolSettings() {
    const { data: settings } = useQuery({
        queryKey: ["/api/settings"],
        queryFn: () => fetch("http://localhost:5000/api/settings").then(r => r.json()),
    });

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-gray-900 flex items-center gap-3">
                            <Settings className="w-8 h-8 text-primary" /> School Settings
                        </h1>
                        <p className="text-muted-foreground mt-1">Configure your school's basic information</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary/90'
                            }`}
                    >
                        <Save className="w-4 h-4" />
                        {saved ? 'Saved!' : 'Save Changes'}
                    </motion.button>
                </div>
            </motion.div>

            {/* School Identity */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                    <School className="w-5 h-5 text-primary" /> School Identity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                        <input
                            type="text"
                            defaultValue={settings?.name || ""}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Principal</label>
                        <input
                            type="text"
                            defaultValue={settings?.principal || ""}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">School Motto</label>
                        <input
                            type="text"
                            defaultValue={settings?.motto || ""}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
                        <input
                            type="number"
                            defaultValue={settings?.establishedYear || 2018}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">School Logo</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <Award className="w-8 h-8 text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground">Click to upload logo</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" /> Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <MapPin className="w-4 h-4 inline mr-1" /> Address
                        </label>
                        <textarea
                            defaultValue={settings?.address || ""}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-none"
                        />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Phone className="w-4 h-4 inline mr-1" /> Phone
                            </label>
                            <input
                                type="tel"
                                defaultValue={settings?.phone || ""}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Mail className="w-4 h-4 inline mr-1" /> Email
                            </label>
                            <input
                                type="email"
                                defaultValue={settings?.email || ""}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Academic Settings */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" /> Academic Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                        <select defaultValue={settings?.academicYear || "2025-2026"} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all">
                            <option>2024-2025</option>
                            <option>2025-2026</option>
                            <option>2026-2027</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Classes</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {["LKG A", "LKG B", "UKG A"].map(c => (
                                <span key={c} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">{c}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {["Mon", "Tue", "Wed", "Thu", "Fri"].map(d => (
                                <span key={d} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{d}</span>
                            ))}
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">Sat</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
