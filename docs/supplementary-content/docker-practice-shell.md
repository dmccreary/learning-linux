# Adding a Practice Shell

When learning Linux commands, you need a safe environment to experiment without risking damage to your main computer. Docker provides the perfect solution: a lightweight, isolated Linux environment that starts in under a second.

## What is Docker?

Docker is a tool that runs **containers**—lightweight, isolated environments that share your computer's operating system kernel. Think of a container as a "mini computer" running inside your computer, but without the overhead of a full virtual machine.

Key differences between containers and virtual machines:

| Feature | Virtual Machine | Docker Container |
|---------|-----------------|------------------|
| Startup time | 30-60 seconds | Less than 1 second |
| Memory usage | 1-2 GB minimum | 5-50 MB |
| Disk space | 10-40 GB | 5-200 MB |
| Isolation | Complete (separate OS) | Process-level (shared kernel) |

## What is Alpine Linux?

Alpine Linux is a tiny Linux distribution designed for security and simplicity. The entire base image is only about **5 MB**—compare that to Ubuntu at 75 MB or a full desktop Linux at several gigabytes.

Alpine achieves this small size by:

- Using **musl libc** instead of the larger glibc
- Using **BusyBox** for common utilities (a single binary that provides ls, cat, grep, and 300+ other commands)
- Including only essential packages—no extras

### What is musl libc?

Every program on Linux needs a **C library** (libc)—it's the foundation that provides basic functions like printing text, reading files, and allocating memory. Think of it as the translator between your programs and the Linux kernel.

Most Linux distributions use **glibc** (GNU C Library), which is feature-rich but large (~2 MB). Alpine uses **musl** (pronounced "mussel"), a lightweight alternative that's only about 600 KB.

musl prioritizes:

- **Small size** — Less code means smaller images
- **Simplicity** — Easier to understand and audit
- **Standards compliance** — Follows POSIX closely

The tradeoff? Some programs compiled for glibc won't work directly on Alpine. But for learning Linux commands, musl works perfectly.

Despite its tiny size, Alpine includes everything you need to practice Linux commands: a shell, file system, users, permissions, and all the standard utilities.

## Why is Startup So Fast?

When you run `docker run alpine /bin/sh`, several things happen almost instantly:

### 1. No Boot Process

A traditional computer or VM must:

1. Initialize hardware (BIOS/UEFI)
2. Load a bootloader (GRUB)
3. Load and decompress the kernel
4. Initialize kernel subsystems
5. Start system services (systemd/init)
6. Finally, present a login prompt

This takes 30-60 seconds.

A Docker container skips ALL of this. It simply starts a new process (`/bin/sh`) in an isolated namespace. The kernel is already running—it's your Mac's or Linux's kernel.

### 2. Layered File System

Docker uses a **copy-on-write** file system. The Alpine image exists as read-only layers on your disk. When you start a container:

- Docker doesn't copy the 5 MB image
- It creates a thin writable layer on top
- Files are only copied when you modify them

This means starting 10 containers uses barely more disk space than starting 1.

### 3. Shared Kernel

The Linux kernel handles process isolation, memory management, and hardware access. Containers share this kernel with your host system (on Mac, Docker runs a lightweight Linux VM that provides this kernel).

Since there's no kernel to load, containers start as fast as any regular program.

### 4. Minimal Image

Alpine's 5 MB footprint means:

- Less data to read from disk
- Less memory to allocate
- Faster image downloads
- Quicker container creation

## The Docker Command Explained

```sh
docker run -it --rm alpine:latest /bin/sh
```

Let's break down each part:

| Part | Meaning |
|------|---------|
| `docker` | The Docker command-line tool |
| `run` | Create and start a new container |
| `-i` | **Interactive** mode—keep STDIN open so you can type commands |
| `-t` | Allocate a **TTY** (terminal)—gives you a proper command prompt |
| `--rm` | **Remove** the container automatically when you exit |
| `alpine:latest` | The image to use (Alpine Linux, latest version) |
| `/bin/sh` | The command to run inside the container (a shell) |

The `-it` flags together give you an interactive terminal session. Without them, the container would start and immediately exit because there's no input.

The `--rm` flag is important for practice—it ensures each session starts fresh and doesn't leave old containers cluttering your system.

## Setting Up an Alias

Typing the full command every time is tedious. Create a shortcut by adding an alias to your shell configuration.

### Step 1: Add the Alias

Open your shell configuration file and add this line:

```sh
alias psh='docker run -it --rm alpine:latest /bin/sh'
```

For **zsh** (default on macOS):
```sh
echo "alias psh='docker run -it --rm alpine:latest /bin/sh'" >> ~/.zshrc
```

For **bash**:
```sh
echo "alias psh='docker run -it --rm alpine:latest /bin/sh'" >> ~/.bashrc
```

### Step 2: Reload Your Configuration

```sh
source ~/.zshrc    # for zsh
source ~/.bashrc   # for bash
```

### Step 3: Use Your Practice Shell

Now just type:

```sh
psh
```

You'll immediately see the Alpine shell prompt:

```
/ #
```

The `#` indicates you're running as root (administrator) inside the container.

## Exploring Your Practice Environment

Once inside, try some commands:

```sh
/ # ls
bin    etc    lib    mnt    proc   run    srv    tmp    var
dev    home   media  opt    root   sbin   sys    usr

/ # whoami
root

/ # cat /etc/os-release
NAME="Alpine Linux"
ID=alpine
VERSION_ID=3.19.0
PRETTY_NAME="Alpine Linux v3.19"

/ # pwd
/
```

## Exiting the Practice Shell

When you're done, simply type:

```sh
exit
```

Or press `Ctrl+D`.

The container stops and is automatically removed (thanks to `--rm`). Your next `psh` command will create a fresh environment.

## What Happens to Your Work?

Because we use `--rm`, everything inside the container is deleted when you exit:

- Files you created? Gone.
- Packages you installed? Gone.
- Changes you made? Gone.

This is actually a **feature** for learning:

- You can't permanently break anything
- Each session starts clean
- You can experiment without fear

If you need to save work, you'll learn about Docker volumes later—but for practicing commands, the ephemeral nature is perfect.

## Summary

| Concept | What It Means |
|---------|---------------|
| Docker | Tool for running lightweight containers |
| Container | Isolated environment sharing the host kernel |
| Alpine | Tiny (5 MB) Linux distribution |
| Fast startup | No boot process—just starts a process |
| `--rm` flag | Auto-cleanup when container exits |
| `psh` alias | Your shortcut to a practice Linux shell |

You now have a safe, fast, disposable Linux environment for practicing commands. Break things, experiment, and learn—then just type `exit` and start fresh!
