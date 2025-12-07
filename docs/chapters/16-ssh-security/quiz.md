# Quiz: SSH and Remote Access

Test your understanding of secure shell and remote system access.

---

#### 1. What is SSH?

<div class="upper-alpha" markdown>
1. Secure Shell - encrypted remote access protocol
2. Simple Shell Host - basic terminal access
3. System Shell Handler - process manager
4. Super Shell - root access tool
</div>

??? question "Show Answer"
    The correct answer is **A**. SSH (Secure Shell) is a cryptographic network protocol for secure remote login and command execution. It encrypts all traffic, replacing insecure protocols like telnet and rsh.

    **Concept Tested:** SSH Protocol

    **See:** [Chapter 16 - SSH Overview](index.md#what-is-ssh)

---

#### 2. What is the basic syntax for connecting to a remote server via SSH?

<div class="upper-alpha" markdown>
1. ssh hostname -u username
2. ssh username@hostname
3. connect username hostname
4. remote username hostname
</div>

??? question "Show Answer"
    The correct answer is **B**. The standard SSH syntax is `ssh username@hostname` (or IP address). For example, `ssh pi@192.168.1.50` connects as user "pi" to that IP address.

    **Concept Tested:** SSH Command

    **See:** [Chapter 16 - SSH Connections](index.md#ssh-connections)

---

#### 3. What is an SSH key pair?

<div class="upper-alpha" markdown>
1. Two password files
2. A public key (shareable) and private key (secret) for authentication
3. Two SSH sessions running together
4. A backup and primary connection
</div>

??? question "Show Answer"
    The correct answer is **B**. An SSH key pair consists of a public key (shared with servers you want to access) and a private key (kept secret on your machine). Key-based authentication is more secure than passwords.

    **Concept Tested:** SSH Keys

    **See:** [Chapter 16 - SSH Keys](index.md#ssh-key-pairs)

---

#### 4. Where is your private SSH key typically stored?

<div class="upper-alpha" markdown>
1. /etc/ssh/
2. ~/.ssh/id_rsa or ~/.ssh/id_ed25519
3. /var/ssh/private
4. ~/keys/private
</div>

??? question "Show Answer"
    The correct answer is **B**. Private keys are stored in your `~/.ssh/` directory, typically named `id_rsa` (RSA) or `id_ed25519` (Ed25519). The matching public key has `.pub` extension. Private keys should have 600 permissions.

    **Concept Tested:** SSH Key Storage

    **See:** [Chapter 16 - SSH Key Location](index.md#key-location)

---

#### 5. What command generates a new SSH key pair?

<div class="upper-alpha" markdown>
1. ssh newkey
2. ssh-keygen
3. generate-ssh-key
4. ssh -create
</div>

??? question "Show Answer"
    The correct answer is **B**. `ssh-keygen` generates SSH key pairs. Run `ssh-keygen -t ed25519` for modern Ed25519 keys. You'll be prompted for a location and optional passphrase for extra security.

    **Concept Tested:** SSH Key Generation

    **See:** [Chapter 16 - Generating Keys](index.md#generating-keys)

---

#### 6. What does `scp` do?

<div class="upper-alpha" markdown>
1. Secure copy - transfers files over SSH
2. System copy - copies system files
3. Serial copy - copies to USB drives
4. Server copy - duplicates servers
</div>

??? question "Show Answer"
    The correct answer is **A**. `scp` (secure copy) uses SSH to securely transfer files between computers. Syntax: `scp file.txt user@host:/path/` to upload, or `scp user@host:/path/file.txt .` to download.

    **Concept Tested:** SCP Command

    **See:** [Chapter 16 - SCP](index.md#scp-command)

---

#### 7. What is a firewall in Linux?

<div class="upper-alpha" markdown>
1. A temperature monitoring tool
2. Software that controls network traffic based on rules
3. A file backup system
4. An anti-virus program
</div>

??? question "Show Answer"
    The correct answer is **B**. A firewall filters network traffic based on defined rules, controlling which connections are allowed or blocked. Linux uses iptables or nftables as the underlying firewall, often managed through ufw (Uncomplicated Firewall).

    **Concept Tested:** Firewall

    **See:** [Chapter 16 - Firewalls](index.md#firewalls)

---

#### 8. What does `ssh-copy-id user@host` do?

<div class="upper-alpha" markdown>
1. Copies the SSH program to a remote server
2. Copies your public key to the remote server for key-based login
3. Creates a duplicate SSH session
4. Copies user accounts between systems
</div>

??? question "Show Answer"
    The correct answer is **B**. `ssh-copy-id` copies your public key to a remote server's `~/.ssh/authorized_keys` file, enabling passwordless SSH login from your machine.

    **Concept Tested:** SSH Key Distribution

    **See:** [Chapter 16 - SSH Copy ID](index.md#ssh-copy-id)

---

#### 9. What is the default SSH port?

<div class="upper-alpha" markdown>
1. 80
2. 443
3. 22
4. 21
</div>

??? question "Show Answer"
    The correct answer is **C**. SSH uses port 22 by default. Changing the default port can provide some security through obscurity but shouldn't be relied upon as the only security measure.

    **Concept Tested:** SSH Port

    **See:** [Chapter 16 - SSH Ports](index.md#ssh-configuration)

---

#### 10. Why are SSH keys considered more secure than passwords?

<div class="upper-alpha" markdown>
1. They're not more secure
2. Keys are much longer and can't be guessed or brute-forced easily
3. Keys are stored encrypted by default
4. Keys expire automatically
</div>

??? question "Show Answer"
    The correct answer is **B**. SSH keys are cryptographically generated and typically 2048+ bits long, making them virtually impossible to brute-force. Passwords can be guessed, weak, or reused. Keys also can't be intercepted during login like passwords.

    **Concept Tested:** SSH Security

    **See:** [Chapter 16 - Key-Based Security](index.md#key-security)
