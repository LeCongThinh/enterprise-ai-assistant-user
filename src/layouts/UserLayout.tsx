// src/layouts/UserLayout.tsx
import React, { useState } from 'react';
import {
  FolderOpen,
  History,
  ChevronDown,
  ChevronUp,
  Plus,
  Moon,
  Bell,
  LayoutDashboard,
  Menu,
  X, Settings,
  User,
  LogOut,
} from 'lucide-react';
import { mockUserProfile, mockRecentSessions } from '../services/dashboard.service';
import { HistoryItem } from '../components/HistoryItem';

interface UserLayoutProps {
  children: React.ReactNode;
}

export const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default đóng trên mobile
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const handleRenameSession = (id: string) => {
    console.log("Đổi tên phiên chat:", id);
  };

  const handlePinSession = (id: string) => {
    console.log("Ghim phiên chat:", id);
  };

  const handleDeleteSession = (id: string) => {
    console.log("Xóa phiên chat:", id);
  };
  const [lang, setLang] = useState<'VI' | 'EN'>('VI');

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased overflow-hidden">
      {/* Mobile Overlay Background */}
      {isSidebarOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30 lg:hidden transition-opacity"
        />
      )}

      {/* 1. Left Sidebar Navigation (Desktop Fixed / Mobile Drawer) */}
      <aside
        aria-label="Điều hướng chính"
        className={`fixed lg:static inset-y-0 left-0 z-40 w-60 bg-white border-r border-[#E2E8F0] flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out shrink-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div>
          {/* Top Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0F52BA] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                🛡️
              </div>
              <div>
                <span className="font-bold text-sm text-[#0F172A]">Enterprise RAG</span>
                <span className="text-[10px] text-blue-600 font-semibold ml-1.5 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                  v2.4
                </span>
              </div>
            </div>
            {/* Close Sidebar button on Mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Đóng menu điều hướng"
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <button className="w-full mt-4 bg-[#0F52BA] hover:bg-[#2563EB] text-white font-medium text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]">
            <Plus className="w-4 h-4 font-bold" />
            <span>New chat</span>
          </button>

          {/* Main Navigation */}
          <nav aria-label="Menu chức năng" className="mt-6">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
              MENU CHÍNH
            </p>
            <div className="space-y-1">
              {/* Home (Active) */}
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-[#0F52BA] bg-[#EFF6FF] rounded-lg border-l-4 border-[#0F52BA]">
                <LayoutDashboard className="w-4 h-4" />
                <span>Trang chủ</span>
              </a>

              {/* Knowledge Repository */}
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition">
                <FolderOpen className="w-4 h-4" />
                <span>Kho tài liệu</span>
              </a>

              {/* Chat History Accordion */}
              <div>
                <button
                  onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <History className="w-4 h-4" />
                    <span>Lịch sử tra cứu</span>
                  </div>
                  {isHistoryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isHistoryOpen && (
                  <div className="pl-4 ml-3 border-l border-slate-200 mt-1 space-y-1">
                    {mockRecentSessions.map((item) => (
                      <HistoryItem
                        key={item.id}
                        id={item.id} 
                        title={item.summary}
                        isActive={item.id === '1'}
                        onRename={handleRenameSession}
                        onPin={handlePinSession}
                        onDelete={handleDeleteSession}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* Quota Widget & User Profile */}
        <div className="space-y-3 pt-3 border-t border-[#E2E8F0]">
          <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl space-y-2.5">
            <div>
              <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                <span>Truy vấn hôm nay</span>
                <span className="font-bold text-slate-800">
                  {mockUserProfile.dailyQueriesUsed} / {mockUserProfile.dailyQueriesLimit}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0F52BA] h-full rounded-full"
                  style={{ width: `${(mockUserProfile.dailyQueriesUsed / mockUserProfile.dailyQueriesLimit) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* User Profile Component với Settings Dropdown */}
          <div className="relative">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
              {/* Thông tin Avatar & Tên */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <img
                  src={mockUserProfile.avatarUrl}
                  alt={mockUserProfile.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate">{mockUserProfile.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{mockUserProfile.title}</div>
                </div>
              </div>

              {/* Nút Bánh răng Cài đặt */}
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                aria-label="Cài đặt tài khoản"
                className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition ${isProfileMenuOpen ? 'bg-slate-200/80 text-slate-700' : ''
                  }`}
              >
                <Settings className="w-4 h-4 transition-transform duration-300 hover:rotate-45" />
              </button>
            </div>

            {/* Dropdown Menu (Hiển thị khi click vào bánh răng) */}
            {isProfileMenuOpen && (
              <>
                {/* Backdop ẩn menu khi click ra ngoài */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileMenuOpen(false)}
                />

                {/* Box Menu */}
                <div className="absolute bottom-full left-0 right-0 mb-2 z-50 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 space-y-0.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <button onClick={() => {
                    setIsProfileMenuOpen(false);
                    // Xử lý xem thông tin tài khoản ở đây
                  }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Xem thông tin tài khoản</span>
                  </button>

                  <div className="h-px bg-slate-100 my-1" />

                  <button onClick={() => {
                    setIsProfileMenuOpen(false);
                    // Xử lý đăng xuất ở đây
                  }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-500" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* 2. Main Content Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
        {/* Top Header Navigation */}
        <header className="h-16 border-b border-[#E2E8F0] bg-white/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Mở menu điều hướng"
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">

            {/* Zero-Trust Security Badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Zero-Trust Secure</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setLang('VI')}
                className={`px-2 py-1 rounded transition ${lang === 'VI' ? 'bg-white text-[#0F52BA] shadow-xs' : 'text-slate-500'}`}
              >
                VI
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`px-2 py-1 rounded transition ${lang === 'EN' ? 'bg-white text-[#0F52BA] shadow-xs' : 'text-slate-500'}`}
              >
                EN
              </button>
            </div>

            <button aria-label="Chuyển chế độ tối" className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition">
              <Moon className="w-4 h-4" />
            </button>
            <button aria-label="Thông báo" className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};