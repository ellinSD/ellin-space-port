import { supabase } from "@/integrations/supabase/client";

export type Project = {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  sort_order: number;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  issuer: string | null;
  date_label: string | null;
  sort_order: number;
};

export type SiteSettings = {
  cv_path: string | null;
  photo_path: string | null;
};

export const projectsQuery = {
  queryKey: ["projects"],
  queryFn: async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from("projects")
      .select("id,title,description,tech_stack,github_url,live_url,sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Project[];
  },
};

export const achievementsQuery = {
  queryKey: ["achievements"],
  queryFn: async (): Promise<Achievement[]> => {
    const { data, error } = await supabase
      .from("achievements")
      .select("id,title,description,issuer,date_label,sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Achievement[];
  },
};

export const settingsQuery = {
  queryKey: ["site_settings"],
  queryFn: async (): Promise<SiteSettings> => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("cv_path,photo_path")
      .eq("id", 1)
      .maybeSingle();
    if (error) throw error;
    return (data ?? { cv_path: null, photo_path: null }) as SiteSettings;
  },
};

export const CV_URL = "/api/public/cv";
export const CV_DOWNLOAD_URL = "/api/public/cv?download=1";
export const PHOTO_URL = "/api/public/photo";
