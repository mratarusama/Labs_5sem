window.onload = () => {
  form = document.forms[0]
  form.ans1.required = true;
  form.fio.required = true;
  form.fio.pattern = '([а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,})';

  for(let item of form.elements){
    item.oninvalid = (invalid) => {invalid.target.focus()}
  }
}
