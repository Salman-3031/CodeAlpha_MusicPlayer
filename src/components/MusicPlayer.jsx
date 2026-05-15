import { useRef, useState, useEffect } from "react";
import jsmediatags from "jsmediatags/dist/jsmediatags.min.js";

// DEFAULT SONGS
import Bande_hain_hum_uske from "../assets/songs/Dhoom 3 - Bande Hain Hum Uske.mp3";
import saare_ke_fall_se from "../assets/songs/Saree Ke Fall Sa (R...Rajkumar).mp3";
import pehli_si_mohabbat from "../assets/songs/song1 Pehli_Si_Muhabbat_OST_Ali_Zafar_ARY_Digital_Drama(128k).mp3";

const MusicPlayer = () => {
    const audioRef = useRef(new Audio());

    const [playlist, setPlaylist] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);


    // Convert URL → File (IMPORTANT)
    const urlToFile = async (url, filename) => {
        const res = await fetch(url);
        const blob = await res.blob();
        return new File([blob], filename, { type: "audio/mpeg" });
    };


    // Extract metadata from file
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


    // Load default songs ON START
    useEffect(() => {
        const loadDefaults = async () => {
            const files = await Promise.all([
                urlToFile(Bande_hain_hum_uske, "Bande_hain_hum_uske.mp3"),
                urlToFile(saare_ke_fall_se, "saare_ke_fall_se.mp3"),
                urlToFile(pehli_si_mohabbat, "pehli_si_mohabbat.mp3"),
            ]);

            const songs = await Promise.all(files.map(extractSong));

            setPlaylist(songs);
        };

        loadDefaults();
    }, []);


    // Upload Songs
    const handleSongsUpload = async (e) => {
        const files = Array.from(e.target.files);

        const songs = await Promise.all(files.map(extractSong));

        setPlaylist((prev) => [...prev, ...songs]);
    };


    // Load Song
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


    // Controls
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
            style={{ backgroundImage: "url(https://c4.wallpaperflare.com/wallpaper/969/885/222/music-background-old-style-record-deck-wallpaper-preview.jpg)"}} loading="lazy" className="min-h-screen bg-cover flex items-center justify-center p-5">

            <div className="bg-black w-full max-w-md rounded-3xl p-6 text-white">

                {/* Upload */}
                <input
                    type="file"
                    accept="audio/*"
                    multiple
                    onChange={handleSongsUpload}
                    className="mb-4 text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-primary
                    hover:file:bg-white/90
                    cursor:pointer inline-block w-1/2 text-transparent"
                />

                <p className="text-sm text-gray-400 mb-2 inline-block text-right w-1/2 p-1 rounded-bl-3xl">
                    Total Songs: <span className="text-base text-primary">{playlist.length}</span>
                </p>

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
                <div style={{ scrollbarWidth: "none" }} className="mt-6 max-h-48 overflow-y-auto">
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