"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Users, FileText, ShieldAlert, Plus, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import TeamWorkspace from "./TeamWorkspace";
import SocialIntegrations from "./SocialIntegrations";

export default function AdministrationModule() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [activeTab, setActiveTab] = useState<'users' | 'audit'>('users');
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loadingAudit, setLoadingAudit] = useState(false);

  const loadAuditLogs = async () => {
    try {
      setLoadingAudit(true);
      const res = await fetch('/api/wms/audit-logs', {
        headers: { 'x-user-role': user?.role || 'STAFF' }
      });
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data);
      }
    } catch (e) {
      console.error("Failed to load audit logs", e);
    } finally {
      setLoadingAudit(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'audit' && isAdmin) {
      loadAuditLogs();
    }
  }, [activeTab, isAdmin]);

  if (!isAdmin) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm text-center">
        <ShieldAlert className="w-12 h-12 text-[#F59E0B] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#0F172A] mb-1">Admin Access Required</h3>
        <p className="text-xs text-[#64748B]">System administration, operator management, and audit logs are restricted to Admin personnel.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-left space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
            System Admin & User Roles <ShieldCheck className="w-5 h-5 text-[#0077C8]" />
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">Manage team members, operator roles (RBAC), integrations & review system audit logs.</p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-[#E2E8F0] pb-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'users' ? 'bg-[#0F172A] text-white' : 'bg-[#F8FAFC] text-[#64748B]'
          }`}
        >
          <Users className="w-3.5 h-3.5" /> User Roles & Team
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'audit' ? 'bg-[#0F172A] text-white' : 'bg-[#F8FAFC] text-[#64748B]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> System Audit Logs
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="space-y-6">
          <TeamWorkspace />
          <SocialIntegrations />
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider">
                <th className="p-3">Timestamp</th>
                <th className="p-3">User & Role</th>
                <th className="p-3">Action</th>
                <th className="p-3">Category</th>
                <th className="p-3">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {loadingAudit ? (
                <tr><td colSpan={5} className="p-6 text-center text-[#64748B]">Loading audit log ledger...</td></tr>
              ) : auditLogs.length === 0 ? (
                <tr><td colSpan={5} className="p-6 text-center text-[#64748B]">No audit events logged yet.</td></tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#F8FAFC]">
                    <td className="p-3 text-[#64748B] font-mono">{new Date(log.createdAt).toLocaleString()}</td>
                    <td className="p-3 font-bold text-[#0F172A]">
                      {log.user} <span className="text-[9px] font-bold text-[#0077C8] bg-[#0077C8]/10 px-1.5 py-0.5 rounded ml-1">{log.role}</span>
                    </td>
                    <td className="p-3 font-extrabold text-[#0077C8]">{log.action}</td>
                    <td className="p-3 text-[#64748B] font-semibold">{log.category}</td>
                    <td className="p-3 text-[#0F172A]">{log.details}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
