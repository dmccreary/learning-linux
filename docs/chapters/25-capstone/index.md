---
title: Capstone Projects
description: Build real-world projects including web servers, game servers, media servers, ad blockers, VPNs, and retro gaming systems
generated_by: chapter-content-generator skill
date: 2025-12-06
version: 0.03
---

# Capstone Projects

## Summary

This chapter presents hands-on projects that integrate everything you've learned. Build and deploy web servers with Nginx or Apache, set up game servers like Minecraft, create media servers with Plex or Jellyfin, block ads network-wide with Pi-Hole, configure VPN access with WireGuard, set up retro gaming with RetroPie, and create network storage solutions. Each project reinforces Linux skills while creating something useful.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Final Projects
2. Web Server Setup
3. Nginx Server
4. Apache Server
5. Game Server
6. Minecraft Server
7. Media Server
8. Plex Server
9. Jellyfin Server
10. Pi-Hole Ad Blocker
11. DNS Server
12. VPN Server
13. WireGuard VPN
14. Retro Gaming
15. RetroPie
16. Network Storage
17. NAS Server
18. Backup Server
19. Monitoring Dashboard
20. Portfolio Project

## Prerequisites

This chapter builds on concepts from:

- [Chapter 13: Shell Scripting and Automation](../13-scripting/index.md)
- [Chapter 15: Networking Fundamentals](../15-networking/index.md)
- [Chapter 16: SSH and Remote Access](../16-ssh-security/index.md)
- [Chapter 19: Introduction to Raspberry Pi](../19-raspberry-pi/index.md)
- [Chapter 21: Virtual Machines, Containers and the Cloud](../21-vm-containers-cloud/index.md)

---

## Welcome to Project Time!

You've made it! After learning commands, mastering permissions, wrestling with networking, and taming containers, you're ready for the ultimate test: building something *real*. This chapter is where all those skills come together into projects you can actually use, show off to friends, and maybe even put on a college application or resume.

Think of this chapter as your Linux playground. Each project is self-contained, so you can pick the ones that excite you most. Want to host your own Minecraft server for friends? We've got you covered. Tired of ads ruining your browsing experience? Pi-Hole to the rescue! Want to relive classic video games? RetroPie awaits.

The best part? Every project here runs beautifully on a Raspberry Pi, meaning you can build impressive systems without expensive hardware. Let's turn that little computer into a powerhouse!

#### Diagram: Capstone Projects Overview

<details markdown="1">
<summary>Capstone Projects Overview Map</summary>
Type: infographic

Purpose: Show all capstone project options organized by category with difficulty indicators

Bloom Taxonomy: Remember (L1)

Learning Objective: Students will identify the different project categories and their relative complexity

Layout: Central hub with branching categories

Categories and Projects:
1. Web Services (left branch)
   - Web Server (Nginx) - Beginner
   - Web Server (Apache) - Beginner

2. Entertainment (top branch)
   - Game Server (Minecraft) - Intermediate
   - Media Server (Plex/Jellyfin) - Intermediate
   - Retro Gaming (RetroPie) - Beginner

3. Network Services (right branch)
   - Pi-Hole Ad Blocker - Beginner
   - VPN Server (WireGuard) - Intermediate
   - DNS Server - Intermediate

4. Storage & Backup (bottom branch)
   - NAS Server - Intermediate
   - Backup Server - Intermediate

5. Monitoring (center-bottom)
   - Dashboard - Intermediate
   - Portfolio Project - Advanced

Visual style: Mind map with icons for each project type

Color coding:
- Green: Beginner projects
- Yellow: Intermediate projects
- Orange: Advanced projects

Interactive features:
- Click on any project to jump to that section
- Hover to see brief description and estimated time

Implementation: HTML/CSS/JS interactive mind map
</details>

## Project 1: Web Server Setup

Every website you visit is powered by a web server—software that listens for requests and sends back web pages. Setting up your own web server is like building your first house on the internet. You'll understand exactly how websites work from the server side.

### Why Run Your Own Web Server?

Running a web server teaches you:

- How HTTP requests and responses work
- Port configuration and firewall rules
- Virtual hosts for multiple websites
- SSL/TLS certificates for HTTPS
- Log analysis and troubleshooting

Plus, you can host your own website, portfolio, or even a family photo gallery!

### Nginx: The Speed Demon

Nginx (pronounced "engine-x") is known for being fast and efficient. It handles many simultaneous connections without breaking a sweat, making it perfect for everything from personal blogs to massive websites like Netflix.

#### Installing Nginx

```bash
# Update package lists
sudo apt update

# Install Nginx
sudo apt install nginx -y

# Start Nginx and enable it to start on boot
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

After installation, open a web browser and go to your Pi's IP address. You should see the "Welcome to nginx!" page. Congratulations—you're now running a web server!

#### Configuring Your First Site

Nginx configuration lives in `/etc/nginx/`. The main config file is `nginx.conf`, but site-specific configs go in `/etc/nginx/sites-available/`.

```bash
# Create a directory for your website
sudo mkdir -p /var/www/mysite

# Create a simple HTML page
sudo nano /var/www/mysite/index.html
```

Add this HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Linux Project</title>
</head>
<body>
    <h1>Hello from my Raspberry Pi!</h1>
    <p>This server is powered by Nginx and Linux skills.</p>
</body>
</html>
```

Now create the site configuration:

```bash
sudo nano /etc/nginx/sites-available/mysite
```

```nginx
server {
    listen 80;
    server_name mysite.local;
    root /var/www/mysite;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Enable the site and reload:

```bash
# Create symbolic link to enable site
sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Apache: The Veteran

Apache HTTP Server has been around since 1995 and powers millions of websites. It's highly configurable and has extensive documentation. If Nginx is a sports car, Apache is a customizable pickup truck—maybe not the fastest, but it can do almost anything.

#### Installing Apache

```bash
# Install Apache
sudo apt install apache2 -y

# Start and enable
sudo systemctl start apache2
sudo systemctl enable apache2

# Check status
sudo systemctl status apache2
```

!!! warning "Port Conflict Alert"
    Both Nginx and Apache use port 80 by default. If you want both installed, configure one to use a different port (like 8080). Never run two services on the same port—they'll fight, and nobody wins!

#### Apache vs Nginx Comparison

| Feature | Apache | Nginx |
|---------|--------|-------|
| Configuration Style | .htaccess files | Centralized config |
| Module System | Dynamic loading | Compiled modules |
| Concurrent Connections | Process/thread-based | Event-driven |
| Memory Usage | Higher | Lower |
| Best For | Dynamic content, .htaccess needs | Static content, reverse proxy |
| Learning Resources | Extensive (25+ years) | Growing rapidly |

#### Diagram: Web Server Request Flow

<details markdown="1">
<summary>HTTP Request Processing Flow</summary>
Type: workflow

Purpose: Show how a web request travels from browser to server and back

Bloom Taxonomy: Understand (L2)

Learning Objective: Students will understand the complete lifecycle of an HTTP request through a web server

Visual style: Horizontal flowchart with numbered steps

Steps:
1. Client: "Browser sends HTTP request"
   Hover text: "User types URL or clicks link, browser creates HTTP GET request"

2. Network: "Request travels through internet"
   Hover text: "DNS lookup finds server IP, request routed through internet"

3. Firewall: "Port 80/443 check"
   Hover text: "Firewall allows traffic on web ports"

4. Web Server: "Nginx/Apache receives request"
   Hover text: "Server software parses HTTP headers and URL"

5. Decision: "Static or Dynamic content?"
   Hover text: "Server checks if file exists or needs processing"

6a. Static Path: "Serve file directly"
    Hover text: "HTML, CSS, JS, images served from filesystem"

6b. Dynamic Path: "Pass to application (PHP, Python, etc.)"
    Hover text: "Application processes request, generates response"

7. Web Server: "Build HTTP response"
   Hover text: "Add headers, status code, content"

8. Network: "Response travels back"
   Hover text: "Data packets return to client"

9. Client: "Browser renders page"
   Hover text: "Browser parses HTML, loads resources, displays page"

Color coding:
- Blue: Client-side steps
- Green: Server-side steps
- Yellow: Decision points
- Gray: Network transit

Implementation: Mermaid flowchart or HTML/CSS/JS workflow
</details>

## Project 2: Game Server - Minecraft

Here's the project that'll make you popular with your friends! Running a Minecraft server on your Raspberry Pi lets you create a private world where only your invited friends can play. No random griefers destroying your builds!

### Hardware Considerations

Minecraft servers are memory-hungry beasts. For a smooth experience:

- **Raspberry Pi 4 (4GB+)**: Can handle 5-10 players
- **Raspberry Pi 5 (8GB)**: Can handle 10-15 players comfortably
- **Storage**: Use an SSD for faster world loading (microSD will work but be slower)

### Installing Java

Minecraft runs on Java, so we need to install it first:

```bash
# Install Java Runtime Environment
sudo apt install default-jdk -y

# Verify installation
java -version
```

### Setting Up the Minecraft Server

```bash
# Create a directory for the server
mkdir ~/minecraft-server
cd ~/minecraft-server

# Download the latest Paper server (optimized for performance)
# Check papermc.io for the latest version URL
wget https://api.papermc.io/v2/projects/paper/versions/1.20.4/builds/latest/downloads/paper-1.20.4.jar -O server.jar

# Create a startup script
nano start.sh
```

Add this to `start.sh`:

```bash
#!/bin/bash
java -Xmx2G -Xms1G -jar server.jar nogui
```

The `-Xmx2G` means maximum 2GB of RAM, and `-Xms1G` means start with 1GB. Adjust based on your Pi's memory.

```bash
# Make the script executable
chmod +x start.sh

# First run - will create files and exit
./start.sh

# Accept the EULA
nano eula.txt
# Change eula=false to eula=true

# Start the server for real
./start.sh
```

### Server Configuration

Edit `server.properties` to customize your server:

```bash
nano server.properties
```

Key settings to consider:

| Setting | Description | Recommended Value |
|---------|-------------|-------------------|
| `server-port` | Port for connections | 25565 (default) |
| `max-players` | Maximum concurrent players | 10 (for Pi 4) |
| `view-distance` | Chunk loading distance | 6-8 (lower = better performance) |
| `simulation-distance` | Entity processing distance | 4-6 |
| `online-mode` | Verify player accounts | true (security!) |
| `motd` | Server description | "Welcome to My Pi Server!" |
| `difficulty` | Game difficulty | normal |
| `gamemode` | Default game mode | survival |

### Running as a Service

You don't want to keep a terminal open forever. Let's make it a proper service:

```bash
sudo nano /etc/systemd/system/minecraft.service
```

```ini
[Unit]
Description=Minecraft Server
After=network.target

[Service]
User=pi
WorkingDirectory=/home/pi/minecraft-server
ExecStart=/home/pi/minecraft-server/start.sh
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start the service
sudo systemctl enable minecraft
sudo systemctl start minecraft

# Check status
sudo systemctl status minecraft

# View logs
journalctl -u minecraft -f
```

!!! tip "Invite Your Friends"
    To let friends connect over the internet, you'll need to set up port forwarding on your router (forward port 25565 to your Pi's local IP) or use a service like [playit.gg](https://playit.gg) which creates a tunnel without router configuration.

## Project 3: Media Server

Turn your Pi into a streaming powerhouse! A media server lets you access your movies, music, and photos from any device on your network—your phone, tablet, smart TV, or another computer.

### Plex vs Jellyfin: The Showdown

Both are excellent media servers, but they have different philosophies:

| Feature | Plex | Jellyfin |
|---------|------|----------|
| **Price** | Free tier + Plex Pass ($5/mo or $120 lifetime) | 100% Free (open source) |
| **Remote Access** | Easy, built-in | Requires manual setup |
| **Mobile Apps** | Polished, some features need Plex Pass | Free, community-developed |
| **Hardware Transcoding** | Plex Pass required | Free |
| **Account Required** | Yes (Plex account) | No (fully self-hosted) |
| **Philosophy** | Commercial product | Community-driven |

If you want the easiest setup and don't mind creating an account, go Plex. If you want full control and truly free software, go Jellyfin.

### Setting Up Jellyfin (The Open Source Choice)

```bash
# Add Jellyfin repository
curl https://repo.jellyfin.org/install-debuntu.sh | sudo bash

# Install Jellyfin
sudo apt install jellyfin -y

# Start and enable
sudo systemctl start jellyfin
sudo systemctl enable jellyfin
```

Access Jellyfin at `http://your-pi-ip:8096` and follow the setup wizard.

### Setting Up Plex

```bash
# Add Plex repository
echo deb https://downloads.plex.tv/repo/deb public main | sudo tee /etc/apt/sources.list.d/plexmediaserver.list
curl https://downloads.plex.tv/plex-keys/PlexSign.key | sudo apt-key add -

# Update and install
sudo apt update
sudo apt install plexmediaserver -y

# Start and enable
sudo systemctl start plexmediaserver
sudo systemctl enable plexmediaserver
```

Access Plex at `http://your-pi-ip:32400/web` and create your account.

### Organizing Your Media Library

Both Plex and Jellyfin work best with organized media:

```
/media/
├── movies/
│   ├── The Matrix (1999)/
│   │   └── The Matrix (1999).mkv
│   └── Inception (2010)/
│       └── Inception (2010).mkv
├── tv/
│   └── Breaking Bad/
│       ├── Season 01/
│       │   ├── Breaking Bad - S01E01 - Pilot.mkv
│       │   └── Breaking Bad - S01E02 - Cat's in the Bag.mkv
│       └── Season 02/
└── music/
    └── Artist Name/
        └── Album Name/
            ├── 01 - Track Name.mp3
            └── 02 - Track Name.mp3
```

!!! tip "External Storage Recommended"
    Media files are huge! Use an external USB drive or a NAS for storage. A 1TB drive can hold roughly 200 movies or 500+ TV show episodes.

#### Diagram: Media Server Network Architecture

<details markdown="1">
<summary>Media Server Home Network Setup</summary>
Type: diagram

Purpose: Show how a media server integrates with home network devices

Bloom Taxonomy: Understand (L2)

Learning Objective: Students will understand how media flows from storage through the server to various client devices

Components to show:
1. Storage Layer (left side)
   - External USB Hard Drive
   - NAS Device (optional)

2. Media Server (center)
   - Raspberry Pi running Plex/Jellyfin
   - Shows port numbers (8096 for Jellyfin, 32400 for Plex)

3. Network Layer (middle)
   - Home Router/WiFi
   - Shows local IP addressing

4. Client Devices (right side, multiple)
   - Smart TV
   - Smartphone
   - Tablet
   - Computer
   - Gaming Console

Connections:
- USB connection from drive to Pi
- Ethernet/WiFi from Pi to router
- WiFi from router to each client device
- Bidirectional arrows showing request/stream flow

Labels:
- "Media Library Storage"
- "Transcoding & Streaming"
- "Home Network"
- "Client Apps"

Color scheme:
- Orange: Storage devices
- Blue: Server/Pi
- Green: Network
- Purple: Client devices

Implementation: Block diagram with device icons
</details>

## Project 4: Pi-Hole Ad Blocker

Imagine a world where ads just... disappear. Not just in your browser, but on every device in your house—phones, tablets, smart TVs, even those annoying ads in mobile games. Pi-Hole makes this dream a reality by blocking ads at the DNS level.

### How Pi-Hole Works

When you type a website address, your device asks a DNS server "What's the IP address for ads.google.com?" Normally, it gets an answer and loads the ad. With Pi-Hole as your DNS server, it responds with "Never heard of it!" and the ad simply doesn't load.

The brilliant part? This works for *every device* on your network without installing anything on them.

### Installing Pi-Hole

The installation couldn't be easier:

```bash
curl -sSL https://install.pi-hole.net | bash
```

The installer will ask you several questions:

1. **Upstream DNS Provider**: Choose Google, Cloudflare, or OpenDNS (Cloudflare is fast and privacy-focused)
2. **Blocklists**: Accept the defaults to start
3. **Protocols**: Enable both IPv4 and IPv6
4. **Static IP**: Set a static IP for your Pi (important!)
5. **Web Interface**: Yes, install it
6. **Logging**: Enable for statistics

### Configuring Your Network

For Pi-Hole to work, devices need to use it as their DNS server. You have two options:

**Option 1: Router Configuration (Recommended)**
Log into your router and change the DHCP settings to give out your Pi's IP as the DNS server. This automatically applies to all devices.

**Option 2: Per-Device Configuration**
Manually set each device's DNS to your Pi's IP address. More work, but useful if you can't access router settings.

### The Pi-Hole Dashboard

Access your Pi-Hole dashboard at `http://your-pi-ip/admin`. It's beautiful! You'll see:

- Total queries blocked (prepare to be shocked!)
- Percentage of traffic blocked (often 15-30%!)
- Top blocked domains
- Top permitted domains
- Query log for troubleshooting

```bash
# View the admin password if you forgot it
pihole -a -p

# Update Pi-Hole
pihole -up

# Add domains to whitelist
pihole -w example.com

# Add domains to blacklist
pihole -b ads.annoyingsite.com
```

#### Diagram: Pi-Hole DNS Flow

<details markdown="1">
<summary>How Pi-Hole Blocks Ads</summary>
Type: workflow

Purpose: Illustrate the DNS request flow with and without Pi-Hole blocking

Bloom Taxonomy: Understand (L2)

Learning Objective: Students will understand how DNS-level ad blocking works

Visual style: Split comparison diagram (top: blocked, bottom: allowed)

Top Flow (Ad Request - Blocked):
1. Device: "DNS query: ads.tracker.com"
2. Pi-Hole: "Check blocklist..."
3. Pi-Hole: "Found! Return 0.0.0.0"
4. Device: "Connection failed (no ad shown)"
5. User: "Happy browsing!"

Bottom Flow (Normal Request - Allowed):
1. Device: "DNS query: youtube.com"
2. Pi-Hole: "Check blocklist..."
3. Pi-Hole: "Not found, forward to upstream"
4. Cloudflare DNS: "youtube.com = 172.217.14.78"
5. Pi-Hole: "Return IP to device"
6. Device: "Connect to YouTube!"

Visual elements:
- Device icon (phone/computer)
- Pi-Hole logo (black hole)
- Upstream DNS icon (cloud)
- X marks for blocked requests
- Checkmarks for allowed requests

Color coding:
- Red: Blocked path
- Green: Allowed path
- Gray: DNS infrastructure

Implementation: Side-by-side flowchart with animations
</details>

### Blocklist Management

Pi-Hole starts with a default blocklist, but you can add more:

```bash
# Access the dashboard, go to Group Management > Adlists
# Popular blocklists to add:

# Steven Black's hosts (comprehensive)
https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts

# OISD (balanced, fewer false positives)
https://dbl.oisd.nl/

# After adding, update gravity
pihole -g
```

!!! warning "Blocklist Balance"
    More blocklists = more ads blocked, but also more potential false positives (legitimate sites blocked). Start small, add more if needed, and use the whitelist feature when something breaks.

## Project 5: VPN Server with WireGuard

Want to access your home network securely from anywhere in the world? A VPN (Virtual Private Network) creates an encrypted tunnel between your device and your home. It's like having a secret passage back home, no matter where you are.

### Why Run Your Own VPN?

- **Security**: Encrypt your traffic on public WiFi
- **Privacy**: Your browsing goes through your home IP, not the coffee shop's
- **Remote Access**: Reach your home devices (Pi-Hole, media server, etc.) from anywhere
- **Bypass Restrictions**: Access your home network even on restrictive networks

### Why WireGuard?

WireGuard is the new kid on the block, and it's amazing:

| Feature | WireGuard | OpenVPN |
|---------|-----------|---------|
| Code Lines | ~4,000 | ~100,000 |
| Speed | Very fast | Moderate |
| Setup Complexity | Simple | Complex |
| Mobile Battery | Efficient | Heavy drain |
| Security | Modern cryptography | Proven but older |
| Connection Time | Instant | Few seconds |

### Installing WireGuard with PiVPN

PiVPN is a fantastic installer that handles all the complexity:

```bash
curl -L https://install.pivpn.io | bash
```

During installation:

1. **VPN Type**: Choose WireGuard
2. **Local User**: Select your user account
3. **Port**: Default 51820 is fine
4. **DNS Provider**: Use Pi-Hole if you have it! (Enter your Pi's IP)
5. **Public IP**: Let it auto-detect, or enter your public IP/dynamic DNS hostname

### Creating Client Profiles

```bash
# Create a new client profile
pivpn add

# Enter a name like "my-phone" or "laptop"
# A QR code will appear - scan it with the WireGuard app!

# List all clients
pivpn list

# Remove a client
pivpn remove

# Show QR code again
pivpn -qr client-name
```

### Setting Up Port Forwarding

For VPN to work from outside your network, you need to forward the WireGuard port on your router:

1. Log into your router admin panel
2. Find Port Forwarding settings
3. Create a rule:
   - External Port: 51820
   - Internal IP: Your Pi's IP
   - Internal Port: 51820
   - Protocol: UDP

### Mobile Setup

1. Install the WireGuard app (iOS or Android)
2. Tap the + button
3. Choose "Scan QR Code"
4. Scan the code generated by `pivpn -qr client-name`
5. Connect and enjoy!

!!! tip "Dynamic DNS"
    If your home IP changes (most do), use a Dynamic DNS service like DuckDNS or No-IP. PiVPN can use a hostname instead of an IP address.

## Project 6: Retro Gaming with RetroPie

Time to travel back to the golden age of gaming! RetroPie transforms your Raspberry Pi into a retro gaming console that can play games from dozens of classic systems—NES, SNES, Genesis, PlayStation, arcade machines, and more.

### What You'll Need

- Raspberry Pi 4 or 5 (Pi 3 works too, but newer is better)
- MicroSD card (32GB+ recommended)
- USB game controller (or original controllers with adapters)
- HDMI cable and display
- Legally obtained game ROMs (important!)

### Installing RetroPie

**Option 1: Full RetroPie Image (Fresh Install)**

1. Download the RetroPie image from retropie.org.uk
2. Flash it to your SD card with Raspberry Pi Imager
3. Boot up and you're ready!

**Option 2: Install on Existing Raspberry Pi OS**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install git lsb-release -y

# Clone RetroPie setup script
git clone --depth=1 https://github.com/RetroPie/RetroPie-Setup.git

# Run the setup script
cd RetroPie-Setup
sudo ./retropie_setup.sh
```

Choose "Basic Install" for the most common emulators, or "Full Install" for everything (takes longer).

### Transferring ROMs

ROMs go in `/home/pi/RetroPie/roms/` with subfolders for each system:

```
/home/pi/RetroPie/roms/
├── nes/
├── snes/
├── genesis/
├── gba/
├── psx/
├── n64/
└── arcade/
```

Transfer methods:

1. **USB Drive**: Put ROMs on USB, plug into Pi, it auto-copies
2. **SFTP**: Connect with FileZilla using your Pi's credentials
3. **Samba**: Access `\\retropie` from Windows File Explorer

### Controller Configuration

When EmulationStation starts, hold a button on your controller. Follow the prompts to map all buttons. RetroPie supports:

- Xbox controllers (USB and Bluetooth)
- PlayStation controllers (USB and Bluetooth)
- 8BitDo controllers (excellent retro-style options!)
- Original console controllers (with USB adapters)

### Performance Tips

Different systems have different performance needs:

| System | Performance on Pi 4 | Tips |
|--------|---------------------|------|
| NES, Game Boy | Perfect | Any overclock |
| SNES, Genesis | Perfect | No tweaks needed |
| PlayStation 1 | Great | Default settings |
| N64 | Good (most games) | Overclock helps |
| Dreamcast | Fair | Overclock required |
| PSP | Fair | Lower resolution helps |

```bash
# To overclock (do this carefully!)
sudo nano /boot/config.txt

# Add these lines (Pi 4 example):
over_voltage=6
arm_freq=2000
gpu_freq=750
```

!!! warning "A Note on ROMs and Legality"
    Downloading ROMs for games you don't own is piracy and illegal. The legal way to get ROMs is to dump them from cartridges you own using a dumping device. There are also some legally free homebrew games available!

#### Diagram: RetroPie System Architecture

<details markdown="1">
<summary>RetroPie Software Stack</summary>
Type: diagram

Purpose: Show the layered architecture of RetroPie from hardware to user interface

Bloom Taxonomy: Understand (L2)

Learning Objective: Students will understand how the different components of RetroPie work together

Components (layered, bottom to top):

1. Hardware Layer (bottom)
   - Raspberry Pi (CPU, GPU, RAM)
   - Controller (USB/Bluetooth)
   - Display (HDMI)

2. Operating System Layer
   - Raspberry Pi OS (Linux kernel)
   - Device drivers

3. Emulator Layer
   - RetroArch (emulator framework)
   - Individual emulators (FCEU for NES, Snes9x for SNES, etc.)
   - BIOS files (where required)

4. Frontend Layer
   - EmulationStation (game browser UI)
   - Themes and customization

5. Content Layer (top)
   - ROM files organized by system
   - Save states and saved games
   - Screenshots and videos

Connections:
- Vertical arrows showing data flow
- Controller input flowing up through layers
- Video output flowing down to display

Labels:
- "Input Processing"
- "Game Emulation"
- "Video Rendering"
- "Game Selection"

Color scheme:
- Gray: Hardware
- Blue: OS/System
- Green: Emulation
- Purple: Frontend
- Orange: Content

Implementation: Layered block diagram
</details>

## Project 7: Network Attached Storage (NAS)

Tired of running out of space on your devices? A NAS (Network Attached Storage) server centralizes all your files in one place, accessible from any device on your network. Think of it as your personal cloud storage, but without monthly fees and with full control.

### Hardware Setup

For a NAS, storage is everything:

- **Raspberry Pi 4 or 5**: USB 3.0 ports are essential
- **External Hard Drive(s)**: USB 3.0 drives, preferably with their own power supply
- **Optional**: USB hub for multiple drives (powered hub recommended)

### Setting Up Samba for File Sharing

Samba allows Windows, Mac, and Linux devices to access shared folders:

```bash
# Install Samba
sudo apt install samba samba-common-bin -y

# Create a shared directory
sudo mkdir -p /media/shared
sudo chmod 777 /media/shared

# Backup and edit Samba config
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.backup
sudo nano /etc/samba/smb.conf
```

Add at the end of the file:

```ini
[SharedFiles]
    comment = Pi Shared Files
    path = /media/shared
    browseable = yes
    writeable = yes
    create mask = 0777
    directory mask = 0777
    public = no
```

```bash
# Add your user to Samba (set a password)
sudo smbpasswd -a pi

# Restart Samba
sudo systemctl restart smbd

# Enable on boot
sudo systemctl enable smbd
```

Access from:

- **Windows**: `\\your-pi-ip\SharedFiles`
- **Mac**: Finder > Go > Connect to Server > `smb://your-pi-ip/SharedFiles`
- **Linux**: File manager > Connect to Server > `smb://your-pi-ip/SharedFiles`

### Setting Up a Proper NAS with OpenMediaVault

For a more full-featured NAS experience, consider OpenMediaVault:

```bash
# Download and run OMV installer
wget -O - https://raw.githubusercontent.com/OpenMediaVault-Plugin-Developers/installScript/master/install | sudo bash
```

After installation (takes 15-20 minutes), access the web interface at `http://your-pi-ip`. Default login is admin/openmediavault.

OpenMediaVault gives you:

- Web-based management
- RAID configuration
- User and permission management
- Plugin system (Docker, Plex, etc.)
- Disk monitoring and SMART data
- Scheduled tasks

### Backup Server Functionality

Your NAS can also serve as a backup destination:

```bash
# Install rsync if not present
sudo apt install rsync -y

# On client machines, backup to the Pi:
rsync -avz --progress /path/to/backup/ pi@your-pi-ip:/media/shared/backups/

# For automated backups, add to crontab on the client:
crontab -e
# Add: 0 2 * * * rsync -avz /important/folder/ pi@your-pi-ip:/media/shared/backups/
```

!!! tip "RAID Is Not Backup"
    If you set up multiple drives in RAID, remember: RAID protects against drive failure, not against accidental deletion, ransomware, or fire. Always have an off-site backup for truly important data!

## Project 8: Monitoring Dashboard

What good is having all these services if you don't know if they're running? A monitoring dashboard gives you a bird's-eye view of everything happening on your network. It's like mission control for your home infrastructure.

### Lightweight Option: Homer Dashboard

Homer is a simple, beautiful dashboard for organizing links to all your services:

```bash
# Create directory
mkdir ~/homer
cd ~/homer

# Download Homer
wget https://github.com/bastienwirtz/homer/releases/latest/download/homer.zip
unzip homer.zip

# Serve with Python (quick test)
python3 -m http.server 8080

# Or install nginx to serve it properly
sudo apt install nginx -y
sudo cp -r ~/homer/* /var/www/html/
```

Edit `assets/config.yml` to add your services.

### Full Monitoring with Grafana + Prometheus

For serious monitoring with graphs and alerts:

```bash
# Install Prometheus (metrics collector)
sudo apt install prometheus -y

# Install Grafana (visualization)
sudo apt install -y apt-transport-https software-properties-common
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana -y

# Start services
sudo systemctl enable prometheus grafana-server
sudo systemctl start prometheus grafana-server
```

Access Grafana at `http://your-pi-ip:3000` (default login: admin/admin).

### Monitoring Pi System Metrics

Install node_exporter to monitor your Pi itself:

```bash
# Download and install node_exporter
wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-armv7.tar.gz
tar xvfz node_exporter-*.tar.gz
sudo mv node_exporter-*/node_exporter /usr/local/bin/

# Create service file
sudo nano /etc/systemd/system/node_exporter.service
```

```ini
[Unit]
Description=Node Exporter
After=network.target

[Service]
User=pi
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable node_exporter
sudo systemctl start node_exporter
```

Add to Prometheus config (`/etc/prometheus/prometheus.yml`):

```yaml
scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
```

#### Diagram: Monitoring Stack Architecture

<details markdown="1">
<summary>Grafana Monitoring Stack</summary>
Type: diagram

Purpose: Show how Prometheus collects metrics and Grafana displays them

Bloom Taxonomy: Understand (L2)

Learning Objective: Students will understand the data flow in a modern monitoring stack

Components:

1. Data Sources (left side)
   - Node Exporter (system metrics)
   - Pi-Hole Exporter (DNS metrics)
   - Other service exporters

2. Collection Layer (center-left)
   - Prometheus
   - Time-series database
   - Scrape targets every 15s

3. Visualization Layer (center-right)
   - Grafana
   - Dashboards and panels
   - Alerting rules

4. Output (right side)
   - Web browser dashboard
   - Email/Slack alerts
   - Mobile app notifications

Connections:
- Exporters expose /metrics endpoints
- Prometheus scrapes metrics periodically
- Grafana queries Prometheus
- Alerts trigger notifications

Data flow arrows showing:
- Metrics collection (pull model)
- Dashboard queries
- Alert notifications

Color scheme:
- Blue: Data sources
- Orange: Prometheus
- Green: Grafana
- Purple: Outputs

Implementation: Network diagram with icons
</details>

## Project 9: Portfolio Project

The ultimate capstone: create something uniquely yours that showcases your Linux skills. This could be for a college application, a job interview, or just personal satisfaction.

### Portfolio Project Ideas

Here are some ideas ranked by complexity:

**Beginner Projects:**

- Personal website with blog (Nginx + Hugo/Jekyll)
- Family photo gallery (PhotoPrism)
- Home automation dashboard (Home Assistant)

**Intermediate Projects:**

- Multi-service home server (combines several projects from this chapter)
- Discord/Slack bot running on Pi
- IoT sensor dashboard (temperature, humidity, motion)

**Advanced Projects:**

- Self-hosted Git server (Gitea)
- CI/CD pipeline for personal projects
- Custom smart home integration
- Machine learning inference server

### Documenting Your Project

A portfolio project isn't just about building—it's about showing what you learned:

1. **Write a README**: Explain what it does, why you built it, how to set it up
2. **Take Screenshots**: Document the UI, terminal output, network diagrams
3. **Record Video**: A 2-3 minute demo showing it in action
4. **List Challenges**: What problems did you solve? This shows growth!
5. **Share Code**: Push to GitHub with clear documentation

### Example Portfolio Structure

```markdown
# My Raspberry Pi Home Server

## Overview
A self-hosted home infrastructure including media streaming,
ad blocking, VPN access, and network storage.

## Services Running
- Pi-Hole for DNS-level ad blocking
- Jellyfin for media streaming
- WireGuard VPN for remote access
- Samba NAS for file sharing
- Grafana for monitoring

## Technologies Used
- Raspberry Pi 5 (8GB)
- Raspberry Pi OS Lite
- Docker for containerization
- systemd for service management

## What I Learned
- Linux system administration
- Networking and firewall configuration
- Container orchestration basics
- Monitoring and observability

## Screenshots
[Include dashboard screenshots, terminal output, etc.]

## Setup Instructions
[Step-by-step guide for recreation]
```

!!! success "You Built This!"
    Whatever you create, be proud of it. You've gone from "what is Linux?" to building real, functional systems. That's a huge accomplishment that most people never achieve. Own it!

## Putting It All Together

Let's look at how all these projects can work together in a complete home setup:

#### Diagram: Complete Home Server Infrastructure

<details markdown="1">
<summary>Integrated Home Server Network</summary>
Type: graph-model

Purpose: Show how all capstone projects integrate into a cohesive home infrastructure

Bloom Taxonomy: Analyze (L4)

Learning Objective: Students will analyze how different services interact and depend on each other in a complete home server setup

Node types:
1. Internet (cloud icon)
   - External connection point

2. Router (rectangle)
   - Port forwarding
   - DHCP pointing to Pi-Hole

3. Raspberry Pi(s) (circle, multiple possible)
   - Primary server
   - Optional secondary for redundancy

4. Services (squares with icons)
   - Pi-Hole (DNS)
   - WireGuard (VPN)
   - Nginx (Web)
   - Jellyfin (Media)
   - Minecraft (Game)
   - Samba (NAS)
   - Grafana (Monitoring)

5. Storage (cylinder)
   - External drive(s)
   - NAS storage

6. Client Devices (various icons)
   - Phone, laptop, TV, etc.

Edge types:
- Internet connection (thick blue line)
- DNS queries (dotted green lines to Pi-Hole)
- VPN tunnel (encrypted, red dashed line)
- Media streaming (orange lines)
- File access (purple lines)
- Monitoring (thin gray lines)

Layout: Hierarchical with internet at top, router below, Pi in center, clients around edges

Interactive features:
- Click service to highlight all its connections
- Hover for port numbers and protocols
- Toggle to show traffic flow animation

Sample data flow scenarios:
1. "Phone on public WiFi" - Shows VPN tunnel, then DNS through Pi-Hole
2. "Smart TV streaming" - Shows direct connection to Jellyfin
3. "Friend connecting to Minecraft" - Shows port forward path

Color scheme:
- Blue: External/Internet
- Green: DNS traffic
- Orange: Media traffic
- Red: VPN encrypted
- Purple: File sharing
- Gray: Monitoring

Implementation: vis-network with interactive legend
</details>

### Sample All-in-One Setup

Here's a script that sets up the foundation for multiple services:

```bash
#!/bin/bash
# home-server-setup.sh
# Sets up core services on a fresh Raspberry Pi

echo "=== Home Server Setup ==="
echo "This will install: Pi-Hole, Docker, and monitoring tools"
echo ""

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Pi-Hole
curl -sSL https://install.pi-hole.net | bash

# Install monitoring tools
sudo apt install prometheus prometheus-node-exporter -y

echo ""
echo "=== Setup Complete ==="
echo "Pi-Hole dashboard: http://$(hostname -I | cut -d' ' -f1)/admin"
echo "Prometheus: http://$(hostname -I | cut -d' ' -f1):9090"
echo ""
echo "Next steps:"
echo "1. Configure your router to use this Pi for DNS"
echo "2. Install additional services using Docker"
echo "3. Set up Grafana for dashboards"
```

## Key Takeaways

Congratulations, Linux champion! You've just completed the ultimate hands-on chapter. Here's what you can now build:

- **Web Servers**: Host websites with Nginx or Apache
- **Game Servers**: Run Minecraft servers for friends
- **Media Servers**: Stream your library with Plex or Jellyfin
- **Ad Blocking**: Clean up your network with Pi-Hole
- **VPN Access**: Secure remote access with WireGuard
- **Retro Gaming**: Play classics with RetroPie
- **Network Storage**: Centralize files with NAS/Samba
- **Monitoring**: Keep tabs on everything with dashboards

More importantly, you now have:

- Real-world Linux administration experience
- Networking knowledge that transfers to any IT role
- Projects to show off on your resume or college applications
- The confidence to tackle new Linux challenges

## What's Next?

The journey doesn't end here! Consider:

- **Containerizing** your services with Docker for easier management
- **Automating** deployments with Ansible or shell scripts
- **Hardening** security with firewalls, fail2ban, and regular updates
- **Expanding** with more Pis or cloud VMs
- **Contributing** to open source projects you've used
- **Teaching** others what you've learned

Remember: every Linux expert started exactly where you are now. The difference is they kept building, kept breaking things, and kept learning. Now go forth and create something awesome!

## Practice Exercises

??? question "Exercise 1: Mini Web Server Challenge"
    Set up Nginx to serve a personal portfolio page that includes:
    - Your name and a brief bio
    - Links to at least 3 projects you've built
    - A contact form (HTML only is fine)

    **Bonus**: Configure HTTPS using Let's Encrypt with Certbot.

??? question "Exercise 2: Pi-Hole Deep Dive"
    Install Pi-Hole and then:
    - Add 3 additional blocklists
    - Whitelist a domain that gets blocked incorrectly
    - Create a weekly report script that emails you statistics

    **Hint**: Pi-Hole stores data in SQLite at `/etc/pihole/pihole-FTL.db`

??? question "Exercise 3: Multi-Service Integration"
    Set up at least 3 services from this chapter that work together:
    - Example: Pi-Hole + WireGuard + Grafana
    - Document the setup with a network diagram
    - Explain how the services complement each other

??? question "Exercise 4: Portfolio Documentation"
    Choose your favorite project from this chapter and create complete documentation including:
    - README.md with setup instructions
    - Network diagram
    - Screenshot tour
    - Troubleshooting guide
    - Publish to GitHub

---

*You've reached the end of the capstone chapter, but this is just the beginning of your Linux journey. Every expert was once a beginner who refused to give up. Keep building, keep learning, and remember—the best way to learn Linux is to use Linux. Now go make something amazing!*

## References

1. [Nginx Official Documentation](https://nginx.org/en/docs/) - Complete guide to installing, configuring, and optimizing Nginx web servers with tutorials and examples.

2. [Apache HTTP Server Documentation](https://httpd.apache.org/docs/2.4/) - Official Apache documentation covering installation, virtual hosts, and security configuration.

3. [DigitalOcean - How To Set Up a Nginx Web Server](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04) - Step-by-step tutorial for deploying and configuring production-ready Nginx servers.

4. [Paper Minecraft Server Documentation](https://docs.papermc.io/) - Guide to running optimized Minecraft servers with performance tuning tips for Raspberry Pi.

5. [Jellyfin Documentation](https://jellyfin.org/docs/) - Complete guide to setting up and configuring the free, open-source media server.

6. [Plex Support - Getting Started](https://support.plex.tv/articles/) - Official tutorials for installing and managing Plex media servers.

7. [Pi-hole Official Documentation](https://docs.pi-hole.net/) - Comprehensive guide to network-wide ad blocking, DNS configuration, and advanced features.

8. [WireGuard Quick Start Guide](https://www.wireguard.com/quickstart/) - Official documentation for setting up fast, secure VPN servers and clients.

9. [PiVPN Documentation](https://docs.pivpn.io/) - Easy-to-follow guide for installing WireGuard VPNs on Raspberry Pi systems.

10. [RetroPie Official Documentation](https://retropie.org.uk/docs/) - Complete guide to building retro gaming systems with emulator configuration and ROM management.

11. [OpenMediaVault Documentation](https://docs.openmediavault.org/) - Guide to setting up network-attached storage with web-based management interface.

12. [Samba File Sharing Guide](https://ubuntu.com/tutorials/install-and-configure-samba) - Tutorial for configuring cross-platform file sharing with Windows, Mac, and Linux clients.

13. [Grafana Getting Started Guide](https://grafana.com/docs/grafana/latest/getting-started/) - Official documentation for building monitoring dashboards and visualizing metrics.

14. [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/) - Guide to metrics collection, querying, and alerting for system monitoring.

15. [Linux Foundation - Self-Hosted Services Guide](https://www.linuxfoundation.org/) - Resources on building and maintaining home server infrastructure.

16. [r/selfhosted Reddit Community](https://www.reddit.com/r/selfhosted/) - Active community sharing projects, tutorials, and troubleshooting for self-hosted services.

17. [Awesome-Selfhosted GitHub List](https://github.com/awesome-selfhosted/awesome-selfhosted) - Curated list of free software and services you can host yourself with installation guides.

18. [LinuxServer.io Documentation](https://docs.linuxserver.io/) - Docker container guides for easy deployment of media servers, VPNs, and network services.

19. [TecMint - Linux Server Projects](https://www.tecmint.com/category/web-servers/) - Collection of tutorials on web servers, game servers, and home lab projects.

20. [Raspberry Pi Projects - Server Edition](https://projects.raspberrypi.org/en/projects?hardware%5B%5D=raspberry-pi) - Official Raspberry Pi project ideas including web servers, media centers, and network services.
