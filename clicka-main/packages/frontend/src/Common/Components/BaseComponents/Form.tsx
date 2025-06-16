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
import { useTheme } from "../themeConfig";

// Interfaces base
export interface BaseComponentProps {
  className?: string;
  dir?: "rtl" | "ltr";
  "data-testid"?: string;
  children?: React.ReactNode;
}

// Props del componente de formulario
export interface FormComponentProps<T extends FieldValues>
  extends BaseComponentProps {
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  schema: ZodType<T>;
  onSubmit: SubmitHandler<T>;
}

export function Form<T extends FieldValues>({
  label,
  schema,
  onSubmit,
  className,
  dir,
  "data-testid": testId,
  children,
}: FormComponentProps<T>) {
  const theme = useTheme();
  const effectiveDir = dir || theme.direction;

  const methods: UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  return (
    <FormProvider {...methods}>
      <form
        dir={effectiveDir}
        data-testid={testId}
        onSubmit={methods.handleSubmit(onSubmit)}
        className={clsx(
          "space-y-4 p-4 rounded shadow-md w-full max-w-md",
          effectiveDir === "rtl" ? "text-right" : "text-left",
          className
        )}
        style={{
          fontFamily:
            effectiveDir === "rtl"
              ? theme.typography.fontFamily.hebrew
              : theme.typography.fontFamily.latin,
        }}
      >
        <h2 className="text-xl font-semibold mb-4">{label}</h2>
        {children}
      </form>
    </FormProvider>
  );
}
