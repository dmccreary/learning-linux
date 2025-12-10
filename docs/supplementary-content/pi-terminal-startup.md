# Automating Raspberry Pi Terminal Windows on Startup

This guide explains how to automatically open and configure multiple terminal windows with specific sizes, positions, and commands when you log into Raspberry Pi OS. This is the companion guide to [macOS Terminal Startup](./macos-terminal-startup.md).

## Overview

Using shell scripts with LXTerminal options and the `wmctrl` window management tool, you can:

- Open multiple terminal windows automatically
- Position and size windows precisely on your screen
- Run startup commands in each window
- Execute this setup on login

## Prerequisites

- Raspberry Pi running Raspberry Pi OS (Bookworm, Bullseye, or Buster)
- LXTerminal (installed by default on Raspberry Pi OS Desktop)
- Optional: `wmctrl` for precise window positioning

Install wmctrl if you need pixel-precise window control:

```bash
sudo apt update
sudo apt install wmctrl
```

## Understanding Screen Coordinates

Terminal window positioning uses screen coordinates:

```
(0,0) -----> X increases
  |
  |
  v
  Y increases
```

- **Origin (0,0)** is the top-left corner of the screen
- **X** increases moving right
- **Y** increases moving down
- **Panel** is typically at the top (about 30 pixels tall)

## Method 1: LXTerminal Geometry Options

LXTerminal supports geometry flags directly, making simple layouts easy without additional tools.

### Geometry Format

The `--geometry` option uses the format: `COLSxROWS+X+Y`

- `COLS` = width in characters (not pixels)
- `ROWS` = height in characters (not pixels)
- `+X` = horizontal position in pixels from left edge
- `+Y` = vertical position in pixels from top edge

### Basic Script

Create a script at `~/bin/setup-terminals.sh`:

```bash
#!/bin/bash
# Setup Terminal Windows for Raspberry Pi

# Terminal 1: Left side
lxterminal --geometry=80x24+0+30 --title="Development" &

# Terminal 2: Right side
lxterminal --geometry=80x24+650+30 --title="Server" &

# Terminal 3: Bottom
lxterminal --geometry=100x12+200+450 --title="Logs" &

echo "Terminal windows opened!"
```

Make it executable:

```bash
mkdir -p ~/bin
chmod +x ~/bin/setup-terminals.sh
```

### Running Commands on Startup

Use the `-e` flag to execute a command when the terminal opens:

```bash
# Run a single command
lxterminal --geometry=80x24+0+30 --title="Claude" -e "claude" &

# Run a command and keep the terminal open afterward
lxterminal --geometry=80x24+0+30 --title="Dev" -e "bash -c 'echo Hello; exec bash'" &

# Change directory and run a command
lxterminal --geometry=80x24+0+30 --title="Project" -e "bash -c 'cd ~/projects/myapp && npm run dev; exec bash'" &
```

## Method 2: Using wmctrl for Precise Positioning

For pixel-precise window control (similar to the macOS `set bounds` command), use `wmctrl`.

### wmctrl Window Positioning Format

```bash
wmctrl -r "window title" -e 0,X,Y,WIDTH,HEIGHT
```

- `-r "title"` = select window by title
- `-e` = set window geometry
- `0` = gravity (0 = use default)
- `X,Y` = position in pixels
- `WIDTH,HEIGHT` = size in pixels

### Complete Example with wmctrl

```bash
#!/bin/bash
# Setup Terminal Windows with Precise Positioning
#
# Layout:
#   +------------+------------+------------+
#   |            |            |            |
#   |   Claude   |            |    Git     |
#   |   (left)   |            |   (right)  |
#   |            |            |            |
#   +------------+------------+------------+
#   |            |   Server   |            |
#   |            |  (bottom)  |            |
#   +------------+------------+------------+

# Screen dimensions (adjust for your display)
# Common Raspberry Pi resolutions: 1920x1080, 1280x720
SCREEN_WIDTH=1920
SCREEN_HEIGHT=1080
PANEL_HEIGHT=30

# Calculate positions
THIRD_WIDTH=$((SCREEN_WIDTH / 3))
HALF_HEIGHT=$(((SCREEN_HEIGHT - PANEL_HEIGHT) / 2))
BOTTOM_TOP=$((PANEL_HEIGHT + HALF_HEIGHT))

# Open terminals with titles
lxterminal --title="Claude" -e "claude" &
sleep 0.5

lxterminal --title="Server" &
sleep 0.5

lxterminal --title="Git" &
sleep 1  # Wait for all windows to open

# Position windows using wmctrl
wmctrl -r "Claude" -e 0,0,$PANEL_HEIGHT,$THIRD_WIDTH,$HALF_HEIGHT
wmctrl -r "Server" -e 0,$THIRD_WIDTH,$BOTTOM_TOP,$THIRD_WIDTH,$HALF_HEIGHT
wmctrl -r "Git" -e 0,$((THIRD_WIDTH * 2)),$PANEL_HEIGHT,$THIRD_WIDTH,$HALF_HEIGHT

echo "Terminal windows configured!"
echo "  - Claude (left, top half)"
echo "  - Server (center, bottom)"
echo "  - Git (right, top half)"
```

## Running Scripts at Login

### Method 1: Autostart Desktop Entry (Recommended)

Create a `.desktop` file in the autostart directory:

```bash
mkdir -p ~/.config/autostart
nano ~/.config/autostart/setup-terminals.desktop
```

Add this content:

```ini
[Desktop Entry]
Type=Application
Name=Setup Terminals
Comment=Open and arrange terminal windows
Exec=/home/pi/bin/setup-terminals.sh
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
X-GNOME-Autostart-Delay=2
```

The `X-GNOME-Autostart-Delay=2` adds a 2-second delay to ensure the desktop is ready.

### Method 2: LXDE Autostart File

For older Raspberry Pi OS versions using LXDE:

```bash
nano ~/.config/lxsession/LXDE-pi/autostart
```

Add your script with the `@` prefix:

```
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash
@/home/pi/bin/setup-terminals.sh
```

### Method 3: systemd User Service

For more control, create a systemd user service:

```bash
mkdir -p ~/.config/systemd/user
nano ~/.config/systemd/user/setup-terminals.service
```

Add:

```ini
[Unit]
Description=Setup Terminal Windows
After=graphical-session.target

[Service]
Type=oneshot
ExecStartPre=/bin/sleep 3
ExecStart=/home/pi/bin/setup-terminals.sh
Environment=DISPLAY=:0

[Install]
WantedBy=default.target
```

Enable the service:

```bash
systemctl --user enable setup-terminals.service
```

## LXTerminal Options Reference

| Option | Description |
|--------|-------------|
| `--geometry=COLSxROWS+X+Y` | Set size (chars) and position (pixels) |
| `--title="Name"` | Set window title |
| `-e "command"` | Execute command in terminal |
| `--working-directory=/path` | Set starting directory |
| `-T "Name"` | Alternative way to set title |

## wmctrl Commands Reference

| Command | Description |
|---------|-------------|
| `wmctrl -l` | List all windows |
| `wmctrl -r "title" -e 0,X,Y,W,H` | Move and resize window |
| `wmctrl -r "title" -b add,maximized_vert` | Maximize vertically |
| `wmctrl -r "title" -b add,maximized_horz` | Maximize horizontally |
| `wmctrl -a "title"` | Activate (focus) window |

## Finding Your Screen Resolution

Check your display resolution:

```bash
# Method 1: xrandr
xrandr | grep ' connected'

# Method 2: fbset
fbset -s | grep geometry

# Method 3: tvservice (for HDMI)
tvservice -s
```

## Comparison with macOS

| Feature | macOS | Raspberry Pi |
|---------|-------|--------------|
| Scripting method | AppleScript via `osascript` | Bash + wmctrl |
| Terminal app | Terminal.app | LXTerminal |
| Profiles/themes | Built-in settings sets | Config file `~/.config/lxterminal/lxterminal.conf` |
| Window positioning | `set bounds {l,t,r,b}` | `--geometry` or `wmctrl -e` |
| Position format | Left, Top, Right, Bottom | X, Y, Width, Height |
| Autostart | Login Items or LaunchAgent | `.desktop` file or LXDE autostart |

## Troubleshooting

### Windows Don't Position Correctly

**Cause:** Screen dimensions in script don't match your display.

**Solution:** Check your actual resolution with `xrandr` and update the `SCREEN_WIDTH` and `SCREEN_HEIGHT` variables.

### wmctrl Can't Find Window

**Cause:** Window title doesn't match exactly, or window hasn't opened yet.

**Solution:**
1. Use `wmctrl -l` to see exact window titles
2. Add longer `sleep` delays between opening and positioning

### Script Works Manually But Not at Login

**Cause:** The script runs before the desktop is ready.

**Solution:** Add a delay at the beginning of your script:
```bash
sleep 5  # Wait for desktop to be ready
```

Or use `X-GNOME-Autostart-Delay` in the `.desktop` file.

### Permission Denied

**Cause:** Script isn't executable.

**Solution:**
```bash
chmod +x ~/bin/setup-terminals.sh
```

### Terminal Opens But Command Doesn't Run

**Cause:** Command exits immediately and terminal closes.

**Solution:** Keep the shell open after the command:
```bash
lxterminal -e "bash -c 'your-command; exec bash'" &
```

## Tips and Best Practices

1. **Use delays between windows** - A `sleep 0.5` between window creation prevents race conditions.

2. **Test coordinates manually** - Use `wmctrl -l` to see window positions and adjust.

3. **Keep scripts in ~/bin** - Add `export PATH="$HOME/bin:$PATH"` to your `~/.bashrc` for easy access.

4. **Document your layout** - Add ASCII art comments showing your intended window arrangement.

5. **Handle multiple monitors** - If using multiple displays, coordinates extend beyond the primary screen width.

## Complete Working Example

Here's a full script you can customize:

```bash
#!/bin/bash
# ~/bin/setup-terminals.sh
# Raspberry Pi Terminal Setup Script

# Wait for desktop to be ready (important for autostart)
sleep 3

# Screen dimensions - adjust for your display
SCREEN_WIDTH=1920
SCREEN_HEIGHT=1080
PANEL=30

# Calculate layout
HALF_W=$((SCREEN_WIDTH / 2))
HALF_H=$(((SCREEN_HEIGHT - PANEL) / 2))

# Terminal 1: Top-left - Main development
lxterminal --title="Dev" --working-directory="$HOME/projects" &
sleep 0.5

# Terminal 2: Top-right - Running server
lxterminal --title="Server" -e "bash -c 'cd ~/projects/myapp && echo Ready to start server; exec bash'" &
sleep 0.5

# Terminal 3: Bottom - Git and misc
lxterminal --title="Git" --working-directory="$HOME/projects" &
sleep 1

# Position with wmctrl (if installed)
if command -v wmctrl &> /dev/null; then
    wmctrl -r "Dev" -e 0,0,$PANEL,$HALF_W,$HALF_H
    wmctrl -r "Server" -e 0,$HALF_W,$PANEL,$HALF_W,$HALF_H
    wmctrl -r "Git" -e 0,0,$((PANEL + HALF_H)),$SCREEN_WIDTH,$HALF_H
fi

echo "Terminals configured!"
```

## See Also

- [macOS Terminal Startup](./macos-terminal-startup.md) - Companion guide for macOS
- [LXTerminal Documentation](https://wiki.lxde.org/en/LXTerminal)
- [wmctrl Manual](https://linux.die.net/man/1/wmctrl)
- [Raspberry Pi Documentation](https://www.raspberrypi.com/documentation/)
