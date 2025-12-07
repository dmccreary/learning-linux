# Quiz: Process Management and Job Control

Test your understanding of processes, signals, and job control.

---

#### 1. What is a process in Linux?

<div class="upper-alpha" markdown>
1. A file stored on disk
2. A running instance of a program
3. A type of user account
4. A network connection
</div>

??? question "Show Answer"
    The correct answer is **B**. A process is a running instance of a program. When you execute a command, the kernel creates a process with its own memory space, process ID (PID), and resources. Multiple processes can run the same program simultaneously.

    **Concept Tested:** Process

    **See:** [Chapter 12 - What is a Process](index.md#what-is-a-process)

---

#### 2. What is a PID?

<div class="upper-alpha" markdown>
1. Personal Identification Data
2. Process ID - a unique number identifying each process
3. Peripheral Interface Device
4. Program Installation Directory
</div>

??? question "Show Answer"
    The correct answer is **B**. PID (Process ID) is a unique number the kernel assigns to each running process. PIDs are used to identify and manage processes. PID 1 is always the init/systemd process.

    **Concept Tested:** Process ID

    **See:** [Chapter 12 - Process IDs](index.md#process-ids)

---

#### 3. What does the `ps aux` command show?

<div class="upper-alpha" markdown>
1. Only your processes
2. All processes on the system with detailed information
3. Auxiliary storage devices
4. Power supply status
</div>

??? question "Show Answer"
    The correct answer is **B**. `ps aux` shows all processes running on the system (`a` = all users, `u` = user-oriented format, `x` = include processes without terminals). It displays PID, user, CPU%, memory%, and command.

    **Concept Tested:** Ps Command

    **See:** [Chapter 12 - Ps Command](index.md#ps-command)

---

#### 4. What does `top` do?

<div class="upper-alpha" markdown>
1. Shows the top line of a file
2. Displays real-time process information and system stats
3. Lists files at the top of a directory
4. Shows network topology
</div>

??? question "Show Answer"
    The correct answer is **B**. `top` provides a real-time, continuously updating view of system processes, CPU usage, memory usage, and other system statistics. Press `q` to quit, `k` to kill a process.

    **Concept Tested:** Top Command

    **See:** [Chapter 12 - Top Command](index.md#top-command)

---

#### 5. What does `kill 1234` do?

<div class="upper-alpha" markdown>
1. Deletes file with ID 1234
2. Sends the TERM signal to process 1234
3. Shuts down the computer
4. Removes user 1234
</div>

??? question "Show Answer"
    The correct answer is **B**. `kill` sends a signal to a process. By default, it sends SIGTERM (signal 15), asking the process to terminate gracefully. The number is the PID of the target process.

    **Concept Tested:** Kill Command

    **See:** [Chapter 12 - Kill Command](index.md#kill-command)

---

#### 6. What's the difference between `kill` and `kill -9`?

<div class="upper-alpha" markdown>
1. They're identical
2. `kill` requests termination; `kill -9` forces immediate termination
3. `kill -9` is faster
4. `kill -9` kills 9 processes at once
</div>

??? question "Show Answer"
    The correct answer is **B**. `kill` sends SIGTERM (15), allowing the process to clean up before exiting. `kill -9` sends SIGKILL (9), which immediately terminates the process—it cannot be ignored or caught. Use -9 only when necessary.

    **Concept Tested:** Kill Command, Signals

    **See:** [Chapter 12 - Kill Signals](index.md#kill-signals)

---

#### 7. What does `&` at the end of a command do?

<div class="upper-alpha" markdown>
1. Redirects output to a file
2. Runs the command in the background
3. Runs the command as root
4. Appends output to a file
</div>

??? question "Show Answer"
    The correct answer is **B**. Adding `&` at the end of a command runs it in the background, immediately returning control to the shell. For example, `./long_script.sh &` starts the script without blocking your terminal.

    **Concept Tested:** Background Processes

    **See:** [Chapter 12 - Background Processes](index.md#background-processes)

---

#### 8. What does Ctrl+Z do to a running process?

<div class="upper-alpha" markdown>
1. Terminates it permanently
2. Suspends it (puts it in the background, stopped)
3. Zooms in on the output
4. Saves the current state
</div>

??? question "Show Answer"
    The correct answer is **B**. Ctrl+Z suspends (pauses) the current foreground process and puts it in the background in a stopped state. Use `fg` to resume it in the foreground or `bg` to resume it in the background.

    **Concept Tested:** Job Control

    **See:** [Chapter 12 - Job Control](index.md#suspending-processes)

---

#### 9. What command lists background jobs in the current shell?

<div class="upper-alpha" markdown>
1. ps
2. jobs
3. bg
4. list
</div>

??? question "Show Answer"
    The correct answer is **B**. The `jobs` command lists all jobs (processes) started from the current shell session, including their status (Running, Stopped). Use `fg %1` to bring job 1 to the foreground.

    **Concept Tested:** Jobs Command

    **See:** [Chapter 12 - Jobs Command](index.md#jobs-command)

---

#### 10. What is a daemon?

<div class="upper-alpha" markdown>
1. A malicious virus
2. A background service process that runs continuously
3. A debugging tool
4. A type of file format
</div>

??? question "Show Answer"
    The correct answer is **B**. A daemon is a background process that runs continuously, typically started at boot time, providing services like web serving (httpd), printing (cupsd), or logging (syslogd). Daemon names often end in 'd'.

    **Concept Tested:** Daemon Processes

    **See:** [Chapter 12 - Daemons](index.md#daemons)
