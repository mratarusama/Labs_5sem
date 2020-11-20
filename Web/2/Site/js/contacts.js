
window.onload = () => {
  form = document.forms[0]
  form.fio.required = true;
  form.fio.pattern = '([а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,})';

  for(let item of form.elements){
    item.oninvalid = (invalid) => {invalid.target.focus()}
  }

  form.phone.pattern = '^\\+((\\d{11})|(\\d{9}))';
  form.phone.value = '+';
  form.phone.addEventListener('keydown', (event) => {
    console.log(event);
    key = event.key;
    input = event.target;

    if(!isNaN(parseInt(key))){
      if(input.value.length == 1){
        if(key != 7 && key != 3){
          event.preventDefault();
        }
      } else if (input.value.length == 12){
        event.preventDefault();
      }

      startPos = input.selectionStart;
      endPos = input.selectionEnd;
      if(startPos != endPos) {
        if(startPos == 0){
          if(key == 7 || key == 3)
            input.value = '+' + key + input.value.slice(endPos)
          event.preventDefault();
        }
      }
    } else {
      if(key == "Backspace"){
        if(input.value.length < 2){
          event.preventDefault();
        }
      } else {
        event.preventDefault();
      }
    }
  })
}
