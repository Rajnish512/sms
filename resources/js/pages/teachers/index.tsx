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

interface Teacher {
  teacher_id: number;
  tenant_is: number;
  first_name: string;
  last_name: string;
  subject: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Teachers",
    href: "/teachers"
},
];

const emptyForm = {
  first_name: "",
  last_name: "",
  subject: "",
};

type FormState = typeof emptyForm & { id?: number };

export default function TeachersIndex() {
  const { teachers } = usePage<{ teachers?: Teacher[] }>().props;
  const teachersList = teachers ?? [];

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenAdd = () => {
    setIsEdit(false);
    setForm(emptyForm);
    setOpen(true);
  };

    const handleOpenEdit = (teacher: Teacher) => {
    setIsEdit(true);
    setForm({
      id: teacher.teacher_id,
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      subject: teacher.subject,
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
      router.put(`/teachers/${form.id}`, form);
    } else {
      router.post("/teachers", form);
    }
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      router.delete(`/teachers/${id}`);
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
            <h2 className="text-2xl font-semibold">Teachers</h2>
            <Button onClick={handleOpenAdd}>Add Teacher</Button>
        </div>
            <table className="w-full"></table>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Teacher ID</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teachersList.map((teacher) => (
                        <TableRow key={teacher.teacher_id}>
                            <TableCell>{teacher.teacher_id}</TableCell>
                            <TableCell>{teacher.first_name}</TableCell>
                            <TableCell>{teacher.last_name}</TableCell>
                            <TableCell>{teacher.subject}</TableCell>
                            <TableCell><Button variant="outline" size="sm" onClick={() => handleOpenEdit(teacher)}>Edit</Button>
                            <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete(teacher.teacher_id)}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Teacher" : "Add Teacher"}</DialogTitle>
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
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                name="subject"
                                value={form.subject}
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
