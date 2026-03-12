import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Velocity System Crash Log:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-brandOffWhite flex items-center justify-center p-6 font-sans">
                    <div className="max-w-xl w-full bg-white rounded-[48px] shadow-2xl p-16 text-center border border-brand/10 relative overflow-hidden">
                        {/* Error Highlight Decor */}
                        <div className="absolute top-0 inset-x-0 h-2 bg-red-500" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="w-20 h-20 rounded-3xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-10 shadow-inner">
                            <AlertTriangle className="w-10 h-10" strokeWidth={1.5} />
                        </div>

                        <h1 className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500 mb-6">System Protocol Break</h1>
                        <h2 className="text-4xl font-display font-black text-brandCharcoal tracking-tighter italic mb-6 leading-tight">
                            Engine <span className="text-red-500">Stall Detected.</span>
                        </h2>
                        
                        <p className="text-slate-500 italic font-medium leading-relaxed mb-12">
                            The system encountered an unexpected structural failure. Telemetry has been logged for mission diagnostics.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onClick={() => window.location.reload()}
                                className="px-10 py-5 bg-brandCharcoal text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand transition-all flex items-center justify-center gap-3 shadow-xl shadow-brandCharcoal/20"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Initiate Restart
                            </button>
                            <Link 
                                to="/"
                                onClick={() => this.setState({ hasError: false })}
                                className="px-10 py-5 bg-brandOffWhite border border-brandCharcoal/5 text-brandCharcoal rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-brand transition-all flex items-center justify-center gap-3 shadow-sm"
                            >
                                <Home className="w-4 h-4" />
                                Return to Base
                            </Link>
                        </div>

                        {process.env.NODE_ENV === 'development' && (
                           <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left overflow-auto max-h-40 hide-scrollbar">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Diagnostic Trace</p>
                             <code className="text-[10px] text-red-400 font-mono break-all">{this.state.error?.toString()}</code>
                           </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
