---
title: Storage Devices and System Performance
description: Master storage management, mounting file systems, and performance monitoring with benchmarking tools
generated_by: claude skill chapter-content-generator
date: 2025-12-06
version: 0.03
---

# Storage Devices and System Performance

## Summary

This chapter covers storage management and performance monitoring. You'll learn about block and character devices, mounting file systems, disk partitions, and swap space. Master performance monitoring tools like df, du, free, vmstat, and iostat to understand system resource usage and identify bottlenecks. These skills are essential for system administration.

## Concepts Covered

This chapter covers the following 35 concepts from the learning graph:

1. Storage Devices
2. Block Devices
3. Character Devices
4. Device Files
5. Mount Command
6. Umount Command
7. Fstab File
8. Disk Partitions
9. Fdisk Command
10. Lsblk Command
11. Df Command
12. Du Command
13. USB Drives
14. Flash Drives
15. Swap Space
16. Swap File
17. Swap Partition
18. File System Types
19. Ext4 File System
20. NTFS Support
21. System Monitoring
22. CPU Usage
23. Memory Usage
24. Disk Usage
25. Free Command
26. Vmstat Command
27. Iostat Command
28. Sar Command
29. Performance Tuning
30. CPU Benchmarks
31. Disk Benchmarks
32. GPU Performance
33. System Load
34. Load Average
35. Bottleneck Analysis

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: File System Fundamentals](../04-file-system/index.md)
- [Chapter 12: Process Management and Job Control](../12-processes/index.md)

---

## Welcome to the Engine Room!

Ever wondered why your computer sometimes feels slow? Or why copying files to a USB stick takes forever? Or how the new NVMe drives can be 100 times faster than an old SD card?

This chapter takes you into the engine room of Linux—where you'll learn how storage works, how to monitor system performance, and how to benchmark everything. You'll become the mechanic who can diagnose why a system is running slow and tune it for maximum performance!

## Storage Devices: Where Your Data Lives

**Storage devices** are the hardware that stores your data persistently—it survives when you turn off the power. Understanding storage is crucial because it's often the biggest bottleneck in system performance.

### Types of Storage

| Type | Speed | Cost | Use Case |
|------|-------|------|----------|
| NVMe SSD | Very Fast | $$ | Primary OS, databases |
| SATA SSD | Fast | $$ | General purpose |
| HDD (Spinning) | Slow | $ | Bulk storage, backups |
| MicroSD | Slow | $ | Embedded devices, Pi |
| USB Flash | Slow-Medium | $ | Portable storage |

The speed differences are DRAMATIC. An NVMe drive can be 50-100x faster than a MicroSD card!

## Block Devices and Character Devices

Linux represents hardware as files in `/dev`. There are two main types:

### Block Devices

**Block devices** transfer data in blocks (chunks). These are your storage devices:

```sh
# List block devices
lsblk

# Output:
# NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
# sda      8:0    0   500G  0 disk
# ├─sda1   8:1    0   512M  0 part /boot
# └─sda2   8:2    0 499.5G  0 part /
# sdb      8:16   1    32G  0 disk
# └─sdb1   8:17   1    32G  0 part /media/usb

# Block devices live in /dev
ls /dev/sd*
# /dev/sda  /dev/sda1  /dev/sda2  /dev/sdb  /dev/sdb1
```

### Character Devices

**Character devices** transfer data one character at a time. These include:

- Terminals (`/dev/tty*`)
- Serial ports (`/dev/ttyUSB*`)
- Random number generator (`/dev/random`)
- Null device (`/dev/null`)

```sh
# Character devices
ls -la /dev/tty
ls -la /dev/null
ls -la /dev/random
```

## Device Files: Everything is a File

**Device files** in `/dev` represent hardware. This is the "everything is a file" philosophy in action!

### Common Device Files

| Device | Description |
|--------|-------------|
| `/dev/sda` | First SATA/SCSI disk |
| `/dev/nvme0n1` | First NVMe drive |
| `/dev/mmcblk0` | MicroSD card |
| `/dev/sda1` | First partition on sda |
| `/dev/null` | Discards all input |
| `/dev/zero` | Infinite stream of zeros |
| `/dev/random` | Random data |
| `/dev/tty` | Current terminal |

```sh
# See device information
file /dev/sda
# /dev/sda: block special (8/0)

file /dev/null
# /dev/null: character special (1/3)

# Use /dev/null to discard output
command > /dev/null 2>&1

# Use /dev/zero to create empty files
dd if=/dev/zero of=empty.img bs=1M count=100
```

## The Lsblk Command: List Block Devices

The **lsblk command** lists all block devices in a tree format, showing partitions and mount points.

```sh
# Basic listing
lsblk

# Show more details
lsblk -f     # File system info
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,FSTYPE,UUID

# Show only disks (not partitions)
lsblk -d

# Show sizes in bytes
lsblk -b

# JSON output (for scripts)
lsblk -J
```

### Understanding lsblk Output

```
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda           8:0    0 465.8G  0 disk
├─sda1        8:1    0   512M  0 part /boot/efi
├─sda2        8:2    0     1G  0 part /boot
└─sda3        8:3    0 464.3G  0 part /
nvme0n1     259:0    0   1T   0 disk
└─nvme0n1p1 259:1    0   1T   0 part /data
```

- **NAME**: Device name
- **MAJ:MIN**: Major/minor device numbers
- **RM**: Removable (1 = yes)
- **SIZE**: Device size
- **RO**: Read-only (1 = yes)
- **TYPE**: disk, part, rom, etc.
- **MOUNTPOINT**: Where it's mounted

## Disk Partitions: Dividing Storage

**Disk partitions** divide a physical disk into logical sections. Each partition can have its own file system.

### Why Partition?

- Separate OS from data
- Multi-boot systems
- Different file systems for different needs
- Easier backups and recovery

### Partition Types

| Type | Description |
|------|-------------|
| Primary | Main partitions (max 4 on MBR) |
| Extended | Container for logical partitions |
| Logical | Partitions inside extended |
| GPT | Modern, supports many partitions |

## The Fdisk Command: Partition Manager

The **fdisk command** creates and manages partitions. Use carefully—wrong commands can destroy data!

```sh
# List all partitions (requires sudo)
sudo fdisk -l

# List specific disk
sudo fdisk -l /dev/sda

# Interactive partition editing
sudo fdisk /dev/sdb

# fdisk commands (inside interactive mode):
# m - help menu
# p - print partition table
# n - new partition
# d - delete partition
# t - change partition type
# w - write changes and exit
# q - quit without saving
```

!!! danger "Backup First!"
    Fdisk can destroy all data on a disk. Always backup before partitioning, and triple-check you're working on the correct disk!

### Modern Alternative: parted

```sh
# List partitions
sudo parted -l

# Interactive mode
sudo parted /dev/sdb

# Create GPT partition table
sudo parted /dev/sdb mklabel gpt

# Create partition
sudo parted /dev/sdb mkpart primary ext4 0% 100%
```

## The Mount Command: Attach File Systems

The **mount command** attaches a file system to a directory, making it accessible.

```sh
# Show all mounted file systems
mount

# Mount a device
sudo mount /dev/sdb1 /mnt/usb

# Mount with specific file system type
sudo mount -t ntfs /dev/sdb1 /mnt/windows

# Mount read-only
sudo mount -ro /dev/sdb1 /mnt/usb

# Mount with specific options
sudo mount -o uid=1000,gid=1000 /dev/sdb1 /mnt/usb

# Show mounted file systems nicely
mount | column -t
findmnt
```

### Mount Options

| Option | Purpose |
|--------|---------|
| `ro` | Read-only |
| `rw` | Read-write |
| `noexec` | No execution of binaries |
| `nosuid` | Ignore SUID bits |
| `uid=N` | Owner user ID |
| `gid=N` | Owner group ID |
| `umask=NNN` | Permission mask |

## The Umount Command: Detach File Systems

The **umount command** safely detaches file systems before removing media.

```sh
# Unmount by mount point
sudo umount /mnt/usb

# Unmount by device
sudo umount /dev/sdb1

# Force unmount (if busy)
sudo umount -f /mnt/usb

# Lazy unmount (detach, cleanup later)
sudo umount -l /mnt/usb

# Check what's using the mount
lsof /mnt/usb
fuser -m /mnt/usb
```

!!! warning "Always Unmount!"
    Removing a USB drive without unmounting can corrupt data. Always `umount` first!

## The Fstab File: Automatic Mounting

The **fstab file** (`/etc/fstab`) defines file systems to mount at boot time.

```sh
# View fstab
cat /etc/fstab

# Example fstab entries:
# <device>        <mount point>  <type>  <options>        <dump> <pass>
UUID=abc123...    /              ext4    defaults         0      1
UUID=def456...    /boot          ext4    defaults         0      2
UUID=ghi789...    /home          ext4    defaults         0      2
/dev/sdb1         /mnt/data      ntfs    uid=1000,gid=1000 0     0
```

### Fstab Fields

1. **Device**: UUID, LABEL, or /dev path
2. **Mount point**: Where to mount
3. **Type**: File system type
4. **Options**: Mount options
5. **Dump**: Backup flag (0 or 1)
6. **Pass**: fsck order (0, 1, or 2)

### Using UUIDs (Recommended)

```sh
# Find UUID of a device
sudo blkid /dev/sdb1

# Output:
# /dev/sdb1: UUID="a1b2c3d4-e5f6-7890-abcd-ef1234567890" TYPE="ext4"

# Use in fstab:
UUID=a1b2c3d4-e5f6-7890-abcd-ef1234567890 /mnt/data ext4 defaults 0 2
```

## File System Types: Formats for Storage

**File system types** determine how data is organized on storage.

### Common Linux File Systems

| Type | Description | Best For |
|------|-------------|----------|
| ext4 | Linux standard | General purpose |
| xfs | High performance | Large files, servers |
| btrfs | Modern, snapshots | Advanced users |
| f2fs | Flash-optimized | SSDs, SD cards |
| ntfs | Windows | Sharing with Windows |
| exfat | Universal | USB drives, cross-platform |
| fat32 | Legacy | Boot partitions, old devices |

## The Ext4 File System

The **ext4 file system** is the default for most Linux distributions. It's reliable, fast, and well-tested.

```sh
# Create ext4 file system
sudo mkfs.ext4 /dev/sdb1

# With options
sudo mkfs.ext4 -L "MyData" /dev/sdb1     # With label
sudo mkfs.ext4 -m 1 /dev/sdb1            # 1% reserved space

# Check file system
sudo fsck.ext4 /dev/sdb1

# Tune file system
sudo tune2fs -l /dev/sdb1                 # List info
sudo tune2fs -L "NewLabel" /dev/sdb1     # Change label
```

### Ext4 Features

- Journaling (crash recovery)
- Up to 16TB file size
- Up to 1EB volume size
- Extents (efficient large files)
- Backward compatible with ext3

## NTFS Support: Windows Compatibility

**NTFS support** lets you read and write Windows drives.

```sh
# Install NTFS support
sudo apt install ntfs-3g

# Mount NTFS drive
sudo mount -t ntfs-3g /dev/sdb1 /mnt/windows

# Auto-mount in fstab:
/dev/sdb1 /mnt/windows ntfs-3g defaults,uid=1000,gid=1000 0 0
```

## USB Drives and Flash Drives

**USB drives** and **flash drives** are plug-and-play storage devices. Modern Linux auto-mounts them.

```sh
# Watch for USB insertion
dmesg -w

# When you plug in USB, look for:
# [  123.456] usb 2-1: new high-speed USB device
# [  123.789] sd 2:0:0:0: [sdb] 62652416 512-byte sectors

# Find mounted USB
lsblk
findmnt | grep media

# Safely remove
sudo umount /media/username/USBDRIVE
# Wait for LED to stop blinking, then remove
```

## Swap Space: Virtual Memory

**Swap space** extends RAM using disk storage. When RAM fills up, inactive pages move to swap.

### Check Swap

```sh
# Show swap usage
free -h
swapon --show

# Detailed swap info
cat /proc/swaps
```

## Swap File: File-Based Swap

A **swap file** is a regular file used as swap space. Flexible and easy to resize!

```sh
# Create 4GB swap file
sudo fallocate -l 4G /swapfile
# Or: sudo dd if=/dev/zero of=/swapfile bs=1G count=4

# Set permissions
sudo chmod 600 /swapfile

# Format as swap
sudo mkswap /swapfile

# Enable
sudo swapon /swapfile

# Make permanent (add to /etc/fstab):
/swapfile none swap sw 0 0

# Verify
swapon --show
```

### Swap Partition

A **swap partition** is a dedicated partition for swap. Traditional but less flexible.

```sh
# Create swap partition with fdisk (type 82)
# Then format:
sudo mkswap /dev/sdb2
sudo swapon /dev/sdb2

# Add to fstab:
UUID=swap-uuid-here none swap sw 0 0
```

## The Df Command: Disk Free Space

The **df command** shows disk space usage for mounted file systems.

```sh
# Basic usage
df

# Human-readable sizes
df -h

# Show file system type
df -T

# Specific file system
df -h /home

# Inodes (file count limits)
df -i

# Exclude pseudo file systems
df -h -x tmpfs -x devtmpfs
```

### Reading df Output

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda2       460G  120G  317G  28% /
/dev/sda1       511M   63M  449M  13% /boot
/dev/nvme0n1p1  932G  400G  532G  43% /data
```

!!! tip "Watch for Full Disks"
    Systems can crash when disks hit 100%. Monitor with `df -h` and set up alerts for 80%+ usage.

## The Du Command: Disk Usage

The **du command** shows how much space files and directories use.

```sh
# Size of current directory
du -sh .

# Size of each subdirectory
du -h --max-depth=1

# Size sorted by largest
du -h --max-depth=1 | sort -hr

# Size of specific directory
du -sh /var/log

# Human-readable, total at end
du -ch *.log

# Exclude patterns
du -sh --exclude='*.log' /var
```

### Finding Space Hogs

```sh
# Top 10 largest directories
du -h /home --max-depth=2 | sort -hr | head -10

# Top 10 largest files
find / -type f -exec du -h {} + 2>/dev/null | sort -hr | head -10

# Alternative: ncdu (interactive)
sudo apt install ncdu
ncdu /home
```

## System Monitoring: Watch Your Resources

**System monitoring** tracks CPU, memory, disk, and network usage to identify problems.

### Quick System Overview

```sh
# Everything at a glance
top
htop        # Better version

# One-shot system summary
uptime      # Load average
free -h     # Memory
df -h       # Disk
```

## CPU Usage: Processing Power

**CPU usage** shows how busy your processor is.

```sh
# CPU usage with top
top -bn1 | head -20

# Per-CPU usage
mpstat -P ALL 1

# CPU info
lscpu
cat /proc/cpuinfo

# Real-time CPU monitor
htop
```

### Understanding CPU Metrics

| Metric | Meaning |
|--------|---------|
| us | User space (your programs) |
| sy | System/kernel |
| ni | Nice (low priority) |
| id | Idle (unused) |
| wa | I/O wait (waiting for disk) |
| hi | Hardware interrupts |
| si | Software interrupts |
| st | Steal (virtualization) |

High `wa` (I/O wait) means your disk is the bottleneck!

## Memory Usage: RAM Status

**Memory usage** shows how RAM is being used.

```sh
# Memory summary
free -h

# Output:
#               total        used        free      shared  buff/cache   available
# Mem:           15Gi       4.2Gi       6.8Gi       523Mi       4.5Gi        10Gi
# Swap:          4.0Gi          0B       4.0Gi
```

### Understanding Memory

- **total**: Physical RAM
- **used**: Currently in use
- **free**: Completely unused
- **buff/cache**: Disk cache (available if needed)
- **available**: Actually available for programs

!!! tip "Free Memory Isn't Wasted"
    Linux uses "free" RAM for disk caching. Look at "available", not "free"!

## The Free Command: Memory Details

The **free command** shows memory and swap usage.

```sh
# Human-readable
free -h

# In megabytes
free -m

# In gigabytes
free -g

# Wide output
free -w

# Continuous monitoring (every 2 seconds)
free -h -s 2

# Total line only
free -h -t
```

## The Vmstat Command: Virtual Memory Stats

The **vmstat command** shows memory, swap, I/O, and CPU statistics.

```sh
# Snapshot
vmstat

# Every 2 seconds, 5 times
vmstat 2 5

# With timestamps
vmstat -t 2

# Disk statistics
vmstat -d

# Slab info (kernel memory)
vmstat -m
```

### Understanding vmstat Output

```
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 6945780 234560 4567890    0    0    12    45  234  567 12  3 84  1  0
```

| Column | Meaning |
|--------|---------|
| r | Processes waiting for CPU |
| b | Processes in uninterruptible sleep |
| swpd | Virtual memory used |
| free | Idle memory |
| si/so | Swap in/out (bad if high!) |
| bi/bo | Blocks read/written to disk |
| us/sy/id/wa | CPU percentages |

## The Iostat Command: I/O Statistics

The **iostat command** shows disk I/O statistics—essential for storage analysis!

```sh
# Install if needed
sudo apt install sysstat

# Basic I/O stats
iostat

# Human-readable, extended
iostat -xh

# Every 2 seconds
iostat 2

# Specific device
iostat -x /dev/sda 2

# CPU and disk stats
iostat -c -d 2
```

### Reading iostat Output

```
Device     r/s     w/s     rkB/s     wkB/s   %util
sda       12.34   45.67    456.78   1234.56   15.23
nvme0n1  234.56   89.12  12345.67   4567.89    8.45
```

| Metric | Meaning |
|--------|---------|
| r/s, w/s | Reads/writes per second |
| rkB/s, wkB/s | KB read/written per second |
| await | Average I/O wait time (ms) |
| %util | Percentage of time device is busy |

**%util near 100%** = disk is saturated (bottleneck!)

## The Sar Command: System Activity Reporter

The **sar command** collects and reports system activity data over time. Great for historical analysis!

```sh
# CPU usage
sar -u 2 5

# Memory usage
sar -r 2 5

# Disk I/O
sar -d 2 5

# Network
sar -n DEV 2 5

# Historical data (if sysstat is running)
sar -u          # Today's CPU
sar -u -f /var/log/sysstat/sa15  # Day 15
```

### Enable sar Data Collection

```sh
# Install sysstat
sudo apt install sysstat

# Enable collection
sudo systemctl enable sysstat
sudo systemctl start sysstat

# Edit collection interval
sudo nano /etc/default/sysstat
# Set ENABLED="true"
```

## System Load and Load Average

**System load** measures how busy the system is. **Load average** shows the load over 1, 5, and 15 minutes.

```sh
# Check load
uptime
# Output: load average: 1.23, 0.98, 0.76

# Also in top
top

# Detailed
cat /proc/loadavg
# 1.23 0.98 0.76 2/234 12345
```

### Understanding Load Average

- **Load = 1.0** means one CPU core is 100% busy
- **Load < cores** = system can handle more
- **Load > cores** = system is overloaded

On a 4-core system:
- 1.0 = 25% utilized
- 4.0 = 100% utilized (all cores busy)
- 8.0 = 200% load (processes waiting)

## Bottleneck Analysis: Finding the Slow Part

**Bottleneck analysis** identifies what's limiting your system's performance.

### The Three Main Bottlenecks

| Bottleneck | Symptoms | Check With |
|------------|----------|------------|
| CPU | High load, low idle% | top, htop, mpstat |
| Memory | Swap usage, OOM killer | free, vmstat (si/so) |
| Disk I/O | High iowait, slow operations | iostat (%util, await) |

### Quick Bottleneck Detection

```sh
#!/bin/bash
# bottleneck-check.sh - Quick system bottleneck analysis

echo "=== System Bottleneck Check ==="
echo ""

# CPU Check
echo "CPU Load:"
uptime
echo ""

# Memory Check
echo "Memory (look for swap usage):"
free -h
echo ""

# Disk I/O Check
echo "Disk I/O (look for high %util):"
iostat -x 1 3 | tail -10
echo ""

# Quick summary
CPU_IDLE=$(top -bn1 | grep "Cpu(s)" | awk '{print $8}' | cut -d'%' -f1)
SWAP_USED=$(free | grep Swap | awk '{print $3}')
IO_WAIT=$(iostat | grep -A1 "avg-cpu" | tail -1 | awk '{print $4}')

echo "=== Summary ==="
echo "CPU Idle: ${CPU_IDLE}% (low = CPU bottleneck)"
echo "Swap Used: ${SWAP_USED} KB (high = memory bottleneck)"
echo "I/O Wait: ${IO_WAIT}% (high = disk bottleneck)"
```

## Disk Benchmarks: Measuring Speed

**Disk benchmarks** measure how fast your storage actually is. This is where things get fun!

### Benchmarking Tools

| Tool | Purpose | Complexity |
|------|---------|------------|
| `time` | Simple timing | Easy |
| `dd` | Basic throughput | Easy |
| `hdparm` | Read speed | Easy |
| `fio` | Full I/O testing | Advanced |
| `ioping` | I/O latency | Easy |
| `bonnie++` | Comprehensive | Medium |
| `sysbench` | CPU, memory, I/O | Medium |

## The Time Command: Simple Timing

The **time command** measures how long a command takes to run.

```sh
# Time any command
time ls -laR /home

# Output:
# real    0m2.345s   # Wall clock time
# user    0m0.234s   # CPU time in user mode
# sys     0m0.123s   # CPU time in kernel mode

# Time file copy
time cp largefile.iso /mnt/backup/

# Time with more precision
/usr/bin/time -v cp largefile.iso /mnt/backup/
```

### Understanding Time Output

- **real**: Actual elapsed time (includes waiting for I/O)
- **user**: CPU time executing your code
- **sys**: CPU time in kernel operations

If `real >> user + sys`, you're waiting for I/O!

## The Dd Command: Raw Disk Speed

The **dd command** can measure raw read/write speed. It's basic but universally available.

```sh
# Test WRITE speed
# Warning: This creates a test file!
dd if=/dev/zero of=testfile bs=1G count=1 oflag=direct 2>&1 | tail -1

# Test READ speed (after write test)
dd if=testfile of=/dev/null bs=1G count=1 iflag=direct 2>&1 | tail -1

# Clean up
rm testfile

# Test with different block sizes
dd if=/dev/zero of=testfile bs=4K count=100000 oflag=direct
dd if=/dev/zero of=testfile bs=1M count=1000 oflag=direct
```

### Important dd Flags

| Flag | Purpose |
|------|---------|
| `bs=SIZE` | Block size (4K, 1M, 1G) |
| `count=N` | Number of blocks |
| `oflag=direct` | Bypass cache (real disk speed) |
| `iflag=direct` | Direct read (bypass cache) |
| `conv=fdatasync` | Ensure data is written |

!!! warning "dd Can Destroy Data"
    Be VERY careful with dd! `of=/dev/sda` will wipe your disk!

## The Hdparm Command: Drive Info and Testing

The **hdparm command** reads drive information and tests read speed.

```sh
# Install if needed
sudo apt install hdparm

# Drive information
sudo hdparm -I /dev/sda

# Test cached read speed (RAM, not disk!)
sudo hdparm -T /dev/sda

# Test direct disk read speed
sudo hdparm -t /dev/sda

# Both tests together
sudo hdparm -Tt /dev/sda

# Output:
# Timing cached reads:   12345 MB in  2.00 seconds = 6172 MB/sec
# Timing buffered disk reads: 1234 MB in  3.00 seconds = 411 MB/sec
```

The `-t` (buffered) result is what matters for actual disk speed!

## The Fio Command: Flexible I/O Tester

The **fio command** is the most powerful I/O benchmarking tool. It can simulate almost any workload.

```sh
# Install
sudo apt install fio

# Simple sequential read test
fio --name=seqread --rw=read --bs=1M --size=1G --numjobs=1 \
    --filename=testfile --direct=1

# Simple sequential write test
fio --name=seqwrite --rw=write --bs=1M --size=1G --numjobs=1 \
    --filename=testfile --direct=1

# Random read test (4K blocks - like database access)
fio --name=randread --rw=randread --bs=4k --size=1G --numjobs=4 \
    --filename=testfile --direct=1 --runtime=60

# Random write test
fio --name=randwrite --rw=randwrite --bs=4k --size=1G --numjobs=4 \
    --filename=testfile --direct=1 --runtime=60

# Mixed read/write (70% read, 30% write)
fio --name=mixed --rw=randrw --rwmixread=70 --bs=4k --size=1G \
    --numjobs=4 --filename=testfile --direct=1 --runtime=60
```

### Key fio Metrics

| Metric | Meaning |
|--------|---------|
| IOPS | I/O Operations Per Second |
| BW | Bandwidth (throughput) |
| lat | Latency (response time) |
| slat | Submission latency |
| clat | Completion latency |

## The Ioping Command: I/O Latency

The **ioping command** measures I/O latency—how quickly the disk responds to requests.

```sh
# Install
sudo apt install ioping

# Basic latency test
ioping /dev/sda

# Specific number of requests
ioping -c 10 /dev/sda

# Test a directory
ioping -c 20 /home

# Direct I/O (bypass cache)
ioping -D /dev/sda

# Sequential test
ioping -s 1M -c 10 /dev/sda
```

### Output Example

```
4 KiB <<< /dev/sda (block device 500G): request=1 time=3.2 ms
4 KiB <<< /dev/sda (block device 500G): request=2 time=2.8 ms

--- /dev/sda ping statistics ---
10 requests completed in 32.1 ms, 40 KiB read, 311 iops, 1.22 MiB/s
min/avg/max/mdev = 2.1 ms / 3.2 ms / 5.4 ms / 0.8 ms
```

Low latency = responsive disk. NVMe drives have latency under 0.1ms!

## The Bonnie++ Command: Comprehensive Testing

The **bonnie++ command** runs a comprehensive suite of I/O tests.

```sh
# Install
sudo apt install bonnie++

# Basic test (uses 2x RAM by default)
bonnie++ -d /home/test -u username

# Specify size
bonnie++ -d /home/test -s 4G -u username

# Quick test
bonnie++ -d /home/test -s 1G -n 0 -u username

# Output to CSV
bonnie++ -d /home/test -s 2G -u username | tee bonnie_results.csv
```

Bonnie++ tests:
- Sequential read/write
- Random seeks
- File creation/deletion

## The Sysbench Command: Multi-Purpose Benchmarking

The **sysbench command** benchmarks CPU, memory, and disk I/O.

```sh
# Install
sudo apt install sysbench

# CPU benchmark
sysbench cpu run
sysbench cpu --threads=4 run

# Memory benchmark
sysbench memory run
sysbench memory --memory-block-size=1M run

# File I/O - Prepare test files
sysbench fileio --file-total-size=2G prepare

# File I/O - Sequential read
sysbench fileio --file-total-size=2G --file-test-mode=seqrd run

# File I/O - Random read/write
sysbench fileio --file-total-size=2G --file-test-mode=rndrw run

# Cleanup
sysbench fileio --file-total-size=2G cleanup
```

## CPU Benchmarks: Testing Processing Power

**CPU benchmarks** measure raw computing power.

```sh
# sysbench CPU test
sysbench cpu --threads=$(nproc) run

# Prime number calculation (stress test)
sysbench cpu --threads=$(nproc) --time=30 run

# 7zip benchmark (compression/decompression)
7z b

# Stress test (check cooling!)
stress --cpu $(nproc) --timeout 60
```

## GPU Performance: Graphics Processing

**GPU performance** matters for graphics, machine learning, and video processing.

```sh
# Check GPU info
lspci | grep -i vga
lspci | grep -i nvidia

# NVIDIA GPU stats
nvidia-smi

# AMD GPU stats
radeontop

# GPU benchmark (if glmark2 installed)
glmark2

# OpenCL info
clinfo
```

## Performance Tuning: Making It Faster

**Performance tuning** optimizes system settings for better performance.

### Quick Tuning Tips

```sh
# Adjust swappiness (0-100, lower = less swapping)
cat /proc/sys/vm/swappiness
sudo sysctl vm.swappiness=10

# Make permanent
echo "vm.swappiness=10" | sudo tee -a /etc/sysctl.conf

# Adjust disk scheduler (for SSDs)
cat /sys/block/sda/queue/scheduler
echo "none" | sudo tee /sys/block/sda/queue/scheduler  # For NVMe

# Increase file descriptor limits
ulimit -n 65535
```

## Case Study: Raspberry Pi 5 NVMe Performance

Here's the exciting part! The Raspberry Pi 5 introduced PCIe support, allowing you to connect NVMe SSDs. The performance difference compared to MicroSD is INCREDIBLE!

### The Hardware Setup

| Storage Type | Interface | Theoretical Max |
|--------------|-----------|-----------------|
| MicroSD (A2) | SD 3.0 | ~100 MB/s |
| USB 3.0 SSD | USB 3.0 | ~400 MB/s |
| NVMe SSD | PCIe 2.0 x1 | ~450 MB/s |

The Pi 5's PCIe is limited to gen 2 x1, but that's still MUCH faster than SD!

### Benchmark Comparison Script

```sh
#!/bin/bash
# rpi5-storage-benchmark.sh - Compare storage devices on Raspberry Pi 5
#
# Run with: sudo ./rpi5-storage-benchmark.sh

echo "========================================"
echo "Raspberry Pi 5 Storage Benchmark"
echo "========================================"
date
echo ""

# Configuration - adjust these paths!
MICROSD_PATH="/mnt/sd"        # MicroSD mount point
NVME_PATH="/mnt/nvme"         # NVMe mount point
USB_PATH="/mnt/usb"           # USB drive mount point
TEST_SIZE="1G"

# Function to run benchmark on a path
benchmark_storage() {
    local name=$1
    local path=$2

    if [ ! -d "$path" ]; then
        echo "Path $path does not exist, skipping $name"
        return
    fi

    echo ""
    echo "=== Testing: $name ($path) ==="
    echo ""

    # Sequential Write
    echo "Sequential Write (dd):"
    dd if=/dev/zero of=$path/testfile bs=1M count=1024 conv=fdatasync 2>&1 | tail -1

    # Sequential Read
    echo "Sequential Read (dd):"
    echo 3 | sudo tee /proc/sys/vm/drop_caches > /dev/null
    dd if=$path/testfile of=/dev/null bs=1M 2>&1 | tail -1

    # I/O Latency
    echo "I/O Latency (ioping):"
    ioping -c 10 $path 2>&1 | tail -1

    # Random 4K (fio)
    echo "Random 4K Read (fio):"
    fio --name=rand4k --rw=randread --bs=4k --size=256M \
        --numjobs=4 --filename=$path/fiotest --direct=1 \
        --runtime=30 --group_reporting 2>&1 | grep -E "IOPS|bw="

    # Cleanup
    rm -f $path/testfile $path/fiotest
}

# Check for required tools
for cmd in dd ioping fio; do
    if ! command -v $cmd &> /dev/null; then
        echo "Error: $cmd not installed"
        echo "Install with: sudo apt install $cmd"
        exit 1
    fi
done

# Run benchmarks
benchmark_storage "MicroSD" "$MICROSD_PATH"
benchmark_storage "NVMe SSD" "$NVME_PATH"
benchmark_storage "USB 3.0 SSD" "$USB_PATH"

echo ""
echo "========================================"
echo "Benchmark Complete!"
echo "========================================"
```

### Real-World Results

Typical results comparing storage on Raspberry Pi 5:

| Metric | MicroSD | USB 3.0 SSD | NVMe SSD |
|--------|---------|-------------|----------|
| Sequential Read | 45 MB/s | 350 MB/s | 450 MB/s |
| Sequential Write | 30 MB/s | 300 MB/s | 400 MB/s |
| Random 4K Read | 2,500 IOPS | 25,000 IOPS | 50,000 IOPS |
| Random 4K Write | 1,500 IOPS | 20,000 IOPS | 45,000 IOPS |
| I/O Latency | 3-10 ms | 0.3-0.5 ms | 0.1-0.2 ms |

**The NVMe drive is 10-20x faster for random I/O!**

This makes a HUGE difference for:
- Boot time (10 seconds vs 40 seconds)
- Database performance
- Compilation speed
- Application responsiveness

### Setting Up NVMe on Raspberry Pi 5

```sh
# Check if NVMe is detected
lsblk
sudo nvme list

# If you see /dev/nvme0n1, it's working!

# Partition the NVMe
sudo parted /dev/nvme0n1 mklabel gpt
sudo parted /dev/nvme0n1 mkpart primary ext4 0% 100%

# Format
sudo mkfs.ext4 /dev/nvme0n1p1

# Mount
sudo mkdir /mnt/nvme
sudo mount /dev/nvme0n1p1 /mnt/nvme

# Add to fstab for permanent mount
echo "$(blkid /dev/nvme0n1p1 -o export | grep ^UUID) /mnt/nvme ext4 defaults,noatime 0 2" | sudo tee -a /etc/fstab
```

### Boot from NVMe

To boot your Pi 5 from NVMe (maximum speed!):

```sh
# Clone SD card to NVMe
sudo dd if=/dev/mmcblk0 of=/dev/nvme0n1 bs=4M status=progress

# Resize partition
sudo parted /dev/nvme0n1 resizepart 2 100%
sudo resize2fs /dev/nvme0n1p2

# Update boot config
sudo rpi-eeprom-config --edit
# Add: BOOT_ORDER=0xf416
# This tries NVMe first, then SD, then USB

# Reboot and enjoy the speed!
sudo reboot
```

### Why Such a Big Difference?

| Factor | MicroSD | NVMe |
|--------|---------|------|
| Interface | Serial (SD bus) | Parallel (PCIe) |
| Queue Depth | 1 command | 65,535 commands |
| Latency | 3-10 ms | 0.05-0.1 ms |
| IOPS | 2,000-5,000 | 50,000-100,000 |

NVMe can handle many operations simultaneously (parallelism), while SD cards process commands one at a time!

## Quick Reference: Storage and Performance

### Storage Commands

| Task | Command |
|------|---------|
| List disks | `lsblk` |
| Disk info | `sudo fdisk -l` |
| Mount device | `sudo mount /dev/sdb1 /mnt/usb` |
| Unmount | `sudo umount /mnt/usb` |
| Check space | `df -h` |
| Check usage | `du -sh *` |

### Monitoring Commands

| Task | Command |
|------|---------|
| Memory | `free -h` |
| CPU + processes | `top` or `htop` |
| I/O stats | `iostat -x 2` |
| System activity | `vmstat 2` |
| Load average | `uptime` |

### Benchmark Commands

| Task | Command |
|------|---------|
| Time command | `time command` |
| Disk speed | `dd if=/dev/zero of=test bs=1M count=1024 oflag=direct` |
| Read speed | `sudo hdparm -t /dev/sda` |
| I/O latency | `ioping /dev/sda` |
| Full benchmark | `fio --name=test --rw=read --size=1G` |

## Key Takeaways

You're now a storage and performance expert!

- **Block devices**: Storage as files in /dev
- **Mount/umount**: Attaching file systems
- **fstab**: Automatic mounting at boot
- **df/du**: Space usage monitoring
- **vmstat/iostat**: System performance stats
- **Benchmarking**: time, dd, hdparm, fio, ioping
- **NVMe >> SD**: 10-100x faster for random I/O!

!!! success "Performance Detective!"
    You can now diagnose why systems are slow, identify bottlenecks, and prove that NVMe is worth every penny on your Raspberry Pi 5!

## What's Next?

Now you understand storage and performance, you're ready to explore the Raspberry Pi in depth! The next chapter covers setting up and configuring your Pi for all kinds of projects.

---

??? question "Quick Quiz: Storage and Performance"
1. What command shows disk space usage for mounted file systems?
2. How do you mount a USB drive to /mnt/usb?
3. What does high I/O wait (wa%) indicate?
4. Which tool measures I/O latency?
5. What makes NVMe faster than MicroSD?
6. How do you safely remove a USB drive?
7. What file configures automatic mounting at boot?

??? note "Quiz Answers"
1. `df -h`
2. `sudo mount /dev/sdb1 /mnt/usb`
3. The disk is the bottleneck - processes are waiting for I/O
4. `ioping` (also fio shows latency)
5. PCIe interface with parallel commands, deep queue depth, and low latency
6. `sudo umount /mnt/usb` then physically remove
7. `/etc/fstab`
