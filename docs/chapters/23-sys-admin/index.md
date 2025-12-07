---
title: System Administration Essentials
description: Learn user management, systemd services, boot processes, display and audio configuration, terminal multiplexers, and encryption
generated_by: chapter-content-generator skill
date: 2025-12-06
version: 0.03
---

# System Administration Essentials

## Summary

This chapter covers essential system administration tasks. You'll learn user and group management, controlling system services with systemd, understanding the boot process, and configuring displays and audio. These skills prepare you for managing Linux systems in both personal and professional environments.

## Concepts Covered

This chapter covers the following 32 concepts from the learning graph:

1. System Administration
2. User Management
3. Useradd Command
4. Usermod Command
5. Userdel Command
6. Group Management
7. Password Management
8. Passwd Command
9. Shutdown Command
10. Reboot Command
11. System Services
12. Systemctl Command
13. Service Status
14. Service Start Stop
15. Boot Process
16. Display Configuration
17. HDMI Output
18. Multiple Displays
19. Display Resolution
20. Screen Command
21. Tmux Multiplexer
22. Audio Configuration
23. ALSA Audio
24. PulseAudio
25. Volume Control
26. Audio Output
27. Bluetooth Audio
28. USB Audio
29. Sound Testing
30. Audio Troubleshooting
31. File Encryption
32. GPG Encryption

## Prerequisites

This chapter builds on concepts from:

- [Chapter 7: File Permissions and Ownership](../07-permissions/index.md)
- [Chapter 12: Process Management and Job Control](../12-processes/index.md)
- [Chapter 14: Package Management](../14-package-mgmt/index.md)

---

## Welcome to the World of System Administration

Congratulations! You've made it to the chapter where you get to feel like you're running the show. System administration (or "sysadmin" work, as the cool kids call it) is all about keeping Linux systems running smoothly, managing users, controlling services, and generally being the person everyone calls when something breaks.

Here's a little secret about being a sysadmin: it's often a thankless job. When everything is working perfectly, nobody notices. Your servers are humming along, users are happy, and you might as well be invisible. But the *moment* one disk fills up at 3 AM? Your phone will light up like a Christmas tree with panicked messages. The secret to being a *great* sysadmin is writing tools to monitor your resources *before* they cause problems. Trust me on this one—proactive monitoring beats emergency firefighting every single time.

Think of yourself as the wizard behind the curtain, pulling the levers that make the whole system work. Let's learn how to pull those levers effectively!

## User Management: You're the Bouncer Now

One of the most fundamental sysadmin tasks is managing users. Who gets to use the system? What can they access? Can they install software or are they limited to just browsing cat pictures? These are the questions you'll be answering.

Linux is a multi-user operating system, meaning multiple people can use the same computer (either at different times or even simultaneously over a network). Each user has their own account, home directory, and set of permissions. It's like an apartment building where everyone has their own unit, and you're the building manager.

### Creating Users with useradd

The `useradd` command creates new user accounts. Here's the basic syntax:

```bash
sudo useradd username
```

But wait—that creates a pretty bare-bones account! Let's look at some useful options:

| Option | Purpose | Example |
|--------|---------|---------|
| `-m` | Create home directory | `useradd -m alice` |
| `-s` | Set default shell | `useradd -s /bin/bash bob` |
| `-c` | Add a comment (usually full name) | `useradd -c "Alice Smith" alice` |
| `-G` | Add to additional groups | `useradd -G sudo,developers charlie` |
| `-e` | Set account expiration date | `useradd -e 2025-12-31 intern` |

A more complete example:

```bash
sudo useradd -m -s /bin/bash -c "Alice Smith" -G developers alice
```

This creates a user named "alice" with a home directory, bash as her shell, a full name for reference, and membership in the "developers" group. It's like setting up a new tenant with their apartment, mailbox, and building access card all at once!

!!! tip "Pro Tip: adduser vs useradd"
    On Debian-based systems (including Raspberry Pi OS and Ubuntu), you might also see `adduser`, which is a friendlier wrapper around `useradd` that prompts you for information interactively. Both work, but `useradd` is more portable across different Linux distributions.

### Modifying Users with usermod

People change, and so do their account requirements. The `usermod` command lets you modify existing accounts:

```bash
# Change Alice's default shell to zsh
sudo usermod -s /bin/zsh alice

# Add Bob to the audio group (without removing his other groups!)
sudo usermod -aG audio bob

# Lock an account (disable login)
sudo usermod -L troublemaker

# Unlock an account
sudo usermod -U forgiven_user

# Change username (careful with this one!)
sudo usermod -l newname oldname
```

The `-aG` combination is super important! The `-a` means "append"—without it, using `-G` would *replace* all the user's groups with just the one you specified. Many a sysadmin has accidentally removed users from important groups by forgetting that `-a`. Don't be that sysadmin!

### Removing Users with userdel

When someone leaves (or when you're cleaning up old accounts), `userdel` removes user accounts:

```bash
# Remove user but keep their home directory
sudo userdel alice

# Remove user AND their home directory (scorched earth approach)
sudo userdel -r alice
```

The `-r` flag removes the user's home directory and mail spool. Use this when you're sure you don't need any of their files. If you're not sure, just remove the user and archive their home directory first—better safe than sorry!

#### Diagram: User Lifecycle Workflow

<details markdown="1">
<summary>User Lifecycle Workflow</summary>
Type: workflow

Purpose: Show the complete lifecycle of a user account from creation to deletion

Bloom Taxonomy: Understand (L2)

Learning Objective: Students will understand the stages of user account management and which commands are used at each stage

Visual style: Flowchart with process boxes and decision diamonds

Steps:
1. Start: "New Employee/Student Arrives"
   Hover text: "HR or instructor notifies IT of new user requirement"

2. Process: "Create Account (useradd -m -s /bin/bash)"
   Hover text: "Create user with home directory and default shell"

3. Process: "Set Initial Password (passwd username)"
   Hover text: "Set temporary password, force change on first login"

4. Process: "Add to Groups (usermod -aG)"
   Hover text: "Grant access to required resources based on role"

5. Process: "User Active Period"
   Hover text: "User performs regular work, may need group changes"

6. Decision: "Account Changes Needed?"
   Hover text: "Role change, department transfer, or access request"

7a. Process: "Modify Account (usermod)"
   Hover text: "Update shell, groups, or other settings"
   Loops back to "User Active Period"

7b. Process: "No Changes - Continue"
   Loops back to "User Active Period"

8. Decision: "User Leaving?"
   Hover text: "Employee departure, student graduation, or account cleanup"

9. Process: "Lock Account (usermod -L)"
   Hover text: "Immediately prevent login while preserving data"

10. Process: "Archive Home Directory"
    Hover text: "Backup user's files before deletion"

11. Process: "Delete Account (userdel -r)"
    Hover text: "Remove user and their files from system"

12. End: "Account Removed"

Color coding:
- Green: Creation steps
- Blue: Modification/maintenance steps
- Yellow: Decision points
- Red: Removal steps

Implementation: Mermaid flowchart or HTML/CSS/JS workflow diagram
</details>

### Group Management: The VIP Sections

Groups are like VIP sections in a club—they let you control who has access to what. Instead of setting permissions for each user individually (nightmare!), you can add users to groups and set permissions for the whole group.

```bash
# Create a new group
sudo groupadd developers

# Create a group with a specific GID (group ID)
sudo groupadd -g 1500 scientists

# Delete a group
sudo groupdel oldgroup

# See what groups a user belongs to
groups alice

# See all groups on the system
cat /etc/group
```

Common system groups you'll encounter:

- **sudo** or **wheel**: Can run commands as root
- **audio**: Can access sound devices
- **video**: Can access video/graphics devices
- **plugdev**: Can mount removable devices
- **docker**: Can run Docker containers without sudo
- **gpio**: Can access GPIO pins (important for Raspberry Pi projects!)

### Password Management with passwd

The `passwd` command manages passwords. It's simple but crucial:

```bash
# Change your own password
passwd

# Change another user's password (requires sudo)
sudo passwd alice

# Force user to change password at next login
sudo passwd -e alice

# Lock an account's password (alternative to usermod -L)
sudo passwd -l troublemaker

# Unlock an account's password
sudo passwd -u reformed_user

# Check password status
sudo passwd -S alice
```

The password status output looks like:

```
alice P 2025-01-15 0 99999 7 -1
```

This tells you the username, status (P=password set, L=locked, NP=no password), last change date, and various aging parameters.

#### Diagram: Password and User Database Files

<details markdown="1">
<summary>Password and User Database Structure</summary>
Type: diagram

Purpose: Show how user and password information is stored in Linux system files

Bloom Taxonomy: Understand (L2)

Learning Objective: Students will understand the relationship between /etc/passwd, /etc/shadow, and /etc/group files

Components to show:
- /etc/passwd file with sample entries showing: username:x:UID:GID:comment:home:shell
- /etc/shadow file (password hashes, accessible only by root)
- /etc/group file showing group memberships
- Arrows showing relationships between files

Sample data:
- /etc/passwd line: alice:x:1001:1001:Alice Smith:/home/alice:/bin/bash
- /etc/shadow line: alice:$6$hashed...:19403:0:99999:7:::
- /etc/group line: developers:x:1500:alice,bob,charlie

Labels:
- "x placeholder - actual hash in shadow"
- "UID: User ID number"
- "GID: Primary Group ID"
- "Permissions: 644 (passwd) vs 640 (shadow)"

Color scheme: Blue for passwd, orange for shadow (protected), green for group

Style: Block diagram with file representations and connecting arrows

Implementation: HTML/CSS diagram or p5.js visualization
</details>

## System Services: Keeping the Gears Turning

Services (also called daemons) are programs that run in the background, doing important work without requiring user interaction. Your web server, database, SSH daemon, and even the thing that keeps your clock synchronized—all services.

Modern Linux systems use **systemd** to manage services. (Some old-school Linux folks grumble about systemd replacing the older init system, but it's now the standard on most distributions, so let's embrace it!)

### Understanding systemctl

The `systemctl` command is your main tool for managing services. It's like a universal remote control for all the background processes on your system.

```bash
# Check status of a service
systemctl status ssh

# Start a service
sudo systemctl start apache2

# Stop a service
sudo systemctl stop apache2

# Restart a service (stop then start)
sudo systemctl restart apache2

# Reload configuration without full restart
sudo systemctl reload apache2

# Enable service to start automatically at boot
sudo systemctl enable ssh

# Disable automatic start at boot
sudo systemctl disable bluetooth

# Check if a service is enabled
systemctl is-enabled ssh
```

### Checking Service Status

The `systemctl status` command gives you a wealth of information:

```bash
$ systemctl status ssh
● ssh.service - OpenBSD Secure Shell server
     Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2025-01-15 09:23:45 UTC; 2 days ago
       Docs: man:sshd(8)
             man:sshd_config(5)
   Main PID: 847 (sshd)
      Tasks: 1 (limit: 4915)
     Memory: 5.3M
        CPU: 1.234s
     CGroup: /system.slice/ssh.service
             └─847 sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups
```

Let's decode this:

| Field | Meaning |
|-------|---------|
| Loaded | Service file found and loaded; "enabled" means starts at boot |
| Active | Current state: active (running), inactive (stopped), failed |
| Main PID | Process ID of the main service process |
| Tasks | Number of processes/threads spawned |
| Memory | RAM currently used |
| CGroup | Control group containing the service's processes |

### Starting and Stopping Services

Here's a handy reference table:

| Action | Command | When to Use |
|--------|---------|-------------|
| Start | `sudo systemctl start service` | Service is stopped and you need it running |
| Stop | `sudo systemctl stop service` | Need to halt a service temporarily |
| Restart | `sudo systemctl restart service` | Apply configuration changes (causes brief downtime) |
| Reload | `sudo systemctl reload service` | Apply config changes without restart (if supported) |
| Enable | `sudo systemctl enable service` | Service should start automatically at boot |
| Disable | `sudo systemctl disable service` | Prevent automatic start at boot |

!!! warning "Be Careful What You Stop!"
    Stopping critical services like `ssh` while connected remotely is a great way to lock yourself out. Always have a backup way to access the system (physical access, console, etc.) before stopping network services!

#### Diagram: Systemd Service Lifecycle

<details markdown="1">
<summary>Systemd Service States and Transitions</summary>
Type: graph-model

Purpose: Show the different states a systemd service can be in and how it transitions between them

Bloom Taxonomy: Analyze (L4)

Learning Objective: Students will analyze how services move between different states and understand which commands trigger each transition

Node types:
1. Inactive (gray circle)
   - Service is not running
   - Initial state for disabled services

2. Activating (yellow circle)
   - Service is in the process of starting
   - Transient state

3. Active (green circle)
   - Service is running normally
   - Goal state for most services

4. Deactivating (orange circle)
   - Service is shutting down
   - Transient state

5. Failed (red circle)
   - Service attempted to start but crashed
   - Requires investigation

6. Reloading (blue circle)
   - Service is reloading configuration
   - Brief transient state

Edge types (labeled arrows):
- "start" from Inactive to Activating
- "started successfully" from Activating to Active
- "start failed" from Activating to Failed
- "stop" from Active to Deactivating
- "stopped" from Deactivating to Inactive
- "reload" from Active to Reloading (loops back to Active)
- "restart" from Active through Deactivating to Activating
- "reset-failed" from Failed to Inactive

Layout: Circular arrangement with Active in center

Interactive features:
- Hover over nodes to see description of state
- Click edges to see the systemctl command that triggers transition
- Highlight current state based on demo service

Implementation: vis-network JavaScript library
</details>

### Listing All Services

To see what's running on your system:

```bash
# List all active services
systemctl list-units --type=service --state=active

# List all services (including inactive)
systemctl list-units --type=service --all

# List failed services (great for troubleshooting!)
systemctl list-units --type=service --state=failed

# List enabled services (what starts at boot)
systemctl list-unit-files --type=service --state=enabled
```

## The Boot Process: From Power Button to Login

Ever wonder what happens between pressing the power button and seeing your login screen? Understanding the boot process helps you troubleshoot when things go wrong and optimize startup time.

### Boot Sequence Overview

Here's the journey your computer takes every time it starts:

1. **BIOS/UEFI**: The firmware built into your motherboard initializes hardware and looks for a bootloader
2. **Bootloader (GRUB)**: Loads the Linux kernel into memory
3. **Kernel**: The core of Linux initializes, detects hardware, mounts the root filesystem
4. **systemd (PID 1)**: The first user-space process, orchestrates everything else
5. **Target/Services**: systemd starts services based on the "target" (runlevel)
6. **Login**: Display manager or console login appears

#### Diagram: Linux Boot Process Timeline

<details markdown="1">
<summary>Linux Boot Process Timeline</summary>
Type: timeline

Purpose: Show the chronological sequence of events during Linux boot

Time period: 0 seconds (power on) to ~30 seconds (login prompt)

Bloom Taxonomy: Remember (L1)

Learning Objective: Students will recall the sequence of events in the Linux boot process

Orientation: Horizontal

Events:
- 0s: Power On - Hardware receives electricity
- 0-2s: BIOS/UEFI - Firmware initializes CPU, RAM, basic hardware
- 2-3s: POST (Power-On Self-Test) - Hardware verification
- 3-4s: Bootloader (GRUB) - Loads kernel and initial ramdisk
- 4-6s: Kernel Loading - Kernel decompresses and initializes
- 6-8s: Hardware Detection - Kernel probes for devices
- 8-10s: Root Mount - Root filesystem mounted
- 10-12s: systemd Starts - PID 1 begins orchestration
- 12-20s: Services Starting - Parallel service activation
- 20-25s: Display Manager - Graphical login loads (if enabled)
- 25-30s: Login Ready - System ready for user

Visual style: Horizontal timeline with alternating above/below placement

Color coding:
- Purple: Firmware phase (BIOS/UEFI)
- Blue: Bootloader phase
- Green: Kernel phase
- Orange: systemd phase
- Yellow: Ready state

Interactive features:
- Hover to see detailed description
- Click to expand with technical details

Implementation: vis-timeline or custom HTML/CSS/JS timeline
</details>

### Systemd Targets (Modern Runlevels)

Systemd uses "targets" to define system states. These are like checkpoints that group related services:

| Target | Purpose | Old Runlevel Equivalent |
|--------|---------|------------------------|
| poweroff.target | Shut down system | 0 |
| rescue.target | Single-user mode, minimal services | 1 |
| multi-user.target | Text-mode, multi-user, networking | 3 |
| graphical.target | Full graphical desktop | 5 |
| reboot.target | Reboot the system | 6 |

```bash
# See current target
systemctl get-default

# Change default target (e.g., boot to text mode)
sudo systemctl set-default multi-user.target

# Switch to a different target now
sudo systemctl isolate rescue.target
```

### Shutdown and Reboot Commands

The proper ways to shut down or restart your system:

```bash
# Shut down immediately
sudo shutdown now

# Shut down in 10 minutes
sudo shutdown +10

# Shut down at a specific time
sudo shutdown 23:00

# Cancel a pending shutdown
sudo shutdown -c

# Reboot immediately
sudo reboot

# Reboot now (alternative)
sudo shutdown -r now
```

!!! tip "Why Not Just Pull the Plug?"
    Sudden power loss can corrupt files and damage filesystems. Proper shutdown ensures all data is written to disk, services stop cleanly, and the filesystem is properly unmounted. It's like the difference between closing a book nicely vs. slamming it shut—your data will thank you!

## Display Configuration: Making Things Look Good

Whether you're setting up a Raspberry Pi for a digital sign, connecting multiple monitors for productivity, or just trying to get the right resolution, display configuration is an essential skill.

### HDMI Output Basics

HDMI (High-Definition Multimedia Interface) is the most common way to connect displays. On a Raspberry Pi, you'll typically find:

- **Pi 4/400/5**: Two micro-HDMI ports (can drive two displays)
- **Pi 500+**: Two full-size HDMI ports
- **Older Pi models**: One full-size HDMI port

To check your current display setup:

```bash
# List connected displays
xrandr

# Show display information (if using Wayland)
wlr-randr

# Get detailed HDMI info on Raspberry Pi
tvservice -s
```

### Setting Display Resolution

Resolution affects how sharp and how much content fits on your screen:

```bash
# List available resolutions
xrandr

# Set a specific resolution
xrandr --output HDMI-1 --mode 1920x1080

# Set resolution and refresh rate
xrandr --output HDMI-1 --mode 1920x1080 --rate 60

# On Raspberry Pi, you can also edit /boot/config.txt
# hdmi_mode and hdmi_group settings
```

For Raspberry Pi, the `/boot/config.txt` file is your friend:

```bash
# Common settings in /boot/config.txt

# Force HDMI output (even without display connected)
hdmi_force_hotplug=1

# Set specific resolution (group 1=CEA, 2=DMT)
hdmi_group=2
hdmi_mode=82   # 1920x1080 60Hz

# Rotate display
display_rotate=0  # Normal
display_rotate=1  # 90 degrees
display_rotate=2  # 180 degrees
display_rotate=3  # 270 degrees
```

### Multiple Displays: Double the Fun

With two monitors, you can extend your desktop or mirror it:

```bash
# Extend desktop (second monitor to the right)
xrandr --output HDMI-1 --auto --output HDMI-2 --auto --right-of HDMI-1

# Mirror displays
xrandr --output HDMI-2 --same-as HDMI-1

# Turn off a display
xrandr --output HDMI-2 --off
```

#### Diagram: Multiple Display Configurations

<details markdown="1">
<summary>Display Arrangement Options</summary>
Type: diagram

Purpose: Show different ways to arrange multiple monitors

Bloom Taxonomy: Apply (L3)

Learning Objective: Students will apply knowledge of xrandr commands to configure multiple displays in different arrangements

Components to show:
- Four arrangement options: Extended Right, Extended Left, Extended Above, Mirrored
- Each showing two monitor rectangles with position indicators
- xrandr command needed for each configuration

Layout:
- 2x2 grid of display arrangements
- Each cell shows the physical arrangement and the command

Arrangements:
1. Extended Right (most common):
   - Display 1 on left, Display 2 on right
   - Command: xrandr --output HDMI-2 --right-of HDMI-1

2. Extended Left:
   - Display 2 on left, Display 1 on right
   - Command: xrandr --output HDMI-2 --left-of HDMI-1

3. Extended Above (stacked):
   - Display 2 above Display 1
   - Command: xrandr --output HDMI-2 --above HDMI-1

4. Mirrored:
   - Both displays show same content
   - Command: xrandr --output HDMI-2 --same-as HDMI-1

Color scheme: Blue for primary display, green for secondary

Labels: Show resolution on each display mock-up

Implementation: Static diagram or interactive p5.js allowing drag-and-drop arrangement
</details>

## Terminal Multiplexers: Screen and Tmux

Ever wished you could have multiple terminal windows in one? Or keep a program running after you disconnect from SSH? Terminal multiplexers are your answer!

### The screen Command

`screen` is the classic terminal multiplexer:

```bash
# Start a new screen session
screen

# Start a named session
screen -S myproject

# List running sessions
screen -ls

# Reattach to a session
screen -r myproject

# Detach from current session: Ctrl+A, then D
# Create new window: Ctrl+A, then C
# Switch windows: Ctrl+A, then N (next) or P (previous)
# Split horizontally: Ctrl+A, then S
# Split vertically: Ctrl+A, then |
```

Key commands (all start with Ctrl+A):

| Keys | Action |
|------|--------|
| Ctrl+A, D | Detach from session |
| Ctrl+A, C | Create new window |
| Ctrl+A, N | Next window |
| Ctrl+A, P | Previous window |
| Ctrl+A, " | List windows |
| Ctrl+A, K | Kill current window |

### The tmux Multiplexer

`tmux` is the more modern alternative with better features:

```bash
# Start tmux
tmux

# Start a named session
tmux new -s myproject

# List sessions
tmux ls

# Attach to a session
tmux attach -t myproject

# Detach: Ctrl+B, then D
# Create new window: Ctrl+B, then C
# Split vertically: Ctrl+B, then %
# Split horizontally: Ctrl+B, then "
# Switch panes: Ctrl+B, then arrow keys
```

Key commands (all start with Ctrl+B):

| Keys | Action |
|------|--------|
| Ctrl+B, D | Detach from session |
| Ctrl+B, C | Create new window |
| Ctrl+B, % | Split pane vertically |
| Ctrl+B, " | Split pane horizontally |
| Ctrl+B, Arrow | Move between panes |
| Ctrl+B, X | Kill current pane |
| Ctrl+B, & | Kill current window |

!!! tip "Why Use Multiplexers?"
    The killer feature is **persistence**. Start a long-running process in a tmux session, detach, close your laptop, go home, SSH back in, reattach—and your process is still running! It's like pausing a game and coming back later.

#### Diagram: Terminal Multiplexer Concept

<details markdown="1">
<summary>Tmux Session Structure</summary>
Type: diagram

Purpose: Show the hierarchical relationship between tmux sessions, windows, and panes

Bloom Taxonomy: Understand (L2)

Learning Objective: Students will understand how tmux organizes sessions, windows, and panes hierarchically

Components to show:
- Server (top level, runs in background)
- Session (contains windows, named like "project1", "project2")
- Window (like a tab, full screen within session)
- Pane (split portions of a window)

Hierarchy:
```
tmux Server
├── Session: "development"
│   ├── Window 0: "editor" [vim]
│   ├── Window 1: "terminal"
│   │   ├── Pane 0: [top half - running tests]
│   │   └── Pane 1: [bottom half - logs]
│   └── Window 2: "servers"
└── Session: "monitoring"
    └── Window 0: "htop"
```

Visual style: Tree/hierarchy diagram with nested rectangles

Color scheme:
- Gray: Server level
- Blue: Session level
- Green: Window level
- Yellow: Pane level

Labels: Show keyboard shortcuts for navigation at each level

Implementation: SVG diagram or vis-network hierarchical layout
</details>

## Audio Configuration: Making Your Pi Sing

Linux audio can seem complex because there are multiple layers, but once you understand the stack, it makes sense. Let's demystify it!

### The Linux Audio Stack

Linux audio typically involves these layers:

1. **Hardware**: Sound card, speakers, headphones, HDMI audio
2. **ALSA (Advanced Linux Sound Architecture)**: The kernel-level audio system
3. **PulseAudio or PipeWire**: User-space sound server that manages audio streams
4. **Applications**: Your music player, video player, games, etc.

Think of it like a restaurant: Hardware is the kitchen, ALSA is the chef, PulseAudio is the waiter taking orders and delivering food, and applications are the customers.

### ALSA Basics

ALSA is the foundation of Linux audio. Here are some useful commands:

```bash
# List sound cards
aplay -l

# List playback devices
aplay -L

# Test speakers (plays a simple sound to each channel)
speaker-test -c 2 -t wav

# Open ALSA mixer (adjust volumes)
alsamixer

# Set master volume from command line
amixer set Master 75%

# Mute/unmute
amixer set Master mute
amixer set Master unmute
```

In `alsamixer`:

- Use arrow keys to navigate between channels
- Up/Down to adjust volume
- M to mute/unmute a channel
- F6 to select a different sound card
- Esc to exit

### PulseAudio Management

PulseAudio sits above ALSA and provides extra features like:

- Per-application volume control
- Easy switching between outputs
- Network audio streaming

```bash
# Check PulseAudio status
pulseaudio --check
echo $?  # 0 means running

# Start PulseAudio if not running
pulseaudio --start

# List audio sinks (outputs)
pactl list sinks short

# List audio sources (inputs)
pactl list sources short

# Set default output sink
pactl set-default-sink alsa_output.usb-audio

# Set volume (percentage)
pactl set-sink-volume @DEFAULT_SINK@ 50%

# Mute/unmute
pactl set-sink-mute @DEFAULT_SINK@ toggle
```

The graphical PulseAudio volume control provides an easy interface:

```bash
# Install if not present
sudo apt install pavucontrol

# Launch
pavucontrol
```

#### Diagram: Linux Audio Stack

<details markdown="1">
<summary>Linux Audio Architecture</summary>
Type: diagram

Purpose: Show the layered architecture of Linux audio from hardware to applications

Bloom Taxonomy: Understand (L2)

Learning Objective: Students will understand how audio flows through the Linux system from applications to hardware

Components to show (layered, top to bottom):
1. Applications Layer
   - Music player, Web browser, Games
   - Each sends audio stream down

2. Sound Server Layer (PulseAudio or PipeWire)
   - Mixes multiple audio streams
   - Provides per-app volume control
   - Handles output routing

3. ALSA Layer
   - Kernel-level audio drivers
   - Hardware abstraction

4. Hardware Layer
   - Sound card
   - USB audio devices
   - HDMI audio output
   - Bluetooth audio (via separate path)

Connections:
- Vertical arrows showing audio data flow
- Multiple applications → single PulseAudio instance
- PulseAudio → ALSA → Hardware
- Bluetooth separate path: Application → PulseAudio → BlueZ → Bluetooth hardware

Labels:
- "Audio streams" on app-to-pulse connections
- "Mixed output" on pulse-to-alsa connection
- "Digital/analog signals" on alsa-to-hardware

Color scheme:
- Blue: Applications
- Green: PulseAudio/PipeWire
- Orange: ALSA
- Gray: Hardware

Implementation: Block diagram with layered boxes and arrows
</details>

### Configuring Audio Output

Switching between audio outputs (headphones, HDMI, USB speakers):

```bash
# Using PulseAudio command line
# First, find the sink name
pactl list sinks short

# Output might look like:
# 0  alsa_output.platform-bcm2835_audio.stereo-fallback  module-alsa-card.c  s16le 2ch 44100Hz  SUSPENDED
# 1  alsa_output.usb-Generic_USB_Audio-00.analog-stereo  module-alsa-card.c  s16le 2ch 48000Hz  SUSPENDED

# Set USB audio as default
pactl set-default-sink alsa_output.usb-Generic_USB_Audio-00.analog-stereo

# On Raspberry Pi, you can also use raspi-config
sudo raspi-config
# Navigate to: System Options > Audio
```

### USB Audio Devices

USB audio devices (DACs, USB speakers, microphones) are typically plug-and-play:

```bash
# When you plug in a USB audio device, check if detected
lsusb

# Check if ALSA sees it
aplay -l

# It should appear as a new card
# Card 1: USB_Audio [Generic USB Audio], device 0: USB Audio [USB Audio]
```

### Bluetooth Audio

Bluetooth audio requires the BlueZ stack and some PulseAudio modules:

```bash
# Install Bluetooth audio support
sudo apt install pulseaudio-module-bluetooth

# Restart PulseAudio
pulseaudio --kill
pulseaudio --start

# Use bluetoothctl to pair devices
bluetoothctl
# Then: power on, scan on, pair XX:XX:XX:XX:XX:XX, connect, trust

# Once connected, it should appear as a PulseAudio sink
pactl list sinks short
```

### Sound Testing

Always test your audio setup:

```bash
# Simple test - play test tone
speaker-test -c 2 -t sine -f 440

# Play a test WAV file (if you have one)
aplay /usr/share/sounds/alsa/Front_Center.wav

# Test with a simple beep
beep  # May need to install the 'beep' package

# Play an MP3 (needs mpg123 or similar)
mpg123 test.mp3
```

### Audio Troubleshooting

When audio doesn't work, here's a systematic approach:

1. **Check physical connections**: Is it plugged in? Is the right output selected on the monitor?

2. **Check ALSA detection**:
```bash
aplay -l  # Should list your audio devices
```

3. **Check PulseAudio**:
```bash
pactl info  # Should show server info
pactl list sinks  # Should list outputs
```

4. **Check volume levels**:
```bash
alsamixer  # Make sure nothing is muted (MM)
pavucontrol  # Check per-app volumes
```

5. **Check if correct output is selected**:
```bash
pactl list sinks short
pactl set-default-sink correct_sink_name
```

6. **Restart audio services**:
```bash
pulseaudio --kill
pulseaudio --start
# Or for the whole system:
sudo systemctl restart pulseaudio
```

!!! warning "The Mute Button Got Me Again!"
    Nine times out of ten, audio problems are caused by something being muted. Always check `alsamixer` for those telltale "MM" markers that indicate muted channels!

## File Encryption with GPG

Sometimes you need to keep files secret. Maybe it's your passwords, sensitive documents, or your secret recipe for the world's best cookie. GPG (GNU Privacy Guard) provides powerful encryption.

### GPG Basics

GPG uses public-key cryptography:

- **Public key**: Share this freely; others use it to encrypt messages to you
- **Private key**: Keep this SECRET; only you use it to decrypt messages

```bash
# Generate a new key pair
gpg --full-generate-key
# Follow the prompts: choose RSA, 4096 bits, your name and email

# List your keys
gpg --list-keys

# List private keys
gpg --list-secret-keys

# Export your public key (to share with others)
gpg --export --armor your@email.com > mykey.pub

# Import someone else's public key
gpg --import theirkey.pub
```

### Encrypting and Decrypting Files

```bash
# Encrypt a file for yourself
gpg --encrypt --recipient your@email.com secret.txt
# Creates secret.txt.gpg

# Encrypt for someone else
gpg --encrypt --recipient friend@email.com secret.txt

# Decrypt a file
gpg --decrypt secret.txt.gpg > secret.txt

# Symmetric encryption (password-based, no keys needed)
gpg --symmetric secret.txt
# Creates secret.txt.gpg, prompts for password

# Decrypt symmetric
gpg --decrypt secret.txt.gpg > secret.txt
# Prompts for password
```

### Signing Files

Digital signatures prove a file came from you and hasn't been tampered with:

```bash
# Sign a file (creates signature file)
gpg --sign document.pdf
# Creates document.pdf.gpg

# Create detached signature (separate .sig file)
gpg --detach-sign document.pdf
# Creates document.pdf.sig

# Verify a signature
gpg --verify document.pdf.sig document.pdf
```

#### Diagram: GPG Encryption Process

<details markdown="1">
<summary>GPG Public Key Encryption Flow</summary>
Type: workflow

Purpose: Show how public-key encryption works for secure communication

Bloom Taxonomy: Understand (L2)

Learning Objective: Students will understand the asymmetric encryption process using public and private keys

Visual style: Swimlane diagram with two participants (Alice and Bob)

Swimlanes:
- Alice (sender)
- Bob (recipient)

Steps:
1. Bob: "Generate Key Pair (gpg --full-generate-key)"
   Hover text: "Creates both public and private keys"

2. Bob: "Export Public Key (gpg --export)"
   Hover text: "Public key can be shared freely"

3. Arrow from Bob to Alice: "Share Public Key"
   Hover text: "Sent via email, website, or key server"

4. Alice: "Import Bob's Public Key (gpg --import)"
   Hover text: "Now Alice can encrypt messages for Bob"

5. Alice: "Write Secret Message"
   Hover text: "The plaintext message Alice wants to send"

6. Alice: "Encrypt with Bob's Public Key (gpg --encrypt)"
   Hover text: "Only Bob's private key can decrypt this"

7. Arrow from Alice to Bob: "Send Encrypted File"
   Hover text: "Safe to send over insecure channel"

8. Bob: "Decrypt with Private Key (gpg --decrypt)"
   Hover text: "Only Bob has the private key to decrypt"

9. Bob: "Read Secret Message"
   Hover text: "Message successfully received"

Color coding:
- Blue: Public key operations (safe to share)
- Red: Private key operations (keep secret!)
- Green: Plaintext data
- Orange: Encrypted data

Key insight box:
- "Public key = Lock that anyone can close"
- "Private key = Only key that opens that lock"

Implementation: Mermaid swimlane diagram or HTML/CSS/JS workflow
</details>

## Monitoring Resources: The Secret to Sysadmin Success

Remember what I said at the beginning about being proactive? Here's where that pays off. Setting up monitoring means you catch problems before they become emergencies.

### Essential Things to Monitor

Good sysadmins monitor:

- **Disk space**: Running out crashes systems
- **Memory usage**: Swapping kills performance
- **CPU load**: High load means slow response
- **Service status**: Dead services mean unhappy users
- **Network connectivity**: Can't help if you can't connect
- **Logs**: Errors often appear in logs before symptoms show

### Simple Monitoring Scripts

Here's a simple disk space warning script:

```bash
#!/bin/bash
# save as /usr/local/bin/check_disk.sh

THRESHOLD=80
PARTITION="/"

USAGE=$(df -h "$PARTITION" | awk 'NR==2 {print $5}' | tr -d '%')

if [ "$USAGE" -gt "$THRESHOLD" ]; then
    echo "WARNING: $PARTITION is ${USAGE}% full!" | mail -s "Disk Alert" admin@example.com
fi
```

Schedule it with cron:

```bash
# Edit crontab
crontab -e

# Add line to run every hour
0 * * * * /usr/local/bin/check_disk.sh
```

### Quick Health Checks

Commands every sysadmin should know:

```bash
# Disk space
df -h

# Memory usage
free -h

# CPU and memory (live)
top
htop  # prettier version

# System uptime and load
uptime

# Who's logged in
who
w

# Recent logins
last

# Failed services
systemctl --failed

# Recent log messages
journalctl -xe

# Check for zombie processes
ps aux | grep Z
```

#### Diagram: System Health Dashboard Concept

<details markdown="1">
<summary>System Health Monitoring Dashboard</summary>
Type: microsim

Purpose: Interactive dashboard showing simulated system metrics that students can explore

Bloom Taxonomy: Analyze (L4)

Learning Objective: Students will analyze system metrics and identify when values indicate problems

Canvas layout (800x500):
- Grid of 6 metric panels (3x2)
- Each panel shows a gauge or graph

Panels:
1. CPU Usage (gauge 0-100%)
   - Green: 0-60%
   - Yellow: 60-80%
   - Red: 80-100%
   - Simulated fluctuation

2. Memory Usage (gauge 0-100%)
   - Green: 0-70%
   - Yellow: 70-85%
   - Red: 85-100%
   - Swap usage indicator

3. Disk Space (bar chart)
   - Shows /, /home, /var
   - Color-coded by usage percentage

4. Network (line graph)
   - Incoming/outgoing bandwidth
   - Rolling 60-second view

5. Load Average (three numbers)
   - 1, 5, 15 minute averages
   - Color based on CPU count comparison

6. Service Status (icon grid)
   - SSH, Apache, MySQL icons
   - Green (running), Red (stopped), Yellow (degraded)

Interactive controls:
- "Simulate High Load" button
- "Simulate Disk Fill" button
- "Simulate Service Crash" button
- "Reset to Normal" button

Behavior:
- Metrics update in real-time (simulated)
- Color changes based on thresholds
- Alert animation when critical

Implementation: p5.js with gauge and chart libraries
</details>

## Putting It All Together: A Day in the Life

Let's walk through some realistic sysadmin scenarios:

### Scenario 1: New User Setup

A new student joins your robotics club and needs access to the Pi:

```bash
# Create the account
sudo useradd -m -s /bin/bash -c "Alex Rivera" -G gpio,i2c,spi alex

# Set initial password
sudo passwd alex

# Verify the account
id alex
ls -la /home/alex
```

### Scenario 2: Service Won't Start

The web server isn't responding:

```bash
# Check status
systemctl status apache2

# If it's failed, check the logs
journalctl -u apache2 -n 50

# Common fixes:
# - Configuration error: check apache2ctl configtest
# - Port in use: netstat -tlnp | grep :80
# - Try restarting
sudo systemctl restart apache2
```

### Scenario 3: Setting Up a Presentation Display

Pi connected to a projector, need specific resolution:

```bash
# Check current setup
xrandr

# Set to projector-friendly resolution
xrandr --output HDMI-1 --mode 1280x720

# For permanent change, edit /boot/config.txt
sudo nano /boot/config.txt
# Add: hdmi_mode=4 (720p)
# Reboot
```

### Scenario 4: Audio for a Demo

Need audio working for a project presentation:

```bash
# Test audio first
speaker-test -c 2 -t wav

# If no sound, check mixer
alsamixer

# Set correct output
pactl set-default-sink alsa_output.platform-bcm2835_audio.stereo-fallback

# Set volume
pactl set-sink-volume @DEFAULT_SINK@ 75%
```

## Key Takeaways

Congratulations! You've leveled up your Linux skills significantly. Here's what you can now do:

- **User Management**: Create, modify, and delete user accounts; manage groups; handle passwords
- **Service Control**: Start, stop, enable, and disable services with systemctl
- **Boot Understanding**: Know what happens from power-on to login prompt
- **Display Configuration**: Set up resolutions and multiple monitors
- **Terminal Multiplexers**: Run persistent sessions with screen or tmux
- **Audio Management**: Configure ALSA and PulseAudio, switch outputs, troubleshoot sound
- **Encryption**: Protect files with GPG encryption and signatures

Most importantly, you understand the sysadmin mindset: **monitor proactively, document everything, and always have a backup plan**.

The best sysadmins aren't the ones who heroically fix emergencies at 3 AM—they're the ones whose monitoring and automation prevent those emergencies from happening in the first place!

## Practice Exercises

??? question "Exercise 1: Create a restricted user account"
    Create a user called `guest` that:
    - Has a home directory
    - Uses `/bin/rbash` (restricted bash) as their shell
    - Is NOT in the sudo group
    - Expires in 30 days

    **Hint:** Use `useradd` with the `-e` flag for expiration.

??? question "Exercise 2: Service management challenge"
    Write a bash script that:
    - Checks if SSH is running
    - If not running, starts it
    - Logs the action to a file with timestamp

    **Hint:** Use `systemctl is-active` to check status.

??? question "Exercise 3: Display configuration"
    If you have access to two monitors (or can simulate with dummy outputs):
    - Set up extended desktop with Monitor 2 above Monitor 1
    - Make the arrangement persistent across reboots

    **Hint:** Look into `~/.xprofile` for persistence.

??? question "Exercise 4: GPG encryption practice"
    - Generate a new GPG key pair
    - Create a text file with "secret" content
    - Encrypt it using symmetric encryption
    - Delete the original file
    - Decrypt the encrypted file

    **Hint:** Use `gpg --symmetric` and `gpg --decrypt`.

---

*Remember: Every expert was once a beginner. The fact that you're learning Linux system administration puts you ahead of most people. Keep experimenting, keep breaking things (in test environments!), and keep learning. Your future self will thank you!*

## References

1. [Linux System Administrator's Guide](https://www.tldp.org/LDP/sag/html/index.html) - Comprehensive free guide covering all aspects of Linux system administration from installation to troubleshooting.

2. [Red Hat System Administration I Guide](https://www.redhat.com/en/services/training/rh124-red-hat-system-administration-i) - Official Red Hat documentation for learning essential system administration tasks and command-line tools.

3. [DigitalOcean Linux Basics Tutorial Series](https://www.digitalocean.com/community/tutorial_series/getting-started-with-linux) - Step-by-step tutorials on user management, permissions, and system administration fundamentals.

4. [The Linux Documentation Project - System Admin Guide](https://tldp.org/guides.html) - Collection of guides covering user accounts, file systems, backups, and system monitoring.

5. [Ubuntu Server Guide - User Management](https://ubuntu.com/server/docs/security-users) - Official Ubuntu documentation on creating and managing users, groups, and permissions.

6. [Arch Linux Wiki - Users and Groups](https://wiki.archlinux.org/title/Users_and_groups) - Detailed reference on user management commands including useradd, usermod, and group administration.

7. [systemd for Administrators Series](https://www.freedesktop.org/wiki/Software/systemd/) - Comprehensive guide to understanding and using systemd for service management.

8. [Linux Foundation - Introduction to Linux (Free Course)](https://training.linuxfoundation.org/training/introduction-to-linux/) - Free course covering basic system administration concepts and command-line skills.

9. [TecMint - Linux System Administration Tutorial](https://www.tecmint.com/free-online-linux-learning-guide-for-beginners/) - Collection of practical tutorials on disk management, user administration, and system monitoring.

10. [LinuxConfig - System Administration Tutorials](https://linuxconfig.org/linux-tutorials) - Hands-on guides for managing services, configuring displays, and troubleshooting audio issues.

11. [ALSA Project Documentation](https://www.alsa-project.org/wiki/Main_Page) - Official documentation for Advanced Linux Sound Architecture, covering audio configuration and troubleshooting.

12. [PulseAudio Documentation](https://www.freedesktop.org/wiki/Software/PulseAudio/) - Guide to configuring and managing PulseAudio sound servers on Linux systems.

13. [GnuPG (GPG) User Manual](https://www.gnupg.org/documentation/manuals/gnupg/) - Complete guide to using GPG for file encryption, digital signatures, and key management.

14. [GeeksforGeeks - Linux System Administration](https://www.geeksforgeeks.org/linux-system-administration/) - Educational articles explaining system administration concepts with practical examples.

15. [Linux Journey - Advanced System Administration](https://linuxjourney.com/) - Interactive learning platform covering service management, boot processes, and system monitoring.

16. [tmux Documentation and Guides](https://github.com/tmux/tmux/wiki) - Official wiki with tutorials on terminal multiplexing, session management, and configuration.

17. [Raspberry Pi Documentation - Configuration](https://www.raspberrypi.com/documentation/computers/configuration.html) - Official guide to configuring displays, audio, and boot settings on Raspberry Pi systems.

18. [Linux Academy Blog - System Administration Best Practices](https://acloudguru.com/blog/engineering/linux) - Articles on automation, monitoring, and professional system administration techniques.

19. [ArchWiki - Display Manager and Configuration](https://wiki.archlinux.org/title/Xrandr) - Detailed guide to using xrandr for display configuration, multiple monitors, and resolution settings.

20. [Opensource.com - System Administration Articles](https://opensource.com/tags/sysadmin) - Community-contributed articles on modern system administration tools, automation, and troubleshooting techniques.
