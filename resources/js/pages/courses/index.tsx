import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { usePage, router } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Course {
  course_id: number;
  tenant_is: number;
  course_name: string;
  teacher_id: string;
}

interface Teacher {
  teacher_id: string;
  first_name: string;
  last_name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Courses",
    href: "/courses"
},
];

const emptyForm = {
  course_name: "",
  teacher_id: "",
};

type FormState = typeof emptyForm & { id?: number };

export default function CoursesIndex() {
  const { courses, teachers } = usePage<{ courses?: Course[]; teachers?: Teacher[] }>().props;
  const coursesList = courses ?? [];
  const teacherList = teachers ?? [];

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenAdd = () => {
    setIsEdit(false);
    setForm(emptyForm);
    setOpen(true);
  };

    const handleOpenEdit = (course: Course) => {
    setIsEdit(true);
    setForm({
      id: course.course_id,
      course_name: course.course_name,
      teacher_id: course.teacher_id,
    });
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && form.id) {
      router.put(`/courses/${form.id}`, form);
    } else {
      router.post("/courses", form);
    }
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      router.delete(`/courses/${id}`);
    };
    };

    const handleClose = () => {
      setOpen(false);
      setForm(emptyForm);
      setIsEdit(false);
    };

    const getTeacherName = (teacherId: string) => {
      const teacher = teacherList.find(t => t.teacher_id === teacherId);
      return teacher ? `${teacher.first_name} ${teacher.last_name}` : "Unknown Teacher";
    };

    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Courses</h2>
            <Button onClick={handleOpenAdd}>Add Course</Button>
        </div>
            <table className="w-full"></table>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Course ID</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {coursesList.map((course) => (
                        <TableRow key={course.course_id}>
                            <TableCell>{course.course_id}</TableCell>
                            <TableCell>{course.course_name}</TableCell>
                            <TableCell>{getTeacherName(course.teacher_id)}</TableCell>
                            <TableCell><Button variant="outline" size="sm" onClick={() => handleOpenEdit(course)}>Edit</Button>
                            <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete(course.course_id)}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Course" : "Add Course"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="course_name">First Name</Label>
                            <Input
                                id="course_name"
                                name="course_name"
                                value={form.course_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="teacher_id">Last Name</Label>
                            <select
                                id="teacher_id"
                                name="teacher_id"
                                value={form.teacher_id}
                                onChange={(e) => setForm((prev) => ({ ...prev, teacher_id: e.target.value }))}
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a teacher</option>
                                {teacherList.map((teacher) => (
                                    <option key={teacher.teacher_id} value={teacher.teacher_id}>
                                        {teacher.first_name} {teacher.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

        </Card>
      </AppLayout>
    );

};
