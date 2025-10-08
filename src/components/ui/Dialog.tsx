import { useEffect, useCallback, forwardRef, useId } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

// Type for root dialog props
export type DialogRootProps = {
    isOpen: boolean;
    onClose: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'role' | 'aria-modal'>;

// Type for dialog content component
export type DialogContentProps = {
    title?: React.ReactNode;
    description?: React.ReactNode;
} & DialogRootProps;

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[calc(100vw-2rem)]'
} as const;

function useDialog() {
    const titleId = useId();
    const descriptionId = useId();

    return {
        titleId,
        descriptionId,
    };
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
    function DialogContent({
        isOpen,
        onClose,
        title,
        description,
        size = 'md',
        className,
        children,
        ...props
    }, ref) {
        const { titleId, descriptionId } = useDialog();

        useEffect(() => {
            const originalOverflow = document.body.style.overflow;

            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = originalOverflow;
            }

            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }, [isOpen]);

        const handleBackdropClick = useCallback((e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }, [onClose]);

        if (!isOpen) return null;

        return (
            <div
                className={cn(
                    'fixed inset-0 z-50',
                    'flex items-center justify-center',
                    'overflow-y-auto overflow-x-hidden',
                    'bg-background/80 backdrop-blur-sm'
                )}
                onClick={handleBackdropClick}
                role="dialog"
                aria-labelledby={title ? titleId : undefined}
                aria-describedby={description ? descriptionId : undefined}
                aria-modal="true"
            >
                <div
                    ref={ref}
                    className={cn(
                        'relative w-full m-4',
                        'animate-in fade-in-0 zoom-in-95 duration-300',
                        sizeClasses[size],
                        className
                    )}
                    {...props}
                >
                    <div className="relative rounded-lg border bg-background shadow-lg">
                        <button
                            onClick={onClose}
                            className={cn(
                                'absolute right-4 top-4 rounded-sm opacity-70',
                                'transition-opacity hover:opacity-100',
                                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                                'disabled:pointer-events-none'
                            )}
                            type="button"
                            aria-label="Close dialog"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>

                        <div className="p-6">
                            {title && (
                                <div className="mb-4">
                                    <h2
                                        id={titleId}
                                        className="text-lg font-semibold leading-none tracking-tight"
                                    >
                                        {title}
                                    </h2>
                                    {description && (
                                        <p
                                            id={descriptionId}
                                            className="mt-1.5 text-sm text-muted-foreground"
                                        >
                                            {description}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className={cn('relative', !title && 'pt-2')}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export const DialogHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function DialogHeader({ className, ...props }, ref) {
        return (
            <div
                ref={ref}
                className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
                {...props}
            />
        );
    }
);

export const DialogFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function DialogFooter({ className, ...props }, ref) {
        return (
            <div
                ref={ref}
                className={cn(
                    'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
                    className
                )}
                {...props}
            />
        );
    }
);

export const DialogTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    function DialogTitle({ className, children, ...props }, ref) {
        return (
            <h3
                ref={ref}
                className={cn('text-base font-semibold leading-none tracking-tight', className)}
                {...props}
            >
                {children}
            </h3>
        );
    }
);

// Alias for backward compatibility
export const Dialog = {
    Content: DialogContent,
    Header: DialogHeader,
    Footer: DialogFooter,
    Title: DialogTitle,
};