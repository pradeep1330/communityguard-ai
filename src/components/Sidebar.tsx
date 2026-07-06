import React from 'react';
import { cn } from '../utils';
import { COMMUNITY_ALERTS } from '../data/constants';
import { AlertCategory } from '../types';

interface SidebarProps {
  alertFilter: AlertCategory;
  setAlertFilter: (category: AlertCategory) => void;
}

export default function Sidebar({ alertFilter, setAlertFilter }: SidebarProps) {
  return (
    <aside className="hidden lg:flex w-full border-l border-slate-800 bg-[#050505] flex-col p-4 overflow-y-auto min-w-0">
      <div className="mb-6 flex justify-between items-center shrink-0">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Live Situation Hub</h3>
        <span className="text-[9px] text-indigo-400 border border-indigo-400/30 px-2 py-0.5 rounded-full uppercase">Simulated Data</span>
      </div>

      <div className="space-y-4">
        {/* Nearest Resources */}
        <div className="bg-[#0A0A0A] border border-slate-800 rounded-xl p-3 shadow-sm shrink-0">
          <h4 className="text-[11px] uppercase text-slate-500 font-bold mb-3 tracking-widest">Nearest Emergency Resources</h4>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-slate-600 border-b border-slate-800">
                <th className="text-left pb-1 font-normal text-[10px]">Facility</th>
                <th className="text-right pb-1 font-normal text-[10px]">Dist</th>
                <th className="text-right pb-1 font-normal text-[10px]">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-900/50 hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 font-serif italic">Venkateshwar Hosp.</td>
                <td className="text-right text-[10px]">1.2km</td>
                <td className="text-right text-green-500 text-[9px] font-bold tracking-tight">5 AMB</td>
              </tr>
              <tr className="border-b border-slate-900/50 hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 font-serif italic">Manipal Hospital</td>
                <td className="text-right text-[10px]">2.4km</td>
                <td className="text-right text-amber-500 text-[9px] font-bold tracking-tight">2 ICU</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 font-serif italic">Max Super Spec.</td>
                <td className="text-right text-[10px]">4.1km</td>
                <td className="text-right text-blue-500 text-[9px] font-bold tracking-tight">B+ ABL</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Environment Metrics */}
        <div className="grid grid-cols-2 gap-3 shrink-0">
          <div className="bg-[#0A0A0A] border border-slate-800 rounded-xl p-3 flex flex-col justify-between h-[70px] relative overflow-hidden group shadow-sm">
            <span className="text-[10px] uppercase text-slate-500 tracking-widest font-bold relative z-10">Air Quality</span>
            <div className="flex items-center gap-2 relative z-10 justify-between">
              <span className="text-xl font-serif text-amber-500">342</span>
              <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden relative z-10">
                <div className="h-full w-3/4 bg-amber-500"></div>
              </div>
            </div>
            <div className="absolute inset-0 bg-amber-500/5 translate-y-4 group-hover:translate-y-0 transition-transform"></div>
          </div>

          <div className="bg-[#0A0A0A] border border-slate-800 rounded-xl p-3 flex flex-col justify-between h-[70px] relative overflow-hidden group shadow-sm">
            <div className="flex justify-between items-center relative z-10">
              <span className="text-[10px] uppercase text-slate-500 tracking-widest font-bold">Heat Alert</span>
              <span className="text-[9px] text-slate-500">UV: 4</span>
            </div>
            <div className="flex items-end gap-2 relative z-10">
              <span className="text-xl font-serif text-emerald-500">32°</span>
            </div>
            <div className="absolute inset-0 bg-emerald-500/5 translate-y-4 group-hover:translate-y-0 transition-transform"></div>
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="bg-[#0A0A0A] border border-slate-800 rounded-xl p-3 shadow-sm shrink-0">
          <div className="flex flex-col gap-3 mb-3">
            <h4 className="text-[11px] uppercase text-slate-500 font-bold tracking-widest flex items-center justify-between">
              <span>Community Alerts</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            </h4>
            
            <div className="flex flex-wrap gap-1.5">
              {(['All', 'Emergency', 'Environment', 'Health'] as AlertCategory[]).map(category => (
                <button
                  key={category}
                  onClick={() => setAlertFilter(category)}
                  className={cn(
                    "px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold transition-colors border",
                    alertFilter === category 
                      ? "bg-indigo-600/20 text-indigo-400 border-indigo-500/30" 
                      : "bg-transparent text-slate-500 border-slate-800 hover:bg-slate-800/50 hover:text-slate-300"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {COMMUNITY_ALERTS.filter(alert => alertFilter === 'All' || alert.category === alertFilter).slice(0, 2).map((alert) => (
              <div key={alert.id} className={cn("flex items-center justify-between border-l-2 pl-2 py-1 rounded-r", alert.borderColor, alert.bgColor)}>
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-200 font-medium">{alert.title}</span>
                  <span className="text-[9px] text-slate-500">{alert.time} • {alert.location}</span>
                </div>
                <span className={cn("text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider", alert.badgeColor, alert.levelColor)}>{alert.level}</span>
              </div>
            ))}
            {COMMUNITY_ALERTS.filter(alert => alertFilter === 'All' || alert.category === alertFilter).length === 0 && (
              <div className="text-[10px] text-slate-500 text-center py-2 italic">
                No alerts in this category.
              </div>
            )}
          </div>
        </div>
        
      </div>
    </aside>
  );
}
