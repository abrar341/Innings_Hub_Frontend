import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { invalidBalls } from "./constants";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const getIsInvalidBall = (ball) =>
    !invalidBalls.includes(ball) && !ball.includes("-3") && !ball.includes("-2");


export {
    cn, getIsInvalidBall
}