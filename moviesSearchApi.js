const form = document.querySelector("form");
const input = document.querySelector("input");

form.onsubmit = (e) => {
  e.preventDefault();
  if( document.querySelector("#results").innerHTML!=''){
    document.querySelector("#results").innerHTML=''
  }
 
  const movieName = input.value;
  if (movieName.length === 0) {
    alert("Enter Something");
  } else {
    fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=8125db8f67d23da1d30f6063b1b794b8&language=en-US&query=" +
        movieName +
        "&page=1&include_adult=false"
    )
    
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        //console.log(result)
        showmovie(result);
      });
  }
};
function showmovie(result) {
  console.log(result.results);
  if (result.results.length != 0) {
    result.results.forEach((index) => {
      let div_create = document.createElement("div");
      div_create.classList.add("movie");
      let img_create = document.createElement("img");
      let title_create = document.createElement("h2");
      if (index.poster_path) {
        img_create.src =
          "https://image.tmdb.org/t/p/original" + index.poster_path;
      } else {
        img_create.src = "no-poster-available.jpg";
      }
      title_create.innerHTML = index.original_title;


      fetch("https://api.themoviedb.org/3/movie/+index.id+videos?api_key=76d0e7c7157a5f32e858156bc6cc87e6&language=en-US")

      .then((response)=>{
      	return response.json();
      })
      .then((result) =>{
      	// console.log(result.results);
      	if(result.results.length > 0 && findtrailer(result.results)){
      		const trailerKey = findtrailer(result.results)
      		const anchor = document.querySelector("a");
      		anchor = "https://youtube.com/embed/"+trailerKey
      		anchor.target = "_blank";
            anchor.innerHTML = "Play Trailer";
            div_create.append(anchor)
      	}
      }) 


      div_create.append(img_create);
      div_create.append(title_create);
      document.querySelector("#results").append(div_create);
      console.log(index);
    });
  } else {
    let create_h = document.createElement("h2");
    create_h.innerHTML = "No results found";
    document.querySelector("#results").append(create_h);
  }
}







