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
    let ul = $('<ul/>');

    let allItems = JSON.parse(localStorage.getItem(session))
    if(display) {
        allItems.forEach((page) => {
            ul.append(
                $('<li/>').append(
                    $('<a/>')
                        .text(page[0])
                        .attr('href', page[1])
                )
            );
        });
    } else {
        let uniqueItems = buildUniqueHistory(allItems);
        uniqueItems.forEach((page) => {
            ul.append(
                $('<li/>').append(
                    $('<a/>')
                        .text(page[0] + '(' + page[2] + ')')
                        .attr('href', page[1])
                )
            );
        })
    }

    historyBlock
        .append(
            $('<div/>').append(
                $('<p/>')
                    .text(date.toString())
            ).append(ul))
        .append($('<br/>'));
};

/*
* Выводит историю в элемент history_block, если такой существует
*
* Тут уже говнокодил, пуш надоело писать нормально))0э
* Но суть функции, думаю, понятна
*/
let printHistory = (currentSession) => {
    let historyBlock = $('#history');
    let historyCurrentBlock = $('#history_current');
    let historyAllBlock = $('#history_all');

    if(historyBlock.length){
        let date = new Date();
        // Выведем текущий сеанс


        historyCurrentBlock.append(
            $('<p/>')
                .text('Текущий сеанс:')
                .css({
                    'font-size': '1.2em',
                    'padding-bottom': '10px'
                })
        );
        printHistoryBlock(currentSession, historyCurrentBlock);

        // Выведем всю историю посещений
        historyAllBlock.append(
            $('<p/>')
                .text('За всё время:')
                .css({
                    'font-size': '1.2em',
                    'padding-bottom': '10px'
                })
        );
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
    $('#history_current').empty();
    $('#history_all').empty();
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
    let changeModeButton = $('#change_mode_button');

    if(changeModeButton.length){
        changeModeButton.bind('click', () => { // Переключение режима отображения по кнопке
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