# Quiz: File Permissions and Ownership

Test your understanding of Linux's permission system and user management.

---

#### 1. What do the three permission categories represent in Linux?

<div class="upper-alpha" markdown>
1. Read, Write, Execute
2. Owner, Group, Others
3. User, Admin, System
4. Create, Modify, Delete
</div>

??? question "Show Answer"
    The correct answer is **B**. Linux permissions are organized into three categories: Owner (the file's owner), Group (members of the file's group), and Others (everyone else). Each category can have read, write, and execute permissions.

    **Concept Tested:** Owner Permissions, Group Permissions, Other Permissions

    **See:** [Chapter 7 - Permission Categories](index.md)

---

#### 2. What does the permission string `rwxr-xr--` mean?

<div class="upper-alpha" markdown>
1. Everyone has full access
2. Owner: full, Group: read+execute, Others: read only
3. No one can access the file
4. Only root can access the file
</div>

??? question "Show Answer"
    The correct answer is **B**. Reading left to right: `rwx` (owner has read, write, execute), `r-x` (group has read and execute but not write), `r--` (others have read only). The dashes indicate missing permissions.

    **Concept Tested:** Permission Notation

    **See:** [Chapter 7 - Reading Permissions](index.md)

---

#### 3. What is the numeric equivalent of `rwxr-xr-x`?

<div class="upper-alpha" markdown>
1. 644
2. 777
3. 755
4. 700
</div>

??? question "Show Answer"
    The correct answer is **C**. Each permission has a value: r=4, w=2, x=1. Add them per category: rwx=7, r-x=5, r-x=5. So `rwxr-xr-x` equals 755. This is the standard permission for executable files and directories.

    **Concept Tested:** Numeric Permissions

    **See:** [Chapter 7 - Numeric Permissions](index.md)

---

#### 4. What command changes file permissions?

<div class="upper-alpha" markdown>
1. perm
2. chmod
3. chperm
4. access
</div>

??? question "Show Answer"
    The correct answer is **B**. The `chmod` (change mode) command modifies file permissions. You can use symbolic mode (`chmod u+x file`) or numeric mode (`chmod 755 file`).

    **Concept Tested:** Chmod Command

    **See:** [Chapter 7 - Chmod Command](index.md)

---

#### 5. What does `chmod u+x script.sh` do?

<div class="upper-alpha" markdown>
1. Removes execute permission from user
2. Adds execute permission for the file owner
3. Changes the file owner
4. Makes the script invisible
</div>

??? question "Show Answer"
    The correct answer is **B**. In symbolic mode, `u` means user (owner), `+` means add, and `x` means execute. So `u+x` adds execute permission for the owner, allowing them to run the script.

    **Concept Tested:** Chmod Command

    **See:** [Chapter 7 - Symbolic Mode](index.md#symbolic-mode)

---

#### 6. What is the root user?

<div class="upper-alpha" markdown>
1. A regular user with limited access
2. The superuser with unrestricted system access
3. The user who installed Linux
4. A network administrator account
</div>

??? question "Show Answer"
    The correct answer is **B**. The root user (UID 0) is the superuser with complete access to every file and command on the system. Root can bypass all permission checks. This power makes it dangerous—mistakes as root can destroy the system.

    **Concept Tested:** Root User

    **See:** [Chapter 7 - Root User](index.md)

---

#### 7. What does the `sudo` command do?

<div class="upper-alpha" markdown>
1. Switches permanently to root user
2. Runs a single command with root privileges
3. Creates a new user account
4. Changes file ownership
</div>

??? question "Show Answer"
    The correct answer is **B**. The `sudo` (superuser do) command runs a single command with root privileges, then returns to normal user mode. It's safer than logging in as root because you only have elevated privileges when needed.

    **Concept Tested:** Sudo Command

    **See:** [Chapter 7 - Sudo Command](index.md)

---

#### 8. What command changes the owner of a file?

<div class="upper-alpha" markdown>
1. chmod
2. chown
3. owner
4. setowner
</div>

??? question "Show Answer"
    The correct answer is **B**. The `chown` (change owner) command changes file ownership. For example, `chown dan:users file.txt` changes the owner to "dan" and the group to "users". You typically need sudo to change ownership.

    **Concept Tested:** Chown Command

    **See:** [Chapter 7 - Chown Command](index.md)

---

#### 9. What is the sticky bit used for?

<div class="upper-alpha" markdown>
1. Making files read-only
2. Preventing users from deleting others' files in shared directories
3. Encrypting file contents
4. Compressing files automatically
</div>

??? question "Show Answer"
    The correct answer is **B**. The sticky bit on a directory (like `/tmp`) allows anyone to create files, but only the file owner (or root) can delete them. This prevents users from deleting each other's files in shared directories.

    **Concept Tested:** Sticky Bit, Special Permissions

    **See:** [Chapter 7 - Sticky Bit](index.md)

---

#### 10. What does `umask` control?

<div class="upper-alpha" markdown>
1. Which users can log in
2. Default permissions for newly created files
3. Maximum file size
4. Network access
</div>

??? question "Show Answer"
    The correct answer is **B**. The `umask` (user mask) sets the default permissions for newly created files and directories by specifying which permissions to remove. A umask of 022 means new files get 644 (rw-r--r--) and directories get 755.

    **Concept Tested:** Umask Command, Default Permissions

    **See:** [Chapter 7 - Umask](index.md)
