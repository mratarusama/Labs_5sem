let black = $("#black-block");
let img = $("<img/>");
let i = 0;

const fotos = [
  './img/cat1.png',
  './img/cat2.png',
  './img/cat3.png',
  './img/cat4.png',
  './img/cat5.png',
  './img/cat6.png',
  './img/cat7.png',
  './img/cat8.png',
  './img/cat9.png',
  './img/cat10.png',
  './img/cat11.png',
  './img/cat12.png',
  './img/cat13.png',
  './img/cat14.png',
  './img/cat15.png'
];

const titles = [
  'Картинка 1',
  'Картинка 2',
  'Картинка 3',
  'Картинка 4',
  'Картинка 5',
  'Картинка 6',
  'Картинка 7',
  'Картинка 8',
  'Картинка 9',
  'Картинка 10',
  'Картинка 11',
  'Картинка 12',
  'Картинка 13',
  'Картинка 14',
  'Картинка 15'
];

$('img').each((i, e)=>{
  $(e).attr('onclick', `imgClick(${i})`)
});

function imgClick(index)
{
  i = index;

  black.show(1000).append(
      img.show(1000)
          .attr('src', fotos[index-1])
          .attr('alt', titles[index-1])
          .attr('title', titles[index-1])
  );
}

function clickNext()
{
  if(i < 15)
  {
    i++
    img.hide(300);
    setTimeout(() => imgClick(i), 300);
  }
}

function clickBack()
{
  if(i > 1)
  {
    i--;
    img.hide(300);
    setTimeout(() => imgClick(i), 300);
  }
}

function whiteFunction()
{
  img.hide(1000);
  black.hide(1000);
}