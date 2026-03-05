import React, { useEffect, useState } from 'react';
import { getContacts, deleteContact } from '../api';
import { Edit2, Trash2, Plus, Search, Mail, Phone, Building2, User } from 'lucide-react';
import { toast } from 'sonner';

const ContactList = ({ onEdit, onAdd, onRefresh }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const response = await getContacts();
            // axios interceptor now returns the response.data object which is {status, message, data}
            // and for index it's ContactResource::collection, so response.data is the array
            setContacts(response.data || []);
        } catch (error) {
            toast.error('Network Error: Could not connect to the security cluster');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this entity from the records?')) {
            try {
                await deleteContact(id);
                setContacts(contacts.filter(c => c.id !== id));
                toast.success('Entity purged successfully');
                if (onRefresh) onRefresh();
            } catch (error) {
                toast.error('Operation failed: Access denied or record protected');
            }
        }
    };

    const filteredContacts = Array.isArray(contacts) ? contacts.filter(contact => {
        const nameMatch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
        const emailMatch = contact.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const companyMatch = contact.company?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSearch = nameMatch || emailMatch || companyMatch;
        const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;

        return matchesSearch && matchesStatus;
    }) : [];

    return (
        <div className="space-y-8">
            {/* Control Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 glass p-2 rounded-[28px] border border-white shadow-xl shadow-brand-500/5">
                <div className="flex flex-col md:flex-row items-center gap-3 flex-1 px-4 py-2">
                    <div className="relative flex-1 w-full group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors" size={18} strokeWidth={2.5} />
                        <input
                            type="text"
                            placeholder="Filter by name, email or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-100/50 hover:bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-400 transition-all outline-none font-medium"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="h-10 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-slate-100/50 hover:bg-slate-100 border-none rounded-2xl py-3 px-6 text-sm focus:ring-4 focus:ring-brand-500/10 transition-all cursor-pointer font-bold text-slate-600 outline-none w-full md:w-40 appearance-none text-center"
                        >
                            <option value="all">All Status</option>
                            <option value="lead">Lead</option>
                            <option value="customer">Customer</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={onAdd}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-[22px] flex items-center justify-center gap-3 font-black text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-brand-500/30 group whitespace-nowrap"
                >
                    <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-500" />
                    Create Contact
                </button>
            </div>

            {/* Modern Table Container */}
            <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden relative group/table mt-4">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Individual / Identity</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Affiliation</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Classification</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timeline</th>
                                <th className="px-10 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/50">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-10 py-32 text-center">
                                        <div className="flex flex-col items-center gap-6">
                                            <div className="relative">
                                                <div className="w-16 h-16 border-[5px] border-brand-100/50 rounded-full"></div>
                                                <div className="w-16 h-16 border-[5px] border-brand-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0 shadow-lg shadow-brand-500/10"></div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Connecting to Core</p>
                                                <p className="text-xs text-slate-400 font-medium">Synchronizing encrypted datasets...</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredContacts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-10 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
                                            <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center text-slate-200 mb-2 border-2 border-dashed border-slate-100">
                                                <Search size={40} strokeWidth={1.5} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="font-display font-black text-xl text-slate-900 tracking-tight">Zero Results</p>
                                                <p className="text-slate-400 text-sm font-medium leading-relaxed px-6">We couldn't find any fragments matching your search parameters in the current view.</p>
                                            </div>
                                            <button onClick={() => { setSearchTerm(''); setStatusFilter('all') }} className="mt-4 bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-2.5 rounded-full text-xs font-black transition-all hover:scale-105 active:scale-95">Reset Environment</button>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredContacts.map((contact) => (
                                <tr key={contact.id} className="group hover:bg-slate-50/40 transition-all duration-500 ease-out">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-50 to-indigo-50 border border-brand-100/50 flex items-center justify-center text-brand-600 font-bold font-display text-base group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-500/10 transition-all duration-500">
                                                {contact.initials}
                                            </div>
                                            <div className="space-y-0.5">
                                                <div className="font-black text-slate-900 group-hover:text-brand-600 transition-colors text-[15px]">{contact.name}</div>
                                                <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                                    <Mail size={12} className="opacity-60" /> {contact.email || 'SECRET_PROTOCOL'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-sm font-black text-slate-700 flex items-center gap-2 group-hover:text-slate-900">
                                                <Building2 size={14} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
                                                {contact.company || 'FREE_AGENT'}
                                            </div>
                                            <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 opacity-80">
                                                <Phone size={11} /> {contact.phone || 'NOT_VERIFIED'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${contact.status === 'lead' ? 'bg-amber-50/50 text-amber-600 border-amber-200/40 group-hover:bg-amber-50' :
                                            contact.status === 'customer' ? 'bg-emerald-50/50 text-emerald-600 border-emerald-200/40 group-hover:bg-emerald-50' :
                                                'bg-slate-50 text-slate-400 border-slate-200/40 group-hover:bg-slate-100'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2.5 animate-pulse ${contact.status === 'lead' ? 'bg-amber-500' :
                                                contact.status === 'customer' ? 'bg-emerald-500' :
                                                    'bg-slate-400'
                                                }`}></span>
                                            {contact.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-xs font-black text-slate-700 tracking-tight">{contact.created_at}</div>
                                        <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase opacity-60">Verified {contact.updated_at}</div>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-500 delay-75">
                                            <button
                                                onClick={() => onEdit(contact)}
                                                className="p-3 text-slate-400 hover:bg-brand-50 hover:text-brand-600 rounded-2xl transition-all hover:rotate-6 active:scale-90"
                                                title="Edit Records"
                                            >
                                                <Edit2 size={18} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(contact.id)}
                                                className="p-3 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all hover:-rotate-6 active:scale-90"
                                                title="Purge Record"
                                            >
                                                <Trash2 size={18} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Subtle decorative edge */}
                <div className="h-1 bg-gradient-to-r from-brand-500 to-indigo-400 absolute bottom-0 left-0 right-0 opacity-20"></div>
            </div>
        </div>
    );
};

export default ContactList;
