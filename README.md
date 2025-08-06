# **LOFI-CODE** 🎵💻  

A **Lofi Music Player** built with **Electron.js**, **Node Js**, **JSON**, HTML, CSS, and JavaScript. Perfect for coding sessions with chill beats!  

---

## **📌 Features**  
✔ **Play/Pause** lofi tracks  
✔ **Volume control**  
✔ **Custom visualizer**  
✔ **Minimalist UI** with dark theme  
✔ **Cross-platform** (Windows, macOS, Linux)  

---

## **🚀 Getting Started**

### 🧑‍💻 For Developers (Run from Source)

#### **Prerequisites**  
- Node.js (v14 or later)  
- npm or Yarn  

#### **Steps**
1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/LOFI-CODE.git
   cd LOFI-CODE


2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the app**

   ```bash
   npm start
   ```

4. **(Optional) Build the app locally**
   This will generate an installable `.exe` or `.msi` file in the `dist/` folder.

   ```bash
   npm run dist
   ```

---

### 🖥️ For End Users (Run as Installed App)

If you don’t want to use the command line:

1. Navigate to the `dist/` folder after the developer builds it.
2. Open the `lofi-code Setup.exe` or `lofi-code 1.0.0.msi` file.
3. Follow the installation wizard to install the app like a regular program.
4. Launch it from the Start Menu or Desktop shortcut!

> 📦 Note: You only need to do this once — no coding knowledge needed.

---

## **🛠 Project Structure**

```
LOFI-CODE/  
├── assets/            # Images & icons  
├── fonts/             # Custom fonts  
├── src/               # Main JS logic  
├── styles/            # CSS files  
├── index.html         # Main window  
├── main.js            # Electron config  
├── package.json       # Dependencies  
└── README.md          # You're here!  
```

---

## **🎨 Customization**

### 🖼️ Change App Icon

Replace `build/icon.ico` with your custom `.ico` file.
Make sure it’s referenced in `package.json` under the `"build"` section.

### 🎨 Change Menu Color

Edit the theme in `main.js`:

```js
nativeTheme.themeSource = 'dark'; // or 'light', or 'system'
```

### 🎶 Add More Tracks

Drop `.mp3` files into `assets/music/` and update the track list in `src/player.js`.

---

## **📦 Packaging Commands Recap**

| Command        | Action                            |
| -------------- | --------------------------------- |
| `npm start`    | Run app in development            |
| `npm run dist` | Create production `.exe` / `.msi` |
| `npm install`  | Install all dependencies          |

---

## **📜 License**

MIT © \ Adriel Babalola

---

**Enjoy coding with LOFI vibes!** 🎧🚀

