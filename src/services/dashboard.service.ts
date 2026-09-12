// src/services/dashboard.service.ts
import type { UserProfile, QuickWorkflow, RecentRAGSession, AuthorizedDocument } from '../types';

export const mockUserProfile: UserProfile = {
  id: 'usr-101',
  name: 'Alexander Wright',
  title: 'Kỹ sư trưởng Kiến trúc',
  role: 'EMPLOYEE',
  department: 'Phòng Công Nghệ',
  clearanceLevel: 'CLEARANCE L3',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  dailyQueriesUsed: 45,
  dailyQueriesLimit: 100,
  storageUsedMB: 25,
  storageLimitMB: 100
};

export const mockQuickWorkflows: QuickWorkflow[] = [
  {
    id: 'wf-1',
    title: 'HR & Chính sách phúc lợi',
    description: 'Quy định công tác phí, bảo hiểm sức khỏe và số ngày phép năm còn lại.',
    docCount: 142,
    iconName: 'users',
    colorClass: 'text-blue-500 bg-blue-50 border-blue-100'
  },
  {
    id: 'wf-2',
    title: 'Pháp chế & Hợp đồng',
    description: 'Rà soát thỏa thuận dịch vụ Master Agreement, trách nhiệm bồi thường.',
    docCount: 388,
    iconName: 'file-text',
    colorClass: 'text-amber-500 bg-amber-50 border-amber-100'
  },
  {
    id: 'wf-3',
    title: 'Phân tích Tài chính Q1',
    description: 'Chi phí hạ tầng cloud, đối soát ngân sách thực chi và dự báo biến động.',
    docCount: 219,
    iconName: 'bar-chart',
    colorClass: 'text-emerald-500 bg-emerald-50 border-emerald-100'
  },
  {
    id: 'wf-4',
    title: 'Kỹ thuật & API Docs',
    description: 'Đặc tả microservices, chuẩn giao thức gRPC và danh mục OpenAPI.',
    docCount: 733,
    iconName: 'code',
    colorClass: 'text-indigo-500 bg-indigo-50 border-indigo-100'
  }
];

export const mockRecentSessions: RecentRAGSession[] = [
  {
    id: 'sess-1',
    topic: 'Hạ tầng Cloud',
    summary: 'Phân tích biến động chi phí EKS Spot Instance & Ngân sách Q1',
    citationCount: 6,
    modelUsed: 'Claude 3.5 Sonnet',
    timeAgo: '10 phút trước'
  },
  {
    id: 'sess-2',
    topic: 'Chính sách HR',
    summary: 'Trợ cấp thiết bị làm việc từ xa & Định mức công tác năm 2025',
    citationCount: 3,
    modelUsed: 'Llama 3 Enterprise',
    timeAgo: '2 giờ trước'
  },
  {
    id: 'sess-3',
    topic: 'Bảo mật & Audit',
    summary: 'Kiểm tra chứng chỉ tuân thủ SOC2 Type II của nhà cung cấp SaaS',
    citationCount: 8,
    modelUsed: 'Claude 3.5 Sonnet',
    timeAgo: 'Hôm qua'
  }
];

export const mockAuthorizedDocs: AuthorizedDocument[] = [
  {
    id: 'doc-1',
    fileName: 'FY25_Engineering_Roadmap_Final.pdf',
    departmentTag: 'Kỹ thuật',
    fileSize: '4.8 MB',
    updatedTimeAgo: '10m trước',
    fileType: 'pdf'
  },
  {
    id: 'doc-2',
    fileName: 'Hop_Dong_Dich_Vu_Doi_Tac_2025.docx',
    departmentTag: 'Pháp chế',
    fileSize: '1.2 MB',
    updatedTimeAgo: '1h trước',
    fileType: 'docx'
  },
  {
    id: 'doc-3',
    fileName: 'Q1_Financial_Forecast_Consolidated.xlsx',
    departmentTag: 'Tài chính',
    fileSize: '850 KB',
    updatedTimeAgo: 'Hôm qua',
    fileType: 'xlsx'
  },
  {
    id: 'doc-4',
    fileName: 'Platform_API_Gateway_Architecture_v3.pdf',
    departmentTag: 'Kiến trúc',
    fileSize: '3.4 MB',
    updatedTimeAgo: '2 ngày trước',
    fileType: 'pdf'
  },
  {
    id: 'doc-5',
    fileName: 'Quy_Che_An_Toan_Thong_Tin_Noi_Bo.pdf',
    departmentTag: 'Bảo mật L3',
    fileSize: '2.1 MB',
    updatedTimeAgo: '3 ngày trước',
    fileType: 'pdf'
  }
];