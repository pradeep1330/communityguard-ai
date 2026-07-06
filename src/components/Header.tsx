import React from 'react';
import { Loader2, LocateFixed, Check, MapPin, Phone, Share2, ArrowLeft } from 'lucide-react';
import { triggerHaptic } from '../utils';

interface HeaderProps {
  messagesLength: number;
  handleReset: () => void;
  isEditingLocation: boolean;
  tempLocation: string;
  setTempLocation: (loc: string) => void;
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;
  isLocating: boolean;
  handleLocateMe: (e: React.MouseEvent) => void;
  setIsEditingLocation: (editing: boolean) => void;
  emergencyContact: string;
  setTempContact: (contact: string) => void;
  setIsContactModalOpen: (open: boolean) => void;
  handleShareEmergency: () => void;
}

export default function Header({
  messagesLength,
  handleReset,
  isEditingLocation,
  tempLocation,
  setTempLocation,
  currentLocation,
  setCurrentLocation,
  isLocating,
  handleLocateMe,
  setIsEditingLocation,
  emergencyContact,
  setTempContact,
  setIsContactModalOpen,
  handleShareEmergency
}: HeaderProps) {
  return (
    <header className="h-[52px] flex-shrink-0 bg-[#0A0A0A] border-b border-slate-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {messagesLength > 1 && (
          <button 
            onClick={handleReset}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors shrink-0"
            title="Back to start"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-900/20 shrink-0">
            <span className="text-white font-bold text-sm">CG</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <h1 className="text-[18px] tracking-tight font-serif italic text-white whitespace-nowrap">CommunityGuard AI</h1>
          <div className="hidden lg:block h-4 w-[1px] bg-slate-700 mx-3"></div>
          <span className="hidden lg:inline-block text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold whitespace-nowrap">Decision Intelligence Platform</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[9px] uppercase text-slate-500 tracking-wider whitespace-nowrap">Location Monitoring</span>
          {isEditingLocation ? (
            <form 
              className="flex items-center gap-1.5 relative"
              onSubmit={(e) => {
                e.preventDefault();
                triggerHaptic([30, 50, 30]);
                if (tempLocation.trim()) setCurrentLocation(tempLocation.trim());
                setIsEditingLocation(false);
              }}
            >
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={tempLocation}
                  onChange={(e) => setTempLocation(e.target.value)}
                  className="bg-[#111] border border-slate-700 text-slate-300 text-[11px] pl-2 pr-7 py-0.5 rounded w-48 focus:outline-none focus:border-indigo-500"
                  autoFocus
                  onBlur={() => {
                    if (!isLocating) {
                      if (tempLocation.trim()) setCurrentLocation(tempLocation.trim());
                      setIsEditingLocation(false);
                    }
                  }}
                  disabled={isLocating}
                />
                <button 
                  type="button" 
                  onMouseDown={handleLocateMe}
                  disabled={isLocating}
                  className="absolute right-1 text-slate-400 hover:text-indigo-400 disabled:opacity-50 flex items-center justify-center"
                  title="Use Current Location"
                >
                  {isLocating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LocateFixed className="w-3.5 h-3.5" />}
                </button>
              </div>
              <button type="submit" className="text-indigo-400 hover:text-indigo-300 ml-0.5" onMouseDown={(e) => e.preventDefault()} disabled={isLocating}>
                <Check className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <span 
              className="text-[11px] font-medium text-slate-300 hover:text-indigo-400 cursor-pointer transition-colors flex items-center gap-1 group"
              onClick={() => {
                triggerHaptic(30);
                setTempLocation(currentLocation);
                setIsEditingLocation(true);
              }}
            >
              {currentLocation}
              <MapPin className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setTempContact(emergencyContact);
              setIsContactModalOpen(true);
            }}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors shrink-0"
            title="Emergency Contact Settings"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button 
              onClick={handleShareEmergency}
              className="px-[10px] py-[4px] bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-full flex items-center gap-2 transition-colors cursor-pointer shrink-0"
          >
              <Share2 className="w-3 h-3 text-red-500" />
              <span className="hidden sm:inline-block text-[10px] font-bold text-red-500 uppercase tracking-tighter">Share Emergency</span>
          </button>
        </div>

        <div className="px-[10px] py-[4px] bg-green-500/10 border border-green-500/30 rounded-full flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Live Signal</span>
        </div>
      </div>
    </header>
  );
}
