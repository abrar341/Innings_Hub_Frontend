import { useEffect, useState } from "react";
import { toast } from "sonner";

import { generateOverSummary, getScore, calcRuns } from "../ui/utils";
import { strikeChangers } from "../ui/constants";

import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/seprator";
import DangerActions from "./DangerActions";
import ScoreDisplay from "./ScoreDisplay";
import BallSummary from "./BallSummery";
import ScoreButtons from "../ScorerCardButtons/ScoreButtons";
import BowlerScores from "../player-scores/BowlerScores";
import BatsmanScores from "../player-scores/BatsmanScores";
// import Tools from "../match-stats/Tools";
import FieldersDialog from "./FielderDialog";
// import MatchSummary from "./MatchSummery";
import TargetInfo from "./TargetInfo";
import ScoreButtonsSkeleton from "../ScorerCardButtons/ScoreButtonsSkeleton";

function ScorerLayout1({ matchId, match }) {
    const ballEventsFromMatch = match?.ballEvents;

    const team = match?.teams[match?.curTeam];
    const opposingTeam = match?.teams[match?.curTeam === 0 ? 1 : 0];

    const teamPlayerIds = team?.players.map((player) => player.id);

    // ** States
    const [curPlayers, setCurPlayers] = useState(match?.curPlayers || []);
    const [events, setEvents] = useState(ballEventsFromMatch || []);
    const [isModified, setIsModified] = useState(false);
    const [onStrikeBatsman, setOnStrikeBatsman] = useState(0);
    const [isInSecondInning, setIsInSecondInning] = useState(false);
    const [showScorecard, setShowScorecard] = useState(false);
    const [showMatchSummary, setShowMatchSummary] = useState(false);
    const [showSelectBatsman, setShowSelectBatsman] = useState(false);
    const [showSelectBowler, setShowSelectBowler] = useState(false);
    const [wicketTypeId, setWicketTypeId] = useState(null);

    const balls = events
        ?.filter((event) => teamPlayerIds.includes(event.batsmanId))
        .map((event) => event.type) || [];

    const { runs, totalBalls, wickets, runRate } = getScore(balls || []);

    const opponentEvents = events?.filter((event) =>
        teamPlayerIds.includes(event.bowlerId),
    );
    const opponentRuns = calcRuns(
        events
            ?.filter((event) => teamPlayerIds.includes(event.bowlerId))
            .map((event) => event.type),
    );

    // ** Effects
    useEffect(() => {
        if (ballEventsFromMatch?.length) setEvents(ballEventsFromMatch);
    }, [ballEventsFromMatch]);

    useEffect(() => {
        if (match?.strikeIndex) setOnStrikeBatsman(match.strikeIndex || 0);
    }, [match?.strikeIndex]);

    useEffect(() => {
        if (match?.curPlayers) setCurPlayers(match.curPlayers);
    }, [match?.curPlayers]);

    useEffect(() => {
        if (!match?.hasEnded) {
            const getHasPlayer = (type) =>
                (curPlayers.length ? curPlayers : match?.curPlayers)?.some(
                    (player) => player.type === type,
                );

            const hasBatsman = getHasPlayer("batsman");
            if (!hasBatsman) setShowSelectBatsman(true);

            const hasBowler = getHasPlayer("bowler");
            if (!hasBowler) setShowSelectBowler(!hasBowler && !showSelectBatsman);
        }
    }, [showSelectBatsman, match?.hasEnded]);

    useEffect(() => {
        const isLastBallOfOver = totalBalls % 6 === 0 && totalBalls > 0;
        if (
            isLastBallOfOver &&
            curPlayers.filter((player) => player.type === "batsman").length === 2
        )
            changeStrike();
    }, [totalBalls]);

    useEffect(() => {
        const playerIds = new Set(teamPlayerIds);
        for (const event of events) {
            if (!playerIds.has(event.batsmanId)) {
                setIsInSecondInning(true);
                break;
            }
        }
    }, [events]);

    useEffect(() => {
        const matchBalls = (match?.overs || 0) * 6;
        const isLastBallOfOver = totalBalls % 6 === 0 && totalBalls > 0;

        if (isLastBallOfOver) {
            if (matchBalls !== totalBalls) setShowSelectBowler(true);
            if (totalBalls === matchBalls && totalBalls) {
                if (isInSecondInning || match?.hasEnded) handleFinish();
                else handleInningChange();
            }
        }
    }, [totalBalls]);

    useEffect(() => {
        const remainingRuns = opponentRuns - runs + 1;
        if (!opponentEvents.length) return;
        if (remainingRuns <= 0) handleFinish();
    }, [runs, opponentRuns]);

    useEffect(() => {
        const isAllOut =
            wickets ===
            (team?.players.length || 0) - (match?.allowSinglePlayer ? 0 : 1);

        if (isAllOut) {
            if (isInSecondInning || match?.hasEnded) handleFinish();
            else {
                toast.info("All out!");
                handleInningChange();
            }
        }
    }, [wickets, match?.hasEnded]);

    // ** Over Summary
    const { overSummaries, ballLimitInOver } = generateOverSummary(balls);
    const curOverIndex = Math.floor(totalBalls / 6);

    // ** Handlers
    function changeStrike() {
        setOnStrikeBatsman((prev) => (prev === 0 ? 1 : 0));
    }

    function handleStrikeChange(ballEventType) {
        if (
            strikeChangers.includes(ballEventType) &&
            curPlayers.filter((player) => player.type === "batsman").length === 2
        )
            changeStrike();
    }

    function handleFinish() {
        toast.success("Match finished");
        // Additional finish handling logic
    }

    function handleInningChange() {
        toast.info("Innings changed");
        // Additional inning change logic
    }

    return (
        <div className="flex justify-center md:p-6">
            <Card className="relative p-2 max-sm:w-full max-sm:border-0 sm:w-96">
                <div className="absolute right-2 top-2">
                    <DangerActions
                        handleRestart={() => setEvents([])}
                        handleUndo={() => setEvents((prev) => prev.slice(0, -1))}
                    />
                </div>
                <CardContent className="space-y-4 max-sm:p-0">
                    <ScoreDisplay
                        runs={runs}
                        wickets={wickets}
                        totalBalls={totalBalls}
                        runRate={runRate}
                        curTeam={team?.name}
                    />
                    <ul className="flex justify-center items-center gap-2 overflow-x-auto">
                        {Array.from({ length: ballLimitInOver }, (_, i) => (
                            <BallSummary key={i} event={overSummaries[curOverIndex]?.[i]} />
                        ))}
                    </ul>
                    <BatsmanScores curPlayers={curPlayers} />
                    <BowlerScores curPlayers={curPlayers} />
                </CardContent>
                <Separator className="my-4" />
                <ScoreButtons handleScore={() => { }} />
            </Card>
        </div>
    );
}

export default ScorerLayout1;
