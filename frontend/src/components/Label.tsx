import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Label(props: ComponentProps<'label'>) {
    return (
        <label
            { ...props }
            className={twMerge(
                props.className,
                'font-medium text-sm tracking-tight leading-normal'
            )}
        />
    )
}