# Quiz: GPIO Programming and Hardware Projects

Test your understanding of GPIO, sensors, and IoT concepts.

---

#### 1. What does GPIO stand for?

<div class="upper-alpha" markdown>
1. General Processor Interface Output
2. General Purpose Input/Output
3. Graphical Processing Input/Output
4. Ground Power Input/Output
</div>

??? question "Show Answer"
    The correct answer is **B**. GPIO (General Purpose Input/Output) refers to pins that can be programmed as either inputs (reading sensors) or outputs (controlling LEDs, motors, etc.) for interfacing with external hardware.

    **Concept Tested:** GPIO Pins

    **See:** [Chapter 20 - GPIO Overview](index.md#gpio-overview)

---

#### 2. What are the three main types of pins on the Raspberry Pi GPIO header?

<div class="upper-alpha" markdown>
1. USB, HDMI, and Ethernet
2. Power (5V/3.3V), Ground, and GPIO data pins
3. Input, Output, and Bidirectional
4. Serial, Parallel, and Network
</div>

??? question "Show Answer"
    The correct answer is **B**. The 40-pin header contains power pins (5V and 3.3V), ground pins (essential for completing circuits), and GPIO data pins (programmable for input/output).

    **Concept Tested:** GPIO Pin Types

    **See:** [Chapter 20 - Pin Types](index.md#pin-types)

---

#### 3. What is I2C used for?

<div class="upper-alpha" markdown>
1. Internet 2 Connection
2. A communication protocol for connecting multiple devices with two wires
3. A type of camera interface
4. Internal to Core processing
</div>

??? question "Show Answer"
    The correct answer is **B**. I2C (Inter-Integrated Circuit) is a serial communication protocol that uses just two wires (SDA for data, SCL for clock) to connect multiple devices like sensors and displays to the Pi.

    **Concept Tested:** I2C Protocol

    **See:** [Chapter 20 - I2C](index.md#i2c-protocol)

---

#### 4. What happens if you connect a 5V sensor directly to a GPIO pin?

<div class="upper-alpha" markdown>
1. It works perfectly
2. It can damage the Raspberry Pi (GPIO uses 3.3V logic)
3. The sensor won't power on
4. It automatically converts the voltage
</div>

??? question "Show Answer"
    The correct answer is **B**. GPIO pins use 3.3V logic and are not 5V tolerant. Connecting 5V directly can fry the Pi! Use a level shifter or voltage divider when interfacing with 5V devices.

    **Concept Tested:** GPIO Voltage Safety

    **See:** [Chapter 20 - Voltage Safety](index.md#voltage-safety)

---

#### 5. What Python library is commonly used for GPIO programming on Raspberry Pi?

<div class="upper-alpha" markdown>
1. NumPy
2. RPi.GPIO or gpiozero
3. Flask
4. Pandas
</div>

??? question "Show Answer"
    The correct answer is **B**. RPi.GPIO is the traditional library for GPIO control, while gpiozero provides a simpler, beginner-friendly interface. Both are included in Raspberry Pi OS.

    **Concept Tested:** GPIO Programming

    **See:** [Chapter 20 - GPIO Libraries](index.md#gpio-libraries)

---

#### 6. What is PWM and what is it used for?

<div class="upper-alpha" markdown>
1. Power With Modulation - power saving
2. Pulse Width Modulation - controlling brightness, motor speed, servos
3. Programmed Wave Management - audio output
4. Pin Wire Management - cable organization
</div>

??? question "Show Answer"
    The correct answer is **B**. PWM (Pulse Width Modulation) rapidly switches a pin on/off to simulate analog output. It's used to dim LEDs, control motor speeds, and position servo motors by varying the duty cycle.

    **Concept Tested:** PWM

    **See:** [Chapter 20 - PWM](index.md#pwm)

---

#### 7. What is IoT?

<div class="upper-alpha" markdown>
1. Input of Technology
2. Internet of Things - connected smart devices
3. Integrated Output Terminal
4. Internal Operation Test
</div>

??? question "Show Answer"
    The correct answer is **B**. IoT (Internet of Things) refers to physical devices connected to the internet that can collect and share data. Examples include smart thermostats, security cameras, and sensor networks.

    **Concept Tested:** IoT Concept

    **See:** [Chapter 20 - IoT](index.md#iot-overview)

---

#### 8. What is MQTT commonly used for in IoT projects?

<div class="upper-alpha" markdown>
1. Multi-Query Translation Tool
2. A lightweight messaging protocol for IoT devices
3. Media Quality Transfer Technology
4. Multi-platform Query Testing
</div>

??? question "Show Answer"
    The correct answer is **B**. MQTT (Message Queuing Telemetry Transport) is a lightweight publish-subscribe messaging protocol perfect for IoT devices. It's designed for low-bandwidth, high-latency networks.

    **Concept Tested:** MQTT Protocol

    **See:** [Chapter 20 - MQTT](index.md#mqtt)

---

#### 9. What is a breadboard used for?

<div class="upper-alpha" markdown>
1. Cutting bread into circuits
2. Prototyping electronic circuits without soldering
3. Mounting the Raspberry Pi
4. Storing electronic components
</div>

??? question "Show Answer"
    The correct answer is **B**. A breadboard is a reusable prototyping board with internal connections that lets you build and test circuits without soldering. Components and jumper wires plug into holes to create circuits.

    **Concept Tested:** Breadboard

    **See:** [Chapter 20 - Breadboard](index.md#breadboard)

---

#### 10. What does SPI stand for and what is it used for?

<div class="upper-alpha" markdown>
1. Simple Programming Interface - basic coding
2. Serial Peripheral Interface - fast communication with displays, sensors
3. System Process Information - debugging
4. Secure Protocol Internet - encryption
</div>

??? question "Show Answer"
    The correct answer is **B**. SPI (Serial Peripheral Interface) is a fast synchronous communication protocol used for high-speed devices like displays, SD cards, and some sensors. It uses more wires than I2C but is faster.

    **Concept Tested:** SPI Protocol

    **See:** [Chapter 20 - SPI](index.md#spi-protocol)
