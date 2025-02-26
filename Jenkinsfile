pipeline {
    agent any
    
    tools {
        nodejs 'Node.js 20.9.0'
    }
    
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
                sh 'ls -la' // List files to see what was created
                sh 'pwd'    // Show current directory
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Check if build directory exists and what it contains
                    sh 'ls -la'
                    
                    // Determine the build directory (adjust if needed)
                    def buildDir = sh(script: 'find . -type d -name "build" -o -name "dist" -o -name "public" | head -1', returnStdout: true).trim()
                    
                    if (buildDir) {
                        echo "Found build directory: ${buildDir}"
                        
                        sshagent(['ec2-ssh-key-hotel']) {
                            // Create a tar file of the build
                            sh "tar -czf build.tar.gz -C ${buildDir} ."
                            
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
                    } else {
                        error "Build directory not found. Check your build process."
                    }
                }
            }
        }
    }
}