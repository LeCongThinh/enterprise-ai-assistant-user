import React, { useState } from 'react';
import {
    MessageSquare,
    MoreVertical,
    Pencil,
    Pin,
    Trash2
} from 'lucide-react';

export interface HistoryItemProps {
    id: string;
    title: string;
    isActive?: boolean;
    onRename?: (id: string) => void;
    onPin?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
    id,
    title,
    isActive = false,
    onRename,
    onPin,
    onDelete
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative group">
            <div
                className={`flex items-center justify-between px-2.5 py-1.5 text-xs rounded-md transition ${isActive
                    ? 'font-medium text-[#0F52BA] bg-[#EFF6FF]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
            >
                <a href={`#/chat/${id}`} className="flex items-center gap-2 min-w-0 flex-1 mr-1">
                    <MessageSquare
                        className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#0F52BA]' : 'text-slate-400 group-hover:text-slate-600'
                            }`}
                    />
                    <span className="truncate">{title}</span>
                </a>

                {/* Nút 3 chấm */}
                <button onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setIsMenuOpen(!isMenuOpen);
                }} aria-label="Tùy chọn phiên chat"
                    className={`p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition shrink-0 ${isMenuOpen ? 'opacity-100 bg-slate-200/60 text-slate-700' : ''
                        }`} >
                    <MoreVertical className="w-3 h-3" />
                </button>
            </div>

            {/* Popover Menu 3 chấm (Đổi tên, Ghim, Xóa) */}
            {isMenuOpen && (
                <>
                    {/* Backdrop ẩn menu khi click bên ngoài */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(false);
                        }}
                    />

                    <div className="absolute right-0 top-full mt-1 z-50 w-36 bg-white border border-slate-200 rounded-xl shadow-lg p-1 space-y-0.5 animate-in fade-in zoom-in-95 duration-100">
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                onRename?.(id);
                            }}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
                        >
                            <Pencil className="w-3.5 h-3.5 text-slate-500" />
                            <span>Đổi tên phiên</span>
                        </button>

                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                onPin?.(id);
                            }}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
                        >
                            <Pin className="w-3.5 h-3.5 text-slate-500" />
                            <span>Ghim phiên chat</span>
                        </button>

                        <div className="h-px bg-slate-100 my-0.5" />

                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                onDelete?.(id);
                            }}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[11px] font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            <span>Xóa phiên chat</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};