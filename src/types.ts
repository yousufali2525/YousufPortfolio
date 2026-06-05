export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: "Academic" | "Technical" | "Hobby" | "Creative";
  techStack: string[];
  features: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  githubUrl: string;
  liveUrl: string;
  imageSeed: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: "Frontend" | "Backend" | "Database" | "Tools";
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface AssignmentAnswers {
  semester: string;
  section: "A" | "B" | "C" | "D" | "E";
  studentId: string;
  fullName: string;
  email: string;
  githubRepo: string;
  liveLink: string;
  declarationConfirmed: boolean;
  profilePicture?: string;
  age?: string;
  department?: string;
}
