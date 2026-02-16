import { motion } from "framer-motion";
import { Calendar, Award, Heart, Smile, Star, TrendingUp } from "lucide-react";
import { useState } from "react";

const timelineData = [
  {
    id: 1,
    date: "2024-06-15",
    type: "achievement",
    title: "Star of the Week",
    description: "Anu was awarded Star of the Week for excellent behavior and participation!",
    icon: Star,
    color: "yellow"
  },
  {
    id: 2,
    date: "2024-06-12",
    type: "activity",
    title: "Art & Craft Session",
    description: "Created a beautiful painting of flowers. Showed great creativity!",
    icon: Heart,
    color: "pink"
  },
  {
    id: 3,
    date: "2024-06-10",
    type: "milestone",
    title: "Reading Progress",
    description: "Completed Level 1 reading book. Moving to Level 2!",
    icon: TrendingUp,
    color: "green"
  },
  {
    id: 4,
    date: "2024-06-08",
    type: "activity",
    title: "Sports Day Practice",
    description: "Participated in running race practice. Great enthusiasm!",
    icon: Award,
    color: "blue"
  },
  {
    id: 5,
    date: "2024-06-05",
    type: "social",
    title: "Made New Friends",
    description: "Played well with classmates during free time. Excellent social skills!",
    icon: Smile,
    color: "purple"
  }
];

const photos = [
  { id: 1, url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400", caption: "Art Class" },
  { id: 2, url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400", caption: "Sports Day" },
  { id: 3, url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400", caption: "Music Time" },
  { id: 4, url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", caption: "Story Time" },
  { id: 5, url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400", caption: "Onam Celebration" },
  { id: 6, url: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400", caption: "Field Trip" },
];

export default function ParentProfile() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      yellow: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300" },
      pink: { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-300" },
      green: { bg: "bg-green-100", text: "text-green-700", border: "border-green-300" },
      blue: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" },
      purple: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary via-purple-600 to-pink-500 p-6 pb-16 rounded-b-[2.5rem] shadow-2xl"
      >
        <h1 className="text-3xl font-bold font-display text-white mb-2">Child Profile</h1>
        <p className="text-white/80">Anu Nair • LKG A</p>
      </motion.div>

      <div className="px-6 -mt-10 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white rounded-full p-1 shadow-lg">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anu"
                alt="Anu"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">Anu Nair</h2>
              <p className="text-gray-600">Roll No. 1 • LKG A</p>
              <p className="text-sm text-gray-500 mt-1">DOB: May 15, 2020</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-700 font-medium mb-1">Parent</p>
              <p className="font-semibold text-gray-900">Ramesh Nair</p>
            </div>
            <div className="bg-green-50 p-3 rounded-xl border border-green-100">
              <p className="text-xs text-green-700 font-medium mb-1">Phone</p>
              <p className="font-semibold text-gray-900">9846012345</p>
            </div>
          </div>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg text-gray-900">Activity Timeline</h3>
          </div>

          <div className="space-y-4">
            {timelineData.map((item, idx) => {
              const colors = getColorClasses(item.color);
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="relative pl-8 pb-4 border-l-2 border-gray-200 last:border-l-0 last:pb-0"
                >
                  <div className={`absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full ${colors.bg} border-2 border-white flex items-center justify-center shadow-md`}>
                    <Icon className={`w-3 h-3 ${colors.text}`} />
                  </div>

                  <div className={`p-4 rounded-xl ${colors.bg} border ${colors.border}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <span className="text-xs text-gray-500">
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 rounded-2xl shadow-xl"
        >
          <h3 className="font-bold text-lg text-gray-900 mb-4">Photo Gallery</h3>

          <div className="grid grid-cols-3 gap-3">
            {photos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                onClick={() => setSelectedPhoto(photo.id)}
                className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-md"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Medical Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-5 rounded-2xl shadow-xl border-l-4 border-blue-500"
        >
          <h3 className="font-bold text-gray-900 mb-2">Medical Notes</h3>
          <p className="text-sm text-gray-600">No allergies reported</p>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-2xl w-full"
          >
            <img
              src={photos.find(p => p.id === selectedPhoto)?.url}
              alt="Full size"
              className="w-full rounded-2xl shadow-2xl"
            />
            <p className="text-white text-center mt-4 font-semibold">
              {photos.find(p => p.id === selectedPhoto)?.caption}
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
