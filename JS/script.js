const clientid = "73ccd9de1d52440b98d8e6309328de41";
const clientsecret = "dc39df92f2154453b4f381fc6f8592b9";
const client = clientid + ':' + clientsecret;


class Track {
  constructor (name, spotify_link)
  {
    this.name = name;
    this.spotify_link = spotify_link;
  }
}
class Album {


  constructor (title, cover_url, tracks, release_date, total_tracks)
  {
    this.title = title;
    this.cover_url = cover_url;
    this.tracks = tracks;
    this.release_date = release_date;
    this.total_tracks = total_tracks;
  }
  showCover()
  {

    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var div4 = document.createElement("div");
    var div5 = document.createElement("div");
    //var div5 = document.createElement("div");
    

    div1.className = "images";
    div2.className = "lists";
    div3.className = "flexcontainer";
    div4.className = "image_list";
    div5.className = "album_group";
    //div5.className - "album_extra_image"

    if (this.title == "The Life Of Pablo" || this.title == "Late Registration" || this.title == "The College Dropout" || this.title == "Donda")
    {
      div4.style.paddingBottom = "50px";
      div5.style.marginBottom = "20px";
    }
    else{
      div2.style.paddingTop = "70px";
      div5.style.marginBottom = "40px";
    }

    var table = document.getElementById("album_table");
    var title = document.createElement("h3");
    title.append(this.title);
    div4.appendChild(title);
    var image = document.createElement("img");
    //var image2 = document.createElement("img");
    //div5.appendChlid(image2);
    
  
    image.src = this.cover_url;
    image.width = "350";
    image.height = "350";
    div1.appendChild(image);
    div4.appendChild(div1);
   //image2.src = "images/Donda2.jpeg"

    var hr= document.createElement("hr");

    var song_list = document.createElement("ul");
    for (let i=0; i<this.tracks.length; i++)
    {
       var song_name = document.createElement("li");
       //var song_link = document.createElement("a");
       //song_link.appendChild(song_name);
       //song_link.href = "song_display";
       song_name.append(this.tracks[i]["name"]);
       song_list.appendChild(song_name);
        song_name.onclick = () => {
          window.localStorage.setItem("song_name",this.tracks[i]["name"])
          window.localStorage.setItem("title",this.title)
          window.localStorage.setItem("cover_url",this.cover_url)
          window.location = "song_display.html";
        };
        //song_display.html
        
    }
    div3.appendChild(div4);
    div2.appendChild(song_list)
    div3.appendChild(div2);
    div5.appendChild(div3);
    table.appendChild(div5);
    if (this.title != "The College Dropout")
    {
      table.appendChild(hr);
    }
    

    
    
  }
}

async function get_albums_and_songs(){
  const access_token = await fetch("https://accounts.spotify.com/api/token?grant_type=client_credentials", {
    method: 'POST', // or 'PUT'
    headers: {
      'Authorization': 'Basic ' + btoa(client),
        'Content-type': 'application/x-www-form-urlencoded'
    },
  }).then(response => response.json())
  let result = [];
  const albums = await fetch("https://api.spotify.com/v1/artists/5K4W6rqBFWDnAN6FQUkS6x/albums?limit=29", {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token["access_token"],
        'Content-type': 'application/x-www-form-urlencoded'
    },
  }).then(data => data.json())

  //make set string
  //loop and add all album titles to set
  //if album has same name as set then dont include album
  // if contains deluxe, dont include
  const names = new Set();
  for (const album of albums["items"])
  {
    if (album["name"].includes("Deluxe")) continue;
    if (album["name"].includes("Exclusive")) continue;
    if (album["name"].includes("Orchestration")) continue;
    if (album["name"].includes("Edited")) continue;
    if (names.has(album["name"])) continue;

    //for now
    // if (!album["name"].includes("Fantasy")) continue;

    names.add(album["name"]);


    let album_tracks = await fetch("https://api.spotify.com/v1/albums/" + album["id"] + "/tracks?limit=23", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token["access_token"],
          'Content-type': 'application/x-www-form-urlencoded'
      },
    }).then(response => response.json())
    album_tracks = album_tracks["items"];
    let my_tracks = [];
    for (const track of album_tracks)
    {
      // if (!track["name"].includes("POWER")) continue;
      my_tracks.push(new Track(track["name"], track["external_urls"]["spotify"]));
      
    }
    
    let current_album = new Album(album["name"], album["images"][0]["url"], my_tracks, album["release_date"], album["total_tracks"]);
    result.push(current_album);
  }
  // console.log(albums_tracks);
  return result;
}
//loop through album titles



let albums_tracks = get_albums_and_songs();
albums_tracks.then(a=>console.log(a));


albums_tracks.then(albums=>{
  for (let i=0; i<albums.length; i++)
  {
    albums[i].showCover();
  }
})

//Kanye spotify ID: 5K4W6rqBFWDnAN6FQUkS6x