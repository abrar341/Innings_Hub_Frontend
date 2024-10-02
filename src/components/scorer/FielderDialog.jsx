import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/Button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function FieldersDialog({ wicketTypeId, setWicketTypeId, fielders, handleScore }) {
    const [runs, setRuns] = useState(0);

    return (
        <Dialog open={!!wicketTypeId} onOpenChange={() => setWicketTypeId(null)}>
            <DialogContent>
                {fielders?.length ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Who was the fielder?</DialogTitle>
                        </DialogHeader>
                        {Number(wicketTypeId) === 5 && (
                            <>
                                <Label>Runs along with run out</Label>
                                <Input
                                    type="number"
                                    value={runs}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (value < 0) return;
                                        setRuns(value);
                                    }}
                                />
                            </>
                        )}
                        <div className="grid grid-cols-2 gap-2">
                            {fielders.map((fielder) => (
                                <Button
                                    key={fielder.id}
                                    onClick={() => {
                                        handleScore(Number(wicketTypeId), fielder.id, runs);
                                        setWicketTypeId(null);
                                    }}
                                >
                                    {fielder.name}
                                </Button>
                            ))}
                        </div>
                    </>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}

export default FieldersDialog;
