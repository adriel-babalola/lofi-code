# **LOFI-CODE** 🎵💻  

A **Lofi Music Player** built with **Electron.js**, HTML, CSS, and JavaScript. Perfect for coding sessions with chill beats!  

---

## **📌 Features**  
✔ **Play/Pause** lofi tracks  
✔ **Volume control**  
✔ **Custom visualizer**  
✔ **Minimalist UI** with dark theme  
✔ **Cross-platform** (Windows, macOS, Linux)  

---

## **🚀 Installation**  

### **Prerequisites**  
- Node.js (v14+)  
- npm / Yarn  

### **Steps**  
1. **Clone the repo**  
   ```sh
   git clone https://github.com/yourusername/LOFI-CODE.git
   cd LOFI-CODE
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Run the app**  
   ```sh
   npm start
   ```

4. **Build for your OS** (Optional)  
   ```sh
   npm run package
   ```

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
### **Change App Icon**  
Replace `assets/logo2.png` with your own icon.  

### **Change Menu Color**  
Edit `main.js` to modify the menu theme:  
```javascript
nativeTheme.themeSource = 'dark'; // or 'light'
```

### **Add More Tracks**  
Place `.mp3` files in `assets/music/` and update the player logic in `src/player.js`.  

---

## **📜 License**  
MIT © [YourName]  

---

**Enjoy coding with LOFI vibes!** 🎧🚀  

---
