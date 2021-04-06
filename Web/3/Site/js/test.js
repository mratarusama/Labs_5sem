window.onload = () => {
  let form = document.forms[0];
  form.ans1.required = true;
  form.fio.required = true;
  form.fio.pattern = '([а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,})';

  let focusInvalid = (e) => {e.target.focus();};
  let checkItem = (e) => { e.target.style.borderColor = e.target.validity.valid?'green':'red'; };

  for(let item of form.elements){
    item.addEventListener('invalid', focusInvalid);

    item.addEventListener('blur', checkItem);
    item.addEventListener('keyup', checkItem);
  }

  form.addEventListener('reset', (e) => {
    for(let item of e.target.elements){
      item.style.borderColor = 'black';
    }
  });
};
