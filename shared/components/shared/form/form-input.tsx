import React from "react";
import {
  ClearButton,
  ErrorText,
  RequiredSymbol,
} from "@/shared/components/shared";
import { Input } from "@/shared/components/ui";
import { useFormContext } from "react-hook-form";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...props} />
        <ClearButton />
      </div>

      <ErrorText text={errorText} className="mt-2" />
    </div>
  );
};

export default FormInput;
