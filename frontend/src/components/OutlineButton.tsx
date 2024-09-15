import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function OutlineButton(props: ComponentProps<'button'>) {
    return (
        <button
            { ...props }
            className={twMerge(
                props.className,
                'flex items-center px-3 py-2 gap-2 leading-none rounded-full border border-dashed border-zinc-800 text-sm text-zinc-400 hover:border-pink-700 hover:text-pink-700 disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:border-pink-500 ring-pink-500/10 focus-visible:ring-4'
            )}
        />
    )
}