import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    const check = async (uid: string | null) => {
      if (!uid) {
        if (active) setIsAdmin(false);
        return;
      }
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      if (active) setIsAdmin(Boolean(data?.some((r) => r.role === "admin")));
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const uid = session?.user?.id ?? null;
      setTimeout(() => void check(uid), 0);
    });

    supabase.auth.getSession().then(({ data }) => void check(data.session?.user?.id ?? null));

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return isAdmin;
}
