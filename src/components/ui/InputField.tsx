import { forwardRef, InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: LucideIcon;
};

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", icon: Icon, ...props }, ref) => {
    return (
      <div className=" group h-full w-full  bg-white flex items-center justify-center px-2 rounded-md hover:ring-2 hover:ring-neutral-400 focus-within:ring-2 focus-within:ring-neutral-900">
        {Icon && <Icon className="h-5 w-5 text-neutral-600" />}
        <input
          ref={ref}
          className={`w-full  rounded-md outline-0 placeholder:text-neutral-600/80. px-4 py-2 placeholder:text-sm text-md ${className}`}
          {...props}
        />
      </div>
    );
  },
);

InputField.displayName = "Input";

export default InputField;
