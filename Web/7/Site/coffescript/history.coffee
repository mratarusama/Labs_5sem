sessionName = 'mySession'
# Наименование значения куки
display = false
# Режим отображения. False - сжатый; True - подробный.

###
* Возвращает значение запрашиваемой куки
*
* @param {string} cookieName Наименование куки
* @return {string} Значение куки, если такая есть, иначе - пустая строка
###

getCookie = (cookieName) ->
    name = cookieName + '='
    decodedCookie = decodeURIComponent(document.cookie)
    ca = decodedCookie.split(';')
    c = ''
    i = 0
    while i < ca.length
        c = ca[i]
        while c.charAt(0) == ' '
            c = c.substring(1)
        if c.indexOf(name) == 0
            return c.substring(name.length, c.length)
        i++
    ''

###
* Устанавливает куки
*
* @param {string} cookieName Наименование устанавливаемой куки
* @param {string} cookieValue Значение устанавливаемой куки
###

setCookie = (cookieName, cookieValue) ->
    document.cookie = cookieName + '=' + cookieValue
    return

###
* Сохраняет текущую страницу в истории посещений
*
* @param {string} name Наименование элемента в localStorage
###

storeCurrentPage = (name) ->
    currentHistory = localStorage.getItem(name)
    page = [
        document.title
        document.location.pathname
    ]
    if Object.is(currentHistory, null)
# Если такого эл-та в localstorage нет
        currentHistory = [ page ]
    else
        currentHistory = JSON.parse(currentHistory)
        currentHistory.push page
    localStorage.setItem name, JSON.stringify(currentHistory)
    return

###
* Удаляет все дубликаты и подсчитывает их количество
*
* @param {Object} sessionHistory Массив, хранящийся в localStorage с пользовательской историей перемещений по сайту
*
* @return {Object} uniqueSessionHistory Тот же sessionHistory, но без дубликатов и с дополнительным полем для
*   каждого элемента - количеством найденных дубликатов
###

buildUniqueHistory = (sessionHistory) ->
    uniqueSessionHistory = []
    flag = true
    her = []
    sessionHistory.forEach (page) ->
        uniqueSessionHistory.forEach (element) ->
            if element[0] == page[0]
                flag = false
                element[2]++
            return
        if flag
            her = []
            her.push page
            her[0].push 1
            uniqueSessionHistory.push her
        else
            flag = true
        return
    uniqueSessionHistory

###
* Добавляет к блоку информацию о истории просмотров
*
* @param {string} session Идентефикатор сессии, который необходимо вывести
* @param {Object} historyBlock Элемент DOM, в который необходимо выводить информацию
###

printHistoryBlock = (session, historyBlock) ->
    date = new Date(parseInt(session))
    ul = $('<ul/>')
    allItems = JSON.parse(localStorage.getItem(session))
    if display
        allItems.forEach (page) ->
            ul.append $('<li/>').append($('<a/>').text(page[0]).attr('href', page[1]))
            return
    else
        uniqueItems = buildUniqueHistory(allItems)
        uniqueItems.forEach (page) ->
            ul.append $('<li/>').append($('<a/>').text(page[0] + '(' + page[2] + ')').attr('href', page[1]))
            return
    historyBlock.append($('<div/>').append($('<p/>').text(date.toString())).append(ul)).append $('<br/>')
    return

###
* Выводит историю в элемент history_block, если такой существует
*
* Тут уже говнокодил, пуш надоело писать нормально))0э
* Но суть функции, думаю, понятна
###

printHistory = (currentSession) ->
    historyBlock = $('#history')
    historyCurrentBlock = $('#history_current')
    historyAllBlock = $('#history_all')
    if historyBlock.length
        date = new Date
        # Выведем текущий сеанс
        historyCurrentBlock.append $('<p/>').text('Текущий сеанс:').css(
            'font-size': '1.2em'
            'padding-bottom': '10px')
        printHistoryBlock currentSession, historyCurrentBlock
        # Выведем всю историю посещений
        historyAllBlock.append $('<p/>').text('За всё время:').css(
            'font-size': '1.2em'
            'padding-bottom': '10px')
        Object.keys(localStorage).forEach (session) ->
            printHistoryBlock session, historyAllBlock
            return
    return

###
* Очищает всю историю посещений
###

clearStorage = ->
    Object.keys(localStorage).forEach (session) ->
        localStorage.removeItem session
        return
    return

###
* Очищает блоки с историей посещений
###

clearHistoryBlocks = ->
    $('#history_current').empty()
    $('#history_all').empty()
    return

###
* Изменяет режим отображения истории на более или на менее подробную
###

changeMode = (currentSession) ->
    display = !display
    clearHistoryBlocks()
    printHistory currentSession
    return

window.addEventListener 'load', ->
    cookieVal = getCookie(sessionName)
    changeModeButton = $('#change_mode_button')
    if changeModeButton.length
        changeModeButton.bind 'click', ->
# Переключение режима отображения по кнопке
            changeMode cookieVal
            return
    if cookieVal == ''
# Если такого куки нет, создать новый
        cookieVal = (new Date).getTime()
        setCookie sessionName, cookieVal
    storeCurrentPage cookieVal
    # Сохранить текущую ссылку в истории
    printHistory cookieVal
    # Вывести (попытаться) историю в блок history_block
    return