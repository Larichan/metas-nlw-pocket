import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentProps<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <input
            { ...props }
            ref={ref}
            className={twMerge(
                props.className,
                'px-4 h-12 bg-black border border-zinc-900 rounded-lg placeholder-zinc-400 outline-none text-sm hover:border-zinc-800 focus-visible:ring-4 ring-pink-500/10'
            )}
        />
    )
})