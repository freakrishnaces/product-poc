import React from 'react'
import { 
  FileText, 
  Image, 
  Mail, 
  Music, 
  Video,
  File,
  Folder,
  Code,
  Settings,
  Calendar,
  User,
  ShoppingCart,
  Heart,
  Map,
  Book,
  Camera,
  Headphones,
  Monitor,
  Smartphone,
  Coffee
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const recentItems = [
  { icon: FileText, label: 'Document.pdf', time: '2 mins ago' },
  { icon: Image, label: 'Photo.jpg', time: '5 mins ago' },
  { icon: Mail, label: 'Email draft', time: '10 mins ago' },
  { icon: Music, label: 'Song.mp3', time: '15 mins ago' },
  { icon: Video, label: 'Video.mp4', time: '20 mins ago' },
  { icon: File, label: 'Notes.txt', time: '25 mins ago' },
  { icon: Folder, label: 'Projects', time: '30 mins ago' },
  { icon: Code, label: 'Script.js', time: '35 mins ago' },
  { icon: Settings, label: 'Preferences', time: '40 mins ago' },
  { icon: Calendar, label: 'Schedule', time: '45 mins ago' },
  { icon: User, label: 'Profile', time: '50 mins ago' },
  { icon: ShoppingCart, label: 'Cart', time: '55 mins ago' },
  { icon: Heart, label: 'Favorites', time: '1 hour ago' },
  { icon: Map, label: 'Location', time: '1.5 hours ago' },
  { icon: Book, label: 'Reading List', time: '2 hours ago' },
  { icon: Camera, label: 'Camera Roll', time: '2.5 hours ago' },
  { icon: Headphones, label: 'Playlist', time: '3 hours ago' },
  { icon: Monitor, label: 'Dashboard', time: '3.5 hours ago' },
  { icon: Smartphone, label: 'Mobile App', time: '4 hours ago' },
  { icon: Coffee, label: 'Break Time', time: '4.5 hours ago' }
]

export const RecentActivity = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto my-6">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div 
                key={index} 
                className="flex items-center p-2 space-x-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="p-2 rounded-full bg-primary/10">
                  <IconComponent className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentActivity