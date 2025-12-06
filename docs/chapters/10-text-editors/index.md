---
title: Text Editors - Nano and Vim
description: Master terminal-based text editing with beginner-friendly Nano and powerful Vim
generated_by: claude skill chapter-content-generator
date: 2025-12-06
version: 0.03
---

# Text Editors: Nano and Vim

## Summary

This chapter teaches you to edit files directly in the terminal using two popular editors. Nano provides a beginner-friendly interface with on-screen shortcuts, while Vim offers powerful modal editing for advanced users. You'll learn Vim's modes (insert, command, visual), navigation, search and replace, and configuration through vimrc.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Text Editors
2. Nano Editor
3. Nano Commands
4. Nano Shortcuts
5. Vi Editor
6. Vim Editor
7. Vim Modes
8. Vim Insert Mode
9. Vim Command Mode
10. Vim Visual Mode
11. Vim Navigation
12. Vim Save and Quit
13. Vim Search Replace
14. Vimrc Configuration
15. Editor Selection

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: File System Fundamentals](../04-file-system/index.md)
- [Chapter 5: File Operations and Manipulation](../05-file-operations/index.md)

---

## Why Edit in the Terminal?

"Wait, can't I just use VS Code or Notepad?" Great question! You absolutely can—but here's the thing: sometimes you're logged into a remote server with no graphical interface. Sometimes you need to quickly edit a config file while troubleshooting. Sometimes you just want to feel like a hacker from the movies (no judgment!).

**Text editors** that run in the terminal are essential tools for any Linux user. They work everywhere, even on minimal systems, and once you master them, you'll find yourself editing files faster than you ever thought possible.

We'll cover two editors:

- **Nano**: The friendly one. Perfect for beginners.
- **Vim**: The powerful one. Legendary among developers.

By the end of this chapter, you'll never be stuck unable to edit a file again!

## The Nano Editor: Your Gentle Introduction

The **Nano editor** is like the training wheels of terminal text editors—and I mean that in the best way! It shows you exactly what keys to press right on the screen, so you're never lost.

### Opening Files with Nano

```sh
# Open an existing file
nano myfile.txt

# Create a new file (just open a name that doesn't exist)
nano newfile.txt

# Open file at a specific line number
nano +25 myfile.txt

# Open in read-only mode
nano -v myfile.txt
```

When nano opens, you'll see:

- Your file content in the main area
- A title bar at the top (filename, modified status)
- A help bar at the bottom with **Nano shortcuts**

### Nano Shortcuts: The Bottom Bar Is Your Friend

See those `^G Get Help` and `^X Exit` at the bottom? The `^` symbol means **Ctrl**. So `^X` means press `Ctrl+X`.

Here are the essential **Nano commands**:

| Shortcut | Action |
|----------|--------|
| `Ctrl+X` | Exit nano |
| `Ctrl+O` | Write Out (save file) |
| `Ctrl+S` | Save (same as Write Out) |
| `Ctrl+G` | Get Help |
| `Ctrl+K` | Cut current line |
| `Ctrl+U` | Uncut (paste) |
| `Ctrl+W` | Where Is (search) |
| `Ctrl+\` | Search and Replace |
| `Ctrl+C` | Show cursor position |
| `Ctrl+_` | Go to line number |

### Basic Nano Workflow

```sh
# 1. Open a file
nano notes.txt

# 2. Type your content (just start typing!)
# Hello, this is my file.
# Nano is easy!

# 3. Save the file: Ctrl+O, then Enter to confirm filename

# 4. Exit: Ctrl+X
```

If you try to exit without saving, nano politely asks: "Save modified buffer?" Press `Y` for yes, `N` for no, or `Ctrl+C` to cancel.

### Nano Navigation

| Shortcut | Action |
|----------|--------|
| `Ctrl+A` | Go to beginning of line |
| `Ctrl+E` | Go to end of line |
| `Ctrl+Y` | Page up |
| `Ctrl+V` | Page down |
| `Ctrl+_` | Go to specific line |
| `Alt+\` | Go to beginning of file |
| `Alt+/` | Go to end of file |

### Nano Search and Replace

```sh
# Search: Ctrl+W
# Type your search term, press Enter
# Press Ctrl+W again to find next match

# Search and Replace: Ctrl+\
# Enter search term, press Enter
# Enter replacement, press Enter
# Y = replace this one, N = skip, A = replace all
```

!!! tip "Nano Config Files"
    Nano can be customized through `~/.nanorc`. You can enable syntax highlighting, line numbers, auto-indentation, and more:
    ```sh
    # ~/.nanorc
    set linenumbers
    set autoindent
    set tabsize 4
    include /usr/share/nano/*.nanorc  # Syntax highlighting
    ```

### When to Use Nano

Nano is perfect for:

- Quick edits to config files
- Beginners learning terminal editing
- Situations where you need something "just works"
- When you don't want to remember complex commands

But once you get comfortable with the terminal, you might want something more powerful...

## The Vi Editor: The Grandfather

The **Vi editor** is the ancestor of Vim. Created in 1976, it's been around longer than most programming languages! Vi (pronounced "vee-eye") is available on virtually every Unix and Linux system.

```sh
# Open vi
vi myfile.txt
```

Vi is minimal and can feel strange at first because it's a **modal editor**—more on that soon. Most modern systems install Vim instead of pure vi, but it's good to know vi exists as a fallback.

## The Vim Editor: Vi Improved

The **Vim editor** (Vi IMproved) takes vi and supercharges it. Vim has been called "the programmer's editor" and for good reason—once mastered, it makes you incredibly productive.

```sh
# Open vim
vim myfile.txt

# Open multiple files
vim file1.txt file2.txt

# Open in read-only mode
vim -R myfile.txt

# Open at specific line
vim +50 myfile.txt

# Open and run a command
vim +/search_term myfile.txt
```

### The Vim Learning Curve

Here's the honest truth: Vim has a reputation for being hard to learn. There's even a famous joke:

> "How do you generate a random string? Put a first-year CS student in front of Vim and tell them to exit."

But here's the secret: Vim isn't hard, it's just *different*. Once you understand **Vim modes**, everything clicks.

#### Diagram: The Vim Learning Curve

<details markdown="1">
<summary>Why Vim's Learning Curve is Worth It</summary>
Type: diagram

Bloom Taxonomy: Understand
Learning Objective: Visualize how the initial time investment in learning Vim pays off with dramatically increased productivity.

Layout: Graph showing productivity over time

Visual elements:
- X-axis: Time (days/weeks)
- Y-axis: Productivity
- Line 1 (blue): "Simple editor" - starts high, stays flat
- Line 2 (green): "Vim" - starts low, dips lower, then climbs dramatically upward
- Intersection point: "The breakthrough"
- Area between lines after intersection: "Your productivity gains"

Key annotations:
- Day 1: "Why can't I exit?!"
- Week 1: "Okay, this is starting to make sense"
- Week 2: "Wait, I can do THAT?"
- Month 1: "I never want to go back"
- Month 3: "I edit faster than I think"

Color scheme:
- Simple editor line: Blue
- Vim learning curve: Green
- Frustration zone: Red shaded area
- Productivity zone: Green shaded area

Implementation: p5.js
</details>

## Vim Modes: The Key to Understanding Vim

Unlike most editors where you just start typing, Vim uses **Vim modes**. Think of modes like different "states" the editor can be in. Each mode has a different purpose.

### The Three Main Modes

1. **Normal Mode** (Command Mode): For navigation and commands
2. **Insert Mode**: For typing text
3. **Visual Mode**: For selecting text

When you open Vim, you're in **Normal Mode** (also called **Vim Command Mode**). This is where beginners get confused—they try to type and weird things happen!

| Mode | Purpose | How to Enter | How to Exit |
|------|---------|--------------|-------------|
| Normal | Navigate, commands | `Esc` from any mode | (default mode) |
| Insert | Type text | `i`, `a`, `o`, etc. | `Esc` |
| Visual | Select text | `v`, `V`, `Ctrl+v` | `Esc` |

!!! note "The Golden Rule"
    When in doubt, press `Esc`. It always returns you to Normal mode!

### Vim Insert Mode: Time to Type

**Vim Insert Mode** is where you actually type text, like a normal editor. There are several ways to enter Insert mode:

| Key | Action |
|-----|--------|
| `i` | Insert before cursor |
| `I` | Insert at beginning of line |
| `a` | Append after cursor |
| `A` | Append at end of line |
| `o` | Open new line below |
| `O` | Open new line above |
| `s` | Substitute character (delete char, enter insert) |
| `S` | Substitute line (delete line, enter insert) |

When you're in Insert mode, you'll see `-- INSERT --` at the bottom of the screen.

```sh
# Example workflow:
# 1. Open file: vim test.txt
# 2. Press 'i' to enter Insert mode
# 3. Type: Hello, World!
# 4. Press Esc to return to Normal mode
# 5. Type :wq to save and quit
```

### Vim Command Mode: The Control Center

**Vim Command Mode** (Normal Mode) is where you navigate and execute commands. Here's why it's powerful: you can edit text without moving your hands from the home row!

#### Vim Navigation: Moving Like a Pro

Forget the arrow keys! **Vim navigation** uses letter keys:

| Key | Movement |
|-----|----------|
| `h` | Left |
| `j` | Down |
| `k` | Up |
| `l` | Right |

"But why h, j, k, l?" On old terminals, these keys literally had arrows on them. Now it's a tradition—and it keeps your hands on the home row.

More navigation commands:

| Key | Movement |
|-----|----------|
| `w` | Next word |
| `b` | Back a word |
| `e` | End of word |
| `0` | Beginning of line |
| `$` | End of line |
| `^` | First non-blank character |
| `gg` | Go to first line |
| `G` | Go to last line |
| `5G` | Go to line 5 |
| `Ctrl+f` | Page forward |
| `Ctrl+b` | Page backward |
| `%` | Jump to matching bracket |

#### Diagram: Vim Navigation Keys

<details markdown="1">
<summary>Understanding hjkl Navigation</summary>
Type: diagram

Bloom Taxonomy: Remember, Apply
Learning Objective: Visualize the hjkl key positions and their movement directions to build muscle memory.

Layout: Keyboard-style display with arrow indicators

Visual elements:
- Four keys arranged like on keyboard: h j k l
- Arrows showing direction of movement:
  - h: Left arrow
  - j: Down arrow
  - k: Up arrow
  - l: Right arrow
- Hand position overlay showing fingers on home row
- Animation: cursor moving on sample text as keys are "pressed"

Key teaching points:
- j looks like a down arrow (hook goes down)
- k is for "kick up"
- h is leftmost, l is rightmost
- Fingers stay on home row

Interactive features:
- Click/press keys to see cursor move
- Sample text area showing movement
- Speed challenge mode

Color scheme:
- Keys: Gray with white letters
- Active key: Blue highlight
- Direction arrows: Green
- Cursor: Orange

Implementation: p5.js
</details>

### Vim Visual Mode: Selecting Text

**Vim Visual Mode** lets you select text for copying, deleting, or changing:

| Key | Mode |
|-----|------|
| `v` | Character-wise visual |
| `V` | Line-wise visual |
| `Ctrl+v` | Block visual (columns!) |

Once in visual mode:

- Use navigation keys to extend selection
- `y` to yank (copy)
- `d` to delete
- `c` to change (delete and enter Insert)
- `>` to indent
- `<` to unindent

```sh
# Select and delete three lines:
# 1. Press V to start visual line mode
# 2. Press jj to select two more lines down
# 3. Press d to delete
```

Block visual mode (`Ctrl+v`) is magical—you can select and edit columns of text!

### Essential Editing Commands

In Normal mode, you have powerful editing commands:

| Command | Action |
|---------|--------|
| `x` | Delete character under cursor |
| `dd` | Delete entire line |
| `dw` | Delete word |
| `d$` | Delete to end of line |
| `yy` | Yank (copy) line |
| `yw` | Yank word |
| `p` | Paste after cursor |
| `P` | Paste before cursor |
| `u` | Undo |
| `Ctrl+r` | Redo |
| `.` | Repeat last command |

The commands are **composable**! You can combine numbers and motions:

```sh
# Delete 5 lines
5dd

# Yank 3 words
3yw

# Delete until end of line
d$

# Change inner word (delete word, enter insert mode)
ciw

# Delete everything inside parentheses
di(

# Change everything inside quotes
ci"
```

!!! tip "The Vim Grammar"
    Vim commands follow a grammar: `[count][operator][motion]`

    - `d` = delete, `y` = yank, `c` = change
    - `w` = word, `$` = end of line, `gg` = file start
    - `3dw` = delete 3 words
    - `d5j` = delete 5 lines down

## Vim Save and Quit: The Famous Commands

**Vim save and quit** commands all start with `:` (colon), which opens the command line at the bottom:

| Command | Action |
|---------|--------|
| `:w` | Write (save) file |
| `:q` | Quit (fails if unsaved changes) |
| `:wq` | Write and quit |
| `:x` | Write and quit (same as :wq) |
| `ZZ` | Write and quit (Normal mode) |
| `:q!` | Quit without saving (force) |
| `:wq!` | Write and quit (force) |
| `:w filename` | Save as new filename |
| `:e filename` | Edit a different file |

So when people joke about not being able to exit Vim:

```sh
# To exit Vim:
# 1. Press Esc (make sure you're in Normal mode)
# 2. Type :q and press Enter
# If you have unsaved changes: :q! to abandon them, :wq to save them
```

## Vim Search Replace: Find and Transform

**Vim search replace** is powerful and uses regular expressions!

### Searching

| Command | Action |
|---------|--------|
| `/pattern` | Search forward |
| `?pattern` | Search backward |
| `n` | Next match |
| `N` | Previous match |
| `*` | Search word under cursor (forward) |
| `#` | Search word under cursor (backward) |

```sh
# Search for "error"
/error
# Press n for next, N for previous
```

### Search and Replace

The substitute command syntax: `:[range]s/old/new/[flags]`

```sh
# Replace first occurrence on current line
:s/old/new/

# Replace all occurrences on current line
:s/old/new/g

# Replace all in entire file
:%s/old/new/g

# Replace with confirmation
:%s/old/new/gc

# Replace in lines 5-10
:5,10s/old/new/g

# Case insensitive
:%s/old/new/gi

# Replace in visual selection (select first, then :)
:'<,'>s/old/new/g
```

!!! note "The % Symbol"
    In Vim, `%` means "the entire file." So `:%s/old/new/g` means "substitute in the entire file."

## Vimrc Configuration: Make Vim Your Own

The **vimrc configuration** file (`~/.vimrc`) lets you customize Vim to your liking. Here's a sensible starter configuration:

```vim
" ~/.vimrc - Vim configuration file
" Comments start with double quotes

" === Display Settings ===
set number              " Show line numbers
set relativenumber      " Relative line numbers
set ruler               " Show cursor position
set showcmd             " Show partial commands
set showmode            " Show current mode
set cursorline          " Highlight current line

" === Indentation ===
set tabstop=4           " Tab width
set shiftwidth=4        " Indent width
set expandtab           " Use spaces instead of tabs
set autoindent          " Auto-indent new lines
set smartindent         " Smart indentation

" === Search ===
set hlsearch            " Highlight search matches
set incsearch           " Incremental search
set ignorecase          " Case insensitive search
set smartcase           " Case sensitive if uppercase used

" === Editing ===
set backspace=indent,eol,start  " Sensible backspace
set clipboard=unnamedplus       " Use system clipboard
syntax on               " Syntax highlighting

" === Usability ===
set mouse=a             " Enable mouse support
set wildmenu            " Command-line completion
set laststatus=2        " Always show status line
set scrolloff=5         " Keep 5 lines above/below cursor

" === Custom Mappings ===
" Use jk to exit insert mode (faster than reaching for Esc)
inoremap jk <Esc>

" Save with Ctrl+s
nnoremap <C-s> :w<CR>
inoremap <C-s> <Esc>:w<CR>a

" Clear search highlighting with Escape
nnoremap <Esc> :nohlsearch<CR>
```

To use this configuration:

```sh
# Create or edit your vimrc
vim ~/.vimrc

# Paste the configuration
# Save and quit: :wq

# Vim will use these settings automatically next time
```

### Vimrc Tips

```vim
" Split navigation made easier
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

" Quickly edit vimrc
nnoremap <leader>ev :vsplit $MYVIMRC<CR>
nnoremap <leader>sv :source $MYVIMRC<CR>

" The leader key (default is \, many change to space)
let mapleader = " "
```

!!! tip "Learn Vimtutor First"
    Vim comes with a built-in tutorial! Just type `vimtutor` in your terminal. It takes about 30 minutes and teaches all the basics interactively.

## The Great Editor War: Vi vs Emacs

Ah, the Editor War. If you haven't heard of it, buckle up—this is one of the longest-running, nerdiest feuds in computing history. It makes Marvel vs DC look like a polite disagreement about tea preferences.

### The Combatants

In the red corner: **Vi** (and later Vim), the modal editor we just learned about. Lightweight, fast, and available on every Unix system since the dawn of time.

In the blue corner: **Emacs**, created by Richard Stallman (yes, THE Richard Stallman who started the Free Software movement). Emacs is... well, it's not just an editor. It's been described as:

- "A great operating system, lacking only a decent editor"
- "An editor that happens to contain a Lisp interpreter, mail client, news reader, web browser, calendar, psychiatrist (really!), and several games"
- "Eight Megabytes And Constantly Swapping" (a joke from when 8MB was a LOT of memory)

### The Arguments (All In Good Fun)

**Vi users said:**

- "My editor loads before you can blink!"
- "I can edit files over a 300 baud modem connection!"
- "Real programmers don't need a kitchen sink in their editor!"
- "Emacs users have Emacs pinky from all those Ctrl combinations!"

**Emacs users said:**

- "I never have to leave my editor—ever. For anything."
- "Vi users are afraid of Lisp!"
- "Modal editing is like having to shift gears in a car. In 2024."
- "My editor can read email, browse the web, AND make coffee!" (That last one might be an exaggeration. Might.)

### The Flame Wars

The Editor War produced some legendary internet flame wars in the 1980s and 1990s. Newsgroups burned with passionate debates. Friendships were tested. Marriages... were probably fine, actually, but the internet drama was REAL.

There was even a mock religious war, with vi users forming the "Cult of vi" and Emacs users practicing the "Church of Emacs" (complete with St. IGNUcius, Stallman's alter ego, blessing computers).

### The Verdict: Vi Won (Sort Of)

Here's the thing: **Vi won the war**, but not by defeating Emacs—by outlasting the debate. Here's why:

1. **Vi/Vim is everywhere**: Every Linux system, every Mac, every BSD, every server you'll ever SSH into has vi. It's the cockroach of text editors (and I mean that lovingly).

2. **The keybindings spread**: Vim keybindings are now available in:
   - VS Code (Vim extension)
   - JetBrains IDEs (IdeaVim)
   - Sublime Text
   - Atom (RIP)
   - Web browsers (Vimium)
   - Even Emacs! (Evil mode—yes, really)

3. **Modern AI tools use Vim**: Tools like **Claude Code** let you jump straight into Vim with a single `Ctrl+G` command. When AI assistants default to Vim, you know which side history chose.

4. **Muscle memory**: Once you learn hjkl navigation, you want it everywhere. It's like learning to touch type—you can't go back.

### But Emacs Is Still Amazing

Let's be fair: Emacs is still beloved by many developers, especially in the Lisp, Clojure, and functional programming communities. Org-mode (Emacs's organizational system) is genuinely incredible. And Emacs users are some of the most passionate, dedicated programmers you'll ever meet.

The real winner of the Editor War? **Everyone who had fun arguing about it.**

!!! note "The True Lesson"
    The Editor War taught us something important: programmers are REALLY passionate about their tools. And that's okay! Use what makes you productive. Just be prepared to defend your choice at parties. (Kidding. Mostly.)

### Modern Peace Treaty

These days, most developers just... use both? Or neither! VS Code has largely taken over as the "default" editor for many new programmers. But here's the secret: VS Code's Vim extension is one of its most popular extensions.

So whether you're a vi purist, an Emacs evangelist, or a VS Code convert with Vim keybindings, we're all just trying to edit text efficiently. And now you know the history of why your senior developer gets a twinkle in their eye when someone mentions "the one true editor."

```
# The final word on the Editor War:
$ vim                    # The victor
$ emacs                  # The noble opponent
$ nano                   # The pacifist who avoided the whole thing
$ code --install-extension vscodevim.vim   # The compromise
$ claude-code && Ctrl+G  # The future
```

## Editor Selection: Choosing Your Weapon

So, which editor should YOU use? Here's the honest **editor selection** guide:

### Choose Nano If...

- You're just starting with Linux
- You need to make quick edits occasionally
- You want something that "just works"
- You don't edit files in the terminal frequently

### Choose Vim If...

- You edit files in the terminal frequently
- You write code or edit config files daily
- You want to become extremely productive
- You enjoy mastering powerful tools
- You work on remote servers often

### The Middle Path: Vim with Training Wheels

You don't have to go all-in immediately! Many editors support "Vim mode":

- VS Code has a Vim extension
- JetBrains IDEs have IdeaVim
- Even web browsers have Vim-like navigation (Vimium)

This lets you learn Vim keybindings while keeping your familiar editor.

### Comparison Table

| Feature | Nano | Vim |
|---------|------|-----|
| Learning curve | Gentle | Steep (then rewarding) |
| On-screen help | Yes | No (but :help is excellent) |
| Modes | No | Yes |
| Extensibility | Limited | Extensive |
| Speed once learned | Good | Excellent |
| Available everywhere | Usually | Almost always |
| Best for | Quick edits | Daily use |

#### MicroSim: Interactive Vim Mode Practice

<details markdown="1">
<summary>Practice Vim Modes</summary>
Type: microsim

Bloom Taxonomy: Apply, Analyze
Learning Objective: Allow students to practice switching between Vim modes and see how input is interpreted differently in each mode.

Canvas layout (responsive, ~750px max width):
- Top section (60px): Current mode indicator (NORMAL, INSERT, VISUAL)
- Middle section (300px): Text editing area with cursor
- Bottom section (120px): Key input display and mode explanation

Visual elements:
- Mode indicator: Large, color-coded badge
  - Normal: Blue background
  - Insert: Green background
  - Visual: Purple background
- Text area: Monospace font, with visible cursor
- Keystroke display: Shows what keys were pressed
- Action log: Shows what each keystroke did

Interactive controls:
- Full keyboard input capture
- Text area responds to Vim commands
- Mode switches with i, v, Esc

Behavior:
- Start in Normal mode
- Press i: Enter Insert mode, text input works
- Press Esc: Return to Normal mode
- Press v: Enter Visual mode, movement selects
- hjkl: Move cursor in Normal/Visual
- dd: Delete line in Normal
- yy: Yank line in Normal
- p: Paste in Normal

Sample starting text:
```
Hello, World!
This is a Vim practice area.
Try pressing i to insert text.
Press Esc to return to Normal mode.
Use hjkl to navigate.
```

Challenge modes:
1. "Type your name" - switch to Insert, type, switch back
2. "Delete a line" - use dd
3. "Copy and paste" - use yy and p
4. "Select and delete" - use V, j, d

Color scheme:
- Normal mode: Blue (#4a9eff)
- Insert mode: Green (#4ade80)
- Visual mode: Purple (#a78bfa)
- Text: White on dark background
- Cursor: Orange blink

Implementation: p5.js
</details>

## Vim Commands Cheat Sheet

### Mode Switching

```
i     Enter Insert mode (before cursor)
a     Enter Insert mode (after cursor)
o     Open line below, enter Insert mode
O     Open line above, enter Insert mode
v     Enter Visual mode
V     Enter Visual Line mode
Esc   Return to Normal mode
```

### Navigation

```
h/j/k/l   Left/Down/Up/Right
w/b       Next/Previous word
0/$       Start/End of line
gg/G      Start/End of file
Ctrl+f/b  Page forward/back
```

### Editing

```
x     Delete character
dd    Delete line
yy    Yank (copy) line
p     Paste after
P     Paste before
u     Undo
Ctrl+r  Redo
.     Repeat last command
```

### Save/Quit

```
:w    Save
:q    Quit
:wq   Save and quit
:q!   Quit without saving
ZZ    Save and quit
```

### Search

```
/pattern   Search forward
?pattern   Search backward
n/N        Next/Previous match
:%s/a/b/g  Replace all a with b
```

## Key Takeaways

You've learned the essential terminal text editors!

- **Nano**: Beginner-friendly with on-screen shortcuts
- **Vim**: Modal editor that's incredibly powerful once mastered
- **Vim Modes**: Normal (commands), Insert (typing), Visual (selecting)
- **Navigation**: hjkl keys keep hands on home row
- **Commands**: Composable grammar (count + operator + motion)
- **Configuration**: ~/.vimrc customizes your Vim experience

!!! success "You're an Editor Wizard Now!"
    Whether you stick with Nano for simple edits or dive deep into Vim mastery, you now have the skills to edit any file on any Linux system. No more being stuck unable to edit a config file on a remote server!

## What's Next?

Now that you can edit files like a pro, it's time to start writing your own programs—shell scripts! The next chapter introduces Bash scripting, where you'll automate tasks and combine everything you've learned.

---

??? question "Quick Quiz: Nano and Vim"
    1. What key do you press to save and exit in Nano?
    2. What does pressing `Esc` do in Vim?
    3. How do you enter Insert mode in Vim?
    4. What command searches and replaces all occurrences in a file?
    5. What file contains your Vim configuration?
    6. What does `dd` do in Vim's Normal mode?

??? note "Quiz Answers"
    1. `Ctrl+X` (then Y to confirm save)
    2. Returns you to Normal mode from any other mode
    3. Press `i` (or `a`, `o`, `I`, `A`, `O`)
    4. `:%s/old/new/g`
    5. `~/.vimrc`
    6. Deletes the entire current line
