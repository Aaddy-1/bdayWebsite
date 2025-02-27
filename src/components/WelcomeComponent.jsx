import { useState, useRef, useEffect } from "react";
import {
  PlayArrowOutlined as PlayIcon,
  PauseOutlined as PauseIcon,
  SkipPreviousOutlined as PrevIcon,
  SkipNextOutlined as NextIcon,
} from "@mui/icons-material";
import "./welcome.css";

const WelcomeComponent = () => {
  const songs = [
    { title: "Yellow", src: "songs/yellow.mp3", thumbnail: "images/yellow.jpg" },
    // { title: "Call It What You Want", src: "songs/callitWhatYouWant.mp3", thumbnail: "images/callItWhatYouWant.png" },
    { title: "All Too Well", src: "songs/allTooWell.mp3", thumbnail: "images/allTooWell.jpg" },
    { title: "Ye Tune Kya Kiya", src: "songs/yeTuneKyaKiya.mp3", thumbnail: "images/yeTuneKyaKiya.jpg" },
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => console.error("Audio play error:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(false);
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(false);
  };

  const handleProgressChange = (e) => {
    if (!audioRef.current) return;
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5E6CC] p-6">
      
      <div className="max-w-2xl text-center bg-[#D2B48C] p-6 shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold text-[#5C4033] mb-4">Welcome!</h1>
        <p className="message">
        Hello Aliza, Happy Birthdayy!!
        I'm writing this message at 4:00 AM, Arizona time on the 27th of Feb, you think I am sleeping rn, but hehe I never sleep. 
        I wanted to start this message off by saying that you are the most special person I have ever met in my life, ever. 
        You know that I believe god isn't real, but I believe that only in our specific case, hamara milna was divine serendipity (Go ahead, look up what serendipity means hehe).  
        I guess God must have been like "bhatka hua hai bechara pure din mere against bolta rehta hai, abhi ek aisi ladki se milvata hoon seedha kar degi". 
        And yes, seedha toh tune mujhe kiya Aliza, for the better, and I thank you so much for that. 
        <br></br>
        I mean look at you! Who wouldn't want to be your friend, you are the strongest person I know, who suffered such an unbearable tragedy in your life, but is still getting up every day, and working so hard through all of it. I wish I had even 10% of your strength. I'd like to believe that if Ananya were here, she'd be so happy to see you being strong every day.
        I once said that I believe you are the best version of myself. That still holds true, never ever think that you are lesser than anyone else, or that you are mean or selfish or whatever. When you asked me the other day if I thought you were selfish, it reminded me of a lyric of one of my favourite songs.
        <br></br>
        <br></br>
        "When you think the night has seen your mind  
        That inside you're twisted and unkind  
        Let me stand to show that you are blind  
        Please put down your hands  
        'Cause I see you"
        <br></br>
        <br></br>
        'Cause I SEE you Aliza. I really do. I saw you ever since the day I fell in love with you. You're one of the purest souls I have ever had the privilege of coming into contact with, You're the smartest, the funniest, and of course the prettiest. You make everyones life better just by being in their lives. 
        Every day, I feel so grateful to have you in my life, through all of our ups and downs, and I just made this website to give a small token of respect to you, and although you didnt send me any pics so I had to make do with screenshotting videos and AI-ing myself out of the images wherever possible, I guess I deserve it too for acting like a creep. Welp.
        <br></br>
        <br></br>
        Okay now listen to these songs, most of them are your favorites, I've only put one song from my side (Yellow), because I think about you whenever I listen to that song.
        <br></br>
        <br></br>
        Look at the stars
        <br></br>
        Look how they shine for you 
        <br></br> 
        And everything you do.
        <br></br>
        It's Trueee,
        <br></br>
        Look how they shine for Youuu
        <br></br>
        Look how they shine for Youuu
        <br></br>
        </p>
      </div>

      <div className="music-player">
      <h2 className={`now-playing ${isPlaying ? "fade-in" : "fade-out"}`}>
        {isPlaying ? "Now Playing" : "Tap to Play"}
      </h2>

        <p className="song-title">{songs[currentSongIndex].title}</p>

        <div className="thumbnail-progress-container">
          <div className="thumbnail-container">
            {songs[currentSongIndex].thumbnail ? (
              <img
                src={songs[currentSongIndex].thumbnail}
                alt="Thumbnail"
                className="thumbnail"
                onError={(e) => {
                  e.target.style.display = "none";
                  console.error("Image failed to load:", songs[currentSongIndex].thumbnail);
                }}
              />
            ) : (
              <p className="no-image">No image available</p>
            )}
          </div>

          {/* Centered Progress Bar */}
          <div className="progress-container">
            <input
              ref={progressRef}
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="progress-bar"
            />
          </div>
        </div>


        <audio ref={audioRef} className="hidden">
          <source src={songs[currentSongIndex].src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {/* Custom progress bar */}
      

        <div className="controls">
          <button onClick={prevSong} className="control-button">
            <PrevIcon fontSize="medium" />
          </button>
          <button onClick={togglePlayPause} className="control-button play-pause">
            {isPlaying ? <PauseIcon fontSize="medium" /> : <PlayIcon fontSize="medium" />}
          </button>
          <button onClick={nextSong} className="control-button">
            <NextIcon fontSize="medium" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeComponent;
