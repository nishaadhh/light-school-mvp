import { useNotices, useCreateNotice } from "@/hooks/use-notices";
import { useState } from "react";
import { Megaphone, Send, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDistanceToNow } from "date-fns";
import { useForm } from "react-hook-form";

export default function NoticesPage() {
    const { data: notices } = useNotices();
    const createNotice = useCreateNotice();
    const [audience, setAudience] = useState<string[]>(["all"]);

    const form = useForm({
        defaultValues: {
            title: "",
            content: "",
        }
    });

    const onSubmit = async (data: any) => {
        await createNotice.mutateAsync({
            ...data,
            type: "announcement",
            date: new Date().toISOString(),
            audience: audience.join(","),
        });
        form.reset();
    };

    const toggleAudience = (value: string) => {
        if (value === "all") {
            setAudience(["all"]);
        } else {
            const newAudience = audience.filter(a => a !== "all");
            if (newAudience.includes(value)) {
                setAudience(newAudience.filter(a => a !== value));
            } else {
                setAudience([...newAudience, value]);
            }
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
                    Communication Center
                </h1>
                <p className="text-muted-foreground text-lg">Send announcements and notices</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Notice Composer */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 rounded-2xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-purple-100">
                            <Megaphone className="w-5 h-5 text-purple-600" />
                        </div>
                        <h2 className="font-bold text-xl text-gray-900">Create Notice</h2>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Notice Title</Label>
                            <Input
                                {...form.register("title")}
                                placeholder="e.g., Annual Day Celebration"
                                className="rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Message</Label>
                            <Textarea
                                {...form.register("content")}
                                placeholder="Write your announcement here..."
                                rows={6}
                                className="rounded-xl resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Target Audience</Label>
                            <div className="flex flex-wrap gap-2">
                                {["all", "parents", "teachers", "lkg-a", "ukg-a"].map((aud) => (
                                    <button
                                        key={aud}
                                        type="button"
                                        onClick={() => toggleAudience(aud)}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${audience.includes(aud) || (aud !== "all" && audience.includes("all"))
                                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {aud === "all" ? "All" : aud.replace("-", " ").toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={createNotice.isPending}
                            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/30"
                        >
                            <Send className="w-4 h-4 mr-2" />
                            {createNotice.isPending ? "Sending..." : "Send Notice"}
                        </Button>
                    </form>
                </motion.div>

                {/* Announcement Feed */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 rounded-2xl"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-100">
                                <Calendar className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="font-bold text-xl text-gray-900">Recent Notices</h2>
                        </div>
                        <span className="text-sm text-muted-foreground">{notices?.length || 0} total</span>
                    </div>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {notices?.map((notice: any, idx: number) => (
                            <motion.div
                                key={notice.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-bold text-gray-900">{notice.title}</h3>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${notice.type === "event"
                                            ? "bg-purple-100 text-purple-700"
                                            : "bg-blue-100 text-blue-700"
                                        }`}>
                                        {notice.type}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{notice.content}</p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        <span>All Parents</span>
                                    </div>
                                    <span>{formatDistanceToNow(new Date(notice.date), { addSuffix: true })}</span>
                                </div>
                            </motion.div>
                        ))}

                        {(!notices || notices.length === 0) && (
                            <div className="text-center py-12 text-muted-foreground">
                                <Megaphone className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p className="text-sm">No notices yet. Create your first announcement!</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
