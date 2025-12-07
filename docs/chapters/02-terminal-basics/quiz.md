# Quiz: Getting Started with the Terminal

Test your understanding of the command line interface, shells, and terminal navigation techniques.

---

#### 1. What is the difference between a shell and a terminal?

<div class="upper-alpha" markdown>
1. They are the same thing
2. The terminal is the window; the shell interprets commands
3. The shell is the window; the terminal interprets commands
4. Neither has anything to do with command lines
</div>

??? question "Show Answer"
    The correct answer is **B**. The terminal (or terminal emulator) is the graphical window application that displays text. The shell is the program running inside that interprets your typed commands and communicates with the operating system. Common terminals include GNOME Terminal and iTerm2; common shells include Bash and Zsh.

    **Concept Tested:** Terminal Emulator, Shell

    **See:** [Chapter 2 - Shells vs Terminals](index.md#terminal-vs-shell)

---

#### 2. What is Bash?

<div class="upper-alpha" markdown>
1. A text editor for Linux
2. The Bourne Again Shell, the default shell on most Linux systems
3. A file compression program
4. A network monitoring tool
</div>

??? question "Show Answer"
    The correct answer is **B**. Bash (Bourne Again Shell) is the default command-line interpreter for most Linux distributions. It's called "Bourne Again" because it's an enhanced version of the original Bourne Shell (sh) created by Stephen Bourne, with a punny reference to being "born again."

    **Concept Tested:** Bash Shell

    **See:** [Chapter 2 - Bash Shell](index.md#bash-the-bourne-again-shell)

---

#### 3. What keyboard shortcut recalls the previous command in Bash?

<div class="upper-alpha" markdown>
1. Ctrl+P or Up Arrow
2. Ctrl+N or Down Arrow
3. Tab key
4. Ctrl+C
</div>

??? question "Show Answer"
    The correct answer is **A**. Pressing the Up Arrow or Ctrl+P recalls the previous command from your command history. You can press it multiple times to go further back in history. Down Arrow or Ctrl+N moves forward through history.

    **Concept Tested:** Arrow Key Navigation, Command History

    **See:** [Chapter 2 - Command History](index.md#command-history)

---

#### 4. What does pressing the Tab key do in the terminal?

<div class="upper-alpha" markdown>
1. Inserts a tab character
2. Autocompletes commands, filenames, or directories
3. Clears the screen
4. Exits the terminal
</div>

??? question "Show Answer"
    The correct answer is **B**. Tab completion is one of the most useful terminal features. Press Tab once to autocomplete a unique match, or press Tab twice to see all possible completions. This saves typing and reduces errors.

    **Concept Tested:** Tab Completion

    **See:** [Chapter 2 - Tab Completion](index.md#tab-completion)

---

#### 5. What is the shell prompt?

<div class="upper-alpha" markdown>
1. An error message
2. The text indicating the shell is ready for input
3. A password request
4. A system warning
</div>

??? question "Show Answer"
    The correct answer is **B**. The shell prompt is the text displayed when the shell is ready to accept commands. It typically shows information like your username, hostname, and current directory, followed by a symbol like `$` (regular user) or `#` (root user). For example: `dan@raspberry:~$`

    **Concept Tested:** Shell Prompt

    **See:** [Chapter 2 - Shell Prompt](index.md#the-shell-prompt)

---

#### 6. In the command `ls -la /home`, what is `-la`?

<div class="upper-alpha" markdown>
1. An argument
2. A filename
3. Command options/flags
4. A directory path
</div>

??? question "Show Answer"
    The correct answer is **C**. The `-la` part consists of command options (or flags) that modify how the command behaves. The `-l` flag means "long format" and `-a` means "all files including hidden." Options typically start with a dash and can be combined.

    **Concept Tested:** Command Options, Command Flags

    **See:** [Chapter 2 - Command Syntax](index.md#command-syntax)

---

#### 7. What does Ctrl+C do in the terminal?

<div class="upper-alpha" markdown>
1. Copies text to clipboard
2. Clears the screen
3. Interrupts/stops the current running command
4. Closes the terminal window
</div>

??? question "Show Answer"
    The correct answer is **C**. Ctrl+C sends an interrupt signal (SIGINT) to stop the currently running command. This is essential when a command runs too long or you want to cancel an operation. Note: In the terminal, Ctrl+C doesn't copy—many terminals use Ctrl+Shift+C for copying instead.

    **Concept Tested:** Ctrl Key Shortcuts

    **See:** [Chapter 2 - Keyboard Shortcuts](index.md#keyboard-shortcuts)

---

#### 8. What command displays your command history?

<div class="upper-alpha" markdown>
1. show history
2. history
3. past
4. commands
</div>

??? question "Show Answer"
    The correct answer is **B**. The `history` command displays a numbered list of your previously executed commands. You can re-run a command by typing `!` followed by its number (e.g., `!42`), or use `!!` to repeat the last command.

    **Concept Tested:** History Command

    **See:** [Chapter 2 - History Command](index.md#the-history-command)

---

#### 9. What is the difference between a login shell and an interactive shell?

<div class="upper-alpha" markdown>
1. They are identical
2. Login shells run when you first log in; interactive shells accept typed commands
3. Interactive shells are for programming; login shells are for browsing
4. Login shells don't accept any commands
</div>

??? question "Show Answer"
    The correct answer is **B**. A login shell is started when you first log into the system (like via SSH or console login) and sources login configuration files. An interactive shell accepts commands from the user (vs. running a script). A shell can be both login and interactive, or just one of these.

    **Concept Tested:** Login Shell, Interactive Shell

    **See:** [Chapter 2 - Shell Types](index.md#types-of-shells)

---

#### 10. Which command clears the terminal screen?

<div class="upper-alpha" markdown>
1. clean
2. cls
3. clear
4. reset
</div>

??? question "Show Answer"
    The correct answer is **C**. The `clear` command clears the terminal screen, giving you a fresh view. You can also use the keyboard shortcut Ctrl+L for the same effect. Note that `cls` is the Windows equivalent and doesn't work in Linux.

    **Concept Tested:** Clear Command

    **See:** [Chapter 2 - Clear Command](index.md#clear-command)
