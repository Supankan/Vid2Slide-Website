# Vid2Slide Documentation

Welcome to the official documentation for **Vid2Slide** - your intelligent slide extraction tool.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Settings](#settings)
- [Export Options](#export-options)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)
- [Support](#support)

---

## Overview

Vid2Slide is a desktop application that intelligently extracts unique slides from lecture videos, presentations, and recorded sessions. It uses advanced computer vision techniques to:

- **Detect and remove duplicate slides** - Handles presenter reappearances and slide repetitions
- **Filter out blurry frames** - Removes transition effects and autofocus hunting
- **Export to PDF** - Compile extracted slides into a single, readable document

### Why Vid2Slide?

| Traditional Methods | Vid2Slide |
|---------------------|-----------|
| Manually extract frames one by one | One-click automatic extraction |
| Hours of work for a single video | Process in minutes |
| No deduplication | Smart perceptual hashing |
| No quality control | Automatic blur detection |

---

## Features

### 🎯 Smart Deduplication
Uses **perceptual hashing (pHash)** to detect visually similar frames. If a slide appears multiple times throughout the video (common in lecture recordings where the presenter reappears), Vid2Slide keeps only the best quality instance.

### ⚡ Blur Detection
Automatically analyzes frame sharpness using **Laplacian variance** to discard:
- Blurry transition frames
- Autofocus hunting moments
- Out-of-focus segments

### 🖼️ Gallery Preview
Review all extracted slides in a high-density grid view:
- **Delete unwanted frames** with a single click
- **Reorder slides** by drag-and-drop
- **Zoom in** to examine details

### 📄 One-Click PDF Export
Export your curated slides to a high-quality PDF document:
- Custom page sizes (A4, Letter, etc.)
- Configurable image quality
- Automatic ordering preservation

### 🔒 Privacy First
- **100% offline processing** - Your videos never leave your computer
- No cloud uploads
- No account required
- No internet connection needed

---

## Installation

### System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| OS | Windows 10 (64-bit) | Windows 11 |
| RAM | 4 GB | 8 GB |
| Storage | 500 MB | 2 GB free |
| GPU | Optional | NVIDIA GPU (faster processing) |

### Installation Steps

1. **Download** the latest release from [GitHub Releases](https://github.com/Supankan/Vid2Slide/releases)
2. **Run** the `Vid2Slide-Setup.exe` installer
3. **Follow** the installation wizard prompts
4. **Launch** Vid2Slide from your Start Menu or Desktop shortcut

### Portable Version

If you prefer a portable version (no installation required):
1. Download the `.zip` release
2. Extract to any folder
3. Run `Vid2Slide.exe` directly

---

## Getting Started

### Step 1: Select a Video

Click the **"Select Video"** button or drag-and-drop a video file onto the application window.

**Supported formats:**
- `.mp4` (H.264, H.265/HEVC)
- `.mkv` (Matroska)
- `.avi` (Audio Video Interleave)
- `.mov` (QuickTime)
- `.webm` (WebM)

### Step 2: Configure Settings (Optional)

Before processing, you can adjust:

| Setting | Default | Description |
|---------|---------|-------------|
| Similarity Threshold | 0.95 | How similar frames must be to be considered duplicates (0-1) |
| Blur Threshold | 100 | Laplacian variance below this is considered blurry |
| Frame Sampling Rate | Auto | How often to sample frames (auto-detects optimal rate) |
| Minimum Slide Duration | 1s | Minimum time a slide must appear to be included |

### Step 3: Process Video

Click **"Extract Slides"** to start processing.

The progress bar will show:
- Current frame being analyzed
- Slides detected so far
- Estimated time remaining

### Step 4: Review & Edit

Once processing completes, you'll see the **Gallery View**:
- **Delete**: Click the × button on any slide to remove it
- **Reorder**: Drag slides to rearrange their order in the final PDF
- **Zoom**: Click any slide to view it in full resolution

### Step 5: Export

Click **"Export to PDF"** to save your slides:
1. Choose output location and filename
2. Select page size (A4, Letter, Legal, etc.)
3. Set image quality (Low/Medium/High/Maximum)
4. Click **Export**

---

## How It Works

### Perceptual Hashing (pHash)

Vid2Slide uses perceptual hashing to compare frames. Unlike traditional hashing (where a single pixel change creates a completely different hash), pHash produces similar hashes for visually similar images.

**Process:**
1. Reduce image to manageable size (32×32)
2. Apply DCT (Discrete Cosine Transform)
3. Keep low-frequency components
4. Convert to binary hash string

Two frames with a **Hamming distance** ≤ 5% are considered duplicates.

### Blur Detection (Laplacian Variance)

The Laplacian operator highlights edges in an image. Sharp images have high variance; blurry images have low variance.

**Formula:**
```
Variance = Σ(I[i] - μ)² / N
```

Where `I` is the Laplacian-transformed pixel values and `μ` is the mean.

Frames with variance **below 100** are typically blurry and discarded.

### Frame Sampling Strategy

Vid2Slide uses an adaptive sampling rate:
- **Fast motion sections**: Higher sampling (every 0.5s)
- **Static sections**: Lower sampling (every 2s)
- **Transitions detected**: Extra samples

This ensures no slides are missed while keeping processing efficient.

---

## Settings

### General Settings

| Setting | Description |
|---------|-------------|
| **Theme** | Light / Dark / System |
| **Language** | English, Spanish, French, German, Chinese, Japanese |
| **Start Minimized** | Launch in system tray on startup |
| **Check for Updates** | Automatically download updates |

### Processing Settings

| Setting | Description | Range |
|---------|-------------|-------|
| **Similarity Threshold** | How similar frames must be to merge | 0.85 - 0.99 |
| **Blur Threshold** | Laplacian variance cutoff | 50 - 200 |
| **Min Slide Duration** | Minimum seconds a slide appears | 0.5s - 5s |
| **Max Slides** | Limit total slides (0 = unlimited) | 0 - 500 |

### Export Settings

| Setting | Description | Options |
|---------|-------------|---------|
| **Page Size** | PDF page dimensions | A4, Letter, Legal, A3, Custom |
| **Orientation** | Portrait or Landscape | Auto, Portrait, Landscape |
| **Quality** | Image compression level | Low (500KB), Medium (1MB), High (2MB), Max (Original) |
| **Margin** | Page margins in mm | 0 - 30mm |
| **File Naming** | Output filename pattern | Original, Custom prefix |

### GPU Acceleration

For NVIDIA GPUs, enable CUDA acceleration in Settings → Processing → Use GPU:

| Feature | CPU | GPU |
|---------|-----|-----|
| pHash calculation | ✓ | ✓ |
| Blur detection | ✓ | ✓ |
| Image loading | ✓ | ✓ |
| PDF generation | ✓ | - |

---

## Export Options

### PDF Export

**Standard PDF**
- Single or multi-page layout
- Configurable margins
- Embedded fonts

**ZIP Archive**
- Individual slide images as JPG/PNG
- Original resolution preserved
- Includes metadata JSON

**PowerPoint**
- Each slide as a separate slide
- Text layers preserved (if detected OCR)
- Editable layout

### Export Quality Presets

| Preset | Resolution | File Size (10 slides) |
|--------|------------|----------------------|
| Draft | 720p | ~500 KB |
| Standard | 1080p | ~2 MB |
| High | 2K | ~5 MB |
| Maximum | Original | ~20 MB+ |

---

## FAQ

### Q: Why are some slides missing?

**A:** Check your Blur Threshold setting. If set too high, legitimate slides may be filtered out. Try lowering it to 50-80.

### Q: Can I process multiple videos at once?

**A:** Yes, use Batch Mode from the File menu to queue multiple videos.

### Q: Does Vid2Slide work with recorded screen shares?

**A:** Yes, but you may need to adjust the Similarity Threshold to 0.90 or lower for screen content.

### Q: My video is very long (>3 hours). Will it take longer?

**A:** Processing time scales linearly with video length. A 3-hour video takes approximately 15-30 minutes depending on your hardware.

### Q: Can I use Vid2Slide offline?

**A:** Absolutely! Vid2Slide is a fully offline application. No internet required for processing or export.

### Q: Does it work with non-English video content?

**A:** Yes, Vid2Slide is language-agnostic. It analyzes visual content, not text or audio.

---

## Troubleshooting

### Video Won't Load

**Solutions:**
1. Check if the file is corrupted - try opening in VLC
2. Update your video codecs (install K-Lite Codec Pack)
3. Ensure you have read permissions for the file
4. Check disk space - processing requires ~2x video size free

### Processing is Very Slow

**Solutions:**
1. Enable GPU acceleration in Settings
2. Close other applications to free RAM
3. Move the video to an SSD (faster read speeds)
4. Reduce "Max Slides" limit to skip analysis after found slides

### Export PDF is Blurry

**Solutions:**
1. Use "Maximum" quality preset
2. Increase resolution in export settings
3. Check that source slides aren't blurry (lower blur threshold)

### Application Crashes

**Solutions:**
1. Update to latest version
2. Delete settings file (`%APPDATA%/Vid2Slide/config.json`) to reset
3. Disable GPU acceleration temporarily
4. Run as Administrator

### Slides Duplicated Despite Low Threshold

**Solutions:**
1. Lower similarity threshold to 0.92 or 0.90
2. Check if video has distinct visual styles for similar content
3. Manually delete duplicates in Gallery View

---

## Support

### Get Help

- **GitHub Issues**: [Report bugs or request features](https://github.com/Supankan/Vid2Slide/issues)
- **Email**: support@eprgroupers.com
- **Discord**: [Join our community](https://discord.gg/vid2slide)

### Report a Bug

When reporting issues, please include:
1. Vid2Slide version (Help → About)
2. Windows version
3. Video file format and duration
4. Error messages (if any)
5. Log file (`%APPDATA%/Vid2Slide/logs/`)

### Feature Requests

We'd love to hear your ideas! Submit feature requests on our [GitHub Discussions](https://github.com/Supankan/Vid2Slide/discussions) page.

---

## License

© 2024 **EPR Groupers**. All rights reserved.

This software is provided for personal and educational use. Commercial licensing available upon request.

---

*Last updated: May 2024 | Version 1.0.0*