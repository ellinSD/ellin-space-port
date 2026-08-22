import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, Upload, Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  achievementsQuery,
  projectsQuery,
  settingsQuery,
  type Achievement,
  type Project,
} from "@/lib/portfolio-api";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin" },
      { name: "description", content: "Private area." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin" },
      { property: "og:description", content: "Private area." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshRole = async (uid: string | null) => {
    if (!uid) {
      setIsAdmin(false);
      return;
    }
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
    setIsAdmin(Boolean(data?.some((r) => r.role === "admin")));
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      setTimeout(() => void refreshRole(uid), 0);
    });

    supabase.auth.getSession().then(async ({ data }) => {
      const uid = data.session?.user?.id ?? null;
      setUserId(uid);
      await refreshRole(uid);
      setChecking(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!userId) return <AuthCard />;

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <ShieldCheck className="size-8 text-primary" />
        <p className="text-sm text-muted-foreground">This account doesn't have admin access.</p>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>
          Sign out
        </Button>
      </div>
    );
  }

  return <Dashboard />;
}

function AuthCard() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || password.length < 6) {
      toast.error("Enter an email and a password of at least 6 characters");
      return;
    }
    setBusy(true);
    const result =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email: email.trim(), password })
        : await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    setBusy(false);

    if (result.error) {
      toast.error(result.error.message);
      return;
    }
    if (mode === "signup" && !result.data.session) {
      toast.success("Account created — check your email to confirm, then sign in.");
      setMode("signin");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={submit} className="card-elevated w-full max-w-sm rounded-2xl p-8">
        <h1 className="text-xl font-bold">Owner access</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin" ? "Sign in to manage your portfolio." : "Create the owner account."}
        </p>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy && <Loader2 className="size-4 animate-spin" />}
            {mode === "signin" ? "Sign in" : "Create account"}
          </Button>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="w-full text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            {mode === "signin" ? "First time? Create the owner account" : "Already have an account? Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Dashboard() {
  const qc = useQueryClient();
  const { data: projects = [] } = useQuery(projectsQuery);
  const { data: achievements = [] } = useQuery(achievementsQuery);
  const { data: settings } = useQuery(settingsQuery);

  const [project, setProject] = useState({ title: "", description: "", tech: "", github_url: "", live_url: "" });
  const [achievement, setAchievement] = useState({ title: "", description: "", issuer: "", date_label: "" });
  const [uploading, setUploading] = useState<"cv" | "photo" | null>(null);

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project.title.trim()) return toast.error("Title is required");
    const { error } = await supabase.from("projects").insert({
      title: project.title.trim().slice(0, 120),
      description: project.description.trim().slice(0, 1000),
      tech_stack: project.tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      github_url: project.github_url.trim() || null,
      live_url: project.live_url.trim() || null,
      sort_order: projects.length,
    });
    if (error) return toast.error(error.message);
    setProject({ title: "", description: "", tech: "", github_url: "", live_url: "" });
    qc.invalidateQueries({ queryKey: projectsQuery.queryKey });
    toast.success("Project added");
  };

  const removeProject = async (item: Project) => {
    const { error } = await supabase.from("projects").delete().eq("id", item.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: projectsQuery.queryKey });
    toast.success("Project removed");
  };

  const addAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!achievement.title.trim()) return toast.error("Title is required");
    const { error } = await supabase.from("achievements").insert({
      title: achievement.title.trim().slice(0, 120),
      description: achievement.description.trim().slice(0, 1000),
      issuer: achievement.issuer.trim() || null,
      date_label: achievement.date_label.trim() || null,
      sort_order: achievements.length,
    });
    if (error) return toast.error(error.message);
    setAchievement({ title: "", description: "", issuer: "", date_label: "" });
    qc.invalidateQueries({ queryKey: achievementsQuery.queryKey });
    toast.success("Achievement added");
  };

  const removeAchievement = async (item: Achievement) => {
    const { error } = await supabase.from("achievements").delete().eq("id", item.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: achievementsQuery.queryKey });
    toast.success("Achievement removed");
  };

  const uploadFile = async (kind: "cv" | "photo", file: File) => {
    setUploading(kind);
    const ext = file.name.split(".").pop() || (kind === "cv" ? "pdf" : "jpg");
    const path = `${kind}/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("portfolio").upload(path, file, {
      upsert: true,
      contentType: file.type,
    });
    if (upErr) {
      setUploading(null);
      return toast.error(upErr.message);
    }
    const patch = kind === "cv" ? { cv_path: path } : { photo_path: path };
    const { error } = await supabase.from("site_settings").update(patch).eq("id", 1);
    setUploading(null);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: settingsQuery.queryKey });
    toast.success(kind === "cv" ? "CV updated" : "Photo updated");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-5 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Portfolio admin</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage projects, achievements and files.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>

        <Tabs defaultValue="projects" className="mt-8">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="files">CV & Photo</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6 space-y-6">
            <form onSubmit={addProject} className="card-elevated space-y-4 rounded-2xl p-6">
              <div className="space-y-2">
                <Label htmlFor="p-title">Title</Label>
                <Input
                  id="p-title"
                  value={project.title}
                  onChange={(e) => setProject({ ...project, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-desc">Short description</Label>
                <Textarea
                  id="p-desc"
                  rows={3}
                  value={project.description}
                  onChange={(e) => setProject({ ...project, description: e.target.value })}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="p-tech">Tech stack (comma separated)</Label>
                  <Input
                    id="p-tech"
                    value={project.tech}
                    onChange={(e) => setProject({ ...project, tech: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p-github">GitHub URL</Label>
                  <Input
                    id="p-github"
                    value={project.github_url}
                    onChange={(e) => setProject({ ...project, github_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p-live">Live URL (optional)</Label>
                  <Input
                    id="p-live"
                    value={project.live_url}
                    onChange={(e) => setProject({ ...project, live_url: e.target.value })}
                  />
                </div>
              </div>
              <Button type="submit">
                <Plus className="size-4" /> Add project
              </Button>
            </form>

            <div className="space-y-3">
              {projects.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeProject(item)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6 space-y-6">
            <form onSubmit={addAchievement} className="card-elevated space-y-4 rounded-2xl p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="a-title">Title</Label>
                  <Input
                    id="a-title"
                    value={achievement.title}
                    onChange={(e) => setAchievement({ ...achievement, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="a-issuer">Issuer</Label>
                  <Input
                    id="a-issuer"
                    value={achievement.issuer}
                    onChange={(e) => setAchievement({ ...achievement, issuer: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="a-date">Date label</Label>
                  <Input
                    id="a-date"
                    placeholder="March 2026"
                    value={achievement.date_label}
                    onChange={(e) => setAchievement({ ...achievement, date_label: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="a-desc">Description</Label>
                <Textarea
                  id="a-desc"
                  rows={3}
                  value={achievement.description}
                  onChange={(e) => setAchievement({ ...achievement, description: e.target.value })}
                />
              </div>
              <Button type="submit">
                <Plus className="size-4" /> Add achievement
              </Button>
            </form>

            <div className="space-y-3">
              {achievements.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {[item.issuer, item.date_label].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeAchievement(item)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="files" className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="card-elevated rounded-2xl p-6">
              <h2 className="text-base font-semibold">CV (PDF)</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {settings?.cv_path ? "A CV is published." : "No CV uploaded yet."}
              </p>
              <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground transition-colors hover:border-primary/50">
                {uploading === "cv" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Upload className="size-4" />
                )}
                Choose PDF
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadFile("cv", file);
                  }}
                />
              </label>
            </div>

            <div className="card-elevated rounded-2xl p-6">
              <h2 className="text-base font-semibold">Profile photo</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {settings?.photo_path ? "A photo is published." : "No photo uploaded yet."}
              </p>
              <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground transition-colors hover:border-primary/50">
                {uploading === "photo" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Upload className="size-4" />
                )}
                Choose image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadFile("photo", file);
                  }}
                />
              </label>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
