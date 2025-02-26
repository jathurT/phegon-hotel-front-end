pipeline {
    agent any
    
    environment {
        EC2_USER = 'ubuntu'
        EC2_HOST = credentials('ec2-host-hotel')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            steps {
                sshagent(['ec2-ssh-key-hotel']) {
                    // Create a tar file of the build
                    sh 'tar -czf build.tar.gz -C build .'
                    
                    // Copy it to the EC2 instance
                    sh "scp -o StrictHostKeyChecking=no build.tar.gz ${EC2_USER}@${EC2_HOST}:/tmp/"
                    
                    // Extract and deploy on EC2
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                            sudo rm -rf /var/www/your-frontend-app/*
                            tar -xzf /tmp/build.tar.gz -C /var/www/your-frontend-app/
                            rm /tmp/build.tar.gz
                            sudo systemctl reload nginx
                        '
                    """
                }
            }
        }
    }
}