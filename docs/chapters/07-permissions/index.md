---
title: File Permissions and Ownership
description: Master Linux's permission system for security and collaboration
generated_by: claude skill chapter-content-generator
date: 2025-12-06
version: 0.03
---

# File Permissions and Ownership

## Summary

This chapter provides comprehensive coverage of Linux's permission system, one of the key security features of the operating system. You'll learn about read, write, and execute permissions for owners, groups, and others, master chmod and chown commands, understand user accounts and the root user, and learn to use sudo safely. Special permission bits like setuid, setgid, and sticky bit are also covered.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. File Permissions
2. Read Permission
3. Write Permission
4. Execute Permission
5. Owner Permissions
6. Group Permissions
7. Other Permissions
8. Permission Notation
9. Numeric Permissions
10. Chmod Command
11. Chown Command
12. Chgrp Command
13. User Accounts
14. Root User
15. Sudo Command
16. Su Command
17. User Groups
18. Primary Group
19. Secondary Groups
20. Umask Command
21. Default Permissions
22. Setuid Bit
23. Setgid Bit
24. Sticky Bit
25. Special Permissions

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: File System Fundamentals](../04-file-system/index.md)
- [Chapter 5: File Operations and Manipulation](../05-file-operations/index.md)

---

## The Bouncer at the File Club: Understanding Permissions

Imagine every file in Linux has a bouncer standing guard. Before anyone can read, modify, or run that file, the bouncer checks their ID and decides: "Are you allowed to do that?" This bouncer is the **file permissions** system, and it's one of the most important security features in Linux.

In Windows, you might be used to files being pretty open—most files can be read by anyone, and viruses can spread easily. Linux takes a different approach: **everything is locked down by default**, and you have to explicitly grant access. This is why Linux servers run most of the internet—they're much harder to hack!

In this chapter, you'll learn:

- Who can access files (users, groups, everyone)
- What they can do (read, write, execute)
- How to change these settings
- The all-powerful root user and how to use sudo safely

Let's become the master of the bouncers!

## Users and Groups: Who's Who in Linux

Before we dive into permissions, we need to understand who Linux is protecting files FROM and FOR.

### User Accounts

Every person (and many programs) that uses a Linux system has a **user account**. Your user account has:

- A **username** (like `dan` or `alice`)
- A **user ID (UID)** - a number that uniquely identifies you
- A **home directory** (usually `/home/username`)
- A **default shell** (the command interpreter you use)

```sh
# See your username
whoami
# dan

# See your user ID and group memberships
id
# uid=1000(dan) gid=1000(dan) groups=1000(dan),27(sudo),100(users)

# See all users on the system
cat /etc/passwd
```

The `/etc/passwd` file contains information about all users. Each line looks like:

```
dan:x:1000:1000:Dan McCreary:/home/dan:/bin/bash
```

| Field | Meaning |
|-------|---------|
| `dan` | Username |
| `x` | Password (stored elsewhere) |
| `1000` | User ID (UID) |
| `1000` | Primary Group ID (GID) |
| `Dan McCreary` | Full name/description |
| `/home/dan` | Home directory |
| `/bin/bash` | Default shell |

### User Groups

A **user group** is a collection of users. Groups make it easy to give the same permissions to multiple people. For example:

- `developers` group - all programmers on a team
- `sudo` group - users who can run admin commands
- `www-data` group - users who can modify web server files

Every user has:

- **Primary group** - your main group (usually same name as your username)
- **Secondary groups** - additional groups you belong to

```sh
# See your groups
groups
# dan sudo users docker

# See groups for a specific user
groups alice
# alice : alice developers sudo
```

The **primary group** is assigned to files you create by default. **Secondary groups** give you additional access to shared resources.

### The Root User: The All-Powerful Admin

The **root user** (also called "superuser") is the administrator account with UID 0. Root can:

- Read, write, and delete ANY file
- Change ANY permission
- Install software system-wide
- Manage users and groups
- Basically do ANYTHING

```sh
# Root's home directory is /root (not /home/root)
# Root's UID is always 0
```

!!! danger "With Great Power..."
    The root account can destroy your entire system with a single command. That's why you should NEVER log in as root for everyday work. Instead, use `sudo` for specific commands that need admin privileges. We'll cover that soon!

## The Permission Trio: Read, Write, Execute

Every file and directory in Linux has three types of permissions:

### Read Permission (r)

**Read permission** allows you to view the contents of a file or list the contents of a directory.

- For files: You can `cat`, `less`, `head`, or otherwise view the file
- For directories: You can `ls` the directory to see what's inside

```sh
# If you have read permission:
cat secret.txt       # Works!
less document.pdf    # Works!

# Without read permission:
cat secret.txt
# cat: secret.txt: Permission denied
```

### Write Permission (w)

**Write permission** allows you to modify a file or add/remove files in a directory.

- For files: You can edit, append to, or truncate the file
- For directories: You can create, delete, or rename files inside

```sh
# If you have write permission:
echo "new content" >> file.txt    # Works!
rm file.txt                       # Works!

# Without write permission:
echo "data" >> file.txt
# bash: file.txt: Permission denied
```

### Execute Permission (x)

**Execute permission** allows you to run a file as a program or enter a directory.

- For files: You can run the file as a script or program
- For directories: You can `cd` into the directory

```sh
# If you have execute permission on a script:
./myscript.sh        # Works!

# Without execute permission:
./myscript.sh
# bash: ./myscript.sh: Permission denied

# For directories, you need execute to enter them:
cd /some/directory   # Needs execute permission on directory
```

!!! note "Directory Permissions Are Tricky!"
    For directories, permissions work a bit differently:
    - **Read (r)**: Can list files (`ls`)
    - **Write (w)**: Can create/delete files inside
    - **Execute (x)**: Can enter the directory (`cd`) and access files

    You typically need BOTH read AND execute to usefully browse a directory. Execute alone lets you access files if you know their names, but you can't list them!

## The Three Categories: Owner, Group, Others

Linux assigns permissions to three categories of users:

### Owner Permissions

The **owner** (also called "user") is the person who created the file. **Owner permissions** define what the file's owner can do.

```sh
ls -l myfile.txt
# -rw-r--r-- 1 dan developers 1024 Dec 6 10:00 myfile.txt
#              ^^^
#              Owner is "dan"
```

### Group Permissions

**Group permissions** apply to all members of the file's group. Anyone in the `developers` group (in the example above) gets these permissions.

### Other Permissions

**Other permissions** (sometimes called "world" permissions) apply to EVERYONE ELSE—any user who isn't the owner and isn't in the file's group.

Think of it like a party:

- **Owner**: You (the host)
- **Group**: Your friends on the guest list
- **Others**: Random strangers off the street

You probably want to give yourself full access, your friends some access, and strangers very limited access!

## Reading Permission Notation

When you run `ls -l`, you see permissions displayed in a specific format called **permission notation**:

```sh
ls -l
# -rwxr-xr-- 1 dan developers 4096 Dec 6 10:00 script.sh
```

Let's decode `-rwxr-xr--`:

| Position | Characters | Meaning |
|----------|------------|---------|
| 1 | `-` | File type (- = file, d = directory, l = link) |
| 2-4 | `rwx` | Owner permissions (read, write, execute) |
| 5-7 | `r-x` | Group permissions (read, no write, execute) |
| 8-10 | `r--` | Other permissions (read only) |

The permission string is always 10 characters:

```
-rwxr-xr--
│├─┤├─┤├─┤
│ │  │  └── Others: r-- (read only)
│ │  └── Group: r-x (read and execute)
│ └── Owner: rwx (read, write, execute)
└── File type: - (regular file)
```

**Quick reference:**

| Letter | Permission | Numeric Value |
|--------|------------|---------------|
| `r` | Read | 4 |
| `w` | Write | 2 |
| `x` | Execute | 1 |
| `-` | No permission | 0 |

#### Diagram: Permission Bits Breakdown

<details markdown="1">
<summary>Understanding Permission Notation</summary>
Type: diagram

Bloom Taxonomy: Understand, Remember
Learning Objective: Help students visualize how the 10-character permission string breaks down into file type and three permission groups.

Layout: Horizontal breakdown of permission string with labels

Visual elements:
- Large permission string: "-rwxr-xr--"
- Brackets grouping characters
- Labels for each section
- Color coding for each category

Breakdown:
- Position 1: File type
  - "-" = regular file
  - "d" = directory
  - "l" = symbolic link

- Positions 2-4: Owner permissions (green)
  - r = read (4)
  - w = write (2)
  - x = execute (1)

- Positions 5-7: Group permissions (blue)
  - r = read (4)
  - - = no permission (0)
  - x = execute (1)

- Positions 8-10: Other permissions (orange)
  - r = read (4)
  - - = no permission (0)
  - - = no permission (0)

Interactive features:
- Hover over each character to see explanation
- Show numeric value calculation below each group
- Toggle between different example permission strings

Color scheme:
- Owner: Green
- Group: Blue
- Others: Orange
- File type: Gray

Implementation: p5.js or HTML/CSS
</details>

## Numeric Permissions: The Octal Way

While `rwx` notation is human-readable, there's also a numeric system using **numeric permissions** (also called octal permissions). Each permission has a value:

- **r** (read) = 4
- **w** (write) = 2
- **x** (execute) = 1

Add them up for each category:

| Permission | Calculation | Numeric |
|------------|-------------|---------|
| `rwx` | 4+2+1 | 7 |
| `rw-` | 4+2+0 | 6 |
| `r-x` | 4+0+1 | 5 |
| `r--` | 4+0+0 | 4 |
| `-wx` | 0+2+1 | 3 |
| `-w-` | 0+2+0 | 2 |
| `--x` | 0+0+1 | 1 |
| `---` | 0+0+0 | 0 |

So the permission `-rwxr-xr--` becomes:

- Owner: rwx = 7
- Group: r-x = 5
- Others: r-- = 4
- **Combined: 754**

Common permission numbers:

| Numeric | Symbolic | Use Case |
|---------|----------|----------|
| `755` | `rwxr-xr-x` | Executable programs, directories |
| `644` | `rw-r--r--` | Regular files (documents, configs) |
| `700` | `rwx------` | Private directories |
| `600` | `rw-------` | Private files (SSH keys) |
| `777` | `rwxrwxrwx` | Everyone can do everything (AVOID!) |

!!! warning "Never Use 777"
    Setting permissions to `777` means anyone can read, write, and execute the file. This is almost never what you want and is a major security risk. If something tells you to "just chmod 777 it," find a better solution!

#### Diagram: Permission Calculator MicroSim

<details markdown="1">
<summary>Interactive Permission Calculator</summary>
Type: microsim

Bloom Taxonomy: Apply, Analyze
Learning Objective: Allow students to interactively build permission strings by clicking checkboxes and see both symbolic and numeric representations update in real-time.

Canvas layout (responsive, ~700px max width):
- Top section: Three columns for Owner, Group, Others
- Middle section: Resulting permission string and numeric value
- Bottom section: Common presets and explanations

Visual elements:
- 9 checkboxes arranged in 3x3 grid (rwx for each category)
- Labels: Owner (green), Group (blue), Others (orange)
- Display: "-rwxrwxrwx" updating as checkboxes change
- Display: "777" numeric value updating
- Preset buttons for common permissions

Interactive controls:
- 9 checkboxes (r, w, x for each of owner, group, others)
- Preset buttons: "755 (Program)", "644 (File)", "700 (Private)", "600 (Secret)"
- Text input to enter numeric permission and see checkboxes update

Behavior:
- Click checkbox: Toggle permission on/off
- Permission string updates immediately
- Numeric value calculates automatically
- Click preset: Sets all checkboxes to that permission
- Enter number: Checkboxes update to match

Example scenarios:
- Default starts at 644 (-rw-r--r--)
- Student clicks execute for owner → becomes 744
- Student enters "700" → only owner checkboxes checked

Color scheme:
- Owner column: Green header
- Group column: Blue header
- Others column: Orange header
- Enabled permission: Filled checkbox
- Disabled permission: Empty checkbox

Implementation: p5.js
</details>

## Changing Permissions: The Chmod Command

The **chmod command** (change mode) modifies file permissions. You can use either symbolic or numeric notation.

### Symbolic Mode

```sh
# Add execute permission for owner
chmod u+x script.sh

# Remove write permission from group
chmod g-w file.txt

# Set read permission for others
chmod o=r file.txt

# Add execute for everyone
chmod a+x program

# Combine multiple changes
chmod u+x,g-w,o-r file.txt
```

**Symbolic mode letters:**

| Letter | Meaning |
|--------|---------|
| `u` | User (owner) |
| `g` | Group |
| `o` | Others |
| `a` | All (u+g+o) |
| `+` | Add permission |
| `-` | Remove permission |
| `=` | Set exactly |

### Numeric Mode

```sh
# Set to rwxr-xr-x (755)
chmod 755 script.sh

# Set to rw-r--r-- (644)
chmod 644 document.txt

# Set to rwx------ (700)
chmod 700 private/

# Set to rw------- (600)
chmod 600 ~/.ssh/id_rsa
```

### Recursive Permission Changes

Use `-R` to change permissions on a directory and everything inside:

```sh
# Make all files in project readable by group
chmod -R g+r project/

# Set directory permissions (be careful!)
chmod -R 755 website/
```

!!! tip "Directories Need Execute"
    Remember: directories need execute permission to be entered. A common pattern is:
    ```sh
    # Files: 644, Directories: 755
    find /path -type f -exec chmod 644 {} \;
    find /path -type d -exec chmod 755 {} \;
    ```

## Changing Ownership: Chown and Chgrp

### The Chown Command

The **chown command** (change owner) changes who owns a file:

```sh
# Change owner
sudo chown alice file.txt

# Change owner and group
sudo chown alice:developers file.txt

# Change only group (note the colon)
sudo chown :developers file.txt

# Recursive change
sudo chown -R alice:developers project/
```

You usually need `sudo` to change ownership because you can only "give away" files if you're root.

### The Chgrp Command

The **chgrp command** (change group) specifically changes the group ownership:

```sh
# Change group
chgrp developers file.txt

# Recursive change
chgrp -R developers project/
```

You can use `chgrp` without sudo IF you're a member of the target group.

```sh
# Check what groups you're in
groups
# dan sudo developers docker

# This works (you're in developers)
chgrp developers myfile.txt

# This fails (you're not in accounting)
chgrp accounting myfile.txt
# chgrp: changing group of 'myfile.txt': Operation not permitted
```

## Default Permissions: Umask

When you create a new file or directory, what permissions does it get? That's controlled by the **umask command**.

### Understanding Umask

The **default permissions** for new files would be 666 (rw-rw-rw-) and for directories 777 (rwxrwxrwx). But umask SUBTRACTS from these defaults.

```sh
# See current umask
umask
# 0022

# What this means:
# Files: 666 - 022 = 644 (rw-r--r--)
# Directories: 777 - 022 = 755 (rwxr-xr-x)
```

The umask value removes permissions:

| Umask | File Result | Directory Result |
|-------|-------------|------------------|
| `022` | 644 (rw-r--r--) | 755 (rwxr-xr-x) |
| `027` | 640 (rw-r-----) | 750 (rwxr-x---) |
| `077` | 600 (rw-------) | 700 (rwx------) |
| `000` | 666 (rw-rw-rw-) | 777 (rwxrwxrwx) |

### Setting Umask

```sh
# Set umask for current session
umask 027

# Make it permanent (add to ~/.bashrc)
echo "umask 027" >> ~/.bashrc

# See umask in symbolic form
umask -S
# u=rwx,g=rx,o=
```

!!! tip "Security Best Practice"
    A umask of `027` is good for shared systems—it means new files are readable by your group but not by random other users. For maximum privacy, use `077`.

## The Power of Sudo

### The Sudo Command

The **sudo command** (superuser do) lets you run a single command as root without logging in as root:

```sh
# Run a command as root
sudo apt update

# Edit a protected file
sudo nano /etc/hosts

# See who can use sudo
sudo cat /etc/sudoers
```

When you run `sudo`, you're asked for YOUR password (not root's). After entering it, you get a few minutes where you won't be asked again.

### Why Sudo Instead of Root?

1. **Accountability**: sudo logs WHO ran WHAT command
2. **Precision**: Only specific commands get root power
3. **Safety**: Less chance of accidentally destroying things
4. **No root password needed**: Users use their own passwords

```sh
# See sudo history
sudo cat /var/log/auth.log | grep sudo
```

### The Su Command

The **su command** (switch user) lets you become another user entirely:

```sh
# Become root (need root password)
su
# Enter root password...

# Become root with your password (if in sudo group)
sudo su

# Become another user
su alice
# Enter alice's password...

# Become another user with login environment
su - alice

# Run single command as another user
su -c "whoami" alice
```

The difference between `su` and `sudo`:

| Feature | sudo | su |
|---------|------|-----|
| Runs | Single command | Opens shell session |
| Password | Your password | Target user's password |
| Logging | Detailed | Basic |
| Best for | One-off admin tasks | Extended work as another user |

!!! warning "Exit Root Sessions!"
    If you use `su` to become root, don't forget to `exit` when done! Running as root longer than necessary increases risk of mistakes.

## Special Permissions: The Extra Bits

Beyond the basic rwx permissions, Linux has three **special permissions** that provide additional functionality.

### The Setuid Bit

The **setuid bit** (set user ID) makes a program run with the permissions of its OWNER, not the user running it.

```sh
# See setuid in action
ls -l /usr/bin/passwd
# -rwsr-xr-x 1 root root 68208 Dec  5 10:00 /usr/bin/passwd
#    ^
#    The 's' means setuid is set
```

Why does `/usr/bin/passwd` need setuid? Because:

1. Regular users can change their own password
2. But passwords are stored in `/etc/shadow` which only root can write
3. setuid lets `passwd` run as root temporarily to update the file

```sh
# Set setuid (be VERY careful!)
chmod u+s program
chmod 4755 program  # 4 = setuid
```

### The Setgid Bit

The **setgid bit** (set group ID) has two uses:

For files: Program runs with file's GROUP permissions:

```sh
# Set setgid on file
chmod g+s program
chmod 2755 program  # 2 = setgid
```

For directories: New files inherit the directory's group (great for shared folders!):

```sh
# Set setgid on directory
chmod g+s shared_folder/

# Now any file created in shared_folder/
# will belong to shared_folder's group, not creator's primary group
```

### The Sticky Bit

The **sticky bit** on a directory means only the file's owner (or root) can delete files, even if others have write permission. This is essential for shared directories like `/tmp`.

```sh
# See sticky bit
ls -ld /tmp
# drwxrwxrwt 15 root root 4096 Dec  6 10:00 /tmp
#          ^
#          The 't' means sticky bit is set

# Set sticky bit
chmod +t shared_directory/
chmod 1755 shared_directory/  # 1 = sticky
```

Without sticky bit: Anyone with write permission to `/tmp` could delete anyone else's temporary files. With sticky bit: You can only delete YOUR files, even though everyone can write to the directory.

### Special Permission Summary

| Bit | Numeric | On Files | On Directories |
|-----|---------|----------|----------------|
| Setuid | 4xxx | Run as file owner | (no effect) |
| Setgid | 2xxx | Run as file group | New files inherit directory's group |
| Sticky | 1xxx | (legacy) | Only owner can delete files |

The special bits appear in the execute position:

| Permission | Meaning |
|------------|---------|
| `rws` | setuid + execute |
| `rwS` | setuid without execute |
| `rwx` with `s` in group | setgid |
| `rwt` | sticky + execute |
| `rwT` | sticky without execute |

#### Diagram: Special Permissions Visualized

<details markdown="1">
<summary>Understanding Special Permission Bits</summary>
Type: diagram

Bloom Taxonomy: Understand, Analyze
Learning Objective: Illustrate when and why special permissions (setuid, setgid, sticky) are used with real-world examples.

Layout: Three panels showing each special permission

Panel 1 - Setuid (red):
- Icon: User with crown
- Example: /usr/bin/passwd command
- Flow diagram showing:
  - User "dan" runs passwd
  - Program runs as "root" (owner)
  - Can write to /etc/shadow
  - Security: Only trusted programs should have this!

Panel 2 - Setgid on Directory (blue):
- Icon: Folder with group badge
- Example: /shared/projects directory
- Flow diagram showing:
  - Directory owned by group "developers"
  - User creates file
  - File automatically belongs to "developers" group
  - Benefit: Team collaboration without manual chgrp

Panel 3 - Sticky Bit (green):
- Icon: Folder with lock
- Example: /tmp directory
- Flow diagram showing:
  - All users can write to /tmp
  - User A creates file
  - User B tries to delete → DENIED
  - Only owner or root can delete

Visual elements:
- Permission strings showing s/S/t/T
- Numeric representation (4755, 2775, 1777)
- Arrow flows for each scenario

Interactive features:
- Click each panel for detailed walkthrough
- Show before/after permissions
- Quiz: "Which permission prevents others from deleting your /tmp files?"

Color scheme:
- Setuid: Red/orange (danger, power)
- Setgid: Blue (teamwork)
- Sticky: Green (protection)

Implementation: p5.js or HTML/CSS
</details>

## Practical Permission Scenarios

Let's apply everything we've learned to real situations!

### Scenario 1: Setting Up a Shared Project Directory

Your team needs a shared folder where everyone can collaborate:

```sh
# Create the directory
sudo mkdir /projects/webapp

# Create a group for the team
sudo groupadd webteam

# Add users to the group
sudo usermod -aG webteam alice
sudo usermod -aG webteam bob
sudo usermod -aG webteam dan

# Set ownership
sudo chown root:webteam /projects/webapp

# Set permissions with setgid
sudo chmod 2775 /projects/webapp
# 2 = setgid (new files inherit group)
# 775 = rwxrwxr-x

# Now any file created inherits webteam group!
```

### Scenario 2: Protecting SSH Keys

SSH private keys should be VERY restricted:

```sh
# Set correct permissions for SSH directory
chmod 700 ~/.ssh

# Set correct permissions for private key
chmod 600 ~/.ssh/id_rsa

# Set correct permissions for public key
chmod 644 ~/.ssh/id_rsa.pub

# Set correct permissions for authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

SSH will actually REFUSE to use keys with incorrect permissions!

### Scenario 3: Web Server Files

A web server needs to read files but shouldn't be able to modify them:

```sh
# Typical web directory setup
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
sudo chmod -R 644 /var/www/html/*.html

# Directories need execute for traversal
find /var/www/html -type d -exec chmod 755 {} \;

# Files just need read
find /var/www/html -type f -exec chmod 644 {} \;
```

### Scenario 4: Script That Needs to Be Executable

You wrote a script and want to run it:

```sh
# Check current permissions
ls -l myscript.sh
# -rw-r--r-- 1 dan dan 256 Dec 6 10:00 myscript.sh

# Add execute permission for yourself
chmod u+x myscript.sh

# Or for everyone
chmod +x myscript.sh

# Or set common script permissions
chmod 755 myscript.sh

# Now you can run it
./myscript.sh
```

## Permission Troubleshooting

When permissions go wrong, here's how to debug:

```sh
# Check your user and groups
id

# Check file permissions and ownership
ls -la file.txt

# Check directory permissions (you might not be able to enter!)
ls -la /path/to/directory

# Check if you have permission to a path (all directories in path)
namei -l /path/to/deeply/nested/file

# See effective permissions for a user on a file
sudo -u alice test -r file.txt && echo "Can read" || echo "Cannot read"
```

**Common permission problems:**

| Error | Likely Cause | Fix |
|-------|--------------|-----|
| "Permission denied" on file | Missing r or x permission | `chmod +r` or `chmod +x` |
| "Permission denied" on script | Missing execute permission | `chmod +x script.sh` |
| "Cannot cd to directory" | Missing execute on directory | `chmod +x directory/` |
| "Cannot create file" | Missing write on directory | `chmod +w directory/` |
| "Operation not permitted" | Need root/sudo | `sudo command` |

## Permission Cheat Sheet

**Quick reference for common tasks:**

| Task | Command |
|------|---------|
| Make file executable | `chmod +x file` |
| Make file private | `chmod 600 file` |
| Make directory private | `chmod 700 dir/` |
| Share directory with group | `chmod 775 dir/` |
| Standard file permissions | `chmod 644 file` |
| Standard directory permissions | `chmod 755 dir/` |
| Change owner | `sudo chown user file` |
| Change group | `chgrp group file` |
| Change both | `sudo chown user:group file` |
| Recursive change | Add `-R` flag |

**Permission numbers to remember:**

| Number | Meaning | Use For |
|--------|---------|---------|
| 755 | rwxr-xr-x | Programs, scripts, directories |
| 644 | rw-r--r-- | Regular files, documents |
| 700 | rwx------ | Private directories |
| 600 | rw------- | Private files (SSH keys) |
| 775 | rwxrwxr-x | Shared directories |
| 664 | rw-rw-r-- | Shared files |

## Key Takeaways

You've mastered Linux permissions! Here's what you now know:

- **Three permission types**: read (r), write (w), execute (x)
- **Three categories**: owner, group, others
- **Permission notation**: `-rwxr-xr-x` = 755
- **chmod**: Change permissions (symbolic or numeric)
- **chown/chgrp**: Change ownership
- **umask**: Controls default permissions for new files
- **sudo**: Run commands as root safely
- **Special permissions**: setuid, setgid, sticky bit

!!! success "You're Now a Permission Pro!"
    Understanding permissions is crucial for Linux security and collaboration. You can now control exactly who can access your files and what they can do with them. This knowledge is essential for system administration, web development, and any serious Linux work!

## What's Next?

Now that you understand who can access files and what they can do, it's time to learn about **finding things in those files**! Next chapter covers grep and regular expressions—powerful tools for searching through text.

---

??? question "Quick Quiz: File Permissions and Ownership"
    1. What permission do you need to enter a directory?
    2. What does permission 755 mean?
    3. What's the difference between sudo and su?
    4. What does the setgid bit do on a directory?
    5. How do you make a file only readable by its owner?
    6. What does umask 027 do?

??? note "Quiz Answers"
    1. Execute (x) permission is needed to enter (cd into) a directory
    2. 755 = rwxr-xr-x (owner: full access, group/others: read and execute)
    3. sudo runs a single command as root; su opens a shell session as another user
    4. On a directory, setgid makes new files inherit the directory's group
    5. `chmod 600 file` or `chmod u=rw,go= file`
    6. Sets default permissions so new files are 640 (rw-r-----) and directories are 750 (rwxr-x---)

