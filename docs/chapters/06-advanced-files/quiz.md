# Quiz: Advanced File Operations

Test your understanding of symbolic links, hard links, and advanced file concepts.

---

#### 1. What is a symbolic link (symlink)?

<div class="upper-alpha" markdown>
1. A compressed version of a file
2. A pointer that references another file or directory by path
3. A backup copy of a file
4. An encrypted file
</div>

??? question "Show Answer"
    The correct answer is **B**. A symbolic link is a special file that contains a reference (path) to another file or directory. It's like a shortcut in Windows. If the original file is deleted, the symlink becomes "broken" and points to nothing.

    **Concept Tested:** Symbolic Links

    **See:** [Chapter 6 - Symbolic Links](index.md#symbolic-links)

---

#### 2. How do you create a symbolic link?

<div class="upper-alpha" markdown>
1. cp -s source link
2. ln -s target linkname
3. link target linkname
4. symlink target linkname
</div>

??? question "Show Answer"
    The correct answer is **B**. The `ln -s` command creates a symbolic link. For example, `ln -s /path/to/original linkname` creates a symlink called "linkname" pointing to the original file. The `-s` flag is essential—without it, you create a hard link instead.

    **Concept Tested:** Ln Command, Symbolic Links

    **See:** [Chapter 6 - Creating Symlinks](index.md#creating-symbolic-links)

---

#### 3. What is the key difference between a symbolic link and a hard link?

<div class="upper-alpha" markdown>
1. Hard links are larger files
2. Symbolic links point to paths; hard links point to the same inode
3. Hard links only work on Windows
4. Symbolic links are encrypted
</div>

??? question "Show Answer"
    The correct answer is **B**. A symbolic link stores a path to the target file. A hard link points to the same inode (data on disk) as the original—they're essentially two names for the same file. Deleting the original doesn't affect hard links, but breaks symbolic links.

    **Concept Tested:** Hard Links, Symbolic Links, Inodes

    **See:** [Chapter 6 - Hard Links vs Symbolic Links](index.md#hard-links)

---

#### 4. What is an inode?

<div class="upper-alpha" markdown>
1. An internet connection node
2. A data structure storing file metadata and disk location
3. A type of network cable
4. An input device
</div>

??? question "Show Answer"
    The correct answer is **B**. An inode is a data structure on disk that stores metadata about a file (permissions, owner, timestamps, size) and pointers to the actual data blocks. Every file has an inode, and hard links share the same inode.

    **Concept Tested:** Inodes

    **See:** [Chapter 6 - Inodes](index.md#understanding-inodes)

---

#### 5. Which command shows inode numbers for files?

<div class="upper-alpha" markdown>
1. ls -l
2. ls -i
3. stat -i
4. inode
</div>

??? question "Show Answer"
    The correct answer is **B**. The `ls -i` command displays the inode number for each file. You can combine it with other options like `ls -li` for long format with inodes. The `stat` command also shows inode information along with other file details.

    **Concept Tested:** Inodes, Ls Command

    **See:** [Chapter 6 - Viewing Inodes](index.md#viewing-inodes)

---

#### 6. Can you create a hard link to a directory?

<div class="upper-alpha" markdown>
1. Yes, always
2. No, hard links to directories are not allowed
3. Only as root user
4. Only for empty directories
</div>

??? question "Show Answer"
    The correct answer is **B**. Hard links to directories are not allowed in Linux (except for `.` and `..` which the system manages). This prevents circular references that could break the file system. Use symbolic links instead to create directory shortcuts.

    **Concept Tested:** Hard Links

    **See:** [Chapter 6 - Hard Link Limitations](index.md#hard-link-limitations)

---

#### 7. What happens to a symbolic link when the original file is deleted?

<div class="upper-alpha" markdown>
1. The symlink is automatically deleted
2. The symlink still contains the data
3. The symlink becomes a "dangling" or broken link
4. The symlink converts to a hard link
</div>

??? question "Show Answer"
    The correct answer is **C**. When the target of a symbolic link is deleted, the symlink becomes "dangling" or broken—it still exists but points to nothing. Attempting to access it results in a "No such file or directory" error. `ls -l` often shows broken links in red.

    **Concept Tested:** Symbolic Links

    **See:** [Chapter 6 - Broken Symlinks](index.md#broken-symbolic-links)

---

#### 8. What command displays detailed file information including inode, permissions, and timestamps?

<div class="upper-alpha" markdown>
1. info
2. details
3. stat
4. file
</div>

??? question "Show Answer"
    The correct answer is **C**. The `stat` command displays comprehensive information about a file including inode number, size, blocks, access/modify/change times, permissions in multiple formats, and more. It's more detailed than `ls -l`.

    **Concept Tested:** Stat Command

    **See:** [Chapter 6 - Stat Command](index.md#stat-command)

---

#### 9. What does the `file` command do?

<div class="upper-alpha" markdown>
1. Creates a new file
2. Determines the type of a file by examining its contents
3. Lists all files in a directory
4. Compresses a file
</div>

??? question "Show Answer"
    The correct answer is **B**. The `file` command examines a file's contents (not just its extension) to determine what type of file it is. For example, `file image.dat` might reveal it's actually a JPEG image, regardless of its extension.

    **Concept Tested:** File Command

    **See:** [Chapter 6 - File Command](index.md#file-command)

---

#### 10. Why might you prefer a symbolic link over a hard link?

<div class="upper-alpha" markdown>
1. Symbolic links are faster
2. Symbolic links can cross file systems and link to directories
3. Hard links don't work in Linux
4. Symbolic links use less disk space
</div>

??? question "Show Answer"
    The correct answer is **B**. Symbolic links can link to files on different file systems (partitions) and can link to directories—hard links cannot do either. Symbolic links are more flexible but break if the target is moved or deleted.

    **Concept Tested:** Symbolic Links, Hard Links

    **See:** [Chapter 6 - When to Use Symlinks](index.md#choosing-between-links)
