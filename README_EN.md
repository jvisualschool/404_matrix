# Matrix 404 Error Page 🕶️

A cinematic Matrix-style 404 error page with Korean and English multilingual support, featuring cascading digital rain effects and customizable settings.

> **한국어**: [README.md](README.md)

## ✨ Features

### 🎬 Matrix Digital Rain Effect
- Authentic Matrix movie-style digital rain animation
- Korean words with English translations displayed vertically
- Smooth character transitions and color effects
- Customizable drop speed (including pause option)

### 🌏 Multilingual Support
- **Korean (한글)** and **English** language toggle
- Real-time language switching for all UI elements
- Localized 404 messages and interface text
- Easy language selection with `[한글|Eng]` toggle button

### 🎨 Customizable Themes
- **Green** (Classic Matrix)
- **Amber** (Retro Terminal)
- **Gray** (Monochrome)
- Smooth color transitions with wave-like effects

### ⚙️ Advanced Settings Panel
- **Font Selection**: 10 different Korean and English fonts including:
  - Noto Sans Korean, 맑은 고딕, 나눔고딕, 나눔명조
  - 나눔펜스크립트, 주아, 감자꽃, 도현, 검은고딕, Courier New
- **Font Size**: Adjustable from 12px to 24px
- **Animation Speed**: 0-10 speed levels (0 = freeze)
- **Canvas Size**: Fullscreen, Fixed, or Custom dimensions

### 🖱️ Interactive Mouse Effects
- **Ripple**: Expanding circles on mouse movement
- **Explosion**: Particle effects with Korean/English characters
- **Freeze**: Temporary slow-motion effect in mouse area
- **None**: Disable mouse effects

### 📝 Customizable Content
- Editable title (default: "404")
- Customizable error message
- Real-time preview of changes
- Language-appropriate default messages

## 🚀 Quick Start

### Option 1: Direct Download
1. Download all files (`index.html`, `style.css`, `script.js`)
2. Open `index.html` in your web browser
3. Enjoy the Matrix experience!

### Option 2: Clone Repository
```bash
git clone https://github.com/yourusername/404_matrix.git
cd 404_matrix
```

Then open `index.html` in your browser.

## 🎯 Usage

### Basic Usage
Simply open `index.html` in any modern web browser. The Matrix effect will start automatically with Korean language as default.

### Language Switching
Click the `[한글|Eng]` toggle in the settings panel to switch between Korean and English.

### Customization
1. **Open Settings Panel**: Click the `◀` button (top-left)
2. **Change Language**: Use the `[한글|Eng]` toggle
3. **Select Font**: Choose from 10 available fonts
4. **Adjust Settings**: Modify font size, speed, colors, and effects
5. **Custom Messages**: Edit title and message text
6. **Mouse Effects**: Select your preferred interaction style

### Integration as 404 Page
To use this as your website's 404 error page:

1. **Apache**: Add to `.htaccess`:
```apache
ErrorDocument 404 /404_matrix/index.html
```

2. **Nginx**: Add to server configuration:
```nginx
error_page 404 /404_matrix/index.html;
```

3. **Static Hosting**: Rename `index.html` to `404.html` for platforms like GitHub Pages, Netlify, or Vercel.

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure and Canvas API
- **CSS3**: Advanced animations, transitions, and responsive design
- **Vanilla JavaScript**: ES6+ features, no external dependencies
- **Canvas 2D API**: High-performance graphics rendering

### Browser Support
- ✅ Chrome/Chromium 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- 📱 Mobile browsers (responsive design)

### Performance Features
- Optimized animation loops with `requestAnimationFrame`
- Efficient memory management
- Debounced resize events
- Minimal DOM manipulation

## 📱 Mobile Responsiveness

The page is fully responsive and includes:
- Adaptive font sizes using `clamp()`
- Touch-friendly interface elements
- Optimized settings panel for smaller screens
- Responsive canvas sizing

## 🎨 Customization Examples

### Adding New Languages
```javascript
// In script.js, extend the translations object
this.translations = {
    ko: { /* Korean translations */ },
    en: { /* English translations */ },
    es: { /* Add Spanish translations */ }
};
```

### Custom Color Themes
```css
/* In style.css, add new theme */
.theme-purple {
    color: #9d4edd;
}
```

## 🔧 Configuration Options

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `fontSize` | Number | 16 | Font size in pixels (12-24) |
| `fontFamily` | String | 'Noto Sans KR' | CSS font family |
| `speed` | Number | 5 | Drop speed (0-10, 0=pause) |
| `color` | String | 'green' | Theme color (green/amber/gray) |
| `mouseEffect` | String | 'ripple' | Mouse interaction effect |
| `canvasSize` | String | 'fullscreen' | Canvas dimensions |

## 🐛 Troubleshooting

### Common Issues

**Q: Characters not displaying correctly**
A: Ensure your web server serves files with UTF-8 encoding.

**Q: Animation is too slow/fast**
A: Adjust the speed slider in settings (0-10 range).

**Q: Settings panel not visible**
A: Click the `◀` button in the top-left corner.

**Q: Korean fonts not loading**
A: Check internet connection for Google Fonts, or use system fonts.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the Matrix movie franchise
- Korean font integration with Google Fonts
- Modern web technologies and best practices

## 📞 Support

If you encounter any issues or have questions:
- 🐛 [Report Issues](https://github.com/yourusername/404_matrix/issues)
- 💡 [Feature Requests](https://github.com/yourusername/404_matrix/discussions)
- ⭐ Star this repository if you find it useful!

---

Made with ❤️ for the web community. Enter the Matrix! 🕶️✨
