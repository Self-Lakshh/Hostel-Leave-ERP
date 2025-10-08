import { Plus, Building2, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Warden {
  id: string;
  name: string;
  email: string;
  phone: string;
  hostel: string;
}

const mockWardens: Warden[] = [
  { id: "1", name: "Dr. Amit Shah", email: "amit.shah@spsu.edu", phone: "+91 98765 00001", hostel: "Block A" },
  { id: "2", name: "Prof. Meera Joshi", email: "meera.joshi@spsu.edu", phone: "+91 98765 00002", hostel: "Block B" },
  { id: "3", name: "Dr. Ramesh Gupta", email: "ramesh.gupta@spsu.edu", phone: "+91 98765 00003", hostel: "Block C" },
];

const Wardens = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Manage Wardens</h1>
          <p className="text-muted-foreground">Oversee warden assignments and details</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Warden
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWardens.map((warden) => (
          <div key={warden.id} className="glass-card glass-hover p-6 rounded-lg">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4">
                <span className="text-primary text-xl font-semibold">
                  {warden.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-1">{warden.name}</h3>
              <div className="flex items-center gap-2 text-sm text-primary">
                <Building2 className="w-4 h-4" />
                <span>{warden.hostel}</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{warden.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{warden.phone}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1">
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wardens;
