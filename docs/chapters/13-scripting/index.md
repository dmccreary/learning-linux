---
title: Shell Scripting and Automation
description: Learn to write shell scripts and automate tasks with cron
generated_by: claude skill chapter-content-generator
date: 2025-12-06
version: 0.03
---

# Shell Scripting and Automation

## Summary

This chapter introduces shell scripting to automate repetitive tasks. You'll learn to write scripts with proper shebang lines, use variables and command-line arguments, handle exit codes, and schedule automated tasks with cron. Shell scripting is a foundational skill for system administration and DevOps.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Shell Scripts
2. Script Shebang
3. Script Permissions
4. Script Variables
5. Script Arguments
6. Script Exit Codes
7. Cron Daemon
8. Crontab Command
9. Cron Syntax
10. Cron Schedule Fields
11. Cron Examples
12. At Command
13. Batch Command
14. Systemd Timers
15. Anacron

## Prerequisites

This chapter builds on concepts from:

- [Chapter 7: File Permissions and Ownership](../07-permissions/index.md)
- [Chapter 11: Shell Configuration and Environment](../11-shell-config/index.md)
- [Chapter 12: Process Management and Job Control](../12-processes/index.md)

---

## Why Learn Shell Scripting?

Here's a scenario: You need to resize 500 images, rename them with a date prefix, and upload them to a server. You could do this manually (goodbye, weekend!) or you could write a script that does it in 30 seconds.

**Shell scripts** are the duct tape of computing—they hold everything together. They're how sysadmins automate server maintenance, how developers build deployment pipelines, and how power users save hours of repetitive work.

And here's the thing: **AI tools like Claude Code are VERY good at generating shell scripts.** But you still need to know what these scripts can and can't do! You need to understand:

- What the script is actually doing
- Whether it's safe to run
- How to modify it for your needs
- What could go wrong

This chapter gives you that foundation. Let's turn you into a scripting ninja!

## Shell Scripts: Your First Automation

A **shell script** is simply a text file containing a series of commands. Instead of typing commands one by one, you put them in a file and run them all at once.

```sh
# Create your first script
nano hello.sh
```

```sh
#!/bin/bash
# hello.sh - My first shell script

echo "Hello, World!"
echo "Today is $(date)"
echo "You are logged in as: $USER"
```

### Script Shebang: The Magic First Line

The **script shebang** (or hashbang) is that weird first line: `#!/bin/bash`. It tells the system which interpreter to use.

```sh
#!/bin/bash       # Use Bash
#!/bin/sh         # Use basic shell (more portable)
#!/usr/bin/env bash   # Find bash anywhere in PATH (most portable)
#!/usr/bin/env python3  # For Python scripts
#!/usr/bin/env node     # For Node.js scripts
```

Why "shebang"? It's a combination of "hash" (#) and "bang" (!). Some old-timers call it "sha-bang" or "pound-bang." Computing history is weird.

!!! tip "Always Use a Shebang"
    Without a shebang, the script runs with whatever shell invokes it. This can cause unexpected behavior. Always be explicit!

### Script Permissions: Making It Executable

Before you can run a script, you need to set **script permissions** to make it executable:

```sh
# View current permissions
ls -l hello.sh
# -rw-r--r-- 1 user user 123 Dec 6 10:00 hello.sh

# Make it executable
chmod +x hello.sh

# Check again
ls -l hello.sh
# -rwxr-xr-x 1 user user 123 Dec 6 10:00 hello.sh
```

Now you can run it:

```sh
# Run with ./
./hello.sh

# Or with explicit interpreter
bash hello.sh

# Or if it's in your PATH
hello.sh
```

The `./` is important! It tells the shell to look in the current directory. Without it, the shell searches your PATH and probably won't find your script.

## Script Variables: Storing Data

**Script variables** let you store and reuse values:

```sh
#!/bin/bash
# variables.sh - Working with variables

# Assign variables (NO SPACES around =)
name="Alice"
count=42
today=$(date +%Y-%m-%d)

# Use variables with $
echo "Hello, $name!"
echo "Count is: $count"
echo "Date: $today"

# Curly braces for clarity
echo "File: ${name}_report.txt"

# Arithmetic
result=$((count + 8))
echo "Result: $result"
```

Important variable rules:

- **No spaces** around the `=` sign
- Use `$variable` or `${variable}` to read the value
- Use quotes for strings with spaces: `message="Hello World"`
- Use `$(command)` to capture command output

### Special Variables

| Variable | Meaning |
|----------|---------|
| `$0` | Script name |
| `$1`, `$2`, ... | Positional arguments |
| `$#` | Number of arguments |
| `$@` | All arguments as separate words |
| `$*` | All arguments as one word |
| `$$` | Script's process ID |
| `$?` | Exit code of last command |

## Script Arguments: Input from Users

**Script arguments** let users pass data to your script:

```sh
#!/bin/bash
# greet.sh - Greeting script with arguments

# Check if argument provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <name>"
    exit 1
fi

name=$1
echo "Hello, $name! Welcome to Linux scripting!"
```

```sh
# Run it
./greet.sh Alice
# Hello, Alice! Welcome to Linux scripting!

./greet.sh
# Usage: ./greet.sh <name>
```

### Processing Multiple Arguments

```sh
#!/bin/bash
# args-demo.sh - Demonstrate argument handling

echo "Script name: $0"
echo "Number of arguments: $#"
echo "First argument: $1"
echo "Second argument: $2"
echo "All arguments: $@"

echo ""
echo "Looping through arguments:"
for arg in "$@"; do
    echo "  - $arg"
done
```

```sh
./args-demo.sh apple banana cherry
# Script name: ./args-demo.sh
# Number of arguments: 3
# First argument: apple
# Second argument: banana
# All arguments: apple banana cherry
#
# Looping through arguments:
#   - apple
#   - banana
#   - cherry
```

## Script Exit Codes: Success or Failure

**Script exit codes** tell the caller whether your script succeeded or failed. This is CRUCIAL for automation!

| Exit Code | Meaning |
|-----------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Misuse of command |
| 126 | Permission denied |
| 127 | Command not found |
| 128+N | Killed by signal N |

```sh
#!/bin/bash
# backup.sh - Backup script with proper exit codes

source_dir=$1
backup_dir=$2

# Validate arguments
if [ $# -ne 2 ]; then
    echo "Usage: $0 <source> <destination>"
    exit 1
fi

# Check source exists
if [ ! -d "$source_dir" ]; then
    echo "Error: Source directory not found: $source_dir"
    exit 2
fi

# Perform backup
cp -r "$source_dir" "$backup_dir"

# Check if cp succeeded
if [ $? -eq 0 ]; then
    echo "Backup successful!"
    exit 0
else
    echo "Backup failed!"
    exit 3
fi
```

```sh
# Check exit code after running
./backup.sh /home/user/docs /backup/docs
echo $?
# 0 (success)

./backup.sh /nonexistent /backup
echo $?
# 2 (source not found)
```

!!! note "Exit Codes in Pipelines"
    In a pipeline like `cmd1 | cmd2 | cmd3`, the exit code is from the LAST command. Use `set -o pipefail` to get the first failure's exit code instead.

## Real-World Scripting: Python Wrapper Scripts

One of the most common uses of shell scripts is as **wrappers for complex Python programs**. The shell script handles:

- Environment validation
- Path setup
- Argument preprocessing
- Error handling with user-friendly messages

While the Python code handles the actual logic.

### Why Use Shell Wrappers?

1. **Simpler invocation**: `bk-status` instead of `python3 /path/to/book-status.py`
2. **Environment validation**: Check that required variables are set
3. **Dependency checking**: Ensure Python, required tools are available
4. **Consistent error messages**: Color-coded, user-friendly output
5. **Portable**: Works the same on any system

### Anatomy of a Python Wrapper Script

Here's a pattern used in real production systems:

```sh
#!/bin/bash
# bk-status - Check status of book project
# This script wraps book-status.py and validates the environment

# Color definitions for pretty output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'  # No Color

# Helper functions
error() { echo -e "${RED}ERROR: $1${NC}" >&2; }
warning() { echo -e "${YELLOW}WARNING: $1${NC}" >&2; }
info() { echo -e "${BLUE}INFO: $1${NC}"; }
success() { echo -e "${GREEN}$1${NC}"; }

# 1. Check BK_HOME environment variable
if [ -z "$BK_HOME" ]; then
    error "BK_HOME environment variable is not set!"
    echo ""
    echo "Please set BK_HOME to point to your project root:"
    echo "  export BK_HOME=/path/to/your/project"
    echo ""
    echo "Add this to your ~/.bashrc or ~/.zshrc to make it permanent."
    exit 1
fi

# 2. Verify BK_HOME directory exists
if [ ! -d "$BK_HOME" ]; then
    error "BK_HOME directory does not exist: $BK_HOME"
    exit 1
fi

# 3. Locate the Python script
PYTHON_SCRIPT="$BK_HOME/src/book-status/book-status.py"
if [ ! -f "$PYTHON_SCRIPT" ]; then
    error "Python script not found: $PYTHON_SCRIPT"
    exit 1
fi

# 4. Check Python is available
if ! command -v python3 &> /dev/null; then
    error "Python 3 is not installed or not in PATH"
    exit 1
fi

# 5. Run the Python script, passing all arguments
info "Running book status check..."
python3 "$PYTHON_SCRIPT" "$@"

# 6. Capture and return the Python script's exit code
exit_code=$?

if [ $exit_code -eq 0 ]; then
    success "Status check complete!"
else
    error "Status check failed with code: $exit_code"
fi

exit $exit_code
```

### Case Study: The Book Building Scripts

Let's look at a real-world example: the [claude-skills book building scripts](https://github.com/dmccreary/claude-skills/tree/main/scripts). This is a family of 19+ shell scripts that all use a common pattern.

#### The BK_HOME Environment Variable

All scripts in this family rely on a single environment variable: `$BK_HOME`. This points to the root of the project:

```sh
# Set up once in your .bashrc or .zshrc
export BK_HOME="$HOME/projects/claude-skills"
```

Why is this brilliant?

1. **One variable to rule them all**: Change BK_HOME, and all scripts work in a new location
2. **No hardcoded paths**: Scripts are portable across different machines
3. **Easy to switch projects**: Just change BK_HOME to work on a different book

#### The Script Family

| Script | Purpose |
|--------|---------|
| `bk` | Main menu - lists all utilities |
| `bk-status` | Check book project status |
| `bk-list-skills` | List available Claude skills |
| `bk-install-skills` | Install skills to ~/.claude/skills/ |
| `bk-resize-images` | Compress large images to ~300KB |
| `bk-generate-book-metrics` | Generate statistics about the book |
| `bk-capture-screenshot` | Capture MicroSim screenshots |

#### The Main Menu Script

The `bk` script acts as a launcher that automatically discovers other scripts:

```sh
#!/bin/bash
# bk - Main menu for book utilities

# Validate environment
if [ -z "$BK_HOME" ]; then
    echo "Error: BK_HOME not set"
    exit 1
fi

SCRIPTS_DIR="$BK_HOME/scripts"

if [ ! -d "$SCRIPTS_DIR" ]; then
    echo "Error: Scripts directory not found: $SCRIPTS_DIR"
    exit 1
fi

# Discover all bk* scripts
mapfile -t scripts < <(find "$SCRIPTS_DIR" -maxdepth 1 -name "bk*" -executable | sort)

# Function to extract description from script comments
get_description() {
    local script=$1
    # Look for "# script-name - Description" pattern in first 10 lines
    sed -n '2,10p' "$script" | grep -m1 "^#.*-" | sed 's/^#[^-]*- //'
}

# Display menu
echo "╔════════════════════════════════════════╗"
echo "║     📚 Book Building Utilities 📚      ║"
echo "╠════════════════════════════════════════╣"

i=1
for script in "${scripts[@]}"; do
    name=$(basename "$script")
    desc=$(get_description "$script")
    printf "║ %2d. %-15s %-20s ║\n" "$i" "$name" "${desc:0:20}"
    ((i++))
done

echo "╚════════════════════════════════════════╝"
echo ""
echo "Run: bk <number> to execute a utility"
```

#### Design Principles

This script family demonstrates several best practices:

1. **Consistent naming**: All scripts start with `bk-`
2. **Self-documenting**: Each script has a description comment
3. **Validation first**: Check environment before doing anything
4. **Colored output**: Easy to scan for errors vs success
5. **Exit codes**: Proper codes for scripting and automation
6. **Modular**: Each script does one thing well
7. **Discoverable**: The main menu finds scripts automatically

## AI-Generated Scripts: A Word of Caution

Tools like **Claude Code** are incredibly good at generating shell scripts. You can say "write me a script to backup my documents and compress them" and get working code in seconds.

But here's what you MUST understand:

### What AI Gets Right

- Basic syntax and structure
- Common patterns and idioms
- Error handling boilerplate
- Documentation and comments

### What You Need to Verify

1. **Does it do what you asked?** Read through the logic
2. **Is it safe?** Check for dangerous commands (rm -rf, etc.)
3. **Does it handle edge cases?** Empty files, spaces in names, etc.
4. **Are the paths correct?** Don't blindly trust paths
5. **What permissions does it need?** Does it require sudo?

### The Trust Hierarchy

```
You write it yourself      → Full trust (you know what it does)
AI generates, you review   → Trust after verification
Random script from internet → Trust NOTHING (read every line)
```

!!! warning "Never Run Scripts Blindly"
    Whether from AI or the internet, ALWAYS read a script before running it. A malicious script could:

    - Delete your files
    - Install malware
    - Steal credentials
    - Mine cryptocurrency
    - Brick your system

    When in doubt, ask Claude Code to explain what each line does!

## Scheduling Tasks: Cron and Friends

Now let's automate WHEN scripts run!

### The Cron Daemon

The **cron daemon** is a background service that runs scheduled tasks. It's been around since the 1970s and is still the go-to for automation.

```sh
# Check if cron is running
systemctl status cron    # Debian/Ubuntu
systemctl status crond   # RHEL/CentOS
```

### The Crontab Command

The **crontab command** manages your personal cron jobs:

```sh
# Edit your crontab
crontab -e

# List your crontab
crontab -l

# Remove your crontab (careful!)
crontab -r

# Edit another user's crontab (requires root)
sudo crontab -u username -e
```

### Cron Syntax and Schedule Fields

**Cron syntax** uses five **cron schedule fields**:

```
┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-7, 0 and 7 are Sunday)
│ │ │ │ │
* * * * * command to execute
```

Special characters:

| Character | Meaning | Example |
|-----------|---------|---------|
| `*` | Any value | `* * * * *` = every minute |
| `,` | List | `1,15,30` = at 1, 15, and 30 |
| `-` | Range | `1-5` = 1 through 5 |
| `/` | Step | `*/15` = every 15 units |

### Cron Examples

Here are common **cron examples**:

```sh
# Every minute
* * * * * /path/to/script.sh

# Every hour at minute 0
0 * * * * /path/to/script.sh

# Every day at 2:30 AM
30 2 * * * /path/to/script.sh

# Every Monday at 9:00 AM
0 9 * * 1 /path/to/script.sh

# Every 15 minutes
*/15 * * * * /path/to/script.sh

# First day of every month at midnight
0 0 1 * * /path/to/script.sh

# Every weekday at 6 PM
0 18 * * 1-5 /path/to/script.sh

# Twice a day (8 AM and 8 PM)
0 8,20 * * * /path/to/script.sh
```

#### Diagram: Cron Schedule Fields

<details markdown="1">
<summary>Understanding the Five Cron Fields</summary>
Type: diagram

Bloom Taxonomy: Remember, Understand
Learning Objective: Visualize the five cron schedule fields and their valid ranges.

Layout: Horizontal display of five boxes with field names

Visual elements:
- Five connected boxes representing each field
- Field names: minute, hour, day, month, weekday
- Valid ranges shown below each
- Example cron expression above with arrows pointing to each field

Example expressions to visualize:
- `30 2 * * *` - 2:30 AM daily
- `0 */6 * * *` - Every 6 hours
- `0 9 * * 1-5` - 9 AM weekdays

Interactive features:
- Click each field to see valid values
- Hover for explanation
- Practice mode: build a cron expression

Color scheme:
- Fields: Different colors (blue, green, yellow, orange, purple)
- Active field: Highlighted

Implementation: p5.js
</details>

### Common Crontab Tips

```sh
# Set environment variables at the top
SHELL=/bin/bash
PATH=/usr/local/bin:/usr/bin:/bin
MAILTO=admin@example.com

# Log output
0 2 * * * /path/to/backup.sh >> /var/log/backup.log 2>&1

# Discard output
0 * * * * /path/to/quiet-script.sh > /dev/null 2>&1

# Use full paths (cron has minimal PATH)
0 3 * * * /usr/bin/python3 /home/user/scripts/analyze.py
```

!!! tip "Cron Environment"
    Cron runs with a minimal environment. Always:

    - Use full paths to commands and scripts
    - Set PATH at the top of your crontab
    - Log output to debug problems

## The At Command: One-Time Scheduling

The **at command** schedules a command to run once at a specific time:

```sh
# Schedule for a specific time
at 2:30 PM
at> /path/to/script.sh
at> <Ctrl+D>

# Schedule for a specific date
at 10:00 AM Dec 25

# Schedule relative to now
at now + 1 hour
at now + 30 minutes
at midnight
at noon tomorrow

# List pending jobs
atq

# Remove a job
atrm <job_number>

# View job details
at -c <job_number>
```

```sh
# Example: Schedule a reminder
echo "echo 'Meeting in 10 minutes!' | wall" | at now + 50 minutes
```

## The Batch Command

The **batch command** is like `at` but waits until the system load is low:

```sh
# Run when system is idle
batch
at> /path/to/heavy-processing.sh
at> <Ctrl+D>

# Or pipe a command
echo "/path/to/script.sh" | batch
```

Batch is perfect for CPU-intensive tasks that shouldn't slow down your work.

## Systemd Timers: Modern Scheduling

**Systemd timers** are the modern alternative to cron on systems using systemd. They offer:

- More precise timing
- Better logging (journalctl)
- Dependency management
- Per-service resource limits

A timer consists of two files:

**The timer unit** (`/etc/systemd/system/backup.timer`):

```ini
[Unit]
Description=Daily backup timer

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

**The service unit** (`/etc/systemd/system/backup.service`):

```ini
[Unit]
Description=Backup service

[Service]
Type=oneshot
ExecStart=/path/to/backup.sh
```

```sh
# Enable and start the timer
sudo systemctl enable backup.timer
sudo systemctl start backup.timer

# List active timers
systemctl list-timers

# View timer logs
journalctl -u backup.service
```

### OnCalendar Syntax

```sh
OnCalendar=hourly
OnCalendar=daily
OnCalendar=weekly
OnCalendar=monthly
OnCalendar=*-*-* 02:30:00      # Daily at 2:30 AM
OnCalendar=Mon *-*-* 09:00:00  # Every Monday at 9 AM
```

## Anacron: For Laptops and Desktops

**Anacron** is designed for machines that aren't running 24/7 (like your laptop). If a scheduled job was missed while the computer was off, anacron runs it when the machine starts up.

Configuration is in `/etc/anacrontab`:

```sh
# period  delay  job-identifier  command
1         5      daily-backup    /path/to/backup.sh
7         10     weekly-cleanup  /path/to/cleanup.sh
30        15     monthly-report  /path/to/report.sh
```

- **period**: Days between runs
- **delay**: Minutes to wait after boot before running
- **job-identifier**: Unique name (used for tracking)
- **command**: What to run

Anacron tracks when jobs last ran in `/var/spool/anacron/`.

## Putting It All Together: A Complete Project

Let's create a complete backup system using everything we've learned:

```sh
#!/bin/bash
# backup-system.sh - Complete backup solution
# Usage: backup-system.sh [full|incremental]

# Configuration (could also use environment variables)
BACKUP_HOME="${BACKUP_HOME:-$HOME/backups}"
SOURCE_DIRS=("$HOME/Documents" "$HOME/Projects" "$HOME/Pictures")
RETENTION_DAYS=30

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Functions
log() { echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1" >&2; }
warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }

# Validate environment
check_requirements() {
    if [ ! -d "$BACKUP_HOME" ]; then
        log "Creating backup directory: $BACKUP_HOME"
        mkdir -p "$BACKUP_HOME" || { error "Cannot create backup dir"; exit 1; }
    fi

    if ! command -v tar &> /dev/null; then
        error "tar command not found"
        exit 1
    fi
}

# Perform backup
do_backup() {
    local backup_type=${1:-full}
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_file="$BACKUP_HOME/backup_${backup_type}_${timestamp}.tar.gz"

    log "Starting $backup_type backup..."

    # Build list of existing source directories
    local valid_sources=()
    for dir in "${SOURCE_DIRS[@]}"; do
        if [ -d "$dir" ]; then
            valid_sources+=("$dir")
        else
            warning "Skipping non-existent: $dir"
        fi
    done

    if [ ${#valid_sources[@]} -eq 0 ]; then
        error "No valid source directories found!"
        exit 1
    fi

    # Create backup
    tar -czf "$backup_file" "${valid_sources[@]}" 2>/dev/null

    if [ $? -eq 0 ]; then
        local size=$(du -h "$backup_file" | cut -f1)
        log "Backup complete: $backup_file ($size)"
        return 0
    else
        error "Backup failed!"
        return 1
    fi
}

# Cleanup old backups
cleanup_old() {
    log "Cleaning up backups older than $RETENTION_DAYS days..."
    find "$BACKUP_HOME" -name "backup_*.tar.gz" -mtime +$RETENTION_DAYS -delete
    log "Cleanup complete"
}

# Main
main() {
    check_requirements

    case "${1:-full}" in
        full|incremental)
            do_backup "$1"
            cleanup_old
            ;;
        cleanup)
            cleanup_old
            ;;
        *)
            echo "Usage: $0 [full|incremental|cleanup]"
            exit 1
            ;;
    esac
}

main "$@"
```

Schedule it with cron:

```sh
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /home/user/scripts/backup-system.sh full >> /var/log/mybackup.log 2>&1
```

## Key Takeaways

You're now a scripting wizard!

- **Shell scripts**: Automate repetitive tasks with text files
- **Shebang**: `#!/bin/bash` tells the system which interpreter to use
- **Permissions**: `chmod +x` makes scripts executable
- **Variables**: Store data with `name=value`, access with `$name`
- **Arguments**: `$1`, `$2`, `$@` for user input
- **Exit codes**: 0 = success, non-zero = failure
- **Cron**: Schedule recurring tasks with five time fields
- **At**: Schedule one-time tasks
- **Systemd timers**: Modern scheduling with better logging
- **Anacron**: For machines that aren't always on
- **AI and scripts**: Let AI generate, but always verify!

!!! success "You're an Automation Master!"
    You can now write scripts that do the boring work for you, wrap complex programs in user-friendly interfaces, and schedule tasks to run automatically. Your future self will thank you for every script you write today!

## What's Next?

Now that you can automate tasks, it's time to learn about networking—how computers talk to each other. The next chapter covers networking fundamentals, from IP addresses to SSH connections.

---

??? question "Quick Quiz: Shell Scripting"
    1. What does the shebang line do?
    2. How do you make a script executable?
    3. What does `$1` represent in a script?
    4. What exit code means success?
    5. What are the five fields in a cron schedule?
    6. How is anacron different from cron?

??? note "Quiz Answers"
    1. Tells the system which interpreter to use (e.g., `#!/bin/bash`)
    2. `chmod +x script.sh`
    3. The first command-line argument passed to the script
    4. 0
    5. minute, hour, day of month, month, day of week
    6. Anacron runs missed jobs when the system starts; cron only runs at scheduled times
