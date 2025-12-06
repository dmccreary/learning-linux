# Learning Graph

The Learning Graph is the foundational data structure for the Learning Linux intelligent textbook. It maps the relationships between 550 concepts, showing how knowledge builds from foundational ideas to advanced applications.

[Run the Learning Graph Viewer Fullscreen](../sims/graph-viewer/main.html){ .md-button .md-button--primary }

## What is a Learning Graph?

A learning graph is a directed acyclic graph (DAG) where:

- **Nodes** represent concepts students need to learn
- **Edges** represent prerequisite relationships ("you should learn A before B")
- **Groups** categorize concepts by topic area

This structure enables:

- **Adaptive learning paths** - Students can follow personalized routes through the material
- **Prerequisite tracking** - The system knows what foundations are needed for each topic
- **Progress visualization** - Students and instructors can see mastery across the concept map

## Graph Statistics

| Metric | Value |
|--------|-------|
| Total Concepts | 550 |
| Taxonomy Categories | 16 |
| Foundational Concepts | 8 |
| Maximum Chain Depth | 12 |
| Average Dependencies | 1.72 |

## Taxonomy Categories

The concepts are organized into 16 categories:

| Category | Concepts | Description |
|----------|----------|-------------|
| History and Philosophy | 20 | UNIX origins, key figures, Linux distributions |
| Shell Fundamentals | 30 | Terminal, commands, navigation |
| File System | 60 | Directories, paths, file operations |
| Permissions | 25 | Access control, ownership, sudo |
| Text Processing | 30 | grep, regex, sed, awk, pipes |
| Text Editors | 15 | Nano, Vim |
| Configuration | 20 | Dotfiles, environment variables |
| Process Management | 40 | Processes, scheduling, scripts |
| Package Management | 20 | APT, Homebrew |
| Networking | 50 | IP, SSH, security, firewalls |
| Storage | 65 | Compression, devices, performance |
| Raspberry Pi | 65 | GPIO, sensors, IoT, automation |
| Cloud | 25 | Docker, Terraform, deployment |
| Development | 25 | Git, Python, IDEs |
| Administration | 40 | Users, services, display, audio |
| Capstone | 30 | Projects, careers |

## Files in This Section

- [Concept List](./concept-list.md) - Complete list of 550 concepts
- [Concept Taxonomy](./concept-taxonomy.md) - Category definitions
- [Quality Metrics](./quality-metrics.md) - Graph validation report
- [Taxonomy Distribution](./taxonomy-distribution.md) - Category balance analysis

## Data Files

- `learning-graph.csv` - Concepts with dependencies and taxonomy
- `learning-graph.json` - Complete graph in vis-network.js format
- `metadata.json` - Dublin Core metadata for the graph

## Using the Learning Graph

### For Students

The learning graph helps you understand:

1. What concepts you need to learn first (foundational concepts have no arrows pointing to them)
2. How topics connect to each other
3. Multiple paths to reach advanced topics

### For Instructors

The learning graph supports:

1. Curriculum planning - See the full scope of topics
2. Prerequisite enforcement - Know what students need before each lesson
3. Progress monitoring - Track mastery across the concept map

### For Developers

The `learning-graph.json` file can be:

1. Visualized with vis-network.js
2. Imported into learning management systems
3. Used for adaptive learning algorithms
4. Analyzed for curriculum optimization

## Next Steps

After reviewing the learning graph:

1. **Review concepts** - Ensure all important topics are covered
2. **Check dependencies** - Verify prerequisite relationships make sense
3. **Generate chapters** - Use the `book-chapter-generator` skill to create chapter structure
4. **Build content** - Develop lessons for each concept

---

*Learning Graph generated with Learning Graph Generator v0.03 on 2025-12-06*
