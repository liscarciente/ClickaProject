import React from "react";
import clsx from "clsx";
import { useTheme } from "../themeConfig";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; //מה שיהיה מעל הINPUT 
  error?: string; //הודענ אם משהו לא תקין 
  required?: boolean; //אם הדברים הם חובה 
  dir?: 'rtl' | 'ltr';
  className?: string;
  'data-testid'?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  required,
  dir,
  className,
  'data-testid': testId,
  // זה כל בבגדרות בחשובות 
  ...props //זה כל שער ההגדרות שנשתמש בהם בהמשך אבל לא עיקריות 
}) => {
  const theme = useTheme();
  const effectiveDir = dir || theme.direction;

  return (
    <div className="space-y-1" dir={effectiveDir}> 
    {/* // מוסיף מקום בין האלאמטים CHILDREN */}
      <label className="block text-sm font-medium">
        {label} 
        {/* //איפה שהדברים יהו כתובים  */}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        data-testid={testId}
        className={clsx(
          "w-full px-3 py-2 border rounded focus:outline-none focus:ring-2",
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-blue-300",
          className
        )} 
        //פה מגדירים את הSTYLE תלוי במה שמכניסים 
        aria-invalid={!!error}
        aria-required={required}
        aria-label={label}
    //את הARIA משתמשים לאנשים עם מוגבלות כל פעם שיש לי ERROR אז מראה לי את זה בצורה שיהיה להם קל לזהותו 
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {/* // אם יש ERROR אז מראה את זה מתחט לTEXT  */}
    </div>
  );
};
