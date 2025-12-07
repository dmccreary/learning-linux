# Quiz: Storage Devices and System Performance

Test your understanding of disk management and performance monitoring.

---

#### 1. What does `df -h` show?

<div class="upper-alpha" markdown>
1. Directory files
2. Disk space usage in human-readable format
3. Default files
4. Disk formatting options
</div>

??? question "Show Answer"
    The correct answer is **B**. `df` (disk free) shows disk space usage for all mounted filesystems. The `-h` flag displays sizes in human-readable format (GB, MB) instead of raw bytes.

    **Concept Tested:** Df Command

    **See:** [Chapter 18 - Df Command](index.md)

---

#### 2. What does `du -sh *` show?

<div class="upper-alpha" markdown>
1. Disk usage for all items in current directory, summarized
2. Download updates
3. Directory users
4. Disk unmount status
</div>

??? question "Show Answer"
    The correct answer is **A**. `du` (disk usage) shows how much space files/directories use. `-s` summarizes (one line per argument), `-h` is human-readable, and `*` matches all items in the current directory.

    **Concept Tested:** Du Command

    **See:** [Chapter 18 - Du Command](index.md)

---

#### 3. What is mounting a filesystem?

<div class="upper-alpha" markdown>
1. Physically installing a hard drive
2. Making a filesystem accessible at a point in the directory tree
3. Encrypting a drive
4. Formatting a drive
</div>

??? question "Show Answer"
    The correct answer is **B**. Mounting attaches a filesystem (from a drive, partition, or remote location) to a mount point in the directory tree, making its contents accessible. For example, USB drives are often mounted at /media/.

    **Concept Tested:** Mounting Filesystems

    **See:** [Chapter 18 - Mounting](index.md)

---

#### 4. What command lists all block devices (disks and partitions)?

<div class="upper-alpha" markdown>
1. ls /dev
2. lsblk
3. fdisk -l
4. mount
</div>

??? question "Show Answer"
    The correct answer is **B**. `lsblk` (list block devices) shows all storage devices and their partitions in a tree format, including size, type, and mount points. It's cleaner than parsing /dev or fdisk output.

    **Concept Tested:** Lsblk Command

    **See:** [Chapter 18 - Listing Devices](index.md)

---

#### 5. What does `free -h` display?

<div class="upper-alpha" markdown>
1. Available disk space
2. Memory (RAM) usage in human-readable format
3. Free software licenses
4. Network bandwidth
</div>

??? question "Show Answer"
    The correct answer is **B**. `free` shows memory (RAM) and swap usage. `-h` makes it human-readable. It displays total, used, free, shared, cache/buffers, and available memory.

    **Concept Tested:** Free Command

    **See:** [Chapter 18 - Memory Usage](index.md)

---

#### 6. What is swap space?

<div class="upper-alpha" markdown>
1. Extra SSD storage
2. Disk space used as overflow when RAM is full
3. A backup partition
4. Temporary file storage
</div>

??? question "Show Answer"
    The correct answer is **B**. Swap space is disk space used when physical RAM is exhausted. The kernel moves inactive memory pages to swap, freeing RAM for active processes. It's slower than RAM but prevents out-of-memory crashes.

    **Concept Tested:** Swap Space

    **See:** [Chapter 18 - Swap](index.md)

---

#### 7. What does the `mount` command show when run without arguments?

<div class="upper-alpha" markdown>
1. Nothing
2. All currently mounted filesystems
3. Available disk space
4. Mount point directories
</div>

??? question "Show Answer"
    The correct answer is **B**. Running `mount` without arguments displays all currently mounted filesystems, their mount points, filesystem types, and mount options. Useful for seeing what's mounted and where.

    **Concept Tested:** Mount Command

    **See:** [Chapter 18 - Mount Command](index.md)

---

#### 8. How do you safely remove a USB drive?

<div class="upper-alpha" markdown>
1. Just unplug it
2. Unmount it first with umount, then remove
3. Delete its files first
4. Restart the computer
</div>

??? question "Show Answer"
    The correct answer is **B**. Always unmount a drive before physically removing it using `umount /mount/point` or `umount /dev/sdX`. This ensures all cached writes are completed, preventing data corruption.

    **Concept Tested:** Umount Command

    **See:** [Chapter 18 - Unmounting](index.md)

---

#### 9. What does `htop` provide over the standard `top` command?

<div class="upper-alpha" markdown>
1. They're identical
2. A more visual, colorful interface with mouse support
3. Less information
4. Network monitoring
</div>

??? question "Show Answer"
    The correct answer is **B**. `htop` is an enhanced version of `top` with a colorful interface, visual CPU/memory meters, mouse support, and easier process management. It's not installed by default but is worth installing.

    **Concept Tested:** Htop Command

    **See:** [Chapter 18 - Htop](index.md)

---

#### 10. What does `/etc/fstab` contain?

<div class="upper-alpha" markdown>
1. File system attributes
2. Filesystem mount configuration for boot time
3. Fast tab completion settings
4. Firewall rules
</div>

??? question "Show Answer"
    The correct answer is **B**. `/etc/fstab` (filesystem table) defines which filesystems to mount automatically at boot time, their mount points, types, and options. Editing this file is necessary for persistent mount configurations.

    **Concept Tested:** Fstab Configuration

    **See:** [Chapter 18 - Fstab](index.md)
