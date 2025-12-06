import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStats } from "@/lib/mock-data";
import { CheckCircle2, FolderKanban, ListTodo, LucideIcon, Users } from "lucide-react";

interface Stat {
  title: string;
  icon: LucideIcon;
  change: string;
  value: number;
}

export default function DashboardPage() {
  const stats: Stat[] = [
    {
      title: "Total Projects",
      icon: FolderKanban,
      change: "+12%",
      value: mockStats.totalProjects,
    },
    {
      title: "Active Tasks",
      icon: ListTodo,
      change: "+8%",
      value: mockStats.activeTasks,
    },
    {
      title: "Completed Tasks",
      icon: CheckCircle2,
      change: "+3%",
      value: mockStats.completedTasks,
    },
    {
      title: "Team Members",
      icon: Users,
      change: "+16%",
      value: mockStats.teamMembers,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
