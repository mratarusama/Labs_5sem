window.addEventListener('load', () => {
  let form = $('form');
  form.find('[name=ans1]')
      .attr('required','true')
      .attr('pattern', '([а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,})');

  for(let item of form.serializeArray()){
    $(item).bind = ('invalid', (invalid) => {invalid.target.focus();})
  }
});
