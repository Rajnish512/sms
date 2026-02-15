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

interface Enrollment {
  enrollment_id: number;
  tenant_is: number;
  student_id: number;
  course_id: number;
  enrollment_date: string;
}

interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
}
interface Course    {
  course_id: number;
  course_name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Enrollments",
    href: "/enrollments"
},
];

const emptyForm = {
  student_id: "",
  course_id: "",
  enrollment_date: "",
};

type FormState = typeof emptyForm & { id?: number };

export default function EnrollmentsIndex() {
  const { enrollments, students, course } = usePage<{ enrollments?: Enrollment[]; students?: Student[]; course?: Course[] }>().props;
  const enrollmentsList = enrollments ?? [];
  const studentList = students ?? [];
  const courseList = course ?? [];

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenAdd = () => {
    setIsEdit(false);
    setForm(emptyForm);
    setOpen(true);
  };

    const handleOpenEdit = (enrollment: Enrollment) => {
    setIsEdit(true);
    setForm({
      id: enrollment.enrollment_id,
      enrollment_date: enrollment.enrollment_date,
      student_id: String(enrollment.student_id),
      course_id: String(enrollment.course_id),
    });
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
        ...form,
        student_id: Number(form.student_id),
        course_id: Number(form.course_id),
    };
    if (isEdit && form.id) {
      router.put(`/enrollments/${form.id}`, payload);
    } else {
      router.post("/enrollments", payload);
    }
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this enrollment?")) {
      router.delete(`/enrollments/${id}`);
    };
    };

    const handleClose = () => {
      setOpen(false);
      setForm(emptyForm);
      setIsEdit(false);
    };

    const getStudentName = (student_id: number) => {
      const student = studentList.find(s => s.student_id === student_id);
      return student ? `${student.first_name} ${student.last_name}` : student_id;
    };
    const getCourseName = (course_id: number) => {
      const course = courseList.find(c => c.course_id === course_id);
      return course ? course.course_name : course_id;
    };

    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Enrollments</h2>
            <Button onClick={handleOpenAdd}>Add Enrollment</Button>
        </div>
            <table className="w-full"></table>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Enrollment ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Enrollment Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {enrollmentsList.map((enrollment) => (
                        <TableRow key={enrollment.enrollment_id}>
                            <TableCell>{enrollment.enrollment_id}</TableCell>

                            <TableCell>{getStudentName(enrollment.student_id)}</TableCell>
                            <TableCell>{getCourseName(enrollment.course_id)}</TableCell>
                            <TableCell>{enrollment.enrollment_date}</TableCell>
                            <TableCell><Button variant="outline" size="sm" onClick={() => handleOpenEdit(enrollment)}>Edit</Button>
                            <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete(enrollment.enrollment_id)}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Enrollment" : "Add Enrollment"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <Label htmlFor="student_id">Student</Label>
                            <select
                                id="student_id"
                                name="student_id"
                                value={form.student_id}
                                onChange={(e) => setForm((prev) => ({ ...prev, student_id: e.target.value }))}
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a teacher</option>
                                {studentList.map((student) => (
                                    <option key={student.student_id} value={student.student_id}>
                                        {student.first_name} {student.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="course_id">course</Label>
                            <select
                                id="course_id"
                                name="course_id"
                                value={form.course_id}
                                onChange={(e) => setForm((prev) => ({ ...prev, course_id: e.target.value }))}
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a course</option>
                                {courseList.map((course) => (
                                    <option key={course.course_id} value={course.course_id}>
                                        {course.course_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="enrollment_date">Enrollment Date</Label>
                            <Input
                                type ="date"
                                id="enrollment_date"
                                name="enrollment_date"
                                value={form.enrollment_date}
                                onChange={handleChange}
                                required
                            />
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
