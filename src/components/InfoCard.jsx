import React from "react";

export default function InfoCard({ children, className = "" }) {
  return (
    <div className={`rounded-[1.75rem] border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}
