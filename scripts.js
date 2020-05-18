//podstawowe zmienne
var dzisiaj = new Date();
var obecny_mies = dzisiaj.getMonth();
var obecny_rok = dzisiaj.getFullYear();
var wybor_rok = document.getElementById("rok");
var wybor_mies = document.getElementById("miesiac");

//automatyczne wypełnienie listy rozwijanej latami od 1900 do 2100
var opcje = document.getElementById('rok');
for (var i = 1900; i<=2100; i++)
{
    opcje.innerHTML += '<option value='+i+'>'+i+'</option>'
}
//lista miesięcy w roku po polsku
var miesiace = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

var miesiac_rok = document.getElementById("miesiac_rok");
rob_kalendarz(obecny_mies, obecny_rok);

//przejscie do następnego miesiąca
function nastepny() {
    obecny_rok = (obecny_mies === 11) ? obecny_rok + 1 : obecny_rok;
    obecny_mies = (obecny_mies + 1) % 12;
    rob_kalendarz(obecny_mies, obecny_rok);
}
//przejscie do poprzedniego miesiąca
function poprzedni() {
    obecny_rok = (obecny_mies === 0) ? obecny_rok - 1 : obecny_rok;
    obecny_mies = (obecny_mies === 0) ? 11 : obecny_mies - 1;
    rob_kalendarz(obecny_mies, obecny_rok);
}
//skakanie do konkretnego miesiąca
function przejdz() {
    obecny_rok = parseInt(wybor_rok.value);
    obecny_mies = parseInt(wybor_mies.value);
    rob_kalendarz(obecny_mies, obecny_rok);
}
//generowanie kodu HTML
function rob_kalendarz(miesiac, rok) {

    var pierwszy_dzien = (new Date(rok, miesiac)).getDay();
    var dni_w_mies = 32 - new Date(rok, miesiac, 32).getDate();

    var tabela = document.getElementById("kalendarz-tresc");

    //czyszczenie poprzednich pól
    tabela.innerHTML = "";

    //wpisanie danych onośnie miesiąca
    miesiac_rok.innerHTML = miesiace[miesiac] + " " + rok;
    wybor_rok.value = rok;
    wybor_mies.value = miesiac;

    //tworzenie wszystkich pól
    var date = 1;
    for (var i = 0; i < 6; i++) {
        // rząd tabeli
        var rzad = document.createElement("tr");

        //tworzenie poszczególnych pól i wypełnienie ich danymi
        for (var j = 0; j < 7; j++) {
            if (i === 0 && j < pierwszy_dzien) {
                var pole = document.createElement("td");
                var pole_tekst = document.createTextNode("");
                pole.appendChild(pole_tekst);
                rzad.appendChild(pole);
            }
            else if (date > dni_w_mies) {
                break;
            }

            else {
                var pole = document.createElement("td");
                var pole_tekst = document.createTextNode(date);
                if (date === dzisiaj.getDate() && rok === dzisiaj.getFullYear() && miesiac === dzisiaj.getMonth()) {
                    pole.classList.add("bg-info");
                }
                pole.appendChild(pole_tekst);
                rzad.appendChild(pole);
                date++;
            }
        }
        //dopisywanie każdego rzędu do treści kalendarza.
        tabela.appendChild(rzad);
    }
}