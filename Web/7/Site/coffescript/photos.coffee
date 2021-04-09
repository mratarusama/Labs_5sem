black = $('#black-block')
img = $('<img/>')
i = 0
fotos = [
  './img/cat1.png'
  './img/cat2.png'
  './img/cat3.png'
  './img/cat4.png'
  './img/cat5.png'
  './img/cat6.png'
  './img/cat7.png'
  './img/cat8.png'
  './img/cat9.png'
  './img/cat10.png'
  './img/cat11.png'
  './img/cat12.png'
  './img/cat13.png'
  './img/cat14.png'
  './img/cat15.png'
]
titles = [
  'Картинка 1'
  'Картинка 2'
  'Картинка 3'
  'Картинка 4'
  'Картинка 5'
  'Картинка 6'
  'Картинка 7'
  'Картинка 8'
  'Картинка 9'
  'Картинка 10'
  'Картинка 11'
  'Картинка 12'
  'Картинка 13'
  'Картинка 14'
  'Картинка 15'
]

imgClick = (index) ->
  console.log index
  if(!index)
    i = @src
    if(Object.is(i, undefined ))
        i = img.attr('src')
    i = i.slice(-6).slice(0, 2)
    i = parseInt(i) | parseInt(i.slice(1))
  else
    i = index
  black.show(1000).append img.show(1000).attr('src', fotos[i - 1]).attr('alt', titles[i - 1]).attr('title', titles[i - 1])
  return

clickNext = ->
  if i < 15
    i++
    img.hide 300
    setTimeout (->
      imgClick i
      return
    ), 300
  return

clickBack = ->
  if i > 1
    i--
    img.hide 300
    setTimeout (->
      imgClick i
      return
    ), 300
  return

whiteFunction = ->
  img.hide 1000
  black.hide 1000
  return

$('img').each (i, e) ->
  #$(e).attr 'onclick', 'imgClick(' + i + ')'
  $(e).bind 'click', imgClick
  return
$('#next-button').bind 'click', clickNext
$('#back-button').bind 'click', clickBack
$('#hide-button').bind 'click', whiteFunction