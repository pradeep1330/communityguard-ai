import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import Sidebar from './components/Sidebar';
import EmergencyContactModal from './components/EmergencyContactModal';
import { triggerHaptic } from './utils';
import { Message, AlertCategory } from './types';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello. I am **CommunityGuard AI** — your intelligent Decision Intelligence Assistant for community emergency response, healthcare access, and public safety.\n\nWhat can I help you with today? Select a situation below or describe your need:'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Dwarka Sec-10, New Delhi');
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [tempLocation, setTempLocation] = useState('');
  const [alertFilter, setAlertFilter] = useState<AlertCategory>('All');
  const [isLocating, setIsLocating] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [tempContact, setTempContact] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const savedContact = localStorage.getItem('communityGuard_emergencyContact');
    if (savedContact) {
      setEmergencyContact(savedContact);
    }
  }, []);

  const sendMessage = async (text: string, isEmergency = false) => {
    if (!text.trim() || isLoading) return;

    if (isEmergency || text.toLowerCase().includes('emergency') || text.toLowerCase().includes('help')) {
      triggerHaptic([100, 50, 100, 50, 200]);
    } else {
      triggerHaptic(50);
    }

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ history, message: text }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      
      const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: data.text };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: '⚠️ I encountered an error connecting to my core systems. Please try again.' 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickOption = (id: string, prompt: string) => {
    sendMessage(prompt, id === 'emergency');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleShareEmergency = () => {
    const incidentStatus = messages.length > 1 && messages[messages.length - 1].role === 'assistant' 
      ? 'Active AI assistance ongoing' 
      : 'User requested assistance';
    const message = `EMERGENCY ALERT\nLocation: ${currentLocation}\nStatus: ${incidentStatus}\nPlease send help immediately.`;
    
    if (navigator.share && !emergencyContact) {
      navigator.share({
        title: 'Emergency Alert',
        text: message
      }).catch(console.error);
    } else {
      const phoneNumber = emergencyContact ? encodeURIComponent(emergencyContact) : '';
      window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    }
  };

  const handleLocateMe = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    
    setIsLocating(true);
    triggerHaptic(50);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          
          if (data && data.display_name) {
            const parts = data.display_name.split(', ');
            const shortAddress = parts.slice(0, 3).join(', ');
            setTempLocation(shortAddress);
            setCurrentLocation(shortAddress);
          } else {
            const fallback = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            setTempLocation(fallback);
            setCurrentLocation(fallback);
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          const fallback = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
          setTempLocation(fallback);
          setCurrentLocation(fallback);
        } finally {
          setIsLocating(false);
          setIsEditingLocation(false);
          triggerHaptic([30, 50, 30]);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLocating(false);
        alert('Unable to retrieve your location');
      }
    );
  };

  const handleReset = () => {
    triggerHaptic(50);
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: 'I am your CommunityGuard AI. How can I assist you with your emergency, healthcare, or administrative needs today?'
    }]);
  };

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-slate-200 font-sans overflow-hidden w-full max-w-full">
      <Header 
        messagesLength={messages.length}
        handleReset={handleReset}
        isEditingLocation={isEditingLocation}
        tempLocation={tempLocation}
        setTempLocation={setTempLocation}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        isLocating={isLocating}
        handleLocateMe={handleLocateMe}
        setIsEditingLocation={setIsEditingLocation}
        emergencyContact={emergencyContact}
        setTempContact={setTempContact}
        setIsContactModalOpen={setIsContactModalOpen}
        handleShareEmergency={handleShareEmergency}
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[58%_40%] lg:gap-[2%] overflow-hidden w-full max-w-full relative">
        <div className="flex-1 flex flex-col relative overflow-hidden min-w-0">
          <ChatArea 
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
            handleQuickOption={handleQuickOption}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
          />
        </div>
        
        <Sidebar 
          alertFilter={alertFilter}
          setAlertFilter={setAlertFilter}
        />
      </div>
      
      <EmergencyContactModal 
        isContactModalOpen={isContactModalOpen}
        setIsContactModalOpen={setIsContactModalOpen}
        tempContact={tempContact}
        setTempContact={setTempContact}
        setEmergencyContact={setEmergencyContact}
      />
    </div>
  );
}

