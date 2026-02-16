import { motion } from "framer-motion";
import { BookOpen, Plus, Camera, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";

const mockActivities = [
    { id: 1, title: "Art & Craft: Paper Flowers", type: "activity", class: "LKG A", date: "Today", time: "10:30 AM", description: "Students made colorful paper flowers using origami techniques.", status: "completed" },
    { id: 2, title: "Homework: Alphabet Writing (A-E)", type: "homework", class: "LKG A", date: "Today", time: "2:00 PM", description: "Practice writing uppercase & lowercase letters A through E.", status: "posted" },
    { id: 3, title: "Rhyme Time: Twinkle Twinkle", type: "activity", class: "LKG A", date: "Yesterday", time: "11:00 AM", description: "Singing and learning actions for nursery rhymes.", status: "completed" },
    { id: 4, title: "Homework: Number Writing (1-10)", type: "homework", class: "LKG A", date: "Yesterday", time: "2:30 PM", description: "Practice writing numbers 1 to 10 in the math notebook.", status: "posted" },
    { id: 5, title: "Story Time: The Hungry Caterpillar", type: "activity", class: "LKG A", date: "2 days ago", time: "11:30 AM", description: "Interactive storytelling session with picture cards.", status: "completed" },
];

export default function Activities() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-gray-900 flex items-center gap-3">
                            <BookOpen className="w-8 h-8 text-primary" /> Activities & Homework
                        </h1>
                        <p className="text-muted-foreground mt-1">Post daily activities and homework updates</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowForm(!showForm)}
                        className="px-5 py-3 bg-primary text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-4 h-4" /> New Post
                    </motion.button>
                </div>
            </motion.div>

            {/* New Post Form */}
            {showForm && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card p-6 rounded-2xl space-y-4">
                    <h3 className="font-bold text-gray-900">New Activity / Homework</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Title" className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                        <select className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none">
                            <option>Activity</option>
                            <option>Homework</option>
                            <option>Observation</option>
                        </select>
                    </div>
                    <textarea placeholder="Description..." rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none resize-none" />
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload photos</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all">Post</button>
                        <button onClick={() => setShowForm(false)} className="px-6 py-2 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition-all">Cancel</button>
                    </div>
                </motion.div>
            )}

            {/* Activities List */}
            <div className="space-y-4">
                {mockActivities.map((activity, i) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card p-5 rounded-2xl"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.type === 'homework' ? 'bg-orange-100' : 'bg-blue-100'
                                    }`}>
                                    {activity.type === 'homework' ? (
                                        <BookOpen className={`w-5 h-5 text-orange-600`} />
                                    ) : (
                                        <Camera className={`w-5 h-5 text-blue-600`} />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{activity.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activity.type === 'homework' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                                            }`}>{activity.type}</span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {activity.date} • {activity.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                                <CheckCircle className="w-3.5 h-3.5" /> {activity.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 ml-13">{activity.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
