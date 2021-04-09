window.addEventListener 'load', ->
  form = $('form')
  form.find('[name=ans1]').attr('required', 'true').attr 'pattern', '([а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,})'

  focusInvalid = (e) ->
    e.target.focus()
    return

  checkItem = (e) ->
    e.target.style.borderColor = if e.target.validity.valid then 'green' else 'red'
    return

  for item of form.serializeArray()
    $(item).bind('invalid', focusInvalid).bind('blur', checkItem).bind 'keyup', checkItem
  form.bind 'reset', (e) ->
    `var item`
    for item of form.serializeArray()
      item.style.borderColor = 'black'
    return
  return