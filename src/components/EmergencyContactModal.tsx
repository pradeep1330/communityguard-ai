import React from 'react';
import { Phone, X } from 'lucide-react';

interface EmergencyContactModalProps {
  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;
  tempContact: string;
  setTempContact: (contact: string) => void;
  setEmergencyContact: (contact: string) => void;
}

export default function EmergencyContactModal({
  isContactModalOpen,
  setIsContactModalOpen,
  tempContact,
  setTempContact,
  setEmergencyContact
}: EmergencyContactModalProps) {
  if (!isContactModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0A0A0A] border border-slate-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-indigo-400" />
            Emergency Contact
          </h2>
          <button 
            onClick={() => setIsContactModalOpen(false)}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-5 flex flex-col space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Pre-configure a phone number to quickly share emergency alerts via SMS.
          </p>
          
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
              Phone Number
            </label>
            <input 
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={tempContact}
              onChange={(e) => setTempContact(e.target.value)}
              className="bg-[#111] border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>
        
        <div className="p-4 bg-[#111] border-t border-slate-800 flex justify-end gap-3">
          <button 
            onClick={() => setIsContactModalOpen(false)}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              setEmergencyContact(tempContact.trim());
              localStorage.setItem('communityGuard_emergencyContact', tempContact.trim());
              setIsContactModalOpen(false);
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-indigo-900/20"
          >
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
}
