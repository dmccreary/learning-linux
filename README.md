# Learning Linux

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/learning-linux)
[![GitHub](https://img.shields.io/badge/GitHub-dmccreary%2Flearning--linux-blue?logo=github)](https://github.com/dmccreary/learning-linux)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/claude-skills)
[![vis-network](https://img.shields.io/badge/vis--network-Graph%20Visualization-3498db)](https://visjs.org/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/learning-linux](https://dmccreary.github.io/learning-linux)

## Overview

Learning Linux is an interactive, AI-generated intelligent textbook designed to teach high school students the fundamentals of Linux and UNIX systems. This comprehensive 15-week course takes students from UNIX history and shell commands through Raspberry Pi projects, cloud computing, and career pathways in Linux system administration.

Built using MkDocs with the Material theme, this textbook incorporates a learning graph with 550 concepts organized into 16 taxonomy categories, interactive MicroSims using vis-network.js for graph visualization, and AI-assisted content generation using Claude Code Skills. The course leverages the affordable Raspberry Pi 500+ as an ideal platform for hands-on Linux education in school environments.

Whether you're a student curious about how computers really work, an educator looking for structured Linux course materials, or a maker wanting to build IoT projects, this textbook provides comprehensive coverage with hands-on interactive elements that make complex concepts accessible and engaging.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 550 |
| Taxonomy Categories | 16 |
| Foundational Concepts | 8 |
| Maximum Learning Path Depth | 12 |
| Learning Graph Quality Score | 88/100 |
| Course Description Quality Score | 91/100 |
| Markdown Files | 13 |
| Total Words | 8,115 |
| MicroSims | 1 |

**Status:** Course structure and learning graph complete. Chapter content generation phase.

## Key Features

- **Comprehensive Learning Graph**: 550 concepts with dependency relationships ensuring proper prerequisite sequencing
- **Interactive Graph Viewer**: Explore concept relationships using vis-network.js visualization
- **Bloom's Taxonomy Alignment**: Learning objectives organized from Remember through Create
- **Raspberry Pi Focus**: Practical projects using affordable hardware ($100/student setup)
- **Real-World Applications**: Web servers, game servers, IoT, home automation, Docker containers

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/learning-linux.git
cd learning-linux
```

### Install Dependencies

This project uses MkDocs with the Material theme:

```bash
pip install mkdocs
pip install mkdocs-material
```

### Build and Serve Locally

Serve locally for development (with live reload):

```bash
mkdocs serve
```

Open your browser to `http://localhost:8000`

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

## Repository Structure

```
learning-linux/
├── docs/                              # MkDocs documentation source
│   ├── index.md                       # Homepage
│   ├── course-description.md          # Course overview and learning objectives
│   ├── learning-graph/                # Learning graph data and analysis
│   │   ├── learning-graph.json        # vis-network format with 550 concepts
│   │   ├── concept-list.md            # All concepts listed
│   │   ├── concept-taxonomy.md        # 16 category definitions
│   │   ├── quality-metrics.md         # Graph validation report
│   │   └── taxonomy-distribution.md   # Category balance analysis
│   ├── sims/                          # Interactive MicroSims
│   │   └── graph-viewer/              # Learning graph visualization
│   │       ├── main.html              # Standalone viewer
│   │       ├── script.js              # vis-network integration
│   │       └── index.md               # Documentation
│   └── supplementary-content/         # Additional resources
│       ├── raspberry-pi-500-plus-impact.md
│       ├── intelligent-textbook.md
│       └── claude-code-skills.md
├── logs/                              # Generation logs
│   ├── create-learning-graph.md       # Learning graph generation log
│   └── learning-graph-viewer-installation.md
├── mkdocs.yml                         # MkDocs configuration
└── README.md                          # This file
```

## Taxonomy Categories

The 550 concepts are organized into 16 categories:

| Category | Description |
|----------|-------------|
| History and Philosophy | UNIX origins, design principles |
| Shell Fundamentals | Terminal, commands, scripting |
| File System | Navigation, directories, mounting |
| Permissions and Security | Ownership, chmod, sudo |
| Text Processing | grep, awk, sed, regular expressions |
| Text Editors | nano, vi, vim |
| Configuration | Dot files, environment variables |
| Process Management | ps, top, kill, background jobs |
| Package Management | apt, brew, repositories |
| Networking | SSH, ping, curl, firewalls |
| Storage and Performance | Benchmarking, optimization |
| Raspberry Pi | GPIO, sensors, projects |
| Cloud and Containers | Docker, Terraform, cloud hosting |
| Development Tools | Git, Python, VSCode |
| System Administration | Users, services, maintenance |
| Capstone Projects | Servers, IoT, career paths |

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

[GitHub Issues](https://github.com/dmccreary/learning-linux/issues)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- Share — copy and redistribute the material
- Adapt — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

## Acknowledgements

This project is built on the shoulders of giants in the open source community:

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Beautiful, responsive theme
- **[vis-network](https://visjs.org/)** - Network visualization library for learning graphs
- **[Raspberry Pi Foundation](https://www.raspberrypi.org/)** - Affordable computing for education
- **[Claude AI](https://claude.ai)** by Anthropic - AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open source projects

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)

Questions, suggestions, or collaboration opportunities? Feel free to connect on LinkedIn or open an issue on GitHub.
