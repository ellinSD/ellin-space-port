import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/cv")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: settings } = await supabaseAdmin
          .from("site_settings")
          .select("cv_path")
          .eq("id", 1)
          .maybeSingle();

        const path = settings?.cv_path;
        if (!path) return new Response("No CV uploaded yet.", { status: 404 });

        const { data: file, error } = await supabaseAdmin.storage.from("portfolio").download(path);
        if (error || !file) return new Response("CV not available.", { status: 404 });

        return new Response(await file.arrayBuffer(), {
          headers: {
            "content-type": file.type || "application/pdf",
            "content-disposition": 'inline; filename="Modinatul-Ferdows-Ellin-CV.pdf"',
            "cache-control": "public, max-age=60",
          },
        });
      },
    },
  },
});
