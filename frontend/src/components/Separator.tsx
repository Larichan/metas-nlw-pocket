import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Separator(props: ComponentProps<'div'>) {
    return (
        <div { ...props } className={twMerge(props.className, 'h-px bg-zinc-600')} />
    )
}