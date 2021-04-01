let black = document.getElementById("black-block");
let img = document.createElement("IMG");
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

let build_photo = (url, alt, title, caption) => {
  let fig = document.createElement('figure');
  let img = document.createElement('img');
  let cap = document.createElement('figcaption');

  img.src = url;
  img.alt = alt;
  img.title = title;

  cap.innerText = caption;
  cap.classList.add('picDesc')

  fig.append(img);
  fig.append(cap);
  return fig;
};

let insert_photos = (photo, title, count_in_row) => {
  let photo_count = photo.length;
  let title_count = title.length;
  if(photo_count !== title_count){
    throw 'Different number of objects in arrays';
  }

  let content = document.createElement('div');
  content.id = 'content';
  let row = '';
  for(let i = 0; i < photo_count; i++) {
    if(i % count_in_row === 0){
      content.append(row);
      row = document.createElement('div');
      row.classList.add('row');
    }
    row.appendChild(build_photo(photo[i], title[i], title[i], title[i]));
  }
  content.append(row);
  document.body.append(content);
};

insert_photos(fotos, titles, 6);
Array.from(document.getElementsByTagName('img')).forEach((e, i)=>{
  e.setAttribute('onclick', `imgClick(${i})`)
});

function imgClick(index)
{
  console.log(index);
  i = index;
  black.style.display = "block";
  img.src = fotos[index-1];
  img.alt = titles[index-1];
  img.title = titles[index-1];
  black.appendChild(img);
}

function clickNext()
{
  if(i < 15)
  {
    i++
    imgClick(i);
  }
}

function clickBack()
{
  if(i > 1)
  {
    i--;
    imgClick(i);
  }
}

function whiteFunction()
{
  black.style.display = "none";
  black.removeChild(img);
}