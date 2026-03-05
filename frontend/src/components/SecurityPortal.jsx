import React, { useEffect, useState } from 'react';
import { getSecurityLogs } from '../api';
import { X, Shield, Clock, Hash, Activity, Terminal, ShieldAlert } from 'lucide-react';

const SecurityPortal = ({ onClose }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await getSecurityLogs();
            setLogs(response.data || []);
        } catch (error) {
            console.error('Failed to fetch security logs');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-end overflow-hidden">
            {/* Cinematic Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-500"
                onClick={onClose}
            ></div>

            {/* Security Panel */}
            <div className="relative w-full max-w-2xl h-full bg-slate-900 border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-right duration-500 ease-out flex flex-col">

                {/* Panel Header */}
                <div className="p-8 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-3">
                                <div className="bg-brand-500/10 p-2 rounded-xl text-brand-400">
                                    <Terminal size={24} />
                                </div>
                                <h2 className="text-2xl font-black text-white tracking-tight font-display">Security Intelligence</h2>
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Live Audit Feed & Event Protocol</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Audit Feed */}
                <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center gap-4">
                            <div className="w-10 h-10 border-4 border-slate-800 border-t-brand-500 rounded-full animate-spin"></div>
                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Decrypting Logs...</p>
                        </div>
                    ) : logs.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center gap-4 text-center px-10">
                            <ShieldAlert size={48} className="text-slate-700" />
                            <div className="space-y-1">
                                <p className="text-white font-black text-lg">Zero Anomalies</p>
                                <p className="text-slate-500 text-sm font-medium">The secure core has no recorded activity fragments in the current session.</p>
                            </div>
                        </div>
                    ) : (
                        logs.map((log) => (
                            <div key={log.id} className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/[0.08] transition-all group overflow-hidden relative">
                                <div className={`absolute top-0 left-0 w-1 h-full ${log.action === 'CREATE' ? 'bg-emerald-500' :
                                        log.action === 'UPDATE' ? 'bg-amber-500' :
                                            'bg-red-500'
                                    }`}></div>

                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${log.action === 'CREATE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                log.action === 'UPDATE' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                    'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}>
                                            {log.action}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-tighter">
                                            <Clock size={12} /> {log.relative_time}
                                        </span>
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-600 bg-white/5 px-2 py-1 rounded-lg">
                                        ID: #{log.id}
                                    </div>
                                </div>

                                <p className="text-sm font-bold text-slate-200 leading-relaxed mb-4">
                                    {log.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-950/50 p-3 rounded-2xl border border-white/5">
                                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <Activity size={10} /> Origin Node
                                        </div>
                                        <div className="text-xs font-mono text-slate-400">{log.ip || '0.0.0.0'}</div>
                                    </div>
                                    <div className="bg-slate-950/50 p-3 rounded-2xl border border-white/5">
                                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <Hash size={10} /> Operator
                                        </div>
                                        <div className="text-xs font-bold text-brand-400 tracking-tight">{log.user}</div>
                                    </div>
                                </div>

                                {log.action === 'UPDATE' && log.metadata && (
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">Fragment Modifications</div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <div className="text-[8px] font-bold text-red-400 uppercase">Redacted</div>
                                                {Object.entries(log.metadata.before || {}).map(([key, val]) => (
                                                    <div key={key} className="text-[10px] font-mono text-slate-500 line-through truncate">{key}: {val}</div>
                                                ))}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-[8px] font-bold text-emerald-400 uppercase">Commited</div>
                                                {Object.entries(log.metadata.after || {}).map(([key, val]) => (
                                                    <div key={key} className="text-[10px] font-mono text-slate-200 truncate">{key}: {val}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-white/5 bg-slate-950/30">
                    <div className="flex items-center gap-3 text-emerald-500/60">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">System Monitoring Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityPortal;
