# Quiz: File Operations and Manipulation

Test your understanding of creating, copying, moving, and deleting files and directories.

---

#### 1. What command creates a new empty file?

<div class="upper-alpha" markdown>
1. create
2. new
3. touch
4. make
</div>

??? question "Show Answer"
    The correct answer is **C**. The `touch` command creates a new empty file if it doesn't exist, or updates the modification timestamp if it does. For example, `touch myfile.txt` creates an empty file named myfile.txt.

    **Concept Tested:** Touch Command

    **See:** [Chapter 5 - Touch Command](index.md)

---

#### 2. What command creates a new directory?

<div class="upper-alpha" markdown>
1. md
2. mkdir
3. newdir
4. create
</div>

??? question "Show Answer"
    The correct answer is **B**. The `mkdir` (make directory) command creates new directories. Use `mkdir -p` to create nested directories in one command (e.g., `mkdir -p projects/2024/january`).

    **Concept Tested:** Mkdir Command

    **See:** [Chapter 5 - Mkdir Command](index.md)

---

#### 3. What does `cp -r source/ destination/` do?

<div class="upper-alpha" markdown>
1. Copies only the empty directory
2. Copies the directory and all its contents recursively
3. Creates a symbolic link
4. Renames the directory
</div>

??? question "Show Answer"
    The correct answer is **B**. The `-r` (recursive) flag tells `cp` to copy a directory and all its contents, including subdirectories and files. Without `-r`, `cp` cannot copy directories.

    **Concept Tested:** Cp Command, Recursive Copy

    **See:** [Chapter 5 - Cp Command](index.md)

---

#### 4. What is the difference between `mv` and `cp`?

<div class="upper-alpha" markdown>
1. There is no difference
2. `mv` moves/renames files; `cp` copies files
3. `cp` moves files; `mv` copies files
4. Both delete the original file
</div>

??? question "Show Answer"
    The correct answer is **B**. The `mv` (move) command moves files to a new location OR renames them—the original is removed. The `cp` (copy) command creates a duplicate, leaving the original in place.

    **Concept Tested:** Mv Command, Cp Command

    **See:** [Chapter 5 - Mv Command](index.md)

---

#### 5. How do you rename a file in Linux?

<div class="upper-alpha" markdown>
1. rename oldname newname
2. rn oldname newname
3. mv oldname newname
4. cp oldname newname
</div>

??? question "Show Answer"
    The correct answer is **C**. In Linux, you use `mv` to rename files. When the source and destination are in the same directory, `mv` effectively renames the file. For example, `mv report.txt final_report.txt` renames the file.

    **Concept Tested:** Mv Command

    **See:** [Chapter 5 - Renaming Files](index.md)

---

#### 6. What does `rm -rf directory/` do?

<div class="upper-alpha" markdown>
1. Removes only empty directories
2. Creates a backup before removing
3. Recursively removes directory and contents without prompts
4. Moves directory to trash
</div>

??? question "Show Answer"
    The correct answer is **C**. The `rm -rf` command recursively (`-r`) removes a directory and all contents, forcing (`-f`) deletion without confirmation prompts. **This is dangerous**—it permanently deletes files without sending them to trash. Use with extreme caution!

    **Concept Tested:** Rm Command

    **See:** [Chapter 5 - Rm Command](index.md)

---

#### 7. What does `cat file.txt` do?

<div class="upper-alpha" markdown>
1. Displays cat pictures
2. Displays the entire file contents
3. Creates a new file
4. Compresses the file
</div>

??? question "Show Answer"
    The correct answer is **B**. The `cat` (concatenate) command displays the entire contents of a file to the terminal. It can also combine multiple files: `cat file1.txt file2.txt` displays both files' contents sequentially.

    **Concept Tested:** Cat Command

    **See:** [Chapter 5 - Cat Command](index.md)

---

#### 8. Which commands show only the beginning or end of a file?

<div class="upper-alpha" markdown>
1. top and bottom
2. head and tail
3. start and end
4. first and last
</div>

??? question "Show Answer"
    The correct answer is **B**. The `head` command shows the first 10 lines of a file (or specify with `-n`), and `tail` shows the last 10 lines. Use `tail -f` to follow a file as it grows—perfect for watching log files in real-time.

    **Concept Tested:** Head Command, Tail Command

    **See:** [Chapter 5 - Head and Tail](index.md)

---

#### 9. What command counts lines, words, and characters in a file?

<div class="upper-alpha" markdown>
1. count
2. stats
3. wc
4. measure
</div>

??? question "Show Answer"
    The correct answer is **C**. The `wc` (word count) command counts lines, words, and characters. By default it shows all three; use `-l` for lines only, `-w` for words, or `-c` for characters.

    **Concept Tested:** Wc Command

    **See:** [Chapter 5 - Wc Command](index.md)

---

#### 10. What does `rmdir` do differently than `rm -r`?

<div class="upper-alpha" markdown>
1. It's faster
2. It only removes empty directories
3. It creates backups
4. It moves to trash
</div>

??? question "Show Answer"
    The correct answer is **B**. The `rmdir` command only removes empty directories—it fails if the directory contains anything. This is a safety feature. Use `rm -r` when you need to remove a directory with contents.

    **Concept Tested:** Rmdir Command

    **See:** [Chapter 5 - Rmdir Command](index.md)
