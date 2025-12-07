---
title: UNIX Philosophy Pipe Diagram
description: An interactive visualization showing how small UNIX tools connect together via pipes to accomplish complex tasks, demonstrating the "do one thing well" philosophy.
image: /sims/unix-pipe-diagram/unix-pipe-diagram.png
og:image: /sims/unix-pipe-diagram/unix-pipe-diagram.png
twitter:image: /sims/unix-pipe-diagram/unix-pipe-diagram.png
social:
   cards: false
---

# UNIX Philosophy Pipe Diagram

<iframe src="main.html" height="372px" width="100%" scrolling="no"></iframe>

[Run the UNIX Pipe Diagram MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive diagram visualizes the core UNIX philosophy of combining small, specialized tools using pipes. It shows how data flows from the file system through a series of commands (`find`, `xargs ls`, `sort`) to produce sorted results.

## Iframe Embed Code

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/learning-linux/sims/unix-pipe-diagram/main.html" height="452px" scrolling="no"></iframe>
```

## Description

The UNIX philosophy emphasizes building small, modular programs that do one thing well. These programs can be combined using pipes (`|`) to accomplish complex tasks. This MicroSim demonstrates this philosophy with a practical example:

```bash
find . -name "*.txt" | xargs ls -l | sort -k5
```

This command:

1. **find** - Searches the file system for `.txt` files
2. **xargs ls** - Lists details for each file found
3. **sort** - Orders the results (e.g., by file size)

### Key Concepts Illustrated

- **Modularity**: Each command box represents a tool that does ONE specific job
- **Composition**: Pipes connect tools, passing text output as input to the next command
- **Text Streams**: All data flows as plain text between commands
- **Reusability**: These same tools can be combined differently for other tasks

### Interactive Features

- **Play/Pause**: Start or stop the data flow animation
- **Reset**: Restart the animation from the beginning
- **Speed Control**: Adjust how fast data packets move through the pipeline

## Learning Objectives

After using this MicroSim, students will be able to:

1. **Understand** the UNIX philosophy of small, composable tools
2. **Visualize** how data flows through a pipeline of commands
3. **Apply** the concept of pipes to combine commands in the terminal
4. **Recognize** the pipe symbol (`|`) as a connector between commands

## Lesson Plan

### Introduction (5 minutes)

1. Ask students: "How would you find all text files in a directory and sort them by size?"
2. Discuss how this seemingly complex task can be broken into simple steps

### Exploration (10 minutes)

1. Have students interact with the MicroSim
2. Observe how data packets (documents) flow from left to right
3. Notice the pipe symbols connecting each command
4. Read the callout bubbles explaining the philosophy

### Discussion (5 minutes)

1. Why is it beneficial to have small tools that do one thing?
2. What are the advantages of text-based data exchange?
3. How does this compare to monolithic programs that do everything?

### Practice (10 minutes)

Have students try these pipe examples in the terminal:

```bash
# Count files in a directory
ls | wc -l

# Find the largest files
ls -la | sort -k5 -n | tail -5

# Search for a pattern and count occurrences
cat file.txt | grep "error" | wc -l
```

## Related Concepts

- [Chapter 9: Sed, Awk, and Pipes](../../chapters/09-sed-awk-pipes/index.md)
- [Chapter 3: Shell Commands](../../chapters/03-shell-commands/index.md)
- [UNIX Family Tree MicroSim](../unix-family-tree/index.md)

## Technical Notes

- Built with p5.js 1.11.10
- Width-responsive design adapts to container size
- Animation speed is adjustable from 0.2x to 3x
