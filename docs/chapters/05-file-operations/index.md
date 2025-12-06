---
title: File Operations and Manipulation
description: Master creating, copying, moving, and deleting files in Linux
generated_by: claude skill chapter-content-generator
date: 2025-12-06
version: 0.03
---

# File Operations and Manipulation

## Summary

This chapter teaches you how to create, copy, move, and delete files and directories. You'll learn essential commands like touch, mkdir, cp, mv, and rm, as well as how to view file contents using cat, head, tail, and less. These are the everyday operations you'll perform constantly when working with Linux.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

1. Touch Command
2. Mkdir Command
3. Rmdir Command
4. Cp Command
5. Mv Command
6. Rm Command
7. Rm Recursive
8. Cat Command
9. Head Command
10. Tail Command
11. Less Command
12. More Command
13. Wc Command
14. Sort Command
15. Uniq Command
16. Cut Command
17. Paste Command
18. Diff Command

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: File System Fundamentals](../04-file-system/index.md)

---

## From Tourist to Resident: Let's Make Some Files!

In the last chapter, you learned to navigate the Linux file system like a tourist exploring a new city. You could look around, read the street signs, and find your way home. But tourists just *look* at things—now it's time to become a **resident** and actually DO stuff!

This chapter is where things get real. You're going to learn to:

- Create files and directories out of thin air
- Copy files faster than you can say "Control-C Control-V"
- Move and rename files like a shell ninja
- Delete files (carefully... we'll talk about that)
- Peek inside files to see what's cooking

These are the bread-and-butter commands you'll use every single day in Linux. Master these, and you'll be amazed at how much faster you can work compared to clicking around in a graphical file manager.

!!! warning "With Great Power Comes Great Responsibility"
    Some of these commands can delete files permanently—no Recycle Bin, no "Are you sure?" confirmation, no undo. We'll teach you safe practices, but always double-check before hitting Enter on any destructive command!

## Creating Files: The Touch Command

Let's start with creating files. The **touch command** is your go-to tool for creating empty files:

```sh
touch myfile.txt
```

That's it! You've just created an empty file called `myfile.txt`. No wizard required, no dialog boxes, no "Save As"—just instant file creation.

"But wait," you might ask, "why is it called `touch`?" Great question! The command actually has two purposes:

1. **Create** a new empty file if it doesn't exist
2. **Update** the timestamp of an existing file (like "touching" it to show activity)

```sh
# Create a new file
touch newfile.txt

# Check its timestamp
ls -l newfile.txt
# -rw-r--r-- 1 dan dan 0 Dec  6 15:30 newfile.txt

# Wait a minute, then touch it again
touch newfile.txt

# Check timestamp - it's updated!
ls -l newfile.txt
# -rw-r--r-- 1 dan dan 0 Dec  6 15:31 newfile.txt
```

### Creating Multiple Files at Once

Why create files one at a time when you can batch them?

```sh
# Create multiple files
touch file1.txt file2.txt file3.txt

# Create files with a pattern using brace expansion
touch report_{jan,feb,mar,apr}.txt
# Creates: report_jan.txt, report_feb.txt, report_mar.txt, report_apr.txt

# Create numbered files
touch chapter_{1..10}.md
# Creates: chapter_1.md through chapter_10.md
```

!!! tip "Brace Expansion: Your Secret Weapon"
    The curly brace syntax `{a,b,c}` and `{1..10}` is called **brace expansion**. It's not just for `touch`—you can use it with almost any command. It's like a superpower for your terminal!

### Touch Options

```sh
# Create file only if it doesn't exist (no timestamp update)
touch -c newfile.txt

# Set a specific timestamp
touch -d "2025-01-01 12:00:00" oldfile.txt

# Copy timestamp from another file
touch -r reference.txt target.txt
```

## Creating Directories: The Mkdir Command

Files need homes, and that's where the **mkdir command** (Make Directory) comes in:

```sh
mkdir Documents
```

Boom! You've created a directory called `Documents`. But here's where it gets fun...

### Creating Nested Directories

What if you want to create `/home/dan/projects/website/css/themes`? You could do this:

```sh
mkdir projects
cd projects
mkdir website
cd website
mkdir css
cd css
mkdir themes
# Exhausting!
```

Or you could use the `-p` flag (for "parent"):

```sh
mkdir -p projects/website/css/themes
```

The `-p` flag creates all the parent directories as needed. It's like building the whole staircase at once instead of one step at a time. **This is one of the most useful flags in all of Linux.**

```sh
# Create a whole project structure at once
mkdir -p myproject/{src,tests,docs,config}

# This creates:
# myproject/
# ├── src/
# ├── tests/
# ├── docs/
# └── config/
```

!!! tip "Combine with Brace Expansion"
    Mix `mkdir -p` with brace expansion for maximum efficiency:
    ```sh
    mkdir -p project/{frontend/{css,js,images},backend/{routes,models,views}}
    ```
    This creates a complete project skeleton in one command!

## Removing Directories: The Rmdir Command

The **rmdir command** (Remove Directory) deletes directories... but there's a catch. It only removes **empty** directories:

```sh
mkdir test_dir
rmdir test_dir    # Works! Directory is empty

mkdir another_dir
touch another_dir/file.txt
rmdir another_dir
# rmdir: failed to remove 'another_dir': Directory not empty
```

This is actually a safety feature. `rmdir` won't accidentally delete a directory full of important files. If you want to remove a directory that has stuff in it, you'll need `rm -r` (which we'll cover soon, with lots of warnings).

```sh
# Remove multiple empty directories
rmdir dir1 dir2 dir3

# Remove directory and empty parent directories
rmdir -p projects/old/empty/dir
# Removes dir, then empty, then old if all are empty
```

#### Diagram: File and Directory Creation Commands

<details markdown="1">
<summary>Creating Files and Directories Workflow</summary>
Type: diagram

Use the microsim-py skill to create a side-by-side two panel simulation of directories and files being created in a projects directory. 

Bloom Taxonomy: Understand, Apply

Learning Objective: Visualize the relationship between mkdir, touch, echo and cat, and their options for creating file system structures.

Layout: two panels side by side.  The left side shows commands.  The right side is a upside down tree drawing (root at the top) of a file system.  The `/usr/home/dan` node is at the top.


Components to show:
- file system - just home directory labeled HOME
- Sequential steps showing touch and mkdir creating structure
- Visual representation of brace expansion creating multiple items
- Tree view showing final result
- dark circle around the node for current directory

Layout: Three-panel sequential diagram

Step 1 - Initial State:
- Empty HOME on the right
- Shell Command 1: pwd 
returns /usr/home/dan 

Step 2 - Commands Executed:
- mkdir projects
- cd projects
The projects node appears under the HOME directory

Step 2 - Touch Command
- touch creates empty files (shown as small document icons)
- touch today.txt
- Right tree shows 'today.txt' in projects

- mkdir creates directories (shown as folder icons)
- mkdir -p creates nested paths (shown with dotted parent folders materializing)
- Brace expansion shows one command creating multiple items

Panel 3 - Final Result:
- Complete tree structure showing all created items
- Files vs directories visually distinguished

Color coding:
- touch commands: Blue
- mkdir commands: Green
- New files: Light blue
- New directories: Light green

Animation:
- Show commands executing one by one
- Items appear with subtle pop animation
- Tree view updates in real-time

Implementation: p5.js with step-by-step animation
</details>

## Copying Files: The Cp Command

Now we're getting to the action! The **cp command** (Copy) duplicates files and directories:

```sh
# Basic syntax: cp source destination
cp original.txt copy.txt
```

Think of `cp` as a photocopier for your files. The original stays put, and a duplicate appears wherever you specify.

### Copy Scenarios

```sh
# Copy a file to another directory
cp report.txt ~/Documents/

# Copy and rename in one step
cp report.txt ~/Documents/quarterly_report.txt

# Copy a file to current directory (from somewhere else)
cp /etc/hostname .

# Copy multiple files to a directory
cp file1.txt file2.txt file3.txt ~/backup/
```

### Essential Cp Options

```sh
# -i: Interactive (ask before overwriting)
cp -i important.txt backup.txt
# cp: overwrite 'backup.txt'? y

# -v: Verbose (show what's happening)
cp -v *.txt ~/backup/
# 'notes.txt' -> '/home/dan/backup/notes.txt'
# 'todo.txt' -> '/home/dan/backup/todo.txt'

# -r: Recursive (copy directories and their contents)
cp -r myproject/ myproject_backup/

# -u: Update (only copy if source is newer)
cp -u *.txt ~/backup/

# Combine options
cp -riv source_dir/ destination_dir/
```

!!! warning "Trailing Slashes Matter!"
    Be careful with directory copies:
    ```sh
    cp -r dir1 dir2      # If dir2 exists: creates dir2/dir1
    cp -r dir1/ dir2     # Same behavior
    cp -r dir1/* dir2/   # Copies CONTENTS of dir1 into dir2
    ```
    When in doubt, use `-v` to see exactly what's happening!

### Preserving File Attributes

When you copy a file, some metadata (like ownership and timestamps) may change. To preserve everything:

```sh
# -p: Preserve mode, ownership, and timestamps
cp -p config.txt config_backup.txt

# -a: Archive mode (preserves everything, recursive)
cp -a myproject/ backup/
# Equivalent to cp -dR --preserve=all
```

| Option | Meaning | When to Use |
|--------|---------|-------------|
| `-i` | Interactive | When you might overwrite files |
| `-v` | Verbose | When you want to see what's happening |
| `-r` | Recursive | When copying directories |
| `-p` | Preserve | When timestamps/permissions matter |
| `-a` | Archive | For backups (preserves everything) |
| `-u` | Update | For incremental backups |

## Moving and Renaming: The Mv Command

The **mv command** (Move) is a two-for-one deal. It both moves files AND renames them:

```sh
# Rename a file
mv oldname.txt newname.txt

# Move a file to another directory
mv file.txt ~/Documents/

# Move and rename simultaneously
mv report.txt ~/Documents/final_report.txt

# Move multiple files
mv *.txt ~/Documents/
```

Here's the thing about `mv` that's different from `cp`: **the original is gone**. It's not a copy; it's a true move. If you `mv` a file to a new location, it no longer exists in the old location.

### The Rename Trick

Since `mv oldname newname` renames files, this is how you rename things in Linux. There's no separate "rename" command for individual files:

```sh
# Rename a file
mv chapter1.txt chapter01.txt

# Rename a directory
mv old_project_name new_project_name
```

### Mv Options

```sh
# -i: Interactive (ask before overwriting)
mv -i file.txt ~/Documents/
# mv: overwrite '/home/dan/Documents/file.txt'? y

# -v: Verbose (show what's happening)
mv -v *.txt ~/Documents/
# 'notes.txt' -> '/home/dan/Documents/notes.txt'

# -n: No clobber (never overwrite)
mv -n file.txt ~/Documents/

# -u: Update (only move if source is newer)
mv -u *.txt ~/Documents/

# -t: Target directory (useful with find/xargs)
mv -t ~/Documents/ file1.txt file2.txt
```

!!! tip "Mv vs Cp: When to Use Which"
    - Use **cp** when you want the original to stay where it is
    - Use **mv** when you want to relocate or rename
    - Rule of thumb: If you're "organizing," you probably want `mv`. If you're "backing up," you want `cp`.

#### Diagram: Cp vs Mv Comparison

<details markdown="1">
<summary>Copy vs Move Operations</summary>
Type: diagram

Bloom Taxonomy: Understand
Learning Objective: Clearly illustrate the difference between copy (duplicates) and move (relocates) operations.

Layout: Side-by-side comparison with before/after states

Left Panel - CP (Copy):
Before:
- Source directory with file.txt
- Empty destination directory

After:
- Source directory STILL HAS file.txt
- Destination directory has file.txt copy
- Arrow showing duplication action
- File appears in TWO places

Right Panel - MV (Move):
Before:
- Source directory with file.txt
- Empty destination directory

After:
- Source directory is EMPTY (file gone!)
- Destination directory has file.txt
- Arrow showing relocation action
- File appears in ONE place only

Visual elements:
- File icons with clear labels
- Directory boxes with names
- Arrows showing data flow
- Checkmarks/X marks showing presence/absence

Color coding:
- CP operations: Blue theme
- MV operations: Orange theme
- Original file: Solid color
- Copy: Dashed border or faded color

Interactive features:
- Click "Execute" to animate the operation
- Toggle between cp and mv to see difference
- Reset button to try again

Implementation: p5.js
</details>

## Deleting Files: The Rm Command

And now, the moment of truth. The **rm command** (Remove) deletes files:

```sh
rm unwanted_file.txt
```

Gone. Just like that. No confirmation, no Recycle Bin, no undo.

Let me say that again because it's **really important**:

!!! danger "There is No Undo"
    When you `rm` a file in Linux, it is GONE. It doesn't go to a Trash folder. It doesn't ask "Are you sure?" by default. The file is deleted immediately and permanently. Always double-check before hitting Enter!

### Rm Options (Your Safety Net)

```sh
# -i: Interactive (ask before each deletion)
rm -i *.txt
# rm: remove regular file 'notes.txt'? y
# rm: remove regular file 'todo.txt'? n

# -v: Verbose (show what's being deleted)
rm -v old_files/*
# removed 'old_files/junk1.txt'
# removed 'old_files/junk2.txt'

# -f: Force (never prompt, ignore nonexistent files)
rm -f maybe_exists.txt

# Combine for safety
rm -iv file.txt
```

### Rm Recursive: The Big One

The **rm recursive** flag (`-r` or `-R`) allows you to delete directories and everything inside them:

```sh
# Delete a directory and ALL its contents
rm -r old_project/
```

This is powerful and dangerous. One wrong command, and you could delete thousands of files. Here are some safety practices:

```sh
# ALWAYS use -i for important deletions
rm -ri project_backup/

# ALWAYS use -v to see what's happening
rm -rv temp_files/

# Double-check with ls first
ls old_project/  # Look at what you're about to delete
rm -r old_project/

# Use safer alternatives when possible
trash old_project/  # If you have trash-cli installed
```

!!! danger "The Most Dangerous Command in Linux"
    You may have heard horror stories about:
    ```sh
    rm -rf /        # NEVER EVER RUN THIS
    rm -rf ~        # DELETES YOUR ENTIRE HOME DIRECTORY
    rm -rf *        # DELETES EVERYTHING IN CURRENT DIRECTORY
    ```
    These commands can destroy your system or all your files in seconds. Modern Linux prevents `rm -rf /` but the others will work. Always know what directory you're in (`pwd`) before using `rm -r`!

### Safe Deletion Practices

1. **Always know where you are**: Run `pwd` before `rm -r`
2. **Use `-i` for important stuff**: `rm -ri directory/`
3. **Preview first**: `ls directory/` before deleting
4. **Consider trash-cli**: Install `trash-cli` for a command-line trash can
5. **Make backups**: Before major deletions, copy important files

```sh
# Install trash-cli (safer alternative)
sudo apt install trash-cli   # Debian/Ubuntu
brew install trash-cli       # macOS

# Use it instead of rm
trash file.txt              # Moves to trash
trash-empty                 # Empty the trash
trash-list                  # See what's in trash
trash-restore               # Recover files
```

## One Character Makes a Big Difference

Early in my career I was working as the "Superuser" on a UNIX system.
I wanted to delete a big directory of files generated by an overnight
logic simulation that tools many megabytes (really big back in 1984).
I wanted to type:

```sh
rm -rf ./BIGDIR
```

Unfortunately, what I actually types was the following:

```sh
rm -rf . /BIGDIR
```

Did you notice that extra space?  A dot is the current directory.

In this case the "." was the root file systems.  UNIX deleted EVERYTHING!
Luckily, I was very careful about running backups on magnetic tape every night.
Although it took me two hours to restore the file system impacting all my
users, I will say I have never repeated that mistake again.  Sometimes
painful public embarrassment is the best teacher!

## Viewing File Contents: Cat, Head, Tail, and Friends

Now that you can create, copy, move, and delete files, let's learn to look inside them!

### The Cat Command

The **cat command** (concatenate) displays file contents. It's one of the most-used commands in Linux:

```sh
cat myfile.txt
```

The whole file spills out onto your screen. Simple!

```sh
# Display a file
cat notes.txt

# Display multiple files (concatenated)
cat part1.txt part2.txt part3.txt

# Display with line numbers
cat -n script.py

# Show non-printing characters
cat -A mystery_file.txt

# Create a file with cat (Ctrl+D to finish)
cat > newfile.txt
This is the content.
More content here.
^D
```

!!! tip "Cat's Origin Story"
    `cat` is short for "concatenate" because its original purpose was to join (concatenate) files together:
    ```sh
    cat file1.txt file2.txt > combined.txt
    ```
    Using it to display single files is almost an afterthought, but it's now the most common use!

### The Head Command

What if you just want to peek at the beginning of a file? The **head command** shows you the first lines:

```sh
# Show first 10 lines (default)
head largefile.txt

# Show first N lines
head -n 5 largefile.txt
head -5 largefile.txt       # Shorthand

# Show first N bytes
head -c 100 largefile.txt
```

`head` is perfect for:

- Quickly checking what a file contains
- Looking at CSV headers
- Previewing log files
- Checking if a file is what you think it is

### The Tail Command

The opposite of head! The **tail command** shows the last lines of a file:

```sh
# Show last 10 lines (default)
tail logfile.txt

# Show last N lines
tail -n 20 logfile.txt
tail -20 logfile.txt        # Shorthand

# Show everything from line N onwards
tail -n +100 largefile.txt  # From line 100 to end
```

But here's where tail gets REALLY cool:

```sh
# -f: Follow mode (watch file in real-time)
tail -f /var/log/syslog
```

The `-f` flag makes tail "follow" the file. As new lines are added, they appear on your screen. This is **incredibly useful** for watching log files while debugging. Press `Ctrl+C` to stop following.

```sh
# Watch multiple files
tail -f log1.txt log2.txt

# Follow and show last 50 lines
tail -50f application.log
```

!!! tip "Tail -f is Your Debugging Best Friend"
    When something's not working right, open a terminal and run:
    ```sh
    tail -f /var/log/syslog
    ```
    Then try the broken thing in another window. Watch the logs for error messages!

### Head + Tail Combo: Getting Lines from the Middle

What if you want lines 50-60 from a file? Combine head and tail with pipes!

```sh
# Get lines 50-60
head -60 file.txt | tail -11

# Or using tail -n +N
tail -n +50 file.txt | head -11
```

#### Diagram: Head and Tail Visualization

<details markdown="1">
<summary>Head and Tail Command Visualization</summary>
Type: microsim

Bloom Taxonomy: Understand, Apply
Learning Objective: Visualize how head and tail extract portions of files, and understand the -f follow mode.

Canvas layout (responsive, ~700px max):
- File visualization area (400px): Shows a "file" with numbered lines
- Control panel (remaining): Command input and options

Visual elements:
- A tall "document" showing 30+ lines numbered
- Highlighted region showing selected lines
- Visual representation of command being run
- Output preview showing selected lines

Simulated file:
- Line 1: "First line of the file"
- Line 2: "Second line here"
- ... (numbered lines with sample text)
- Line 30: "This is the last line"

Interactive controls:
- Radio buttons: head / tail / both
- Slider: Number of lines (1-30)
- Input: Custom number with -n flag
- Checkbox: -f mode demonstration (for tail)
- Button: "Run Command"

Behavior:
- Select head: highlight from top
- Select tail: highlight from bottom
- Adjust slider: change highlighted range
- Show the actual command being generated
- Display "output" showing extracted lines
- For -f mode: animate new lines appearing at bottom

Example scenarios:
- head -5: Highlights lines 1-5
- tail -10: Highlights lines 21-30
- head -20 | tail -5: Highlights lines 16-20

Color scheme:
- File background: Light gray
- Selected lines: Yellow highlight
- Line numbers: Blue
- Unselected lines: Faded

Implementation: p5.js
</details>

### The Less Command (More is Less!)

For large files, `cat` dumps everything at once—not helpful for a 10,000-line file! The **less command** is an interactive file viewer:

```sh
less largefile.txt
```

Now you can scroll through the file like a civilized person!

**Less navigation:**

| Key | Action |
|-----|--------|
| `Space` / `f` | Forward one page |
| `b` | Back one page |
| `Enter` / `j` | Forward one line |
| `k` | Back one line |
| `g` | Go to beginning |
| `G` | Go to end |
| `/pattern` | Search forward |
| `?pattern` | Search backward |
| `n` | Next search match |
| `N` | Previous search match |
| `q` | Quit |

```sh
# Open with line numbers
less -N file.txt

# Open and search for pattern
less +/error logfile.txt

# Follow mode (like tail -f)
less +F logfile.txt
```

!!! tip "Less Has More Features"
    `less` can do so much more than `more`! You can:
    - Search forward AND backward
    - Mark positions and return to them
    - Edit the file (press `v`)
    - See line numbers
    - Handle binary files safely

### The More Command

The **more command** is the older, simpler cousin of `less`:

```sh
more largefile.txt
```

It only scrolls forward (not backward), which is why the saying goes: **"less is more"** (because `less` does more than `more`!).

`more` still exists for compatibility, but most people use `less` because... well... it's more useful. Get it? 😄

## Text Processing Tools: Wc, Sort, Uniq, Cut, Paste

Now let's level up with some powerful text processing commands. These tools are like data superpowers!

### The Wc Command (Word Count)

The **wc command** counts lines, words, and characters:

```sh
wc myfile.txt
# 42  156  890 myfile.txt
# │    │    │
# │    │    └── bytes (characters)
# │    └── words
# └── lines
```

Get specific counts:

```sh
# Count lines only
wc -l myfile.txt

# Count words only
wc -w myfile.txt

# Count characters only
wc -c myfile.txt

# Count multiple files
wc *.txt
```

`wc` is incredibly useful in pipelines:

```sh
# How many files in this directory?
ls | wc -l

# How many lines of code?
cat *.py | wc -l

# How many users?
cat /etc/passwd | wc -l
```

### The Sort Command

The **sort command** sorts lines alphabetically (or numerically):

```sh
# Basic alphabetical sort
sort names.txt

# Reverse order
sort -r names.txt

# Numeric sort
sort -n numbers.txt

# Sort by column (tab-delimited)
sort -k 2 data.txt      # Sort by 2nd column

# Ignore case
sort -f names.txt

# Remove duplicates while sorting
sort -u names.txt
```

Real-world examples:

```sh
# Sort files by size (using ls)
ls -l | sort -k 5 -n

# Find biggest files
ls -l | sort -k 5 -n -r | head -10

# Sort IP addresses
sort -t. -k1,1n -k2,2n -k3,3n -k4,4n ips.txt
```

### The Uniq Command

The **uniq command** filters out ADJACENT duplicate lines:

```sh
# Remove adjacent duplicates
uniq sorted_file.txt

# Count occurrences
uniq -c sorted_file.txt

# Show only duplicates
uniq -d sorted_file.txt

# Show only unique lines (no duplicates)
uniq -u sorted_file.txt
```

**Important:** `uniq` only removes ADJACENT duplicates. For non-adjacent duplicates, sort first:

```sh
# This won't work as expected:
echo -e "apple\norange\napple" | uniq
# apple
# orange
# apple  ← Still here!

# This works:
echo -e "apple\norange\napple" | sort | uniq
# apple
# orange
```

Classic combo for finding duplicate counts:

```sh
# Find most common words
cat book.txt | tr ' ' '\n' | sort | uniq -c | sort -rn | head -10
```

### The Cut Command

The **cut command** extracts columns or fields from text:

```sh
# Cut characters 1-10
cut -c 1-10 file.txt

# Cut fields (default delimiter: tab)
cut -f 1,3 data.tsv     # Fields 1 and 3

# Cut with custom delimiter
cut -d ',' -f 2 data.csv      # 2nd field, comma-separated
cut -d ':' -f 1 /etc/passwd   # Usernames from passwd
```

Real examples:

```sh
# Get usernames from /etc/passwd
cut -d ':' -f 1 /etc/passwd

# Get home directories
cut -d ':' -f 1,6 /etc/passwd

# Get 2nd column from CSV
cut -d ',' -f 2 sales.csv
```

### The Paste Command

The **paste command** is the opposite of cut—it joins files line by line:

```sh
# Join two files side by side
paste names.txt scores.txt

# Join with custom delimiter
paste -d ',' names.txt scores.txt

# Join all lines into one (serial)
paste -s file.txt

# Create CSV from multiple files
paste -d ',' col1.txt col2.txt col3.txt > data.csv
```

Example:

```sh
# file1.txt:       file2.txt:
# Alice            90
# Bob              85
# Charlie          92

paste file1.txt file2.txt
# Alice   90
# Bob     85
# Charlie 92

paste -d ',' file1.txt file2.txt
# Alice,90
# Bob,85
# Charlie,92
```

#### Diagram: Text Processing Pipeline

<details markdown="1">
<summary>Text Processing Tools Pipeline</summary>
Type: diagram

Bloom Taxonomy: Apply, Analyze
Learning Objective: Show how text processing tools (sort, uniq, cut, wc) can be combined in pipelines to transform data.

Layout: Horizontal data flow diagram showing transformation stages

Scenario: Processing a log file to find top error types

Input data (leftmost):
```
ERROR: File not found
WARNING: Low memory
ERROR: Connection refused
ERROR: File not found
INFO: Request completed
ERROR: Connection refused
ERROR: File not found
```

Pipeline stages (left to right):
1. grep "ERROR" → filters to only ERROR lines
2. cut -d ':' -f 2 → extracts error message
3. sort → alphabetizes messages
4. uniq -c → counts occurrences
5. sort -rn → sorts by count descending
6. head -3 → top 3 errors

Visual elements:
- Data boxes showing content at each stage
- Arrows with command labels
- Color coding for each command type

Output (rightmost):
```
3 File not found
2 Connection refused
```

Interactive features:
- Click each stage to see intermediate output
- Highlight matching data at each step
- Toggle different example datasets

Color coding:
- grep: Red
- cut: Orange
- sort: Blue
- uniq: Green
- head: Purple

Implementation: HTML/CSS/JavaScript or p5.js
</details>

## Comparing Files: The Diff Command

The **diff command** compares two files and shows their differences:

```sh
diff file1.txt file2.txt
```

Understanding diff output:

```
3c3
< old line in file1
---
> new line in file2

5d4
< deleted line

7a8
> added line
```

The codes mean:

| Code | Meaning |
|------|---------|
| `c` | Changed |
| `d` | Deleted |
| `a` | Added |
| `<` | Line from first file |
| `>` | Line from second file |

### Diff Options

```sh
# Side-by-side comparison
diff -y file1.txt file2.txt

# Show only whether files differ
diff -q file1.txt file2.txt

# Unified format (like git diff)
diff -u file1.txt file2.txt

# Ignore whitespace
diff -w file1.txt file2.txt

# Ignore case
diff -i file1.txt file2.txt

# Recursive directory comparison
diff -r dir1/ dir2/
```

The unified format (`-u`) is especially readable:

```diff
--- file1.txt   2025-12-06 10:00:00
+++ file2.txt   2025-12-06 10:30:00
@@ -1,4 +1,4 @@
 Line 1
-Old line 2
+New line 2
 Line 3
 Line 4
```

!!! tip "Diff + Git"
    When you use Git for version control, `git diff` uses a similar format. Learning to read diff output is essential for any developer!

#### Diagram: Diff Command Visualization

<details markdown="1">
<summary>Interactive Diff Comparison Tool</summary>
Type: microsim

Bloom Taxonomy: Understand, Analyze
Learning Objective: Help students understand diff output by showing side-by-side files with changes highlighted and corresponding diff codes.

Canvas layout (responsive, ~800px max):
- Left panel (300px): File 1 content
- Right panel (300px): File 2 content
- Bottom panel (200px): Diff output with explanations

Visual elements:
- Two "text editor" style panels with line numbers
- Color-coded highlighting for changes
- Diff output with hover explanations
- Legend explaining diff codes

Sample files to compare:
File 1:
```
Apple
Banana
Cherry
Date
Elderberry
```

File 2:
```
Apple
Blueberry
Cherry
Fig
Elderberry
Grape
```

Highlighting:
- Changed lines: Yellow background (Banana→Blueberry, Date→Fig)
- Deleted lines: Red strikethrough
- Added lines: Green background (Grape)
- Unchanged: White background

Interactive features:
- Edit either file and see diff update live
- Click on diff output to highlight corresponding lines
- Toggle between normal and unified (-u) format
- Switch between different example file pairs

Color coding:
- Unchanged: White
- Changed: Yellow
- Deleted: Light red with strikethrough
- Added: Light green

Implementation: p5.js or HTML/CSS/JavaScript
</details>

## Putting It All Together: File Operations Workflow

Let's practice combining everything you've learned. Here's a real-world scenario:

### Scenario: Organizing Downloads

Your Downloads folder is a mess. Let's clean it up!

```sh
# First, see what's there
cd ~/Downloads
ls -la

# Create organized folders
mkdir -p organized/{documents,images,archives,code,other}

# Move files by type
mv *.pdf *.doc *.docx *.txt organized/documents/ 2>/dev/null
mv *.jpg *.jpeg *.png *.gif organized/images/ 2>/dev/null
mv *.zip *.tar *.gz *.7z organized/archives/ 2>/dev/null
mv *.py *.js *.html *.css organized/code/ 2>/dev/null

# Move everything else to other
mv * organized/other/ 2>/dev/null

# Check our work
tree organized/
```

### Scenario: Quick Backup

Before making changes, create a quick backup:

```sh
# Backup a single file
cp important.txt important.txt.bak

# Backup with date
cp config.conf config.conf.$(date +%Y%m%d)

# Backup entire directory
cp -a myproject/ myproject_backup_$(date +%Y%m%d)/
```

### Scenario: Log Analysis

Find the most common errors in a log file:

```sh
# Get error lines, extract message, count, sort by frequency
grep "ERROR" application.log | cut -d ':' -f 2 | sort | uniq -c | sort -rn | head -10
```

## File Operations Cheat Sheet

Here's your quick reference card:

| Command | Purpose | Example |
|---------|---------|---------|
| `touch` | Create empty file | `touch newfile.txt` |
| `mkdir` | Create directory | `mkdir -p path/to/dir` |
| `rmdir` | Remove empty directory | `rmdir emptydir` |
| `cp` | Copy files/dirs | `cp -r src/ dest/` |
| `mv` | Move/rename | `mv old.txt new.txt` |
| `rm` | Delete files | `rm -ri directory/` |
| `cat` | Display file | `cat file.txt` |
| `head` | Show beginning | `head -20 file.txt` |
| `tail` | Show end | `tail -f log.txt` |
| `less` | Page through file | `less bigfile.txt` |
| `more` | Page (forward only) | `more bigfile.txt` |
| `wc` | Count lines/words | `wc -l file.txt` |
| `sort` | Sort lines | `sort -n numbers.txt` |
| `uniq` | Remove duplicates | `sort \| uniq -c` |
| `cut` | Extract columns | `cut -d ',' -f 2` |
| `paste` | Merge files | `paste a.txt b.txt` |
| `diff` | Compare files | `diff -u old new` |

## Key Takeaways

You've mastered the essential file operations! Here's what you now know:

- **touch** creates empty files (or updates timestamps)
- **mkdir -p** creates directories (including parents)
- **cp -r** copies files and directories
- **mv** moves OR renames files
- **rm -r** deletes directories (**BE CAREFUL!**)
- **cat** displays files, **head** shows beginnings, **tail** shows ends
- **less** is your interactive file viewer (better than more!)
- **tail -f** follows log files in real-time
- **wc** counts, **sort** sorts, **uniq** de-duplicates
- **cut** extracts columns, **paste** combines files
- **diff** compares files

!!! success "You're a File Operations Pro!"
    You can now create, organize, view, and manage files entirely from the command line. These skills will serve you every single day as you work with Linux. Practice these commands until they become second nature!

## What's Next?

Now that you can manipulate files, it's time to learn about **permissions and ownership**. Who can read your files? Who can modify them? Who can run programs? That's coming up next!

But first, let's make sure all this knowledge sticks with some practice...

---

??? question "Quick Quiz: File Operations"
    1. What command creates an empty file?
    2. How do you create nested directories in one command?
    3. What's the difference between `cp` and `mv`?
    4. What does `rm -r` do, and why is it dangerous?
    5. How do you watch a log file update in real-time?
    6. What does `sort | uniq` do that `uniq` alone doesn't?

??? note "Quiz Answers"
    1. `touch filename` creates an empty file
    2. `mkdir -p path/to/nested/dir` creates all parent directories
    3. `cp` duplicates (original stays), `mv` relocates (original gone)
    4. `rm -r` deletes directories recursively—dangerous because it permanently deletes everything with no undo
    5. `tail -f logfile.txt` follows the file and shows new lines as they're added
    6. `sort | uniq` removes ALL duplicates; `uniq` alone only removes ADJACENT duplicates

