import { ComponentProps, forwardRef } from "react"
import { tv, VariantProps } from "tailwind-variants"

const button = tv({
    base: 'rounded-lg justify-center flex items-center gap-2 text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2',
    variants: {
        variant: {
            primary: 'bg-pink-500 text-pink-50 hover:bg-pink-600',
            disabled: 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800',
            close: 'bg-red-600 text-pink-50 hover:bg-red-800'
        },
        size: {
            sm: 'px-3 py-1.5',
            default: 'px-4 py-2.5'
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'default'
    }
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
            className={button({ className, variant, size })}
            ref={ref}
            {...props}
            />
        )
    }
)