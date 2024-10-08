import { getOverStr, processTeamName } from "../ui/utils";
import { Separator } from "../ui/seprator";
import { TypographyH2 } from "../ui/typography";

function ScoreDisplay({ inning, totalOves, inningNumber }) {
    const runs = inning?.runs;
    const wickets = inning?.wickets;
    const teamName = inning?.team?.shortName;

    const lastOverIndex = inning?.overs?.length ? inning.overs.length - 1 : 0;
    const lastOver = inning?.overs?.[lastOverIndex];

    const lastBallIndex = lastOver?.balls?.length ? lastOver.balls.length - 1 : 0;
    const lastBall = lastOver?.balls?.[lastBallIndex];
    const lastBallNumber = lastBall?.ballNumber || 0;

    // const calculateRunRate = async (runs, lastOver, lastBall) => {
    //     console.log(runs, lastOver, lastBall);

    //     const totalOvers = lastOver + lastBall / 6;
    //     const runRate = runs / totalOvers;
    //     return runRate.toFixed(2); // rounded to 2 decimal places
    // };




    // console.log(runs, over, lastBallNumber);

    // const runRate = calculateRunRate(runs, over, lastBall);
    return (
        <>
            <div className={`relative   ${inningNumber === 1 ? "border-r-2" : ""}  flex items-end justify-center px-2 py-4`}>
                <TypographyH2 className=" left-0">
                    {/* {processTeamName(curTeam ?? "TEAM 1")} */}
                    {teamName}
                </TypographyH2>
                <div>
                    <h2 className="mb-3 text-center text-6xl font-semibold tabular-nums">
                        {/* {runs}/{wickets} */}
                        {runs}/{wickets}
                    </h2>
                    <div className="flex items-center justify-center text-center text-base font-medium text-muted-foreground md:text-lg">
                        {/* <span>({getOverStr(totalBalls)})</span> */}
                        <span>{lastOver ? (
                            <>{lastOver.overNumber - 1}</>) : 0}.{lastBallNumber || 0}/{totalOves}</span>
                        <Separator
                            orientation="vertical"
                            className="mx-2 h-6 bg-muted-foreground"
                        />

                        {/* <span>RR: {runRate}</span> */}

                    </div>
                </div>
            </div>



        </>

    );
}

export default ScoreDisplay;
