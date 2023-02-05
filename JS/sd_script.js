var sd_song_info = document.getElementById("song_info");
var sd_song_title = document.createElement("h3");
var sd_song_cover = document.createElement("img");
var song_name_only = window.localStorage.getItem("song_name");
var song_name = window.localStorage.getItem("title") + ":" + window.localStorage.getItem("song_name");
var cover_url = window.localStorage.getItem("cover_url");
var color_url = "vinyl.jpg";
sd_song_title.append(song_name_only);
sd_song_info.appendChild(sd_song_title);
sd_song_cover.src = cover_url;
sd_song_cover.width = "350";
sd_song_cover.height = "350";
sd_song_info.appendChild(sd_song_cover);



$.getJSON("sampledata/samples1.json", function (data){ 
	var sample_info = data[song_name];
	var sample_section = document.getElementById("sample_section");
	if (!sample_info)
	{
		var sample_section_title = document.getElementById("sample_section_title");
		sample_section_title.innerHTML = "No Samples";
	}
	for (var i=0; i<sample_info.length; i++)
	{
		var title = document.createElement("h4");
		title.innerHTML =  sample_info[i]["Sample"] + " by " + sample_info[i]["Artist"] + " " + sample_info[i]["Date"];

		var sample_box = document.createElement("div");
		sample_box.className = "sample_box";
		var left_side = document.createElement("div");
		left_side.className = "sample_left";

		var div_sample = document.createElement("div");
		div_sample.className = "sample_group";


		const myArray = sample_info[i]["Timestamp"].split(" ");
		let skip = myArray[1];
		skip = Number(skip.split(":")[0] * 60) + Number(skip.split(":")[1]);
		console.log(skip);
		var link_iframe = document.createElement('iframe');
		link_iframe.src = sample_info[i]["Link"] + "?start=" + skip;


		var tree_div_element = document.createElement('div');
		tree_div_element.className = "tf-tree";

		sample_box.appendChild(left_side);
		sample_box.appendChild(tree_div_element);

		div_sample.appendChild(title);
		left_side.appendChild(link_iframe);
		div_sample.appendChild(sample_box);



		sample_section.appendChild(div_sample);


		var genre_ul = document.createElement("ul");
		var timestamp_li = document.createElement("li");
		var type_li = document.createElement("li");
		var genre_li = document.createElement("li");
		var timestamp_span = document.createElement('span');
		var type_span = document.createElement('span');
		var genre_span = document.createElement('span');
		tree_div_element.appendChild(genre_ul);

		genre_ul.appendChild(genre_li);
		timestamp_span.className = "tf-nc";
		timestamp_span.innerHTML = sample_info[i]["Timestamp"];
		type_span.className = "tf-nc";
		type_span.innerHTML = sample_info[i]["Type"];
		genre_span.className = "tf-nc";
		genre_span.innerHTML = sample_info[i]["Genre"];
		timestamp_li.appendChild(timestamp_span);
		type_li.appendChild(type_span);
		genre_li.appendChild(genre_span);

		left_side.appendChild(timestamp_span);


		var location_ul = document.createElement("ul");
		var type_ul = document.createElement("ul");
		var pitch_ul = document.createElement("ul");

		var date_li = document.createElement("li");
		var pitch_li = document.createElement("li");
		var location_li = document.createElement("li");
		var date_span = document.createElement('span');
		var pitch_span = document.createElement('span');
		var location_span = document.createElement('span');
		date_li.appendChild(date_span);
		pitch_li.appendChild(pitch_span);
		location_li.appendChild(location_span);

		genre_li.appendChild(type_ul);
		type_ul.appendChild(type_li);

		type_li.appendChild(pitch_ul);
		pitch_ul.appendChild(pitch_li);
		pitch_li.appendChild(location_ul)
		location_ul.appendChild(location_li);
		date_span.className = "tf-nc";
		pitch_span.className = "tf-nc";
		location_span.className = "tf-nc";
		date_span.innerHTML = sample_info[i]["Date"];
		pitch_span.innerHTML = sample_info[i]["Pitch"];
		location_span.innerHTML = sample_info[i]["Location"];
	
	}
	//The parameters of your tree

});
//MUSIC PLAYER
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = [song_name_only];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = color_url;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.play();
  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);
//MUSIC PLAYER END