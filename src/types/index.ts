import React from 'react';

export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
}

export type AlertCategory = 'All' | 'Emergency' | 'Environment' | 'Health';

export interface Alert {
  id: number;
  title: string;
  time: string;
  location: string;
  category: AlertCategory;
  level: string;
  levelColor: string;
  bgColor: string;
  borderColor: string;
  badgeColor: string;
}

export interface QuickOption {
  id: string;
  Icon: React.ElementType;
  iconColor: string;
  text: string;
  prompt: string;
}
