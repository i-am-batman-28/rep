# Horror Video Experience

A single-page React website with a cinematic horror/ARG aesthetic featuring full-screen video playback and an interactive reveal.

## Features

- **Full-screen video player** with automatic playback detection
- **Smart autoplay handling** with fallback for browser restrictions
- **Horror-themed popup** with glitch effects after video ends
- **Interactive mask image** that redirects on click
- **Film grain effect** and cinematic transitions
- **Responsive design** optimized for all screen sizes

## Technical Stack

- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom animations
- **No external video or animation libraries**

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Replace Placeholder Assets

#### Video URL
Update the video source in `src/App.jsx`:
```jsx
<source src="https://example.com/video.mp4" type="video/mp4" />
```
Replace with your actual hosted video URL.

#### Mask Image
Add your mask image to the `public` folder as `mask.png`, or update the path in `src/App.jsx`:
```jsx
<img src="/mask.png" alt="Mask" />
```

#### Redirect URL
Update the redirect destination in `src/App.jsx`:
```jsx
const handleMaskClick = () => {
  window.location.href = 'https://example.com/next-page'
}
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the experience.

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Browser Autoplay Restrictions

### The Challenge

Modern browsers (Chrome, Safari, Firefox, Edge) have strict autoplay policies to prevent unwanted audio/video from playing automatically. These policies particularly affect videos with **sound enabled**.

### How Autoplay Works

Browsers use different heuristics to determine if autoplay should be allowed:

1. **Chrome/Edge**: Uses a "Media Engagement Index" based on user behavior
   - Allows autoplay if user has previously interacted with media on the domain
   - Blocks autoplay with sound for new/unfamiliar sites

2. **Safari**: Very restrictive
   - Generally blocks autoplay with sound
   - Requires user interaction (click, tap, etc.)

3. **Firefox**: Uses autoplay blocking settings
   - Can be configured by users
   - Default is to block audible autoplay

### Our Solution

This project implements a **progressive enhancement** approach:

#### Attempt 1: Direct Autoplay
```javascript
const playPromise = video.play()
```
We try to autoplay the video with sound immediately when the component mounts.

#### Attempt 2: Click-to-Enter Fallback
If autoplay is blocked (Promise rejected), we show a "Click to enter" overlay:
```javascript
.catch((error) => {
  setShowClickToEnter(true)
})
```

When the user clicks the overlay, we play the video **with their permission**:
```javascript
const handleClickToEnter = () => {
  video.play()
}
```

This satisfies browser requirements because it's triggered by user interaction.

### Testing Different Scenarios

To test the fallback behavior:

1. **Fresh domain** (autoplay likely blocked):
   - Open in incognito/private mode
   - Clear browser data and reload

2. **After user interaction** (autoplay likely allowed):
   - Interact with the site first
   - Reload the page

3. **Force blocking** (for testing):
   - Chrome: `chrome://settings/content/sound`
   - Firefox: `about:preferences#privacy` → Autoplay settings

### Best Practices

✅ **Always provide a fallback** for blocked autoplay  
✅ **Make the fallback visually clear** (we use "Click to enter")  
✅ **Use `playsInline`** attribute for mobile compatibility  
✅ **Add `preload="auto"`** to buffer video before user interaction  
✅ **Test in multiple browsers** and scenarios  

❌ **Don't assume autoplay will work** without checking the Promise  
❌ **Don't use muted autoplay** if audio is essential to the experience  
❌ **Don't show error messages** - present it as intentional interaction  

## Customization

### Animations

All animations are defined in `tailwind.config.js`:
- `glitch` - RGB split glitch effect for main text
- `flicker` - Opacity flicker for secondary text
- `pulse_glow` - Red glow effect for the mask

### Colors & Styling

Update Tailwind classes in `src/App.jsx` to customize:
- Text colors: `text-white`, `text-red-600`
- Background opacity: `bg-opacity-95`
- Transition durations: `duration-700`

### Film Grain Effect

The noise overlay is created with SVG in `src/App.css`. Adjust opacity:
```css
.bg-noise {
  opacity: 0.10; /* Increase for more grain */
}
```

## Project Structure

```
ggj/
├── public/
│   └── mask.png              # Mask image (add your own)
├── src/
│   ├── App.jsx               # Main component with all logic
│   ├── App.css               # Horror-themed custom styles
│   ├── index.css             # Global styles + Tailwind imports
│   └── main.jsx              # React entry point
├── index.html                # HTML template
├── package.json              # Dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind + custom animations
└── vite.config.js            # Vite configuration
```

## Component Logic Flow

1. **Mount** → Try autoplay with sound
2. **Autoplay succeeds** → Video plays, UI hidden
3. **Autoplay blocked** → Show "Click to enter" overlay
4. **User clicks** → Video starts with sound
5. **Video ends** → Trigger `onEnded` event
6. **Popup fades in** → Show mask + creepy text
7. **User clicks mask** → Redirect to next page

## Notes

- The video player uses `object-cover` to fill the screen while maintaining aspect ratio
- All UI elements are hidden during video playback
- The popup uses a smooth opacity transition (700ms)
- The mask has a fallback placeholder (emoji) if the image doesn't load
- Console logs are included for debugging autoplay behavior
- Responsive text sizing uses Tailwind's `md:` breakpoint

## License

Open source - use and modify as needed for your horror experience! 🎭
