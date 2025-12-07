# Quiz: Shell Scripting and Automation

Test your understanding of shell scripts, automation, and cron jobs.

---

#### 1. What is a shebang and why is it important?

<div class="upper-alpha" markdown>
1. A shell command for making noise
2. The first line (#!/bin/bash) that tells the system which interpreter to use
3. A debugging tool
4. A type of variable
</div>

??? question "Show Answer"
    The correct answer is **B**. The shebang (like `#!/bin/bash`) is the first line of a script that tells the system which interpreter should execute it. Without it, the system may not know how to run your script properly.

    **Concept Tested:** Script Shebang

    **See:** [Chapter 13 - Shebang](index.md)

---

#### 2. What must you do before running a shell script you created?

<div class="upper-alpha" markdown>
1. Compile it
2. Make it executable with chmod +x
3. Convert it to binary
4. Register it with the system
</div>

??? question "Show Answer"
    The correct answer is **B**. Shell scripts are text files and need execute permission to run directly. Use `chmod +x script.sh` to make it executable, then run with `./script.sh`.

    **Concept Tested:** Script Permissions

    **See:** [Chapter 13 - Making Scripts Executable](index.md)

---

#### 3. How do you access the first argument passed to a script?

<div class="upper-alpha" markdown>
1. $0
2. $1
3. $first
4. $arg1
</div>

??? question "Show Answer"
    The correct answer is **B**. In bash scripts, `$1` is the first argument, `$2` is the second, and so on. `$0` is the script name itself, and `$#` is the count of arguments. `$@` represents all arguments.

    **Concept Tested:** Script Arguments

    **See:** [Chapter 13 - Script Arguments](index.md)

---

#### 4. What is cron used for?

<div class="upper-alpha" markdown>
1. Compressing files
2. Scheduling commands to run automatically at specified times
3. Creating users
4. Managing network connections
</div>

??? question "Show Answer"
    The correct answer is **B**. Cron is a time-based job scheduler that runs commands automatically at specified intervals. It's perfect for backups, log rotation, system maintenance, and any recurring tasks.

    **Concept Tested:** Cron Daemon

    **See:** [Chapter 13 - Cron](index.md)

---

#### 5. In cron syntax, what does `0 2 * * *` mean?

<div class="upper-alpha" markdown>
1. Every 2 minutes
2. At 2:00 AM every day
3. Every 2 hours
4. On the 2nd of every month
</div>

??? question "Show Answer"
    The correct answer is **B**. Cron fields are: minute, hour, day-of-month, month, day-of-week. So `0 2 * * *` means minute 0, hour 2, every day of month, every month, every day of week = 2:00 AM daily.

    **Concept Tested:** Cron Syntax, Cron Schedule Fields

    **See:** [Chapter 13 - Cron Syntax](index.md)

---

#### 6. What command edits your personal crontab file?

<div class="upper-alpha" markdown>
1. nano /etc/cron
2. crontab -e
3. vi /var/cron
4. edit crontab
</div>

??? question "Show Answer"
    The correct answer is **B**. `crontab -e` opens your personal crontab file for editing. Use `crontab -l` to list current cron jobs, and `crontab -r` to remove all your cron jobs.

    **Concept Tested:** Crontab Command

    **See:** [Chapter 13 - Crontab Command](index.md)

---

#### 7. What does `$?` contain in a shell script?

<div class="upper-alpha" markdown>
1. The current process ID
2. The exit status of the last command
3. The number of arguments
4. The script filename
</div>

??? question "Show Answer"
    The correct answer is **B**. `$?` contains the exit status (return code) of the most recently executed command. A value of 0 typically means success, while non-zero values indicate various errors.

    **Concept Tested:** Script Exit Codes

    **See:** [Chapter 13 - Exit Codes](index.md)

---

#### 8. What is the purpose of `set -e` at the beginning of a script?

<div class="upper-alpha" markdown>
1. Sets the editor
2. Exits the script immediately if any command fails
3. Enables echoing of commands
4. Sets environment variables
</div>

??? question "Show Answer"
    The correct answer is **B**. `set -e` makes the script exit immediately if any command returns a non-zero exit status. This helps catch errors early rather than continuing with a broken state.

    **Concept Tested:** Script Best Practices

    **See:** [Chapter 13 - Script Safety](index.md)

---

#### 9. What does the `at` command do?

<div class="upper-alpha" markdown>
1. Displays file attributes
2. Schedules a one-time command for future execution
3. Shows the current time
4. Lists all files at a location
</div>

??? question "Show Answer"
    The correct answer is **B**. Unlike cron which runs recurring jobs, `at` schedules a one-time command for a specific future time. For example, `at 3pm tomorrow` lets you schedule a job for 3 PM tomorrow.

    **Concept Tested:** At Command

    **See:** [Chapter 13 - At Command](index.md)

---

#### 10. What is the difference between `*` and `*/5` in a cron schedule?

<div class="upper-alpha" markdown>
1. They're identical
2. `*` means every time unit; `*/5` means every 5th time unit
3. `*/5` runs 5 times longer
4. `*` is invalid syntax
</div>

??? question "Show Answer"
    The correct answer is **B**. In cron, `*` means "every" (every minute, hour, etc.), while `*/5` means "every 5th." So in the minute field, `*` runs every minute while `*/5` runs at minutes 0, 5, 10, 15, 20, etc.

    **Concept Tested:** Cron Syntax

    **See:** [Chapter 13 - Cron Examples](index.md#cron-examples)
