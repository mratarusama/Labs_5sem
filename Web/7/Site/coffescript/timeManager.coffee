timer = null
timerText = $('#timer')
weekDaysRU = [
  'Воскресенье'
  'Понедельник'
  'Вторник'
  'Среда'
  'Четверг'
  'Пятница'
  'Суббота'
]

zeroFormat = (i) ->
  if i < 10 then '0' + i else i

showTime = ->
  time = new Date
  timerText.text zeroFormat(time.getHours()) + ':' + zeroFormat(time.getMinutes()) + ':' + zeroFormat(time.getSeconds()) + ' | ' + zeroFormat(time.getDay()) + '-' + zeroFormat(time.getMonth()) + '-' + time.getFullYear() + ' ' + weekDaysRU[time.getDay()]
  return

export startTimeCounter = ->
  if !timer
    showTime()
    timer = setInterval(showTime, 1000)
  return

export stopTimeCounter = ->
  if timer
    clearInterval timer
    timer = null
  return