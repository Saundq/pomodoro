import {state} from "./state.js";
import {alarm} from "./alarm.js";
import {prepareTime} from "./utils.js";
import {changeActiveBtn} from "./control.js";
import {showTodo, updateTodo} from "./todo.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

export const showTime=(seconds)=>{
    minutesElem.textContent = prepareTime(Math.floor(seconds / 60));
    secondsElem.textContent = prepareTime(seconds % 60);
}
export const startTimer = () => {
    const countDown = new Date().getTime()+state.timeLeft*1000;
    state.timerId = setInterval(()=>{
        state.timeLeft-=5;
        console.log(state.timeLeft);
        document.title = state.timeLeft;
        if(!(state.timeLeft%5)){
            const now = new Date().getTime();
            state.timeLeft = Math.floor((countDown - now)/1000);

            console.log('asinc time');
        }
        showTime(state.timeLeft);
        if (state.timeLeft > 0 && state.isActive){
            return
        }

            if (state.status === 'work') {
                state.activeTodo.pomodoro+=1;
                updateTodo(state.activeTodo);
                showTodo();
                if(state.activeTodo.pomodoro % state.count){
                    state.status = 'break'
                }else {
                    state.status = 'relax'
                }
                state.status = 'break'
            } else {
                state.status = 'work'
            }
            alarm();
            state.timeLeft = state[state.status] * 60;
            console.log(state.activeTodo);
            changeActiveBtn(state.status);
            startTimer();

    },1000)


    // if (state.timeLeft > 0 && state.isActive){
    //     state.timerId = setTimeout(startTimer,1000);
    // }

}