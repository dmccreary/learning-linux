---
title: Learning Linux
description: A 15-week course on Linux for high-school students
quality_score: 91
---
# Learning Linux Course Description

**Title:** Learning Linux<br/>
**Length:** 15-week semester long course<br/>
**Audience:** High school students<br/>
**Course Description Quality Score:** 91/100 (Excellent)

## Prerequisites

- Students must have strong typing skills including the use of the copy/cut and paste commands.
- Students should have access to a Linux terminal shell.  Any of the following is acceptable:
    - Mac Terminal
    - Windows Windows System for Linux (WSL)
    - Chromebook in developer mode
    - Raspberry Pi (available in classrooms for under $100/student without a monitor) See [here](./supplementary-content/low-cost-raspberry-pd.md) for details.

## Why This Course

In late September 2025 The Raspberry Pi Foundation announced the [Raspberry Pi 500+](./supplementary-content/raspberry-pi-500-plus-impact.md).
Although this is just one announcement in a long line of Raspberry Pi products, the features and performance of the 500+ was
stunning.  But this was not just for the Do-It-Yourself (DIY) crowd.  This
was a device that could compete with some of the best desktop computers.
And the nice thing about the 500+ was that it had all the hardware ports for
connecting it to thousands of sensors and motors to control lab equipment in schools.

However, the 500+ lacked one big component: A really fun book to teach kids how
to use the powerful Linux operating system that powered the 500+.

To put this in context, this was just around the time that Anthropic [Claude Code Skills](./supplementary-content/claude-code-skills.md) were
taking off.  And Claude Code was build around what core skill?  If you guess Linux shell commands you were **RIGHT!**.  In summary, I realized we could combine the need for Linux education with Claude Code to build a really fun world-class textbook
targeting high-school students that would empower them with the knowledge they need to use these powerful tools.

## Why this Course is Different

If you do a Google Search, you can find hundreds of books on UNIX and Linux going back to the 1980s.
But many of them are static printed books that are not designed for our TikTok obsessed youth that
have the attention span of a gnat.  They need fun, engaging and **interactive** systems that can
keep their attention and intelligent textbook interaction points that allow instructors to monitor their progress.

## Topics Covered

- UNIX
- UNIX and C
- Portability
- Linux
- Shell
- Startup
- Dot files
- .bashrc
- .zshrc
- Shortcuts
- tab completion
- Fonts and appearance
- Terminal Size
- Automating Startup
- Shell Commands
- Shell Programs
- Command Options
- grep
- regular expressions
- The Shell Pipe
- Input
- Output
- wc
- sort
- JSON
- jc
- Markdown
- network
- ping
- traceroute
- wifi
- curl
- wget
- version info
- shutdown
- text editing
- nano
- vi and vim
- find
- locate
- awk
- sed
- compression
- tar
- zip
- gzip
- diff
- cron
- history
- Design Philosophy
- Small Modular Tools
- Basic Commands
- Navigation
- Home Directory
- Environment Variables
- Ownership
- Permissions
- Directories
- File Systems
- Mounting Devices
- USB Drives
- USB Ports
- PATH
- PATH Order
- Override
- Alias
- Whereis
- Which
- Processes
- ps
- kill
- Debugging
- Installing
- Updates
- apt
- brew
- SSH
- remote login
- Firewalls
- sudo
- Shell prompts
- Customizing Terminal
- Terminal Themes
- Terminal in VSCode
- Terminal in Thonny
- Desktops
- Linux Versions
- Debian
- Real Time
- Ubuntu
- UNIX System V
- Berkley Distribution
- BSD Releases
- Virtual Memory
- Tuning UNIX
- Flash Drives
- Swap Drives
- top
- measuring performance
- CPU benchmarks
- Disk benchmarks
- GPU
- GPU benchmarks
- Adding a GPU to the Pi
- GPU drivers
- Webcams
- Adding a camera to a Pi
- Bluetooth
- printers
- displays
- HDMI ports
- Pi HDMI Micro Port
- Multiple Displays
- Display RAM
- Sounds
- Easter Eggs
- NVIDIA drivers on Pi
- Low Cost Linux
- Raspberry Pi Zero
- Linux in STEP
- Linux in Maker Spaces
- 40-pin port on the Pi
- Voltage Pins
- External Power
- Data Pins
- Monitoring Current
- LED Strip
- Motors
- Servos
- IoT
- Linux at Home
- Monitoring Your Home
- Docker
- Spinning up Linux on the Cloud
- Terraform
- Python
- PIP
- Python VMs
- Secrets
- GitHub
- git clone
- C
- The Future of Linux
- C vs. RUST
- Final Projects
- Web server
- Game Server
- Media Server
- Ad Blocker
- Retro Gaming
- VPN Setup
- VSCode
- Linux Careers
- Network admin
- Linux in Space
- Linux in Cars

## Topics Not Covered

- Linux Internals
- Compiling Linux
- Device Drivers
- Linux Research
- Advanced RUST
- Advanced C

## Learning Objectives

The following learning objectives are classified according to Bloom's Revised Taxonomy (Anderson and Krathwohl, 2001), organized from lower-order to higher-order cognitive skills.

### Remember

By the end of this course, students will be able to:

1. Recall the historical origins of UNIX and its relationship to the C programming language
2. List common Linux shell commands (ls, cd, pwd, cp, mv, rm, mkdir, cat, grep, chmod)
3. Identify the components of the Linux file system hierarchy
4. Recognize the purpose of environment variables such as PATH and HOME
5. Name the major Linux distributions (Debian, Ubuntu, BSD variants)

### Understand

By the end of this course, students will be able to:

1. Explain the UNIX design philosophy of small, modular tools
2. Describe how the shell pipe connects command input and output
3. Summarize the difference between file ownership and permissions
4. Interpret file permission notation (rwx, numeric modes)
5. Explain the purpose of package managers (apt, brew) in system maintenance
6. Describe the role of processes and how they are managed in Linux

### Apply

By the end of this course, students will be able to:

1. Navigate the Linux file system using command-line tools
2. Execute shell commands with appropriate options and arguments
3. Set and modify environment variables and aliases
4. Install, update, and remove software using package managers
5. Mount and unmount USB drives and external storage devices
6. Use process management commands (ps, top, kill) to monitor and control running programs
7. Clone repositories from GitHub using git commands

### Analyze

By the end of this course, students will be able to:

1. Diagnose permission errors and determine appropriate solutions
2. Analyze system performance using benchmarking tools (CPU, disk, GPU)
3. Compare different Linux distributions and their use cases
4. Interpret system resource usage from tools like top
5. Troubleshoot PATH-related issues when commands are not found
6. Examine the differences between C and Rust for systems programming

### Evaluate

By the end of this course, students will be able to:

1. Assess appropriate permission settings for security and functionality
2. Evaluate which Linux distribution is suitable for a given application
3. Judge the trade-offs between different hardware configurations (Pi Zero vs Pi 500+)
4. Critique shell scripts for efficiency and best practices
5. Assess system performance bottlenecks and recommend improvements

### Create

By the end of this course, students will be able to:

1. Write shell scripts that automate repetitive tasks
2. Design a home monitoring system using IoT sensors and a Raspberry Pi
3. Construct a development environment with Python, virtual environments, and version control
4. Build Docker containers to deploy Linux applications
5. Develop projects that interface with the Raspberry Pi GPIO pins (LEDs, motors, servos)
6. Compose infrastructure-as-code configurations using Terraform for cloud Linux instances
