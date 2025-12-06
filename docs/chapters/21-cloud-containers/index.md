# Cloud Computing and Containers

## Summary

This chapter introduces modern cloud computing and containerization. You'll learn about cloud providers, virtual machines, and how to launch Linux instances in the cloud. Master Docker containers from building images to running multi-container applications with Docker Compose. Explore Terraform for infrastructure-as-code to automate cloud deployments.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Cloud Computing
2. Virtual Machines
3. Cloud Providers
4. AWS
5. Google Cloud
6. Microsoft Azure
7. Cloud Linux Instances
8. SSH to Cloud
9. Docker
10. Docker Images
11. Docker Containers
12. Docker Commands
13. Docker Run
14. Docker Build
15. Dockerfile
16. Docker Compose
17. Container Networking
18. Container Volumes
19. Terraform Basics
20. Infrastructure as Code
21. Terraform Providers
22. Terraform Resources
23. Cloud Deployment
24. Container Registry
25. Microservices
26. Cloud Security
27. Cost Management

## Prerequisites

This chapter builds on concepts from:

- [Chapter 15: Networking Fundamentals](../15-networking/index.md)
- [Chapter 16: SSH and Remote Access](../16-ssh-security/index.md)
- [Chapter 18: Storage Devices and System Performance](../18-storage-perf/index.md)

---

## Welcome to the Cloud! ☁️

Remember when you had to buy a computer to run software? Those days are fading fast. Today, you can spin up a powerful Linux server in the cloud in under a minute, use it for exactly as long as you need, and pay only for what you use. It's like renting a car instead of buying one—except these cars can be any size, from a bicycle to a rocket ship!

In this chapter, you'll learn:
- How cloud computing works and why it changed everything
- How to launch your own Linux servers in the cloud
- How to package applications in containers that run anywhere
- How to describe infrastructure as code (yes, you can version control your servers!)

> "There is no cloud—it's just someone else's computer."
> — Unknown (but technically true!)

That joke gets passed around a lot, but here's the thing: those "someone else's computers" are in massive data centers with better cooling, power, security, and reliability than you could ever afford. The cloud isn't just renting computers—it's accessing world-class infrastructure on demand.

## What is Cloud Computing?

**Cloud computing** is delivering computing services—servers, storage, databases, networking, software—over the internet ("the cloud"). Instead of buying and maintaining physical hardware, you rent what you need from a cloud provider.

### Types of Cloud Services

| Service Type | What You Get | You Manage | Provider Manages |
|--------------|--------------|------------|------------------|
| **IaaS** (Infrastructure) | Virtual machines, storage, networks | OS, apps, data | Hardware, virtualization |
| **PaaS** (Platform) | Runtime environment | Your code | Everything else |
| **SaaS** (Software) | Complete applications | Just configuration | Everything |

**Examples:**
- **IaaS:** AWS EC2, Google Compute Engine, Azure VMs
- **PaaS:** Heroku, Google App Engine, AWS Elastic Beanstalk
- **SaaS:** Gmail, Salesforce, Microsoft 365

For learning Linux, we'll focus on **IaaS**—spinning up actual Linux virtual machines in the cloud!

### Why Cloud Computing?

| Benefit | Description |
|---------|-------------|
| **Scalability** | Add or remove resources in minutes |
| **Cost Efficiency** | Pay only for what you use |
| **Reliability** | Data centers have redundancy built-in |
| **Global Reach** | Deploy in regions worldwide |
| **No Maintenance** | Someone else handles hardware failures |

!!! tip "Cloud Pun Time"
    Why did the developer break up with the cloud? Too many issues with commitment—they kept changing their instance! ☁️💔

## Virtual Machines: Computers Inside Computers

A **virtual machine (VM)** is a software-based computer running inside a physical computer. It has its own CPU, memory, storage, and network—all virtualized.

### How VMs Work

```
┌─────────────────────────────────────────────────┐
│              Physical Server                     │
│  ┌─────────────────────────────────────────────┐ │
│  │           Hypervisor (VMware, KVM)          │ │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐│ │
│  │  │   VM 1    │  │   VM 2    │  │   VM 3    ││ │
│  │  │  Ubuntu   │  │  CentOS   │  │  Debian   ││ │
│  │  │   Linux   │  │   Linux   │  │   Linux   ││ │
│  │  └───────────┘  └───────────┘  └───────────┘│ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

The **hypervisor** is software that creates and manages VMs, dividing physical resources among them.

### VM vs Physical Server vs Container

| Feature | Physical Server | Virtual Machine | Container |
|---------|----------------|-----------------|-----------|
| Boot time | Minutes | Seconds-Minutes | Milliseconds |
| Size | Huge (GB-TB) | Large (GB) | Small (MB) |
| Isolation | Complete | Strong | Process-level |
| OS overhead | None | Full OS per VM | Shared kernel |
| Portability | None | Limited | Excellent |

## Cloud Providers: The Big Three

### AWS (Amazon Web Services)

**AWS** is the largest cloud provider, offering 200+ services. It's the industry leader and what most companies use.

| AWS Service | What It Does |
|-------------|--------------|
| EC2 | Virtual machines |
| S3 | Object storage |
| RDS | Managed databases |
| Lambda | Serverless functions |
| EKS | Managed Kubernetes |

**Free Tier:** 750 hours/month of t2.micro (1 vCPU, 1GB RAM) for 12 months

### Google Cloud Platform (GCP)

**Google Cloud** offers excellent machine learning services and competitive pricing. It powers Google Search, YouTube, and Gmail.

| GCP Service | What It Does |
|-------------|--------------|
| Compute Engine | Virtual machines |
| Cloud Storage | Object storage |
| Cloud SQL | Managed databases |
| Cloud Functions | Serverless functions |
| GKE | Managed Kubernetes |

**Free Tier:** e2-micro instance free forever (limited regions)

### Microsoft Azure

**Azure** is popular in enterprise environments and integrates well with Microsoft products.

| Azure Service | What It Does |
|---------------|--------------|
| Virtual Machines | VMs |
| Blob Storage | Object storage |
| Azure SQL | Managed databases |
| Azure Functions | Serverless functions |
| AKS | Managed Kubernetes |

**Free Tier:** B1S VM free for 12 months

### Choosing a Cloud Provider

| Factor | AWS | GCP | Azure |
|--------|-----|-----|-------|
| Market share | Largest | Growing | Enterprise-focused |
| Learning resources | Abundant | Good | Good |
| Free tier | Generous | Forever free tier! | 12-month |
| Best for | Everything | ML/AI, Kubernetes | Microsoft shops |

For learning, **GCP's forever-free tier** is great for experiments, while **AWS** has the most job opportunities.

## Launching Cloud Linux Instances

Let's launch a Linux VM in the cloud! I'll show the concepts that apply to all providers.

### Step 1: Choose Your Linux Distribution

Cloud providers offer many Linux options:

| Distribution | Best For |
|--------------|----------|
| Ubuntu | General purpose, most tutorials |
| Amazon Linux | AWS-optimized |
| Debian | Stability |
| CentOS/Rocky | Enterprise/server |
| RHEL | Enterprise with support |

### Step 2: Choose Instance Size

| Size | vCPUs | RAM | Use Case |
|------|-------|-----|----------|
| Micro | 1 | 0.5-1GB | Learning, testing |
| Small | 1-2 | 2-4GB | Light workloads |
| Medium | 2-4 | 4-8GB | Web servers |
| Large | 4-8 | 16-32GB | Databases |
| X-Large | 8+ | 32GB+ | Heavy workloads |

!!! warning "Cost Alert!"
    Cloud resources cost money! A micro instance might be free, but larger instances can cost hundreds per month. Always check pricing and set budget alerts!

### Step 3: Configure Security

When launching an instance, you'll configure:

1. **SSH Key Pair:** Generate a key pair for secure login
2. **Security Group/Firewall:** Control which ports are open
3. **Network Settings:** VPC, subnet, public IP

### AWS CLI Example

```sh
# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure credentials
aws configure
# Enter your Access Key ID, Secret Access Key, region, output format

# Launch an EC2 instance
aws ec2 run-instances \
    --image-id ami-0c55b159cbfafe1f0 \
    --instance-type t2.micro \
    --key-name my-key-pair \
    --security-group-ids sg-xxxxxxxx \
    --subnet-id subnet-xxxxxxxx
```

### GCP CLI Example

```sh
# Install Google Cloud SDK
curl https://sdk.cloud.google.com | bash

# Initialize and login
gcloud init

# Create a VM
gcloud compute instances create my-linux-vm \
    --zone=us-central1-a \
    --machine-type=e2-micro \
    --image-family=ubuntu-2204-lts \
    --image-project=ubuntu-os-cloud
```

## SSH to Cloud: Connecting to Your Instance

Once your instance is running, connect via SSH:

```sh
# Standard SSH connection
ssh -i ~/.ssh/my-key.pem ubuntu@54.123.45.67

# With GCP, you can use:
gcloud compute ssh my-linux-vm --zone=us-central1-a

# With AWS, you can use EC2 Instance Connect or:
aws ec2-instance-connect send-ssh-public-key \
    --instance-id i-1234567890abcdef0 \
    --instance-os-user ubuntu \
    --ssh-public-key file://~/.ssh/id_rsa.pub
```

### SSH Config for Cloud Instances

Add your cloud instances to `~/.ssh/config` for easy access:

```
Host aws-webserver
    HostName 54.123.45.67
    User ubuntu
    IdentityFile ~/.ssh/aws-key.pem

Host gcp-database
    HostName 35.202.123.45
    User myuser
    IdentityFile ~/.ssh/gcp-key

Host azure-dev
    HostName 40.112.34.56
    User azureuser
    IdentityFile ~/.ssh/azure-key.pem
```

Now connect with just:
```sh
ssh aws-webserver
```

## Docker: Containerization Magic 🐳

**Docker** is the most popular containerization platform. It packages applications and their dependencies into portable containers that run anywhere.

### Why Docker?

The classic problem: "It works on my machine!"

Docker solves this by packaging everything an application needs:
- Application code
- Runtime (Python, Node.js, etc.)
- Libraries and dependencies
- Configuration files

The result? A container that runs identically on your laptop, your friend's laptop, a cloud server, or a Kubernetes cluster.

### Docker Architecture

```
┌─────────────────────────────────────────────────┐
│                  Your Computer                   │
│  ┌─────────────────────────────────────────────┐ │
│  │              Docker Engine                   │ │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐│ │
│  │  │Container 1│  │Container 2│  │Container 3││ │
│  │  │  nginx    │  │  python   │  │  postgres ││ │
│  │  └───────────┘  └───────────┘  └───────────┘│ │
│  │                                              │ │
│  │              Linux Kernel                    │ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Installing Docker

```sh
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add yourself to docker group (logout/login required)
sudo usermod -aG docker $USER

# Verify installation
docker --version
docker run hello-world
```

## Docker Images: The Blueprints

A **Docker image** is a read-only template used to create containers. Think of it as a snapshot of a filesystem with everything needed to run an application.

### Finding Images

**Docker Hub** (hub.docker.com) is the main registry for Docker images:

```sh
# Search for images
docker search nginx

# Pull an image
docker pull nginx:latest
docker pull python:3.11
docker pull postgres:15

# List local images
docker images
```

### Image Naming

```
registry/repository:tag

Examples:
nginx:latest           # Official nginx, latest version
nginx:1.25             # Specific version
python:3.11-slim       # Python 3.11, minimal image
mycompany/myapp:v1.0   # Custom image
gcr.io/project/app:v2  # Google Container Registry
```

!!! tip "Always Use Tags!"
    Never use `:latest` in production. Pin specific versions for reproducibility. `nginx:1.25.3` is better than `nginx:latest`.

## Docker Containers: Running Instances

A **Docker container** is a running instance of an image. You can run multiple containers from the same image.

### Container Lifecycle

```
Image → Create → Start → Running → Stop → Remove
                    ↑                  ↓
                    └──── Restart ─────┘
```

## Docker Commands: Your Container Toolkit

### Essential Commands

```sh
# Run a container
docker run nginx

# Run in background (detached)
docker run -d nginx

# Run with a name
docker run -d --name my-nginx nginx

# Run with port mapping
docker run -d -p 8080:80 nginx
# Access at http://localhost:8080

# Run with environment variables
docker run -d -e MYSQL_ROOT_PASSWORD=secret mysql

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# View container logs
docker logs my-nginx
docker logs -f my-nginx  # Follow (tail)

# Execute command in container
docker exec -it my-nginx bash

# Stop a container
docker stop my-nginx

# Start a stopped container
docker start my-nginx

# Remove a container
docker rm my-nginx

# Remove a running container (force)
docker rm -f my-nginx

# Remove all stopped containers
docker container prune
```

### Docker Run Options

| Option | Description |
|--------|-------------|
| `-d` | Run in background (detached) |
| `-p host:container` | Map ports |
| `-v host:container` | Mount volumes |
| `-e VAR=value` | Set environment variable |
| `--name` | Give container a name |
| `--rm` | Remove when stopped |
| `-it` | Interactive terminal |
| `--network` | Connect to network |

## Dockerfile: Building Custom Images

A **Dockerfile** is a text file with instructions to build a Docker image.

### Dockerfile Example

```dockerfile
# Base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first (for caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Set environment variable
ENV FLASK_APP=app.py

# Command to run
CMD ["flask", "run", "--host=0.0.0.0"]
```

### Dockerfile Instructions

| Instruction | Purpose |
|-------------|---------|
| `FROM` | Base image |
| `WORKDIR` | Set working directory |
| `COPY` | Copy files into image |
| `RUN` | Execute command during build |
| `EXPOSE` | Document which ports are used |
| `ENV` | Set environment variable |
| `CMD` | Default command to run |
| `ENTRYPOINT` | Main executable |
| `ARG` | Build-time variable |
| `VOLUME` | Create mount point |

## Docker Build: Creating Images

```sh
# Build image from Dockerfile in current directory
docker build -t myapp:v1 .

# Build with different Dockerfile
docker build -t myapp:v1 -f Dockerfile.prod .

# Build with build arguments
docker build --build-arg VERSION=1.0 -t myapp:v1 .

# View build history
docker history myapp:v1
```

### Multi-Stage Builds

Keep images small by using multi-stage builds:

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

This creates a tiny nginx image with just the built files, not the entire Node.js toolchain!

## Docker Compose: Multi-Container Applications

**Docker Compose** lets you define and run multi-container applications with a single YAML file.

### docker-compose.yml Example

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
    depends_on:
      - db
    volumes:
      - ./app:/app

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Docker Compose Commands

```sh
# Start all services
docker compose up

# Start in background
docker compose up -d

# View logs
docker compose logs
docker compose logs web

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v

# Rebuild images
docker compose build
docker compose up --build

# Scale a service
docker compose up -d --scale web=3

# Execute command in service
docker compose exec web bash
```

## Container Networking

Containers can communicate with each other through Docker networks.

### Network Types

| Type | Description |
|------|-------------|
| `bridge` | Default. Containers on same host can communicate |
| `host` | Container uses host's network directly |
| `none` | No networking |
| `overlay` | Multi-host networking (Swarm) |

### Creating and Using Networks

```sh
# Create a network
docker network create mynetwork

# Run container on network
docker run -d --network mynetwork --name web nginx
docker run -d --network mynetwork --name api python-app

# Now 'web' can reach 'api' by name!
# From web container: curl http://api:5000

# List networks
docker network ls

# Inspect network
docker network inspect mynetwork

# Connect running container to network
docker network connect mynetwork existing-container
```

## Container Volumes: Persistent Data

By default, container data is lost when the container is removed. **Volumes** provide persistent storage.

### Volume Types

| Type | Syntax | Best For |
|------|--------|----------|
| Named volume | `volume_name:/path` | Databases, persistent data |
| Bind mount | `./host/path:/container/path` | Development, config files |
| tmpfs | `tmpfs:/path` | Sensitive data, caches |

### Working with Volumes

```sh
# Create a named volume
docker volume create mydata

# Run with named volume
docker run -d -v mydata:/var/lib/mysql mysql

# Run with bind mount
docker run -d -v $(pwd)/html:/usr/share/nginx/html nginx

# List volumes
docker volume ls

# Inspect volume
docker volume inspect mydata

# Remove volume
docker volume rm mydata

# Remove unused volumes
docker volume prune
```

## Container Registry: Sharing Images

A **container registry** stores and distributes Docker images.

### Popular Registries

| Registry | URL | Notes |
|----------|-----|-------|
| Docker Hub | hub.docker.com | Default, public/private |
| GitHub Container Registry | ghcr.io | Integrated with GitHub |
| AWS ECR | ECR | AWS-native |
| Google Container Registry | gcr.io | GCP-native |
| Azure Container Registry | azurecr.io | Azure-native |

### Pushing to a Registry

```sh
# Login to Docker Hub
docker login

# Tag image for registry
docker tag myapp:v1 username/myapp:v1

# Push to registry
docker push username/myapp:v1

# Pull from registry (on another machine)
docker pull username/myapp:v1
```

## Microservices: Small, Focused Services

**Microservices** architecture breaks applications into small, independent services that communicate over networks.

### Monolith vs Microservices

| Aspect | Monolith | Microservices |
|--------|----------|---------------|
| Deployment | All at once | Independent |
| Scaling | Scale everything | Scale what you need |
| Technology | One stack | Mix and match |
| Complexity | Simpler to start | More complex infrastructure |
| Team size | Smaller teams | Larger, distributed teams |

### Example Microservices Architecture

```
┌─────────────────────────────────────────────────┐
│                   API Gateway                    │
└─────────────────────────────────────────────────┘
              │           │           │
     ┌────────┴───┐ ┌─────┴─────┐ ┌───┴────────┐
     │   Users    │ │  Products │ │   Orders   │
     │  Service   │ │  Service  │ │  Service   │
     └────────────┘ └───────────┘ └────────────┘
           │              │              │
     ┌─────┴────┐   ┌─────┴────┐   ┌─────┴────┐
     │ Users DB │   │Products  │   │Orders DB │
     │(Postgres)│   │DB (Mongo)│   │(Postgres)│
     └──────────┘   └──────────┘   └──────────┘
```

Each service:
- Has its own database
- Can be written in different languages
- Can be deployed independently
- Communicates via APIs (REST, gRPC)

## Terraform: Infrastructure as Code

**Terraform** by HashiCorp lets you define cloud infrastructure in code. Instead of clicking through web consoles, you write configuration files that describe what you want.

### Why Infrastructure as Code?

| Benefit | Description |
|---------|-------------|
| **Version Control** | Track changes in Git |
| **Reproducibility** | Same config = same infrastructure |
| **Documentation** | Code is documentation |
| **Automation** | No manual clicking |
| **Review** | Team can review infra changes |

### Installing Terraform

```sh
# Ubuntu/Debian
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# Verify
terraform --version
```

## Terraform Basics

Terraform uses HCL (HashiCorp Configuration Language).

### Basic Structure

```hcl
# main.tf

# Configure the provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Provider configuration
provider "aws" {
  region = "us-east-1"
}

# Define a resource
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "WebServer"
  }
}
```

### Terraform Workflow

```sh
# Initialize (download providers)
terraform init

# Preview changes
terraform plan

# Apply changes
terraform apply

# View current state
terraform show

# Destroy infrastructure
terraform destroy
```

## Terraform Providers

**Providers** are plugins that let Terraform interact with cloud platforms and services.

### Popular Providers

| Provider | Used For |
|----------|----------|
| aws | Amazon Web Services |
| google | Google Cloud Platform |
| azurerm | Microsoft Azure |
| kubernetes | Kubernetes clusters |
| docker | Docker containers |
| github | GitHub repositories |

### Provider Configuration

```hcl
# AWS Provider
provider "aws" {
  region = "us-west-2"
  # Credentials from environment or ~/.aws/credentials
}

# GCP Provider
provider "google" {
  project = "my-project-id"
  region  = "us-central1"
}

# Multiple providers
provider "aws" {
  alias  = "west"
  region = "us-west-2"
}

provider "aws" {
  alias  = "east"
  region = "us-east-1"
}
```

## Terraform Resources

**Resources** are the building blocks of your infrastructure.

### AWS Resources Example

```hcl
# VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "main-vpc"
  }
}

# Subnet
resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "public-subnet"
  }
}

# Security Group
resource "aws_security_group" "web" {
  name   = "web-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance
resource "aws_instance" "web" {
  ami                    = "ami-0c55b159cbfafe1f0"
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.web.id]

  tags = {
    Name = "web-server"
  }
}

# Output the public IP
output "web_public_ip" {
  value = aws_instance.web.public_ip
}
```

### Variables and Outputs

```hcl
# variables.tf
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "environment" {
  description = "Environment name"
  type        = string
}

# main.tf
resource "aws_instance" "web" {
  instance_type = var.instance_type

  tags = {
    Environment = var.environment
  }
}

# outputs.tf
output "instance_id" {
  value       = aws_instance.web.id
  description = "The instance ID"
}
```

```sh
# Apply with variables
terraform apply -var="environment=production"

# Or use a .tfvars file
# terraform.tfvars
# environment = "production"
# instance_type = "t2.small"
```

## Cloud Deployment: Putting It Together

Let's deploy a containerized application to the cloud!

### Complete Terraform + Docker Deployment

```hcl
# main.tf - Deploy Docker container to AWS ECS

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "my-cluster"
}

# Task Definition
resource "aws_ecs_task_definition" "app" {
  family                   = "my-app"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name  = "my-app"
      image = "nginx:latest"
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])
}

# ECS Service
resource "aws_ecs_service" "app" {
  name            = "my-app-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_subnet.public.id]
    security_groups = [aws_security_group.web.id]
    assign_public_ip = true
  }
}
```

## Cloud Security: Protecting Your Resources

Security in the cloud is a shared responsibility:
- **Provider:** Physical security, infrastructure
- **You:** Configuration, access control, data

### Security Best Practices

| Practice | Description |
|----------|-------------|
| **Least Privilege** | Only grant permissions needed |
| **MFA** | Enable multi-factor authentication |
| **Encryption** | Encrypt data at rest and in transit |
| **Logging** | Enable CloudTrail/audit logs |
| **Updates** | Keep systems patched |
| **Secrets** | Use secrets managers, not env vars |

### IAM Best Practices

```hcl
# Least privilege IAM policy
resource "aws_iam_policy" "s3_read_only" {
  name = "s3-read-only"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:ListBucket"
        ]
        Resource = [
          "arn:aws:s3:::my-bucket",
          "arn:aws:s3:::my-bucket/*"
        ]
      }
    ]
  })
}
```

### Never Commit Secrets!

```sh
# Add to .gitignore
*.tfvars
*.pem
.env
credentials.json
```

Use environment variables or secrets managers:
```sh
export AWS_ACCESS_KEY_ID="your-key"
export AWS_SECRET_ACCESS_KEY="your-secret"
```

## Cost Management: Don't Go Broke!

Cloud costs can spiral out of control. Here's how to stay on budget:

### Cost Control Strategies

| Strategy | Description |
|----------|-------------|
| **Right-size** | Use appropriate instance sizes |
| **Spot instances** | Up to 90% off for interruptible workloads |
| **Reserved instances** | 30-72% off for committed usage |
| **Auto-scaling** | Scale down during low usage |
| **Cleanup** | Delete unused resources |

### Budget Alerts

Set up billing alerts before you start:

```sh
# AWS CLI - Create budget alert
aws budgets create-budget \
    --account-id 123456789012 \
    --budget '{
        "BudgetName": "Monthly-Budget",
        "BudgetLimit": {"Amount": "50", "Unit": "USD"},
        "TimeUnit": "MONTHLY",
        "BudgetType": "COST"
    }' \
    --notifications-with-subscribers '[{
        "Notification": {
            "NotificationType": "ACTUAL",
            "ComparisonOperator": "GREATER_THAN",
            "Threshold": 80
        },
        "Subscribers": [{
            "SubscriptionType": "EMAIL",
            "Address": "you@email.com"
        }]
    }]'
```

### Terraform Cost Estimation

```sh
# Install Infracost for cost estimates
curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh

# Estimate costs before applying
infracost breakdown --path .
```

!!! warning "Cloud Cost Horror Stories"
    Students have accidentally run expensive instances for months. **Always set budget alerts** and **clean up resources** when done learning!

## Review Questions

<details markdown="1">
<summary>What is the difference between a virtual machine and a container?</summary>

Virtual machines run a complete operating system on virtualized hardware, including their own kernel. Each VM requires its own OS installation, which takes gigabytes of space and seconds to minutes to boot. Containers share the host's kernel and only package the application and its dependencies, making them much smaller (megabytes) and faster to start (milliseconds). VMs provide stronger isolation but more overhead; containers are more efficient but share more with the host.
</details>

<details markdown="1">
<summary>What is the purpose of a Dockerfile, and what are the key instructions?</summary>

A Dockerfile is a text file containing instructions to build a Docker image. Key instructions include: FROM (base image), WORKDIR (set working directory), COPY (copy files into image), RUN (execute commands during build), EXPOSE (document ports), ENV (set environment variables), and CMD (default command to run). The Dockerfile creates a reproducible, versioned way to package applications.
</details>

<details markdown="1">
<summary>How does Docker Compose simplify running multi-container applications?</summary>

Docker Compose uses a YAML file (docker-compose.yml) to define multiple services, networks, and volumes in one place. Instead of running multiple `docker run` commands with complex options, you run `docker compose up` to start everything. Compose handles container ordering (depends_on), networking (containers can reach each other by service name), shared volumes, and consistent configuration. This makes development environments reproducible and simplifies local testing of microservices.
</details>

<details markdown="1">
<summary>What is Infrastructure as Code, and why is Terraform useful for cloud deployments?</summary>

Infrastructure as Code (IaC) means defining your infrastructure (servers, networks, databases) in configuration files rather than manually creating them through web consoles. Terraform is useful because: (1) configurations can be version-controlled in Git, (2) the same config always creates the same infrastructure (reproducibility), (3) changes can be reviewed before applying, (4) infrastructure can be created, updated, and destroyed with simple commands, and (5) it works across multiple cloud providers with the same language.
</details>

<details markdown="1">
<summary>What are container volumes, and why are they necessary for databases?</summary>

Container volumes provide persistent storage that survives container restarts and removal. By default, all data inside a container is lost when the container is deleted. Databases need volumes because they store data that must persist—without a volume, all your database records would be lost every time you restart the container. Volumes can be named (managed by Docker) or bind mounts (mapped to host directories).
</details>

---

## Chapter Summary

You've just leveled up from running Linux on single machines to orchestrating infrastructure across the globe! Let's recap:

**Cloud Computing:**
- IaaS gives you virtual machines on demand
- AWS, GCP, and Azure are the major providers
- You can SSH into cloud instances just like local machines

**Docker Containers:**
- Package applications with all dependencies
- Images are blueprints, containers are running instances
- Dockerfile defines how to build images
- Docker Compose manages multi-container apps

**Infrastructure as Code:**
- Terraform describes infrastructure in configuration files
- Providers connect to cloud platforms
- Resources are the building blocks you create
- Version control your infrastructure!

**Key Skills:**
- Launching cloud Linux instances
- Building and running Docker containers
- Writing Dockerfiles and docker-compose.yml
- Writing Terraform configurations
- Managing cloud costs and security

The cloud and containers are where modern software lives. These skills are essential for DevOps, site reliability engineering, and backend development. You're now ready to deploy applications that can scale to millions of users!

Keep experimenting—but always set those budget alerts! ☁️🐳🚀
