resource "aws_db_instance" "main" {
  identifier              = "ecom-db"
  engine                  = "mysql"
  engine_version          = "8.0"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  db_name                 = "shopease"
  username                = "admin"
  password                = "YourStrongPassword123!"
  db_subnet_group_name    = aws_db_subnet_group.main.name
  vpc_security_group_ids  = [aws_security_group.rds.id]
  skip_final_snapshot     = true
  publicly_accessible     = true
}

output "rds_endpoint" {
  value = aws_db_instance.main.address
}
