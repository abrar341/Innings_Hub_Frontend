import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { invalidBalls } from "./constants";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const getIsInvalidBall = (ball) =>
    !invalidBalls.includes(ball) && !ball.includes("-3") && !ball.includes("-2");

function getOverStr(numBalls) {
    return `${Math.floor(numBalls / 6)}${numBalls % 6 ? `.${numBalls % 6}` : ""}`;
}
function processTeamName(input) {
    const words = input.trim().split(/\s+/);

    if (words.length === 1) return input.substring(0, 3);
    else {
        let initials = "";
        words.forEach((word) => (initials += word[0]));
        return initials;
    }
}
function generateOverSummary(ballEvents) {
    let ballLimitInOver = 6;
    const overSummaries = [];
    let validBallCount = 0;
    let currentOver = [];

    for (const ballEvent of ballEvents) {
        const isInvalidBall = getIsInvalidBall(ballEvent);
        currentOver.push(ballEvent);
        if (isInvalidBall) {
            validBallCount++;
            if (validBallCount === 6) {
                overSummaries.push(currentOver);
                currentOver = [];
                validBallCount = 0;
                ballLimitInOver = 6;
            }
        } else if (ballLimitInOver !== undefined) {
            ballLimitInOver++;
        }
    }

    if (validBallCount >= 0 && currentOver.length > 0) {
        overSummaries.push(currentOver);
    }

    return { overSummaries, ballLimitInOver };
}
function getScore(balls, forPlayerRuns) {
    // const runs = calcRuns(balls, forPlayerRuns);
    // const totalBalls = balls?.filter(
    //     (ball) => ball !== "-4" && getIsInvalidBall(ball),
    // ).length;
    // const wickets = calcWickets(balls);
    // const runRate = Number(totalBalls ? ((runs / totalBalls) * 6).toFixed(2) : 0);

    // const extras = balls
    //     .filter(
    //         (ball) =>
    //             ball.includes("-2") || ball.includes("-3") || ball.includes("-5"),
    //     )
    //     .map((event) =>
    //         event.includes("-5")
    //             ? Number(event.slice(2)).toString()
    //             : event.includes("-2")
    //                 ? (Number(event.slice(2)) + Number(!forPlayerRuns)).toString()
    //                 : event.includes("-3")
    //                     ? "1"
    //                     : "1",
    //     )
    //     .reduce((acc, cur) => acc + Number(cur), 0);
    // return { runs, totalBalls, wickets, runRate, extras };
    return 0;
}

function getBattingStats() {

}
function calcRuns() {

}
export {
    cn, getIsInvalidBall, calcRuns, getOverStr, processTeamName, generateOverSummary, getScore, getBattingStats
}