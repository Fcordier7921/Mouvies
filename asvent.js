let Upcoming = ajaxGet("https://api.themoviedb.org/3/list/1?api_key=22a304eaf99b49c9b1427583f1654aba&languages=en-US");
let AllMovies = Upcoming['items'];
let nuberMovies;
let titleMovies;
let poster_pathMovies;
let movis;
let id;
let i;
var Racine = document.getElementById("myModal")
var modaldetails = new Modal;
modaldetails.content();

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
        this.Idmovie = nuberMovies.id;
        titleMovies = nuberMovies.title;
        poster_pathMovies = nuberMovies.poster_path;
        movis = document.createElement('div');
        movis.className = "movie";
        movis.style = "widht: 100%; min-height: 30vh";
        movis.innerHTML = '<div class="movie-image ">  <a href="#" data-toggle="modal" data-target="#m"><img src="https://image.tmdb.org/t/p/w500' + poster_pathMovies + '" alt=""/></a> <span class="play"><span class="name">' + titleMovies + '</span></span></div>';
        // console.log(movis);
        document.getElementById('movieGeneral').appendChild(movis);
        movis.onclick = myFunction(this.Idmovie)
    };

}
affElement(AllMovies);

//Génération de la Modal
function Modal() {
    this.content = function () {
        //Génération de la modal
        var modaldetails = document.createElement("div");
        Racine.append(modaldetails);
        modaldetails.id = "Moviedetail";
        modaldetails.classList = "modal faded";
        modaldetails.tabindex = "-1";
        //Génération de la modal content
        var modalDialog = document.createElement("div");
        modaldetails.append(modalContent);
        modalDialog.classList = "modal-dialog modal-lg";
        //Génération de la modal content
        var modalContent = document.createElement("div");
        modaldetails.append(modalContent);
        modalContent.classList = "modal-content";
        //Génération du bouton close
        var close = document.createElement("span");
        modalContent.append(close);
        close.classList = "close";
        close.innerHTML = "&times;";
        //Génération de la div qui accueille la présentation du film
        var para = document.createElement("div");
        modalContent.append(para);
        para.id = "modalContent";
    }
}
284053

function myFunction(id) {
    return function () {
        let UpDetails = ajaxGet('https://api.themoviedb.org/3/movie/' + id + '?api_key=22a304eaf99b49c9b1427583f1654aba&language=en-US'); //le détail du film
        let UpActor = ajaxGet('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=22a304eaf99b49c9b1427583f1654aba&languages=en-US'); //les acteur
        let UpBandad = ajaxGet('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=22a304eaf99b49c9b1427583f1654aba&language=en-US'); //band annoce
        let UpRecommendation = ajaxGet('https://api.themoviedb.org/3/movie/' + id + '/recommendations?api_key=22a304eaf99b49c9b1427583f1654aba&language=en-US&page=1'); //les recommandation du meme genre de film
        var para = document.getElementById("modalContent");
        var modal = document.getElementById("Moviedetail");
        var span = document.getElementsByClassName("close")[0];
        modal.classList.toggle("show");
        modal.style.display = "block";
        modal.style.zIndex = "2000";
        para.innerHTML = "";

        //récuperation du tableau de donné de l'api
        let Actor = UpActor['cast']; //info acteur
        let bandad = UpBandad['results']; //info band annonce
        let Recommendation = UpRecommendation['results']; //info recomandation

        // création du synopsis : affiche + résumé 
        var synopsis = document.createElement("div");
        synopsis.id = "synopsis";
        synopsis.style.display = "flex";
        synopsis.innerHTML = '<img src="https://image.tmdb.org/t/p/w154/' + UpDetails.poster_path + '"><div class="px-3"><h2>' + UpDetails.title + '</h2><p class="text-dark">original language : ' + UpDetails.original_language + ' </p><br><p>' + UpDetails.overview + '</p></div><br>';
        para.append(synopsis);

        // création de la liste des film recommander
        var h3Recommendation = document.createElement("h6");
        h3Recommendation.style.paddingTop = "20px";
        h3Recommendation.textContent = "Recommendation";
        para.append(h3acteur);
        var Recommends = document.createElement("div");
        Recommends.id = "movisRacommend"
        Recommends.style = "display:flex; justify-content: space-around";
        for (var i = 0; i < 4; i++) {
            var Recommend = document.createElement("div");
            Recommend.id = "movisSimilar" + i;
            Recommend.classList = "mx-2"
            Recommend.style = "text-align: center";
            Recommend.innerHTML = '<div style="max-width: 20vw;"><img class="img-fluid" src="https://image.tmdb.org/t/p/w500' + Recommendation[i].backdrop_path + '"></div><p>' + Recommendation[i].title + '</p>'
            Recommends.append(Recommend);
        }
        para.append(Recommends);

        // création de la liste des acteurs principaux
        var h3acteur = document.createElement("h3");
        h3acteur.style.paddingTop = "20px";
        h3acteur.textContent = "Actor";
        para.append(h3acteur);
        var actors = document.createElement("div");
        actors.id = "actors"
        actors.style = "display:flex; justify-content: space-around";
        for (var i = 0; i < 5; i++) {
            var actor = document.createElement("div");
            actor.id = "actor" + i;
            actor.classList = "mx-2"
            actor.style = "text-align: center";
            actor.innerHTML = '<img src="https://image.tmdb.org/t/p/w92/' + Actor[i].profile_path + '"><p>' + Actor[i].name + '</p>'
            actors.append(actor);
        }
        para.append(actors);

        // création du trailer
        var trailer = document.createElement("div");
        trailer.style = "text-align: center"
        trailer.innerHTML = '<iframe id="video" width="560" height="315" src="https://www.youtube.com/embed/' + bandad[0].key + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        para.append(trailer);
        span.onclick = function () {
            modal.classList.toggle("show");
            modal.style.zIndex = "-1";
            trailer.innerHTML = "";

        }
        // création de la liste des acteurs principaux
        var h3acteur = document.createElement("h3");
        h3acteur.style.paddingTop = "20px";
        h3acteur.textContent = "Actor";
        para.append(h3acteur);
        var actors = document.createElement("div");
        actors.id = "actors"
        actors.style = "display:flex; justify-content: space-around";
        for (var i = 0; i < 5; i++) {
            var actor = document.createElement("div");
            actor.id = "actor" + i;
            actor.classList = "mx-2"
            actor.style = "text-align: center";
            actor.innerHTML = '<img src="https://image.tmdb.org/t/p/w92/' + Actor[i].profile_path + '"><p>' + Actor[i].name + '</p>'
            actors.append(actor);
        }
        para.append(actors);
        return false;

        
    }
}



//météo
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






//     let Recommendation = UpRecommendation['results'];
//     let reviews = UpReviews['results'];
//     //les variable pour l'entaite de la modal
//     let originalLanguage = nuberMovies.original_language;
//     let originalTitle = nuberMovies.original_title;
//     let overviewMovies = nuberMovies.overview;
//     //recuperation du titre du fil et dela photo
//     let movisModal = document.createElement('div');
//     movisModal.className = "movieModal";
//     movisModal.style = "widht: 20%; min-height: 20%";
//     movisModal.innerHTML = '<div class="container-fluid"><div class="row"><div><img src="https://image.tmdb.org/t/p/w500' + poster_pathMovies + '" alt="' + titleMovies + '" /></div><div><h2>' + titleMovies + '</h2><h4>Title original : ' + originalTitle + '</h4><h4>Language original : ' + originalLanguage + '</h4></div></div></div><div class="container-fluid"><p>description : <br>'+overviewMovies+'</p></div>';
//     console.log(movisModal);
//     document.getElementById('myModal').appendChild(movisModal);

//     // for (i = 0; i < 5; i++) {
//     //     let nuberActors = Actor[i];
//     //     titleMovies = nuberActors.title;
//     //     poster_pathMovies = nuberActors.poster_path;
//     //     let movisActors = document.createElement('div');
//     //     movisActors.className = "movie";
//     //     movisActors.style = "widht: 100%; min-height: 30vh";
//     //     movisActors.innerHTML = '<div class="movie-image ">  <a href="#" data-toggle="modal" data-target="#m" onclick="myFunction(' + id + ')"><img src="https://image.tmdb.org/t/p/w500' + poster_pathMovies + '" alt="" /></a> <span class="play"><span class="name">' + titleMovies + '</span></span></div>';
//     //     // console.log(movis);
//     //     document.getElementById('movieGeneral').appendChild(movisActors);