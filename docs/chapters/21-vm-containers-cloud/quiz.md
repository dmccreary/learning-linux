# Quiz: Cloud Computing and Containers

Test your understanding of Docker, containers, and cloud concepts.

---

#### 1. What is a container in computing?

<div class="upper-alpha" markdown>
1. A type of hard drive
2. A lightweight, isolated environment for running applications
3. A network protocol
4. A backup system
</div>

??? question "Show Answer"
    The correct answer is **B**. A container is a lightweight, isolated environment that packages an application with its dependencies. Unlike VMs, containers share the host OS kernel, making them fast to start and efficient with resources.

    **Concept Tested:** Containers

    **See:** [Chapter 21 - What are Containers](index.md)

---

#### 2. What is Docker?

<div class="upper-alpha" markdown>
1. A web browser
2. A platform for building and running containers
3. A programming language
4. A cloud provider
</div>

??? question "Show Answer"
    The correct answer is **B**. Docker is the most popular platform for creating, deploying, and managing containers. It includes tools for building container images, running containers, and sharing them through registries like Docker Hub.

    **Concept Tested:** Docker

    **See:** [Chapter 21 - Docker](index.md)

---

#### 3. What is a Docker image?

<div class="upper-alpha" markdown>
1. A photograph of a container
2. A read-only template used to create containers
3. A backup of your system
4. A virtual machine snapshot
</div>

??? question "Show Answer"
    The correct answer is **B**. A Docker image is a read-only template containing everything needed to run an application: code, runtime, libraries, and configuration. Containers are running instances of images.

    **Concept Tested:** Docker Images

    **See:** [Chapter 21 - Docker Images](index.md)

---

#### 4. What is the difference between a container and a virtual machine?

<div class="upper-alpha" markdown>
1. They're identical
2. Containers share the host OS kernel; VMs have their own OS
3. VMs are faster to start
4. Containers use more disk space
</div>

??? question "Show Answer"
    The correct answer is **B**. VMs virtualize hardware and run a complete guest OS, making them heavier. Containers share the host kernel and only package the application and dependencies, making them lightweight and fast.

    **Concept Tested:** Containers vs VMs

    **See:** [Chapter 21 - Containers vs VMs](index.md)

---

#### 5. What command runs a Docker container?

<div class="upper-alpha" markdown>
1. docker start
2. docker run
3. docker exec
4. docker create
</div>

??? question "Show Answer"
    The correct answer is **B**. `docker run` creates and starts a container from an image. For example, `docker run -d nginx` runs an nginx web server container in detached mode.

    **Concept Tested:** Docker Commands

    **See:** [Chapter 21 - Docker Run](index.md)

---

#### 6. What is Docker Hub?

<div class="upper-alpha" markdown>
1. A USB hub for Docker
2. A public registry for sharing Docker images
3. A network switch
4. A development environment
</div>

??? question "Show Answer"
    The correct answer is **B**. Docker Hub is a cloud-based registry where you can find, share, and store Docker images. It hosts official images for popular software like nginx, MySQL, and Python.

    **Concept Tested:** Docker Hub

    **See:** [Chapter 21 - Docker Hub](index.md)

---

#### 7. What is a Dockerfile?

<div class="upper-alpha" markdown>
1. A container log file
2. A text file with instructions for building a Docker image
3. Docker's configuration file
4. A list of running containers
</div>

??? question "Show Answer"
    The correct answer is **B**. A Dockerfile is a text file containing step-by-step instructions for building a Docker image. It specifies the base image, files to copy, commands to run, and how to start the application.

    **Concept Tested:** Dockerfile

    **See:** [Chapter 21 - Dockerfile](index.md)

---

#### 8. What is Kubernetes (K8s)?

<div class="upper-alpha" markdown>
1. A Docker alternative
2. A container orchestration platform for managing containerized applications at scale
3. A cloud provider
4. A programming language
</div>

??? question "Show Answer"
    The correct answer is **B**. Kubernetes (often abbreviated K8s) is a container orchestration platform that automates deployment, scaling, and management of containerized applications across clusters of machines.

    **Concept Tested:** Kubernetes

    **See:** [Chapter 21 - Kubernetes](index.md)

---

#### 9. What is the cloud in "cloud computing"?

<div class="upper-alpha" markdown>
1. Weather-related computing
2. Remote servers accessed over the internet
3. Wireless networks
4. Fog computing
</div>

??? question "Show Answer"
    The correct answer is **B**. Cloud computing refers to computing services (servers, storage, databases, networking) delivered over the internet. Instead of owning hardware, you rent resources from providers like AWS, Google Cloud, or Azure.

    **Concept Tested:** Cloud Computing

    **See:** [Chapter 21 - Cloud Computing](index.md)

---

#### 10. What is Terraform used for?

<div class="upper-alpha" markdown>
1. Creating virtual planets
2. Infrastructure as Code - managing cloud resources with configuration files
3. Testing web applications
4. Monitoring server performance
</div>

??? question "Show Answer"
    The correct answer is **B**. Terraform is an Infrastructure as Code (IaC) tool that lets you define and provision cloud infrastructure using configuration files. You can version control your infrastructure and recreate it reliably.

    **Concept Tested:** Terraform

    **See:** [Chapter 21 - Terraform](index.md)
