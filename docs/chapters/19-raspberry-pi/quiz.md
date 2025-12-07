# Quiz: Introduction to Raspberry Pi

Test your understanding of Raspberry Pi hardware and setup.

---

#### 1. What is a Raspberry Pi?

<div class="upper-alpha" markdown>
1. A type of fruit-flavored pie
2. A single-board computer designed for education and projects
3. A programming language
4. A Linux distribution
</div>

??? question "Show Answer"
    The correct answer is **B**. The Raspberry Pi is a small, affordable single-board computer developed by the Raspberry Pi Foundation. It runs Linux and is perfect for learning, DIY projects, and embedded systems.

    **Concept Tested:** Raspberry Pi

    **See:** [Chapter 19 - What is Raspberry Pi](index.md#what-is-a-raspberry-pi)

---

#### 2. What operating system does Raspberry Pi officially use?

<div class="upper-alpha" markdown>
1. Windows Pi Edition
2. Raspberry Pi OS (formerly Raspbian)
3. macOS Pi
4. Android Pi
</div>

??? question "Show Answer"
    The correct answer is **B**. Raspberry Pi OS (formerly called Raspbian) is the official operating system, based on Debian Linux. It's optimized for the Raspberry Pi hardware and comes with useful software pre-installed.

    **Concept Tested:** Raspberry Pi OS

    **See:** [Chapter 19 - Raspberry Pi OS](index.md)

---

#### 3. What is the 40-pin GPIO header used for?

<div class="upper-alpha" markdown>
1. Connecting monitors
2. Connecting sensors, LEDs, motors, and other electronics
3. Adding more RAM
4. Network connections
</div>

??? question "Show Answer"
    The correct answer is **B**. The GPIO (General Purpose Input/Output) header has 40 pins for connecting external electronics like sensors, LEDs, motors, and other hardware projects. It's what makes the Pi special for physical computing.

    **Concept Tested:** GPIO Header

    **See:** [Chapter 19 - GPIO Header](index.md)

---

#### 4. What software is used to write Raspberry Pi OS to an SD card?

<div class="upper-alpha" markdown>
1. Windows Disk Utility
2. Raspberry Pi Imager
3. SD Card Writer Pro
4. Linux Formatter
</div>

??? question "Show Answer"
    The correct answer is **B**. Raspberry Pi Imager is the official tool for writing operating systems to SD cards. It can download Raspberry Pi OS directly and handles all the formatting automatically.

    **Concept Tested:** Pi Imager

    **See:** [Chapter 19 - Pi Imager](index.md)

---

#### 5. What is the Raspberry Pi Zero?

<div class="upper-alpha" markdown>
1. A Pi that doesn't work
2. A tiny, ultra-low-cost version of the Raspberry Pi
3. The first Raspberry Pi ever made
4. A Raspberry Pi without GPIO
</div>

??? question "Show Answer"
    The correct answer is **B**. The Raspberry Pi Zero is a tiny, affordable version ($5-15) with a smaller form factor. It has less power than full-sized Pis but is perfect for embedded projects where size and cost matter.

    **Concept Tested:** Raspberry Pi Zero

    **See:** [Chapter 19 - Pi Zero](index.md)

---

#### 6. What type of video output does the Raspberry Pi 4/5 have?

<div class="upper-alpha" markdown>
1. VGA only
2. Micro HDMI (2 ports for dual display)
3. Full-size HDMI
4. DisplayPort
</div>

??? question "Show Answer"
    The correct answer is **B**. The Raspberry Pi 4 and 5 use micro HDMI ports (not standard HDMI), and have two of them for dual monitor support. You'll need a micro HDMI to HDMI adapter or cable.

    **Concept Tested:** Pi HDMI Ports

    **See:** [Chapter 19 - HDMI Ports](index.md)

---

#### 7. What command-line tool is used to configure Raspberry Pi settings?

<div class="upper-alpha" markdown>
1. piconfig
2. raspi-config
3. pi-settings
4. raspberry-setup
</div>

??? question "Show Answer"
    The correct answer is **B**. `raspi-config` is the official configuration tool for Raspberry Pi. It lets you enable SSH, change passwords, configure boot options, enable interfaces, and more—all from a text-based menu.

    **Concept Tested:** Raspi-Config

    **See:** [Chapter 19 - Raspi-Config](index.md)

---

#### 8. How do you safely shut down a Raspberry Pi?

<div class="upper-alpha" markdown>
1. Just unplug the power
2. Use sudo shutdown now or sudo poweroff
3. Close all applications first
4. Press the power button
</div>

??? question "Show Answer"
    The correct answer is **B**. Always shut down properly using `sudo shutdown now` or `sudo poweroff`. Unplugging without shutting down can corrupt the SD card and cause data loss.

    **Concept Tested:** Pi Safe Shutdown

    **See:** [Chapter 19 - Safe Shutdown](index.md)

---

#### 9. What is the Raspberry Pi 500?

<div class="upper-alpha" markdown>
1. A Pi with 500GB storage
2. A Raspberry Pi built into a keyboard
3. The 500th model of Raspberry Pi
4. A $500 premium version
</div>

??? question "Show Answer"
    The correct answer is **B**. The Raspberry Pi 500 (and its predecessor the Pi 400) is a complete Raspberry Pi built into a keyboard form factor. Just add a monitor, mouse, and power supply for a complete computer.

    **Concept Tested:** Raspberry Pi 500

    **See:** [Chapter 19 - Pi 500](index.md)

---

#### 10. What voltage do GPIO pins operate at?

<div class="upper-alpha" markdown>
1. 12V
2. 3.3V
3. 5V
4. 1.5V
</div>

??? question "Show Answer"
    The correct answer is **B**. GPIO pins on Raspberry Pi operate at 3.3V logic levels. Connecting 5V directly to a GPIO pin can damage the Pi! The board does have 5V power pins, but they're for powering external devices, not for GPIO signals.

    **Concept Tested:** GPIO Voltage

    **See:** [Chapter 19 - GPIO Voltage](index.md)
