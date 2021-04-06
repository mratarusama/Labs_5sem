let month_ru = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

for (let i =1; i <= 12; i++) {
    document.getElementById('year-selection').innerHTML += '<option value="'+i+'">'+month_ru[i-1]+'</option>';
}
for (let i = 1940; i <= 2020; i++) {
    document.getElementById('year-select').innerHTML += '<option value="'+i+'">'+i+'</option>';
}

let calendarBody = document.getElementById('calendar-body');
let tdTag, trTag;
for (let i = 0; i < 6; i++) {
    trTag = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
        tdTag = document.createElement('td');
        tdTag.id = "td-"+i+"-"+j;
        tdTag.innerText = "•";
        trTag.appendChild(tdTag);
    }
    calendarBody.appendChild(trTag);
}

draw_month(0, 31);
select_date(1);

function draw_month(d, days_in_month)
{
    let day = 1;
    d++;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (d > 1) {
                d--;
                document.getElementById("td-"+i+"-"+j).innerHTML = '•';
            }
            else if (days_in_month > 0) {
                document.getElementById("td-"+i+"-"+j).innerHTML =
                    '<a href="#" onclick="select_date('+day+');return false;">'+day+'</a>';
                day++;
                days_in_month--;
            }
            else {
                document.getElementById("td-"+i+"-"+j).innerHTML = '•';
            }
        }
    }
}

function select_date(day)
{
    let year = document.getElementById("year-select").value;
    let month = document.getElementById("year-selection").value;
    document.getElementById("date-value").innerHTML = day+'.'+month+'.'+year;
}


function change_date()
{
    let year = document.getElementById("year-select").value;
    let month = document.getElementById("year-selection").value;
    let d = new Date(year, month-1, 0);
    draw_month(d.getDay(), new Date(year, month, 0).getDate());
}

document.getElementById("year-select").onchange = function(event)
{
    change_date();
};

document.getElementById("year-selection").onchange = function(event)
{
    change_date();
};
