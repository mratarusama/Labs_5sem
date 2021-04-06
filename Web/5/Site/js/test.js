window.addEventListener('load', () => {
  let form = $('form');
  form.find('[name=ans1]')
      .attr('required','true')
      .attr('pattern', '([а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,})');

  let focusInvalid = (e) => {e.target.focus();};
  let checkItem = (e) => { e.target.style.borderColor = e.target.validity.valid?'green':'red'; };

  for(let item of form.serializeArray()){
    $(item).bind = ('invalid', focusInvalid)
        .bind('blur', checkItem)
        .bind('keyup', checkItem);
  }

  form.bind('reset', (e) => {
    for(let item of form.serializeArray()){
      item.style.borderColor = 'black';
    }
  });

});
