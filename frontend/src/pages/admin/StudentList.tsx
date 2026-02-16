import { useStudents, useCreateStudent } from "@/hooks/use-students";
import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertStudentSchema, type InsertStudent } from "@shared/schema";

export default function StudentList() {
  const { data: students, isLoading } = useStudents();
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const createStudent = useCreateStudent();

  const form = useForm<InsertStudent>({
    resolver: zodResolver(insertStudentSchema),
    defaultValues: {
      name: "",
      class: "LKG A",
      rollNo: 1,
      parentName: "",
      parentPhone: "",
    }
  });

  const onSubmit = async (data: InsertStudent) => {
    await createStudent.mutateAsync(data);
    setIsDialogOpen(false);
    form.reset();
  };

  const filteredStudents = students?.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.class.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Students</h1>
          <p className="text-muted-foreground">Manage student records</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6">
              <Plus className="w-5 h-5 mr-2" /> Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Student Name</Label>
                <Input {...form.register("name")} placeholder="e.g. Aarav Kumar" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Class</Label>
                  <select 
                    {...form.register("class")} 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="LKG A">LKG A</option>
                    <option value="LKG B">LKG B</option>
                    <option value="UKG A">UKG A</option>
                    <option value="UKG B">UKG B</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Roll No</Label>
                  <Input 
                    type="number" 
                    {...form.register("rollNo", { valueAsNumber: true })} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Parent Name</Label>
                <Input {...form.register("parentName")} placeholder="Father/Mother name" />
              </div>
              <div className="space-y-2">
                <Label>Parent Phone</Label>
                <Input {...form.register("parentPhone")} placeholder="+91 9876543210" />
              </div>
              <Button type="submit" className="w-full" disabled={createStudent.isPending}>
                {createStudent.isPending ? "Adding..." : "Add Student"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search students..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 border-none bg-gray-50"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading students...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Class</th>
                  <th className="px-6 py-4">Roll No</th>
                  <th className="px-6 py-4">Parent</th>
                  <th className="px-6 py-4">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredStudents?.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {student.class}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">#{student.rollNo}</td>
                    <td className="px-6 py-4 text-gray-500">{student.parentName}</td>
                    <td className="px-6 py-4 text-gray-500 font-mono">{student.parentPhone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
