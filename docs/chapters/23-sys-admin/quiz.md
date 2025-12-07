# Quiz: System Administration Essentials

Test your understanding of user management, services, and system administration.

---

#### 1. What does `useradd` do?

<div class="upper-alpha" markdown>
1. Adds a USB device
2. Creates a new user account
3. Adds a user to a group
4. Increases user privileges
</div>

??? question "Show Answer"
    The correct answer is **B**. `useradd` creates a new user account. For example, `sudo useradd -m -s /bin/bash newuser` creates a user with a home directory (-m) and bash shell (-s). Use `passwd` to set their password.

    **Concept Tested:** User Management

    **See:** [Chapter 23 - Adding Users](index.md#adding-users)

---

#### 2. What is systemd?

<div class="upper-alpha" markdown>
1. A system debugger
2. The init system and service manager for modern Linux
3. A disk formatter
4. A system monitoring tool
</div>

??? question "Show Answer"
    The correct answer is **B**. systemd is the init system for most modern Linux distributions. It manages the boot process, starts and stops services (daemons), and handles system state. It replaced older init systems like SysV init.

    **Concept Tested:** Systemd

    **See:** [Chapter 23 - Systemd](index.md#systemd)

---

#### 3. What does `systemctl start nginx` do?

<div class="upper-alpha" markdown>
1. Installs nginx
2. Starts the nginx service
3. Stops the nginx service
4. Restarts the computer
</div>

??? question "Show Answer"
    The correct answer is **B**. `systemctl start nginx` starts the nginx service (web server). Other common commands: `stop` (stop service), `restart` (stop then start), `status` (check if running), `enable` (start at boot).

    **Concept Tested:** Systemctl Commands

    **See:** [Chapter 23 - Managing Services](index.md#managing-services)

---

#### 4. What does `systemctl enable nginx` do?

<div class="upper-alpha" markdown>
1. Starts nginx immediately
2. Configures nginx to start automatically at boot
3. Enables advanced nginx features
4. Allows network access to nginx
</div>

??? question "Show Answer"
    The correct answer is **B**. `systemctl enable` configures a service to start automatically when the system boots. It creates symlinks in the systemd target directories. Use `disable` to prevent auto-start.

    **Concept Tested:** Service Auto-start

    **See:** [Chapter 23 - Enabling Services](index.md#enabling-services)

---

#### 5. What file contains encrypted user passwords?

<div class="upper-alpha" markdown>
1. /etc/passwd
2. /etc/shadow
3. /etc/passwords
4. /etc/users
</div>

??? question "Show Answer"
    The correct answer is **B**. `/etc/shadow` contains encrypted (hashed) passwords. It's only readable by root for security. `/etc/passwd` contains user account info but no longer stores passwords (they're replaced with 'x').

    **Concept Tested:** Password Storage

    **See:** [Chapter 23 - Shadow File](index.md#shadow-file)

---

#### 6. What does the `usermod` command do?

<div class="upper-alpha" markdown>
1. Changes the user's mode
2. Modifies user account properties
3. Moderates user activity
4. Moves user files
</div>

??? question "Show Answer"
    The correct answer is **B**. `usermod` modifies existing user accounts. Common uses: `usermod -aG sudo username` (add to group), `usermod -s /bin/zsh username` (change shell), `usermod -L username` (lock account).

    **Concept Tested:** User Modification

    **See:** [Chapter 23 - Modifying Users](index.md#modifying-users)

---

#### 7. What is the purpose of the `journalctl` command?

<div class="upper-alpha" markdown>
1. Manages disk journaling
2. Views systemd journal logs
3. Creates journal entries
4. Journals file changes
</div>

??? question "Show Answer"
    The correct answer is **B**. `journalctl` queries and displays logs from the systemd journal. Use `journalctl -u nginx` for a specific service, `journalctl -f` to follow logs in real-time, or `journalctl -b` for current boot only.

    **Concept Tested:** System Logs

    **See:** [Chapter 23 - Journalctl](index.md#journalctl)

---

#### 8. What does the boot process start with on modern Linux systems?

<div class="upper-alpha" markdown>
1. The kernel loads first, then BIOS
2. BIOS/UEFI → Bootloader → Kernel → systemd
3. systemd starts everything
4. The shell loads first
</div>

??? question "Show Answer"
    The correct answer is **B**. The boot sequence: BIOS/UEFI initializes hardware → bootloader (GRUB) loads the kernel → kernel initializes and starts systemd (PID 1) → systemd starts all other services and brings up the system.

    **Concept Tested:** Boot Process

    **See:** [Chapter 23 - Boot Process](index.md#boot-process)

---

#### 9. What command adds a user to a group?

<div class="upper-alpha" markdown>
1. groupadd user group
2. usermod -aG groupname username
3. addgroup user to group
4. chgrp user groupname
</div>

??? question "Show Answer"
    The correct answer is **B**. `usermod -aG groupname username` adds the user to the specified group. The `-a` means append (don't remove from other groups), and `-G` specifies supplementary groups.

    **Concept Tested:** Group Management

    **See:** [Chapter 23 - Group Membership](index.md#group-membership)

---

#### 10. What does `passwd` command do without arguments?

<div class="upper-alpha" markdown>
1. Shows password policy
2. Changes your own password
3. Resets all passwords
4. Displays encrypted passwords
</div>

??? question "Show Answer"
    The correct answer is **B**. Running `passwd` without arguments lets you change your own password. As root, `passwd username` changes another user's password. It prompts for the new password twice to confirm.

    **Concept Tested:** Password Management

    **See:** [Chapter 23 - Changing Passwords](index.md#changing-passwords)
