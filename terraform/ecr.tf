resource "aws_ecr_repository" "backend" {
  name                 = "ecom-backend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

resource "aws_ecr_repository" "frontend" {
  name                 = "ecom-frontend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

output "backend_repo_url" {
  value = aws_ecr_repository.backend.repository_url
}

output "frontend_repo_url" {
  value = aws_ecr_repository.frontend.repository_url
}
