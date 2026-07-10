import { BookOpen, Clapperboard, Code2, FileText, Gamepad2, ImageIcon, MonitorCog, Smartphone, Sparkles, Video } from "lucide-react";

const icons = { image: ImageIcon, video: Video, code: Code2, smartphone: Smartphone, monitor: MonitorCog, gamepad: Gamepad2, book: BookOpen, clapperboard: Clapperboard, filetext: FileText, sparkles: Sparkles };

export function ServiceIcon({ name, size = 24 }: { name: string; size?: number }) {
  const Icon = icons[name as keyof typeof icons] ?? Sparkles;
  return <Icon size={size} strokeWidth={1.8} />;
}