var sd_song_info = document.getElementById("song_info");
var sd_song_title = document.createElement("h3");
var sd_song_cover = document.createElement("img");
var song_name = window.localStorage.getItem("song_name");
var cover_url = window.localStorage.getItem("cover_url");
sd_song_title.append(song_name);
sd_song_info.appendChild(sd_song_title);
sd_song_cover.src = cover_url;
sd_song_cover.width = "350";
sd_song_cover.height = "350";
sd_song_info.appendChild(sd_song_cover);
function tree_section(sample_section)
{
	// Parent Section
	var tree = document.createElement("div");
	tree.className = "tree";
	sample_section.appendChild(tree);
	var ul1 = document.createElement("ul");
	tree.appendChild(ul1);
	var li1 = document.createElement("li");
	ul1.appendChild(li1);
	var h3_1 = document.createElement("h3")
	h3_1.className = "parent";
	li1.appendChild(h3_1)

	// Child Section
	//Child elements need to be offset by parent element size
	var child_section = document.createElement("ul");
	li1.appendChild(child_section);
	var timestamp_li = document.createElement("li");
	child_section.appendChild(timestamp_li);
	var timestamp_h3 = document.createElement("h3");
	timestamp_h3.className = "timestamp";
	timestamp_li.appendChild(timestamp_h3);

	var type_li = document.createElement("li");
	child_section.appendChild(type_li);
	var type_h3 = document.createElement("h3")
	type_h3.className = "type";
	type_li.appendChild(type_h3);

	var genre_li = document.createElement("li");
	child_section.appendChild(genre_li);
	var genre_h3 = document.createElement("h3")
	genre_h3.className = "genre";
	genre_li.appendChild(genre_h3);

	var grandchild_section = document.createElement("ul");
	timestamp_li.appendChild(grandchild_section);
	var date_li = document.createElement("li");
	grandchild_section.appendChild(date_li);
	var date_h3 = document.createElement("h3");
	date_h3.className = "date";
	date_li.appendChild(date_h3);

	var grandchild_section2 = document.createElement("ul");
	type_li.appendChild(grandchild_section2);
	var pitch_li = document.createElement("li");
	grandchild_section2.appendChild(pitch_li);
	var pitch_h3 = document.createElement("h3");
	pitch_h3.className = "pitch";
	pitch_li.appendChild(pitch_h3);

	var grandchild_section3 = document.createElement("ul");
	genre_li.appendChild(grandchild_section3);
	var location_li = document.createElement("li");
	grandchild_section3.appendChild(location_li);
	var location_h3 = document.createElement("h3");
	location_h3.className = "location";
	location_li.appendChild(location_h3);

	// When doing grand children use grandchild-{i} as it's class name
	// And select it as such

}

$.getJSON("sampledata/samples1.json", function (data){ 
	
	var sample_info = data[song_name];
	for (var i = 0; i <sample_info.length; i++)
	{
		var sample_section = document.getElementById("sample_section");
		tree_section(sample_section);
		var parent = document.getElementsByClassName("parent")[i];

		var br = document.createElement("br");
		var tree = document.getElementsByClassName("tree")[i];
		var iframe_tag = document.createElement("iframe");

		iframe_tag.src = sample_info[i]["Link"];
		sample_section.insertBefore(iframe_tag, tree);
		   parent.append(sample_info[i]["Sample"]);
		   parent.appendChild(br);
		 parent.append("by ");
		 parent.append(sample_info[i]["Artist"]);

		var timestamp_element = document.getElementsByClassName("timestamp")[i];
		timestamp_element.append(sample_info[i]["Timestamp"]);
		var br2 = document.createElement("br");
		timestamp_element.appendChild(br2);
		timestamp_element.append(sample_info[i]["Timestamp2"]);

		var type_element = document.getElementsByClassName("type")[i];
		type_element.append(sample_info[i]["Type"]);

		var genre_element = document.getElementsByClassName("genre")[i];
		genre_element.append(sample_info[i]["Genre"]);

		var date_element = document.getElementsByClassName("date")[i];
		date_element.append(sample_info[i]["Date"]);

	}
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
const songs = [song_name];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = cover_url;
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