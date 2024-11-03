
import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { twMerge } from 'tailwind-merge'; // Assuming you are using tailwind-merge
import clsx from 'clsx'; // Assuming you are using clsx


function cn(...inputs) {
    return twMerge(clsx(inputs));
}


const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-gray-900 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(
    ({ className, removeCloseButton, children, ...props }, ref) => (
        <DialogPortal>
            <DialogOverlay />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <DialogPrimitive.Content
                    ref={ref}
                    className={cn(
                        "relative w-full max-w-lg p-6 bg-gray-900/50 dark:bg-gray-900 shadow-lg sm:rounded-lg overflow-y-auto max-h-[80vh]",
                        className
                    )}
                    // Prevent closing the dialog on outside click
                    onInteractOutside={(event) => event.preventDefault()}
                    // Ensure the dialog remains open when clicking outside
                    modal={false}
                    {...props}
                >
                    {children}
                    {!removeCloseButton && (
                        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <Cross2Icon className="w-4 h-4 text-gray-800 dark:text-gray-200" />
                            <span className="sr-only">Close</span>
                        </DialogPrimitive.Close>
                    )}
                </DialogPrimitive.Content>
            </div>
        </DialogPortal>
    )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;




const DialogHeader = ({ className, ...props }) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
};
