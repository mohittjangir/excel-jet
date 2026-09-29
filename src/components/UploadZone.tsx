"use client";

import React, { useState, useCallback } from 'react';
import { Upload, FileSpreadsheet, X, CheckCircle2, Loader2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadZone() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setComplete(false);
      setProgress(0);
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (!file) return;
    setUploading(true);
    setProgress(10);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 95;
        }
        return prev + 20;
      });
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setUploading(false);
      setComplete(true);
    }, 1200);
  }, [file]);

  const handleReset = () => {
    setFile(null);
    setUploading(false);
    setProgress(0);
    setComplete(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className={`relative group border-2 border-dashed rounded-xl p-10 transition-all flex flex-col items-center justify-center
          ${file ? 'border-[#0077C8] bg-[#0077C8]/5' : 'border-[#E2E8F0] hover:border-[#0077C8] bg-white'}
        `}
      >
        <input 
          type="file" 
          accept="video/*,.csv,.xlsx,.json,.pdf" 
          onChange={onFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={uploading || complete}
        />
        
        <AnimatePresence mode="wait">
          {!file && (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Upload className="text-[#0077C8] w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-1">Import Stock Document or Manifest</h3>
              <p className="text-[#64748B] text-xs">Upload CSV, XLSX, MP4, MOV manifest or video inventory logs up to 500MB</p>
            </motion.div>
          )}

          {file && !complete && (
            <motion.div 
              key="file"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center w-full z-20 pointer-events-auto"
            >
              <FileSpreadsheet className="text-[#0077C8] w-12 h-12 mb-3" />
              <p className="font-bold text-sm text-[#0F172A] mb-1 truncate max-w-xs">{file.name}</p>
              <p className="text-[#64748B] text-xs mb-6">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              
              {uploading ? (
                <div className="w-full max-w-md bg-[#E2E8F0] h-2 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    className="bg-[#0077C8] h-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              ) : (
                <div className="flex gap-3">
                  <button 
                    onClick={handleReset}
                    className="px-5 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-slate-100 transition-colors text-xs font-bold text-[#0F172A] flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" /> Remove
                  </button>
                  <button 
                    onClick={handleUpload}
                    className="px-5 py-2 rounded-lg bg-[#0077C8] hover:bg-[#0066B0] transition-all text-xs font-bold text-white flex items-center gap-1.5 shadow-sm"
                  >
                    Upload & Process Stock
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {complete && (
            <motion.div 
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center z-20 pointer-events-auto"
            >
              <div className="w-16 h-16 bg-[#16A34A]/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="text-[#16A34A] w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-1">Import Complete!</h3>
              <p className="text-[#64748B] text-xs mb-6 max-w-xs">Manifest has been queued for stock reconciliation and bin assignment.</p>
              
              <button
                onClick={handleReset}
                className="px-5 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Import Another File
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
