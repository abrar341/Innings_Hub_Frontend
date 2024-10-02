import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { processTeamName } from "@/lib/utils";

import { Dialog, DialogContent } from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { Button } from "../ui/Button";
import { TypographyH3 } from "../ui/typography";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import LoadingButton from "../ui/loading-button";
import PlayerLabel from "./PlayerLabel";

function SelectBowler({
    open,
    setOpen,
    handleUndo,
    curPlayers,
    setCurPlayers,
    isManualMode,
    team,
    handleSelectPlayer,
}) {
    const players = team?.players;

    const schema = z.object({
        playerId: z.string(),
    });

    const defaultBowler = curPlayers.find(
        (player) => player.type === "bowler"
    )?.id;

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            playerId: defaultBowler,
        },
    });

    const queryClient = useQueryClient();

    const isPending = !!queryClient.isMutating({ mutationKey: ["updateMatch"] });

    const { handleSubmit, watch, reset } = form;

    function onSubmit(data) {
        const newBowler = {
            id: data.playerId,
            type: "bowler",
        };

        const newCurPlayers = [
            ...curPlayers.filter((player) => player.type !== "bowler"),
            newBowler,
        ];

        setCurPlayers(newCurPlayers);

        handleSelectPlayer(newCurPlayers, () => {
            setOpen && setOpen(false);
            setTimeout(reset, 500);
        });
    }

    useEffect(() => {
        if (open) {
            reset({
                playerId: defaultBowler,
            });
        }
    }, [open]);

    useEffect(() => {
        watch("playerId");
    }, [watch("playerId")]);

    return (
        <Dialog open={open} onOpenChange={isManualMode ? setOpen : undefined}>
            <DialogContent removeCloseButton>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <TypographyH3 className="text-2xl font-bold">
                            Select Bowler - {processTeamName(team?.name ?? "")}
                        </TypographyH3>
                        {!!curPlayers.find((player) => player.type === "bowler") && (
                            <Button
                                variant={isManualMode ? "ghost" : "destructive"}
                                size={isManualMode ? "icon" : "default"}
                                onClick={
                                    isManualMode ? () => setOpen && setOpen(false) : handleUndo
                                }
                            >
                                {isManualMode ? <X /> : "Undo"}
                            </Button>
                        )}
                    </div>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="playerId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="max-h-96 overflow-auto"
                                            >
                                                {players?.map((player) => {
                                                    const isSelected = field.value?.includes(player.id);
                                                    const isBothSelected = field.value?.length === 1;
                                                    return (
                                                        <FormItem className="space-y-0" key={player.id}>
                                                            <FormControl>
                                                                <RadioGroupItem
                                                                    value={player.id}
                                                                    className="sr-only"
                                                                />
                                                            </FormControl>
                                                            <PlayerLabel
                                                                title={player.name}
                                                                isSelected={isSelected}
                                                                isOpacityDown={isBothSelected && !isSelected}
                                                            />
                                                        </FormItem>
                                                    );
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <LoadingButton loading={isPending} disabled={isPending}>
                                {isPending ? "Submitting" : "Submit"}
                            </LoadingButton>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SelectBowler;
