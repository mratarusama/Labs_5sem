window.addEventListener('load', () => {
  let form = $('form');
  form.find('[name=fio]')
      .attr('required','')
      .attr('pattern', '([а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,} [а-яА-яa-zA-Z]{2,})');

  for(let item of form.serializeArray()){
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

  form.find('[name=phone]')
      .attr('pattern', '^\\+((\\d{11})|(\\d{9}))')
      .val('+')
      .bind('keydown', (event) => {
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

  $('<div>').attr('id', 'tooltip').appendTo($('body'));
  $("[data-tooltip]").mousemove(function (eventObject) {
    $("#tooltip").text($(this).attr("data-tooltip")).css({
      'top' : eventObject.pageY + 5,
      'left' : eventObject.pageX + 5
    }).show();

  }).mouseout(function () {
    $("#tooltip").hide().text("").css({"top" : 0, "left" : 0});
  });

  $('input#abortSubmit').click(function(){
    $('#modal').hide(1000);
  });

  $('input#confirmSubmit').click(function(){
    form.submit();
    $('#modal').hide(1000);
  });

  form[0].addEventListener('submit', function (event) {
    event.preventDefault()

    if ($('[name=fio]')[0].validity.valid) {
      if ($('[name=phone]')[0].validity.valid) {
        $('#modal').show(1000);
      }
    }
  })
});
