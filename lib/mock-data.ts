export interface MockProject {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  tasksCount: number;
  completedTasks: number;
  teamMembers: number;
  createdAt: string;
}

export const mockProjects: MockProject[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern design",
    status: "active",
    tasksCount: 24,
    completedTasks: 12,
    teamMembers: 5,
    createdAt: "2024-11-01",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Build iOS and Android app for customer engagement",
    status: "active",
    tasksCount: 45,
    completedTasks: 18,
    teamMembers: 8,
    createdAt: "2024-10-15",
  },
  {
    id: "3",
    name: "Marketing Campaign Q4",
    description: "Launch comprehensive marketing campaign for Q4",
    status: "active",
    tasksCount: 18,
    completedTasks: 15,
    teamMembers: 4,
    createdAt: "2024-11-10",
  },
  {
    id: "4",
    name: "API Integration",
    description: "Integrate third-party APIs for payment processing",
    status: "completed",
    tasksCount: 12,
    completedTasks: 12,
    teamMembers: 3,
    createdAt: "2024-09-20",
  },
  {
    id: "5",
    name: "Database Migration",
    description: "Migrate from MySQL to PostgreSQL",
    status: "on-hold",
    tasksCount: 8,
    completedTasks: 3,
    teamMembers: 2,
    createdAt: "2024-10-01",
  },
];

export interface MockStats {
  totalProjects: number;
  activeTasks: number;
  completedTasks: number;
  teamMembers: number;
}

export const mockStats: MockStats = {
  totalProjects: 5,
  activeTasks: 87,
  completedTasks: 53,
  teamMembers: 12,
};
