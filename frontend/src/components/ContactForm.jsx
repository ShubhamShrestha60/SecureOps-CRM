import React, { useState, useEffect } from 'react';
import { createContact, updateContact } from '../api';
import { X, User, Mail, Phone, Building2, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ContactForm = ({ contact, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        status: 'lead',
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (contact) {
            setFormData({
                name: contact.name || '',
                email: contact.email || '',
                phone: contact.phone || '',
                company: contact.company || '',
                status: contact.status || 'lead',
            });
        }
    }, [contact]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        try {
            if (contact) {
                await updateContact(contact.id, formData);
                toast.success('Security Clearance Updated', {
                    description: `Records for ${formData.name} have been synchronized.`
                });
            } else {
                await createContact(formData);
                toast.success('New Identity Authorized', {
                    description: `${formData.name} has been added to the secure core.`
                });
            }
            onSave();
            onClose();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
                toast.error('Data Integrity Error', {
                    description: 'Please review the highlighted fields below.'
                });
            } else {
                toast.error('System Failure', {
                    description: 'An unexpected error occurred during transmission.'
                });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Cinematic Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-500"
                onClick={!submitting ? onClose : undefined}
            ></div>

            {/* Lavish Modal */}
            <div className="relative w-full max-w-xl bg-white rounded-[40px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] border border-white overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 ease-out fill-mode-both">

                {/* Header Decor */}
                <div className="h-2 bg-gradient-to-r from-brand-600 via-indigo-500 to-brand-400"></div>

                <div className="px-8 sm:px-12 py-10 sm:py-12">
                    {/* Form Header */}
                    <div className="flex justify-between items-start mb-10">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-600">
                                    <ShieldCheck size={24} strokeWidth={2.5} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight font-display">
                                    {contact ? 'Modify Protocol' : 'Initial Authorization'}
                                </h2>
                            </div>
                            <p className="text-sm font-medium text-slate-400 leading-relaxed uppercase tracking-tighter">
                                {contact ? `Updating security clearance for fragment ID: ${contact.id}` : 'Populating secure core with new entity metadata'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={submitting}
                            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all disabled:opacity-30"
                        >
                            <X size={24} strokeWidth={2.5} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Full Name */}
                            <div className="space-y-2.5 md:col-span-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Entity Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-600 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Full Legal Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full bg-slate-50 border-[1.5px] ${errors.name ? 'border-red-500/50' : 'border-slate-100'} rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 transition-all outline-none font-semibold text-slate-800`}
                                    />
                                </div>
                                {errors.name && (
                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-500 mt-1 ml-1 animate-in slide-in-from-left-2">
                                        <AlertCircle size={12} /> {errors.name[0]}
                                    </div>
                                )}
                            </div>

                            {/* Email Address */}
                            <div className="space-y-2.5">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Secure Channel (Email)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-600 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        placeholder="entity@domain.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`w-full bg-slate-50 border-[1.5px] ${errors.email ? 'border-red-500/50' : 'border-slate-100'} rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 transition-all outline-none font-semibold text-slate-800`}
                                    />
                                </div>
                                {errors.email && (
                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-500 mt-1 ml-1 animate-in slide-in-from-left-2">
                                        <AlertCircle size={12} /> {errors.email[0]}
                                    </div>
                                )}
                            </div>

                            {/* Phone Line */}
                            <div className="space-y-2.5">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Inbound String (Phone)</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-600 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="+X XXX-XXX-XXXX"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-slate-50 border-[1.5px] border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 transition-all outline-none font-semibold text-slate-800"
                                    />
                                </div>
                            </div>

                            {/* Affiliation */}
                            <div className="space-y-2.5">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Corporate Association</label>
                                <div className="relative group">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-600 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Alpha Corp"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-slate-50 border-[1.5px] border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 transition-all outline-none font-semibold text-slate-800"
                                    />
                                </div>
                            </div>

                            {/* Status Classification */}
                            <div className="space-y-2.5">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Classification Status</label>
                                <div className="relative">
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-slate-50 border-[1.5px] border-slate-100 rounded-2xl py-3.5 px-6 text-sm focus:bg-white focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 transition-all outline-none font-bold text-slate-700 cursor-pointer appearance-none"
                                    >
                                        <option value="lead">Target Lead</option>
                                        <option value="customer">Verified Partner</option>
                                        <option value="inactive">Dormant Node</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={submitting}
                                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-4 rounded-[22px] font-black text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                            >
                                Abort Protocol
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-[1.5] bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-[22px] font-black text-xs uppercase tracking-[0.15em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-brand-500/20 disabled:opacity-60 flex items-center justify-center gap-3 group"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Synchronizing...
                                    </>
                                ) : (
                                    <>
                                        Commit to Database
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
