
import React from 'react';
import { FORM_STEPS } from '../constants';

interface StepProgressProps {
  currentStep: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
  return (
    <div className="w-full py-6 mb-10 hidden md:block">
      <div className="flex justify-between items-start relative px-4">
        {/* Background line */}
        <div className="absolute top-6 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full" />
        
        {/* Active line */}
        <div 
          className="absolute top-6 left-0 h-1 bg-gradient-to-r from-[#1d5ba5] to-[#f19020] transition-all duration-500 -z-10 rounded-full shadow-[0_0_10px_rgba(29,91,165,0.3)]" 
          style={{ width: `${(currentStep / (FORM_STEPS.length - 1)) * 100}%` }}
        />

        {FORM_STEPS.map((step, idx) => {
          const isActive = idx <= currentStep;
          const isCurrent = idx === currentStep;
          
          return (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div 
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border-4 transition-all duration-300 transform ${
                  isCurrent ? 'scale-110 shadow-lg' : ''
                } ${
                  idx < currentStep 
                    ? 'bg-[#1d5ba5] border-[#1d5ba5] text-white' 
                    : isCurrent
                      ? 'bg-white border-[#f19020] text-[#f19020] font-black'
                      : 'bg-white border-slate-100 text-slate-300'
                }`}
              >
                {idx < currentStep ? (
                  <i className="fa-solid fa-check text-xl"></i>
                ) : (
                  <span className="text-lg font-black">{idx + 1}</span>
                )}
              </div>
              <span 
                className={`mt-3 text-[10px] uppercase font-bold text-center px-2 tracking-wide leading-tight transition-colors duration-300 ${
                  isActive ? 'text-slate-800' : 'text-slate-300'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;