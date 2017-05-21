var app = function(){
  var url = "https://api.spotify.com/v1/search?q=elvis&type=album";
  var giphyUrl = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC"

  makeRequest(url, requestComplete);
  makeRequest(giphyUrl, giphyRequestComplete);
  bindEvents();
}

var bindEvents = function(){
  var searchQuery = document.getElementById('text-box');
  var albumsDiv = document.getElementById('albums');


}

var giphyRequestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var giphyObj = JSON.parse(jsonString);
  var giphy = giphyObj.data;
  console.log("THIS IS GIPHY: ", giphy)
  populateGiphy(giphy)
}

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var albumsObj = JSON.parse(jsonString);
  var albums = albumsObj.albums.items;
  populateList(albums)
}

var trackRequestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var trackObj = JSON.parse(jsonString);
  var tracks = trackObj;
  populateTrackList(tracks);
}

var createImg = function(imgSrc){
  var itemImg = document.createElement("img");
  itemImg.src = imgSrc;
  return itemImg;
}

var populateGiphy = function(giphy){
  var ul = document.getElementById('giphy-list');
  giphy.forEach(function(gif){
  var gifImg = createImg(gif.images.fixed_height_downsampled.url)
  ul.appendChild(gifImg)
  })
}

var populateList = function(albums){
  var ul = document.getElementById('albums-list')
  albums.forEach(function(album){

    var liAlbumName = document.createElement('li');
    var liImageHolder = document.createElement('li');
    var imgAlbumCover = createImg(album.images[0].url)
    var albumId = album.id;
    var urlWithId = "https://api.spotify.com/v1/albums/" + albumId + "/tracks"
    imgAlbumCover.addEventListener("click", function() { makeRequest(urlWithId, trackRequestComplete)})

    liAlbumName.innerText = album.name

    ul.appendChild(liAlbumName);
    ul.appendChild(liImageHolder);
    ul.appendChild(imgAlbumCover)
    
})
}

var populateTrackList = function(tracks){
  var ol = document.getElementById('tracks-list')
  tracks.items.forEach(function(track){

    console.log(track)
    var olTrackName = document.createElement('li')

    olTrackName.innerText = track.name
    ol.appendChild(olTrackName);
  })
}



var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}


window.addEventListener('load', app);