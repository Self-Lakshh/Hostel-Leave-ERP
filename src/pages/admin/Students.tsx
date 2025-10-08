import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

interface Student {
  id: string;
  name: string;
  enrollNumber: string;
  hostel: string;
  room: string;
  status: "in" | "out";
  phone: string;
}

const mockStudents: Student[] = [
  { id: "1", name: "Raj Patel", enrollNumber: "CS21001", hostel: "Block A", room: "A-201", status: "in", phone: "+91 98765 43210" },
  { id: "2", name: "Priya Sharma", enrollNumber: "CS21045", hostel: "Block B", room: "B-105", status: "out", phone: "+91 98765 43211" },
  { id: "3", name: "Arjun Kumar", enrollNumber: "ME21023", hostel: "Block A", room: "A-304", status: "in", phone: "+91 98765 43212" },
  { id: "4", name: "Sneha Desai", enrollNumber: "EC21067", hostel: "Block C", room: "C-201", status: "in", phone: "+91 98765 43213" },
];

const Students = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.enrollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Manage Students</h1>
          <p className="text-muted-foreground">View and manage all student records</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Search */}
      <div className="glass-card p-6 rounded-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or enrollment number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            fullWidth
          />
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="glass-card glass-hover p-6 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {student.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.enrollNumber}</p>
                </div>
              </div>
              <Badge variant={student.status === "in" ? "success" : "warning"}>
                {student.status === "in" ? "In Hostel" : "Out"}
              </Badge>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hostel:</span>
                <span className="font-medium">{student.hostel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room:</span>
                <span className="font-medium">{student.room}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{student.phone}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
