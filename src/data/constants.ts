import { AlertTriangle, Stethoscope, BarChart3, FileText } from 'lucide-react';
import { Alert, QuickOption } from '../types';

export const QUICK_OPTIONS: QuickOption[] = [
  {
    id: 'emergency',
    Icon: AlertTriangle,
    iconColor: 'text-red-500',
    text: 'I have an emergency right now',
    prompt: '🚨 I have an emergency right now'
  },
  {
    id: 'healthcare',
    Icon: Stethoscope,
    iconColor: 'text-blue-500',
    text: 'I need healthcare guidance',
    prompt: '🏥 I need healthcare guidance'
  },
  {
    id: 'admin',
    Icon: BarChart3,
    iconColor: 'text-emerald-500',
    text: 'Community/Admin Decision Support',
    prompt: '📊 Community/Admin Decision Support'
  },
  {
    id: 'report',
    Icon: FileText,
    iconColor: 'text-purple-500',
    text: 'Generate a Report or Plan',
    prompt: '📋 Generate a Report or Plan'
  }
];

export const COMMUNITY_ALERTS: Alert[] = [
  {
    id: 1,
    title: 'Accident: Sec 6 Flyover',
    time: '14 mins ago',
    location: 'Ward 42',
    category: 'Emergency',
    level: 'Critical',
    levelColor: 'text-red-500',
    bgColor: 'bg-red-500/5',
    borderColor: 'border-red-500',
    badgeColor: 'bg-red-500/10'
  },
  {
    id: 2,
    title: 'Water Quality: Block C',
    time: '1 hour ago',
    location: 'Ward 12',
    category: 'Environment',
    level: 'Monitor',
    levelColor: 'text-indigo-500',
    bgColor: 'bg-indigo-500/5',
    borderColor: 'border-indigo-500',
    badgeColor: 'bg-indigo-500/10'
  },
  {
    id: 3,
    title: 'Viral Fever Outbreak',
    time: '2 hours ago',
    location: 'Sector 10',
    category: 'Health',
    level: 'Warning',
    levelColor: 'text-amber-500',
    bgColor: 'bg-amber-500/5',
    borderColor: 'border-amber-500',
    badgeColor: 'bg-amber-500/10'
  },
  {
    id: 4,
    title: 'Fire: Industrial Area',
    time: '3 hours ago',
    location: 'Phase 2',
    category: 'Emergency',
    level: 'Critical',
    levelColor: 'text-red-500',
    bgColor: 'bg-red-500/5',
    borderColor: 'border-red-500',
    badgeColor: 'bg-red-500/10'
  }
];
