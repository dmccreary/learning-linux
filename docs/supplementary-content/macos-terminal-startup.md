# Automating macOS Terminal Windows on Startup

![](./macos-terminal-startup.png)

This guide explains how to automatically open and configure multiple Terminal windows with specific profiles, sizes, positions, and commands when you log into macOS.

## Overview

Using a combination of shell scripts and AppleScript (via `osascript`), you can:

- Open multiple Terminal windows automatically
- Apply different Terminal profiles (themes) to each window
- Position and size windows precisely on your screen
- Run startup commands in each window (like launching Claude Code)
- Execute this setup on login

## What is osascript?

The `osascript` command is a command-line tool that executes AppleScript and other Open Scripting Architecture (OSA) languages from the terminal. Apple created AppleScript in 1993 as part of System 7 to provide a natural language-like scripting language that could automate and control Mac applications. Unlike shell scripts that work with files and processes, AppleScript was designed specifically for inter-application communication—allowing users to script the GUI, send commands between apps, and automate complex workflows that span multiple applications. The `osascript` command bridges the gap between traditional Unix shell scripting and AppleScript, letting you embed powerful GUI automation directly within bash scripts. This is why we use it here: shell scripts alone cannot control window positions or apply Terminal profiles, but AppleScript can communicate directly with Terminal.app to manipulate its windows.

## Prerequisites

- macOS (tested on Ventura, Sonoma and Tahoe)
- Terminal.app (built-in)
- Basic familiarity with shell scripting

## Terminal Profiles

macOS Terminal comes with several built-in profiles (themes):

| Profile | Description |
|---------|-------------|
| Basic | Default white background |
| Grass | Green text on black background |
| Homebrew | Green text, classic terminal look |
| Ocean | Blue tones |
| Pro | Professional dark theme |
| Red Sands | Warm reddish tones |
| Silver Aerogel | Light gray theme |
| Novel | Sepia/paper-like appearance |

To see your available profiles:

```bash
osascript -e 'tell application "Terminal" to get name of every settings set'
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
- **Menu bar** is typically 25 pixels tall

### Window Bounds Format

Window bounds are specified as: `{left, top, right, bottom}`

For example, a window in the top-left quarter of a 1920x1080 screen:
```applescript
set bounds of front window to {0, 25, 960, 540}
```

## Basic Script Structure

### Step 1: Create the Script

Create a new file at `~/bin/setup-terminals.sh`:

```bash
#!/bin/bash
# Setup Terminal Windows for Development

# Screen dimensions (adjust for your display)
SCREEN_WIDTH=1920
SCREEN_HEIGHT=1080
MENU_BAR=25

# Open a terminal with the Grass profile
osascript <<EOF
tell application "Terminal"
    activate

    -- Get the profile settings
    set grassSettings to settings set "Grass"

    -- Open new window and run a command
    do script "echo 'Hello from Grass terminal'"

    -- Apply profile to the window
    set current settings of front window to grassSettings

    -- Position and size the window
    set bounds of front window to {0, $MENU_BAR, 960, 540}

    -- Set a custom title
    set custom title of front window to "My Terminal"
end tell
EOF
```

### Step 2: Make It Executable

```bash
chmod +x ~/bin/setup-terminals.sh
```

### Step 3: Run the Script

```bash
~/bin/setup-terminals.sh
```

## Complete Example: Three-Window Development Setup

This example creates three terminal windows arranged in a specific layout:

```
+------------+------------+------------+
|            |            |            |
|   GRASS    |            |   OCEAN    |
|  (Claude)  |            |   (Git)    |
|            |            |            |
+------------+------------+------------+
             |  HOMEBREW  |
             |  (Server)  |
             +------------+
```

### The Script

```bash
#!/bin/bash
# Setup Terminal Windows for Development
#
# Layout:
#   +------------+------------+------------+
#   |            |            |            |
#   |   GRASS    |            |   OCEAN    |
#   |   (left)   |            |   (right)  |
#   |  half-ht   |            |  half-ht   |
#   |            |            |            |
#   +------------+------------+------------+
#   |            |  HOMEBREW  |            |
#   |            |  (bottom)  |            |
#   +------------+------------+------------+
#
# Terminal Profiles: Grass, Homebrew, Ocean

# Screen dimensions (adjust for your display)
# To find your screen size: system_profiler SPDisplaysDataType | grep Resolution
SCREEN_WIDTH=1920
SCREEN_HEIGHT=1080
MENU_BAR=25

# Calculate positions
THIRD_WIDTH=$(($SCREEN_WIDTH / 3))
HALF_HEIGHT=$((($SCREEN_HEIGHT - $MENU_BAR) / 2))
BOTTOM_TOP=$(($MENU_BAR + $HALF_HEIGHT))

# Terminal 1: GRASS (left side, top half) - runs Claude Code
osascript <<EOF
tell application "Terminal"
    activate

    -- Get the Grass settings
    set grassSettings to settings set "Grass"

    -- Open new window with Grass profile and run claude
    do script "/usr/local/bin/claude"
    set current settings of front window to grassSettings
    set bounds of front window to {0, $MENU_BAR, $THIRD_WIDTH, $BOTTOM_TOP}
    set custom title of front window to "Claude"
end tell
EOF

# Small delay to ensure windows don't overlap during creation
sleep 0.5

# Terminal 2: HOMEBREW (center bottom)
osascript <<EOF
tell application "Terminal"
    -- Get the Homebrew settings
    set brewSettings to settings set "Homebrew"

    -- Open new window with Homebrew profile
    do script ""
    set current settings of front window to brewSettings
    set bounds of front window to {$THIRD_WIDTH, $BOTTOM_TOP, $(($THIRD_WIDTH * 2)), $SCREEN_HEIGHT}
    set custom title of front window to "Homebrew"
end tell
EOF

sleep 0.5

# Terminal 3: OCEAN (right side, top half)
osascript <<EOF
tell application "Terminal"
    -- Get the Ocean settings
    set oceanSettings to settings set "Ocean"

    -- Open new window with Ocean profile
    do script ""
    set current settings of front window to oceanSettings
    set bounds of front window to {$(($THIRD_WIDTH * 2)), $MENU_BAR, $SCREEN_WIDTH, $BOTTOM_TOP}
    set custom title of front window to "Ocean"
end tell
EOF

echo "Terminal windows configured!"
echo "  - Grass (left, half height)"
echo "  - Homebrew (center, bottom)"
echo "  - Ocean (right, half height)"
```

## Running Commands on Startup

The `do script` command accepts any shell command:

### Run a Single Command

```applescript
do script "/usr/local/bin/claude"
```

### Run Multiple Commands

```applescript
do script "cd ~/Documents/ws/my-project && npm run dev"
```

### Change Directory Then Run Interactive Program

```applescript
do script "cd ~/Documents/ws/graph-data-modeling-course && /usr/local/bin/claude"
```

### Run Commands with Environment Variables

```applescript
do script "export NODE_ENV=development && npm start"
```

## Running the Script at Login

### Method 1: Login Items (Easiest)

1. Open **System Settings** → **General** → **Login Items**
2. Click the **+** button
3. Navigate to `~/bin/setup-terminals.sh`
4. Select it and click **Add**

**Note:** You may need to convert the script to an Application first (see Method 2).

### Method 2: Create an Application Wrapper

1. Open **Script Editor** (in Applications → Utilities)
2. Enter this code:

```applescript
do shell script "/Users/yourusername/bin/setup-terminals.sh"
```

3. Go to **File** → **Export**
4. Set **File Format** to **Application**
5. Save as "Setup Terminals.app" in your Applications folder
6. Add the app to Login Items (System Settings → General → Login Items)

### Method 3: LaunchAgent (Most Reliable)

Create a LaunchAgent plist file:

```bash
nano ~/Library/LaunchAgents/com.user.setup-terminals.plist
```

Add this content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.user.setup-terminals</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>/Users/yourusername/bin/setup-terminals.sh</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>LaunchOnlyOnce</key>
    <true/>
</dict>
</plist>
```

Load the LaunchAgent:

```bash
launchctl load ~/Library/LaunchAgents/com.user.setup-terminals.plist
```

To unload:

```bash
launchctl unload ~/Library/LaunchAgents/com.user.setup-terminals.plist
```

## Finding Your Screen Resolution

To determine your screen dimensions for the script:

```bash
system_profiler SPDisplaysDataType | grep Resolution
```

Example output:
```
Resolution: 1920 x 1080 (1080p FHD - Full High Definition)
```

For multiple monitors, you'll see multiple resolutions listed.

## AppleScript Reference

### Key Commands

| Command | Description |
|---------|-------------|
| `activate` | Bring Terminal to the front |
| `do script "command"` | Open new window and run command |
| `do script "command" in front window` | Run command in existing window |
| `set bounds of front window to {l,t,r,b}` | Position/size window |
| `set current settings of front window to X` | Apply a profile |
| `set custom title of front window to "Name"` | Set window title |
| `settings set "ProfileName"` | Reference a profile by name |

### Getting Window Information

To get the current bounds of the front Terminal window:

```bash
osascript -e 'tell application "Terminal" to get bounds of front window'
```

This is useful for figuring out exact positions when designing your layout.

## Troubleshooting

### Error: "Can't set settings set..."

**Cause:** Profile name doesn't match exactly.

**Solution:** List available profiles and use the exact name:
```bash
osascript -e 'tell application "Terminal" to get name of every settings set'
```

### Windows Open But Don't Position Correctly

**Cause:** Screen dimensions in script don't match your display.

**Solution:** Update `SCREEN_WIDTH` and `SCREEN_HEIGHT` variables to match your actual resolution.

### Script Works Manually But Not at Login

**Cause:** The script runs before the GUI is ready.

**Solution:** Add a delay at the beginning of your script:
```bash
sleep 3  # Wait 3 seconds for GUI to be ready
```

### Permission Denied

**Cause:** Script isn't executable.

**Solution:**
```bash
chmod +x ~/bin/setup-terminals.sh
```

### Terminal Asks for Automation Permission

**Cause:** macOS security requires permission for scripts to control apps.

**Solution:**
1. Go to **System Settings** → **Privacy & Security** → **Automation**
2. Allow your terminal or script to control Terminal.app

## Tips and Best Practices

1. **Use delays between windows** - A `sleep 0.5` between window creation prevents race conditions.

2. **Test coordinates manually** - Use `get bounds of front window` to find good positions before scripting.

3. **Keep scripts in ~/bin** - Add `export PATH="$HOME/bin:$PATH"` to your `~/.zshrc` for easy access.

4. **Version control your scripts** - Keep your setup scripts in a git repository for backup.

5. **Document your layout** - Add ASCII art comments showing your intended window arrangement.

## See Also

- [AppleScript Language Guide](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/)
- [Terminal.app Scripting Dictionary](Open Script Editor → File → Open Dictionary → Terminal)
- [launchd.plist man page](https://ss64.com/osx/launchctl.html)
