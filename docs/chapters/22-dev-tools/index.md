# Development Tools and Version Control

## Summary

This chapter covers essential development tools for Linux. Master Git version control from basic commits to branching and merging, learn to collaborate on GitHub, and set up Python development environments with virtual environments and package managers. Explore IDEs like VSCode and Thonny, and learn debugging techniques.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Version Control
2. Git Basics
3. Git Init
4. Git Clone
5. Git Add
6. Git Commit
7. Git Push
8. Git Pull
9. Git Branch
10. Git Merge
11. GitHub
12. GitHub Repositories
13. GitHub SSH Keys
14. Python on Linux
15. Python3 Command
16. Pip Package Manager
17. Virtual Environments
18. Venv Module
19. Conda Environment
20. VSCode on Linux
21. Thonny IDE
22. Code Editors
23. Debugging Tools
24. GDB Debugger
25. Print Debugging

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to Operating Systems and UNIX History](../01-unix-history/index.md)
- [Chapter 10: Text Editors: Nano and Vim](../10-text-editors/index.md)
- [Chapter 16: SSH and Remote Access](../16-ssh-security/index.md)

---

## Welcome to Developer Mode! 🛠️

Congratulations! You've made it to the chapter where you stop being just a Linux *user* and start becoming a Linux *developer*. This is where the magic happens—where ideas become code, code becomes software, and software changes the world.

In this chapter, you'll learn:
- How to track every change you make to your code (and undo mistakes!)
- How to collaborate with developers around the world
- How to set up professional Python development environments
- Which tools make coding on Linux a joy

> "First, solve the problem. Then, write the code."
> — John Johnson

Let's get you set up with the tools that professional developers use every day!

## What is Version Control?

**Version control** is a system that tracks changes to files over time. Think of it as an unlimited "undo" button that also remembers *why* you made each change.

### Why Version Control Matters

| Without Version Control | With Version Control |
|------------------------|---------------------|
| `project.py` | `project.py` |
| `project_v2.py` | (Git tracks all versions) |
| `project_v2_final.py` | |
| `project_v2_final_REALLY.py` | |
| `project_v2_final_REALLY_v3.py` | |

Sound familiar? Version control fixes this mess!

### Benefits of Version Control

| Benefit | Description |
|---------|-------------|
| **History** | See every change ever made |
| **Undo** | Revert to any previous version |
| **Collaboration** | Multiple people work on same project |
| **Branching** | Experiment without breaking main code |
| **Backup** | Code is stored safely (especially with GitHub) |

!!! tip "Git Pun Time"
    Why did the developer quit? Because he didn't get arrays! (a raise) 🤓

## Git Basics: The Foundation

**Git** is the world's most popular version control system. Created by Linus Torvalds (yes, the Linux creator!) in 2005, Git is now used by virtually every software project.

### Installing Git

```sh
# Ubuntu/Debian
sudo apt install git

# Verify installation
git --version
```

### Configuring Git

Before your first commit, tell Git who you are:

```sh
# Set your name
git config --global user.name "Your Name"

# Set your email (use the same email as your GitHub account)
git config --global user.email "you@example.com"

# Set default branch name to 'main'
git config --global init.defaultBranch main

# Set default editor (nano is beginner-friendly)
git config --global core.editor nano

# View your configuration
git config --list
```

### The Three States of Git

Git files exist in three states:

```
Working Directory → Staging Area → Repository
   (Modified)        (Staged)      (Committed)
```

1. **Working Directory:** Files you're editing
2. **Staging Area:** Files ready to be committed
3. **Repository:** Saved history of commits

## Git Init: Starting a New Repository

**Git init** creates a new Git repository in your project folder.

```sh
# Create a project folder
mkdir my-project
cd my-project

# Initialize Git repository
git init

# Git creates a hidden .git folder
ls -la
# You'll see: .git/
```

The `.git` folder contains all version history. Never delete it (unless you want to remove version control)!

### Your First Repository

```sh
# Create a project
mkdir hello-git
cd hello-git
git init

# Create a file
echo "# Hello Git!" > README.md

# Check status
git status
# Shows README.md as "untracked"
```

## Git Clone: Copying Existing Repositories

**Git clone** downloads an existing repository to your computer.

```sh
# Clone a GitHub repository (HTTPS)
git clone https://github.com/username/repository.git

# Clone with SSH (after setting up SSH keys)
git clone git@github.com:username/repository.git

# Clone into a specific folder
git clone https://github.com/username/repository.git my-folder
```

### Example: Clone a Real Project

```sh
# Clone the Linux kernel (warning: huge!)
git clone https://github.com/torvalds/linux.git

# Clone something smaller
git clone https://github.com/python/cpython.git
```

## Git Add: Staging Changes

**Git add** moves files from your working directory to the staging area.

```sh
# Stage a specific file
git add README.md

# Stage multiple files
git add file1.py file2.py

# Stage all changes in current directory
git add .

# Stage all changes everywhere
git add -A

# Stage parts of a file interactively
git add -p filename.py
```

### Understanding Staging

```sh
# Create some files
echo "Hello" > hello.txt
echo "World" > world.txt

# Check status
git status
# Both files are "untracked"

# Stage just one
git add hello.txt

git status
# hello.txt is "to be committed"
# world.txt is still "untracked"
```

Why have a staging area? It lets you:
- Commit only some of your changes
- Review what you're about to commit
- Build commits that make logical sense

## Git Commit: Saving Snapshots

**Git commit** saves your staged changes to the repository history.

```sh
# Commit with a message
git commit -m "Add hello.txt file"

# Commit with detailed message (opens editor)
git commit

# Stage and commit all tracked files
git commit -am "Fix bug in login function"
```

### Writing Good Commit Messages

| Bad Message | Good Message |
|-------------|--------------|
| "fixed stuff" | "Fix login validation for empty passwords" |
| "update" | "Add user profile page with avatar upload" |
| "asdfasdf" | "Refactor database queries for better performance" |
| "WIP" | "Add initial draft of payment processing" |

**Commit message format:**
```
Short summary (50 chars or less)

Longer description if needed. Explain WHY you made
the change, not just WHAT you changed. Wrap at 72
characters per line.
```

### Viewing History

```sh
# View commit history
git log

# Compact one-line view
git log --oneline

# Show changes in each commit
git log -p

# Show last 5 commits
git log -5

# Show pretty graph of branches
git log --oneline --graph --all
```

## Git Push: Sharing Your Work

**Git push** uploads your commits to a remote repository (like GitHub).

```sh
# Push to default remote and branch
git push

# Push to specific remote and branch
git push origin main

# Push and set upstream (first time)
git push -u origin main

# Push all branches
git push --all
```

### The Remote-Local Relationship

```
Your Computer              GitHub
┌──────────────┐          ┌──────────────┐
│    Local     │  push →  │    Remote    │
│  Repository  │  ← pull  │  Repository  │
└──────────────┘          └──────────────┘
```

## Git Pull: Getting Updates

**Git pull** downloads and merges changes from the remote repository.

```sh
# Pull from default remote
git pull

# Pull from specific remote and branch
git pull origin main

# Pull without merging (just fetch)
git fetch origin
```

### Fetch vs Pull

| Command | What It Does |
|---------|--------------|
| `git fetch` | Downloads changes but doesn't merge |
| `git pull` | Downloads AND merges changes |

Use `fetch` when you want to see what changed before merging.

## Git Branch: Parallel Development

**Branches** let you work on features without affecting the main code.

```sh
# List branches
git branch

# Create new branch
git branch feature-login

# Switch to branch
git checkout feature-login
# Or the newer way:
git switch feature-login

# Create and switch in one command
git checkout -b feature-login
# Or:
git switch -c feature-login

# Delete a branch
git branch -d feature-login

# Delete branch forcefully
git branch -D feature-login
```

### Branching Strategy

```
main ────●────●────●────●────●────●────●──→
              │                   ▲
              │   feature-x       │
              └────●────●────●────┘
```

Common branch names:
- `main` or `master` - Production-ready code
- `develop` - Integration branch
- `feature/login` - New feature
- `bugfix/header-crash` - Bug fix
- `hotfix/security-patch` - Urgent fix

## Git Merge: Combining Branches

**Git merge** combines changes from one branch into another.

```sh
# First, switch to the target branch
git checkout main

# Merge the feature branch
git merge feature-login

# If there are conflicts, Git will tell you
# Fix conflicts, then:
git add .
git commit -m "Merge feature-login into main"
```

### Handling Merge Conflicts

When two branches modify the same lines, Git can't automatically merge. You'll see:

```
<<<<<<< HEAD
Your version of the code
=======
Their version of the code
>>>>>>> feature-branch
```

To resolve:
1. Edit the file to keep the code you want
2. Remove the `<<<<<<<`, `=======`, and `>>>>>>>` markers
3. Stage and commit the resolved file

```sh
# After fixing conflicts
git add conflicted-file.py
git commit -m "Resolve merge conflict in login function"
```

!!! warning "Merge Conflict Tip"
    Don't panic when you see conflicts! They're normal. Take your time, understand both versions, and keep the best code.

## GitHub: Where the World Codes

**GitHub** is the largest code hosting platform, home to millions of projects including Linux, Python, and VS Code.

### Why GitHub?

| Feature | Description |
|---------|-------------|
| **Free hosting** | Unlimited public repos, free private repos |
| **Collaboration** | Pull requests, code review, issues |
| **Community** | Follow projects, star favorites |
| **CI/CD** | GitHub Actions for automation |
| **Pages** | Free website hosting |

### Creating a GitHub Account

1. Go to [github.com](https://github.com)
2. Sign up with your email
3. Verify your email
4. Set up your profile

## GitHub Repositories

A **GitHub repository** is a project stored on GitHub.

### Creating a New Repository

1. Click the "+" button → "New repository"
2. Choose a name
3. Add a description
4. Choose public or private
5. Optionally add README, .gitignore, license
6. Click "Create repository"

### Connecting Local to GitHub

```sh
# Create local repository
git init
git add .
git commit -m "Initial commit"

# Add GitHub as remote
git remote add origin https://github.com/username/repo.git

# Push to GitHub
git push -u origin main
```

## GitHub SSH Keys: Secure Access

**SSH keys** let you connect to GitHub without entering your password every time.

### Generating SSH Keys

```sh
# Generate a new SSH key pair
ssh-keygen -t ed25519 -C "your_email@example.com"

# Press Enter for default location
# Enter a passphrase (optional but recommended)

# Start ssh-agent
eval "$(ssh-agent -s)"

# Add your key to ssh-agent
ssh-add ~/.ssh/id_ed25519

# Copy public key to clipboard
cat ~/.ssh/id_ed25519.pub
# Copy the output
```

### Adding SSH Key to GitHub

1. Go to GitHub → Settings → SSH and GPG keys
2. Click "New SSH key"
3. Paste your public key
4. Give it a title (e.g., "My Laptop")
5. Click "Add SSH key"

### Testing SSH Connection

```sh
ssh -T git@github.com
# Should say: "Hi username! You've successfully authenticated..."
```

### Using SSH URLs

```sh
# Clone with SSH
git clone git@github.com:username/repo.git

# Change existing remote to SSH
git remote set-url origin git@github.com:username/repo.git
```

## Python on Linux

Linux is a fantastic platform for Python development. Most distributions include Python pre-installed!

### Python3 Command

```sh
# Check Python version
python3 --version

# Run Python interactively
python3

# Run a Python script
python3 myscript.py

# Run Python with options
python3 -c "print('Hello')"  # Run one-liner
python3 -m http.server       # Run module as script
```

!!! warning "Python 2 vs Python 3"
    Always use `python3`, not `python`. On some systems, `python` still refers to Python 2 (which is obsolete). Python 3 is the present and future!

### Installing Python

```sh
# Ubuntu/Debian (usually pre-installed)
sudo apt install python3 python3-pip python3-venv

# Install specific version
sudo apt install python3.11

# Install development headers (for compiling packages)
sudo apt install python3-dev
```

## Pip Package Manager

**Pip** is Python's package manager—it installs libraries from PyPI (Python Package Index).

```sh
# Install pip (if not already installed)
sudo apt install python3-pip

# Check pip version
pip3 --version

# Install a package
pip3 install requests

# Install specific version
pip3 install requests==2.28.0

# Install from requirements file
pip3 install -r requirements.txt

# List installed packages
pip3 list

# Show package info
pip3 show requests

# Upgrade a package
pip3 install --upgrade requests

# Uninstall a package
pip3 uninstall requests
```

### Requirements Files

Create a `requirements.txt` to share dependencies:

```
# requirements.txt
requests==2.28.0
flask>=2.0
numpy
pandas~=2.0
```

Generate from current environment:
```sh
pip3 freeze > requirements.txt
```

## Virtual Environments: Isolation is Key

**Virtual environments** create isolated Python installations for each project. This prevents dependency conflicts between projects!

### Why Virtual Environments?

| Without Venv | With Venv |
|--------------|-----------|
| Project A needs Django 3.0 | Project A venv has Django 3.0 |
| Project B needs Django 4.0 | Project B venv has Django 4.0 |
| CONFLICT! Only one can be installed | Both work perfectly! ✓ |

## Venv Module: Python's Built-in Solution

The **venv module** creates virtual environments without installing anything extra.

```sh
# Create a virtual environment
python3 -m venv myenv

# Activate the environment
source myenv/bin/activate

# Your prompt changes to show (myenv)
# Now pip install goes into the venv only!
pip install flask

# Deactivate when done
deactivate
```

### Complete Workflow

```sh
# Create project folder
mkdir my-flask-app
cd my-flask-app

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install flask

# Save requirements
pip freeze > requirements.txt

# Work on your project...

# Deactivate when done
deactivate
```

### Venv Best Practices

| Practice | Why |
|----------|-----|
| Name it `venv` or `.venv` | Standard, recognizable |
| Add `venv/` to `.gitignore` | Don't commit dependencies |
| Keep `requirements.txt` updated | Reproducible environment |
| One venv per project | Clean isolation |

```sh
# Add to .gitignore
echo "venv/" >> .gitignore
```

## Conda Environment

**Conda** is an alternative package/environment manager that handles Python AND non-Python dependencies (like C libraries).

### Installing Miniconda

```sh
# Download Miniconda installer
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh

# Run installer
bash Miniconda3-latest-Linux-x86_64.sh

# Follow prompts, accept license, choose install location

# Restart shell or source bashrc
source ~/.bashrc

# Verify
conda --version
```

### Using Conda Environments

```sh
# Create environment with Python 3.11
conda create -n myproject python=3.11

# Activate environment
conda activate myproject

# Install packages
conda install numpy pandas matplotlib

# Install from pip (within conda env)
pip install flask

# List environments
conda env list

# Deactivate
conda deactivate

# Export environment
conda env export > environment.yml

# Create from export
conda env create -f environment.yml

# Remove environment
conda env remove -n myproject
```

### Conda vs Venv

| Feature | venv | Conda |
|---------|------|-------|
| Built into Python | ✓ | ✗ (must install) |
| Python packages | ✓ | ✓ |
| Non-Python deps | ✗ | ✓ |
| Multiple Python versions | ✗ | ✓ |
| Size | Light | Heavy |
| Best for | Pure Python | Data science, ML |

## Code Editors: Your Digital Workshop

A **code editor** is where you write code. Choosing the right one can make coding more enjoyable and productive!

### Popular Code Editors for Linux

| Editor | Type | Best For |
|--------|------|----------|
| **VSCode** | Full IDE | Most developers |
| **Thonny** | Simple IDE | Python beginners |
| **Vim** | Terminal | Speed, server work |
| **Nano** | Terminal | Quick edits |
| **PyCharm** | Full IDE | Python professionals |
| **Sublime Text** | Editor | Fast, lightweight |

## VSCode on Linux

**Visual Studio Code (VSCode)** is the most popular code editor, with excellent Linux support.

### Installing VSCode

```sh
# Ubuntu/Debian (via Microsoft repo)
sudo apt install wget gpg
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" | sudo tee /etc/apt/sources.list.d/vscode.list
sudo apt update
sudo apt install code

# Or via Snap
sudo snap install code --classic
```

### Essential VSCode Extensions

| Extension | Purpose |
|-----------|---------|
| Python | Python support |
| Pylance | Advanced Python features |
| GitLens | Enhanced Git integration |
| Remote - SSH | Edit files on remote servers |
| Markdown Preview | Preview markdown files |
| Docker | Docker integration |

### VSCode Tips

```sh
# Open folder in VSCode
code .

# Open specific file
code myfile.py

# Open in new window
code -n .

# Compare two files
code --diff file1.py file2.py
```

**Useful shortcuts:**
| Shortcut | Action |
|----------|--------|
| `Ctrl+P` | Quick open file |
| `Ctrl+Shift+P` | Command palette |
| `Ctrl+`` | Toggle terminal |
| `Ctrl+B` | Toggle sidebar |
| `Ctrl+/` | Toggle comment |
| `F5` | Start debugging |

## Thonny IDE

**Thonny** is a simple, beginner-friendly Python IDE that comes pre-installed on Raspberry Pi OS.

### Why Thonny?

| Feature | Benefit |
|---------|---------|
| Simple interface | No overwhelming menus |
| Built-in debugger | Step through code easily |
| Variable inspector | See values in real-time |
| MicroPython support | Program microcontrollers |
| Beginner focus | Designed for learning |

### Installing Thonny

```sh
# Ubuntu/Debian
sudo apt install thonny

# Or via pip
pip3 install thonny

# Launch
thonny
```

### Thonny Features

1. **Step-through debugging** - Run code line by line
2. **Variable view** - Watch variables change
3. **Shell** - Test code interactively
4. **Syntax highlighting** - Code is color-coded
5. **MicroPython** - Connect to Raspberry Pi Pico

!!! success "Thonny for Learning"
    If you're new to Python, start with Thonny! Its simple interface lets you focus on learning to code, not learning the editor. You can always switch to VSCode later.

## Debugging Tools: Finding Bugs

**Debugging** is the process of finding and fixing errors in your code. It's a crucial skill that separates beginners from professionals!

### Types of Bugs

| Bug Type | Example |
|----------|---------|
| Syntax Error | Missing colon, wrong indentation |
| Runtime Error | Division by zero, file not found |
| Logic Error | Wrong formula, off-by-one error |

### Print Debugging: The Classic Approach

**Print debugging** is the simplest technique—add print statements to see what's happening.

```python
def calculate_average(numbers):
    print(f"DEBUG: Input numbers = {numbers}")  # Debug

    total = sum(numbers)
    print(f"DEBUG: Total = {total}")  # Debug

    count = len(numbers)
    print(f"DEBUG: Count = {count}")  # Debug

    average = total / count
    print(f"DEBUG: Average = {average}")  # Debug

    return average

# Test
result = calculate_average([10, 20, 30])
print(f"Result: {result}")
```

### Better Print Debugging

```python
# Use f-strings with variable names
x = 42
print(f"{x=}")  # Prints: x=42

# Use __name__ for module info
print(f"Running in module: {__name__}")

# Use logging instead of print
import logging
logging.basicConfig(level=logging.DEBUG)
logging.debug("This is a debug message")
logging.info("This is an info message")
logging.warning("This is a warning")
logging.error("This is an error")
```

### Python Debugging with pdb

**pdb** is Python's built-in debugger.

```python
# Add breakpoint in code
import pdb; pdb.set_trace()

# Or in Python 3.7+
breakpoint()
```

pdb commands:
| Command | Action |
|---------|--------|
| `n` | Next line |
| `s` | Step into function |
| `c` | Continue to next breakpoint |
| `p variable` | Print variable value |
| `l` | List source code |
| `q` | Quit debugger |
| `h` | Help |

### VSCode Debugging

VSCode has an excellent visual debugger:

1. Set breakpoints by clicking line numbers
2. Press F5 to start debugging
3. Use debug controls (continue, step over, step into)
4. Watch variables in the sidebar
5. Use the debug console for expressions

## GDB Debugger: For C/C++ and More

**GDB (GNU Debugger)** is the standard debugger for C, C++, and other compiled languages.

### Installing GDB

```sh
sudo apt install gdb
```

### Basic GDB Usage

```sh
# Compile with debug symbols
gcc -g myprogram.c -o myprogram

# Start GDB
gdb ./myprogram

# GDB commands
(gdb) break main        # Set breakpoint at main
(gdb) run               # Start program
(gdb) next              # Next line
(gdb) step              # Step into function
(gdb) print variable    # Print variable
(gdb) continue          # Continue execution
(gdb) backtrace         # Show call stack
(gdb) quit              # Exit GDB
```

### GDB Example Session

```sh
$ gdb ./myprogram
(gdb) break main
Breakpoint 1 at 0x1149: file myprogram.c, line 5.
(gdb) run
Starting program: /home/user/myprogram

Breakpoint 1, main () at myprogram.c:5
5       int x = 10;
(gdb) next
6       int y = 20;
(gdb) print x
$1 = 10
(gdb) next
7       int z = x + y;
(gdb) print z
$2 = 30
(gdb) continue
Continuing.
[Program exited normally]
(gdb) quit
```

## Complete Development Workflow

Here's how all these tools work together:

### 1. Start a New Project

```sh
# Create project directory
mkdir awesome-project
cd awesome-project

# Initialize Git
git init

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Create initial files
echo "# Awesome Project" > README.md
echo "venv/" > .gitignore

# Initial commit
git add .
git commit -m "Initial project setup"
```

### 2. Connect to GitHub

```sh
# Create repo on GitHub first, then:
git remote add origin git@github.com:username/awesome-project.git
git push -u origin main
```

### 3. Daily Development

```sh
# Activate environment
cd awesome-project
source venv/bin/activate

# Create feature branch
git checkout -b feature-user-auth

# Write code in VSCode
code .

# Stage and commit often
git add .
git commit -m "Add login form validation"

# Push to GitHub
git push -u origin feature-user-auth

# Create Pull Request on GitHub
# After review and approval, merge to main
```

### 4. Keep Dependencies Updated

```sh
# Update requirements
pip freeze > requirements.txt

# Commit dependency changes
git add requirements.txt
git commit -m "Update dependencies"
```

## Review Questions

<details markdown="1">
<summary>What are the three states of Git files, and what does each state mean?</summary>

The three states are: (1) Modified - files have been changed in the working directory but not staged, (2) Staged - files have been marked with git add and are ready to be committed, (3) Committed - files have been safely stored in the local repository. Understanding this workflow helps you track which changes are ready to be saved and which are still in progress.
</details>

<details markdown="1">
<summary>What is the difference between git fetch and git pull?</summary>

git fetch downloads changes from the remote repository but doesn't merge them into your local branch - it just updates your remote-tracking branches. git pull does both: it fetches changes AND automatically merges them into your current branch. Use fetch when you want to see what changed before merging, and pull when you're ready to integrate the changes immediately.
</details>

<details markdown="1">
<summary>Why should you use virtual environments for Python projects?</summary>

Virtual environments isolate each project's dependencies from the system Python and from other projects. Without them, you might have conflicts where Project A needs Django 3.0 but Project B needs Django 4.0 - you can only have one version installed globally. With virtual environments, each project has its own isolated Python with its own packages, so they never conflict.
</details>

<details markdown="1">
<summary>What is the purpose of SSH keys for GitHub, and how do they work?</summary>

SSH keys provide secure, password-less authentication to GitHub. You generate a key pair (private and public), add the public key to your GitHub account, and keep the private key on your computer. When you push or pull, SSH uses your private key to prove your identity. This is more secure than passwords and more convenient since you don't need to enter credentials for every operation.
</details>

<details markdown="1">
<summary>What is the difference between print debugging and using a debugger like pdb?</summary>

Print debugging adds print statements to show variable values and execution flow - it's simple but requires modifying code and rerunning. A debugger like pdb lets you pause execution at any point, inspect all variables, step through code line by line, and even change values mid-execution without modifying the source code. Debuggers are more powerful but have a learning curve; print debugging is quick for simple issues.
</details>

---

## Chapter Summary

You're now equipped with the essential tools of a professional developer! Let's recap:

**Version Control with Git:**
- Initialize repos with `git init`, clone with `git clone`
- Stage with `git add`, commit with `git commit`
- Push to share, pull to update
- Branch for features, merge to integrate

**GitHub Collaboration:**
- Host your code in repositories
- Use SSH keys for secure access
- Collaborate with pull requests

**Python Development:**
- Use `python3` and `pip3` always
- Create virtual environments with `venv`
- Use Conda for complex dependencies
- Keep `requirements.txt` updated

**Code Editors:**
- VSCode for full-featured development
- Thonny for Python beginners
- Vim/Nano for terminal editing

**Debugging:**
- Print debugging for quick checks
- pdb for Python stepping
- GDB for compiled languages
- VSCode debugger for visual debugging

These tools form the foundation of professional software development. Master them, and you'll be ready to contribute to open-source projects, collaborate with teams, and build amazing software!

Keep coding, keep committing, and remember: every expert was once a beginner who refused to give up! 🚀💻
