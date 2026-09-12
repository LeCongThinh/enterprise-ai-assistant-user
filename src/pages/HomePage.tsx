// src/pages/HomePage.tsx
import React, { useState } from 'react';
import {
  Paperclip,
  ArrowUp,
  Users,
  FileText,
  BarChart,
  Code,
  FileCode,
  FileSpreadsheet,
  ExternalLink,
  ShieldCheck,
  Cpu,
  ChevronDown, BookOpen,
} from 'lucide-react';
import {
  mockUserProfile,
  mockQuickWorkflows,
  mockRecentSessions,
  mockAuthorizedDocs
} from '../services/dashboard.service';

export const HomePage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('Claude 3.5 Sonnet');
  const [securityFilter, setSecurityFilter] = useState('Nghiêm ngặt theo tài liệu');

  const renderWorkflowIcon = (iconName: string) => {
    switch (iconName) {
      case 'users': return <Users className="w-5 h-5" />;
      case 'file-text': return <FileText className="w-5 h-5" />;
      case 'bar-chart': return <BarChart className="w-5 h-5" />;
      case 'code': return <Code className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const renderDocIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-500" />;
      case 'docx': return <FileCode className="w-4 h-4 text-blue-500" />;
      case 'xlsx': return <FileSpreadsheet className="w-4 h-4 text-emerald-500" />;
      default: return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* 1. Hero Greeting Section */}
      <header className="text-center flex flex-col items-center space-y-1.5 sm:space-y-2">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F172A] leading-snug">
          Chào mừng trở lại, {mockUserProfile.name ? mockUserProfile.name.split(' ').pop() : 'bạn'}! Bạn cần tra cứu hoặc xử lý công việc gì hôm nay?
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Hệ thống kết nối an toàn tới <strong className="font-semibold text-blue-600">1,482 tài liệu</strong> trong tổ chức.
        </p>
      </header>

      {/* 2. Smart Prompt Box */}
      <section aria-label="Hộp thoại hỏi đáp AI thông minh" className="bg-white border border-[#E2E8F0] rounded-2xl p-3.5 sm:p-4 shadow-xs space-y-3">
        <textarea
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Đặt câu hỏi về kiến trúc hệ thống, tóm tắt chính sách nội bộ hoặc tra cứu điều khoản hợp đồng..."
          className="w-full text-xs sm:text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none resize-none"
        />

        {/* Toolbar Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition border border-slate-200">
              <Paperclip className="w-3.5 h-3.5" />
              <span>+ Đính kèm</span>
            </button>
            
            {/* Model Selector */}
            <div className="relative flex items-center">
              <Cpu className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="appearance-none pl-8 pr-7 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 hover:bg-slate-100 transition cursor-pointer">
                <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                <option value="Llama 3 Enterprise">Llama 3 Enterprise</option>
                <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none" />
            </div>

            {/* Anti-hallucination / Security filter */}
            <div className="relative flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
              <select
                value={securityFilter}
                onChange={(e) => setSecurityFilter(e.target.value)}
                className="appearance-none pl-8 pr-7 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 hover:bg-slate-100 transition cursor-pointer">
                <option value="Nghiêm ngặt theo tài liệu">Nghiêm ngặt theo tài liệu</option>
                <option value="Cân bằng tri thức">Cân bằng tri thức</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 sm:pt-0">
            <span className="hidden sm:inline text-[15px] text-slate-400">⌘ + Enter</span>
            <button
              disabled={!prompt.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0F52BA] hover:bg-[#2563EB] disabled:opacity-40 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition"
            >
              <span>Hỏi AI</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Security Commitment Label */}
        <div className="text-[10px] sm:text-[11px] text-slate-500 flex items-center justify-center gap-1.5 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Mã hóa bảo mật L3 • Dữ liệu nội bộ được bảo vệ nghiêm ngặt</span>
        </div>
      </section>

      {/* 3. Quick Workflows Grid (Responsive: 1 -> 2 -> 4 cột) */}
      <section aria-labelledby="quick-workflows-heading" className="space-y-3">
        <h2 id="quick-workflows-heading" className="text-sm sm:text-base font-semibold text-[#0F172A]">
          Gợi ý tác vụ nhanh
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {mockQuickWorkflows.map((wf) => (
            <article
              key={wf.id}
              className="bg-white border border-[#E2E8F0] p-4 rounded-xl hover:border-blue-300 transition cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg border ${wf.colorClass}`}>
                    {renderWorkflowIcon(wf.iconName)}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                    {wf.docCount} tài liệu
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#0F52BA] transition">
                  {wf.title}
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 mt-1">
                  {wf.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Split Grid: 60% Recent RAG Sessions | 40% Authorized Docs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Desktop 60% -> col-span-7) */}
        <section aria-labelledby="recent-sessions-heading" className="lg:col-span-7 space-y-3">
          {/* Header + Subtitle */}
          <div className="flex items-center justify-between">
            <div>
              <h2 id="recent-sessions-heading" className="text-sm sm:text-base font-semibold text-[#0F172A]">
                Hoạt động gần đây
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Các phiên hỏi đáp AI đã thực hiện</p>
            </div>
            <a href="#" className="text-xs font-medium text-[#0F52BA] hover:underline">Xem tất cả</a>
          </div>

          {/* Danh sách các Card rời (space-y-3) */}
          <div className="space-y-3">
            {mockRecentSessions.map((sess) => (
              <article
                key={sess.id}
                className="bg-white border border-[#E2E8F0] hover:border-blue-300 rounded-xl p-4 shadow-2xs hover:shadow-xs transition cursor-pointer group space-y-2.5"
              >
                {/* Hàng 1: Badge + Thời gian + Icon mở góc phải */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-[#0F52BA] bg-blue-50/80 px-2.5 py-0.5 rounded-md border border-blue-100">
                      {sess.topic}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-400 text-xs">{sess.timeAgo}</span>
                  </div>

                  <button aria-label="Mở phiên chat" className="text-slate-400 group-hover:text-[#0F52BA] transition">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                {/* Hàng 2: Tiêu đề phiên chat */}
                <h3 className="text-sm font-bold text-[#0F52BA] line-clamp-1 group-hover:underline">
                  {sess.summary}
                </h3>

                {/* Hàng 3: Mô tả/Nội dung trích đoạn */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  Mức tăng +14.2% chủ yếu đến từ các cụm node US-East-1 trong chu kỳ cao điểm. Tối ưu hóa S3 Lifecycle đã giúp bù trừ 4.2TB lưu trữ raw data...
                </p>

                {/* Hàng 4: Số trích dẫn + Model sử dụng */}
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sess.citationCount} trích dẫn</span>
                  </div>
                  <span>•</span>
                  <span>{sess.modelUsed}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Right Column (Desktop 40% -> col-span-5) */}
        <section aria-labelledby="authorized-docs-heading" className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="authorized-docs-heading" className="text-sm sm:text-base font-semibold text-[#0F172A]">
                Tài liệu được phân quyền gần đây
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Các phiên hỏi đáp AI đã thực hiện</p>
            </div>
            <a href="#" className="text-xs font-medium text-[#0F52BA] hover:underline">
              Kho tài liệu
            </a>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl p-2 divide-y divide-slate-100">
            {mockAuthorizedDocs.map((doc) => (
              <article key={doc.id} className="p-2.5 flex items-center justify-between hover:bg-slate-50 rounded-lg transition cursor-pointer group">
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                    {renderDocIcon(doc.fileType)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-medium text-slate-800 truncate group-hover:text-[#0F52BA] transition">
                      {doc.fileName}
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      {doc.departmentTag} • {doc.fileSize}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0">
                  <span>{doc.updatedTimeAgo}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-500 transition" />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};