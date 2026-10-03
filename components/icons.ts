import { BarChart3, Globe, Box, Building2, CalendarDays, Clapperboard, Palette, Search, Share2 } from "lucide-react";
import type { ServiceKey } from "@/lib/content";

export const serviceIcons: Record<ServiceKey, typeof Search> = {
  ai: Globe,
  performance: BarChart3,
  seo: Search,
  social: Share2,
  branding: Palette,
  packaging: Box,
  events: CalendarDays,
  realestate: Building2,
  video: Clapperboard,
};
