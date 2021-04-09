menuItems = $('.menu_item')

export markButtonsOnHover = ->
    menuItems.each (i, item) ->
        if item.classList.length < 2
            $(item).bind 'mouseover', (e) ->
                e.target.style.backgroundColor = 'rgb(113, 180, 255)'
                return
            $(item).bind 'mouseout', (e) ->
                e.target.style.backgroundColor = 'rgb(113, 210, 255)'
                return
        return
    return

export bindInterestsMenu = ->
    interestsItem = $(menuItems[2])
    interestsMenu = buildInterestsMenu()
    interestsItem.children().attr('href', '#').bind 'click', showInterestsMenu
    interestsMenu.bind 'focusout', hideInterestsMenu
    $('header').append interestsMenu
    return

showInterestsMenu = (e) ->
    $('#interestsMenu').css(
        display: 'block'
        height: 'auto').focus()
    return

hideInterestsMenu = (e) ->
    if !e.relatedTarget or e.relatedTarget.localName != 'a'
        $('#interestsMenu').css
            display: 'none'
            height: '0'
    return

buildInterestsMenu = ->
    interestsFile = './Interests.html'
    interestsItemElements = [
        [
            'hobby'
            'Моё хобби'
        ]
        [
            'books'
            'Мои любимые книги'
        ]
        [
            'music'
            'Моя любимая музыка'
        ]
        [
            'films'
            'Мои любимые фильмы'
        ]
    ]
    mainTag = $('<div/>').attr('id', 'interestsMenu').attr('tabindex', '0').css(
        display: 'none'
        height: '0')
    ulTag = $('<ul/>')
    liTag = undefined
    aTag = undefined
    interestsItemElements.forEach (e) ->
        mainTag.append $('<li/>').append($('<a/>').attr('href', interestsFile + '#' + e[0]).text(e[1]))
        return
    mainTag