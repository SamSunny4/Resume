# 3DS — 3D Parallax File Viewer

> A web-based viewer that renders 3D model files using a parallax effect to create a sense of depth without VR hardware.

## Overview

| Field | Details |
|-------|---------|
| **Repository** | [SamSunny4/3DS](https://github.com/SamSunny4/3DS) |
| **Description** | 3rd Dimensional view of 3D files using parallax |
| **Status** | Early Stage / Empty |

---

## Description

3DS is a planned web project to display 3D model files (.3ds or similar formats) using a parallax-based rendering technique. By tracking the viewer's perspective (e.g., mouse position or device orientation), the viewer shifts layers of the 3D scene to simulate depth — giving the illusion of a true 3D view on a flat screen without requiring special hardware.

---

## Concept

The core idea is to use parallax depth cues:
- Parse a 3D model file and separate it into depth layers
- Shift each layer relative to viewer input (mouse movement or device gyroscope) to create a parallax offset
- Render the result in the browser using Canvas or WebGL for a smooth, immersive depth effect

---

## Status

The repository is currently empty (early planning stage). Implementation has not started yet.

---

## Potential Tech Stack

| Component | Likely Technology |
|-----------|-----------------|
| Runtime | Browser (Web) |
| Rendering | HTML5 Canvas or WebGL / Three.js |
| 3D File Parsing | Three.js loaders (OBJ, GLTF, 3DS) |
| Parallax Input | Mouse events / DeviceOrientation API |
| Framework | Vanilla JS or lightweight framework |
