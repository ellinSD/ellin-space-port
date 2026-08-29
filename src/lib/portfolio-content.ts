export const profile = {
  name: "Modinatul Ferdows Ellin",
  tagline: "ICT Student",
  intro:
    "I am a 3rd-year Information & Communication Engineering student at Bangladesh University of Professionals, passionate about technology and interested in software development, programming, databases, and web technologies. I am eager to learn new skills, explore innovative ideas, and gain practical experience in the field of technology.",
  bio: "Driven by curiosity and a passion for technology, with a strong interest in software development and problem-solving. Always focused on learning, improving technical skills, and turning ideas into practical solutions.",
  education: {
    degree: "B.Sc. in Information & Communication Engineering",
    institution: "Bangladesh University of Professionals (BUP), Dhaka",
    department: "Department of Information & Communication Technology",
    status: "3rd year — expected graduation 2027",
  },
  contact: {
    phone: "01819666307",
    email: "eillin832@gmail.com",
    github: "https://github.com/ellinSD",
    linkedin: "https://www.linkedin.com/in/modinatul-ferdows-ellin-427774421",
    location: "Mirpur 12, Dhaka, Bangladesh",
  },
} as const;

export const hobbies = [
  { label: "Traveling", icon: "Plane" },
  { label: "Reading books", icon: "BookOpen" },
  { label: "Photography", icon: "Camera" },
  { label: "Music", icon: "Music" },
  { label: "Movies", icon: "Clapperboard" },
  { label: "New technologies", icon: "Cpu" },
] as const;

export type SkillGroup = {
  title: string;
  icon: "Code2" | "Globe" | "Database";
  skills: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    icon: "Code2",
    skills: [
      { name: "C", level: 80 },
      { name: "C++", level: 75 },
      { name: "Java", level: 65 },
    ],
  },
  {
    title: "Web Development",
    icon: "Globe",
    skills: [
      { name: "HTML", level: 85 },
      { name: "CSS", level: 75 },
    ],
  },
  {
    title: "Databases & Tools",
    icon: "Database",
    skills: [
      { name: "MySQL", level: 70 },
      { name: "MATLAB", level: 60 },
      { name: "Operating Systems", level: 65 },
    ],
  },
];
