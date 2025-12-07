# Quiz: Basic Shell Commands and Help Systems

Test your understanding of finding help and using fundamental shell commands.

---

#### 1. What command displays the manual page for a Linux command?

<div class="upper-alpha" markdown>
1. help
2. info
3. man
4. docs
</div>

??? question "Show Answer"
    The correct answer is **C**. The `man` command displays the manual page for any command. For example, `man ls` shows the complete documentation for the ls command, including all options, examples, and related commands.

    **Concept Tested:** Man Pages

    **See:** [Chapter 3 - Man Pages](index.md#man-pages-your-built-in-encyclopedia)

---

#### 2. What does the `apropos` command do?

<div class="upper-alpha" markdown>
1. Displays disk usage
2. Searches man page descriptions for a keyword
3. Shows running processes
4. Lists directory contents
</div>

??? question "Show Answer"
    The correct answer is **B**. The `apropos` command searches man page descriptions for a keyword. For example, `apropos copy` finds all commands related to copying. It's incredibly useful when you know what you want to do but don't know the command name.

    **Concept Tested:** Apropos Command

    **See:** [Chapter 3 - Apropos Command](index.md#apropos-command)

---

#### 3. What is the difference between `man` and `--help`?

<div class="upper-alpha" markdown>
1. They show identical information
2. `man` shows full documentation; `--help` shows a brief summary
3. `--help` shows full documentation; `man` shows a brief summary
4. Neither provides useful information
</div>

??? question "Show Answer"
    The correct answer is **B**. The `man` command displays comprehensive documentation including detailed descriptions, all options, and examples. The `--help` flag (used like `ls --help`) shows a brief summary of the most common options—quick and convenient for a refresher.

    **Concept Tested:** Man Pages, Help Command

    **See:** [Chapter 3 - Getting Help](index.md#help-flag)

---

#### 4. What does the `echo` command do?

<div class="upper-alpha" markdown>
1. Creates a new file
2. Displays text or variable values to the screen
3. Searches for text in files
4. Copies files to another location
</div>

??? question "Show Answer"
    The correct answer is **B**. The `echo` command displays text or variable values to the terminal (stdout). For example, `echo "Hello"` prints "Hello", and `echo $HOME` prints your home directory path. It's commonly used in scripts and for checking variable values.

    **Concept Tested:** Echo Command

    **See:** [Chapter 3 - Echo Command](index.md#echo-command)

---

#### 5. What command shows the current date and time?

<div class="upper-alpha" markdown>
1. time
2. now
3. date
4. clock
</div>

??? question "Show Answer"
    The correct answer is **C**. The `date` command displays the current date and time. It can also be customized with format strings (like `date +"%Y-%m-%d"` for ISO format) and is commonly used in scripts for timestamps and log files.

    **Concept Tested:** Date Command

    **See:** [Chapter 3 - Date Command](index.md#date-command)

---

#### 6. What does the `whatis` command provide?

<div class="upper-alpha" markdown>
1. A full manual page
2. A one-line description of a command
3. System hardware information
4. User account details
</div>

??? question "Show Answer"
    The correct answer is **B**. The `whatis` command displays a one-line description of what a command does. For example, `whatis grep` returns "grep - print lines that match patterns." It's perfect for quick reminders without opening the full man page.

    **Concept Tested:** Whatis Command

    **See:** [Chapter 3 - Whatis Command](index.md#whatis-command)

---

#### 7. What does `uname -a` display?

<div class="upper-alpha" markdown>
1. User account information
2. USB devices connected
3. Complete system information (kernel, architecture, etc.)
4. Network configuration
</div>

??? question "Show Answer"
    The correct answer is **C**. The `uname -a` command displays all system information including kernel name, hostname, kernel version, machine architecture, processor type, and operating system. The `-a` flag means "all information."

    **Concept Tested:** Uname Command, Version Information

    **See:** [Chapter 3 - Uname Command](index.md#uname-command)

---

#### 8. What does the `whoami` command output?

<div class="upper-alpha" markdown>
1. Your computer's IP address
2. Your current username
3. Your password
4. Your home directory path
</div>

??? question "Show Answer"
    The correct answer is **B**. The `whoami` command outputs your current username. It's useful in scripts or when you're unsure which user account you're logged in as, especially after using `su` or `sudo` to switch users.

    **Concept Tested:** Whoami Command

    **See:** [Chapter 3 - Whoami Command](index.md#whoami-command)

---

#### 9. What does the `cal` command display?

<div class="upper-alpha" markdown>
1. Calculator application
2. Calorie counter
3. Calendar for the current month
4. Call history
</div>

??? question "Show Answer"
    The correct answer is **C**. The `cal` command displays a calendar for the current month with today's date highlighted. You can also view other months (`cal 12 2025`) or the entire year (`cal 2025`). It's a quick way to check dates without leaving the terminal.

    **Concept Tested:** Cal Command

    **See:** [Chapter 3 - Cal Command](index.md#cal-command)

---

#### 10. What does `uptime` tell you?

<div class="upper-alpha" markdown>
1. How long until your subscription expires
2. How long the system has been running since last boot
3. The current time only
4. How long until the next update
</div>

??? question "Show Answer"
    The correct answer is **B**. The `uptime` command shows how long the system has been running since the last boot, along with the current time, number of logged-in users, and system load averages. System administrators use this to monitor server stability.

    **Concept Tested:** Uptime Command

    **See:** [Chapter 3 - Uptime Command](index.md#uptime-command)
