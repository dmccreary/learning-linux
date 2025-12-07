# Quiz: Introduction to Operating Systems and UNIX History

Test your understanding of UNIX history, Linux origins, and the philosophy that shaped modern computing.

---

#### 1. What is the primary function of an operating system?

<div class="upper-alpha" markdown>
1. To display graphics on the screen
2. To manage hardware resources and provide services for programs
3. To connect to the internet
4. To store user passwords
</div>

??? question "Show Answer"
    The correct answer is **B**. An operating system manages hardware resources (CPU, memory, storage) and provides services for running programs. It acts as an intermediary between applications and hardware, handling memory management, file systems, process scheduling, and hardware communication.

    **Concept Tested:** Operating System

    **See:** [Chapter 1 - What is an Operating System](index.md#what-even-is-an-operating-system)

---

#### 2. Where was UNIX originally developed in 1969?

<div class="upper-alpha" markdown>
1. MIT
2. Stanford University
3. Bell Labs
4. IBM Research
</div>

??? question "Show Answer"
    The correct answer is **C**. UNIX was developed at Bell Labs in Murray Hill, New Jersey by Ken Thompson and Dennis Ritchie. Bell Labs was a legendary research facility that also invented transistors, lasers, and information theory.

    **Concept Tested:** Bell Labs, UNIX History

    **See:** [Chapter 1 - The Birth of UNIX](index.md#the-birth-of-unix-a-love-story-with-computers)

---

#### 3. Who created the C programming language that UNIX was rewritten in?

<div class="upper-alpha" markdown>
1. Linus Torvalds
2. Richard Stallman
3. Ken Thompson
4. Dennis Ritchie
</div>

??? question "Show Answer"
    The correct answer is **D**. Dennis Ritchie created the C programming language between 1969-1973. UNIX was rewritten in C, making it the first operating system written in a high-level language, which enabled its portability to different hardware platforms.

    **Concept Tested:** Dennis Ritchie, C Programming Language

    **See:** [Chapter 1 - The C Programming Language](index.md)

---

#### 4. Which principle is central to the UNIX philosophy?

<div class="upper-alpha" markdown>
1. Create large programs that do everything
2. Do one thing and do it well
3. Avoid using text files
4. Never combine programs together
</div>

??? question "Show Answer"
    The correct answer is **B**. The UNIX philosophy emphasizes creating small, modular tools that each do one thing well. These tools can then be combined using pipes to accomplish complex tasks. This approach leads to simpler, more maintainable code.

    **Concept Tested:** UNIX Philosophy, Small Modular Tools

    **See:** [Chapter 1 - UNIX Philosophy](index.md)

---

#### 5. What does "portability" mean in the context of UNIX?

<div class="upper-alpha" markdown>
1. The ability to carry a laptop
2. The ability to run on different hardware platforms
3. The ability to connect USB devices
4. The ability to transfer files wirelessly
</div>

??? question "Show Answer"
    The correct answer is **B**. Portability refers to the ability of UNIX to run on different hardware platforms. Because UNIX was written in C (a high-level language) rather than assembly language, it could be compiled for different processor architectures, allowing it to spread across many types of computers.

    **Concept Tested:** Portability

    **See:** [Chapter 1 - Portability](index.md)

---

#### 6. Who started the GNU Project to create a free UNIX-like operating system?

<div class="upper-alpha" markdown>
1. Linus Torvalds
2. Ken Thompson
3. Richard Stallman
4. Dennis Ritchie
</div>

??? question "Show Answer"
    The correct answer is **C**. Richard Stallman started the GNU Project in 1983 with the goal of creating a complete free software operating system. GNU stands for "GNU's Not Unix" - a recursive acronym. The project created many essential tools but needed a kernel, which Linux later provided.

    **Concept Tested:** GNU Project, Richard Stallman

    **See:** [Chapter 1 - GNU Project](index.md)

---

#### 7. What motivated Linus Torvalds to create the Linux kernel in 1991?

<div class="upper-alpha" markdown>
1. He wanted to start a company
2. He wanted a free UNIX-like system for his PC
3. He was hired by Bell Labs
4. He needed it for a video game
</div>

??? question "Show Answer"
    The correct answer is **B**. Linus Torvalds was a Finnish university student who wanted a UNIX-like operating system for his personal PC but couldn't afford commercial options. He started Linux as a hobby project and famously announced it on a newsgroup, saying it was "just a hobby, won't be big and professional."

    **Concept Tested:** Linus Torvalds, Linux Kernel

    **See:** [Chapter 1 - Linux Origins](index.md)

---

#### 8. What is the relationship between GNU and Linux?

<div class="upper-alpha" markdown>
1. They are competing operating systems
2. GNU provides tools and Linux provides the kernel
3. Linux is older than GNU
4. They have no connection to each other
</div>

??? question "Show Answer"
    The correct answer is **B**. GNU provides essential tools and utilities (like the compiler, shell, and core utilities), while Linux provides the kernel that manages hardware. Together they form a complete operating system, which is why some prefer to call it "GNU/Linux."

    **Concept Tested:** GNU Project, Linux Kernel, Open Source

    **See:** [Chapter 1 - GNU/Linux](index.md)

---

#### 9. Which Linux distribution is known as the "universal operating system" and serves as the base for Ubuntu?

<div class="upper-alpha" markdown>
1. Red Hat
2. Fedora
3. Debian
4. Arch Linux
</div>

??? question "Show Answer"
    The correct answer is **C**. Debian is known as the "universal operating system" and is one of the oldest and most influential Linux distributions. Ubuntu, one of the most popular desktop Linux distributions, is based on Debian and inherits its package management system (apt).

    **Concept Tested:** Debian, Linux Distributions

    **See:** [Chapter 1 - Linux Distributions](index.md)

---

#### 10. What does POSIX stand for and why is it important?

<div class="upper-alpha" markdown>
1. Personal Operating System Interface eXtension - for gaming
2. Portable Operating System Interface - for compatibility across UNIX-like systems
3. Programming Open Source Interface eXchange - for sharing code
4. Professional Operating System Installation eXpert - for system setup
</div>

??? question "Show Answer"
    The correct answer is **B**. POSIX (Portable Operating System Interface) is a family of standards that define how UNIX-like operating systems should behave. This ensures that software written for one POSIX-compliant system can run on others with minimal changes, enabling software portability across Linux, macOS, BSD, and other UNIX-like systems.

    **Concept Tested:** POSIX Standards

    **See:** [Chapter 1 - POSIX](index.md)
