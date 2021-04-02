window.addEventListener('load', () => {
  let form = document.forms[0];
  form.fio.required = true;
  form.fio.pattern = '([а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,})';

  for(let item of form.elements){
    if(item.tagName === 'INPUT' && item.className !== 'button') {
      item.addEventListener('invalid', (invalid) => {
        invalid.target.focus();
      });
      item.addEventListener('focusout', (e) => {
        e.target.style.borderColor = e.target.validity.valid ? 'green' : 'red';
      })
      item.style.borderColor = 'black';
    }
  }

  form.phone.pattern = '^\\+((\\d{11})|(\\d{9}))';
  form.phone.value = '+';
  form.phone.addEventListener('keydown', (event) => {
    let key = event.key;
    let input = event.target;
    if(!isNaN(parseInt(key))){
      if(input.value.length === 1){
        if(key !== '7' && key !== '3'){
          event.preventDefault();
        }
      }

      let startPos = input.selectionStart;
      let endPos = input.selectionEnd;
      if(startPos !== endPos) {
        if(startPos === 0){
          if(key === '7' || key === '3')
            input.value = '+' + key + input.value.slice(endPos);
          event.preventDefault();
        }
      } else if (input.value.length === 12){
        event.preventDefault();
      }
    } else {
      if(key === "Backspace") {
        if (input.value.length < 2 | input.selectionStart < 2)
          event.preventDefault();
      } else if (key === "Delete") {
        if(input.selectionStart === 0) {
          event.preventDefault();
        }
      } else if (!(key in ['ArrowLeft', 'ArrowRight'])){
        event.preventDefault();
      }
    }
  });
});
