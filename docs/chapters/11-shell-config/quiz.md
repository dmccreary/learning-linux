# Quiz: Shell Configuration and Environment

Test your understanding of environment variables, aliases, and shell configuration.

---

#### 1. What is an environment variable?

<div class="upper-alpha" markdown>
1. A file that stores passwords
2. A named value accessible to programs and the shell
3. A type of shell script
4. A network setting
</div>

??? question "Show Answer"
    The correct answer is **B**. Environment variables are named values that can be accessed by the shell and programs. Examples include PATH (command locations), HOME (your home directory), and USER (your username).

    **Concept Tested:** Environment Variables

    **See:** [Chapter 11 - Environment Variables](index.md#environment-variables)

---

#### 2. How do you display the value of the PATH variable?

<div class="upper-alpha" markdown>
1. path
2. echo $PATH
3. show PATH
4. print PATH
</div>

??? question "Show Answer"
    The correct answer is **B**. Use `echo $PATH` to display the value of the PATH variable. The `$` prefix tells the shell to substitute the variable's value. You can also use `printenv PATH`.

    **Concept Tested:** Environment Variables, Echo Command

    **See:** [Chapter 11 - Viewing Variables](index.md#viewing-variables)

---

#### 3. What is the purpose of the PATH variable?

<div class="upper-alpha" markdown>
1. Stores your browsing history
2. Lists directories where the shell looks for executable commands
3. Contains the path to your current directory
4. Holds your home directory location
</div>

??? question "Show Answer"
    The correct answer is **B**. PATH contains a colon-separated list of directories the shell searches when you type a command. If a command isn't in any PATH directory, you get "command not found."

    **Concept Tested:** PATH Variable

    **See:** [Chapter 11 - PATH Variable](index.md#path-variable)

---

#### 4. What is an alias in Linux?

<div class="upper-alpha" markdown>
1. A hidden file
2. A shortcut name for a command or series of commands
3. An alternate username
4. A backup of a file
</div>

??? question "Show Answer"
    The correct answer is **B**. An alias is a shortcut for a command. For example, `alias ll='ls -la'` creates a shortcut so typing `ll` runs `ls -la`. Aliases save typing and can add default options to commands.

    **Concept Tested:** Alias Command

    **See:** [Chapter 11 - Aliases](index.md#aliases)

---

#### 5. What is the `.bashrc` file used for?

<div class="upper-alpha" markdown>
1. Storing system logs
2. Configuring bash for interactive non-login shells
3. Holding temporary files
4. Recording command history
</div>

??? question "Show Answer"
    The correct answer is **B**. The `.bashrc` file contains configuration that runs every time you start an interactive bash shell. It's where you put aliases, custom prompts, functions, and environment variable exports.

    **Concept Tested:** Bashrc File

    **See:** [Chapter 11 - Bashrc](index.md#bashrc-file)

---

#### 6. How do you make an environment variable available to child processes?

<div class="upper-alpha" markdown>
1. Use uppercase letters only
2. Use the export command
3. Put it in quotes
4. Add sudo before it
</div>

??? question "Show Answer"
    The correct answer is **B**. Use `export` to make a variable available to child processes (programs you run). For example, `export EDITOR=vim` makes EDITOR available to any program that checks for it.

    **Concept Tested:** Export Command

    **See:** [Chapter 11 - Exporting Variables](index.md#export-command)

---

#### 7. What does `source .bashrc` or `. .bashrc` do?

<div class="upper-alpha" markdown>
1. Creates a backup of .bashrc
2. Executes .bashrc in the current shell
3. Opens .bashrc in an editor
4. Deletes .bashrc
</div>

??? question "Show Answer"
    The correct answer is **B**. The `source` command (or `.`) executes a script in the current shell. After editing `.bashrc`, run `source ~/.bashrc` to apply changes immediately without opening a new terminal.

    **Concept Tested:** Source Command

    **See:** [Chapter 11 - Sourcing Files](index.md#source-command)

---

#### 8. What is PS1?

<div class="upper-alpha" markdown>
1. A PlayStation 1 emulator
2. The primary shell prompt variable
3. A security protocol
4. A printing service
</div>

??? question "Show Answer"
    The correct answer is **B**. PS1 (Prompt String 1) is the environment variable that defines your command prompt appearance. You can customize it to show username, hostname, current directory, colors, and more.

    **Concept Tested:** Shell Prompt, PS1

    **See:** [Chapter 11 - Customizing the Prompt](index.md#ps1-prompt)

---

#### 9. Where should you put environment variables you want available in all shells?

<div class="upper-alpha" markdown>
1. /etc/passwd
2. ~/.profile or ~/.bash_profile
3. /tmp/variables
4. ~/.bash_history
</div>

??? question "Show Answer"
    The correct answer is **B**. Put persistent environment variables in `~/.profile` or `~/.bash_profile` (for login shells). These are sourced once at login. Put shell-specific settings in `.bashrc` (sourced for each interactive shell).

    **Concept Tested:** Shell Configuration Files

    **See:** [Chapter 11 - Configuration Files](index.md#configuration-files)

---

#### 10. What command temporarily sets a variable for just one command?

<div class="upper-alpha" markdown>
1. It's not possible
2. VAR=value command
3. temp VAR=value && command
4. export VAR=value; command
</div>

??? question "Show Answer"
    The correct answer is **B**. Prefixing a command with `VAR=value` sets that variable only for that command's execution. For example, `LANG=C sort file.txt` temporarily changes the locale for the sort command only.

    **Concept Tested:** Environment Variables

    **See:** [Chapter 11 - Temporary Variables](index.md#temporary-variables)
