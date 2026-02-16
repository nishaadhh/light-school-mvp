import { motion } from "framer-motion";
import { Image, Calendar, Camera } from "lucide-react";
import { useState } from "react";

const mockGallery = [
    {
        id: 1, title: "Onam Celebration", date: "2026-02-14", category: "event", photos: [
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=300&fit=crop",
        ]
    },
    {
        id: 2, title: "Art & Craft Day", date: "2026-02-10", category: "classroom", photos: [
            "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop",
        ]
    },
    {
        id: 3, title: "Sports Day Practice", date: "2026-02-05", category: "event", photos: [
            "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1560582861-45078880e48e?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=400&h=300&fit=crop",
        ]
    },
    {
        id: 4, title: "Rhyme Time Session", date: "2026-02-01", category: "classroom", photos: [
            "https://images.unsplash.com/photo-1587654780236-4a1fea84e5b0?w=400&h=300&fit=crop",
        ]
    },
];

export default function Gallery() {
    const [filter, setFilter] = useState("all");
    const [lightbox, setLightbox] = useState<string | null>(null);

    const filtered = filter === "all" ? mockGallery : mockGallery.filter(g => g.category === filter);

    return (
        <div className="p-6 max-w-lg mx-auto space-y-6 pb-24">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
                    <Image className="w-7 h-7 text-primary" /> Gallery
                </h1>
                <p className="text-sm text-muted-foreground mt-1">Photos from school events and activities</p>
            </motion.div>

            {/* Filters */}
            <div className="flex gap-2">
                {["all", "event", "classroom"].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            {filtered.map((album, i) => (
                <motion.div
                    key={album.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-4 rounded-2xl"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h3 className="font-bold text-gray-900">{album.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${album.category === 'event' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                    }`}>{album.category}</span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(album.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                </span>
                            </div>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Camera className="w-3.5 h-3.5" /> {album.photos.length}
                        </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {album.photos.map((photo, j) => (
                            <motion.div
                                key={j}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setLightbox(photo)}
                                className="aspect-square rounded-xl overflow-hidden cursor-pointer bg-gray-100"
                            >
                                <img src={photo} alt="" className="w-full h-full object-cover" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ))}

            {/* Lightbox */}
            {lightbox && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setLightbox(null)}
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                >
                    <motion.img
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        src={lightbox}
                        className="max-w-full max-h-[80vh] rounded-2xl"
                    />
                </motion.div>
            )}
        </div>
    );
}
