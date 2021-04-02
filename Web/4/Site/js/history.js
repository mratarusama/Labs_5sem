const sessionName = "mySession"; // Наименование значения куки
let display = false; // Режим отображения. False - сжатый; True - подробный.

/*
* Возвращает значение запрашиваемой куки
*
* @param {string} cookieName Наименование куки
* @return {string} Значение куки, если такая есть, иначе - пустая строка
*/
let getCookie = (cookieName) => {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    let c = '';
    for(let i = 0; i < ca.length; i++) {
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
* Удаляет все дубликаты и подсчитывает их количество
*
* @param {Object} sessionHistory Массив, хранящийся в localStorage с пользовательской историей перемещений по сайту
*
* @return {Object} uniqueSessionHistory Тот же sessionHistory, но без дубликатов и с дополнительным полем для
*   каждого элемента - количеством найденных дубликатов
 */
let buildUniqueHistory = (sessionHistory) => {
    let uniqueSessionHistory = [];
    let flag = true;
    sessionHistory.forEach(page => {
        uniqueSessionHistory.forEach(element => {
            if(element[0] === page[0]){
                flag = false;
                element[2]++;
            }
        });
        if(flag) {
            uniqueSessionHistory.push([...page, 1]);
        } else {
            flag = true;
        }
    });
    return uniqueSessionHistory;
}

/*
* Добавляет к блоку информацию о истории просмотров
*
* @param {string} session Идентефикатор сессии, который необходимо вывести
* @param {Object} historyBlock Элемент DOM, в который необходимо выводить информацию
 */
let printHistoryBlock = (session, historyBlock) => {
    let date = new Date(parseInt(session));
    let div, p, ul, li, a;

    div = document.createElement('div');
    p = document.createElement('p');

    ul = document.createElement('ul');
    p.innerText = date.toString();

    div.append(p);
    let allItems = JSON.parse(localStorage.getItem(session))
    if(display) {
        allItems.forEach((page) => {
            li = document.createElement('li');
            a = document.createElement('a');

            [a.innerText, a.href] = page;

            li.append(a);

            ul.append(li);
        });
    } else {
        let uniqueItems = buildUniqueHistory(allItems);
        uniqueItems.forEach((page) => {
            li = document.createElement('li');
            a = document.createElement('a');

            a.innerText = page[0] + '(' + page[2] + ')';
            a.href = page[1];

            li.append(a);

            ul.append(li);
        })
    }
    div.append(ul);

    historyBlock.append(div);
    historyBlock.append(document.createElement('br'));
};

/*
* Выводит историю в элемент history_block, если такой существует
*
* Тут уже говнокодил, пуш надоело писать нормально))0э
* Но суть функции, думаю, понятна
*/
let printHistory = (currentSession) => {
    let historyBlock = document.getElementById('history');
    let historyCurrentBlock = document.getElementById('history_current');
    let historyAllBlock = document.getElementById('history_all');

    if(!Object.is(historyBlock, null)){
        let date = new Date();
        let div, p, ul, li, a;

        // Выведем текущий сеанс
        p = document.createElement('p');
        p.innerText = 'Текущий сеанс:';
        p.style.fontSize = '1.2em';
        p.style.paddingBottom = '10px';
        historyCurrentBlock.appendChild(p);
        printHistoryBlock(currentSession, historyCurrentBlock);

        // Выведем всю историю посещений
        p = document.createElement('p');
        p.innerText = 'За всё время:';
        p.style.fontSize = '1.2em';
        p.style.paddingBottom = '10px';
        historyAllBlock.appendChild(p);
        Object.keys(localStorage).forEach((session) => {
            printHistoryBlock(session, historyAllBlock);
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

/*
* Очищает блоки с историей посещений
 */
let clearHistoryBlocks = () => {
    document.getElementById('history_current').innerHTML = "";
    document.getElementById('history_all').innerHTML = "";
}

/*
* Изменяет режим отображения истории на более или на менее подробную
 */

let changeMode = (currentSession) => {
    display = !display;
    clearHistoryBlocks();
    printHistory(currentSession);
}


window.addEventListener('load', () => {
    let cookieVal = getCookie(sessionName);
    let changeModeButton = document.getElementById('change_mode_button');

    if(!Object.is(changeModeButton, null)){
        changeModeButton.addEventListener('click', () => { // Переключение режима отображения по кнопке
            changeMode(cookieVal);
        });
    }

    if(cookieVal === "") { // Если такого куки нет, создать новый
        cookieVal = (new Date()).getTime();
        setCookie(sessionName, cookieVal);
    }
    storeCurrentPage(cookieVal); // Сохранить текущую ссылку в истории
    printHistory(cookieVal); // Вывести (попытаться) историю в блок history_block
});