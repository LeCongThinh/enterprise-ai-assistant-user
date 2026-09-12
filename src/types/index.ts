// src/types/index.ts

export type Role = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
export type ClearanceLevel = 'CLEARANCE L1' | 'CLEARANCE L2' | 'CLEARANCE L3';

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  role: Role;
  department: string;
  clearanceLevel: ClearanceLevel;
  avatarUrl: string;
  dailyQueriesUsed: number;
  dailyQueriesLimit: number;
  storageUsedMB: number;
  storageLimitMB: number;
}

export interface QuickWorkflow {
  id: string;
  title: string;
  description: string;
  docCount: number;
  iconName: string;
  colorClass: string;
}

export interface RecentRAGSession {
  id: string;
  topic: string;
  summary: string;
  citationCount: number;
  modelUsed: string;
  timeAgo: string;
}

export interface AuthorizedDocument {
  id: string;
  fileName: string;
  departmentTag: string;
  fileSize: string;
  updatedTimeAgo: string;
  fileType: 'pdf' | 'docx' | 'xlsx';
}