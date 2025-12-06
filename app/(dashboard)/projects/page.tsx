import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockProjects } from "@/lib/mock-data";
import { capitalize, cn } from "@/lib/utils";
import { ClipboardList, Plus, Users } from "lucide-react";

export default function ProjectsPage() {
  const getProgressVariant = (percent: number) => {
    if (percent === 100) return "complete";
    if (percent >= 70) return "high";
    return "default";
  };

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl font-semibold">Projects</h2>
        <Button>
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockProjects.map((project) => {
          const completePercentage = Math.floor(
            (project.completedTasks / project.tasksCount) * 100
          );
          const projectStatus = capitalize(project.status);

          return (
            <Card
              key={project.id}
              className={cn(
                "hover:border-primary transition-colors cursor-pointer",
                project.status === "on-hold" && "opacity-75"
              )}
            >
              <CardHeader>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <Badge variant={project.status}>{projectStatus}</Badge>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-1">
                  <p className="text-muted-foreground">Progress</p>
                  <p className="font-semibold">{completePercentage}%</p>
                </div>
                <Progress
                  value={completePercentage}
                  variant={getProgressVariant(completePercentage)}
                />
              </CardContent>
              <CardFooter className="justify-between text-xs text-muted-foreground">
                <div className="flex gap-1">
                  <ClipboardList className="w-4 h-4" />
                  {project.completedTasks} / {project.tasksCount} tasks
                </div>
                <div className="flex gap-1">
                  <Users className="w-4 h-4" /> {project.teamMembers}{" "}
                  {project.teamMembers === 1 ? "member" : "members"}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
