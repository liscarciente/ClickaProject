// import React from "react";
// import clsx from "clsx";
// import { useTheme } from "../themeConfig";

// export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
//   dir?: "rtl" | "ltr";
//   className?: string; //כדי להוסיך עיצובים בקומפוממטת הבן 
//   "data-testid"?: string; //  בלי טעויות הוספה אופציונלית: כדי לאתר אותו יותר בקלות וביעילות 
// }

// export const Form: React.FC<FormProps> = ({
//   children,
//   className,
//   dir,
//   "data-testid": testId,
//   ...props
// }) => {
//   const theme = useTheme();
//   const effectiveDir = dir || theme.direction;

//   return (
//     <form
//       dir={effectiveDir}
//       data-testid={testId}
//       className={clsx(
//         "space-y-4 p-4 rounded shadow-md",
//         effectiveDir === "rtl" ? "text-right" : "text-left",
//         className
//       )}
//       style={{
//     //   backgroundColor: color, 
//       fontFamily:
//         effectiveDir === "rtl"
//           ? theme.typography.fontFamily.hebrew
//           : theme.typography.fontFamily.latin,
//     }}
//       {...props}
//     >
//       {children}
//     </form>
//   );
// };
// components/ui/Form.tsx
import React from "react";
import clsx from "clsx";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
//מייבים את ZOD כדי שנוכל להשתמש בולידציות בהמשך הקוד 
import { useTheme } from "../themeConfig";
import { useTranslation } from "react-i18next";
//מגדירים את ז ה לתרגום הFORM 

// import { AlertCircle } from "lucide-react"; // 


export interface BaseComponentProps {
  className?: string;
  dir?: "rtl" | "ltr";
  "data-testid"?: string;
  children?: React.ReactNode;
}


export interface FormComponentProps<T extends FieldValues>
  extends BaseComponentProps {
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  schema: ZodType<T>;//סכמה לולידציות של FORM 
  onSubmit: SubmitHandler<T>; //פונקציה להפעלה בשליחת הטופס 
}

export function Form<T extends FieldValues>({
    //מגדירים אותו גנרי כדי שנוכל להשתמש בו עם כל מיני טיפוסים כמו USER,PRODUCT וכו 
  label,
  schema,
  onSubmit,
  className,
  dir,
  "data-testid": testId,
  children,
}: FormComponentProps<T>) {
  const theme = useTheme();
  const { t } = useTranslation(); 
  const effectiveDir = dir || theme.direction;

  const methods: UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    //מתי שלוחצים על הONSUBMIT אז ישר בודק לי את הולידציה של הטופס בזכות הZOD 
  });

  return (
    <FormProvider {...methods}>
        {/* //משתמשים בזה כדי שנוכל להשתמש ולהכניס לפה את הקומפוננטות האחרות שגם כן קשורות לטופס וזה עוזר כדי שלא נצטרך להעתיק את כל הPROPS  */}
      <form
        dir={effectiveDir}
        data-testid={testId}
        onSubmit={methods.handleSubmit(onSubmit)}
        className={clsx(
         "grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded shadow-md w-full max-w-4xl",
          effectiveDir === "rtl" ? "text-right" : "text-left",
          className
        )}
        style={{
          fontFamily:
            effectiveDir === "rtl"
              ? theme.typography.fontFamily.hebrew
              : theme.typography.fontFamily.latin,
        }}
        role="form"
        aria-label={t(label)} //שיקרא את הכותרת של הטופס 
      >
        <h2 className="text-xl font-semibold mb-4">{t(label)}</h2>

        {/* Contenedor para errores generales del formulario */}
        {methods.formState.errors.root && (
          <div
            className="text-red-600 text-sm mb-2"
            role="alert"
            aria-live="assertive"
            //אם יש שגיעה גלובלית בעל הטופס, לא משהו מדויק וקטן מראה את זה פה בעזרת הASSERTIVE 
          >
            {methods.formState.errors.root.message}
          </div>
        )}

      {/* <Input name="email" label="Email" />
      <Checkbox name="accept" label="Acepto los términos" /> */}
      {/* //דוגמא לשימוש של הקומפוננטות האחרות */}

        {children}
      </form>
    </FormProvider>
  );
}
