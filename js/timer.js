import {state} from "./state.js";
import {alarm} from "./alarm.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

const prepareTime =(time)=>{
    return time.toString().length==1?'0'+time:time;
}
const showTime=(seconds)=>{
    minutesElem.textContent = prepareTime(Math.floor(seconds / 60));
    secondsElem.textContent = prepareTime(seconds % 60);
}
export const startTimer = () => {
    state.timeLeft--;
    console.log(state.timeLeft);

    showTime(state.timeLeft);

    if (state.timeLeft > 0 && state.isActive){
        state.timerId = setTimeout(startTimer,1000);
    }

    if (state.timeLeft<=0){
        alarm();
    }
}