---
title: Tab Completion Practice
description: An interactive MicroSim that lets students practice tab completion in a safe, simulated terminal environment before trying it on a real terminal.
image: /sims/tab-completion/tab-completion.png
og:image: /sims/tab-completion/tab-completion.png
twitter:image: /sims/tab-completion/tab-completion.png
social:
   cards: false
---

# Tab Completion Practice

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Tab Completion MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive simulation teaches students how to use tab completion, one of the most important productivity features in the Linux terminal. Tab completion allows you to automatically complete file names, directory names, and commands by pressing the Tab key.

## How to Use

1. **Click on the terminal area** to focus the input
2. **Type the command shown** in the instructions
3. **Press the Tab key** to trigger completion
4. **Press Enter** when the command is complete

## The Three Levels

### Level 1: Basic Tab Completion
Type `cd Doc` and press Tab. Since "Documents" is the only folder starting with "Doc", it completes automatically.

### Level 2: Multiple Matches
Type `cat re` and press Tab. Two files match ("readme.md" and "research_notes.txt"), so pressing Tab shows all options. Type more characters to narrow down.

### Level 3: Path Completion
Type `ls ~/Do` and press Tab. Tab completion works with paths too! Multiple folders match, so you'll need to narrow it down.

## Why Tab Completion Matters

Tab completion is essential for:

- **Speed**: Complete long file names in milliseconds
- **Accuracy**: Avoid typos in complex paths
- **Discovery**: See what files and commands are available
- **Efficiency**: Experienced users rarely type full names

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/learning-linux/sims/tab-completion/main.html" height="502px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Apply** tab completion to efficiently navigate directories
2. **Understand** how tab completion handles single vs. multiple matches
3. **Practice** using tab completion with paths and filenames

### Suggested Activities

1. **Introduction (2 min)**: Demonstrate tab completion in a real terminal
2. **Guided Practice (5 min)**: Complete all three levels together as a class
3. **Independent Practice (5 min)**: Students explore the simulation on their own
4. **Real Terminal (5 min)**: Transfer skills to an actual Linux terminal

### Discussion Questions

- What happens when you press Tab and nothing changes?
- How can you tell if there are multiple matches?
- Why do directories end with `/` when completed?

### Extension

After mastering this simulation, students should practice tab completion in a real terminal:

```bash
# Try these in your terminal
cd /usr/lo<TAB>         # completes to /usr/local/
ls /etc/pas<TAB>        # completes to /etc/passwd
cat ~/.bash<TAB><TAB>   # shows multiple matches
```
