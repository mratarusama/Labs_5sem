let menuItems = Array.from(document.getElementsByClassName('menu_item'));


export let markButtonsOnHover = function() {
    menuItems.forEach((item) => {
        if(item.classList.length < 2) {
            item.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = "rgb(113, 180, 255)";
            });
            item.addEventListener('mouseout', (e) => {
                e.target.style.backgroundColor = "rgb(113, 210, 255)";
            });
        }
    })
}

export let bindInterestsMenu = function() {
    let interestsItem = menuItems[2];
    let interestsMenu = buildInterestsMenu();

    interestsItem.firstChild.href = '#';
    interestsItem.addEventListener('click', showInterestsMenu);
    interestsMenu.addEventListener('focusout', hideInterestsMenu)

    //interestsItem.appendChild(interestsMenu);
    document.getElementsByTagName('header')[0].appendChild(interestsMenu);
}

let showInterestsMenu = function (e) {
    let interestsItem = e.target;
    let interestsMenu = document.getElementById('interestsMenu')
    interestsMenu.style.display = 'block';
    interestsMenu.style.height = 'auto';
    interestsMenu.focus();
}

let hideInterestsMenu = function(e) {
    console.log(e);
    if(!e.relatedTarget || e.relatedTarget.localName !== 'a'){
        let interestsMenu = document.getElementById('interestsMenu')
        interestsMenu.style.display = 'none';
        interestsMenu.style.height = '0';
    }
}

let buildInterestsMenu = function(){
    let interestsFile = "./Interests.html";
    let interestsItemElements = [['hobby', 'Моё хобби'], ['books', 'Мои любимые книги'],
        ['music', 'Моя любимая музыка'], ['films','Мои любимые фильмы']];

    let mainTag = document.createElement('div');
    let ulTag = document.createElement('ul');
    let liTag, aTag;
    interestsItemElements.forEach((e) => {
        liTag = document.createElement('li');
        aTag = document.createElement('a');

        aTag.href = interestsFile + '#' + e[0];
        aTag.innerText = e[1];

        liTag.append(aTag);
        mainTag.append(liTag);
    });
    mainTag.id = 'interestsMenu';
    mainTag.style.height = '0';
    mainTag.setAttribute('tabindex', '0');
    mainTag.style.display = 'None';
    return mainTag;
}