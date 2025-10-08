import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import SecurityCard from '@/components/custom/SecurityCard';
import type { SecurityStaff } from '@/components/custom/SecurityCard';
import { getAllSecurityGuards, updateSecurityGuard } from '@/api/apiService';
import { useToast } from '@/components/ui/Toast';
import { DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/Input';

const Security: React.FC = () => {
  const [guards, setGuards] = useState<SecurityStaff[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const [selected, setSelected] = useState<SecurityStaff | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getAllSecurityGuards();
        // API may return { data: [...] } or an array directly depending on server
        const list: any[] = Array.isArray(data) ? data : data?.data ?? data?.guards ?? [];
        if (mounted) setGuards(list as SecurityStaff[]);
      } catch (err: any) {
        console.error('Failed to load security guards', err);
        addToast({ title: 'Error', description: err?.message ?? 'Failed to load guards', type: 'error' });
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [addToast]);

  const handleEdit = (empId: string) => {
    const g = guards.find((x) => x.emp_id === empId) ?? null;
    setSelected(g);
  };

  const handleRemove = async (empId: string) => {
    // soft-delete by setting active=false
    setSaving(true);
    try {
      await updateSecurityGuard(empId, { active: false });
      addToast({ title: 'Removed', description: 'Guard disabled', type: 'success' });
      // refresh
      const data = await getAllSecurityGuards();
      const list: any[] = Array.isArray(data) ? data : data?.data ?? data?.guards ?? [];
      setGuards(list as SecurityStaff[]);
    } catch (err: any) {
      console.error(err);
      addToast({ title: 'Error', description: err?.message ?? 'Failed to remove guard', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (payload: Partial<SecurityStaff>) => {
    if (!selected) return;
    setSaving(true);
    try {
      await updateSecurityGuard(selected.emp_id, payload);
      addToast({ title: 'Saved', description: 'Guard updated', type: 'success' });
      // refresh
      const data = await getAllSecurityGuards();
      const list: any[] = Array.isArray(data) ? data : data?.data ?? data?.guards ?? [];
      setGuards(list as SecurityStaff[]);
      setSelected(null);
    } catch (err: any) {
      console.error(err);
      addToast({ title: 'Error', description: err?.message ?? 'Failed to save guard', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Security Personnel</h1>
          <p className="text-muted-foreground">Manage security staff across all hostels</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Security
        </Button>
      </div>

      {loading ? (
        <div className="text-muted-foreground">Loading security guards...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guards.map((s) => (
            <SecurityCard key={s.security_guard_id} staff={s} onEdit={handleEdit} onRemove={handleRemove} />
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      {selected && (
        <DialogContent isOpen={true} onClose={() => setSelected(null)} size="md">
          <DialogHeader>
            <DialogTitle>Edit Security Guard</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input value={selected.name} onChange={(e) => setSelected({ ...selected, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" value={selected.email ?? ''} onChange={(e) => setSelected({ ...selected, email: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input value={selected.phone_no} onChange={(e) => setSelected({ ...selected, phone_no: e.target.value })} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>Cancel</Button>
            <Button onClick={() => handleSave({ name: selected.name, email: selected.email, phone_no: selected.phone_no })} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </div>
  );
};

export default Security;
