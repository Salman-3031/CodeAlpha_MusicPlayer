// import { useRef, useState, useEffect } from "react";
// import jsmediatags from "jsmediatags/dist/jsmediatags.min.js";

// const MusicPlayer = () => {

//   const audioRef = useRef(new Audio());

//   const [playlist, setPlaylist] = useState([]);

//   const [currentSongIndex, setCurrentSongIndex] = useState(0);

//   const [isPlaying, setIsPlaying] = useState(false);

//   const [currentTime, setCurrentTime] = useState(0);

//   const [duration, setDuration] = useState(0);

//   const [volume, setVolume] = useState(1);

//   // Upload Songs
//   const handleSongsUpload = (e) => {

//     const files = Array.from(e.target.files);

//     files.forEach((file) => {

//       jsmediatags.read(file, {

//         onSuccess: (tag) => {

//           const title =
//             tag.tags.title || file.name;

//           const artist =
//             tag.tags.artist || "Unknown Artist";

//           let cover = "";

//           // Extract Cover Image
//           if (tag.tags.picture) {

//             const picture = tag.tags.picture;

//             let base64String = "";

//             for (let i = 0; i < picture.data.length; i++) {
//               base64String += String.fromCharCode(
//                 picture.data[i]
//               );
//             }

//             cover = `data:${picture.format};base64,${window.btoa(base64String)}`;
//           }

//           const song = {
//             title,
//             artist,
//             cover,
//             file,
//             url: URL.createObjectURL(file),
//           };

//           setPlaylist((prev) => [...prev, song]);
//         },

//         onError: (error) => {
//           console.log(error);
//         },
//       });
//     });
//   };

//   // Load Current Song
//   useEffect(() => {

//     if (!playlist.length) return;

//     audioRef.current.pause();

//     audioRef.current = new Audio(
//       playlist[currentSongIndex].url
//     );

//     audioRef.current.volume = volume;

//     if (isPlaying) {
//       audioRef.current.play();
//     }

//     audioRef.current.addEventListener(
//       "timeupdate",
//       () => {
//         setCurrentTime(
//           audioRef.current.currentTime
//         );
//       }
//     );

//     audioRef.current.addEventListener(
//       "loadedmetadata",
//       () => {
//         setDuration(
//           audioRef.current.duration
//         );
//       }
//     );

//     // Autoplay Next Song
//     audioRef.current.addEventListener(
//       "ended",
//       nextSong
//     );

//     return () => {
//       audioRef.current.pause();
//     };

//   }, [currentSongIndex, playlist]);

//   // Play / Pause
//   const togglePlayPause = () => {

//     if (!playlist.length) return;

//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }

//     setIsPlaying(!isPlaying);
//   };

//   // Next Song
//   const nextSong = () => {

//     if (!playlist.length) return;

//     setCurrentSongIndex((prev) =>
//       prev === playlist.length - 1
//         ? 0
//         : prev + 1
//     );
//   };

//   // Previous Song
//   const prevSong = () => {

//     if (!playlist.length) return;

//     setCurrentSongIndex((prev) =>
//       prev === 0
//         ? playlist.length - 1
//         : prev - 1
//     );
//   };

//   // Progress Bar
//   const handleProgress = (e) => {

//     const value = e.target.value;

//     audioRef.current.currentTime = value;

//     setCurrentTime(value);
//   };

//   // Volume
//   const handleVolume = (e) => {

//     const value = e.target.value;

//     setVolume(value);

//     audioRef.current.volume = value;
//   };

//   // Format Time
//   const formatTime = (time) => {

//     if (!time) return "0:00";

//     const minutes = Math.floor(time / 60);

//     const seconds = Math.floor(time % 60);

//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   const currentSong =
//     playlist[currentSongIndex];

//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center p-5">

//       <div className="bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl text-white">

//         {/* Upload */}
//         <input
//           type="file"
//           accept="audio/*"
//           multiple
//           onChange={handleSongsUpload}
//           className="mb-6 w-full text-sm"
//         />

//         {/* Cover */}
//         <div className="w-full h-72 bg-slate-800 rounded-2xl overflow-hidden">

//           {currentSong?.cover ? (

//             <img
//               src={currentSong.cover}
//               alt=""
//               className="w-full h-full object-cover"
//             />

//           ) : (

//             <div className="w-full h-full flex items-center justify-center text-slate-500">
//               No Cover
//             </div>

//           )}
//         </div>

//         {/* Song Info */}
//         <div className="text-center mt-6">

//           <h2 className="text-2xl font-bold">
//             {currentSong?.title || "No Song"}
//           </h2>

//           <p className="text-slate-400 mt-1">
//             {currentSong?.artist || ""}
//           </p>
//         </div>

//         {/* Progress */}
//         <div className="mt-6">

//           <input
//             type="range"
//             min="0"
//             max={duration || 0}
//             value={currentTime}
//             onChange={handleProgress}
//             className="w-full"
//           />

//           <div className="flex justify-between text-sm text-slate-400 mt-1">

//             <span>
//               {formatTime(currentTime)}
//             </span>

//             <span>
//               {formatTime(duration)}
//             </span>

//           </div>
//         </div>

//         {/* Controls */}
//         <div className="flex items-center justify-center gap-5 mt-8">

//           <button
//             onClick={prevSong}
//             className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-full"
//           >
//             ⏮
//           </button>

//           <button
//             onClick={togglePlayPause}
//             className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-full text-xl"
//           >
//             {isPlaying ? "⏸" : "▶"}
//           </button>

//           <button
//             onClick={nextSong}
//             className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-full"
//           >
//             ⏭
//           </button>

//         </div>

//         {/* Volume */}
//         <div className="mt-8">

//           <label className="text-sm text-slate-300">
//             Volume
//           </label>

//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.01"
//             value={volume}
//             onChange={handleVolume}
//             className="w-full mt-2"
//           />

//         </div>

//         {/* Playlist */}
//         <div className="mt-8">

//           <h3 className="text-lg font-semibold mb-3">
//             Playlist
//           </h3>

//           <div className="space-y-2 max-h-52 overflow-auto">

//             {playlist.map((song, index) => (

//               <div
//                 key={index}
//                 onClick={() =>
//                   setCurrentSongIndex(index)
//                 }
//                 className={`p-3 rounded-xl cursor-pointer transition ${
//                   currentSongIndex === index
//                     ? "bg-indigo-500"
//                     : "bg-slate-800 hover:bg-slate-700"
//                 }`}
//               >
//                 <p className="font-medium">
//                   {song.title}
//                 </p>

//                 <p className="text-sm text-slate-300">
//                   {song.artist}
//                 </p>
//               </div>

//             ))}

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default MusicPlayer;


import { useRef, useState, useEffect } from "react";
import jsmediatags from "jsmediatags/dist/jsmediatags.min.js";

// DEFAULT SONGS
import song1 from "../assets/songs/Dhoom 3 - Bande Hain Hum Uske.mp3";
import song2 from "../assets/songs/Saree Ke Fall Sa (R...Rajkumar).mp3";
import song3 from "../assets/songs/song1 Pehli_Si_Muhabbat_OST_Ali_Zafar_ARY_Digital_Drama(128k).mp3";

const MusicPlayer = () => {
    const audioRef = useRef(new Audio());

    const [playlist, setPlaylist] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    // ---------------------------
    // Convert URL → File (IMPORTANT)
    // ---------------------------
    const urlToFile = async (url, filename) => {
        const res = await fetch(url);
        const blob = await res.blob();
        return new File([blob], filename, { type: "audio/mpeg" });
    };

    // ---------------------------
    // Extract metadata from file
    // ---------------------------
    const extractSong = (file) => {
        return new Promise((resolve) => {
            jsmediatags.read(file, {
                onSuccess: (tag) => {
                    const title = tag.tags.title || file.name;
                    const artist = tag.tags.artist || "Unknown Artist";

                    let cover = "";

                    if (tag.tags.picture) {
                        const picture = tag.tags.picture;

                        let base64 = "";
                        for (let i = 0; i < picture.data.length; i++) {
                            base64 += String.fromCharCode(picture.data[i]);
                        }

                        cover = `data:${picture.format};base64,${window.btoa(base64)}`;
                    }

                    resolve({
                        title,
                        artist,
                        cover,
                        url: URL.createObjectURL(file),
                    });
                },

                onError: () => {
                    resolve({
                        title: file.name,
                        artist: "Unknown Artist",
                        cover: "",
                        url: URL.createObjectURL(file),
                    });
                },
            });
        });
    };

    // ---------------------------
    // Load default songs ON START
    // ---------------------------
    useEffect(() => {
        const loadDefaults = async () => {
            const files = await Promise.all([
                urlToFile(song1, "song1.mp3"),
                urlToFile(song2, "song2.mp3"),
                urlToFile(song3, "song3.mp3"),
            ]);

            const songs = await Promise.all(files.map(extractSong));

            setPlaylist(songs);
        };

        loadDefaults();
    }, []);

    // ---------------------------
    // Upload Songs
    // ---------------------------
    const handleSongsUpload = async (e) => {
        const files = Array.from(e.target.files);

        const songs = await Promise.all(files.map(extractSong));

        setPlaylist((prev) => [...prev, ...songs]);
    };

    // ---------------------------
    // Load Song
    // ---------------------------
    useEffect(() => {
        if (!playlist.length) return;

        audioRef.current.pause();

        audioRef.current = new Audio(
            playlist[currentSongIndex].url
        );

        audioRef.current.volume = volume;

        if (isPlaying) {
            audioRef.current.play();
        }

        audioRef.current.addEventListener("timeupdate", () => {
            setCurrentTime(audioRef.current.currentTime);
        });

        audioRef.current.addEventListener("loadedmetadata", () => {
            setDuration(audioRef.current.duration);
        });

        audioRef.current.addEventListener("ended", nextSong);

        return () => {
            audioRef.current.pause();
        };
    }, [currentSongIndex, playlist]);

    // ---------------------------
    // Controls
    // ---------------------------
    const togglePlayPause = () => {
        if (!playlist.length) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        setCurrentSongIndex((prev) =>
            prev === playlist.length - 1 ? 0 : prev + 1
        );
    };

    const prevSong = () => {
        setCurrentSongIndex((prev) =>
            prev === 0 ? playlist.length - 1 : prev - 1
        );
    };

    const handleProgress = (e) => {
        const value = e.target.value;
        audioRef.current.currentTime = value;
        setCurrentTime(value);
    };

    const handleVolume = (e) => {
        const value = e.target.value;
        setVolume(value);
        audioRef.current.volume = value;
    };

    const formatTime = (time) => {
        if (!time) return "0:00";
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const currentSong = playlist[currentSongIndex];

    return (
        <div
        style={{backgroundImage: "url(https://c4.wallpaperflare.com/wallpaper/969/885/222/music-background-old-style-record-deck-wallpaper-preview.jpg)"}} loading="lazy" className="min-h-screen bg-cover flex items-center justify-center p-5">

            <div className="bg-black w-full max-w-md rounded-3xl p-6 text-white">

                {/* Upload */}
                <input
                    type="file"
                    accept="audio/*"
                    multiple
                    onChange={handleSongsUpload}
                    className="mb-4 w-full text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-primary
                    hover:file:bg-violet-100
                    cursor:pointer"

                />

                {/* Cover */}
                <div className="h-64 w-full object-cover bg-gray-900 rounded-2xl overflow-hidden">
                    {currentSong?.cover ? (
                        <img
                            src={currentSong.cover}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            No Cover
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="text-center mt-5">
                    <h2 title={currentSong?.title} className="text-xl font-bold truncate">
                        {currentSong?.title || "Loading..."}
                    </h2>
                    <p className="text-slate-400">
                        {currentSong?.artist}
                    </p>
                </div>

                {/* Progress */}
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgress} 
                    className="w-full mt-5 accent-primary cursor-pointer"
                />

                <div className="flex justify-between text-sm text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-5 mt-6">

                    <button onClick={prevSong} className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-full">
                        ⏮
                    </button>

                    <button
                        onClick={togglePlayPause}
                        className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-full sm:min-w-16"
                    >
                        {isPlaying ? "⏸" : "▶"}
                    </button>

                    <button onClick={nextSong} className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-full">
                        ⏭
                    </button>

                </div>

                {/* Volume */}
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolume}
                    className="w-full mt-5 accent-primary cursor-pointer"
                />

                {/* Playlist */}
                {/* max-h-48 */}
                <div style={{scrollbarWidth: "none"}} className="mt-6 max-h-48 overflow-y-auto">
                    {playlist.map((song, index) => (
                        <div
                            title={song.title}
                            key={index}
                            onClick={() => setCurrentSongIndex(index)}
                            className={`p-2 mt-2 text-sm cursor-pointer rounded truncate ${index === currentSongIndex
                                ? "bg-primary"
                                : "hover:bg-primary/50"
                                }`}
                        >
                            {song.title}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MusicPlayer;