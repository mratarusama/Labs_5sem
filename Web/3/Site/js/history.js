const sessionName = "mySession"; // Наименование значения куки

/*
* Возвращает значение запрашиваемой куки
*
* @param {string} cookieName Наименование куки
* @return {string} Значение куки, если такая есть, иначе - пустая строка
*/
var getCookie = (cookieName) => {
    name = cookieName + "=";
    decodedCookie = decodeURIComponent(document.cookie);
    ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

/*
* Устанавливает куки
*
* @param {string} cookieName Наименование устанавливаемой куки
* @param {string} cookieValue Значение устанавливаемой куки
*/

let setCookie = (cookieName, cookieValue) => {
    document.cookie = `${cookieName}=${cookieValue}`;
};

/*
* Сохраняет текущую страницу в истории посещений
*
* @param {string} name Наименование элемента в localStorage
*/
let storeCurrentPage = (name) => {
    let currentHistory = localStorage.getItem(name);
    let page = [document.title, document.location.pathname];
    if(Object.is(currentHistory, null)){ // Если такого эл-та в localstorage нет
        currentHistory = [page];
    } else {
        currentHistory = JSON.parse(currentHistory);
        currentHistory.push(page);
    }
    localStorage.setItem(name, JSON.stringify(currentHistory));
}

/*
* Выводит историю в элемент history_block, если такой существует
*
* Тут уже говнокодил, пуш надоело писать нормально))0э
* Но суть функции, думаю, понятна
*/
let printHistory = () => {
    let historyBlock = document.getElementById('history_current');
    if(!Object.is(historyBlock, null)){
        date = new Date();
        Object.keys(localStorage).forEach((session) => {
            date.setTime(parseInt(session));
            div = document.createElement('div');
            p = document.createElement('p');
            ul = document.createElement('ul');

            p.innerText = date.toString();
            div.append(p);

            JSON.parse(localStorage.getItem(session)).forEach((page) => {
                li = document.createElement('li');
                a = document.createElement('a');

                [a.innerText, a.href] = page;

                li.append(a);

                ul.append(li);
            });

            div.append(ul);

            historyBlock.append(div);
            historyBlock.append(document.createElement('br'));
        })
    }
}

/*
* Очищает всю историю посещений
*/
let clearStorage = () => {
    Object.keys(localStorage).forEach(
        (session) => localStorage.removeItem(session)
    );
}


window.onload = () => {
    let cookieVal = getCookie(sessionName);
    if(cookieVal === "") { // Если такого куки нет, создать новый
        cookieVal = (new Date()).getTime();
        setCookie(sessionName, cookieVal);
    }
    storeCurrentPage(cookieVal); // Сохранить текущую ссылку в истории
    printHistory(); // Вывести (попытаться) историю в блок history_block
}
