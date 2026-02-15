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

interface Student {
  student_id: number;
  tenant_is: number;
  first_name: string;
  last_name: string;
  grade: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Students",
    href: "/students"
},
];

const emptyForm = {
  first_name: "",
  last_name: "",
  grade: "",
};

type FormState = typeof emptyForm & { id?: number };

export default function StudentsIndex() {
  const { students } = usePage<{ students?: Student[] }>().props;
  const studentsList = students ?? [];

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenAdd = () => {
    setIsEdit(false);
    setForm(emptyForm);
    setOpen(true);
  };

    const handleOpenEdit = (student: Student) => {
    setIsEdit(true);
    setForm({
      id: student.student_id,
      first_name: student.first_name,
      last_name: student.last_name,
      grade: student.grade,
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
      router.put(`/students/${form.id}`, form);
    } else {
      router.post("/students", form);
    }
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this student?")) {
      router.delete(`/students/${id}`);
    };
    };

    const handleClose = () => {
      setOpen(false);
      setForm(emptyForm);
      setIsEdit(false);
    };

    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Students</h2>
            <Button onClick={handleOpenAdd}>Add Student</Button>
        </div>
            <table className="w-full"></table>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {studentsList.map((student) => (
                        <TableRow key={student.student_id}>
                            <TableCell>{student.student_id}</TableCell>
                            <TableCell>{student.first_name}</TableCell>
                            <TableCell>{student.last_name}</TableCell>
                            <TableCell>{student.grade}</TableCell>
                            <TableCell><Button variant="outline" size="sm" onClick={() => handleOpenEdit(student)}>Edit</Button>
                            <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete(student.student_id)}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Student" : "Add Student"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                name="last_name"
                                value={form.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="grade">Grade</Label>
                            <Input
                                id="grade"
                                name="grade"
                                value={form.grade}
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
