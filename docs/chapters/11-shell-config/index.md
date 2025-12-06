---
title: Shell Configuration and Environment
description: Customize your shell environment with dotfiles, environment variables, aliases, and functions
generated_by: claude skill chapter-content-generator
date: 2025-12-06
version: 0.03
---

# Shell Configuration and Environment

## Summary

This chapter teaches you to customize your shell environment for productivity. You'll learn about dotfiles (.bashrc, .zshrc), environment variables like PATH and HOME, creating aliases and shell functions, and understanding how shells load configuration files at startup. A well-configured shell can dramatically improve your daily workflow.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

1. Shell Configuration
2. Bashrc File
3. Bash Profile
4. Zshrc File
5. Profile File
6. Environment Variables
7. PATH Variable
8. HOME Variable
9. USER Variable
10. SHELL Variable
11. Export Command
12. Source Command
13. Alias Command
14. Creating Aliases
15. Removing Aliases
16. Shell Functions
17. Shell Startup Order

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Getting Started with the Terminal](../02-terminal-basics/index.md)
- [Chapter 4: File System Fundamentals](../04-file-system/index.md)
- [Chapter 10: Text Editors: Nano and Vim](../10-text-editors/index.md)

---

## Your Prompt Tells Your Story

I help a lot of students learning AI. When they share their screen, I can quickly tell how good their UNIX chops are just by looking at their prompts.

If their prompts are the default prompts—long prompts with the full computer name like `FredsMacBookPro.hsd1.mn.comcast.net`—I know they might be rookies. That prompt is long and not full of useful information. It's like wearing a name tag that says "Hi, I'm new here!"

But when I see someone with a clean, customized prompt? Maybe with their current git branch showing? Or fun emoji? I know they've taken the time to make their shell their own. They've got skills.

This chapter is about joining that second group. We're going to transform your boring default terminal into a personalized command center that screams "I know what I'm doing!"

## Shell Configuration: Making the Shell Your Own

**Shell configuration** is the art of customizing how your shell looks and behaves. Every time you open a terminal, your shell reads special configuration files (called "dotfiles" because they start with a dot) that tell it:

- What your prompt should look like
- What shortcuts (aliases) you've created
- What environment variables to set
- What custom functions to load

Think of it like decorating your room—except your room is the terminal, and the decorations make you more productive!

## The Dotfiles: Your Shell's Settings Files

Different shells use different configuration files. Let's break down the important ones.

### The Bashrc File

The **bashrc file** (`~/.bashrc`) is the main configuration file for Bash. It runs every time you open a new terminal window (for interactive, non-login shells).

```sh
# View your bashrc
cat ~/.bashrc

# Edit your bashrc
nano ~/.bashrc
# or
vim ~/.bashrc
```

What goes in `.bashrc`:

- Aliases
- Shell functions
- Prompt customization (PS1)
- Shell options
- Custom PATH additions

```sh
# Example ~/.bashrc content
# Set a custom prompt
PS1='\u@\h:\w\$ '

# Add color to ls
alias ls='ls --color=auto'

# Custom aliases
alias ll='ls -la'
alias ..='cd ..'

# Add a directory to PATH
export PATH="$HOME/bin:$PATH"
```

### The Bash Profile

The **bash profile** (`~/.bash_profile` or `~/.profile`) runs once when you log in (for login shells). It's typically used for:

- Setting environment variables
- Running commands that should only happen once per session
- Starting programs at login

```sh
# Example ~/.bash_profile
# Set environment variables
export EDITOR=vim
export VISUAL=vim

# Load .bashrc if it exists (common pattern)
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi
```

!!! tip "The Login vs Non-Login Shell Confusion"
    This trips up everyone! Here's the simple version:

    - **Login shell**: When you first log in (SSH, console login). Reads `.bash_profile`
    - **Non-login shell**: When you open a new terminal window. Reads `.bashrc`

    The common fix? Put everything in `.bashrc` and have `.bash_profile` source it!

### The Zshrc File

The **zshrc file** (`~/.zshrc`) is the equivalent of `.bashrc` but for Zsh (the default shell on modern macOS). If you're using Zsh, this is your main config file.

```sh
# Example ~/.zshrc
# Enable colors
autoload -U colors && colors

# Set prompt
PROMPT='%F{green}%n@%m%f:%F{blue}%~%f$ '

# Aliases work the same as bash
alias ll='ls -la'
alias grep='grep --color=auto'

# Zsh-specific: better tab completion
autoload -Uz compinit && compinit
```

Zsh has some advantages over Bash:

- Better tab completion out of the box
- More customization options
- Frameworks like Oh My Zsh make it even better
- Cooler prompt themes

### The Profile File

The **profile file** (`~/.profile`) is a more generic login configuration file that works across different shells. It's read by Bash (if no `.bash_profile` exists), Sh, and some other shells.

```sh
# ~/.profile - Generic shell profile
# This file is read by login shells

# Set default editor
export EDITOR=vim

# Add local bin to PATH
if [ -d "$HOME/bin" ]; then
    PATH="$HOME/bin:$PATH"
fi
```

### Configuration Files Summary

| File | Shell | When Loaded | Use For |
|------|-------|-------------|---------|
| `~/.bashrc` | Bash | Every new terminal | Aliases, functions, prompt |
| `~/.bash_profile` | Bash | Login only | Environment vars, one-time setup |
| `~/.zshrc` | Zsh | Every new terminal | All Zsh configuration |
| `~/.profile` | Various | Login only | Cross-shell environment vars |

## Environment Variables: The Shell's Memory

**Environment variables** are named values that the shell (and programs) can access. They're like global variables for your entire session.

```sh
# View all environment variables
env

# View a specific variable
echo $HOME
echo $USER

# Set a variable (only for current session)
MY_VAR="Hello"
echo $MY_VAR
```

### The PATH Variable

The **PATH variable** is THE most important environment variable. It tells the shell where to look for executable programs.

```sh
# View your PATH
echo $PATH
# /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

# PATH is a colon-separated list of directories
# When you type "ls", the shell searches these directories in order
```

To add a directory to PATH:

```sh
# Add a directory to the beginning (searched first)
export PATH="$HOME/bin:$PATH"

# Add a directory to the end (searched last)
export PATH="$PATH:/opt/myprogram/bin"

# Make it permanent by adding to ~/.bashrc or ~/.zshrc
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
```

!!! warning "Don't Break Your PATH!"
    Always include `$PATH` when modifying PATH. If you do `export PATH="/my/dir"` without `$PATH`, you'll lose access to basic commands like `ls`! If this happens, you can fix it by typing the full path: `/bin/ls` or opening a new terminal.

### The HOME Variable

The **HOME variable** contains the path to your home directory. It's set automatically when you log in.

```sh
echo $HOME
# /home/username (Linux) or /Users/username (macOS)

# The tilde ~ is a shortcut for $HOME
cd ~
cd $HOME
# Both do the same thing!

# Using HOME in scripts
CONFIG_FILE="$HOME/.config/myapp/settings.conf"
```

### The USER Variable

The **USER variable** contains your username.

```sh
echo $USER
# username

# Useful in scripts
echo "Hello, $USER!"

# Or in paths
DOWNLOADS="/home/$USER/Downloads"
```

### The SHELL Variable

The **SHELL variable** tells you which shell is your default login shell.

```sh
echo $SHELL
# /bin/bash or /bin/zsh or /usr/bin/fish

# Note: This shows your DEFAULT shell, not necessarily the current shell
# To see the current shell:
echo $0
```

### Other Useful Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `$PWD` | Current directory | `/home/user/projects` |
| `$OLDPWD` | Previous directory | `/home/user` |
| `$EDITOR` | Default text editor | `vim` |
| `$LANG` | Language/locale | `en_US.UTF-8` |
| `$TERM` | Terminal type | `xterm-256color` |
| `$PS1` | Primary prompt | `\u@\h:\w\$` |

## The Export Command: Sharing Variables

The **export command** makes a variable available to child processes (programs you run from the shell).

```sh
# Without export - variable is local to this shell
MY_VAR="Hello"
bash -c 'echo $MY_VAR'  # Prints nothing!

# With export - variable is available to child processes
export MY_VAR="Hello"
bash -c 'echo $MY_VAR'  # Prints "Hello"
```

When to use export:

```sh
# Environment variables that programs need - USE EXPORT
export EDITOR=vim
export PATH="$HOME/bin:$PATH"
export JAVA_HOME="/usr/lib/jvm/java-11"

# Variables only for shell scripts - NO EXPORT NEEDED
count=0
filename="data.txt"
```

## The Source Command: Reload Configuration

The **source command** (or its shorthand `.`) reads and executes a file in the current shell. This is how you apply changes to your configuration without opening a new terminal!

```sh
# After editing ~/.bashrc, apply changes:
source ~/.bashrc
# or
. ~/.bashrc

# Both do the same thing!
```

Why does this matter?

```sh
# You add an alias to ~/.bashrc
echo "alias projects='cd ~/projects'" >> ~/.bashrc

# The alias doesn't work yet!
projects
# bash: projects: command not found

# Source the file to load the new alias
source ~/.bashrc

# Now it works!
projects
# Changed to ~/projects
```

!!! note "Source vs Execute"
    - `source script.sh` - Runs in the CURRENT shell (changes persist)
    - `./script.sh` - Runs in a NEW shell (changes don't affect current shell)

    That's why you `source ~/.bashrc` instead of running it!

## Aliases: Shortcuts for Commands

The **alias command** creates shortcuts for longer commands. This is one of the most useful customizations you can make!

### Creating Aliases

**Creating aliases** is simple:

```sh
# Syntax: alias name='command'
alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'

# Now ll, la, and l are shortcuts!
ll
# Same as: ls -la
```

Popular alias ideas:

```sh
# Navigation
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias ~='cd ~'
alias projects='cd ~/projects'

# Safety nets (ask before overwriting)
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

# Colorful output
alias ls='ls --color=auto'
alias grep='grep --color=auto'
alias diff='diff --color=auto'

# Git shortcuts
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git log --oneline'

# Quick edits
alias bashrc='$EDITOR ~/.bashrc'
alias zshrc='$EDITOR ~/.zshrc'

# System
alias update='sudo apt update && sudo apt upgrade'  # Debian/Ubuntu
alias ports='netstat -tulanp'

# Fun
alias please='sudo'
alias fucking='sudo'  # When you're frustrated
```

### Viewing and Removing Aliases

```sh
# View all aliases
alias

# View a specific alias
alias ll

# Remove an alias for current session
unalias ll

# To permanently remove, delete it from ~/.bashrc or ~/.zshrc
```

### Removing Aliases

**Removing aliases** is done with `unalias`:

```sh
# Remove a single alias
unalias ll

# Remove all aliases
unalias -a

# Temporarily bypass an alias (use the original command)
\ls        # Runs real ls, not aliased version
command ls # Also runs real ls
```

!!! tip "Alias Best Practices"
    1. Don't override important commands dangerously (like `alias rm='rm -rf'`)
    2. Use the alias to ADD safety (like `alias rm='rm -i'`)
    3. Keep aliases in a separate file (`~/.bash_aliases`) for organization
    4. Document complex aliases with comments

## Shell Functions: Aliases on Steroids

**Shell functions** are like aliases but WAY more powerful. They can accept arguments, have multiple commands, and include logic!

```sh
# Basic function
greet() {
    echo "Hello, $1!"
}
greet World
# Hello, World!

# Function with multiple commands
mkcd() {
    mkdir -p "$1" && cd "$1"
}
mkcd new_project
# Creates directory AND changes into it!

# Function with logic
extract() {
    if [ -f "$1" ]; then
        case "$1" in
            *.tar.bz2)   tar xjf "$1"   ;;
            *.tar.gz)    tar xzf "$1"   ;;
            *.tar)       tar xf "$1"    ;;
            *.zip)       unzip "$1"     ;;
            *.gz)        gunzip "$1"    ;;
            *.rar)       unrar x "$1"   ;;
            *)           echo "Unknown format: $1" ;;
        esac
    else
        echo "File not found: $1"
    fi
}
# Now: extract file.tar.gz  (auto-detects format!)
```

### More Useful Functions

```sh
# Quick backup
backup() {
    cp "$1" "$1.backup.$(date +%Y%m%d)"
}
# backup important.txt → important.txt.backup.20241206

# Find and replace in files
replace() {
    grep -rl "$1" . | xargs sed -i "s/$1/$2/g"
}
# replace oldtext newtext

# Create and enter a temp directory
tmpd() {
    cd "$(mktemp -d)"
    pwd
}

# Weather in terminal
weather() {
    curl "wttr.in/${1:-}"
}
# weather Paris
```

### Alias vs Function: When to Use Which

| Feature | Alias | Function |
|---------|-------|----------|
| Arguments | No (sort of) | Yes |
| Multiple commands | No | Yes |
| Logic (if/case) | No | Yes |
| Simple shortcuts | Perfect | Overkill |
| Complex operations | Can't do | Perfect |

Rule of thumb: If you just need a shortcut, use an alias. If you need arguments or logic, use a function.

## Shell Startup Order: What Loads When

Understanding **shell startup order** helps you know where to put your configurations.

### Bash Startup Order

For a **login shell** (SSH, first terminal after login):

1. `/etc/profile` (system-wide)
2. First found of: `~/.bash_profile`, `~/.bash_login`, or `~/.profile`

For a **non-login interactive shell** (new terminal window):

1. `/etc/bash.bashrc` (system-wide, if exists)
2. `~/.bashrc`

### Zsh Startup Order

1. `/etc/zshenv` then `~/.zshenv` (always)
2. `/etc/zprofile` then `~/.zprofile` (login shells)
3. `/etc/zshrc` then `~/.zshrc` (interactive shells)
4. `/etc/zlogin` then `~/.zlogin` (login shells)

#### Diagram: Shell Configuration Loading Order

<details markdown="1">
<summary>When Do Config Files Load?</summary>
Type: diagram

Bloom Taxonomy: Understand
Learning Objective: Visualize the order in which shell configuration files are loaded for different types of shells.

Layout: Flowchart with two paths (login vs non-login)

Visual elements:
- Start node: "Shell starts"
- Decision diamond: "Login shell?"
- Two parallel paths showing file loading order
- File boxes with names and purposes

Login shell path:
1. /etc/profile (system-wide environment)
2. ~/.bash_profile OR ~/.bash_login OR ~/.profile
3. (Often sources ~/.bashrc)

Non-login shell path:
1. /etc/bash.bashrc (if exists)
2. ~/.bashrc

Each box shows:
- Filename
- What it's typically used for
- Whether it's system-wide or user-specific

Color scheme:
- System files: Blue
- User files: Green
- Decision points: Yellow
- Flow arrows: Gray

Implementation: p5.js
</details>

### Practical Advice

Most people do this:

1. Put EVERYTHING in `~/.bashrc` (or `~/.zshrc`)
2. Have `~/.bash_profile` just source `~/.bashrc`

```sh
# ~/.bash_profile - Keep it simple!
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi
```

This way, your configuration works the same whether it's a login shell or not!

## Customizing Your Prompt

Your prompt is the text that appears before your cursor. The default is often boring and too long. Let's fix that!

### Prompt Variables

In Bash, the prompt is controlled by `PS1`:

```sh
# View current prompt
echo $PS1

# Simple prompt (just $)
PS1='$ '

# Username and current directory
PS1='\u:\w$ '
# dan:~/projects$
```

### Bash Prompt Escape Sequences

| Code | Meaning |
|------|---------|
| `\u` | Username |
| `\h` | Hostname (short) |
| `\H` | Hostname (full) |
| `\w` | Current directory (full path) |
| `\W` | Current directory (basename only) |
| `\d` | Date |
| `\t` | Time (24-hour) |
| `\T` | Time (12-hour) |
| `\n` | Newline |
| `\$` | $ for normal user, # for root |

### Adding Colors

Colors make your prompt POP!

```sh
# Color codes (wrap in \[ \] to not break line length)
# Format: \[\e[COLORm\]text\[\e[0m\]

# Red username, blue directory
PS1='\[\e[31m\]\u\[\e[0m\]:\[\e[34m\]\w\[\e[0m\]\$ '

# Green user@host, yellow directory
PS1='\[\e[32m\]\u@\h\[\e[0m\]:\[\e[33m\]\w\[\e[0m\]\$ '
```

Common color codes:

| Code | Color |
|------|-------|
| 30 | Black |
| 31 | Red |
| 32 | Green |
| 33 | Yellow |
| 34 | Blue |
| 35 | Magenta |
| 36 | Cyan |
| 37 | White |
| 1 | Bold |
| 0 | Reset |

## Adding Emoji to Your Prompt

Here's where the fun really begins! Adding emoji to your prompt is a great way to personalize your terminal and show off your customization skills.

```sh
# Simple emoji prompt
PS1='🚀 \w $ '
# 🚀 ~/projects $

# Emoji with colors
PS1='🐧 \[\e[32m\]\u\[\e[0m\]:\[\e[34m\]\w\[\e[0m\] $ '
# 🐧 dan:~/projects $

# Different emoji for different moods
PS1='☕ \W $ '    # Coffee time coding
PS1='🔥 \W $ '    # On fire!
PS1='🎯 \W $ '    # Focused mode
PS1='💻 \W $ '    # Classic coder
PS1='🦊 \W $ '    # Firefox fan
PS1='🐍 \W $ '    # Python developer
PS1='⚡ \W $ '    # Speed demon
```

### Dynamic Emoji Based on Status

Want to get fancy? Show different emoji based on the last command's success or failure:

```sh
# Green checkmark for success, red X for failure
PS1='$(if [ $? -eq 0 ]; then echo "✅"; else echo "❌"; fi) \w $ '

# Happy/sad face based on exit status
PS1='$(if [ $? -eq 0 ]; then echo "😊"; else echo "😢"; fi) \w $ '
```

### Emoji Ideas for Your Prompt

| Emoji | Meaning |
|-------|---------|
| 🚀 | Ready to launch |
| 💻 | Coding mode |
| 🐧 | Linux pride |
| 🍎 | macOS user |
| ☕ | Caffeine-powered |
| 🔥 | On fire |
| ⚡ | Fast and furious |
| 🎯 | Focused |
| 🌙 | Late night coding |
| 🌈 | After the storm |
| 🦄 | Magical code |
| 🐛 | Debugging |
| ✅/❌ | Last command status |

### Zsh Prompt with Emoji

Zsh makes it even easier:

```sh
# In ~/.zshrc
PROMPT='🚀 %F{green}%n%f:%F{blue}%~%f $ '

# With git branch (if using Oh My Zsh)
PROMPT='🐙 %F{cyan}%~%f $(git_prompt_info) $ '
```

!!! tip "Emoji Compatibility"
    Make sure your terminal supports Unicode/emoji. Most modern terminals do (iTerm2, Windows Terminal, GNOME Terminal, etc.). If emoji appear as boxes, try a different terminal or font (Nerd Fonts are great!).

### Creative AND Professional: Finding the Balance

Here's something to keep in mind: your terminal screenshots will be shared. With coworkers. In Slack. In documentation. In presentations. Maybe even in job interviews when you're showing off a project.

So while a prompt with 🔥💯🚀✨ might be fun on your personal laptop, consider what message it sends in a professional context. The sweet spot? **Creative enough to show personality, informative enough to be useful.**

#### What Makes a Great Professional Prompt?

A well-designed prompt should answer these questions at a glance:

1. **Who am I?** (username—especially important on shared servers)
2. **Where am I?** (current directory)
3. **What's the context?** (git branch, virtual environment, etc.)
4. **Did something go wrong?** (exit status indicator)

```sh
# Good: Informative with a touch of personality
PS1='🐧 \[\e[32m\]\u\[\e[0m\]:\[\e[34m\]\W\[\e[0m\] $(git branch 2>/dev/null | grep "*" | cut -d" " -f2) $ '
# 🐧 dan:project main $

# Also good: Clean and professional
PS1='\[\e[36m\]\u@\h\[\e[0m\]:\[\e[33m\]\w\[\e[0m\]\$ '
# dan@server:~/projects$

# Maybe reconsider: Fun but not informative
PS1='🔥💯 $ '
# 🔥💯 $  (Where am I? What branch? Who knows!)
```

#### Screenshot-Ready Prompts

When you share your screen or take screenshots:

- **Short paths are readable**: Use `\W` (current dir only) instead of `\w` (full path) to avoid super long prompts
- **One emoji is enough**: A single 🚀 or 🐧 adds personality without looking silly
- **Git branch is gold**: Showing your branch tells the story of what you're working on
- **Colors help scanning**: They make screenshots easier to read at a glance

```sh
# Screenshot-friendly: Shows who, where, and what branch
PS1='🚀 \[\e[32m\]\u\[\e[0m\]:\[\e[34m\]\W\[\e[0m\] \[\e[35m\]$(git branch 2>/dev/null | grep -o "[^ ]*$")\[\e[0m\] $ '
# 🚀 dan:myproject feature-auth $
```

#### The "Explain This Screenshot" Test

Before finalizing your prompt, imagine sending a screenshot to a coworker and ask:

- Can they tell what directory you're in?
- Can they tell what git branch you're on?
- Does it look professional enough for documentation?
- Does it still show a bit of your personality?

If the answer is yes to all four, you've nailed it!

!!! note "Your Prompt Is Your Brand"
    Think of your prompt like your email signature or your GitHub profile. It's a small thing, but it says something about you. A thoughtful, informative prompt says "I care about my craft." A completely default prompt says "I haven't customized anything." And a prompt that's ALL emoji says... well, maybe save that one for your personal machine.

#### MicroSim: Prompt Customizer

<details markdown="1">
<summary>Build Your Own Prompt</summary>
Type: microsim

Bloom Taxonomy: Apply, Create
Learning Objective: Allow students to interactively build and preview custom shell prompts with colors and emoji.

Canvas layout (responsive, ~750px max width):
- Top section (150px): Live prompt preview with sample commands
- Middle section (250px): Component selector and options
- Bottom section (100px): Generated PS1 code to copy

Visual elements:
- Preview terminal: Dark background with realistic prompt display
- Component checkboxes: username, hostname, directory, time, git branch
- Color pickers: for each component
- Emoji selector: grid of common prompt emoji
- Code output: copyable PS1 string

Interactive controls:
- Checkboxes to include/exclude components
- Color dropdowns for each component
- Emoji picker (click to add to prompt)
- Order drag-and-drop

Behavior:
- Real-time preview updates as options change
- Shows both Bash (PS1) and Zsh (PROMPT) syntax
- Copy button for the generated code
- Reset button to start over

Sample prompts to try:
1. Minimal: "$ "
2. Classic: "\u@\h:\w$ "
3. Colorful: colored username, directory
4. Fun: emoji + short path
5. Pro: emoji + git branch + colors

Color options:
- Red, Green, Yellow, Blue, Magenta, Cyan, White
- Bold variants

Implementation: p5.js
</details>

## Putting It All Together: A Complete Configuration

Here's a practical, well-commented `.bashrc` you can use as a starting point:

```sh
# ~/.bashrc - Bash configuration file
# Reload with: source ~/.bashrc

# ============================================
# ENVIRONMENT VARIABLES
# ============================================
export EDITOR=vim
export VISUAL=vim
export LANG=en_US.UTF-8

# Add local bin to PATH
export PATH="$HOME/bin:$HOME/.local/bin:$PATH"

# ============================================
# PROMPT
# ============================================
# Emoji prompt with colors!
# Green username, blue directory, rocket emoji
PS1='🚀 \[\e[32m\]\u\[\e[0m\]:\[\e[34m\]\W\[\e[0m\] $ '

# ============================================
# ALIASES
# ============================================
# Navigation
alias ..='cd ..'
alias ...='cd ../..'
alias ~='cd ~'

# List files
alias ls='ls --color=auto'
alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'

# Safety
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

# Git
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git log --oneline -10'

# Quick edits
alias bashrc='$EDITOR ~/.bashrc'
alias reload='source ~/.bashrc'

# ============================================
# FUNCTIONS
# ============================================
# Make directory and cd into it
mkcd() {
    mkdir -p "$1" && cd "$1"
}

# Quick backup
backup() {
    cp "$1" "$1.backup.$(date +%Y%m%d_%H%M%S)"
}

# Extract any archive
extract() {
    if [ -f "$1" ]; then
        case "$1" in
            *.tar.bz2)   tar xjf "$1"   ;;
            *.tar.gz)    tar xzf "$1"   ;;
            *.tar)       tar xf "$1"    ;;
            *.zip)       unzip "$1"     ;;
            *.gz)        gunzip "$1"    ;;
            *)           echo "Unknown: $1" ;;
        esac
    else
        echo "Not found: $1"
    fi
}

# ============================================
# SHELL OPTIONS
# ============================================
# Append to history instead of overwriting
shopt -s histappend

# Better history
HISTSIZE=10000
HISTFILESIZE=20000
HISTCONTROL=ignoreboth  # Ignore duplicates and spaces

# Check window size after each command
shopt -s checkwinsize

echo "🎉 Bashrc loaded! Ready to rock!"
```

## Key Takeaways

You've learned to make the shell truly yours!

- **Dotfiles**: Configuration files like `.bashrc`, `.zshrc`, `.profile`
- **Environment variables**: PATH, HOME, USER, and custom variables
- **Export**: Make variables available to child processes
- **Source**: Reload configuration files without restarting
- **Aliases**: Shortcuts for common commands
- **Functions**: Powerful multi-command shortcuts with arguments
- **Prompt customization**: Colors, emoji, and useful information
- **Startup order**: Know which file loads when

!!! success "You're a Configuration Wizard!"
    Your terminal is no longer generic—it's YOURS. When you share your screen, people will see that rocket emoji and know: this person has skills. Welcome to the club!

## What's Next?

Now that your shell is customized and comfortable, it's time to write your own shell scripts! The next chapter dives into Bash scripting—automating tasks, writing loops, and building your own command-line tools.

---

??? question "Quick Quiz: Shell Configuration"
    1. What file is the main configuration file for Bash?
    2. What does the PATH variable contain?
    3. How do you apply changes to `.bashrc` without opening a new terminal?
    4. What's the difference between an alias and a function?
    5. What command makes a variable available to child processes?
    6. What does PS1 control?

??? note "Quiz Answers"
    1. `~/.bashrc`
    2. A colon-separated list of directories where the shell looks for executables
    3. `source ~/.bashrc` (or `. ~/.bashrc`)
    4. Aliases are simple text substitutions; functions can accept arguments and contain logic
    5. `export`
    6. The primary shell prompt (what appears before your cursor)
