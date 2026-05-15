# React Music Player

A modern and responsive music player built using **React**, **Tailwind CSS**, and **JavaScript**.

This project allows users to play songs, upload single or multiple audio files, control playback, manage volume, and view song metadata such as title, artist, and cover image in a clean and interactive UI.

---

## Features

* Responsive and modern music player UI
* Play and pause functionality
* Next and previous song controls
* Real-time song progress bar
* Volume control slider
* Dynamic playlist rendering
* Upload single or multiple songs at once
* Automatic metadata extraction from MP3 files
* Displays:
  * Song title
  * Artist name
  * Album cover image
* Auto play next song when current song ends
* Default songs loaded on startup
* Scrollable playlist section
* Smooth hover effects and transitions
* Fully component-based React structure

---

## Core React Concepts Used

### useState()

Used for managing dynamic states like:

* Playlist data
* Current song index
* Play/Pause state
* Song duration
* Current playback time
* Volume control

---

### useRef()

`useRef()` is used to directly access and control the HTML Audio object without re-rendering the component.

Used for:

* Playing audio
* Pausing audio
* Changing current playback time
* Updating volume
* Loading songs dynamically

---

### useEffect()

`useEffect()` is used for side effects and lifecycle handling.

Used for:

* Loading default songs on startup
* Updating audio when song changes
* Listening to:
  * `timeupdate`
  * `loadedmetadata`
  * `ended`
* Automatically moving to next song

---

## Metadata Extraction

This project uses:

* `jsmediatags`

to extract MP3 metadata such as:

* Song title
* Artist name
* Album cover image

If metadata is unavailable, fallback values are displayed automatically.

---

## Technologies Used

* React.js
* JavaScript (ES6+)
* Tailwind CSS
* jsmediatags
* HTML5 Audio API

---

## Functionalities Included

### Audio Controls

* Play Song
* Pause Song
* Next Song
* Previous Song

---

### Song Upload System

Users can:

* Upload a single song
* Upload multiple songs together

Supported using:

```html
multiple
```

attribute in file input.

---

### Dynamic Playlist

* Songs are rendered dynamically
* Clicking any playlist item instantly plays the song
* Current playing song is highlighted

---

### Real-Time Progress Tracking

* Song progress updates automatically
* User can seek any position using the range slider

---

### Volume Management

* Adjustable volume slider
* Updates audio volume in real time

---

## Default Songs Included

The player automatically loads default songs on startup using imported local MP3 files.

Example:

* Bande Hain Hum Uske
* Saree Ke Fall Sa
* Pehli Si Muhabbat

---

## Project Structure

```bash
Music-Player/
│
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
│
├── public/
│
└── src/
    │
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    │
    ├── components/
    │   └── MusicPlayer.jsx
    │
    └── assets/
        │
        ├── songs/
        │   ├── song1.mp3
        │   ├── song2.mp3
        │   └── song3.mp3
        │
        └── images/
```

---

## How to Run the Project

1. Clone or download the repository
2. open in vs code
3. In terminal install dependencies by, npm i
4. run npm run dev, open the url in browser

```bash
git clone your-github-link
```

2. Open project folder

3. Install dependencies

```bash
npm install
```

4. Start development server

```bash
npm run dev
```

---

## Live Demo

GitHub Repository:
👉🏻 `https://github.com/Salman-3031/CodeAlpha_MusicPlayer`

Live Website:
👉🏻 ``

---

## Future Improvements

* Shuffle functionality
* Repeat mode
* Music visualizer
* Dark/Light theme toggle
* Drag and drop song upload
* Mobile app version

---

## Author

**Salloo**
Frontend Developer & Beginner Backend Developer

---

## Skills

* HTML
* CSS
* JavaScript
* Tailwind CSS
* React.js
* Node.js (Beginner)
* Express.js
* MongoDB
