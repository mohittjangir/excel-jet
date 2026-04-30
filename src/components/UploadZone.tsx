"use client";

import React, { useState, useCallback } from 'react';
import { Upload, FileVideo, X, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadZone() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-upload-url?filename=${file.name}`, {
        method: 'POST',
      });
      const { url, fields } = await res.json();

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append('file', file);

      const uploadRes = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (uploadRes.ok) {
        setComplete(true);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  }, [file]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className={`relative group border-2 border-dashed rounded-3xl p-12 transition-all flex flex-col items-center justify-center
          ${file ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-800 hover:border-slate-700 bg-slate-900/50'}
        `}
      >
        <input 
          type="file" 
          accept="video/*" 
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
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Upload className="text-slate-400 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Drop your video here</h3>
              <p className="text-slate-500 text-sm">MP4, MOV or AVI up to 500MB</p>
            </motion.div>
          )}

          {file && !complete && (
            <motion.div 
              key="file"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center w-full"
            >
              <FileVideo className="text-indigo-500 w-16 h-16 mb-4" />
              <p className="font-medium text-lg mb-1 truncate max-w-xs">{file.name}</p>
              <p className="text-slate-500 text-xs mb-8">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              
              {uploading ? (
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    className="bg-indigo-500 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              ) : (
                <div className="flex gap-3">
                  <button 
                    onClick={() => setFile(null)}
                    className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <X className="w-4 h-4" /> Remove
                  </button>
                  <button 
                    onClick={handleUpload}
                    className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                  >
                    Upload & Repurpose
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {complete && (
            <motion.div 
              key="complete"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="text-green-500 w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Upload Complete!</h3>
              <p className="text-slate-400 mb-8 max-w-xs">Our AI is now analyzing your video. This usually takes 2-5 minutes.</p>
              <div className="flex items-center gap-3 text-indigo-400 font-medium animate-pulse">
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing your clips...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
