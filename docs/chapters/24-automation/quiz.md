# Quiz: Automation and Fun

Test your understanding of task automation, cron, and terminal customization.

---

#### 1. What is cron used for?

<div class="upper-alpha" markdown>
1. Measuring time precisely
2. Scheduling recurring tasks to run automatically
3. Recording audio
4. Creating chronological logs
</div>

??? question "Show Answer"
    The correct answer is **B**. Cron is a time-based job scheduler that runs commands or scripts automatically at specified intervals. It's perfect for backups, maintenance tasks, and any recurring automation.

    **Concept Tested:** Cron Daemon

    **See:** [Chapter 24 - Cron](index.md#automating-tasks-with-cron)

---

#### 2. In the cron expression `30 4 * * 1`, when does the job run?

<div class="upper-alpha" markdown>
1. Every 30 minutes on the 4th
2. At 4:30 AM every Monday
3. At 4:30 PM every day
4. Every 30 seconds at 4 AM
</div>

??? question "Show Answer"
    The correct answer is **B**. The format is: minute (30), hour (4), day-of-month (*), month (*), day-of-week (1=Monday). So this runs at 4:30 AM every Monday.

    **Concept Tested:** Cron Syntax

    **See:** [Chapter 24 - Cron Syntax](index.md)

---

#### 3. What does ANSI color code `\e[31m` produce?

<div class="upper-alpha" markdown>
1. Bold text
2. Red text color
3. 31 spaces
4. Error message
</div>

??? question "Show Answer"
    The correct answer is **B**. ANSI escape codes control terminal formatting. `\e[31m` (or `\033[31m`) sets text color to red. Use `\e[0m` to reset to default. Colors range from 30-37 for foreground.

    **Concept Tested:** ANSI Color Codes

    **See:** [Chapter 24 - ANSI Colors](index.md#understanding-ansi-color-codes)

---

#### 4. What is neofetch?

<div class="upper-alpha" markdown>
1. A network testing tool
2. A command that displays system info with ASCII art
3. A file downloader
4. A news reader
</div>

??? question "Show Answer"
    The correct answer is **B**. Neofetch displays system information (OS, kernel, CPU, memory, etc.) alongside a colorful ASCII art logo of your distribution. It's popular for screenshots and rice (customization showcases).

    **Concept Tested:** Neofetch

    **See:** [Chapter 24 - Neofetch](index.md#neofetch-system-info-in-style)

---

#### 5. What does the `cowsay` command do?

<div class="upper-alpha" markdown>
1. Plays cow sounds
2. Displays a message with ASCII art of a cow
3. Counts words
4. Manages dairy inventory
</div>

??? question "Show Answer"
    The correct answer is **B**. `cowsay` takes text input and displays it in a speech bubble from an ASCII cow. It's completely useless and absolutely delightful. Try `cowsay "Hello"` or pipe it with `fortune | cowsay`.

    **Concept Tested:** Cowsay

    **See:** [Chapter 24 - Cowsay](index.md#cowsay-because-why-not)

---

#### 6. What does the `sl` command do?

<div class="upper-alpha" markdown>
1. Lists files (typo for ls)
2. Shows an animated steam locomotive
3. Sleeps for a duration
4. Signs you out
</div>

??? question "Show Answer"
    The correct answer is **B**. `sl` displays an animated ASCII steam locomotive crossing your terminal. It was created to "punish" users who mistype `ls`. You can't stop it easily, which is part of the joke!

    **Concept Tested:** Sl Command

    **See:** [Chapter 24 - The Infamous sl Command](index.md#the-infamous-sl-command)

---

#### 7. What is figlet used for?

<div class="upper-alpha" markdown>
1. Creating figure diagrams
2. Generating large ASCII text banners
3. Managing fig files
4. Calculating figures
</div>

??? question "Show Answer"
    The correct answer is **B**. Figlet creates large ASCII art text banners from input text. Try `figlet "HELLO"` to see your text rendered in big blocky letters. Different fonts create different styles.

    **Concept Tested:** Figlet

    **See:** [Chapter 24 - Figlet](index.md#figlet-big-ascii-text)

---

#### 8. What does the PS1 variable control?

<div class="upper-alpha" markdown>
1. PostScript printing
2. The appearance of your shell prompt
3. Process security level 1
4. PlayStation integration
</div>

??? question "Show Answer"
    The correct answer is **B**. PS1 (Prompt String 1) defines what your command prompt looks like. You can include username, hostname, current directory, colors, git branch, and more. Customize it in your `.bashrc`.

    **Concept Tested:** Terminal Customization

    **See:** [Chapter 24 - PS1 Customization](index.md)

---

#### 9. What is the purpose of system logging?

<div class="upper-alpha" markdown>
1. Slowing down the system
2. Recording events for troubleshooting and monitoring
3. Logging into websites
4. Creating wooden logs
</div>

??? question "Show Answer"
    The correct answer is **B**. System logs record events, errors, and activities. They're essential for troubleshooting problems, security monitoring, and understanding system behavior. Use `journalctl` to view systemd logs.

    **Concept Tested:** Logging Tasks

    **See:** [Chapter 24 - Logging](index.md#logging-tasks)

---

#### 10. What does `apt moo` display?

<div class="upper-alpha" markdown>
1. Monthly Operating Overview
2. An ASCII cow (Easter egg in apt)
3. Software updates
4. Memory Out Of bounds error
</div>

??? question "Show Answer"
    The correct answer is **B**. `apt moo` is a classic Linux Easter egg that displays an ASCII cow. It's one of many fun hidden features in Linux software. Try `apt moo moo` for another variation!

    **Concept Tested:** Linux Easter Eggs

    **See:** [Chapter 24 - Linux Easter Eggs](index.md#more-linux-easter-eggs)
