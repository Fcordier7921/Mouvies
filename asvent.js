let Upcoming = ajaxGet("https://api.themoviedb.org/3/list/1?api_key=22a304eaf99b49c9b1427583f1654aba&languages=en-US");
let AllMovies = Upcoming['items'];
let nuberMovies;
let titleMovies;
let poster_pathMovies;
let movis;
let id;
let i

function ajaxGet(url) {
    var data;
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            data = JSON.parse(req.responseText);


        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send();
    return data;
}

// const mouviResquy= Array();
// fetch("https://api.themoviedb.org/3/list/1?api_key=22a304eaf99b49c9b1427583f1654aba&languages=fr-fr")
//     .then(res => {

//         if (res.ok) {
//             res.json().then(data => {
//                  mouviResquy.push(data.items);
//                 console.log(data.items);

//             })
//         } else {
//             console.log("ERREUR");
//             document.film.innerHTML = "Erreur :("
//         }
//     });
//     function ajaxGet(url)
// {


// console.log(AllMovies)
;

function affElement() {

    for (i = 0; i < AllMovies.length; i++) {

        nuberMovies = AllMovies[i];
        id = nuberMovies.id;
        titleMovies = nuberMovies.title;
        poster_pathMovies = nuberMovies.poster_path;
        movis = document.createElement('div');
        movis.className = "movie";
        movis.style = "widht: 100%; min-height: 30vh";
        movis.innerHTML = '<div class="movie-image ">  <a href="#" data-toggle="modal" data-target="#m" onclick="myFunction(' + id + ')"><img src="https://image.tmdb.org/t/p/w500' + poster_pathMovies + '" alt="" /></a> <span class="play"><span class="name">' + titleMovies + '</span></span></div>';
        // console.log(movis);
        document.getElementById('movieGeneral').appendChild(movis);

    };

}
affElement(AllMovies);
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function myFunction(id) {
    modal.style.display = "block";
    let UpActor = ajaxGet('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=22a304eaf99b49c9b1427583f1654aba&languages=en-US'); //les acteur
    let UpBandad = ajaxGet('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=22a304eaf99b49c9b1427583f1654aba&language=en-US'); //band annoce
    let UpRecommendation = ajaxGet('https://api.themoviedb.org/3/movie/' + id + '/recommendations?api_key=22a304eaf99b49c9b1427583f1654aba&language=en-US&page=1'); //les recommandation du meme genre de film
    let UpReviews = ajaxGet('https://api.themoviedb.org/3/movie/' + id + '/reviews?api_key=22a304eaf99b49c9b1427583f1654aba&language=en-US&page=1'); //avis des utilisateur
    let Actor = UpActor['cast'];
    let bandad = UpBandad['results'];
    let Recommendation = UpRecommendation['results'];
    let reviews = UpReviews['results'];
    //les variable pour l'entaite de la modal
    let originalLanguage = nuberMovies.original_language;
    let originalTitle = nuberMovies.original_title;
    let overviewMovies = nuberMovies.overview;
    //recuperation du titre du fil et dela photo
    let movisModal = document.createElement('div');
    movisModal.className = "movieModal";
    movisModal.style = "widht: 20%; min-height: 20%";
    movisModal.innerHTML = '<div class="container-fluid"><div class="row"><div><img src="https://image.tmdb.org/t/p/w500' + poster_pathMovies + '" alt="' + titleMovies + '" /></div><div><h2>' + titleMovies + '</h2><h4>Title original : ' + originalTitle + '</h4><h4>Language original : ' + originalLanguage + '</h4></div></div></div><div class="container-fluid"><p>description : <br>'+overviewMovies+'</p></div>';
    console.log(movisModal);
    document.getElementById('modal').appendChild(movisModal);

    // for (i = 0; i < 5; i++) {
    //     let nuberActors = Actor[i];
    //     titleMovies = nuberActors.title;
    //     poster_pathMovies = nuberActors.poster_path;
    //     let movisActors = document.createElement('div');
    //     movisActors.className = "movie";
    //     movisActors.style = "widht: 100%; min-height: 30vh";
    //     movisActors.innerHTML = '<div class="movie-image ">  <a href="#" data-toggle="modal" data-target="#m" onclick="myFunction(' + id + ')"><img src="https://image.tmdb.org/t/p/w500' + poster_pathMovies + '" alt="" /></a> <span class="play"><span class="name">' + titleMovies + '</span></span></div>';
    //     // console.log(movis);
    //     document.getElementById('movieGeneral').appendChild(movisActors);


    // }
    console.log(Actor);
    // console.log(bandad);
    // console.log(Recommendation);



}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




var callBackGetSuccess = function (data) {
    console.log("donnees api", data)
    var element = document.getElementById('meteo');
    element.innerHTML = "the temperature is " + data.main.temp + "°K<br> a wind of " + data.wind.speed + " km/h";
}

function buttonClickGET() {
    let url = "http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=44c83eccb126388f53495b2fa7e02165";

    $.get(url, callBackGetSuccess).done(function () {

        }).fail(function () {
            alert("error");
        })
        .always(function () {

        });
}