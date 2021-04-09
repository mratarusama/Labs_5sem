###
# Welcome to the new js2coffee 2.0, now
# rewritten to use the esprima parser.
# try it out!
###

month_ru = [
  'Январь'
  'Февраль'
  'Март'
  'Апрель'
  'Май'
  'Июнь'
  'Июль'
  'Август'
  'Сентябрь'
  'Октябрь'
  'Ноябрь'
  'Декабрь'
]
i = undefined

draw_month = (d, days_in_month) ->
  day = 1
  d++
  i = 0
  while i < 6
    j = 0
    while j < 7
      if d > 1
        d--
        document.getElementById('td-' + i + '-' + j).innerHTML = '•'
      else if days_in_month > 0
        document.getElementById('td-' + i + '-' + j).innerHTML = '<a href="#" onclick="select_date(' + day + ');return false;">' + day + '</a>'
        day++
        days_in_month--
      else
        document.getElementById('td-' + i + '-' + j).innerHTML = '•'
      j++
    i++
  return

select_date = (day) ->
  year = document.getElementById('year-select').value
  month = document.getElementById('year-selection').value
  document.getElementById('date-value').innerHTML = day + '.' + month + '.' + year
  return

change_date = ->
  year = document.getElementById('year-select').value
  month = document.getElementById('year-selection').value
  d = new Date(year, month - 1, 0)
  draw_month d.getDay(), new Date(year, month, 0).getDate()
  return

i = 1
while i <= 12
  document.getElementById('year-selection').innerHTML += '<option value="' + i + '">' + month_ru[i - 1] + '</option>'
  i++
i = 1940
while i <= 2020
  document.getElementById('year-select').innerHTML += '<option value="' + i + '">' + i + '</option>'
  i++
calendarBody = document.getElementById('calendar-body')
tdTag = undefined
trTag = undefined
i = 0
while i < 6
  trTag = document.createElement('tr')
  j = 0
  while j < 7
    tdTag = document.createElement('td')
    tdTag.id = 'td-' + i + '-' + j
    tdTag.innerText = '•'
    trTag.appendChild tdTag
    j++
  calendarBody.appendChild trTag
  i++
draw_month 0, 31
select_date 1

document.getElementById('year-select').onchange = (event) ->
  change_date()
  return

document.getElementById('year-selection').onchange = (event) ->
  change_date()
  return