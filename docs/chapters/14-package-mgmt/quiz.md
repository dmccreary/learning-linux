# Quiz: Package Management

Test your understanding of software installation and package management.

---

#### 1. What is APT?

<div class="upper-alpha" markdown>
1. A type of file archive
2. Advanced Package Tool for Debian/Ubuntu systems
3. An automatic process timer
4. An application performance tester
</div>

??? question "Show Answer"
    The correct answer is **B**. APT (Advanced Package Tool) is the package management system used by Debian, Ubuntu, Raspberry Pi OS, and related distributions. It handles downloading, installing, updating, and removing software packages.

    **Concept Tested:** APT Package Manager

    **See:** [Chapter 14 - APT](index.md)

---

#### 2. What does `sudo apt update` do?

<div class="upper-alpha" markdown>
1. Updates all installed packages
2. Downloads the latest package list from repositories
3. Updates the APT program itself
4. Installs security updates only
</div>

??? question "Show Answer"
    The correct answer is **B**. `apt update` refreshes the package database, downloading the latest list of available packages from repositories. It doesn't install anything—run `apt upgrade` afterwards to actually update packages.

    **Concept Tested:** Apt Update

    **See:** [Chapter 14 - Apt Update](index.md)

---

#### 3. What's the difference between `apt upgrade` and `apt full-upgrade`?

<div class="upper-alpha" markdown>
1. They're identical
2. `full-upgrade` may remove packages to complete upgrades
3. `full-upgrade` is faster
4. `upgrade` is for system packages only
</div>

??? question "Show Answer"
    The correct answer is **B**. `apt upgrade` upgrades packages without removing any. `apt full-upgrade` (formerly `dist-upgrade`) may remove packages if necessary to resolve dependencies and complete upgrades, making it more thorough but potentially more disruptive.

    **Concept Tested:** Apt Upgrade

    **See:** [Chapter 14 - Apt Upgrade](index.md)

---

#### 4. How do you install a package called "htop"?

<div class="upper-alpha" markdown>
1. apt get htop
2. sudo apt install htop
3. install htop
4. sudo download htop
</div>

??? question "Show Answer"
    The correct answer is **B**. `sudo apt install htop` downloads and installs the htop package along with any required dependencies. The `sudo` is needed because installation modifies system directories.

    **Concept Tested:** Apt Install

    **See:** [Chapter 14 - Installing Packages](index.md)

---

#### 5. What does `apt search` do?

<div class="upper-alpha" markdown>
1. Searches inside installed packages
2. Searches for packages by name or description
3. Searches for files on the system
4. Searches online documentation
</div>

??? question "Show Answer"
    The correct answer is **B**. `apt search keyword` searches package names and descriptions in the package database. For example, `apt search image editor` finds packages related to image editing.

    **Concept Tested:** Apt Search

    **See:** [Chapter 14 - Searching Packages](index.md)

---

#### 6. What is a repository in the context of package management?

<div class="upper-alpha" markdown>
1. A backup location for files
2. A server hosting software packages for download
3. A type of database
4. A version control system
</div>

??? question "Show Answer"
    The correct answer is **B**. A repository is a server that hosts software packages. Your system is configured to connect to specific repositories (defined in `/etc/apt/sources.list`). APT downloads packages from these trusted sources.

    **Concept Tested:** Software Repositories

    **See:** [Chapter 14 - Repositories](index.md)

---

#### 7. What does `apt remove` vs `apt purge` do differently?

<div class="upper-alpha" markdown>
1. They're identical
2. `purge` also removes configuration files
3. `remove` is faster
4. `purge` removes dependencies
</div>

??? question "Show Answer"
    The correct answer is **B**. `apt remove` uninstalls the package but leaves configuration files. `apt purge` removes the package AND its configuration files for a complete cleanup.

    **Concept Tested:** Apt Remove

    **See:** [Chapter 14 - Removing Packages](index.md)

---

#### 8. What does `apt autoremove` do?

<div class="upper-alpha" markdown>
1. Automatically removes all packages
2. Removes orphaned packages no longer needed as dependencies
3. Removes old log files
4. Automatically updates packages
</div>

??? question "Show Answer"
    The correct answer is **B**. `apt autoremove` removes packages that were automatically installed as dependencies but are no longer needed. This cleans up packages left behind after removing software.

    **Concept Tested:** System Maintenance

    **See:** [Chapter 14 - Autoremove](index.md)

---

#### 9. What command shows detailed information about a package?

<div class="upper-alpha" markdown>
1. apt info
2. apt show
3. apt details
4. apt describe
</div>

??? question "Show Answer"
    The correct answer is **B**. `apt show packagename` displays detailed information about a package including description, version, dependencies, installed size, and maintainer.

    **Concept Tested:** Apt Show

    **See:** [Chapter 14 - Package Information](index.md)

---

#### 10. What is a .deb file?

<div class="upper-alpha" markdown>
1. A debugging log file
2. A Debian package file for manual installation
3. A database backup
4. A development environment
</div>

??? question "Show Answer"
    The correct answer is **B**. A .deb file is a Debian package that can be installed manually with `dpkg -i package.deb`. This is used when software isn't available in repositories. APT automatically handles dependencies; dpkg does not.

    **Concept Tested:** DEB Packages

    **See:** [Chapter 14 - Manual Installation](index.md)
