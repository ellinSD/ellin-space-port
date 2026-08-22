import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/photo")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: settings } = await supabaseAdmin
          .from("site_settings")
          .select("photo_path")
          .eq("id", 1)
          .maybeSingle();

        const path = settings?.photo_path;
        if (!path) return new Response("No photo uploaded yet.", { status: 404 });

        const { data: file, error } = await supabaseAdmin.storage.from("portfolio").download(path);
        if (error || !file) return new Response("Photo not available.", { status: 404 });

        return new Response(await file.arrayBuffer(), {
          headers: {
            "content-type": file.type || "image/jpeg",
            "cache-control": "public, max-age=60",
          },
        });
      },
    },
  },
});
