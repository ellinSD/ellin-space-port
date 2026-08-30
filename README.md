# Ellin's Digital Hub

<portfolio_prompt>

Introduction
Design a modern, clean, tech-forward portfolio website for Modinatul Ferdows Ellin, a 3rd-year B.Sc. student in Information & Communication Engineering at Bangladesh University of Professionals (BUP), Dhaka (expected graduation 2028). She is passionate about technology, software development, and problem-solving, with growing skills in programming, databases, and web technologies. The site should feel professional yet approachable — the digital home of an ambitious, curious young engineer early in her career, built to grow with her as she adds projects and achievements over time. Use her uploaded profile photo (a warm, professional portrait) prominently in the Home/Hero and About sections.

Site Structure & Sections

Home / Hero
Profile picture, full name, and a short tagline (e.g., "ICT Student | Aspiring Software Developer | Problem Solver")
Brief 1–2 line intro pulled from her bio
Call-to-action buttons: "View Projects," "Download CV," "Contact Me"
About
Full bio: ICT student driven by curiosity, continuous learning, and using technology to create practical solutions; skilled in programming, networking, databases, and web technologies
Education: B.Sc. in Information & Communication Engineering, BUP — Dept. of ICT, 3rd year, expected graduation 2028
Hobbies/interests: traveling, reading books, photography, listening to music, watching movies, exploring new technologies — presented as small icon-based tags for personality
Skills
Grouped into categories with visual skill bars or icon badges:
Programming: C, C++, Java
Web Development: HTML, CSS
Database/Tools: MySQL, MATLAB, Operating Systems
Projects
A dynamic, card-based gallery (empty/template-ready initially) where each project card shows title, short description, tech stack, and a GitHub link (linked to https://github.com/ellinSD)
Designed so new project cards can be added easily later through the admin panel — this is the section she'll grow the most over time, so build it as a flexible, repeatable component
Achievements
A simple, editable list/timeline (certificates, awards, competition results, etc.) — empty/placeholder initially, updatable by her via the admin panel
CV / Resume
A dedicated section or page showing her CV (PDF), with a "Download CV" button visible to all visitors
Only she can upload/replace the CV file (via admin panel)
Contact
Phone: 01819666307
Email: eillin832@gmail.com
GitHub: https://github.com/ellinSD
LinkedIn: https://www.linkedin.com/in/modinatul-ferdows-ellin-427774421
Location: Mirpur 12, Dhaka
Include a simple contact form plus clickable icons for each platform
Admin Panel (Private/Restricted Access)
A secure login (username/password authentication) accessible only to Ellin
Once logged in, she can:
Upload/replace her CV file
Add, edit, or remove Projects (with GitHub links)
Add or update Achievements
Public visitors should NOT see any admin/login UI on the main site — keep it hidden (e.g., a non-linked /admin route) and only she can access edit functionality; everyone else has view-only + CV download access

Design Direction

Style: Modern, minimal, tech-inspired — since no specific color preference was given, use a clean palette that suits an ICT/engineering profile: e.g., deep navy/charcoal or soft neutral background with a single accent color (electric blue, teal, or emerald) for buttons/highlights — professional and easy to extend later
Typography: Clean sans-serif fonts (e.g., Inter, Poppins) for a contemporary, readable feel
Layout: Card-based, generous white space, smooth scroll and subtle hover/transition animations
Responsiveness: Fully mobile-responsive, since it will likely be shared via LinkedIn/GitHub on mobile too
Icons: Use consistent icon sets (e.g., Lucide/Font Awesome) for skills, hobbies, and contact links
Special requirement: Build the Projects and Achievements sections as reusable, easily-updatable components tied to the admin panel, so the site can scale naturally as she completes more work during her degree

</portfolio_prompt>

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ellin-space-port.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9beeb894-e370-4a32-8bbc-11d8ea6ad896).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
