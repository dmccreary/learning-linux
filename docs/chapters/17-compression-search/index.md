---
title: File Search, Compression, and Archives
description: Master powerful search techniques with find, locate, and more, then learn file compression and archive creation
generated_by: claude skill chapter-content-generator
date: 2025-12-06
version: 0.04
---

# Finding Files, Archives and Compression

## Summary

This chapter teaches you to search for files efficiently and then compress files and create archives. You'll master powerful file search techniques with find, locate, which, and whereis, then learn gzip, bzip2, tar, and zip commands along with different compression algorithms and their trade-offs. These skills are essential for finding files quickly and managing disk space.

## Concepts Covered

This chapter covers the following 30 concepts from the learning graph:

1. Find Command
2. Find by Name
3. Find by Type
4. Find by Size
5. Find by Time
6. Find with Exec
7. Locate Command
8. Updatedb Command
9. Which Command
10. Whereis Command
11. Type Command
12. File Search Patterns
13. Recursive Search
14. Search Optimization
15. Index Databases
16. File Compression
17. Gzip Command
18. Gunzip Command
19. Bzip2 Command
20. Xz Command
21. Tar Command
22. Tar Create
23. Tar Extract
24. Tar Options
25. Zip Command
26. Unzip Command
27. Archive Formats
28. Compression Ratios
29. 7zip Command
30. File Archiving

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: File System Fundamentals](../04-file-system/index.md)
- [Chapter 5: File Operations and Manipulation](../05-file-operations/index.md)
- [Chapter 6: Advanced File Operations](../06-advanced-files/index.md)

---

## The "BOF" Story

Early in my career I managed a small group of about 14 engineers.  Our team
shared a file systems that was always running out of space and causing problems.
We were spending a large part of our team meetings trying to manage the disk space.
One day I got tiered of all the drama and sat down and wrote a program that
created a Big-old-file scorecard.  It didn't just find the largest files or
the oldest files.  It created a weighted score that combined these two
numbers.  Our meetings were much more productive and we could then
automate the process of automatically deleting big old files on
a regular basis.

## Find It and Squeeze It!

Ever wondered how to find that one config file you edited three weeks ago somewhere in your home directory? Or how you can send a 500MB folder as a 50MB attachment? This chapter has you covered!

You'll learn to search through thousands of files in seconds, then compress files like a boss and create tidy archives. These are the skills that separate casual users from command-line ninjas. Let's get seeking and squeezing!

---

## Part 1: Finding Files

The first half of this chapter covers the essential tools for locating files on your Linux system.

## The Find Command: The Search Swiss Army Knife

The **find command** is the most powerful file search tool on Linux. It searches directories recursively, matching files by name, type, size, time, permissions, and more.

```sh
# Basic syntax
find [path] [expression]

# Find all files named "README"
find . -name "README"

# Find all .txt files
find /home -name "*.txt"

# Case-insensitive search
find . -iname "readme*"
```

## Find by Name: Matching Filenames

**Find by name** searches using patterns with wildcards.

```sh
# Exact name
find . -name "config.yml"

# Wildcard patterns
find . -name "*.log"        # All .log files
find . -name "test_*"       # Files starting with test_
find . -name "*backup*"     # Files containing "backup"

# Case-insensitive
find . -iname "README*"     # readme, README, ReadMe, etc.

# Exclude pattern (NOT)
find . -name "*.txt" ! -name "*test*"  # .txt files without "test"
```

## Find by Type: Files, Directories, and More

**Find by type** filters by what kind of filesystem object you want.

```sh
# Find only files
find . -type f

# Find only directories
find . -type d

# Find symbolic links
find . -type l

# Combine with name
find . -type f -name "*.py"     # Python files only
find . -type d -name "build"    # Directories named "build"
```

### Type Options

| Type | Meaning |
|------|---------|
| `f` | Regular file |
| `d` | Directory |
| `l` | Symbolic link |
| `b` | Block device |
| `c` | Character device |
| `p` | Named pipe (FIFO) |
| `s` | Socket |

## Find by Size: Big Files, Small Files

**Find by size** locates files based on their size.

```sh
# Files larger than 100MB
find . -size +100M

# Files smaller than 1KB
find . -size -1k

# Files exactly 1GB
find . -size 1G

# Find large files in home
find /home -type f -size +500M

# Find empty files
find . -type f -empty

# Find empty directories
find . -type d -empty
```

### Size Units

| Unit | Meaning |
|------|---------|
| `c` | Bytes |
| `k` | Kilobytes |
| `M` | Megabytes |
| `G` | Gigabytes |

!!! tip "Finding Disk Space Hogs"
    ```sh
    # Top 10 largest files in current directory
    find . -type f -exec du -h {} + | sort -rh | head -10
    ```

## Find by Time: When Was It Modified?

**Find by time** searches based on when files were accessed, modified, or created.

```sh
# Modified in last 7 days
find . -mtime -7

# Modified MORE than 30 days ago
find . -mtime +30

# Modified exactly 1 day ago
find . -mtime 1

# Modified in last 60 minutes
find . -mmin -60

# Accessed in last 24 hours
find . -atime -1

# Changed (metadata) in last hour
find . -cmin -60

# Find files newer than reference file
find . -newer reference.txt
```

### Time Options

| Option | Meaning | Unit |
|--------|---------|------|
| `-mtime` | Modification time | Days |
| `-atime` | Access time | Days |
| `-ctime` | Change time (metadata) | Days |
| `-mmin` | Modification time | Minutes |
| `-amin` | Access time | Minutes |
| `-cmin` | Change time | Minutes |
| `-newer` | Newer than file | - |

## Find with Exec: Take Action

**Find with exec** runs commands on each file found. This is incredibly powerful!

```sh
# Delete all .tmp files
find . -name "*.tmp" -exec rm {} \;

# Delete with confirmation
find . -name "*.tmp" -exec rm -i {} \;

# Change permissions on all .sh files
find . -name "*.sh" -exec chmod +x {} \;

# Copy found files
find . -name "*.log" -exec cp {} /backup/ \;

# Grep in found files
find . -name "*.py" -exec grep -l "TODO" {} \;

# Print custom format
find . -name "*.txt" -exec echo "Found: {}" \;

# Multiple commands
find . -name "*.bak" -exec echo "Removing: {}" \; -exec rm {} \;
```

### Exec Syntax

- `{}` is replaced with the filename
- `\;` ends the command (must be escaped)
- Use `+` instead of `\;` to batch files (faster):

```sh
# Process files in batches (much faster!)
find . -name "*.txt" -exec grep "pattern" {} +
```

### Exec vs Xargs

```sh
# These are equivalent:
find . -name "*.log" -exec rm {} +
find . -name "*.log" | xargs rm

# Xargs with safe handling of special characters
find . -name "*.log" -print0 | xargs -0 rm
```

## The Locate Command: Instant Search

The **locate command** finds files instantly by searching a pre-built database. It's MUCH faster than find for simple name searches.

```sh
# Find files by name
locate readme

# Case-insensitive search
locate -i README

# Show only existing files (some may have been deleted)
locate -e readme

# Limit results
locate -l 10 readme    # Only first 10 results

# Count matches
locate -c readme       # Just show count

# Use regex
locate -r ".*\.py$"    # Files ending in .py
```

### Locate Limitations

- Only searches by filename (not content, size, time)
- Database might be outdated (files added/deleted since last update)
- Doesn't search all directories (respects privacy settings)

## The Updatedb Command: Refresh the Database

The **updatedb command** rebuilds the database that locate uses.

```sh
# Update the database (usually needs sudo)
sudo updatedb

# Check when database was last updated
stat /var/lib/mlocate/mlocate.db

# Configuration file
cat /etc/updatedb.conf
```

The database is typically updated daily by a cron job. If you just created files and locate doesn't find them, run `updatedb` manually.

## Index Databases: How Locate Works

**Index databases** store file paths for quick searching. Here's how it works:

1. `updatedb` scans the filesystem
2. It builds a database of all file paths
3. `locate` searches this database (not the filesystem)
4. Database is typically at `/var/lib/mlocate/mlocate.db`

### Configure What Gets Indexed

```sh
# View configuration
cat /etc/updatedb.conf

# Example contents:
# PRUNE_BIND_MOUNTS = "yes"
# PRUNENAMES = ".git .bzr .hg .svn"
# PRUNEPATHS = "/tmp /var/spool /media"
# PRUNEFS = "NFS nfs nfs4 rpc_pipefs afs binfmt_misc"
```

## The Which Command: Find Commands

The **which command** shows the full path of executable commands.

```sh
# Where is python?
which python
# /usr/bin/python

# Where is my custom script?
which my-script

# Show all matches
which -a python    # All pythons in PATH

# Check if command exists
which nonexistent
# (no output, exit code 1)

# Use in scripts
if which docker > /dev/null 2>&1; then
    echo "Docker is installed"
else
    echo "Docker not found"
fi
```

## The Whereis Command: Find Binaries, Source, and Docs

The **whereis command** finds the binary, source, and man page for a command.

```sh
# Find everything about a command
whereis python
# python: /usr/bin/python /usr/lib/python3.9 /usr/share/man/man1/python.1.gz

# Find only binary
whereis -b python

# Find only man pages
whereis -m python

# Find only source
whereis -s python
```

### Which vs Whereis

| Command | Finds | Searches |
|---------|-------|----------|
| `which` | Executable only | PATH |
| `whereis` | Binary, source, man | Standard locations |

## The Type Command: What Kind of Command?

The **type command** tells you what kind of command something is.

```sh
# Check command type
type ls
# ls is aliased to 'ls --color=auto'

type cd
# cd is a shell builtin

type python
# python is /usr/bin/python

type grep
# grep is /usr/bin/grep

# Show all types
type -a echo
# echo is a shell builtin
# echo is /usr/bin/echo
```

### Command Types

| Type | Meaning |
|------|---------|
| alias | Shell alias |
| builtin | Shell built-in command |
| file | External executable |
| function | Shell function |
| keyword | Shell keyword |

## File Search Patterns: Wildcards and Globs

**File search patterns** use wildcards (globs) to match multiple files.

### Pattern Characters

| Pattern | Matches |
|---------|---------|
| `*` | Zero or more characters |
| `?` | Exactly one character |
| `[abc]` | One of: a, b, or c |
| `[a-z]` | One character in range |
| `[!abc]` | NOT one of: a, b, or c |

### Examples

```sh
# All .txt files
find . -name "*.txt"

# Files with single-digit suffix
find . -name "file?.txt"     # file1.txt, file2.txt, ...

# Files starting with a, b, or c
find . -name "[abc]*"

# Files NOT starting with a vowel
find . -name "[!aeiou]*"

# Case class (any letter)
find . -name "[A-Za-z]*"
```

## Recursive Search: Going Deep

**Recursive search** descends into subdirectories. Most search tools do this by default.

```sh
# Find recursively (default behavior)
find /home -name "*.log"

# Limit depth
find . -maxdepth 2 -name "*.txt"   # Only 2 levels deep
find . -mindepth 2 -name "*.txt"   # Skip top 2 levels

# Non-recursive with ls
ls *.txt                            # Current directory only

# Recursive with grep
grep -r "pattern" .                 # Search all files
grep -r --include="*.py" "def " .   # Only Python files
```

## Search Optimization: Faster Searches

**Search optimization** makes your searches run faster.

### Tips for Faster Searching

1. **Use locate for name searches**: It's indexed!
   ```sh
   locate filename   # Instead of: find / -name "filename"
   ```

2. **Limit search depth**:
   ```sh
   find . -maxdepth 3 -name "*.txt"
   ```

3. **Search specific directories**:
   ```sh
   find /var/log -name "*.log"  # Not: find / -name "*.log"
   ```

4. **Use -prune to skip directories**:
   ```sh
   find . -path "./node_modules" -prune -o -name "*.js" -print
   ```

5. **Batch with exec +**:
   ```sh
   find . -name "*.txt" -exec cat {} +  # Faster than \;
   ```

6. **Use xargs with parallel**:
   ```sh
   find . -name "*.gz" | xargs -P 4 gunzip  # 4 parallel processes
   ```

---

## Part 2: Compression and Archives

Now that you can find files, let's learn to compress them and bundle them into archives.

## File Compression: Making Things Smaller

**File compression** reduces the size of files by finding patterns and encoding them more efficiently. It's like finding a shorter way to say the same thing—instead of "the the the the the", you say "5x the".

### Why Compress?

- **Save disk space**: Store more in less
- **Faster transfers**: Smaller files upload/download quicker
- **Reduce bandwidth**: Less data to send
- **Organize backups**: Combine many files into one

### Types of Compression

| Type | Description | Use Case |
|------|-------------|----------|
| Lossless | No data lost, perfect reconstruction | Text, code, documents |
| Lossy | Some data lost, smaller files | Images, audio, video |

Linux compression tools are typically lossless—you get back exactly what you put in!

## The Gzip Command: Fast and Popular

The **gzip command** (GNU zip) is the most common compression tool on Linux. It's fast, effective, and works with a single file at a time.

```sh
# Compress a file (replaces original with .gz)
gzip file.txt           # Creates file.txt.gz, removes file.txt

# Compress keeping original
gzip -k file.txt        # Creates file.txt.gz, keeps file.txt

# Compress with best compression (slower)
gzip -9 file.txt        # Maximum compression

# Compress with fastest speed (less compression)
gzip -1 file.txt        # Minimum compression, maximum speed

# Show compression stats
gzip -v file.txt        # Verbose output

# Compress all files in current directory
gzip *.log
```

### Gzip Options

| Option | Purpose |
|--------|---------|
| `-k` | Keep original file |
| `-v` | Verbose (show compression ratio) |
| `-1` to `-9` | Compression level (1=fast, 9=best) |
| `-r` | Recursive (compress directory contents) |
| `-f` | Force (overwrite existing) |
| `-t` | Test integrity |
| `-l` | List compressed file info |

## The Gunzip Command: Uncompress

The **gunzip command** decompresses `.gz` files back to their original form.

```sh
# Decompress a file
gunzip file.txt.gz      # Creates file.txt, removes file.txt.gz

# Keep compressed file
gunzip -k file.txt.gz   # Creates file.txt, keeps file.txt.gz

# Decompress to stdout (don't create file)
gunzip -c file.txt.gz > output.txt

# Test without decompressing
gunzip -t file.txt.gz   # Just verify integrity

# Decompress all .gz files
gunzip *.gz
```

!!! tip "Shortcut: zcat"
    Use `zcat` to view compressed files without decompressing them:
    ```sh
    zcat file.txt.gz         # View contents
    zcat file.txt.gz | less  # Page through contents
    zcat file.txt.gz | grep "pattern"  # Search in compressed file
    ```

## The Bzip2 Command: Better Compression

The **bzip2 command** provides better compression than gzip, but it's slower. Use it when file size matters more than speed.

```sh
# Compress a file
bzip2 file.txt          # Creates file.txt.bz2

# Compress keeping original
bzip2 -k file.txt

# Compress with best compression
bzip2 -9 file.txt

# Decompress
bunzip2 file.txt.bz2

# View compressed file
bzcat file.txt.bz2

# Test integrity
bzip2 -t file.txt.bz2
```

### Compression Comparison

| Algorithm | Extension | Speed | Compression | Best For |
|-----------|-----------|-------|-------------|----------|
| gzip | `.gz` | Fast | Good | Daily use, logs |
| bzip2 | `.bz2` | Medium | Better | Archives, distribution |
| xz | `.xz` | Slow | Best | Long-term storage |

## The Xz Command: Maximum Compression

The **xz command** provides the best compression ratios but is the slowest. It's great for archiving files you rarely access.

```sh
# Compress a file
xz file.txt             # Creates file.txt.xz

# Keep original
xz -k file.txt

# Maximum compression (VERY slow)
xz -9 file.txt

# Extreme compression (even more!)
xz -9e file.txt

# Decompress
unxz file.txt.xz
xz -d file.txt.xz

# View without decompressing
xzcat file.txt.xz

# Use multiple threads (faster on multi-core)
xz -T 4 file.txt        # Use 4 threads
xz -T 0 file.txt        # Use all available cores
```

!!! note "Patience Required"
    xz -9e on a large file can take a LONG time. The compression is amazing, but grab a coffee while you wait!

## Compression Ratios: Understanding the Numbers

**Compression ratios** tell you how much smaller your file got. A 50% ratio means the compressed file is half the original size.

```sh
# Check compression ratio
gzip -l file.txt.gz

# Output example:
#          compressed        uncompressed  ratio uncompressed_name
#                2467               10234  76.4% file.txt
```

### What Compresses Well?

| Content Type | Compresses Well? | Typical Ratio |
|--------------|------------------|---------------|
| Text files | Excellent | 70-90% |
| Log files | Excellent | 80-95% |
| Source code | Very good | 60-80% |
| HTML/CSS | Very good | 70-85% |
| PDF files | Poor | 5-15% |
| Images (PNG, JPG) | Very poor | 1-5% |
| Compressed files | None | 0% (might grow!) |

!!! warning "Don't Compress Compressed Files"
    Compressing a `.jpg` or `.mp3` won't make it smaller—it might even get bigger! These formats are already compressed.

## File Archiving: Bundling Files Together

**File archiving** combines multiple files into a single file. This is different from compression—archiving just bundles, compression makes it smaller.

The distinction matters:

- **tar**: Creates archives (bundles files)
- **gzip/bzip2/xz**: Compresses files
- **tar + gzip**: Archives AND compresses (`.tar.gz`)

## The Tar Command: The Tape Archiver

The **tar command** (tape archiver) is the standard tool for creating archives on Unix systems. Despite the name referencing ancient tape drives, it's still the go-to tool today!

```sh
# Create an archive
tar -cvf archive.tar folder/

# Extract an archive
tar -xvf archive.tar

# List contents without extracting
tar -tvf archive.tar
```

### Tar Create: Making Archives

**Tar create** packages files and directories into a single `.tar` file.

```sh
# Create archive from a directory
tar -cvf backup.tar my-project/

# Create archive from multiple items
tar -cvf archive.tar file1.txt file2.txt folder/

# Create compressed archive (gzip)
tar -czvf backup.tar.gz my-project/

# Create compressed archive (bzip2)
tar -cjvf backup.tar.bz2 my-project/

# Create compressed archive (xz)
tar -cJvf backup.tar.xz my-project/

# Exclude patterns
tar -czvf backup.tar.gz --exclude='*.log' --exclude='.git' my-project/

# Exclude from file
tar -czvf backup.tar.gz -X exclude-list.txt my-project/
```

### Tar Extract: Unpacking Archives

**Tar extract** unpacks archive contents.

```sh
# Extract to current directory
tar -xvf archive.tar

# Extract compressed archive (auto-detects compression)
tar -xvf archive.tar.gz
tar -xvf archive.tar.bz2
tar -xvf archive.tar.xz

# Extract to specific directory
tar -xvf archive.tar -C /destination/path/

# Extract specific file from archive
tar -xvf archive.tar path/to/file.txt

# Extract with original permissions
tar -xpvf archive.tar
```

### Tar Options: The Important Flags

**Tar options** control how tar behaves. Here are the essential ones:

| Option | Meaning |
|--------|---------|
| `-c` | Create archive |
| `-x` | Extract archive |
| `-t` | List (table of contents) |
| `-v` | Verbose (show files being processed) |
| `-f` | File (followed by filename) |
| `-z` | Use gzip compression |
| `-j` | Use bzip2 compression |
| `-J` | Use xz compression |
| `-p` | Preserve permissions |
| `-C` | Change to directory before operation |
| `--exclude` | Exclude patterns |

### The tar.gz Dance (Memory Trick)

```sh
# Remember: (c)reate/(x)tract, (z)ip, (v)erbose, (f)ile
tar -czvf archive.tar.gz folder/   # Create
tar -xzvf archive.tar.gz           # Extract
tar -tzvf archive.tar.gz           # List
```

## Archive Formats: Know Your Extensions

**Archive formats** differ in their capabilities and compatibility:

| Extension | Format | Notes |
|-----------|--------|-------|
| `.tar` | Tar only | No compression |
| `.tar.gz`, `.tgz` | Tar + gzip | Most common on Linux |
| `.tar.bz2`, `.tbz2` | Tar + bzip2 | Better compression |
| `.tar.xz`, `.txz` | Tar + xz | Best compression |
| `.zip` | Zip | Cross-platform standard |
| `.7z` | 7-Zip | Excellent compression |
| `.rar` | RAR | Windows common, proprietary |

## The Zip Command: Cross-Platform Archives

The **zip command** creates archives compatible with Windows, macOS, and Linux. It compresses and archives in one step!

```sh
# Create a zip archive
zip archive.zip file1.txt file2.txt

# Zip a directory (recursive)
zip -r archive.zip folder/

# Update existing zip (add/replace files)
zip -u archive.zip newfile.txt

# Set compression level
zip -9 archive.zip file.txt    # Best compression
zip -0 archive.zip file.txt    # No compression (store only)

# Encrypt with password
zip -e archive.zip secret.txt

# Exclude patterns
zip -r archive.zip folder/ -x "*.log" -x "*.tmp"

# Split into multiple files (for large archives)
zip -s 100m archive.zip folder/  # 100MB chunks
```

### Zip Options

| Option | Purpose |
|--------|---------|
| `-r` | Recursive (include subdirectories) |
| `-u` | Update (add new/modified files) |
| `-m` | Move (delete originals after zipping) |
| `-e` | Encrypt with password |
| `-0` to `-9` | Compression level |
| `-x` | Exclude pattern |
| `-s size` | Split archive |

## The Unzip Command: Extract Zip Archives

The **unzip command** extracts `.zip` archives.

```sh
# Extract to current directory
unzip archive.zip

# Extract to specific directory
unzip archive.zip -d /destination/

# List contents without extracting
unzip -l archive.zip

# Test archive integrity
unzip -t archive.zip

# Extract specific file
unzip archive.zip path/to/file.txt

# Extract silently (no output)
unzip -q archive.zip

# Overwrite without prompting
unzip -o archive.zip

# Never overwrite (skip existing)
unzip -n archive.zip
```

## The 7zip Command: Maximum Power

The **7zip command** (`7z`) offers excellent compression and supports many formats.

```sh
# Install 7zip
sudo apt install p7zip-full

# Create archive
7z a archive.7z folder/

# Extract archive
7z x archive.7z

# List contents
7z l archive.7z

# Test integrity
7z t archive.7z

# Create with maximum compression
7z a -mx=9 archive.7z folder/

# Add password
7z a -p archive.7z folder/

# Extract to directory
7z x archive.7z -o/destination/
```

### 7zip Supports Many Formats

```sh
# 7zip can extract almost anything!
7z x archive.tar.gz
7z x archive.zip
7z x archive.rar
7z x archive.iso
```

---

## Real-World Case Study: Image Optimization for Web Books

Here's a practical example that combines everything you've learned. This workflow finds large images in a book project and compresses them to web-appropriate sizes.

### The Problem

When creating online books (like MkDocs sites), images from cameras or design tools are often too large. A 4MB PNG file makes your website slow and wastes bandwidth. The goal: shrink images larger than 300KB down to approximately 300KB while maintaining quality.

### The Shell Wrapper Script

This bash script validates the environment and calls a Python compression tool. It demonstrates:

- Environment variable validation (`BK_HOME`)
- Dependency checking (Python, Pillow library)
- Color-coded output for user feedback
- Argument forwarding to the Python script

```sh
#!/bin/bash
# bk-resize-images - Compress large images for web optimization
# Usage: bk-resize-images [path]

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
error() { echo -e "${RED}ERROR: $1${NC}" >&2; }
warning() { echo -e "${YELLOW}WARNING: $1${NC}" >&2; }
info() { echo -e "${BLUE}INFO: $1${NC}"; }
success() { echo -e "${GREEN}SUCCESS: $1${NC}"; }

# Step 1: Validate BK_HOME environment variable
if [ -z "$BK_HOME" ]; then
    error "BK_HOME environment variable is not set"
    echo "Please set BK_HOME to your book project directory:"
    echo "  export BK_HOME=/path/to/your/book"
    exit 1
fi

if [ ! -d "$BK_HOME" ]; then
    error "BK_HOME directory does not exist: $BK_HOME"
    exit 1
fi

if [ ! -d "$BK_HOME/src" ]; then
    error "Source directory not found: $BK_HOME/src"
    exit 1
fi

info "BK_HOME validated: $BK_HOME"

# Step 2: Check for Python 3
if ! command -v python3 &> /dev/null; then
    error "Python 3 is not installed or not in PATH"
    echo "Please install Python 3:"
    echo "  sudo apt install python3"
    exit 1
fi

info "Python 3 found: $(python3 --version)"

# Step 3: Check for Pillow library
if ! python3 -c "import PIL" 2>/dev/null; then
    error "Pillow library is not installed"
    echo "Please install Pillow:"
    echo "  pip install Pillow"
    exit 1
fi

info "Pillow library is available"

# Step 4: Check for the compression script
COMPRESS_SCRIPT="$BK_HOME/src/resize-images/compress-images.py"
if [ ! -f "$COMPRESS_SCRIPT" ]; then
    error "Compression script not found: $COMPRESS_SCRIPT"
    exit 1
fi

info "Compression script found"

# Step 5: Run the Python compression tool
success "All checks passed. Running image compression..."
echo ""
cd "$BK_HOME" && python3 "$COMPRESS_SCRIPT" "$@"
```

### The Python Compression Tool

The Python script does the heavy lifting. Key features:

- **Find large images**: Scans for files over 500KB
- **Iterative compression**: Resizes progressively until target size is reached
- **Format conversion**: Converts JPG to PNG, preserves transparency
- **Backup creation**: Saves originals with `.backup` extension
- **EXIF handling**: Auto-rotates based on camera orientation

```python
#!/usr/bin/env python3
"""
compress-images.py - Compress large images to approximately 300KB PNG format

This script finds images larger than 500KB and compresses them using
adaptive resizing. It tries compression first, then progressively smaller
resize factors until the target size is achieved.

Usage:
    python compress-images.py /path/to/docs
    python compress-images.py  # Uses ./docs if it exists
"""

import os
import sys
from pathlib import Path
from PIL import Image, ExifTags

# Configuration
TARGET_SIZE_KB = 300
FIND_THRESHOLD_KB = 500
MAX_DIMENSION = 1600
IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.webp'}

def get_file_size_kb(filepath):
    """Get file size in KB."""
    return os.path.getsize(filepath) / 1024

def auto_orient_image(img):
    """Rotate image based on EXIF orientation data."""
    try:
        for orientation in ExifTags.TAGS.keys():
            if ExifTags.TAGS[orientation] == 'Orientation':
                break
        exif = img._getexif()
        if exif is not None:
            orientation_value = exif.get(orientation)
            if orientation_value == 3:
                img = img.rotate(180, expand=True)
            elif orientation_value == 6:
                img = img.rotate(270, expand=True)
            elif orientation_value == 8:
                img = img.rotate(90, expand=True)
    except (AttributeError, KeyError, IndexError):
        pass
    return img

def compress_image(filepath, target_kb=TARGET_SIZE_KB):
    """
    Compress an image to approximately target_kb size.

    Strategy:
    1. For very large files (>1MB): Start with aggressive resizing
    2. For moderately large files: Try compression first, then resize
    3. Progressively reduce size until target is achieved
    """
    original_size = get_file_size_kb(filepath)

    # Create backup
    backup_path = filepath + '.backup'
    if not os.path.exists(backup_path):
        os.rename(filepath, backup_path)
    else:
        os.remove(filepath)

    try:
        img = Image.open(backup_path)
        img = auto_orient_image(img)

        # Convert to RGBA if needed (preserves transparency)
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            pass  # Keep transparency
        else:
            img = img.convert('RGB')

        original_width, original_height = img.size

        # Determine starting scale based on file size
        if original_size > 1024:  # >1MB - start aggressive
            scale_factors = [0.6, 0.5, 0.4, 0.3, 0.25, 0.2, 0.15]
        else:
            scale_factors = [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.25]

        # Try each scale factor until target size is achieved
        for scale in scale_factors:
            new_width = int(original_width * scale)
            new_height = int(original_height * scale)

            # Don't exceed max dimension
            if new_width > MAX_DIMENSION or new_height > MAX_DIMENSION:
                ratio = min(MAX_DIMENSION / new_width, MAX_DIMENSION / new_height)
                new_width = int(new_width * ratio)
                new_height = int(new_height * ratio)

            resized = img.resize((new_width, new_height), Image.LANCZOS)

            # Save as PNG
            output_path = filepath if filepath.lower().endswith('.png') else \
                         str(Path(filepath).with_suffix('.png'))

            resized.save(output_path, 'PNG', optimize=True)

            new_size = get_file_size_kb(output_path)

            if new_size <= target_kb:
                print(f"  ✓ Compressed: {original_size:.0f}KB → {new_size:.0f}KB "
                      f"({new_width}x{new_height})")
                return True, original_size - new_size

        print(f"  ⚠ Could not reach target size (got {new_size:.0f}KB)")
        return False, 0

    except Exception as e:
        print(f"  ✗ Error: {e}")
        # Restore from backup
        if os.path.exists(backup_path):
            os.rename(backup_path, filepath)
        return False, 0

def find_large_images(directory, threshold_kb=FIND_THRESHOLD_KB):
    """Find all images larger than threshold_kb."""
    large_images = []

    for root, dirs, files in os.walk(directory):
        # Skip hidden directories
        dirs[:] = [d for d in dirs if not d.startswith('.')]

        for filename in files:
            ext = Path(filename).suffix.lower()
            if ext in IMAGE_EXTENSIONS:
                filepath = os.path.join(root, filename)
                size_kb = get_file_size_kb(filepath)
                if size_kb > threshold_kb:
                    large_images.append((filepath, size_kb))

    return sorted(large_images, key=lambda x: -x[1])  # Largest first

def main():
    """Main entry point."""
    # Determine search directory
    if len(sys.argv) > 1:
        search_dir = sys.argv[1]
    elif os.path.isdir('docs'):
        search_dir = 'docs'
    else:
        print("Usage: python compress-images.py /path/to/docs")
        sys.exit(1)

    if not os.path.isdir(search_dir):
        print(f"Error: Directory not found: {search_dir}")
        sys.exit(1)

    print(f"Searching for images > {FIND_THRESHOLD_KB}KB in: {search_dir}")
    print()

    large_images = find_large_images(search_dir)

    if not large_images:
        print("No large images found. All images are already optimized!")
        return

    print(f"Found {len(large_images)} large images:")
    for filepath, size in large_images:
        print(f"  {size:,.0f}KB - {filepath}")
    print()

    # Compress each image
    success_count = 0
    fail_count = 0
    total_saved = 0

    print("Compressing images...")
    for filepath, size in large_images:
        print(f"\nProcessing: {filepath}")
        success, saved = compress_image(filepath)
        if success:
            success_count += 1
            total_saved += saved
        else:
            fail_count += 1

    # Summary
    print("\n" + "=" * 50)
    print("SUMMARY")
    print("=" * 50)
    print(f"  Processed: {len(large_images)} images")
    print(f"  Success:   {success_count}")
    print(f"  Failed:    {fail_count}")
    print(f"  Saved:     {total_saved:,.0f} KB ({total_saved/1024:.1f} MB)")
    print()
    print("Note: Original files saved with .backup extension")
    print("Note: Check for .jpg → .png conversions that need markdown updates")

if __name__ == "__main__":
    main()
```

### Using the Tool

```sh
# Set up environment
export BK_HOME=/path/to/your/book

# Run the tool
bk-resize-images

# Or specify a different directory
bk-resize-images /path/to/images
```

### How It Works

1. **Find**: Uses `os.walk()` to recursively find images over 500KB
2. **Sort**: Processes largest files first
3. **Iterate**: Tries progressively smaller scale factors (0.9, 0.8, 0.7...)
4. **Check**: After each resize, checks if file is under 300KB
5. **Stop**: When target is achieved, moves to next image
6. **Report**: Provides summary of savings

This is the power of combining shell scripts with Python—the shell handles environment validation and user feedback, while Python handles the complex image processing!

---

## Quick Reference: Search and Compression

### Search Cheat Sheet

| Task | Command |
|------|---------|
| Find by name | `find . -name "*.txt"` |
| Find large files | `find . -size +100M` |
| Find recent files | `find . -mtime -7` |
| Find and delete | `find . -name "*.tmp" -delete` |
| Fast name search | `locate filename` |
| Find command | `which python` |

### Compression Cheat Sheet

| Task | Command |
|------|---------|
| Compress with gzip | `gzip file.txt` |
| Decompress gzip | `gunzip file.txt.gz` |
| Create tar.gz | `tar -czvf archive.tar.gz folder/` |
| Extract tar.gz | `tar -xzvf archive.tar.gz` |
| Create zip | `zip -r archive.zip folder/` |
| Extract zip | `unzip archive.zip` |

## Key Takeaways

You're now a search and compression master!

- **find**: The Swiss Army knife of file searching
- **locate**: Lightning-fast name searches using a database
- **which/whereis/type**: Find commands and their locations
- **gzip/bzip2/xz**: Compress single files (speed vs. size trade-off)
- **tar**: Creates archives; combine with compression for `.tar.gz`
- **zip**: Cross-platform archives with built-in compression

!!! success "Find and Compress Like a Pro!"
    You can now find any file on your system in seconds, save disk space, and create organized archives. These skills will save you hours of hunting and gigabytes of storage!

## What's Next?

Congratulations on completing this chapter! You now have the tools to find anything on your system and manage files efficiently. Keep practicing these commands—they become second nature with use!

---

??? question "Quick Quiz: Search and Compression"
    1. What command finds all .log files modified in the last week?
    2. Why is locate faster than find?
    3. How do you run a command on every file that find discovers?
    4. What's the difference between gzip and tar?
    5. How would you create a compressed archive of a folder?
    6. What does the `-9` option do for compression tools?
    7. How would you find the largest files on your system?

??? note "Quiz Answers"
    1. `find . -name "*.log" -mtime -7`
    2. locate searches a pre-built database instead of scanning the filesystem
    3. Use `-exec`: `find . -name "*.txt" -exec command {} \;`
    4. gzip compresses a single file; tar bundles multiple files into one archive (no compression by itself)
    5. `tar -czvf archive.tar.gz folder/`
    6. Maximum compression (slowest but smallest files)
    7. `find / -type f -exec du -h {} + 2>/dev/null | sort -rh | head -20`

## References

1. [find Command Examples](https://www.tecmint.com/35-practical-examples-of-linux-find-command/) - 35 practical find command examples for daily use
2. [Advanced find Usage](https://www.digitalocean.com/community/tutorials/how-to-use-find-and-locate-to-search-for-files-on-linux) - DigitalOcean guide to finding files on Linux
3. [locate Command Tutorial](https://linuxize.com/post/locate-command-in-linux/) - Using locate for fast file searches
4. [which vs whereis vs locate](https://www.geeksforgeeks.org/difference-between-locate-and-find-command-in-linux/) - Understanding different search command purposes
5. [Find with Exec Examples](https://www.baeldung.com/linux/find-exec-command) - Using find -exec for batch operations
6. [Regex Patterns with find](https://www.cyberciti.biz/faq/howto-use-grep-command-in-linux-unix/) - Using regular expressions in file searches
7. [File Search Optimization](https://www.linuxjourney.com/lesson/find-command) - Linux Journey's guide to efficient file searching
8. [updatedb Configuration](https://www.cyberciti.biz/faq/updating-the-locate-database/) - Configuring the locate database
9. [tar Command Guide](https://www.gnu.org/software/tar/manual/tar.html) - GNU tar official documentation with comprehensive examples
10. [gzip Tutorial](https://www.gnu.org/software/gzip/manual/gzip.html) - Official gzip compression manual
11. [Understanding Compression Algorithms](https://www.prepressure.com/library/compression-algorithm) - How different compression methods work
12. [zip vs tar.gz Comparison](https://www.howtogeek.com/248780/whats-the-difference-between-zip-and-tar.gz-files/) - When to use different archive formats
13. [7-Zip Documentation](https://www.7-zip.org/7z.html) - Official 7z format and command documentation
14. [xz Compression Guide](https://tukaani.org/xz/) - Official xz compression utility documentation
15. [File Compression Benchmarks](https://www.rootusers.com/gzip-vs-bzip2-vs-xz-performance-comparison/) - Speed and compression ratio comparisons
16. [tar Archive Best Practices](https://www.redhat.com/sysadmin/backup-dirs-tar) - Red Hat guide to backing up directories with tar
17. [bzip2 Compression Tutorial](https://sourceware.org/bzip2/docs.html) - Official bzip2 documentation and usage
18. [Archive Formats Comparison](https://en.wikipedia.org/wiki/List_of_archive_formats) - Comprehensive list of archive formats and their uses
19. [Pillow Image Library](https://pillow.readthedocs.io/en/stable/) - Python imaging library documentation for image compression
20. [rsync for Backups](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories) - Using rsync for efficient file synchronization and backups
