import { useEffect } from "react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", isDanger = true }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp scale-100">
        <div className="p-6 md:p-8 text-center">
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5 ${isDanger ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
            {isDanger ? (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-zinc-400 text-sm">{message}</p>
        </div>
        
        <div className="flex border-t border-zinc-800/80">
          <button
            onClick={onClose}
            className="flex-1 py-4 text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-medium transition-colors"
          >
            {cancelText}
          </button>
          <div className="w-[1px] bg-zinc-800/80" />
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-4 font-bold transition-colors ${
              isDanger 
                ? 'text-red-500 hover:text-red-400 hover:bg-red-500/10' 
                : 'text-blue-500 hover:text-blue-400 hover:bg-blue-500/10'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
