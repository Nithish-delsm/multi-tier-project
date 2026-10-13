# multi-tier-project
# 🛒 ShopEase — Multi-Tier E-Commerce Application on AWS

A full-stack e-commerce application built to demonstrate multi-tier cloud architecture on AWS, using Infrastructure as Code, containerization, and Kubernetes orchestration.

## 🚀 Project Overview

ShopEase is split into three independent tiers:

- **Frontend:** React + Vite — product browsing, cart, authentication, checkout
- **Backend:** Node.js + Express REST API — JWT auth, transactional order processing
- **Database:** MySQL (Amazon RDS)

### ☁️ AWS Services Used

- **Amazon EKS** — Kubernetes cluster running the application
- **Amazon ECR** — Docker image registry
- **Amazon RDS** — Managed MySQL database
- **Amazon VPC** — Custom networking (public/private subnets, routing)
- **AWS IAM** — Roles and permissions for EKS cluster and nodes
- **Elastic Load Balancer** — Exposes frontend and backend services
- **Terraform** — Infrastructure as Code for all of the above
- **Docker** — Containerization for both frontend and backend
- **GitHub Actions** — CI pipeline (build and push images to ECR)

## 🏗️ Architecture

\`\`\`
                     GitHub Repository
                            │
                    GitHub Actions (CI)
                            │
                 Build & Push Docker Images
                            │
                      Amazon ECR
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
   kubectl apply                       kubectl apply
          │                                   │
          ▼                                   ▼
   Frontend Deployment                Backend Deployment
   (React + nginx)                    (Node.js + Express)
          │                                   │
   LoadBalancer Service               LoadBalancer Service
          │                                   │
     Public Internet                   Amazon RDS (MySQL)
                                        (private subnet)

All running on: Amazon EKS (Kubernetes)
Networking: Custom VPC via Terraform
\`\`\`

## ✨ Features

### Frontend
- Product browsing with live data from the API
- User registration and login (JWT-based)
- Shopping cart with quantity management
- Checkout with order confirmation

### Backend
- RESTful API (products, categories, cart, orders, auth)
- Password hashing with bcrypt
- JWT authentication middleware
- Transactional order processing (stock checks, atomic order creation)

### Infrastructure
- Fully defined in Terraform: VPC, subnets, route tables, RDS, ECR, EKS cluster, IAM roles, node groups
- Containerized with multi-stage Docker builds
- Deployed to Kubernetes with Deployment + Service manifests
- CI pipeline builds and pushes images on every push to main

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Axios |
| Backend | Node.js, Express, JWT, bcrypt |
| Database | MySQL 8 (Amazon RDS) |
| Containers | Docker (multi-stage builds) |
| Orchestration | Kubernetes (Amazon EKS) |
| IaC | Terraform |
| CI/CD | GitHub Actions |
| Registry | Amazon ECR |

## 📁 Project Structure

\`\`\`
multi-tier-project/
├── .github/workflows/     # CI/CD pipeline
├── backend/                # Express API
│   └── src/
│       ├── routes/        # auth, cart, orders
│       ├── middleware/    # JWT verification
│       └── config/        # DB connection pool
├── frontend/               # React app
│   └── src/
│       ├── pages/         # Products, Cart, Login
│       └── api/           # Axios client
├── database/
│   ├── schema.sql
│   └── seed.sql
├── k8s/
│   ├── backend-deployment.yaml
│   └── frontend-deployment.yaml
└── terraform/
    ├── provider.tf
    ├── vpc.tf
    ├── rds.tf
    ├── rds-sg.tf
    ├── ecr.tf
    └── eks.tf
\`\`\`

## ⚙️ Local Setup

### Backend
\`\`\`bash
cd backend
npm install
# create a .env file with DB and JWT config
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### Database
\`\`\`bash
mysql -u root -p -e "CREATE DATABASE shopease;"
mysql -u root -p shopease < database/schema.sql
mysql -u root -p shopease < database/seed.sql
\`\`\`

## ☁️ Deploying to AWS

\`\`\`bash
# 1. Provision infrastructure
cd terraform
terraform init
terraform apply

# 2. Build and push images
docker build -t ecom-backend ./backend
docker build -t ecom-frontend ./frontend
# tag and push to ECR (see terraform output for repo URLs)

# 3. Deploy to EKS
aws eks update-kubeconfig --name ecom-cluster --region us-east-1
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
\`\`\`

## 🧠 Key Learnings

- Multi-tier application architecture and separation of concerns
- Infrastructure as Code with Terraform
- Container orchestration with Kubernetes on EKS
- VPC networking: subnets, route tables, security groups, NACLs
- Debugging real AWS networking issues (DNS propagation, routing)
- CI/CD pipeline design with GitHub Actions
- Cost-conscious cloud practices (provision → test → destroy)

## 📝 Note

This project's live AWS infrastructure is provisioned on-demand and torn down after testing to avoid ongoing costs — a deliberate practice for learning projects. The Terraform configuration can fully reproduce the deployment at any time.

## 👨‍💻 Author

Built as a hands-on learning project to understand multi-tier architecture, containerization, and AWS cloud infrastructure.


