# History of Virtual Machines & Containers

An interactive timeline visualization tracing the evolution of virtualization technology from IBM mainframes in 1967 to modern containers, serverless computing, and cutting-edge research in 2025.

[Run the VM Timeline](./main.html){ .md-button .md-button--primary }

[View Timeline Data (JSON)](./timeline.json){ .md-button }

## Overview

This timeline covers nearly 60 years of virtualization history, organized into seven categories:

- **Mainframe Era** - IBM's pioneering work on CP-40, CP-67, and VM/370
- **Hardware Support** - Intel VT-x and AMD-V virtualization extensions
- **Hypervisors** - VMware, Xen, and KVM development
- **Containers** - From FreeBSD Jails to Docker
- **Serverless & Cloud** - AWS Lambda, Cloud Functions, and Firecracker
- **Infrastructure Tools** - Terraform, Packer, Nomad, and Crossplane
- **Research** - Academic studies on performance and emerging architectures

## Features

### Interactive Elements

- **Category Filtering** - Click filter buttons to view specific event types
- **Pan and Zoom** - Use navigation buttons or click-and-drag to explore
- **Event Details** - Click any event to see full description and historical context
- **Hover Tooltips** - Hover over events for quick context notes

### Visual Design

- **Color-coded categories** - Each category has a distinct color for easy identification
- **Responsive layout** - Works on desktop, tablet, and mobile devices
- **Legend panel** - Visual guide showing all category colors

## Key Milestones

| Year | Event | Significance |
|------|-------|--------------|
| 1967 | IBM CP-40/CP-67 | Birth of virtualization |
| 1972 | IBM VM/370 | First commercial VM OS |
| 1998 | VMware founded | x86 virtualization begins |
| 2003 | Xen released | Open-source hypervisor |
| 2007 | KVM in Linux | Linux becomes a hypervisor |
| 2013 | Docker launch | Container revolution |
| 2014 | AWS Lambda | Serverless computing debuts |
| 2020 | Firecracker | MicroVMs for serverless |

## Embedding in Other Pages

To embed this timeline in another MkDocs page:

```html
<iframe src="../sims/vm-timeline/main.html"
        width="100%"
        height="700px"
        style="border: none;">
</iframe>
```

## Data Format

The timeline data is stored in `timeline.json` using a TimelineJS-compatible format:

```json
{
  "title": "Timeline Title",
  "events": [
    {
      "start_date": {
        "year": "2024",
        "month": "1",
        "display_date": "January 2024"
      },
      "text": {
        "headline": "Event Title",
        "text": "Event description."
      },
      "group": "Category Name",
      "notes": "Additional context for tooltips."
    }
  ]
}
```

## Adding New Events

1. Open `timeline.json`
2. Add a new event object to the `events` array
3. Include required fields: `start_date`, `text.headline`, `text.text`
4. Optionally add `group` (category) and `notes` (tooltip text)
5. Reload the page to see your changes

## Technical Details

- **Timeline Library**: vis-timeline 7.7.3
- **Data Format**: TimelineJS-compatible JSON
- **Browser Support**: Chrome, Firefox, Safari, Edge
- **Dependencies**: vis-timeline.js (CDN)

## References

- [vis-timeline Documentation](https://visjs.github.io/vis-timeline/docs/timeline/)
- [History of Virtualization on Wikipedia](https://en.wikipedia.org/wiki/Timeline_of_virtualization_development)
- [The Ideal Versus the Real: Revisiting the History of Virtual Machines and Containers](https://dl.acm.org/doi/10.1145/3317550.3321445)
