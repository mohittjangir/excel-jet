"use client";

import { useEffect, useState } from "react";
import { Users, UserPlus, ShieldCheck, Mail, ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function TeamWorkspace() {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"ADMIN" | "STAFF">("STAFF");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isAdmin = user?.role === 'ADMIN';

  const loadUsers = async () => {
    try {
      const res = await fetch('/api/wms/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (e) {
      console.error("Failed to load users", e);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch('/api/wms/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-role': user?.role || 'STAFF'
        },
        body: JSON.stringify({ name, email, role }),
      });

      if (res.ok) {
        setMessage("Operator added successfully!");
        setName("");
        setEmail("");
        setShowForm(false);
        loadUsers();
      } else {
        const err = await res.json();
        setMessage(err.error || "Failed to add operator");
      }
    } catch (e: any) {
      setMessage(e.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm text-center">
        <ShieldAlert className="w-12 h-12 text-[#F59E0B] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#0F172A] mb-1">Admin Access Required</h3>
        <p className="text-xs text-[#64748B] max-w-md mx-auto">
          User & Operator Management is restricted to Admin personnel. Staff members have floor execution privileges only.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
            Excel Jet Team & User Roles <Users className="w-5 h-5 text-[#0077C8]" />
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">Manage operator roles (Admin / Staff) & permissions.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg bg-[#0077C8] hover:bg-[#0066B0] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
        >
          <UserPlus className="w-4 h-4" /> {showForm ? "Cancel" : "Add Operator"}
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-[#0077C8]/10 border border-[#0077C8]/30 rounded-lg text-xs font-bold text-[#0077C8]">
          {message}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleAddUser} className="mb-6 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">New Warehouse Operator</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required
              className="p-2.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
              className="p-2.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
            />
            <select 
              value={role} 
              onChange={e => setRole(e.target.value as any)}
              className="p-2.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
            >
              <option value="STAFF">STAFF (Floor Operations)</option>
              <option value="ADMIN">ADMIN (Full Control)</option>
            </select>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="px-5 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
          >
            {loading ? "Saving..." : "Save Operator"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {users.map((m) => (
          <div 
            key={m.id} 
            className="flex items-center justify-between p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F172A] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                {m.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#0F172A]">{m.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${m.role === 'ADMIN' ? 'text-[#0077C8]' : 'text-[#64748B]'}`}>
                    {m.role}
                  </span>
                  <span className="text-[9px] font-semibold text-[#16A34A] bg-[#16A34A]/10 px-1.5 py-0.5 rounded">
                    {m.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
              <Mail className="w-4 h-4 text-[#0077C8]" /> {m.email}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-[#0077C8]/10 border border-[#0077C8]/20 text-left">
          <ShieldCheck className="w-5 h-5 text-[#0077C8] shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-[#0F172A]">Role-Based Access Control (RBAC) enforces strict backend validation on Stock In, Stock Out, and Product Editing.</p>
        </div>
      </div>
    </div>
  );
}
