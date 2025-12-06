---
title: File System Fundamentals
description: Learn to navigate the Linux file system hierarchy and understand directory structure
generated_by: claude skill chapter-content-generator
date: 2025-12-06
version: 0.03
---

# File System Fundamentals

## Summary

This chapter explores the Linux file system hierarchy, teaching you how everything in Linux is organized as files and directories. You'll learn to navigate using absolute and relative paths, understand the purpose of key system directories like /bin, /etc, and /home, and master essential navigation commands. Understanding the file system is crucial for working effectively in Linux.

## Concepts Covered

This chapter covers the following 32 concepts from the learning graph:

1. File System
2. Root Directory
3. Home Directory
4. Current Directory
5. Parent Directory
6. Absolute Path
7. Relative Path
8. Pwd Command
9. Cd Command
10. Ls Command
11. Ls Options
12. Hidden Files
13. Dot Files
14. Directory Structure
15. Bin Directory
16. Etc Directory
17. Var Directory
18. Tmp Directory
19. Usr Directory
20. Opt Directory
21. Dev Directory
22. Proc Directory
23. Home Subdirectories
24. Desktop Directory
25. Documents Directory
26. Downloads Directory
27. Tree Command
28. File Command
29. Stat Command
30. Pathnames
31. macOS open command
32. Open alias on Linux

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Operating Systems and UNIX History](../01-unix-history/index.md)
- [Chapter 2: Getting Started with the Terminal](../02-terminal-basics/index.md)

---

## Everything Is a File (No, Really!)

One of the most mind-bending things about Linux is its philosophy that **everything is a file**. Not just your documents and photos—EVERYTHING:

- Regular files? Files. ✓
- Directories? Special files that contain other files. ✓
- Your keyboard? A file. ✓
- Your screen? A file. ✓
- Your USB drive? A file. ✓
- Network connections? Files. ✓
- Running processes? Files. ✓

This might sound weird, but it's actually brilliant. Because everything is accessed the same way, you can use the same tools and concepts for nearly everything in the system. Learn to work with files, and you've learned to work with Linux.

In this chapter, we'll explore how Linux organizes its **file system**—the structure that holds all these files. Think of it as learning the layout of a new city. Once you know the neighborhoods and how the streets connect, you can get anywhere!

!!! tip "Why File System Knowledge Matters"
    Understanding the file system is like having a map. Without it, you're wandering aimlessly, guessing where things are. With it, you'll know exactly where to find configuration files, executables, logs, and your own data.

## The Root of All Files: /

Every Linux file system starts at a single point called the **root directory**, written as just a forward slash: `/`

This is the top of the tree—the ultimate parent directory that contains everything else. Unlike Windows, which has separate drives (C:, D:, E:), Linux has ONE unified tree starting at root. Everything—every file, every device, every directory—lives somewhere under `/`.

```
/                   ← The root directory (top of everything)
├── bin/            ← Essential commands
├── etc/            ← System configuration
├── home/           ← User home directories
│   ├── dan/        ← Dan's home
│   └── alice/      ← Alice's home
├── tmp/            ← Temporary files
├── usr/            ← User programs
├── var/            ← Variable data (logs, etc.)
└── ...             ← Many more directories
```

!!! note "Root Directory vs Root User"
    Don't confuse them! The **root directory** (`/`) is the top of the file system. The **root user** is the administrator account. They share a name because root user's home directory is `/root` (a directory INSIDE the root directory). Confusing? A little. Just remember: `/` = file system top, `root` = admin user.

## Home Sweet Home: Your Home Directory

While the root directory contains the whole system, your **home directory** is your personal space. It's where:

- Your personal files live (Documents, Downloads, Pictures)
- Your configuration files are stored
- You have full permission to create, modify, and delete files

Your home directory is located at `/home/username`. So if your username is "dan", your home is `/home/dan`.

There's a super handy shortcut for your home directory: the tilde character `~`

```bash
# These are all equivalent for user "dan":
cd /home/dan
cd ~
cd $HOME
cd          # Just "cd" with no arguments goes home!
```

The `~` is incredibly useful:

```bash
# Go to your Documents folder
cd ~/Documents

# Copy a file to your home directory
cp somefile.txt ~

# List files in your Desktop
ls ~/Desktop
```

### Home Subdirectories

Most Linux systems create standard folders in your home directory:

| Directory | Purpose |
|-----------|---------|
| **Desktop** | Files/folders shown on your desktop GUI |
| **Documents** | General documents |
| **Downloads** | Downloaded files (browsers save here by default) |
| **Music** | Audio files |
| **Pictures** | Images and photos |
| **Videos** | Video files |
| **Templates** | Document templates |
| **Public** | Files you want to share with other users |

These are just conventions—you can organize your files however you like! But many programs expect these directories to exist.

## Where Am I? The Current Directory

At any moment, your terminal is "in" a specific directory called the **current directory** (also called "working directory" or "present working directory"). When you run commands, they operate relative to this location.

The **pwd command** (Print Working Directory) tells you where you are:

```bash
pwd
# /home/dan/Documents
```

That's it! `pwd` is your "You Are Here" marker on the file system map.

Your shell prompt usually shows the current directory too:

```bash
dan@raspberry:~/Documents$
#             ↑ This shows current directory
```

!!! tip "Lost? Just pwd!"
    Whenever you're not sure where you are in the file system, type `pwd`. It's the command-line equivalent of looking at the GPS on your phone.

## Moving Around: The cd Command

The **cd command** (Change Directory) is how you move through the file system. It's like walking from one room to another in a building.

```bash
# Go to a specific directory
cd /home/dan/Documents

# Go to your home directory
cd ~
# or just
cd

# Go to the root directory
cd /

# Go up one level (to parent directory)
cd ..

# Go back to the previous directory
cd -
```

### The Parent Directory: ..

The **parent directory** is the directory that contains the current one. It's represented by two dots: `..`

```
/home/dan/Documents/Projects
       ↑                ↑
       └── Parent of ───┘
```

So if you're in `/home/dan/Documents/Projects`:

```bash
pwd
# /home/dan/Documents/Projects

cd ..
pwd
# /home/dan/Documents

cd ..
pwd
# /home/dan

cd ..
pwd
# /home

cd ..
pwd
# /
```

You can chain `..` to go up multiple levels:

```bash
cd ../..        # Go up two levels
cd ../../..     # Go up three levels
```

### The Current Directory: .

A single dot `.` represents the current directory. It seems pointless ("I'm already here!"), but it's useful in certain contexts:

```bash
# Run a script in the current directory
./myscript.sh

# Copy files TO the current directory
cp /some/file.txt .

# List the current directory explicitly
ls .
```

## Absolute vs Relative Paths

Here's a crucial concept: there are two ways to specify a location in the file system.

### Absolute Paths

An **absolute path** starts from the root directory `/` and specifies the complete location:

```bash
/home/dan/Documents/report.txt
/etc/passwd
/usr/bin/python3
```

Absolute paths work from anywhere—they're like giving a complete street address.

### Relative Paths

A **relative path** starts from your current directory:

```bash
# If you're in /home/dan:
Documents/report.txt     # Relative to where you are
../alice/photos          # Go up, then into alice, then photos
./script.sh              # Current directory
```

Relative paths are like giving directions from where you are ("go two blocks north, turn left").

| Path Type | Starts With | Example | Works From |
|-----------|-------------|---------|------------|
| Absolute | `/` | `/home/dan/file.txt` | Anywhere |
| Relative | No `/` | `Documents/file.txt` | Current directory only |
| Home-relative | `~` | `~/Documents/file.txt` | Anywhere (expands to absolute) |

#### Diagram: Absolute vs Relative Paths

<details markdown="1">
<summary>Understanding Path Types</summary>
Type: diagram

Bloom Taxonomy: Understand, Apply
Learning Objective: Help students visualize the difference between absolute and relative paths with concrete examples.

Components to show:
- File system tree visualization
- Current directory highlighted
- Three example paths shown: absolute, relative, and home-relative
- Arrows showing how each path type navigates the tree

Layout: Tree diagram on left, path examples on right

Example scenario:
- Tree showing /home/dan/Documents/Projects/
- Current directory: /home/dan/Documents
- Target: /home/dan/Documents/Projects/report.txt

Paths compared:
- Absolute: /home/dan/Documents/Projects/report.txt (starts at root, follows full path)
- Relative: Projects/report.txt (starts at current dir)
- Home-relative: ~/Documents/Projects/report.txt (starts at ~)

Color coding:
- Root (/): Red
- Home directory: Green
- Current directory: Blue highlight
- Target file: Gold star

Interactive features:
- Click to change "current directory"
- See how relative paths change but absolute stays same

Implementation: p5.js or HTML/CSS
</details>

## Listing Files: The ls Command

The **ls command** is your window into directories. It lists the contents of a directory:

```bash
ls
# Desktop  Documents  Downloads  Music  Pictures  Videos
```

By default, `ls` shows the current directory. You can specify any path:

```bash
ls /etc              # List /etc directory
ls ~/Documents       # List your Documents
ls ..                # List parent directory
```

### Essential Ls Options

The `ls` command becomes much more powerful with **ls options**:

```bash
# Long format (detailed info)
ls -l
# -rw-r--r-- 1 dan dan 4096 Dec  6 14:30 file.txt

# Show hidden files
ls -a
# .  ..  .bashrc  .config  Documents  Downloads

# Human-readable sizes
ls -h
# (use with -l) Shows "4.0K" instead of "4096"

# Combine options
ls -la         # Long format + hidden files
ls -lah        # Long + hidden + human-readable

# Sort by time (newest first)
ls -lt

# Sort by size (largest first)
ls -lS

# Reverse sort order
ls -lr

# Recursive (show subdirectories too)
ls -R
```

### Understanding ls -l Output

The long format (`ls -l`) shows lots of info:

```
-rw-r--r-- 1 dan dan 4096 Dec  6 14:30 report.txt
│├──┬───┘  │  │   │    │      │         │
││  │      │  │   │    │      │         └── Filename
││  │      │  │   │    │      └── Modification date/time
││  │      │  │   │    └── File size (bytes)
││  │      │  │   └── Group owner
││  │      │  └── User owner
││  │      └── Number of links
││  └── Permissions (owner/group/others)
│└── File type (- = file, d = directory, l = link)
```

Common file types in the first character:

| Character | Meaning |
|-----------|---------|
| `-` | Regular file |
| `d` | Directory |
| `l` | Symbolic link |
| `c` | Character device |
| `b` | Block device |

## Hidden Files and Dot Files

In Linux, any file or directory whose name starts with a dot (`.`) is hidden. These are called **hidden files** or **dot files**.

```bash
ls
# Documents  Downloads  Music

ls -a
# .  ..  .bashrc  .config  .hidden_file  Documents  Downloads  Music
```

Why hide files? Mostly to reduce clutter. Your home directory contains LOTS of configuration files that you don't need to see daily:

| Dot File | Purpose |
|----------|---------|
| `.bashrc` | Bash shell configuration |
| `.bash_history` | Your command history |
| `.config/` | Application configurations |
| `.ssh/` | SSH keys and settings |
| `.gitconfig` | Git configuration |
| `.vimrc` | Vim editor settings |

!!! tip "Dot Files are Your Settings"
    When you customize your shell, editor, or other programs, those settings are usually saved in dot files in your home directory. Learning to edit them gives you tremendous control over your environment!

To show ONLY hidden files:

```bash
ls -d .*        # List only dot files/directories in current dir
```

## The Linux Directory Structure

Now let's explore the major directories in Linux. Understanding the **directory structure** helps you know where to find (and put) things.

### /bin - Essential Binaries

The **bin directory** (`/bin`) contains essential commands that must be available even if other parts of the system aren't mounted. These are commands needed to boot and repair the system:

```bash
ls /bin
# bash  cat  cp  ls  mkdir  mv  rm  ...
```

Commands like `ls`, `cp`, `mv`, `cat`, `bash`—the basics that you've been learning—live here.

!!! note "Modern Systems: /bin → /usr/bin"
    On modern Linux systems, `/bin` is often a symbolic link to `/usr/bin`. They've been merged for simplicity. You'll still see `/bin` referenced everywhere though!

### /etc - Configuration Files

The **etc directory** (`/etc`) contains system-wide configuration files. The name supposedly came from "et cetera" (everything else), but it's now thought of as "Editable Text Configuration."

```bash
ls /etc
# apt/  bash.bashrc  hostname  hosts  passwd  ssh/  ...
```

Important files in /etc:

| File | Purpose |
|------|---------|
| `/etc/passwd` | User account information |
| `/etc/hosts` | Local DNS mappings |
| `/etc/hostname` | System's hostname |
| `/etc/apt/` | APT package manager config |
| `/etc/ssh/` | SSH server configuration |

Rule of thumb: If you need to configure something system-wide, look in `/etc`.

### /var - Variable Data

The **var directory** (`/var`) contains files that change frequently during system operation:

```bash
ls /var
# cache/  lib/  log/  mail/  spool/  tmp/  ...
```

Most importantly:

- `/var/log/` - System log files (check here when debugging!)
- `/var/cache/` - Application cache data
- `/var/www/` - Web server files (on web servers)

```bash
# View recent system logs
ls /var/log/
sudo tail /var/log/syslog
```

### /tmp - Temporary Files

The **tmp directory** (`/tmp`) is for temporary files. Key characteristics:

- Anyone can write here
- Files may be deleted on reboot
- Good for scratch space

```bash
# Create a temp file
echo "test" > /tmp/mytest.txt

# It's there...
cat /tmp/mytest.txt

# But might be gone after reboot!
```

### /usr - User Programs

The **usr directory** (`/usr`) contains user-installed programs, libraries, and documentation. Despite the name, "usr" doesn't mean "user"—it historically meant "Unix System Resources."

```bash
ls /usr
# bin/  include/  lib/  local/  share/  ...
```

Key subdirectories:

- `/usr/bin/` - Most user commands
- `/usr/lib/` - Libraries
- `/usr/share/` - Shared data (docs, icons, etc.)
- `/usr/local/` - Locally compiled/installed software

### /opt - Optional Software

The **opt directory** (`/opt`) is for optional, third-party software packages. When you install something that doesn't come from your distribution's package manager, it often goes here:

```bash
ls /opt
# google/  zoom/  discord/  ...
```

### /dev - Device Files

The **dev directory** (`/dev`) contains device files—remember "everything is a file"? Here's where your hardware lives as files:

```bash
ls /dev
# disk/  null  random  sda  tty  urandom  zero  ...
```

Interesting devices:

| Device | What It Is |
|--------|------------|
| `/dev/null` | The "black hole"—discards anything written to it |
| `/dev/zero` | Produces infinite zeros |
| `/dev/random` | Random number generator |
| `/dev/sda` | First storage device |
| `/dev/tty` | Current terminal |

```bash
# Send output to nowhere
echo "This disappears" > /dev/null

# Generate random data
head -c 10 /dev/random | xxd
```

### /proc - Process Information

The **proc directory** (`/proc`) is a virtual filesystem that provides information about running processes and the kernel:

```bash
ls /proc
# 1/  2/  3/  cpuinfo  meminfo  version  ...
```

The numbered directories are process IDs. The files provide system info:

```bash
# CPU information
cat /proc/cpuinfo

# Memory information
cat /proc/meminfo

# Kernel version
cat /proc/version

# Currently running processes (each number is a PID)
ls /proc | grep -E '^[0-9]+$' | head
```

!!! tip "/proc is Virtual"
    The files in `/proc` don't actually exist on disk—they're generated on-the-fly by the kernel when you read them. It's like a window into the system's soul!

#### Diagram: Linux Directory Structure

<details markdown="1">
<summary>Linux File System Hierarchy</summary>
Type: diagram

Bloom Taxonomy: Remember, Understand
Learning Objective: Provide a visual map of the Linux file system hierarchy that students can reference when navigating.

Components to show:
- Tree structure starting from / (root)
- Major directories with icons representing their purpose
- Brief description of each directory's role

Layout: Hierarchical tree diagram

Directories to show (with icons):
- / (root) - House foundation icon
  - /bin - Toolbox icon "Essential commands"
  - /etc - Gear/settings icon "System configuration"
  - /home - House icon "User home directories"
    - /home/dan - Person icon
    - /home/alice - Person icon
  - /var - Stack of papers icon "Variable/changing data"
    - /var/log - Scroll icon "Log files"
  - /tmp - Trash/temp icon "Temporary files"
  - /usr - Library icon "User programs"
    - /usr/bin - Toolbox icon
    - /usr/lib - Books icon
    - /usr/local - Pin icon "Locally installed"
  - /opt - Package icon "Optional software"
  - /dev - USB/hardware icon "Device files"
  - /proc - CPU icon "Process info (virtual)"

Color coding:
- System critical: Red
- Configuration: Orange
- User data: Green
- Variable data: Blue
- Virtual: Purple dashed

Interactive features:
- Hover for expanded description
- Click to see example contents
- Quiz mode: "Where would you find log files?"

Implementation: p5.js or vis-network
</details>

## Quick Directory Reference

Here's a cheat sheet for the major directories:

| Directory | Contents | Remember It As |
|-----------|----------|----------------|
| `/` | Root of everything | "The trunk of the tree" |
| `/bin` | Essential commands | "Binary essentials" |
| `/etc` | Configuration files | "Settings central" |
| `/home` | User directories | "Your personal space" |
| `/var` | Changing data, logs | "Variables and logs" |
| `/tmp` | Temporary files | "Scratch paper" |
| `/usr` | User programs | "Program library" |
| `/opt` | Optional software | "Third-party apps" |
| `/dev` | Device files | "Hardware as files" |
| `/proc` | Process info | "System's pulse" |

## The Tree Command: Visualize the Structure

The **tree command** displays directories in a tree format—much easier to read than multiple `ls` commands:

```bash
tree
# .
# ├── Documents
# │   ├── report.txt
# │   └── notes.md
# ├── Downloads
# │   └── file.zip
# └── Pictures
#     ├── photo1.jpg
#     └── photo2.jpg
```

Useful tree options:

```bash
# Limit depth
tree -L 2           # Only 2 levels deep

# Show hidden files
tree -a

# Show only directories
tree -d

# Include file sizes
tree -h             # Human-readable sizes

# Show full path
tree -f

# Colorize output
tree -C
```

!!! note "Installing Tree"
    Tree might not be installed by default. Install it with:
    ```bash
    sudo apt install tree     # Debian/Ubuntu
    brew install tree         # macOS
    ```

## The File Command: What Kind of File Is This?

The **file command** tells you what type of file something is, regardless of its extension:

```bash
file report.txt
# report.txt: ASCII text

file photo.jpg
# photo.jpg: JPEG image data

file program
# program: ELF 64-bit executable

file /bin/ls
# /bin/ls: ELF 64-bit LSB pie executable, x86-64
```

This is super useful because:
- Linux doesn't rely on file extensions
- You can identify unknown files
- You can verify files are what they claim to be

```bash
# Someone sent you "document.pdf" but it won't open?
file document.pdf
# document.pdf: ASCII text
# It's actually a text file with wrong extension!
```

## The Stat Command: File Statistics

The **stat command** shows detailed statistics about a file:

```bash
stat report.txt
```

Output includes:

- File size
- Block size and count
- Device info
- Inode number
- Access, modification, and change times
- Permissions in multiple formats

```
  File: report.txt
  Size: 4096        Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d  Inode: 1234567     Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/dan)   Gid: ( 1000/dan)
Access: 2025-12-06 14:30:00.000000000 -0800
Modify: 2025-12-06 14:25:00.000000000 -0800
Change: 2025-12-06 14:25:00.000000000 -0800
 Birth: 2025-12-06 10:00:00.000000000 -0800
```

Three important timestamps:

| Time | Meaning | Updated When |
|------|---------|--------------|
| Access (atime) | Last read | File was read |
| Modify (mtime) | Last content change | File contents changed |
| Change (ctime) | Last metadata change | Permissions, owner, etc. changed |

## Pathnames: Putting It All Together

**Pathnames** are the full address of a file in the file system. Everything we've learned comes together here:

```bash
# Absolute pathnames
/home/dan/Documents/report.txt
/etc/ssh/sshd_config
/var/log/syslog

# Relative pathnames (depends on current directory)
Documents/report.txt
../alice/photos/vacation.jpg
./script.sh

# Home-relative pathnames
~/Documents/report.txt
~alice/photos/vacation.jpg
```

Tips for working with pathnames:

- Use Tab completion! (Press Tab to auto-complete paths)
- Use quotes for paths with spaces: `"My Documents/file.txt"`
- Use wildcards: `ls *.txt` matches all .txt files
- Escape spaces with backslash: `My\ Documents/file.txt`

## Opening Files: The open Command

Want to open a file with its default application from the command line?

### macOS: The open Command

On macOS, the **macOS open command** opens files with their default application:

```bash
open report.pdf       # Opens in Preview
open photo.jpg        # Opens in Photos
open .                # Opens current directory in Finder
open -a Safari url    # Open with specific app
```

### Linux: xdg-open and Aliases

On Linux, use `xdg-open`:

```bash
xdg-open report.pdf   # Opens with default PDF viewer
xdg-open photo.jpg    # Opens with default image viewer
xdg-open .            # Opens file manager
```

Since `xdg-open` is harder to type, many people create an **open alias on Linux**:

```bash
# Add to your ~/.bashrc
alias open='xdg-open'

# Now you can use:
open file.pdf
```

Other options depending on your desktop environment:

```bash
# GNOME
gio open file.pdf

# KDE
kde-open file.pdf

# Generic (with alias)
alias open='xdg-open 2>/dev/null'
```

## Practical Navigation Exercises

Let's practice! Try these in your terminal:

### Exercise 1: Where Am I?

```bash
# Print your current directory
pwd

# Go home
cd

# Verify you're home
pwd

# What's in your home directory?
ls -la
```

### Exercise 2: Explore the System

```bash
# Go to root
cd /

# List top-level directories
ls

# Explore /etc
cd /etc
ls | head -20

# Look at a config file
cat hostname

# Go back home
cd ~
```

### Exercise 3: Path Practice

```bash
# Create a test structure
mkdir -p ~/test/level1/level2/level3
cd ~/test/level1/level2/level3

# Where are you? (absolute path)
pwd

# Go up two levels
cd ../..
pwd

# Go back down using relative path
cd level2/level3
pwd

# Go home with ~
cd ~

# Clean up
rm -r ~/test
```

### Exercise 4: Hidden Files Hunt

```bash
# Go home
cd ~

# List visible files
ls

# List ALL files (including hidden)
ls -la

# Count your dot files
ls -a | grep '^\.' | wc -l

# Look at your .bashrc
cat ~/.bashrc | head -20
```

#### Diagram: File System Navigation MicroSim

<details markdown="1">
<summary>Interactive File System Navigator</summary>
Type: microsim

Bloom Taxonomy: Apply, Analyze
Learning Objective: Let students practice navigating the file system with cd, ls, and pwd in a safe simulated environment.

Canvas layout (responsive, ~750px max width):
- Top area (100px): Current path display (like a breadcrumb)
- Middle area (350px): Visual file system tree
- Bottom area (150px): Terminal input and output

Visual elements:
- Tree visualization of a simulated file system
- Current directory highlighted
- Clickable directories in the tree
- Terminal-style command input
- Output display

Simulated file system:
- /
  - home/
    - student/
      - Documents/
        - report.txt
        - notes.md
      - Downloads/
        - image.png
      - .bashrc (hidden)
      - .config/ (hidden)
  - etc/
    - hosts
    - hostname
  - var/
    - log/
  - tmp/

Interactive elements:
- Type commands: cd, ls, pwd, ls -a, ls -l
- Click directories in tree to navigate (auto-generates cd command)
- "pwd" updates the breadcrumb display
- Tab completion simulation

Challenges (optional):
1. "Navigate to your Documents folder"
2. "List hidden files in your home directory"
3. "Go to /var/log and back home in one command"
4. "What's the absolute path of report.txt?"

Behavior:
- Commands execute and update visualization
- Invalid commands show helpful errors
- Tree view highlights current location
- Success animations for completed challenges

Implementation: p5.js
</details>

## Key Takeaways

You've learned how to navigate the Linux file system like a pro! Here's what to remember:

- **Everything is a file** in Linux—even devices and processes
- The **root directory** (`/`) is the top of the file system tree
- Your **home directory** (`~`) is your personal space
- Use **pwd** to see where you are, **cd** to move around
- **Absolute paths** start with `/`, **relative paths** don't
- **Hidden files** start with a dot (`.`)
- Use **ls -la** to see everything including hidden files
- Key directories: `/bin` (commands), `/etc` (config), `/home` (users), `/var` (logs)
- **tree** shows directory structure visually
- **file** tells you what type of file something is
- **stat** shows detailed file information

!!! success "You Can Navigate!"
    You now have a mental map of the Linux file system. You know where system files live, where your files go, and how to get anywhere using paths. This knowledge will serve you in every future chapter!

## What's Next?

Now that you can navigate the file system, it's time to learn how to actually DO things with files! In the next chapter, you'll master:

- Creating files and directories
- Copying, moving, and renaming files
- Deleting files (carefully!)
- Working with file content

Time to stop just looking at files and start manipulating them!

---

??? question "Quick Quiz: File System Fundamentals"
    1. What character represents the root directory?
    2. What command shows your current directory?
    3. How do you go to your home directory from anywhere?
    4. What's the difference between `/etc` and `/tmp`?
    5. How do you list hidden files?

??? note "Quiz Answers"
    1. `/` (forward slash)
    2. `pwd` (print working directory)
    3. `cd ~` or just `cd` with no arguments
    4. `/etc` contains configuration files; `/tmp` contains temporary files that may be deleted on reboot
    5. `ls -a` (the -a flag shows all files including hidden)
