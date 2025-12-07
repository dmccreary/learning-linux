# GPIO Programming and Hardware Projects

## Summary

This chapter dives deep into hardware interfacing with the Raspberry Pi GPIO pins. You'll learn to control LEDs and NeoPixel strips, read sensors (temperature, motion, light), control motors (DC, servo, stepper), and build IoT projects. The chapter culminates in home automation concepts including Home Assistant, Node-RED, and remote monitoring dashboards.

## Concepts Covered

This chapter covers the following 40 concepts from the learning graph:

1. GPIO Programming
2. GPIO Input
3. GPIO Output
4. Digital Signals
5. PWM Signals
6. LED Control
7. LED Strip
8. NeoPixel LEDs
9. Button Input
10. Sensor Reading
11. Temperature Sensor
12. Motion Sensor
13. Light Sensor
14. Motor Control
15. DC Motors
16. Servo Motors
17. Stepper Motors
18. Motor Drivers
19. External Power
20. Current Monitoring
21. Internet of Things
22. IoT Sensors
23. IoT Protocols
24. MQTT Protocol
25. Home Automation
26. Smart Home Hub
27. Home Monitoring
28. Temperature Logging
29. Security Cameras
30. Motion Detection
31. Remote Access
32. Web Dashboard
33. Data Logging
34. Time Series Data
35. Alerts and Notifications
36. Home Assistant
37. Node-RED
38. IFTTT Integration
39. Voice Control
40. Automation Scripts

## Prerequisites

This chapter builds on concepts from:

- [Chapter 13: Shell Scripting and Automation](../13-scripting/index.md)
- [Chapter 16: SSH and Remote Access](../16-ssh-security/index.md)
- [Chapter 19: Introduction to Raspberry Pi](../19-raspberry-pi/index.md)

---

## Welcome to the Physical World! 🔌

This is where Linux gets *really* exciting. In previous chapters, you learned to navigate files, write scripts, and configure systems. Now we're going to connect your Raspberry Pi to the real world—blinking LEDs, reading temperatures, spinning motors, and building smart home systems!

By the end of this chapter, you'll be able to:
- Control lights and displays with code
- Read data from sensors
- Make things move with motors
- Build IoT projects that connect to the internet
- Set up your own smart home automation

> "Any sufficiently advanced technology is indistinguishable from magic."
> — Arthur C. Clarke

Well, by the end of this chapter, *you'll* be the magician!

## Thonny: Your Best Friend for Python and MicroPython

Before we dive into GPIO programming, let me introduce you to the best IDE (Integrated Development Environment) for learning Python on the Raspberry Pi: **Thonny**.

### What is Thonny?

Thonny comes pre-installed on Raspberry Pi OS, and it's absolutely perfect for beginners. It was designed by the University of Tartu in Estonia specifically to teach programming!

| Feature | Why It's Great |
|---------|----------------|
| Simple interface | No overwhelming menus or toolbars |
| Built-in debugger | Step through code line by line |
| Variable inspector | See what your variables contain in real-time |
| Syntax highlighting | Code is color-coded and easier to read |
| REPL shell | Test Python commands instantly |
| MicroPython support | Program microcontrollers directly! |

### Launching Thonny

```sh
# From the terminal
thonny &

# Or from the menu
# Programming → Thonny Python IDE
```

### Thonny for GPIO Programming

Here's why Thonny is perfect for hardware projects:

1. **Instant feedback** - Run code and see your LED blink immediately
2. **Easy debugging** - When your motor doesn't spin, step through to find why
3. **Variable watching** - See sensor values update in real-time
4. **Shell access** - Test GPIO commands one at a time

### The Magic of MicroPython

OK, I need to take a moment to rave about **MicroPython**. It's absolutely incredible!

MicroPython is a lean, efficient implementation of Python 3 designed to run on microcontrollers—tiny computers with limited memory. And here's the amazing part: **Thonny can connect directly to MicroPython devices!**

| Feature | Regular Python (Pi) | MicroPython (Pico) |
|---------|--------------------|--------------------|
| Memory needed | ~100MB+ | 256KB! |
| Boot time | Seconds | Milliseconds |
| Hardware access | Via libraries | Built-in! |
| Cost | $35-80 (Pi) | $4-15 (Pico/ESP32) |
| Power usage | 3-5 watts | Milliwatts |

With Thonny, you can write code on your Raspberry Pi and push it directly to a Raspberry Pi Pico or ESP32. Your script runs *on the microcontroller*—no Linux needed!

!!! success "MicroPython is FUN!"
    There's something magical about writing ten lines of code and watching a $6 strip 180 LEDs blink on a $4 Pico board. MicroPython removes all the barriers between your ideas and reality. If you haven't tried it, you're missing out on one of the most enjoyable programming experiences available!

### Learn More with These Intelligent Textbooks

Want to dive deeper into MicroPython projects? Check out these fantastic free resources:

| Textbook | Description | Link |
|----------|-------------|------|
| **Learning MicroPython** | Complete guide to programming with Thonny and MicroPython | [dmccreary.github.io/learning-micropython](https://dmccreary.github.io/learning-micropython/) |
| **Moving Rainbow** | Program LED strips for lights, costumes, and wearables | [dmccreary.github.io/moving-rainbow](https://dmccreary.github.io/moving-rainbow/) |
| **Clocks and Watches** | Build your own smart clocks and watch displays | [dmccreary.github.io/clocks-and-watches](https://dmccreary.github.io/clocks-and-watches/) |

These books will take your hardware skills to the next level!

## GPIO Programming: The Basics

**GPIO** stands for General Purpose Input/Output. These are the 40 pins on your Raspberry Pi that can be programmed to:
- **Read inputs** (buttons, sensors)
- **Send outputs** (LEDs, motors, relays)
- **Communicate** with other devices (I2C, SPI, UART)

### The gpiozero Library

Python's `gpiozero` library makes GPIO programming *ridiculously* easy:

```sh
# It's pre-installed on Raspberry Pi OS, but just in case:
sudo apt install python3-gpiozero
```

### GPIO Output: Making Things Happen

**GPIO Output** sends a signal FROM your Pi TO an external device. When you set a pin HIGH (3.3V), current flows. When you set it LOW (0V), it stops.

```python
#!/usr/bin/env python3
# simple-output.py - GPIO output basics

from gpiozero import LED
from time import sleep

# Create an LED object on GPIO17
led = LED(17)

# Turn it on
led.on()
print("LED is ON")
sleep(2)

# Turn it off
led.off()
print("LED is OFF")
```

### GPIO Input: Reading the World

**GPIO Input** reads a signal INTO your Pi FROM an external device. This lets you detect button presses, read switches, or receive sensor signals.

```python
#!/usr/bin/env python3
# simple-input.py - GPIO input basics

from gpiozero import Button
from time import sleep

# Create a button object on GPIO4
button = Button(4)

print("Press the button (Ctrl+C to exit)...")

while True:
    if button.is_pressed:
        print("Button is PRESSED!")
    else:
        print("Button is released")
    sleep(0.1)
```

### Digital Signals: HIGH and LOW

**Digital signals** have only two states:

| State | Voltage | Meaning |
|-------|---------|---------|
| HIGH | 3.3V | On, True, 1 |
| LOW | 0V | Off, False, 0 |

This is the foundation of all digital electronics. Everything your computer does ultimately comes down to billions of these tiny on/off switches!

### PWM Signals: Shades of Gray

But what if you want *half* brightness? Or 75% motor speed? That's where **PWM (Pulse Width Modulation)** comes in.

PWM rapidly switches between HIGH and LOW. The ratio of on-time to total-time is called the **duty cycle**:

| Duty Cycle | Effect |
|------------|--------|
| 0% | Always OFF |
| 25% | Dim LED / slow motor |
| 50% | Half brightness / medium speed |
| 75% | Bright LED / fast motor |
| 100% | Always ON |

```python
#!/usr/bin/env python3
# pwm-demo.py - PWM fading LED

from gpiozero import PWMLED
from time import sleep

# Create a PWM LED on GPIO17
led = PWMLED(17)

print("Fading LED up and down...")

while True:
    # Fade up
    for brightness in range(0, 101, 5):
        led.value = brightness / 100
        sleep(0.05)

    # Fade down
    for brightness in range(100, -1, -5):
        led.value = brightness / 100
        sleep(0.05)
```

!!! tip "PWM Pun Time"
    Why did the LED break up with the GPIO pin? There was no spark between them—just duty cycles! ⚡

## LED Control: Let There Be Light!

LEDs (Light Emitting Diodes) are the perfect starting point for GPIO projects. They're cheap, visible, and nearly impossible to break.

### Basic LED Circuit

**Components needed:**
- 1 LED (any color)
- 1 resistor (330Ω for most LEDs)
- Jumper wires
- Breadboard (optional but helpful)

**Wiring:**
1. LED positive leg (longer, called anode) → GPIO pin through resistor
2. LED negative leg (shorter, called cathode) → Ground (GND)

!!! warning "Always Use a Resistor!"
    LEDs need current-limiting resistors. Without one, too much current flows and your LED dies a quick, bright death. The resistor value depends on the LED color and desired brightness, but 330Ω is safe for most cases.

### LED Control Code

```python
#!/usr/bin/env python3
# led-control.py - Complete LED control example

from gpiozero import LED
from time import sleep

# Create LED object
led = LED(17)

# Different control methods
led.on()           # Turn on
led.off()          # Turn off
led.toggle()       # Switch state
led.blink()        # Start blinking (default: 1s on, 1s off)
led.blink(0.5, 0.5) # Faster blink (0.5s on, 0.5s off)

# Manual control with timing
for i in range(10):
    led.toggle()
    print(f"Blink {i+1}")
    sleep(0.3)

led.off()
print("Done!")
```

## LED Strips: Multiple LEDs at Once

**LED strips** contain many LEDs in a row, controlled together. There are two main types:

| Type | Control | Colors |
|------|---------|--------|
| Analog RGB | 3 PWM pins | One color for whole strip |
| Addressable (NeoPixel) | 1 data pin | Individual control per LED! |

### NeoPixel LEDs: The Rainbow Makers

**NeoPixels** (also called WS2812B) are individually addressable RGB LEDs. Each LED has its own tiny controller chip, so you can set every single LED to a different color!

```sh
# Install the library
sudo pip3 install rpi_ws281x adafruit-circuitpython-neopixel
```

```python
#!/usr/bin/env python3
# neopixel-demo.py - NeoPixel LED strip control

import board
import neopixel
from time import sleep

# Configuration
NUM_LEDS = 30
PIN = board.D18  # GPIO18 (must be PWM-capable)

# Create NeoPixel object
strip = neopixel.NeoPixel(PIN, NUM_LEDS, brightness=0.3, auto_write=False)

# Colors are (Red, Green, Blue) from 0-255
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
WHITE = (255, 255, 255)
OFF = (0, 0, 0)

# Set all LEDs to one color
strip.fill(RED)
strip.show()
sleep(1)

# Rainbow chase effect
def rainbow_chase():
    colors = [RED, (255, 127, 0), (255, 255, 0),
              GREEN, BLUE, (75, 0, 130), (148, 0, 211)]

    for _ in range(50):  # Run 50 cycles
        for i in range(NUM_LEDS):
            strip[i] = colors[i % len(colors)]
        strip.show()

        # Shift colors
        colors = colors[1:] + colors[:1]
        sleep(0.05)

rainbow_chase()
strip.fill(OFF)
strip.show()
```

!!! success "NeoPixel Projects Are Amazing!"
    With NeoPixels you can build light-up costumes, mood lighting, notification displays, music visualizers, and so much more. Check out the [Moving Rainbow](https://dmccreary.github.io/moving-rainbow/) book for dozens of project ideas!

## Button Input: Human Interaction

Reading **button input** is how your projects respond to human interaction.

### Button Wiring

**Simple button circuit:**
1. One side of button → GPIO pin
2. Other side of button → Ground (GND)

gpiozero automatically enables an internal pull-up resistor, so this simple wiring works perfectly!

### Button Code

```python
#!/usr/bin/env python3
# button-input.py - Responding to button presses

from gpiozero import Button, LED
from signal import pause

button = Button(4)
led = LED(17)

# Simple callbacks
button.when_pressed = lambda: print("Button pressed!")
button.when_released = lambda: print("Button released!")

# Control LED with button
button.when_pressed = led.on
button.when_released = led.off

print("Press the button to control the LED. Ctrl+C to exit.")
pause()  # Keep program running
```

### Debouncing

Real buttons "bounce"—they don't make clean contact immediately. gpiozero handles this automatically, but you can adjust:

```python
# Increase debounce time for noisy buttons
button = Button(4, bounce_time=0.1)  # 100ms debounce
```

## Sensor Reading: Perceiving the Environment

Sensors let your Pi perceive the world. Let's explore the most common types!

### Temperature Sensors

The **DS18B20** is a popular digital temperature sensor that uses the 1-Wire protocol.

**Wiring:**
1. VCC (red) → 3.3V
2. GND (black) → Ground
3. DATA (yellow) → GPIO4 with 4.7kΩ pull-up resistor to 3.3V

```sh
# Enable 1-Wire interface
sudo raspi-config
# Interface Options → 1-Wire → Enable
```

```python
#!/usr/bin/env python3
# temperature-sensor.py - Read DS18B20 temperature

from gpiozero import CPUTemperature
import glob
import time

# Read DS18B20 sensor
def read_ds18b20():
    # Find the sensor
    device_folder = glob.glob('/sys/bus/w1/devices/28*')[0]
    device_file = device_folder + '/temperature'

    # Read temperature (in millidegrees Celsius)
    with open(device_file, 'r') as f:
        temp_raw = int(f.read().strip())

    return temp_raw / 1000.0  # Convert to degrees

# Also read CPU temperature for comparison
cpu = CPUTemperature()

print("Temperature readings (Ctrl+C to stop):")
while True:
    try:
        room_temp = read_ds18b20()
        cpu_temp = cpu.temperature
        print(f"Room: {room_temp:.1f}°C | CPU: {cpu_temp:.1f}°C")
        time.sleep(2)
    except IndexError:
        print("DS18B20 not found. Check wiring!")
        break
```

### Motion Sensors (PIR)

**PIR (Passive Infrared)** sensors detect motion by sensing changes in infrared radiation (body heat).

```python
#!/usr/bin/env python3
# motion-sensor.py - PIR motion detection

from gpiozero import MotionSensor, LED
from signal import pause

pir = MotionSensor(4)
led = LED(17)

def motion_detected():
    print("🚨 Motion detected!")
    led.on()

def motion_stopped():
    print("All clear.")
    led.off()

pir.when_motion = motion_detected
pir.when_no_motion = motion_stopped

print("PIR sensor active. Move to trigger!")
pause()
```

### Light Sensors

**Light sensors** (photoresistors/LDRs) measure ambient light. Since they output analog signals, you'll need an ADC (Analog-to-Digital Converter) like the MCP3008.

```python
#!/usr/bin/env python3
# light-sensor.py - Read light levels with MCP3008 ADC

from gpiozero import MCP3008
from time import sleep

# Light sensor on channel 0 of MCP3008
light = MCP3008(channel=0)

print("Light level readings (Ctrl+C to stop):")
while True:
    # Value is 0.0 (dark) to 1.0 (bright)
    level = light.value
    bars = "█" * int(level * 20)
    print(f"Light: {level:.2f} [{bars:<20}]")
    sleep(0.5)
```

## Motor Control: Making Things Move!

Now we're getting into the exciting stuff—making things MOVE! Motors convert electrical energy into mechanical motion.

### DC Motors

**DC motors** are simple: apply voltage, they spin. Reverse voltage, they spin backward.

!!! danger "Never Connect Motors Directly to GPIO!"
    Motors need more current than GPIO pins can provide (and can create voltage spikes). Always use a motor driver!

### Motor Drivers

A **motor driver** is an interface between your low-power GPIO pins and high-power motors. Popular options:

| Driver | Motors | Current | Best For |
|--------|--------|---------|----------|
| L298N | 2 DC or 1 stepper | 2A per channel | Small robots |
| TB6612 | 2 DC | 1.2A per channel | Efficient, small projects |
| L293D | 2 DC | 600mA per channel | Very small motors |
| Motor HAT | 4 DC or 2 steppers | 1.2A per channel | Easy Raspberry Pi integration |

### DC Motor Control with L298N

```python
#!/usr/bin/env python3
# dc-motor.py - Control DC motor with L298N driver

from gpiozero import Motor
from time import sleep

# Motor connected to L298N
# IN1 → GPIO17, IN2 → GPIO18
motor = Motor(forward=17, backward=18)

print("Motor control demo")

# Full speed forward
motor.forward()
print("Forward!")
sleep(2)

# Stop
motor.stop()
sleep(1)

# Full speed backward
motor.backward()
print("Backward!")
sleep(2)

# Half speed forward
motor.forward(0.5)
print("Half speed forward")
sleep(2)

# Variable speed
print("Accelerating...")
for speed in range(0, 101, 10):
    motor.forward(speed / 100)
    sleep(0.2)

motor.stop()
print("Done!")
```

### Servo Motors

**Servo motors** rotate to a specific angle (usually 0-180°) and hold that position. They're perfect for robot arms, steering mechanisms, and pan/tilt cameras.

```python
#!/usr/bin/env python3
# servo-motor.py - Control servo motor

from gpiozero import Servo
from time import sleep

# Servo on GPIO17
# min_pulse_width and max_pulse_width may need tuning for your servo
servo = Servo(17)

print("Servo sweep demo")

while True:
    # Move to minimum position (-1)
    servo.min()
    print("Position: MIN")
    sleep(1)

    # Move to middle position (0)
    servo.mid()
    print("Position: MID")
    sleep(1)

    # Move to maximum position (1)
    servo.max()
    print("Position: MAX")
    sleep(1)
```

### Stepper Motors

**Stepper motors** move in precise steps (typically 200 per revolution). They're used in 3D printers, CNC machines, and any application requiring precise positioning.

```python
#!/usr/bin/env python3
# stepper-motor.py - Control stepper with ULN2003 driver

from gpiozero import OutputDevice
from time import sleep

# ULN2003 driver pins
IN1 = OutputDevice(17)
IN2 = OutputDevice(18)
IN3 = OutputDevice(27)
IN4 = OutputDevice(22)

# Step sequence for 28BYJ-48 stepper
SEQUENCE = [
    [1, 0, 0, 1],
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 1],
    [0, 0, 0, 1],
]

pins = [IN1, IN2, IN3, IN4]

def step_motor(steps, delay=0.002):
    """Move motor specified number of steps. Negative = reverse."""
    direction = 1 if steps > 0 else -1

    for _ in range(abs(steps)):
        for step in SEQUENCE[::direction]:
            for pin, value in zip(pins, step):
                if value:
                    pin.on()
                else:
                    pin.off()
            sleep(delay)

# One full revolution = 512 steps for 28BYJ-48 in half-step mode
print("Rotating one full turn...")
step_motor(512)

print("Rotating back...")
step_motor(-512)

# Turn off all coils
for pin in pins:
    pin.off()
```

### External Power for Motors

Motors need **external power**—never try to power them from GPIO or even the Pi's 5V pin!

| Motor Type | Typical Voltage | Typical Current |
|------------|-----------------|-----------------|
| Small DC | 3-6V | 100-500mA |
| Medium DC | 6-12V | 500mA-2A |
| Servo | 5-6V | 500mA-2A (peak) |
| Stepper | 5-12V | 200mA-2A per phase |

**Power supply tips:**
1. Use a separate power supply for motors
2. Connect the grounds together (motor supply GND to Pi GND)
3. Use a capacitor (100µF) across motor power to reduce noise
4. Consider a bench power supply for testing

### Current Monitoring

For battery-powered projects, **current monitoring** helps you track power usage:

```python
#!/usr/bin/env python3
# current-monitor.py - Monitor current with INA219

from ina219 import INA219
from time import sleep

# INA219 current sensor (I2C address 0x40)
ina = INA219(shunt_ohms=0.1)
ina.configure()

print("Power monitoring (Ctrl+C to stop):")
while True:
    voltage = ina.voltage()
    current = ina.current()
    power = ina.power()

    print(f"Voltage: {voltage:.2f}V | Current: {current:.1f}mA | Power: {power:.1f}mW")
    sleep(1)
```

## Internet of Things: Connecting Everything

The **Internet of Things (IoT)** is about connecting physical devices to the internet. Your Raspberry Pi is a perfect IoT hub!

### What Makes an IoT Device?

| Component | Purpose |
|-----------|---------|
| Sensors | Collect data from environment |
| Processor | Process and analyze data |
| Connectivity | Send data to cloud/other devices |
| Actuators | Take physical actions |

### IoT Sensors

Common **IoT sensors** you can connect to a Pi:

| Sensor | Measures | Protocol |
|--------|----------|----------|
| DHT22 | Temperature + humidity | 1-Wire |
| BMP280 | Pressure + altitude | I2C |
| MQ-2 | Smoke/gas | Analog (needs ADC) |
| Soil moisture | Water content | Analog |
| Ultrasonic | Distance | GPIO |
| GPS | Location | UART |

### IoT Protocols

**IoT protocols** are how devices communicate:

| Protocol | Use Case | Pi Support |
|----------|----------|------------|
| MQTT | Lightweight messaging | Excellent |
| HTTP/REST | Web APIs | Excellent |
| CoAP | Constrained devices | Good |
| Bluetooth LE | Short-range, low power | Built-in |
| Zigbee/Z-Wave | Smart home devices | Via dongle |

## MQTT Protocol: The IoT Standard

**MQTT (Message Queuing Telemetry Transport)** is THE protocol for IoT. It's lightweight, efficient, and perfect for sensors!

### How MQTT Works

```
                    ┌─────────────┐
                    │   Broker    │
                    │ (Mosquitto) │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
     ┌────▼────┐     ┌────▼────┐     ┌────▼────┐
     │Publisher│     │Subscriber│    │ Both!   │
     │(Sensor) │     │(Display) │    │(Phone)  │
     └─────────┘     └──────────┘    └─────────┘
```

- **Publishers** send messages to topics
- **Subscribers** receive messages from topics
- **Broker** routes messages between them

### Setting Up MQTT

```sh
# Install Mosquitto broker
sudo apt install mosquitto mosquitto-clients

# Start the broker
sudo systemctl enable mosquitto
sudo systemctl start mosquitto

# Install Python MQTT library
pip3 install paho-mqtt
```

### MQTT Publisher (Sensor)

```python
#!/usr/bin/env python3
# mqtt-publisher.py - Publish sensor data

import paho.mqtt.client as mqtt
from gpiozero import CPUTemperature
import time
import json

# MQTT settings
BROKER = "localhost"  # Or your broker's IP
TOPIC = "home/livingroom/temperature"

# Connect to broker
client = mqtt.Client()
client.connect(BROKER, 1883, 60)
client.loop_start()

cpu = CPUTemperature()

print("Publishing temperature data...")
while True:
    data = {
        "temperature": round(cpu.temperature, 1),
        "unit": "celsius",
        "timestamp": time.time()
    }

    client.publish(TOPIC, json.dumps(data))
    print(f"Published: {data}")
    time.sleep(10)
```

### MQTT Subscriber (Display)

```python
#!/usr/bin/env python3
# mqtt-subscriber.py - Subscribe to sensor data

import paho.mqtt.client as mqtt
import json

BROKER = "localhost"
TOPIC = "home/+/temperature"  # + is wildcard for any room

def on_message(client, userdata, msg):
    data = json.loads(msg.payload.decode())
    print(f"[{msg.topic}] Temperature: {data['temperature']}°C")

client = mqtt.Client()
client.on_message = on_message
client.connect(BROKER, 1883, 60)
client.subscribe(TOPIC)

print("Listening for temperature data...")
client.loop_forever()
```

## Home Automation: Smart Living

**Home automation** uses technology to control home systems automatically. With a Raspberry Pi, you can build a **smart home hub** that rivals commercial products!

### What Can You Automate?

| System | Examples |
|--------|----------|
| Lighting | Turn on at sunset, motion-activated |
| Climate | Smart thermostat, fan control |
| Security | Cameras, door sensors, alerts |
| Entertainment | Voice-controlled media |
| Garden | Automated watering, soil monitoring |

### Home Monitoring

Central to any smart home is **monitoring**—knowing what's happening in real-time.

```python
#!/usr/bin/env python3
# home-monitor.py - Basic home monitoring system

from gpiozero import MotionSensor, Button
from gpiozero import CPUTemperature
import time
import json

# Sensors
pir_livingroom = MotionSensor(4)
door_sensor = Button(17, pull_up=True)  # Reed switch

def get_status():
    return {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "motion_detected": pir_livingroom.motion_detected,
        "door_open": not door_sensor.is_pressed,  # Reed switch logic
        "cpu_temp": round(CPUTemperature().temperature, 1)
    }

print("Home monitoring active. Ctrl+C to stop.")
while True:
    status = get_status()
    print(json.dumps(status, indent=2))
    time.sleep(5)
```

### Temperature Logging

**Temperature logging** tracks temperature over time for analysis:

```python
#!/usr/bin/env python3
# temp-logger.py - Log temperatures to CSV

import csv
import time
from datetime import datetime
from gpiozero import CPUTemperature

LOG_FILE = "temperature_log.csv"
INTERVAL = 60  # seconds

cpu = CPUTemperature()

# Create CSV with headers
with open(LOG_FILE, 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['timestamp', 'cpu_temp'])

print(f"Logging to {LOG_FILE} every {INTERVAL} seconds...")

while True:
    timestamp = datetime.now().isoformat()
    temp = round(cpu.temperature, 1)

    with open(LOG_FILE, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([timestamp, temp])

    print(f"{timestamp}: {temp}°C")
    time.sleep(INTERVAL)
```

### Security Cameras

Your Pi can be a **security camera** with motion-activated recording:

```python
#!/usr/bin/env python3
# security-cam.py - Motion-activated camera

from picamera2 import Picamera2
from gpiozero import MotionSensor
from datetime import datetime
import time

pir = MotionSensor(4)
camera = Picamera2()
camera.configure(camera.create_still_configuration())

def capture_image():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"motion_{timestamp}.jpg"
    camera.start()
    time.sleep(0.5)  # Let camera adjust
    camera.capture_file(filename)
    camera.stop()
    print(f"Captured: {filename}")

pir.when_motion = capture_image

print("Security camera armed. Ctrl+C to stop.")
from signal import pause
pause()
```

### Motion Detection

Beyond PIR sensors, you can do **software-based motion detection** using camera image analysis:

```sh
# Install motion detection software
sudo apt install motion

# Configure
sudo nano /etc/motion/motion.conf
```

Key settings in motion.conf:
```
daemon on
stream_localhost off
stream_port 8081
target_dir /home/pi/motion_captures
```

## Web Dashboard: Remote Visibility

A **web dashboard** gives you remote access to your home data. Flask makes this easy!

```python
#!/usr/bin/env python3
# dashboard.py - Simple web dashboard

from flask import Flask, render_template_string, jsonify
from gpiozero import CPUTemperature, LED
import time

app = Flask(__name__)
led = LED(17)
cpu = CPUTemperature()

DASHBOARD_HTML = """
<!DOCTYPE html>
<html>
<head>
    <title>Pi Dashboard</title>
    <meta http-equiv="refresh" content="5">
    <style>
        body { font-family: Arial; padding: 20px; background: #1a1a2e; color: white; }
        .card { background: #16213e; padding: 20px; border-radius: 10px; margin: 10px; display: inline-block; }
        .value { font-size: 3em; color: #4ecca3; }
        button { padding: 10px 20px; font-size: 1.2em; cursor: pointer; }
    </style>
</head>
<body>
    <h1>🏠 Raspberry Pi Dashboard</h1>
    <div class="card">
        <h2>CPU Temperature</h2>
        <div class="value">{{ temp }}°C</div>
    </div>
    <div class="card">
        <h2>LED Control</h2>
        <form action="/led/toggle" method="post">
            <button type="submit">Toggle LED</button>
        </form>
        <p>Status: {{ 'ON' if led_on else 'OFF' }}</p>
    </div>
    <div class="card">
        <h2>System Time</h2>
        <div class="value" style="font-size: 1.5em;">{{ time }}</div>
    </div>
</body>
</html>
"""

@app.route('/')
def dashboard():
    return render_template_string(DASHBOARD_HTML,
        temp=round(cpu.temperature, 1),
        led_on=led.is_lit,
        time=time.strftime("%H:%M:%S"))

@app.route('/led/toggle', methods=['POST'])
def toggle_led():
    led.toggle()
    return dashboard()

@app.route('/api/status')
def api_status():
    return jsonify({
        'cpu_temp': round(cpu.temperature, 1),
        'led_on': led.is_lit,
        'time': time.strftime("%H:%M:%S")
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

Access your dashboard at `http://your-pi-ip:5000`!

### Data Logging and Time Series

For serious **data logging**, consider a **time series database** like InfluxDB:

```sh
# Install InfluxDB
sudo apt install influxdb influxdb-client
sudo systemctl enable influxdb
sudo systemctl start influxdb

# Create database
influx -execute "CREATE DATABASE home_monitoring"
```

```python
#!/usr/bin/env python3
# influx-logger.py - Log to InfluxDB

from influxdb import InfluxDBClient
from gpiozero import CPUTemperature
import time

client = InfluxDBClient(host='localhost', database='home_monitoring')
cpu = CPUTemperature()

while True:
    data = [{
        "measurement": "temperature",
        "tags": {"location": "office", "sensor": "cpu"},
        "fields": {"value": cpu.temperature}
    }]

    client.write_points(data)
    print(f"Logged: {cpu.temperature}°C")
    time.sleep(60)
```

### Alerts and Notifications

**Alerts** tell you when something needs attention:

```python
#!/usr/bin/env python3
# alerts.py - Send notifications

import smtplib
from email.mime.text import MIMEText
from gpiozero import CPUTemperature
import time

def send_alert(subject, message):
    """Send email alert (configure with your SMTP settings)"""
    msg = MIMEText(message)
    msg['Subject'] = subject
    msg['From'] = 'pi@yourdomain.com'
    msg['To'] = 'you@email.com'

    # For Gmail, use app-specific password
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login('your_email', 'your_app_password')
        server.send_message(msg)

cpu = CPUTemperature()
TEMP_THRESHOLD = 70  # Celsius
alerted = False

while True:
    if cpu.temperature > TEMP_THRESHOLD and not alerted:
        send_alert(
            "🚨 Pi Temperature Alert!",
            f"CPU temperature is {cpu.temperature}°C - above threshold!"
        )
        alerted = True
        print("Alert sent!")
    elif cpu.temperature < TEMP_THRESHOLD - 5:
        alerted = False  # Reset when cooled down

    time.sleep(60)
```

## Home Assistant: Professional Smart Home

**Home Assistant** is the king of open-source home automation. It runs on Raspberry Pi and integrates with thousands of devices!

### Installing Home Assistant

```sh
# Using Docker (recommended)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Run Home Assistant
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -v /home/pi/homeassistant:/config \
  -v /run/dbus:/run/dbus:ro \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

Access at `http://your-pi-ip:8123`

### Home Assistant Features

| Feature | Description |
|---------|-------------|
| Integrations | 2000+ supported devices |
| Automations | If-this-then-that rules |
| Dashboards | Beautiful custom UIs |
| Voice control | Google/Alexa integration |
| Mobile app | iOS and Android |
| Add-ons | Node-RED, InfluxDB, Grafana |

## Node-RED: Visual Programming

**Node-RED** is a flow-based programming tool that lets you wire together IoT devices visually!

### Installing Node-RED

```sh
bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)

# Start on boot
sudo systemctl enable nodered

# Start now
sudo systemctl start nodered
```

Access at `http://your-pi-ip:1880`

### Node-RED Example Flow

In Node-RED, you connect "nodes" to create automation:

```
[Inject] → [GPIO In] → [Function] → [GPIO Out]
    (Timer)   (Read temp)  (Check >70°C)  (Turn on fan)
```

The visual interface makes complex automations approachable!

## IFTTT Integration: Connect Everything

**IFTTT (If This Then That)** connects your Pi to hundreds of web services:

- Post to Twitter when motion detected
- Log to Google Sheets when temperature changes
- Flash lights when you get an email
- Send notification when door opens

### Using IFTTT with Webhooks

```python
#!/usr/bin/env python3
# ifttt-trigger.py - Trigger IFTTT applet

import requests
from gpiozero import Button

IFTTT_KEY = "your_ifttt_webhook_key"
EVENT_NAME = "door_opened"

button = Button(17)  # Reed switch on door

def trigger_ifttt():
    url = f"https://maker.ifttt.com/trigger/{EVENT_NAME}/with/key/{IFTTT_KEY}"
    response = requests.post(url, json={"value1": "Front Door"})
    print(f"IFTTT triggered: {response.status_code}")

button.when_pressed = trigger_ifttt

print("Door monitor active...")
from signal import pause
pause()
```

## Voice Control: Speak and Be Heard

Add **voice control** to your projects with various options:

| Service | Pros | Cons |
|---------|------|------|
| Amazon Alexa | Huge ecosystem | Cloud-dependent, privacy |
| Google Assistant | Great understanding | Cloud-dependent, privacy |
| Mycroft | Open source, private | Less capable |
| Rhasspy | Fully offline | More setup required |

### Simple Voice Commands with Speech Recognition

```sh
pip3 install SpeechRecognition pyaudio
```

```python
#!/usr/bin/env python3
# voice-control.py - Basic voice commands

import speech_recognition as sr
from gpiozero import LED

led = LED(17)
recognizer = sr.Recognizer()

def listen_for_command():
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)

    try:
        command = recognizer.recognize_google(audio).lower()
        print(f"You said: {command}")
        return command
    except:
        return ""

while True:
    command = listen_for_command()

    if "light on" in command:
        led.on()
        print("Light turned ON")
    elif "light off" in command:
        led.off()
        print("Light turned OFF")
    elif "exit" in command or "quit" in command:
        break
```

## Automation Scripts: Putting It All Together

The final piece is **automation scripts** that combine sensors, actuators, and logic:

```python
#!/usr/bin/env python3
# smart-home.py - Complete automation example

from gpiozero import MotionSensor, LED, Button
from gpiozero import CPUTemperature
import paho.mqtt.client as mqtt
from datetime import datetime
import time
import json

# Hardware
pir = MotionSensor(4)
led = LED(17)
door = Button(18, pull_up=True)
cpu = CPUTemperature()

# MQTT
mqtt_client = mqtt.Client()
mqtt_client.connect("localhost", 1883, 60)
mqtt_client.loop_start()

# State
last_motion = None
door_was_open = False

def publish_status():
    status = {
        "timestamp": datetime.now().isoformat(),
        "motion": pir.motion_detected,
        "door_open": not door.is_pressed,
        "light_on": led.is_lit,
        "cpu_temp": round(cpu.temperature, 1)
    }
    mqtt_client.publish("home/status", json.dumps(status))
    return status

def handle_motion():
    global last_motion
    last_motion = datetime.now()

    # Turn on light if it's dark (you'd add a light sensor)
    led.on()
    print("Motion detected - light ON")
    publish_status()

def handle_motion_stop():
    # Keep light on for 5 minutes after motion stops
    # (In real code, you'd use a timer thread)
    pass

def handle_door():
    global door_was_open
    is_open = not door.is_pressed

    if is_open and not door_was_open:
        print("🚪 Door OPENED")
        # Could trigger alert, camera, etc.
    elif not is_open and door_was_open:
        print("🚪 Door CLOSED")

    door_was_open = is_open
    publish_status()

# Set up callbacks
pir.when_motion = handle_motion
pir.when_no_motion = handle_motion_stop
door.when_pressed = handle_door
door.when_released = handle_door

print("🏠 Smart Home System Active")
print("=" * 40)

# Main loop - periodic status updates
try:
    while True:
        status = publish_status()
        print(f"Status: {json.dumps(status)}")

        # Auto-off light if no motion for 5 minutes
        if last_motion and led.is_lit:
            if (datetime.now() - last_motion).seconds > 300:
                led.off()
                print("No motion for 5 min - light OFF")

        time.sleep(30)

except KeyboardInterrupt:
    print("\nShutting down...")
    led.off()
    mqtt_client.loop_stop()
```

## Review Questions

<details markdown="1">
<summary>What is PWM and why is it useful for LED brightness and motor speed control?</summary>

PWM (Pulse Width Modulation) rapidly switches a signal between HIGH and LOW states. The ratio of on-time to total time (duty cycle) controls the average power delivered. At 50% duty cycle, an LED appears half as bright and a motor runs at half speed. PWM is useful because GPIO pins can only output full on (3.3V) or full off (0V)—PWM creates the illusion of intermediate values by switching so fast that our eyes/motors perceive an average.
</details>

<details markdown="1">
<summary>Why must you use a motor driver instead of connecting motors directly to GPIO pins?</summary>

Motor drivers are required for two reasons: (1) Motors need more current than GPIO pins can safely provide—GPIO pins can supply only a few milliamps, while motors need hundreds of milliamps to amps. (2) Motors generate voltage spikes when starting/stopping that can damage the Pi. Motor drivers isolate the Pi from these high currents and spikes while allowing GPIO signals to control motor direction and speed.
</details>

<details markdown="1">
<summary>How does MQTT work, and why is it popular for IoT applications?</summary>

MQTT uses a publish/subscribe model with a central broker. Publishers send messages to named topics (like "home/temperature"), and subscribers receive messages from topics they're interested in. The broker routes messages between them. It's popular for IoT because: (1) It's extremely lightweight—ideal for low-power devices, (2) It handles unreliable networks gracefully with QoS levels, (3) The pub/sub model decouples senders from receivers, making systems flexible and scalable.
</details>

<details markdown="1">
<summary>What makes NeoPixel LEDs different from regular RGB LED strips?</summary>

NeoPixel (WS2812B) LEDs are individually addressable—each LED has its own tiny controller chip that receives color data. This means you can control every single LED independently with different colors, using only one data wire. Regular RGB strips are analog: all LEDs share the same control, so the entire strip shows one color. NeoPixels enable complex patterns, animations, and effects that would be impossible with analog strips.
</details>

<details markdown="1">
<summary>What is Thonny and why is it well-suited for GPIO and MicroPython programming?</summary>

Thonny is a beginner-friendly Python IDE that comes pre-installed on Raspberry Pi OS. It's well-suited for GPIO and MicroPython programming because: (1) It has a simple, uncluttered interface, (2) The built-in debugger lets you step through code line by line, (3) The variable inspector shows sensor values updating in real-time, (4) It can connect directly to MicroPython devices (Raspberry Pi Pico, ESP32), letting you write code on your Pi and run it on microcontrollers. This makes it perfect for learning and debugging hardware projects.
</details>

---

## Chapter Summary

Congratulations! You've just unlocked the ability to connect Linux to the physical world! Let's recap what you've learned:

**Hardware Basics:**
- GPIO pins for input (sensors, buttons) and output (LEDs, motors)
- Digital signals (HIGH/LOW) and PWM for analog-like control
- NeoPixel addressable LED strips for stunning light effects
- Motor control with proper drivers and external power

**IoT Fundamentals:**
- MQTT protocol for efficient device communication
- Sensors for temperature, motion, and light detection
- Web dashboards for remote monitoring
- Data logging with time series databases

**Home Automation:**
- Home Assistant for professional smart home control
- Node-RED for visual programming
- Voice control integration
- Automation scripts that tie everything together

**Development Tools:**
- Thonny IDE for Python and MicroPython
- gpiozero library for easy hardware control

Remember: The Raspberry Pi is just the beginning. With these skills, you can build robots, weather stations, security systems, smart gardens, and anything else you can imagine!

For more hands-on projects, check out:
- [Learning MicroPython](https://dmccreary.github.io/learning-micropython/) - Master MicroPython with Thonny
- [Moving Rainbow](https://dmccreary.github.io/moving-rainbow/) - LED strip projects for costumes and decorations
- [Clocks and Watches](https://dmccreary.github.io/clocks-and-watches/) - Build your own smart timepieces

Now go build something amazing! The world is waiting for your invention! 🔌🐧💡

## References

1. [GPIO Zero Documentation](https://gpiozero.readthedocs.io/) - Official Python library documentation for controlling Raspberry Pi GPIO pins with simple, intuitive commands.
2. [Learning MicroPython Textbook](https://dmccreary.github.io/learning-micropython/) - Free comprehensive guide to programming microcontrollers with Thonny and MicroPython.
3. [Moving Rainbow LED Projects](https://dmccreary.github.io/moving-rainbow/) - Complete guide to programming NeoPixel LED strips for costumes, decorations, and wearables.
4. [Thonny Python IDE](https://thonny.org/) - Official website for the beginner-friendly Python IDE with MicroPython support.
5. [Adafruit NeoPixel Guide](https://learn.adafruit.com/adafruit-neopixel-uberguide) - Comprehensive tutorial for NeoPixel LED strips including wiring, power, and programming.
6. [SparkFun PIR Motion Sensor Tutorial](https://learn.sparkfun.com/tutorials/pir-motion-sensor-hookup-guide) - How to wire and program PIR sensors for motion detection projects.
7. [Raspberry Pi GPIO Tutorial](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#gpio-and-the-40-pin-header) - Official GPIO documentation including pinout and electrical specifications.
8. [MQTT Protocol Overview](https://mqtt.org/) - Official MQTT website explaining the lightweight IoT messaging protocol.
9. [Eclipse Mosquitto MQTT Broker](https://mosquitto.org/) - Open-source MQTT broker documentation and installation guide.
10. [Home Assistant Documentation](https://www.home-assistant.io/docs/) - Complete guide to setting up and configuring the open-source smart home platform.
11. [Node-RED Getting Started](https://nodered.org/docs/getting-started/) - Flow-based programming tool for wiring together IoT devices visually.
12. [PWM Explained - SparkFun](https://learn.sparkfun.com/tutorials/pulse-width-modulation) - Understanding pulse width modulation for controlling LED brightness and motor speed.
13. [L298N Motor Driver Tutorial](https://www.instructables.com/L298N-Motor-Driver-Tutorial/) - How to wire and control DC motors safely with a motor driver.
14. [DS18B20 Temperature Sensor Guide](https://www.adafruit.com/product/381) - Wiring and programming the popular 1-Wire digital temperature sensor.
15. [MCP3008 ADC Tutorial](https://learn.adafruit.com/raspberry-pi-analog-to-digital-converters) - Using analog-to-digital converters to read analog sensors on Raspberry Pi.
16. [Flask Web Dashboard Tutorial](https://flask.palletsprojects.com/en/2.3.x/quickstart/) - Official Flask documentation for creating web applications and dashboards.
17. [InfluxDB Time Series Database](https://docs.influxdata.com/influxdb/) - Guide to using InfluxDB for storing and analyzing sensor data over time.
18. [GeeksforGeeks: Internet of Things](https://www.geeksforgeeks.org/introduction-to-internet-of-things-iot/) - Introduction to IoT concepts, protocols, and applications.
19. [IFTTT Webhooks Documentation](https://ifttt.com/maker_webhooks) - Connect your IoT projects to hundreds of web services with IFTTT automation.
20. [Raspberry Pi Servo Motor Tutorial](https://www.electronicshub.org/raspberry-pi-servo-motor-interface-tutorial/) - Controlling servo motors for robot arms, camera gimbals, and pan-tilt mechanisms.
