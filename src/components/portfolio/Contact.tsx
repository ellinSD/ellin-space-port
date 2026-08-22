import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { profile } from "@/lib/portfolio-content";
import { SectionHeading } from "./SectionHeading";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  message: z.string().trim().min(1, "Please write a message").max(1000, "Message is too long"),
});

const channels = [
  { icon: Phone, label: "Phone", value: profile.contact.phone, href: `tel:${profile.contact.phone}` },
  { icon: Mail, label: "Email", value: profile.contact.email, href: `mailto:${profile.contact.email}` },
  { icon: Github, label: "GitHub", value: "github.com/ellinSD", href: profile.contact.github },
  { icon: Linkedin, label: "LinkedIn", value: "Modinatul Ferdows Ellin", href: profile.contact.linkedin },
  { icon: MapPin, label: "Location", value: profile.contact.location, href: null },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    const { name, email, message } = parsed.data;
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.contact.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email app…");
  };

  return (
    <section id="contact" className="section-shell">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something together"
        description="Open to internships, collaborations and interesting problems to solve."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const content = (
              <div className="card-elevated flex items-center gap-4 rounded-2xl p-4">
                <span className="rounded-xl bg-accent p-2.5 text-primary">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {channel.label}
                  </p>
                  <p className="truncate text-sm">{channel.value}</p>
                </div>
              </div>
            );
            return channel.href ? (
              <a key={channel.label} href={channel.href} target="_blank" rel="noreferrer" className="block">
                {content}
              </a>
            ) : (
              <div key={channel.label}>{content}</div>
            );
          })}
        </div>

        <form onSubmit={onSubmit} className="card-elevated space-y-4 rounded-2xl p-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={5}
              maxLength={1000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your idea or opportunity…"
            />
          </div>
          <Button type="submit" className="w-full">
            <Send className="size-4" /> Send message
          </Button>
        </form>
      </div>
    </section>
  );
}
