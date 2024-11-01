import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Loader2 } from "lucide-react";

function AlertNote({ open, setOpen, onConfirm, content, isLoading = false }) {
  useEffect(() => {
    if (!isLoading) setOpen(false);
  }, [isLoading, setOpen]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-md w-full p-6 rounded-lg bg-white dark:bg-gray-800 shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-gray-800 dark:text-white">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-500 dark:text-gray-300 mt-2">
            {content}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end space-x-4 mt-4">
          <AlertDialogCancel className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150">
            Cancel
          </AlertDialogCancel>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`min-w-[120px] flex items-center justify-center px-4 py-1 rounded-lg bg-green-600 text-white dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 transition duration-150 ${isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" strokeWidth={3} />
            ) : (
              "Yes, I'm sure"
            )}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertNote;
