import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    disabled,
    ...props
}, ref) => {
    return (
        <input
            type={type}
            className={twMerge("flex w-full rounded-md bg-neutral-700 p-2 border border-transparent text-sm file:bg-transparent file:border-0 file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none", className)}
            disabled={disabled}
            ref={ref}
            {...props}
        />
    );
})

Input.displayName = 'Input';

export default Input;