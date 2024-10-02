import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FormLabel } from "../ui/form";

function PlayerLabel({
    title,
    isBrightnessDown,
    isOpacityDown,
    isSelected,
    subTitle,
}) {
    return (
        <FormLabel
            className={cn(
                "flex w-full cursor-pointer items-center justify-between rounded bg-muted p-2 text-sm font-normal",
                {
                    "bg-emerald-500 font-black text-emerald-950": isSelected,
                    "opacity-75": isOpacityDown,
                    "brightness-50": isBrightnessDown,
                }
            )}
        >
            <span>{title}</span>
            <span className="whitespace-nowrap">{subTitle}</span>
        </FormLabel>
    );
}

export default PlayerLabel;
