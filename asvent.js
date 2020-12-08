
Upcoming=ajaxGet("https://api.themoviedb.org/3/list/1?api_key=22a304eaf99b49c9b1427583f1654aba&languages=fr-fr");
AllMovies=Upcoming['items'];

function ajaxGet(url)
{
var data;
var req = new XMLHttpRequest();
req.open("GET", url, false);
req.addEventListener("load", function () {
if (req.status >= 200 && req.status < 400) {
data=JSON.parse(req.responseText);
// console.log(req.responseText);

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


    
    
    for (let i = 0; i < AllMovies.length; i++) {
        
        let nuberMovies= AllMovies[i];
        let titleMovies=nuberMovies.original_title;
        let originalLanguageMovies=nuberMovies.original_language;
        let poster_pathMovies=nuberMovies.poster_path;
        var movis = document.createElement('div');
        movis.className = "movie";
        movis.style= "widht: 100%; min-height: 50vh";
        movis.innerHTML ='<h4>'+titleMovies+'</h4><br><h6>'+originalLanguageMovies+'</h6><br><div><img scr="https://image.tmdb.org/t/p/w500'+poster_pathMovies+'"></div>';
        console.log(movis)
        // document.getElementById('movieGeneral').appendChild(movis);
    };



    var callBackGetSuccess= function(data){
    console.log("donnees api", data)
    var element=document.getElementById('meteo');
    element.innerHTML="the temperature is "+data.main.temp+"°K<br> a wind of "+data.wind.speed+" km/h";
}

function buttonClickGET(){
    let url="http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=44c83eccb126388f53495b2fa7e02165";

    $.get(url, callBackGetSuccess).done(function(){

    }).fail(function(){
        alert("error");
    })
    .always(function(){

    });
}