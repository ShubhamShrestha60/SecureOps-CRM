import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import SecurityPortal from './components/SecurityPortal';
import { getSecurityStats } from './api';
import { Layout, Users, Shield, BarChart3, Settings as SettingsIcon, LogOut, Bell, Search, Terminal, Activity } from 'lucide-react';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [stats, setStats] = useState({
    total_contacts: '---',
    active_leads: '---',
    total_security_events: '---',
    recent_security_events: '---'
  });

  useEffect(() => {
    fetchStats();
  }, [refreshKey]);

  const fetchStats = async () => {
    try {
      const response = await getSecurityStats();
      // axios interceptor returns response.data which is {status, message, data}
      setStats(response.data);
    } catch (error) {
      console.error('Failed to sync tactical stats');
    }
  };

  const handleAdd = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleSave = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex text-slate-700 font-sans selection:bg-brand-100 selection:text-brand-900">
      <Toaster position="top-right" richColors closeButton />

      {/* Sidebar - Pro Design */}
      <aside className="w-72 bg-slate-900 text-slate-400 hidden lg:flex flex-col border-r border-slate-800/50 shadow-2xl z-20">
        <div className="p-8 pb-10 flex items-center gap-4">
          <div className="bg-gradient-to-tr from-brand-600 to-brand-400 p-2.5 rounded-2xl shadow-lg shadow-brand-500/20 text-white">
            <Shield size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight font-display">SecureOps</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Business CRM</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          <div className="text-[10px] font-bold text-slate-500 px-4 mb-2 uppercase tracking-widest">General</div>
          <button
            onClick={() => setShowSecurity(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all border group ${!showSecurity ? 'bg-brand-600/10 text-brand-400 border-brand-600/20' : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-200 border-transparent'}`}
          >
            <Layout size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-sm">Overview</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800/50 hover:text-slate-200 rounded-xl transition-all group border border-transparent">
            <Users size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm">Customers</span>
          </button>

          <button
            onClick={() => setShowSecurity(true)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all border group ${showSecurity ? 'bg-indigo-600/10 text-indigo-400 border-indigo-600/20' : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-200 border-transparent'}`}
          >
            <Terminal size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm">Security Portal</span>
          </button>

          <div className="text-[10px] font-bold text-slate-500 px-4 mt-8 mb-2 uppercase tracking-widest">Infrastructure</div>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800/50 hover:text-slate-200 rounded-xl transition-all group border border-transparent">
            <SettingsIcon size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm">Settings</span>
          </button>
        </nav>

        <div className="p-6 border-t border-slate-800/50">
          <button className="flex items-center justify-between w-full px-4 py-3 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all group group">
            <div className="flex items-center gap-3">
              <LogOut size={18} />
              <span className="font-medium text-sm">Sign Out</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-100/30 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none z-0"></div>

        {/* Global Header - Glassmorphism */}
        <header className="h-20 shrink-0 flex items-center justify-between px-10 glass sticky top-0 z-30 border-b border-slate-200/60 shadow-sm shadow-slate-100/50">
          <div className="flex items-center gap-10 flex-1">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight font-display">Dashboard</h2>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-tighter">Secure Node: Local-Master-01</p>
            </div>

            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Scan records..."
                className="w-full bg-slate-100/50 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-500/10 placeholder:text-slate-400 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowSecurity(!showSecurity)}
              className={`relative p-2.5 rounded-full transition-all ${showSecurity ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100/80'}`}
            >
              <Activity size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200/80 hidden sm:block"></div>
            <div className="flex items-center gap-3 group cursor-pointer pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors">Admin User</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 p-[2px] shadow-lg shadow-brand-500/10 transition-transform group-hover:scale-105">
                <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center text-brand-600 font-bold font-display overflow-hidden text-xs">
                  <img src="https://ui-avatars.com/api/?name=Admin+User&background=fff&color=3754fb" alt="AVA" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Canvas */}
        <div className="flex-1 overflow-y-auto p-10 relative z-10 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">

            {/* Tactical Intelligence Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Network Reach', value: stats.total_contacts, sub: 'Total Authorized', color: 'brand', icon: Users },
                { label: 'Active Leads', value: stats.active_leads, sub: 'Priority Targets', color: 'emerald', icon: BarChart3 },
                { label: 'Security Events', value: stats.total_security_events, sub: 'Total Audit Logs', color: 'indigo', icon: Shield },
                { label: '24h Anomalies', value: stats.recent_security_events, sub: 'Verified activities', color: 'amber', icon: Activity },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-200/80 shadow-sm flex flex-col gap-4 group hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-300 relative overflow-hidden">
                  <div className="flex justify-between items-start relative z-10">
                    <div className={`p-3 rounded-2xl ${stat.color === 'brand' ? 'bg-brand-50 text-brand-600' :
                      stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                        stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                          'bg-amber-50 text-amber-600'
                      }`}>
                      <stat.icon size={18} />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black text-slate-900 font-display tracking-tight">{stat.value}</h3>
                    <div className="flex flex-col mt-0.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                      <span className="text-[9px] font-bold text-slate-400 opacity-60 italic">{stat.sub}</span>
                    </div>
                  </div>
                  <div className={`absolute bottom-0 right-0 w-24 h-24 -mb-12 -mr-12 bg-${stat.color === 'brand' ? 'brand' : stat.color === 'emerald' ? 'emerald' : stat.color === 'indigo' ? 'indigo' : 'amber'}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
                </div>
              ))}
            </div>

            {/* Main Application Interface */}
            <section className="animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both">
              <ContactList key={refreshKey} onAdd={handleAdd} onEdit={handleEdit} onRefresh={handleSave} />
            </section>
          </div>
        </div>
      </main>

      {/* Security Intel Side Panel */}
      {showSecurity && (
        <SecurityPortal onClose={() => setShowSecurity(false)} />
      )}

      {/* Modals - Ultra Professional */}
      {showForm && (
        <ContactForm
          contact={editingContact}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default App;
