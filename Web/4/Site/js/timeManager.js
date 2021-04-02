let timer = null;
let timerText = $('#timer');
let weekDaysRU = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

let zeroFormat = function(i) {
    return i<10?'0'+i:i;
}

let showTime = function() {
    let time = new Date();
    timerText.text(zeroFormat(time.getHours()) + ':' + zeroFormat(time.getMinutes()) + ':'
        + zeroFormat(time.getSeconds()) + ' | ' + zeroFormat(time.getDay()) + '-' + zeroFormat(time.getMonth())
        + '-' + time.getFullYear() + ' ' + weekDaysRU[time.getDay()]);
}

export let startTimeCounter = function(){
    if(!timer) {
        showTime();
        timer = setInterval(showTime, 1000);
    }
}

export let stopTimeCounter = function(){
    if(timer) {
        clearInterval(timer);
        timer = null;
    }
}