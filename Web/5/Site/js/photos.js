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

let insert_photos = (photo, title, count_in_row) => {
  let photo_count = photo.length;
  let title_count = title.length;
  if(photo_count !== title_count){
    throw 'Different number of objects in arrays';
  }

  let content = $('<div/>')
      .attr('id', 'content');
  let row = '';
  for(let i = 0; i < photo_count; i++) {
    if(i % count_in_row === 0){
      if(row.length)
      content.append(row);
      row = $('<div/>')
          .addClass('row');
    }
    console.log(row);
    row.append(
        $('<figure/>')
            .append($('<img/>', {src:photo[i], alt: title[i], title: title[i]}))
            .append(
                $('<figcaption/>')
                    .text(title[i])
                    .addClass('picDesc')
            )
    );
  }
  content.append(row);
  $('body').append(content);
};

insert_photos(fotos, titles, 6);
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