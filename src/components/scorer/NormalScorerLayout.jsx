import { useEffect, useState } from "react";

// Assume these utility functions are already defined
import { generateOverSummary, getScore } from "../ui/utils";

import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/seprator";

import DangerActions from "./DangerActions";
import BallSummary from "./BallSummery";
import ScoreButtons from "../ScorerCardButtons/ScoreButtons";
// import FooterSummary from "../match-stats/FooterSummary";
import ScoreWrapper from "./ScoreDisplay";

function ScorerLayout() {
    const [balls, setBalls] = useState([]);

    const { runs, totalBalls, wickets, extras, runRate } = getScore(balls);

    const { overSummaries, ballLimitInOver } = generateOverSummary(balls);

    const curOverIndex = Math.floor(totalBalls / 6);
    const { runs: curOverRuns, wickets: curOverWickets } = getScore(
        overSummaries[curOverIndex] || []
    );

    useEffect(() => {
        const savedBalls = localStorage.getItem("balls");
        if (savedBalls) {
            setBalls(JSON.parse(savedBalls));
        }
    }, []);

    function handleScore(e) {
        const event = e.currentTarget.value;
        const updatedBalls = [...balls, event];
        setBalls(updatedBalls);
        localStorage.setItem("balls", JSON.stringify(updatedBalls));
    }

    const handleUndo = () => {
        const updatedBalls = balls.slice(0, -1);
        setBalls(updatedBalls);
        localStorage.setItem("balls", JSON.stringify(updatedBalls));
    };

    return (
        <div className="flex justify-center md:p-6">
            <Card className="relative p-2 max-sm:w-full max-sm:border-0 sm:w-96">
                <div className="absolute right-2 top-2">
                    <DangerActions
                        handleRestart={() => {
                            setBalls([]);
                            localStorage.removeItem("balls");
                        }}
                        handleUndo={handleUndo}
                    />
                </div>
                <CardContent className="space-y-4 max-sm:p-0">
                    <ScoreWrapper
                        runs={runs}
                        wickets={wickets}
                        totalBalls={totalBalls}
                        runRate={runRate}
                    />
                    <ul className="flex gap-2 overflow-x-auto">
                        {Array.from({ length: ballLimitInOver }, (_, i) => (
                            <BallSummary key={i} event={overSummaries[curOverIndex]?.[i]} />
                        ))}
                    </ul>

                    {/* <FooterSummary
                        extras={extras}
                        curOverRuns={curOverRuns}
                        curOverWickets={curOverWickets}
                        runRate={runRate}
                        ballEvents={balls}
                    /> */}
                </CardContent>
                <Separator className="my-4" />
                <ScoreButtons handleScore={handleScore} />
            </Card>
        </div>
    );
}

export default ScorerLayout;
