# Quiz: File System Fundamentals

Test your understanding of the Linux file system hierarchy and navigation commands.

---

#### 1. What is the root directory in Linux?

<div class="upper-alpha" markdown>
1. /home
2. /root
3. /
4. C:\
</div>

??? question "Show Answer"
    The correct answer is **C**. The root directory `/` is the top of the Linux file system hierarchy. All other directories and files branch from it. Don't confuse this with `/root` (the root user's home directory) or the root user account.

    **Concept Tested:** Root Directory

    **See:** [Chapter 4 - Root Directory](index.md#the-root-directory)

---

#### 2. What is the difference between an absolute path and a relative path?

<div class="upper-alpha" markdown>
1. Absolute paths are faster to type
2. Absolute paths start from /; relative paths start from current directory
3. Relative paths only work in scripts
4. There is no difference
</div>

??? question "Show Answer"
    The correct answer is **B**. An absolute path specifies the complete location from the root directory (e.g., `/home/dan/Documents/file.txt`). A relative path specifies location relative to the current directory (e.g., `Documents/file.txt` if you're in `/home/dan`).

    **Concept Tested:** Absolute Path, Relative Path

    **See:** [Chapter 4 - Paths](index.md#absolute-vs-relative-paths)

---

#### 3. What does the `pwd` command display?

<div class="upper-alpha" markdown>
1. Password information
2. Power consumption data
3. Print working directory (current location)
4. Previous working directory
</div>

??? question "Show Answer"
    The correct answer is **C**. The `pwd` command (print working directory) displays the absolute path of your current location in the file system. It's useful when you need to know exactly where you are, especially after navigating with relative paths.

    **Concept Tested:** Pwd Command

    **See:** [Chapter 4 - Pwd Command](index.md#pwd-command)

---

#### 4. What does `cd ..` do?

<div class="upper-alpha" markdown>
1. Changes to the home directory
2. Changes to the root directory
3. Moves up one directory (parent directory)
4. Changes to the previous directory
</div>

??? question "Show Answer"
    The correct answer is **C**. The `..` represents the parent directory, so `cd ..` moves you up one level in the directory hierarchy. For example, if you're in `/home/dan/Documents`, running `cd ..` takes you to `/home/dan`.

    **Concept Tested:** Parent Directory, Cd Command

    **See:** [Chapter 4 - Directory Navigation](index.md#navigating-with-cd)

---

#### 5. What shortcut represents your home directory?

<div class="upper-alpha" markdown>
1. @
2. #
3. ~
4. $
</div>

??? question "Show Answer"
    The correct answer is **C**. The tilde `~` represents your home directory. So `cd ~` takes you home, `~/Documents` refers to the Documents folder in your home directory, and `~dan` refers to the home directory of user "dan."

    **Concept Tested:** Home Directory

    **See:** [Chapter 4 - Home Directory](index.md#home-directory)

---

#### 6. What does the `ls -l` command show?

<div class="upper-alpha" markdown>
1. Only hidden files
2. Long format with permissions, owner, size, and date
3. Files sorted by size
4. Only directories
</div>

??? question "Show Answer"
    The correct answer is **B**. The `-l` flag shows the "long" listing format, which displays permissions, number of links, owner, group, file size, modification date, and filename for each item. This provides much more information than a simple `ls`.

    **Concept Tested:** Ls Command, Ls Options

    **See:** [Chapter 4 - Ls Command](index.md#ls-command)

---

#### 7. What are hidden files in Linux?

<div class="upper-alpha" markdown>
1. Files stored in a secret partition
2. Files whose names start with a dot (.)
3. Files without read permissions
4. Encrypted files
</div>

??? question "Show Answer"
    The correct answer is **B**. Hidden files (also called dot files) are any files or directories whose names begin with a period (`.`). Examples include `.bashrc` and `.config`. Use `ls -a` to show hidden files. They're typically used for configuration files.

    **Concept Tested:** Hidden Files, Dot Files

    **See:** [Chapter 4 - Hidden Files](index.md#hidden-files)

---

#### 8. What is stored in the /etc directory?

<div class="upper-alpha" markdown>
1. User home directories
2. System-wide configuration files
3. Temporary files
4. User-installed programs
</div>

??? question "Show Answer"
    The correct answer is **B**. The `/etc` directory contains system-wide configuration files. Examples include `/etc/passwd` (user accounts), `/etc/hosts` (network hosts), and `/etc/fstab` (filesystem mounts). The name historically stands for "editable text configuration."

    **Concept Tested:** Etc Directory

    **See:** [Chapter 4 - Directory Structure](index.md#etc-directory)

---

#### 9. What does the `tree` command display?

<div class="upper-alpha" markdown>
1. Information about plant species
2. A visual tree structure of directories and files
3. Family tree of Linux distributions
4. Process hierarchy
</div>

??? question "Show Answer"
    The correct answer is **B**. The `tree` command displays a visual tree structure showing directories and their contents in a hierarchical format. It's great for understanding directory structure at a glance. Use `tree -L 2` to limit depth.

    **Concept Tested:** Tree Command

    **See:** [Chapter 4 - Tree Command](index.md#tree-command)

---

#### 10. What is the purpose of the /tmp directory?

<div class="upper-alpha" markdown>
1. Storing important permanent files
2. Holding temporary files that are cleared on reboot
3. Template files for new users
4. System backup storage
</div>

??? question "Show Answer"
    The correct answer is **B**. The `/tmp` directory stores temporary files that programs create during operation. These files are typically cleared when the system reboots. Any user can write to `/tmp`, making it useful for temporary data but not for permanent storage.

    **Concept Tested:** Tmp Directory

    **See:** [Chapter 4 - Tmp Directory](index.md#tmp-directory)
