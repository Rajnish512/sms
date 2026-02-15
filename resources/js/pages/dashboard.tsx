import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Users, Book, GraduationCap, BookOpen, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

const stats = [
  {
    label: "Students",
    icon: Users,
    key: "totalStudents",
    description : "Total number of students",
    color: "text-blue-500",
  },
  {
    label: "Teachers",
    icon: GraduationCap,
    key: "totalTeachers",
    description : "Total number of teachers",
    color: "text-green-500",
  },
  {
    label: "Courses",
    icon: Book,
    key: "totalCourses",
    description : "Total number of courses",
    color: "text-purple-500",
  },
  {
    label: "Enrollments",
    icon: ListChecks,
    key: "totalEnrollments",
    description : "Total number of enrollments",
    color: "text-pink-500",
  },
  {
label: "Subjects",
icon: BookOpen,
key: "totalSubjects",
description : "Total number of subjects",
color: "text-yellow-500",
  }
];

export default function Dashboard() {
  const pageProps = usePage<{ schoolName: string; totalStudents: number; totalTeachers: number; totalCourses: number; totalEnrollments: number; totalSubjects: number;}>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
        <div className="py-12 min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
            <div className="max-w-7x1 mx-auto msm:px-6 lg:px-8">
                <div className="mb-8">
                <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-primary drop-shadow-lg text-left">{pageProps.schoolName}</h1>
                <p className="text-lg text-secondary text-left">Welcome to the School Management System Dashboard</p>
                </div>
            </div>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {



            return (
              <Card key={stat.key} className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    <span>{stat.label}</span>
                  </CardTitle>
                  <CardDescription>{stat.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{String(pageProps[stat.key] ?? '')  }</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        </div>
    </AppLayout>
  );
}
