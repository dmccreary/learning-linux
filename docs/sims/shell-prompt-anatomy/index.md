---
title: Shell Prompt Anatomy
description: An interactive MicroSim that helps students recognize and understand each component of a typical Linux shell prompt.
image: /sims/shell-prompt-anatomy/shell-prompt-anatomy.png
og:image: /sims/shell-prompt-anatomy/shell-prompt-anatomy.png
twitter:image: /sims/shell-prompt-anatomy/shell-prompt-anatomy.png
social:
   cards: false
---

# Shell Prompt Anatomy

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Shell Prompt Anatomy MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the Shell Prompt Anatomy MicroSim with the p5.js editor](https://editor.p5js.org/)

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/learning-linux/sims/shell-prompt-anatomy/main.html" height="482px" scrolling="no"></iframe>
```

## Description

This interactive MicroSim helps students understand the anatomy of a typical Linux shell prompt. The prompt is one of the first things students see when they open a terminal, and understanding its components helps them feel more comfortable with the command line.

### Components Explained

The MicroSim breaks down a typical prompt like `dan@raspberry:~/Documents$` into its component parts:

| Component | Example | Meaning |
|-----------|---------|---------|
| **Username** | `dan` | Who you are logged in as |
| **@ separator** | `@` | Separates username from hostname |
| **Hostname** | `raspberry` | Which computer you are on |
| **: separator** | `:` | Separates hostname from path |
| **Current directory** | `~/Documents` | Where you are in the filesystem |
| **User indicator** | `$` or `#` | `$` = normal user, `#` = root user |

### Color Coding

- **Blue**: Username - identifies who is logged in
- **Green**: Hostname - identifies which computer
- **Orange/Yellow**: Current directory path
- **Gray**: Normal user prompt symbol (`$`)
- **Red**: Root user prompt symbol (`#`) - danger zone!

### Interactive Features

- **Hover** over any part of the main prompt to see a detailed explanation
- **Click** on a component to lock the selection
- View different **example prompts** from common Linux distributions

## Example Prompts Shown

1. **Ubuntu default**: `student@ubuntu:~$`
2. **Raspberry Pi default**: `pi@raspberrypi:~$`
3. **Root user**: `root@server:/#` (highlighted in red as a warning)

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. **Remember** the six main components of a Linux shell prompt
2. **Understand** what each component represents
3. **Identify** whether they are logged in as a normal user or root user
4. **Recognize** prompts from different Linux distributions

### Suggested Activities

1. **Exploration (5 minutes)**: Have students hover over each component and read the descriptions
2. **Discussion (5 minutes)**: Ask students why it might be important to know which computer they're on (SSH sessions, network administration)
3. **Warning Signs (3 minutes)**: Discuss why the root prompt is shown in red and what dangers exist when operating as root
4. **Customization Preview (2 minutes)**: Mention that prompts can be customized (covered in Chapter 11: Shell Configuration)

### Assessment Questions

1. What does the `$` symbol at the end of a prompt indicate?
2. What symbol would you see if you were logged in as root?
3. In the prompt `alice@webserver:/var/www$`, who is logged in and on which computer?
4. Why might it be helpful to have the current directory shown in the prompt?

### Prerequisites

- Basic familiarity with opening a terminal
- No prior Linux experience required

### Duration

- 10-15 minutes for exploration and discussion

## Related Chapters

- [Chapter 2: Terminal Basics](../../chapters/02-terminal-basics/index.md)
- [Chapter 11: Shell Configuration](../../chapters/11-shell-config/index.md)
