# Introduction to Raspberry Pi

## Summary

This chapter introduces the Raspberry Pi, an affordable single-board computer perfect for learning Linux. You'll learn about different Pi models (Zero, 4, 5, and the new 500), how to set up Raspberry Pi OS, and understand the hardware interfaces including GPIO headers, USB, HDMI, and networking ports. The Raspberry Pi makes Linux tangible and opens doors to hardware projects.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Raspberry Pi
2. Raspberry Pi Models
3. Raspberry Pi Zero
4. Raspberry Pi 4
5. Raspberry Pi 5
6. Raspberry Pi 500
7. Raspberry Pi OS
8. Pi Imager
9. SD Card Setup
10. Pi First Boot
11. Raspi-Config
12. Pi Desktop
13. Pi Terminal
14. Pi GPIO Header
15. GPIO Pins
16. GPIO Voltage
17. GPIO Ground Pins
18. GPIO Power Pins
19. GPIO Data Pins
20. Pi Camera Module
21. Pi USB Ports
22. Pi HDMI Ports
23. Pi Ethernet Port
24. Pi WiFi
25. Pi Bluetooth

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Operating Systems and UNIX History](../01-unix-history/index.md)
- [Chapter 2: Getting Started with the Terminal](../02-terminal-basics/index.md)
- [Chapter 15: Networking Fundamentals](../15-networking/index.md)

---

## Your Pocket-Sized Linux Computer!

Welcome to one of the most exciting chapters in this book! We're going to talk about the **Raspberry Pi**—a tiny computer that costs less than a video game but can teach you more about Linux than almost anything else. It's like having a full Linux workstation that fits in your pocket!

Why is the Raspberry Pi so amazing for learning Linux? Because it's *real hardware* that you can touch, break, fix, and experiment with. You can't accidentally destroy your family's computer when you're learning—you just reflash an SD card and start over. It's the ultimate Linux playground!

> "The best way to learn Linux is to have a computer you're not afraid to break."
> — Every Linux teacher ever

## What is a Raspberry Pi?

The **Raspberry Pi** is a **single-board computer (SBC)** developed by the Raspberry Pi Foundation in the UK. Unlike your laptop or desktop that has a case, power supply, cooling system, and separate circuit boards, the Raspberry Pi puts *everything* on one credit-card-sized board.

Here's what makes it special:

| Feature | Description |
|---------|-------------|
| Size | Credit card (85mm × 56mm) |
| Price | $35-$80 for most models |
| Power | 5V USB-C (like your phone!) |
| OS | Runs full Linux (Raspberry Pi OS) |
| GPIO | 40 pins to connect to real-world hardware |
| Community | Millions of users, endless projects |

The name "Raspberry Pi" follows the tradition of naming computers after fruits (Apple, anyone?), and "Pi" refers to Python—the programming language it was designed to teach.

!!! success "Pi Pun Alert"
    Why did the Raspberry Pi go to therapy? It had too many kernel panics! 🥧

## Raspberry Pi Models: From Zero to Hero

The Raspberry Pi family has grown over the years. Let's meet the whole gang!

### The Raspberry Pi Zero: The Tiny Titan

The **Raspberry Pi Zero** is the smallest and cheapest Pi, about the size of a stick of gum. At just $5-$15, it's perfect for embedded projects where you need a computer but have limited space.

| Model | Price | RAM | Best For |
|-------|-------|-----|----------|
| Zero | $5 | 512MB | Simple embedded projects |
| Zero W | $10 | 512MB | WiFi-enabled IoT projects |
| Zero 2 W | $15 | 512MB | Faster projects needing WiFi |

The Zero is great for:
- LED displays and signs
- Weather stations
- Simple robots
- Home automation sensors
- Hidden retro gaming consoles

**Limitations:** No Ethernet, limited RAM, slower CPU. Not ideal for desktop use.

### The Raspberry Pi 4: The Workhorse

The **Raspberry Pi 4** was released in 2019 and was a *huge* upgrade from the Pi 3. It brought USB 3.0, dual 4K HDMI outputs, and up to 8GB of RAM. For the first time, people started using Pis as actual desktop computers!

| Feature | Raspberry Pi 4 |
|---------|----------------|
| CPU | Quad-core Cortex-A72 @ 1.5GHz |
| RAM | 1GB, 2GB, 4GB, or 8GB |
| USB | 2× USB 3.0, 2× USB 2.0 |
| Video | 2× micro-HDMI (4K) |
| Network | Gigabit Ethernet, WiFi 5, Bluetooth 5 |

The Pi 4 served us well for years, but it had a problem: **I/O bottlenecks**.

You see, the Pi 4's Broadcom chip handled *everything*—CPU processing, GPU graphics, USB traffic, Ethernet packets, and more. When you tried to push data through USB 3.0 while running something CPU-intensive, performance would tank. The CPU was constantly interrupted to babysit data transfers.

It's like having one person at a restaurant who's simultaneously the chef, waiter, host, and dishwasher. Sure, they can do it all, but they're exhausted and nothing runs smoothly!

### The Raspberry Pi 5: Enter the RP1 Revolution! 🚀

The **Raspberry Pi 5** isn't just an incremental upgrade—it's a *complete reimagining* of what a Raspberry Pi can be. And the secret weapon? A brand new custom chip called the **RP1**.

#### The RP1: A Dedicated I/O Champion

Here's what makes the Pi 5 revolutionary: **the RP1 is a dedicated I/O controller chip** that handles *all* peripheral communication independently. This means the main CPU never has to stop what it's doing to shuffle data around!

Think of it this way:

- **Pi 4:** One overworked brain doing everything
- **Pi 5:** A smart CEO (CPU) with a dedicated assistant (RP1) handling all the logistics

The RP1 handles:

| Function | What It Does |
|----------|--------------|
| USB 3.0 × 2 | High-speed device connections |
| USB 2.0 × 2 | Keyboards, mice, and more |
| Gigabit Ethernet | Network traffic at full speed |
| GPIO | All 40 pins with faster access |
| PCIe 2.0 × 1 | **NVMe SSD support!** |
| MIPI interfaces | Camera and display ports |

#### Real Performance Gains

Let me paint you a picture of what this means in practice:

**Scenario: Copying files from an NVMe SSD while running a web server**

| Metric | Pi 4 | Pi 5 |
|--------|------|------|
| CPU usage during copy | 70-80% | 15-20% |
| Transfer speed | Limited by CPU | Full NVMe speed (800+ MB/s) |
| Web server response | Sluggish | Snappy |
| Can you game while copying? | Barely | Absolutely! |

The RP1 makes old bottlenecks disappear. It's like the difference between a two-lane country road and an eight-lane highway—the same cars (data) can now move without traffic jams!

#### Pi 5 Full Specs

| Feature | Raspberry Pi 5 |
|---------|----------------|
| CPU | Quad-core Cortex-A76 @ 2.4GHz |
| RAM | 4GB or 8GB LPDDR4X |
| I/O Chip | RP1 (custom Southbridge) |
| USB | 2× USB 3.0, 2× USB 2.0 (via RP1) |
| Video | 2× micro-HDMI (4K60) |
| Storage | PCIe 2.0 x1 for NVMe SSD |
| Network | Gigabit Ethernet, WiFi 5, Bluetooth 5 |
| Power | USB-C with PD support (5V/5A recommended) |
| RTC | Real-time clock with battery backup |

!!! tip "Pro Tip: The NVMe Game Changer"
    Add a cheap NVMe HAT and a 256GB SSD to your Pi 5, and you'll get boot times under 10 seconds and application launches that feel instant. It's like going from a bicycle to a sports car!

### The Raspberry Pi 500: Your New Desktop Computer! 🖥️

Now THIS is exciting. The **Raspberry Pi 500** takes everything great about the Pi 5 and puts it inside a keyboard—just like the classic computers of the 1980s (Commodore 64, anyone?).

#### Pi 500: A Real Desktop Replacement

Here's the mind-blowing part: **a fully loaded Raspberry Pi 500 with 16GB of RAM costs about $300** and can genuinely replace a desktop computer for many people!

| Component | Pi 500 Package | Typical Desktop |
|-----------|----------------|-----------------|
| Computer | Built into keyboard | Separate tower |
| RAM | 8GB or 16GB | 8-16GB |
| Storage | Add NVMe SSD | SSD included |
| Monitor | Add any HDMI display | Separate purchase |
| Mouse | Included | Included |
| Power Supply | Included | Included |
| Total Cost | ~$300 (16GB + accessories) | $600-$1000+ |

What can you do with a Pi 500?

- **Web browsing** with dozens of tabs
- **Office work** (LibreOffice, Google Docs)
- **Programming** (VS Code, Python, Node.js)
- **Media streaming** (YouTube, Netflix at 4K)
- **Light gaming** (retro emulation, Minecraft)
- **Learning Linux** (obviously!)

#### The I/O Chip Advantage

Here's a secret that computer architects know: **a great I/O chip can make even modest CPUs shine**. The Pi 5 and Pi 500's RP1 chip proves this beautifully.

The Cortex-A76 CPU in the Pi 5/500 isn't the fastest processor ever made—modern laptops have faster chips. But because the RP1 handles all the I/O independently, the CPU can focus 100% on running your applications. No interruptions, no context switching to handle USB packets, no stalls waiting for disk data.

It's like the difference between:
- A fast runner carrying their own luggage (Pi 4)
- A fast runner with a dedicated support team handling everything else (Pi 5)

The second runner will *always* win the race!

!!! success "Pi 500 Reality Check"
    I'm not saying a Pi 500 will replace a gaming PC or a video editing workstation. But for students, teachers, casual users, and anyone learning Linux? It's genuinely all you need.

## Raspberry Pi OS: Linux Made Friendly

**Raspberry Pi OS** (formerly called Raspbian) is the official operating system for the Raspberry Pi. It's based on Debian Linux, which means everything you've learned in this book applies directly!

### Why Raspberry Pi OS?

| Feature | Benefit |
|---------|---------|
| Debian-based | apt, dpkg, and all familiar tools |
| ARM optimized | Built specifically for Pi hardware |
| Beginner-friendly | Desktop environment, tutorials |
| Full access | Terminal, root, everything |
| Huge community | If you have a question, someone's answered it |

Raspberry Pi OS comes in three flavors:

| Version | Description |
|---------|-------------|
| Raspberry Pi OS with Desktop | Full GUI experience |
| Raspberry Pi OS Lite | Terminal only, minimal |
| Raspberry Pi OS Full | Desktop + recommended software |

For learning Linux, I recommend starting with **Desktop** so you have a familiar GUI, then gradually spending more time in the terminal until you're comfortable with **Lite**.

## The Pi Imager: Your SD Card Setup Tool

Gone are the days of manually downloading images and using command-line tools to flash SD cards! The **Raspberry Pi Imager** is the official tool for setting up your Pi.

### Installing Pi Imager

Download it from [raspberrypi.com/software](https://www.raspberrypi.com/software/) for:
- Windows
- macOS
- Ubuntu/Debian Linux

### Using Pi Imager

Here's the basic workflow:

1. **Insert your SD card** (8GB minimum, 32GB recommended)
2. **Launch Raspberry Pi Imager**
3. **Choose OS:** Click "Choose OS" and select Raspberry Pi OS
4. **Choose Storage:** Select your SD card
5. **Advanced Options:** Click the gear icon ⚙️ for extra settings

The Advanced Options menu is *incredibly* useful:

| Option | What It Does |
|--------|--------------|
| Set hostname | Give your Pi a network name |
| Enable SSH | Remote access from day one |
| Set username/password | Security first! |
| Configure WiFi | Connect automatically on boot |
| Set locale | Timezone and keyboard layout |

!!! tip "Pre-configure Everything!"
    Use the Advanced Options to set up SSH, WiFi, and a password *before* first boot. This way, you can run your Pi "headless" (no monitor) and connect via SSH immediately.

### SD Card Selection Tips

Not all SD cards are created equal! For Raspberry Pi use:

| Rating | Meaning | Recommendation |
|--------|---------|----------------|
| Class 10 | Minimum speed guarantee | Acceptable |
| UHS-I U1 | 10 MB/s minimum | Good |
| UHS-I U3 | 30 MB/s minimum | Better |
| A1/A2 | Optimized for random I/O | **Best for Pi!** |

Look for cards with the **A1** or **A2** rating—they're specifically designed for the kind of random read/write operations that operating systems need.

## Pi First Boot: The Moment of Truth!

You've flashed your SD card—now let's bring your Pi to life!

### What Happens at First Boot

1. **Power LED lights up** (red = power)
2. **Activity LED blinks** (green = SD card access)
3. **File system expands** to fill the SD card
4. **Initial setup wizard** runs (if using desktop)

If you see the desktop or can SSH in, congratulations! You have a working Linux computer!

### First Boot Checklist

```sh
# Update your system immediately!
sudo apt update && sudo apt upgrade -y

# Check your Pi's temperature
vcgencmd measure_temp

# See how much memory you have
free -h

# Check storage space
df -h

# Find your IP address
hostname -I
```

!!! warning "Cooling Matters!"
    The Pi 5 runs hot, especially under load. Consider a heatsink or fan case. If `vcgencmd measure_temp` shows above 80°C, your Pi is throttling!

## Raspi-Config: The System Configuration Tool

**Raspi-config** is your one-stop shop for configuring Raspberry Pi-specific settings. It's a text-based menu that makes system administration easy.

### Launching Raspi-Config

```sh
sudo raspi-config
```

### Key Options

| Menu Item | What You Can Configure |
|-----------|------------------------|
| System Options | Password, hostname, boot behavior |
| Display Options | Resolution, overscan, blanking |
| Interface Options | SSH, VNC, SPI, I2C, camera |
| Performance Options | GPU memory, fan control |
| Localisation | Timezone, keyboard, WiFi country |
| Advanced Options | Expand filesystem, boot order |

### Common Configuration Tasks

**Enable SSH for remote access:**
```
Interface Options → SSH → Enable
```

**Enable I2C for sensors:**
```
Interface Options → I2C → Enable
```

**Change boot order to NVMe:**
```
Advanced Options → Boot Order → NVMe/USB Boot
```

**Set GPU memory (for headless servers):**
```
Performance Options → GPU Memory → 16
```

## The Pi Desktop: Your Graphical Playground

Raspberry Pi OS Desktop gives you a full graphical environment based on the lightweight **LXDE** desktop (now using the Wayland display server on Pi 5).

### Desktop Features

| Feature | Description |
|---------|-------------|
| File Manager | PCManFM for browsing files |
| Web Browser | Chromium (optimized for Pi) |
| Terminal | LXTerminal for command-line access |
| Text Editor | Mousepad, Geany, or Thonny |
| Office | LibreOffice available |
| Programming | Python, Scratch, Node.js |

### Customizing Your Desktop

Right-click on the desktop to access:
- Desktop preferences
- Appearance settings
- Panel preferences
- Add widgets

The default theme is clean and fast, but feel free to make it your own!

## The Pi Terminal: Where the Magic Happens

While the desktop is nice, the **Pi Terminal** is where you'll spend most of your time as a Linux learner. Everything you've learned in this book works here!

### Opening the Terminal

- Click the terminal icon in the taskbar
- Or press `Ctrl + Alt + T`
- Or find it in the menu: Accessories → Terminal

### Pi-Specific Commands

The Raspberry Pi includes some special commands:

| Command | Purpose |
|---------|---------|
| `vcgencmd measure_temp` | CPU temperature |
| `vcgencmd get_throttled` | Throttling status |
| `vcgencmd measure_volts` | Voltage readings |
| `raspi-config` | System configuration |
| `pinout` | GPIO pinout diagram |
| `raspinfo` | Generate support info |

### Example Terminal Session

```sh
# What Pi model am I running?
cat /proc/device-tree/model

# How hot is my CPU?
vcgencmd measure_temp

# What's my current clock speed?
vcgencmd measure_clock arm

# Is my Pi throttling?
vcgencmd get_throttled
# 0x0 = no throttling, perfect!
# 0x50000 = previously throttled
# 0x50005 = currently throttling!

# GPIO pinout diagram right in terminal!
pinout
```

## GPIO: General Purpose Input/Output

Now we're getting to the really fun stuff! The **GPIO header** is what makes the Raspberry Pi special for hardware projects. It's a row of 40 metal pins that let you connect your Pi to the physical world.

### The Pi GPIO Header

The 40-pin GPIO header has been the same since the Pi 1 Model B+, which means projects and accessories are compatible across generations!

```
                     3.3V  (1) (2)  5V
                   GPIO2  (3) (4)  5V
                   GPIO3  (5) (6)  GND
                   GPIO4  (7) (8)  GPIO14
                     GND  (9) (10) GPIO15
                  GPIO17 (11) (12) GPIO18
                  GPIO27 (13) (14) GND
                  GPIO22 (15) (16) GPIO23
                    3.3V (17) (18) GPIO24
                  GPIO10 (19) (20) GND
                   GPIO9 (21) (22) GPIO25
                  GPIO11 (23) (24) GPIO8
                     GND (25) (26) GPIO7
                   GPIO0 (27) (28) GPIO1
                   GPIO5 (29) (30) GND
                   GPIO6 (31) (32) GPIO12
                  GPIO13 (33) (34) GND
                  GPIO19 (35) (36) GPIO16
                  GPIO26 (37) (38) GPIO20
                     GND (39) (40) GPIO21
```

!!! tip "Use the pinout Command!"
    Just type `pinout` in the terminal for a color-coded, interactive GPIO diagram!

### Types of GPIO Pins

The 40 pins serve different purposes:

#### GPIO Power Pins

| Pin Type | Pins | Description |
|----------|------|-------------|
| 5V | 2, 4 | 5V power output (or input!) |
| 3.3V | 1, 17 | 3.3V regulated power |

**Warning:** These can supply power *or* receive it. Be careful not to short them!

#### GPIO Ground Pins

| Pin Type | Pins |
|----------|------|
| GND | 6, 9, 14, 20, 25, 30, 34, 39 |

There are 8 ground pins scattered around the header. You'll use these a lot—every circuit needs a common ground!

#### GPIO Data Pins

The remaining 26 pins are programmable data pins that can be:
- **Input:** Read button presses, sensors
- **Output:** Control LEDs, motors, relays
- **Special functions:** I2C, SPI, UART serial

### GPIO Voltage: The 3.3V Rule!

!!! danger "Critical Safety Warning!"
    Raspberry Pi GPIO pins operate at **3.3V logic levels**. Connecting 5V directly to a GPIO data pin will **permanently damage your Pi**!

| Voltage | Safe? |
|---------|-------|
| 0-3.3V | ✅ Safe |
| 5V | ❌ **WILL DAMAGE YOUR PI!** |

This is the single most important thing to remember about GPIO. Many Arduino sensors and modules are 5V, so you need:
- 3.3V compatible components, OR
- **Level shifters** to convert 5V signals to 3.3V

### Your First GPIO Project: Blinking an LED

Here's the "Hello World" of hardware projects:

**Components needed:**
- 1 LED (any color)
- 1 resistor (330Ω)
- 2 jumper wires

**Wiring:**
1. Connect LED positive leg (longer) to GPIO17 (pin 11)
2. Connect resistor between LED negative leg and GND (pin 9)

**Python code:**

```python
#!/usr/bin/env python3
# blink.py - Hello World for GPIO!

from gpiozero import LED
from time import sleep

# LED connected to GPIO17
led = LED(17)

print("Blinking LED! Press Ctrl+C to stop.")

while True:
    led.on()
    print("LED is ON")
    sleep(1)

    led.off()
    print("LED is OFF")
    sleep(1)
```

Run it:
```sh
python3 blink.py
```

Your LED should blink on and off every second! You just controlled hardware with Linux!

### GPIO Communication Protocols

Some GPIO pins have special alternate functions:

| Protocol | Pins | Use Case |
|----------|------|----------|
| I2C | GPIO2 (SDA), GPIO3 (SCL) | Sensors, displays, RTCs |
| SPI | GPIO10 (MOSI), GPIO9 (MISO), GPIO11 (SCLK), GPIO8 (CE0), GPIO7 (CE1) | Fast peripherals, ADCs |
| UART | GPIO14 (TX), GPIO15 (RX) | Serial communication |
| PWM | GPIO12, GPIO13, GPIO18, GPIO19 | Motor speed, LED brightness |

**I2C** is especially popular because you can connect many devices to just two wires!

## The Pi Camera Module

The **Pi Camera Module** connects to a special CSI (Camera Serial Interface) port on the Pi. It's not a USB webcam—it has a dedicated high-bandwidth connection!

### Camera Versions

| Model | Resolution | Features |
|-------|------------|----------|
| Camera Module v1 | 5MP | Original, discontinued |
| Camera Module v2 | 8MP | Sony sensor, great quality |
| Camera Module v3 | 12MP | Autofocus, HDR, wide version |
| HQ Camera | 12.3MP | Interchangeable C/CS lenses |

### Taking Photos

```sh
# Capture a photo
libcamera-still -o photo.jpg

# Capture with 2-second delay
libcamera-still -o photo.jpg -t 2000

# Capture at specific resolution
libcamera-still -o photo.jpg --width 1920 --height 1080
```

### Recording Video

```sh
# Record 10 seconds of video
libcamera-vid -o video.h264 -t 10000

# Record with preview
libcamera-vid -o video.h264 -t 10000 --preview
```

### Time-Lapse Photography

```sh
# Take a photo every 30 seconds for an hour
libcamera-still -o image_%04d.jpg --timelapse 30000 -t 3600000
```

This is perfect for plant growth videos, cloud movements, or documenting a build project!

## Pi USB Ports: Connecting Your World

The Raspberry Pi's USB ports let you connect keyboards, mice, storage, and more.

### USB Port Comparison

| Model | USB 3.0 | USB 2.0 | Total Power |
|-------|---------|---------|-------------|
| Pi 4 | 2 | 2 | ~1.2A shared |
| Pi 5 | 2 | 2 | ~1.6A (via RP1) |
| Pi 500 | 2 | 1 | ~1.6A |

### Common USB Devices

| Device | USB Version | Notes |
|--------|-------------|-------|
| Keyboard/Mouse | 2.0 | Use USB 2.0 ports |
| USB Flash Drive | 2.0/3.0 | 3.0 recommended for speed |
| USB SSD | 3.0 | External storage solution |
| USB WiFi Adapter | 2.0 | If built-in WiFi insufficient |
| USB Sound Card | 2.0 | The Pi has no built-in audio input |

!!! tip "USB 3.0 for Speed!"
    Always connect storage devices to the blue USB 3.0 ports for maximum speed. The Pi 5's USB 3.0 can hit 400+ MB/s with the right device!

## Pi HDMI Ports: Dual Display Power

The Raspberry Pi 4 and 5 both support **dual 4K displays** via micro-HDMI ports.

### HDMI Specs

| Model | Ports | Resolution | Notes |
|-------|-------|------------|-------|
| Pi 4 | 2× micro-HDMI | 4K30 or dual 1080p60 | Simultaneous dual display |
| Pi 5 | 2× micro-HDMI | 4K60 each | Full dual 4K support |
| Pi 500 | 2× micro-HDMI | 4K60 each | Built into keyboard |

### HDMI Cables

You'll need **micro-HDMI to HDMI** cables. Don't confuse these with:
- Mini-HDMI (different size)
- Standard HDMI (too big)

### Setting Resolution

Use `raspi-config` or edit `/boot/firmware/config.txt`:

```sh
# Force 1080p output
hdmi_mode=16
hdmi_group=1

# Force 4K output
hdmi_mode=97
hdmi_group=1
```

## Pi Ethernet Port: Wired Networking

For the most reliable network connection, nothing beats **Gigabit Ethernet**.

### Ethernet Features

| Model | Speed | Controller |
|-------|-------|------------|
| Pi 4 | 1 Gbps | Via USB 3.0 controller |
| Pi 5 | 1 Gbps | Via RP1 (true native!) |

The Pi 5's Ethernet through the RP1 chip means:
- Lower CPU usage during transfers
- Consistent full-speed performance
- No contention with USB devices

### Checking Your Connection

```sh
# Check link status
ethtool eth0

# Check IP address
ip addr show eth0

# Test connection
ping -c 4 google.com
```

## Pi WiFi: Wireless Freedom

Built-in WiFi makes the Raspberry Pi perfect for headless projects.

### WiFi Specs

| Model | WiFi Version | Frequency |
|-------|--------------|-----------|
| Pi 4 | WiFi 5 (802.11ac) | 2.4GHz + 5GHz |
| Pi 5 | WiFi 5 (802.11ac) | 2.4GHz + 5GHz |
| Pi 500 | WiFi 5 (802.11ac) | 2.4GHz + 5GHz |

### Connecting to WiFi

**Method 1: During imaging** (recommended)
Use the Pi Imager's advanced settings to configure WiFi before first boot.

**Method 2: Command line**
```sh
# Scan for networks
sudo iwlist wlan0 scan | grep ESSID

# Connect using nmcli
sudo nmcli device wifi connect "YourNetworkName" password "YourPassword"

# Check connection
iwconfig wlan0
```

**Method 3: Edit configuration files**
```sh
# Create or edit wpa_supplicant.conf
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```

Add:
```
network={
    ssid="YourNetworkName"
    psk="YourPassword"
    key_mgmt=WPA-PSK
}
```

### WiFi Tips

| Issue | Solution |
|-------|----------|
| Weak signal | Use 2.4GHz, add external antenna |
| Dropouts | Use static IP, disable power saving |
| Slow speeds | Use 5GHz band, check interference |

## Pi Bluetooth: Wireless Peripherals

Bluetooth 5.0 on the Pi 4/5 supports:
- Wireless keyboards and mice
- Game controllers
- Audio devices (speakers, headphones)
- BLE (Bluetooth Low Energy) sensors

### Pairing Devices

**Graphical method:**
Click the Bluetooth icon in the panel → Add Device

**Command line method:**
```sh
# Start Bluetooth control
bluetoothctl

# Enable scanning
scan on

# Look for your device, then pair
pair XX:XX:XX:XX:XX:XX

# Trust for automatic reconnection
trust XX:XX:XX:XX:XX:XX

# Connect
connect XX:XX:XX:XX:XX:XX

# Exit
exit
```

## Fun Project Ideas

Now that you know the hardware, here are some projects to try:

### Beginner Projects
1. **LED traffic light** - Three LEDs, simple GPIO
2. **Button counter** - Count button presses, display on screen
3. **Temperature logger** - DHT11/22 sensor, log to file
4. **Pi-hole** - Network-wide ad blocker

### Intermediate Projects
5. **Weather station** - Multiple sensors, web dashboard
6. **Security camera** - Pi Camera + motion detection
7. **Retro gaming console** - RetroPie for classic games
8. **Home automation hub** - Home Assistant on Pi

### Advanced Projects
9. **Kubernetes cluster** - Multiple Pis running containers
10. **NAS server** - Network storage with OpenMediaVault
11. **Robot** - Motors, sensors, camera, AI
12. **Smart mirror** - Display behind two-way mirror

## Review Questions

<details markdown="1">
<summary>What is the RP1 chip in the Raspberry Pi 5, and why is it important?</summary>

The RP1 is a custom I/O controller chip that handles all peripheral communication (USB, Ethernet, GPIO, PCIe) independently from the main CPU. This frees the CPU from interrupt handling and data shuffling, dramatically improving performance when using multiple peripherals simultaneously. It's why the Pi 5 can transfer files at full NVMe speed while still being responsive for other tasks.
</details>

<details markdown="1">
<summary>What voltage do Raspberry Pi GPIO data pins operate at, and why is this important?</summary>

Raspberry Pi GPIO data pins operate at 3.3V logic levels. This is critically important because connecting 5V directly to a GPIO data pin will permanently damage the Raspberry Pi. When using 5V sensors or modules (common with Arduino), you must use level shifters or choose 3.3V compatible components.
</details>

<details markdown="1">
<summary>How do you set up SSH and WiFi before the first boot using Pi Imager?</summary>

In Pi Imager, after selecting your OS and storage, click the gear icon (⚙️) to access Advanced Options. Here you can enable SSH (and optionally set an authorized key), configure WiFi with your network name and password, set a username and password, and configure locale settings. This allows you to boot the Pi "headless" and connect remotely without ever connecting a monitor.
</details>

<details markdown="1">
<summary>Why might a $300 Raspberry Pi 500 with 16GB RAM replace a traditional desktop for many users?</summary>

The Pi 500 provides sufficient power for common tasks like web browsing (including dozens of tabs), office work (LibreOffice, Google Docs), programming (VS Code, Python, Node.js), and media streaming (4K YouTube, Netflix). The RP1 I/O chip ensures responsive performance by offloading peripheral handling from the CPU. Combined with an NVMe SSD, it offers fast boot times and snappy application launches. For students, casual users, and Linux learners, it provides everything needed at a fraction of desktop computer costs.
</details>

<details markdown="1">
<summary>What is the difference between the Camera Serial Interface (CSI) and a USB webcam?</summary>

The CSI port provides a dedicated high-bandwidth connection directly to the Pi's GPU, enabling hardware-accelerated video encoding and efficient processing. USB webcams share bandwidth with other USB devices and require more CPU overhead for processing. CSI cameras offer lower latency, higher frame rates, and less CPU usage, making them ideal for video projects, machine learning applications, and time-lapse photography.
</details>

---

## Chapter Summary

You've just learned about one of the most important tools in your Linux journey—the Raspberry Pi! From the tiny Zero to the desktop-replacing Pi 500, these little computers make Linux tangible and approachable.

Key takeaways:

- **The RP1 chip** in Pi 5/500 is a game-changer that makes modest hardware perform brilliantly
- **GPIO pins** let you connect to the physical world and build real projects
- **Raspberry Pi OS** is Debian-based, so everything you've learned applies
- **A Pi 500 with 16GB RAM** is a legitimate desktop computer for most tasks
- **The community** is huge—if you can imagine a project, someone's probably done it

The Raspberry Pi isn't just a learning tool—it's a gateway to understanding how computers really work, from the operating system down to the metal. Now go build something amazing! 🥧🐧

## References

1. [Raspberry Pi Official Documentation](https://www.raspberrypi.com/documentation/) - Comprehensive official documentation covering hardware, software, and getting started guides for all Raspberry Pi models.
2. [Raspberry Pi Imager Download](https://www.raspberrypi.com/software/) - Official tool for writing operating systems to SD cards with advanced configuration options.
3. [Raspberry Pi OS Documentation](https://www.raspberrypi.com/documentation/computers/os.html) - Complete guide to using Raspberry Pi OS including raspi-config, networking, and system administration.
4. [GPIO Pin Reference - Pinout.xyz](https://pinout.xyz/) - Interactive GPIO pinout diagram showing all 40 pins with detailed descriptions and functions.
5. [Raspberry Pi 5 Release Announcement](https://www.raspberrypi.com/news/introducing-raspberry-pi-5/) - Official announcement detailing the RP1 I/O chip and performance improvements.
6. [Understanding the RP1 Chip](https://www.raspberrypi.com/documentation/microcontrollers/rp1.html) - Technical documentation explaining the custom I/O controller in Raspberry Pi 5.
7. [Raspberry Pi Camera Module Guide](https://www.raspberrypi.com/documentation/accessories/camera.html) - How to use the Camera Module with libcamera commands for photos and videos.
8. [SSH Setup on Raspberry Pi](https://www.raspberrypi.com/documentation/computers/remote-access.html) - Enable and configure SSH for headless operation and remote access.
9. [Raspberry Pi Power Supply Guide](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#power-supply) - Official recommendations for power supplies including USB-C PD requirements for Pi 5.
10. [GeeksforGeeks: Introduction to Raspberry Pi](https://www.geeksforgeeks.org/introduction-to-raspberry-pi/) - Beginner-friendly introduction to Raspberry Pi hardware and use cases.
11. [SparkFun: Raspberry Pi GPIO Tutorial](https://learn.sparkfun.com/tutorials/raspberry-gpio) - Hands-on tutorial for understanding and using GPIO pins safely.
12. [Adafruit: Raspberry Pi Lesson 1 - Setup](https://learn.adafruit.com/series/learn-raspberry-pi) - Step-by-step lessons for setting up and using your first Raspberry Pi.
13. [Raspberry Pi Foundation Projects](https://projects.raspberrypi.org/en/) - Free project tutorials for beginners through advanced users covering hardware and software.
14. [MagPi Magazine](https://magpi.raspberrypi.com/) - Official Raspberry Pi magazine with monthly projects, tutorials, and reviews.
15. [Tom's Hardware: Raspberry Pi Setup Guide](https://www.tomshardware.com/how-to/set-up-raspberry-pi) - Detailed setup guide with troubleshooting tips and best practices.
16. [Wikipedia: Raspberry Pi](https://en.wikipedia.org/wiki/Raspberry_Pi) - Comprehensive history, models comparison, and technical specifications.
17. [Raspberry Pi NVMe Base](https://www.raspberrypi.com/products/m2-hat-plus/) - Official NVMe HAT for adding SSD storage to Raspberry Pi 5.
18. [DigitalOcean: Raspberry Pi Initial Setup](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-raspberry-pi) - Community tutorial for initial configuration and security hardening.
19. [Raspberry Pi Cooling Solutions](https://www.raspberrypi.com/products/active-cooler/) - Official active cooler and thermal management for Raspberry Pi 5.
20. [Jeff Geerling's Raspberry Pi Blog](https://www.jeffgeerling.com/blog/raspberry-pi) - In-depth technical articles, benchmarks, and advanced Raspberry Pi projects.
