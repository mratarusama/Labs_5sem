let menuItems = $('.menu_item');


export let markButtonsOnHover = function() {
    menuItems.each((i, item) => {
        if(item.classList.length < 2) {
            $(item).bind('mouseover', (e) => {
                e.target.style.backgroundColor = "rgb(113, 180, 255)";
            });
            $(item).bind('mouseout', (e) => {
                e.target.style.backgroundColor = "rgb(113, 210, 255)";
            });
        }
    })
}

export let bindInterestsMenu = function() {
    let interestsItem = $(menuItems[2]);
    let interestsMenu = buildInterestsMenu();

    interestsItem.children().attr('href', '#')
        .bind('click', showInterestsMenu);
    interestsMenu.bind('focusout', hideInterestsMenu)

    $('header').append(interestsMenu);
}

let showInterestsMenu = function (e) {
    $('#interestsMenu').css({
        display: 'block',
        height: 'auto'
    }).focus();
}

let hideInterestsMenu = function(e) {
    if(!e.relatedTarget || e.relatedTarget.localName !== 'a'){
        $('#interestsMenu').css({
            display: 'none',
            height: '0'
        });
    }
}

let buildInterestsMenu = function(){
    let interestsFile = "./Interests.html";
    let interestsItemElements = [['hobby', 'Моё хобби'], ['books', 'Мои любимые книги'],
        ['music', 'Моя любимая музыка'], ['films','Мои любимые фильмы']];

    let mainTag = $('<div/>')
        .attr('id', 'interestsMenu')
        .attr('tabindex', '0')
        .css({
            display: 'none',
            height: '0'
        });

    let ulTag = $('<ul/>');
    let liTag, aTag;
    interestsItemElements.forEach((e) => {
        mainTag.append(
            $('<li/>').append(
                $('<a/>').attr('href', interestsFile + '#' + e[0])
                    .text(e[1])
            )
        );
    });
    return mainTag;
}