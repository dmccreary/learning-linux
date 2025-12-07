# Linux Timeline - From Hobby to World Domination

An interactive timeline visualization showing key milestones in Linux history from 1991 to 2025.

[Run the Linux Timeline](./main.html){ .md-button .md-button--primary }

[View the Raw Timeline Data](timeline.json)

## Overview

This timeline helps students remember key milestones in Linux history and appreciate how quickly it evolved from a Finnish student's hobby project to powering the world's infrastructure. The timeline covers 34 years of Linux development, from Linus Torvalds' humble announcement on August 25, 1991, to Linux's current status as the foundation of modern computing.

## Features

### Interactive Elements

- **Zoom and Pan**: Scroll to zoom in/out, click and drag to pan across the timeline
- **Event Details**: Click any event to see full details in the panel below
- **Hover Tooltips**: Hover over events to see historical context notes
- **Category Filtering**: Use filter buttons to view specific types of events

### Visual Design

- **Color-coded categories**: Each event category has a distinct color for easy identification
- **Responsive layout**: Works on desktop, tablet, and mobile devices
- **Legend**: Visual guide showing category colors and meanings

## Categories

Events are organized into four categories:

| Category | Color | Description |
|----------|-------|-------------|
| Community | Green | Community-driven milestones and adoption |
| Technical | Blue | Technical releases and achievements |
| Commercial | Orange | Corporate adoption and business milestones |
| Mobile/Modern | Purple | Modern era including mobile and cloud |

## Timeline Events

| Year | Event | Category |
|------|-------|----------|
| 1991 | Linus posts first announcement | Community |
| 1992 | Linux adopts GPL license | Technical |
| 1993 | First distributions appear (Slackware, Debian) | Community |
| 1994 | Linux 1.0 released | Technical |
| 1996 | Tux the penguin becomes mascot | Community |
| 1998 | Major companies announce Linux support | Commercial |
| 2000 | Red Hat becomes $1B company | Commercial |
| 2004 | Ubuntu launches | Commercial |
| 2008 | Android (Linux-based) launches | Mobile/Modern |
| 2012 | Linux dominates cloud computing | Mobile/Modern |
| 2015 | Microsoft says "we love Linux" | Commercial |
| 2020 | All top 500 supercomputers run Linux | Technical |
| 2025 | Linux is everywhere | Mobile/Modern |

## Learning Objectives

After exploring this timeline, students should be able to:

1. **Remember** key dates in Linux history
2. **Understand** how Linux evolved from hobby to infrastructure
3. **Appreciate** the role of community in open source success
4. **Recognize** the commercial validation of open source software

## Technical Details

- **Timeline Library**: vis-timeline 7.7.3
- **Data Format**: TimelineJS-compatible JSON
- **Browser Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Dependencies**: vis-timeline.js (loaded from CDN)

## Customization

### Adding New Events

Edit `timeline.json` and add a new event object:

```json
{
  "start_date": {
    "year": "2026",
    "month": "1",
    "day": "1"
  },
  "text": {
    "headline": "New Milestone",
    "text": "Description of the milestone."
  },
  "group": "Category Name",
  "notes": "Additional context for tooltip."
}
```

### Changing Colors

Edit the `categoryColors` object in `main.html`:

```javascript
const categoryColors = {
    'Community': '#27ae60',    // Green
    'Technical': '#3498db',    // Blue
    'Commercial': '#e67e22',   // Orange
    'Mobile/Modern': '#9b59b6' // Purple
};
```
