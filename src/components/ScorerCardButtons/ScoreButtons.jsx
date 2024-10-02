import { Button } from "../ui/Button";

import NoballPopover from "./NoballPopover";
import WicketPopover from "./WicketPopover";
import ManualScorePopover from "./ManualScorePopover";
import WideballPopover from "./WideballPopover";
import ByesballPopover from "./ByesballPopover";

function ScoreButtons({ handleScore, handleWicket }) {
    const handleWicket1 = true
    return (
        <div className="space-y-4">
            <div className="grid w-full grid-cols-4 justify-center gap-2 overflow-hidden rounded-md">
                <ByesballPopover handleScore={handleScore} />
                <WideballPopover handleScore={handleScore} />
                <NoballPopover handleScore={handleScore} />
                {handleWicket1 ? (
                    <WicketPopover handleWicket={handleWicket} />
                ) : (
                    <Button
                        size="lg"
                        variant="destructive"
                        className="h-20 w-full px-4 text-lg font-bold"
                        value="-1"
                        onClick={handleScore}
                    >
                        OUT
                    </Button>
                )}
            </div>
            <div className="grid grid-cols-4 gap-2">
                <Button
                    className=" h-20 w-full bg-gray-500 text-lg font-bold text-emerald-50 "
                    value="-81"
                    onClick={handleScore}
                >
                    1
                </Button>
                <Button
                    className=" h-20 w-full bg-gray-500 text-lg font-bold text-emerald-50"
                    value="-82"
                    onClick={handleScore}
                >
                    2
                </Button>
                <Button
                    className=" h-20 w-full bg-gray-500 text-lg font-bold text-emerald-50"
                    value="-83"
                    onClick={handleScore}
                >
                    3
                </Button>
                <Button
                    className=" h-20 w-full bg-gray-500 text-lg font-bold text-emerald-50"
                    value="-84"
                    onClick={handleScore}
                >
                    4
                </Button>

            </div>
            <div className="flex w-full justify-center gap-1">
                <Button
                    className="bg-gray-500 h-20 w-full bg-gray-500 text-lg font-bold text-emerald-50 "
                    value="0"
                    onClick={handleScore}
                >
                    Dot
                </Button>
                <Button
                    className="hover:bg-bg-emerald-500 h-20 w-full bg-emerald-500 text-lg font-bold text-emerald-50 "
                    value="4"
                    onClick={handleScore}
                >
                    4
                </Button>
                <Button
                    className="h-20 w-full bg-amber-400 text-lg font-bold text-amber-950 hover:bg-amber-500 text-emerald-50   dark:text-amber-50"
                    value="6"
                    onClick={handleScore}
                >
                    6
                </Button>
            </div>
            <ManualScorePopover handleScore={handleScore} />
        </div>
    );
}

export default ScoreButtons;
