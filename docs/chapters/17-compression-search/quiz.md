# Quiz: Compression, Archives, and File Search

Test your understanding of file compression and search tools.

---

#### 1. What does the `tar` command do by itself (without compression)?

<div class="upper-alpha" markdown>
1. Compresses files
2. Creates or extracts archive bundles of files
3. Searches for files
4. Transfers files between systems
</div>

??? question "Show Answer"
    The correct answer is **B**. `tar` (tape archive) bundles multiple files and directories into a single archive file, preserving permissions and structure. By itself, tar doesn't compress—add `-z` for gzip or `-j` for bzip2 compression.

    **Concept Tested:** Tar Command

    **See:** [Chapter 17 - Tar Command](index.md#tar-command)

---

#### 2. What does `tar -czvf archive.tar.gz folder/` do?

<div class="upper-alpha" markdown>
1. Extracts an archive
2. Creates a gzip-compressed archive of the folder
3. Lists contents of an archive
4. Tests archive integrity
</div>

??? question "Show Answer"
    The correct answer is **B**. The flags mean: `-c` (create), `-z` (gzip compress), `-v` (verbose), `-f` (filename follows). This creates a gzip-compressed tar archive named archive.tar.gz containing the folder.

    **Concept Tested:** Tar Options

    **See:** [Chapter 17 - Creating Archives](index.md#creating-archives)

---

#### 3. How do you extract a .tar.gz file?

<div class="upper-alpha" markdown>
1. tar -czvf archive.tar.gz
2. tar -xzvf archive.tar.gz
3. unzip archive.tar.gz
4. extract archive.tar.gz
</div>

??? question "Show Answer"
    The correct answer is **B**. Use `-x` (extract) instead of `-c` (create). The `-z` handles gzip, `-v` shows files being extracted, and `-f` precedes the filename. The archive extracts to the current directory.

    **Concept Tested:** Extracting Archives

    **See:** [Chapter 17 - Extracting Archives](index.md#extracting-archives)

---

#### 4. What is the difference between gzip and zip?

<div class="upper-alpha" markdown>
1. They're identical
2. gzip compresses single files; zip creates compressed archives
3. zip is Linux-only
4. gzip creates larger files
</div>

??? question "Show Answer"
    The correct answer is **B**. `gzip` compresses individual files (creating .gz files) and is typically combined with tar for multiple files. `zip` creates compressed archives that can contain multiple files, and is compatible with Windows.

    **Concept Tested:** Gzip vs Zip

    **See:** [Chapter 17 - Compression Tools](index.md#compression-tools)

---

#### 5. What does the `find` command do?

<div class="upper-alpha" markdown>
1. Searches inside files for text
2. Searches for files and directories based on criteria
3. Finds your current location
4. Finds network devices
</div>

??? question "Show Answer"
    The correct answer is **B**. `find` searches for files and directories based on various criteria like name, size, type, modification time, and permissions. Example: `find /home -name "*.txt"` finds all .txt files under /home.

    **Concept Tested:** Find Command

    **See:** [Chapter 17 - Find Command](index.md#find-command)

---

#### 6. What does `find . -name "*.log" -mtime +7` do?

<div class="upper-alpha" markdown>
1. Finds log files modified in the last 7 minutes
2. Finds log files modified more than 7 days ago
3. Finds 7 log files
4. Finds log files larger than 7MB
</div>

??? question "Show Answer"
    The correct answer is **B**. This finds files with .log extension that were modified more than 7 days ago (`+7`). Use `-7` for less than 7 days, or `7` for exactly 7 days.

    **Concept Tested:** Find Options

    **See:** [Chapter 17 - Find by Time](index.md#find-by-time)

---

#### 7. What is `locate` and how does it differ from `find`?

<div class="upper-alpha" markdown>
1. They're identical
2. locate uses a database for faster searches; find searches in real-time
3. find is faster
4. locate only works on Windows
</div>

??? question "Show Answer"
    The correct answer is **B**. `locate` uses a pre-built database (updatedb) for near-instant searches, but may miss recently created files. `find` searches the filesystem in real-time, so it's slower but always current.

    **Concept Tested:** Locate Command

    **See:** [Chapter 17 - Locate Command](index.md#locate-command)

---

#### 8. What command shows which executable a command name resolves to?

<div class="upper-alpha" markdown>
1. find
2. which
3. where
4. what
</div>

??? question "Show Answer"
    The correct answer is **B**. `which` shows the full path of the executable that would run when you type a command. For example, `which python` might show `/usr/bin/python`. Useful for finding which version of a program is in your PATH.

    **Concept Tested:** Which Command

    **See:** [Chapter 17 - Which Command](index.md#which-command)

---

#### 9. What does `xz` provide compared to gzip?

<div class="upper-alpha" markdown>
1. Lower compression
2. Higher compression ratio but slower
3. Faster but larger files
4. Only works on text files
</div>

??? question "Show Answer"
    The correct answer is **B**. `xz` provides higher compression ratios than gzip (smaller files) but is slower to compress. It's often used for distributing source code packages where download size matters more than compression speed.

    **Concept Tested:** Xz Compression

    **See:** [Chapter 17 - Xz Command](index.md#xz-command)

---

#### 10. How do you search for files larger than 100MB?

<div class="upper-alpha" markdown>
1. find / -size 100M
2. find / -size +100M
3. ls -size 100M
4. search --size 100M
</div>

??? question "Show Answer"
    The correct answer is **B**. `find / -size +100M` finds files larger than 100 megabytes. The `+` means "greater than." Use `-100M` for smaller than, or just `100M` for exactly that size. Great for finding disk space hogs.

    **Concept Tested:** Find by Size

    **See:** [Chapter 17 - Finding Large Files](index.md#find-by-size)
