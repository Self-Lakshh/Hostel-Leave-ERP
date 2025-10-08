import { IdCard, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface SecurityStaff {
    _id?: string;
    security_guard_id: string;
    emp_id: string;
    name: string;
    phone_no: string;
    email?: string;
    active?: boolean;
    created_by?: string;
    language_preference?: string;
    created_at?: string;
    updated_at?: string;
    __v?: number;
}

export default function SecurityCard({
    staff,
    onEdit,
    onRemove,
}: {
    staff: SecurityStaff;
    onEdit?: (empId: string) => void;
    onRemove?: (empId: string) => void;
}) {
    return (
        <div className="glass-card glass-hover p-6 rounded-lg relative">
            <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${staff.active ? 'bg-emerald-500' : 'bg-slate-400'}`} aria-hidden />
                <span className="text-xs font-medium text-muted-foreground">{staff.security_guard_id}</span>
            </div>

            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30  flex items-center justify-center">
                        <span className="text-primary font-semibold">{(staff.name || '').split(' ').map((n) => n[0]).join('')}</span>
                    </div>
                    <div>
                        <h3 className="font-semibold">{staff.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <IdCard className="w-3 h-3" />
                            <span>{staff.emp_id}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{staff.phone_no}</span>
                </div>
                {staff.email && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span>{staff.email}</span>
                    </div>
                )}

                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-0" onClick={() => onEdit?.(staff.emp_id)}>
                        Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onRemove?.(staff.emp_id)}>
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
}
