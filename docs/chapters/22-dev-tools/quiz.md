# Quiz: Development Tools and Version Control

Test your understanding of git, development tools, and programming environments.

---

#### 1. What is Git?

<div class="upper-alpha" markdown>
1. A text editor
2. A distributed version control system
3. A programming language
4. A cloud storage service
</div>

??? question "Show Answer"
    The correct answer is **B**. Git is a distributed version control system that tracks changes in files, enabling collaboration, branching, and maintaining history. It's the most widely used version control system in software development.

    **Concept Tested:** Git

    **See:** [Chapter 22 - Git Overview](index.md#git)

---

#### 2. What does `git clone` do?

<div class="upper-alpha" markdown>
1. Creates a new empty repository
2. Downloads a copy of a remote repository
3. Clones your hard drive
4. Duplicates a branch
</div>

??? question "Show Answer"
    The correct answer is **B**. `git clone` downloads a complete copy of a repository, including all files and history. For example, `git clone https://github.com/user/repo.git` clones that repository to your machine.

    **Concept Tested:** Git Clone

    **See:** [Chapter 22 - Git Clone](index.md#git-clone)

---

#### 3. What does `git commit -m "message"` do?

<div class="upper-alpha" markdown>
1. Sends changes to GitHub
2. Saves staged changes to the local repository with a message
3. Deletes the previous commit
4. Merges two branches
</div>

??? question "Show Answer"
    The correct answer is **B**. `git commit` saves your staged changes to the local repository as a snapshot. The `-m` flag lets you add a message describing what changed. Changes aren't sent to remote until you `git push`.

    **Concept Tested:** Git Commit

    **See:** [Chapter 22 - Git Commit](index.md#git-commit)

---

#### 4. What is the difference between `git pull` and `git fetch`?

<div class="upper-alpha" markdown>
1. They're identical
2. pull fetches AND merges; fetch only downloads
3. fetch is faster
4. pull works offline
</div>

??? question "Show Answer"
    The correct answer is **B**. `git fetch` downloads updates from the remote but doesn't merge them into your working branch. `git pull` does both: it fetches and then automatically merges (or rebases) the changes.

    **Concept Tested:** Git Pull, Git Fetch

    **See:** [Chapter 22 - Git Pull](index.md#git-pull)

---

#### 5. What is a Python virtual environment?

<div class="upper-alpha" markdown>
1. A virtual machine running Python
2. An isolated Python installation with its own packages
3. A Python IDE
4. Cloud-based Python
</div>

??? question "Show Answer"
    The correct answer is **B**. A virtual environment is an isolated Python installation that has its own packages, separate from the system Python. This prevents package conflicts between projects and keeps the system clean.

    **Concept Tested:** Python Virtual Environments

    **See:** [Chapter 22 - Virtual Environments](index.md#virtual-environments)

---

#### 6. What command creates a Python virtual environment?

<div class="upper-alpha" markdown>
1. pip install venv
2. python -m venv myenv
3. virtualenv create myenv
4. python --venv myenv
</div>

??? question "Show Answer"
    The correct answer is **B**. `python -m venv myenv` creates a virtual environment named "myenv". Activate it with `source myenv/bin/activate` (Linux/Mac) or `myenv\Scripts\activate` (Windows).

    **Concept Tested:** Creating Virtual Environments

    **See:** [Chapter 22 - Creating Venvs](index.md#creating-venvs)

---

#### 7. What does `pip` do?

<div class="upper-alpha" markdown>
1. Plays music files
2. Installs Python packages from PyPI
3. Compiles Python code
4. Pretty-prints Python output
</div>

??? question "Show Answer"
    The correct answer is **B**. `pip` (Package Installer for Python) downloads and installs packages from the Python Package Index (PyPI). For example, `pip install requests` installs the requests library.

    **Concept Tested:** Pip

    **See:** [Chapter 22 - Pip](index.md#pip)

---

#### 8. What is GitHub?

<div class="upper-alpha" markdown>
1. An alternative to Git
2. A web-based hosting service for Git repositories
3. A code editor
4. A programming language
</div>

??? question "Show Answer"
    The correct answer is **B**. GitHub is a cloud platform that hosts Git repositories. It adds features like pull requests, issues, actions (CI/CD), and collaboration tools on top of Git's version control.

    **Concept Tested:** GitHub

    **See:** [Chapter 22 - GitHub](index.md#github)

---

#### 9. What is the purpose of a `.gitignore` file?

<div class="upper-alpha" markdown>
1. Lists contributors to ignore
2. Specifies files Git should not track
3. Ignores merge conflicts
4. Disables Git features
</div>

??? question "Show Answer"
    The correct answer is **B**. `.gitignore` lists patterns for files and directories that Git should not track. Common entries include compiled files, node_modules, virtual environments, and sensitive data like API keys.

    **Concept Tested:** Gitignore

    **See:** [Chapter 22 - Gitignore](index.md#gitignore)

---

#### 10. What does `git branch` show?

<div class="upper-alpha" markdown>
1. The tree structure of your project
2. A list of branches and which one you're on
3. The history of commits
4. Remote repositories
</div>

??? question "Show Answer"
    The correct answer is **B**. `git branch` lists all local branches, with an asterisk (*) marking the current branch. Use `git branch -a` to also show remote branches. Branches allow parallel development.

    **Concept Tested:** Git Branches

    **See:** [Chapter 22 - Git Branches](index.md#git-branches)
