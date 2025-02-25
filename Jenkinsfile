pipeline {
    agent any

    tools {
        nodejs 'Node.js 20'
    }

    parameters {
        choice(name: 'DEPLOY_ENV', choices: ['staging', 'production'], description: 'Select deployment environment')
        string(name: 'FRONTEND_PORT', defaultValue: '5173', description: 'Port for the frontend application to run on EC2')
    }

    environment {
        AWS_CREDENTIALS = credentials('aws-credentials-hotel')
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_IMAGE = "jathurt/myapp-frontend-hotel"
        EC2_HOST = credentials('ec2-host-hotel')
        EC2_USER = 'ubuntu'
        DEPLOY_ENV = "${params.DEPLOY_ENV ?: 'staging'}"
        FRONTEND_PORT = "${params.FRONTEND_PORT}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Prepare .env File') {
            steps {
                script {
                    sh '''
                        # Create .env file with secure permissions
                        touch .env && chmod 600 .env

                        cat > .env << EOL
FRONTEND_PORT=${FRONTEND_PORT}
VITE_API_URL=http://backend:8081
VITE_APP_ENV=${DEPLOY_ENV}
EOL

                        # Verify file was created successfully
                        if [ ! -f .env ]; then
                            echo "Failed to create .env file"
                            exit 1
                        fi
                    '''
                }
            }
        }

        stage('Update Docker Compose Network') {
            steps {
                script {
                    sh '''
                        # Ensure the docker-compose file connects to the backend network
                        if grep -q "myapp-network-hotel" docker-compose.yml; then
                            echo "Network configuration already exists in docker-compose.yml"
                        else
                            echo "Adding network configuration to docker-compose.yml"
                            # Create a backup of the original file
                            cp docker-compose.yml docker-compose.yml.bak
                            
                            # Add network configuration if not present
                            if grep -q "networks:" docker-compose.yml; then
                                # Networks section exists, add our network
                                sed -i '/networks:/a\\  myapp-network-hotel:\\n    external: true' docker-compose.yml
                            else
                                # No networks section, add it at the end
                                cat >> docker-compose.yml << EOL

networks:
  myapp-network-hotel:
    external: true
EOL
                            fi
                            
                            # Add network to frontend service
                            if grep -q "frontend:" docker-compose.yml; then
                                sed -i '/frontend:/,/^[^ ]/{/networks:/d}' docker-compose.yml
                                sed -i '/frontend:/a\\    networks:\\n      - myapp-network-hotel' docker-compose.yml
                            fi
                        fi
                        
                        # Verify changes
                        cat docker-compose.yml
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
                    sh "docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'
                sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                sh "docker push ${DOCKER_IMAGE}:latest"
            }
        }

        stage('Deploy to EC2') {
            steps {
                withEnv([
                    "REMOTE_USER=${EC2_USER}",
                    "REMOTE_HOST=${EC2_HOST}",
                    "DOCKER_USERNAME=${DOCKER_CREDENTIALS_USR}",
                    "DOCKER_PASSWORD=${DOCKER_CREDENTIALS_PSW}"
                ]) {
                    sshagent(['ec2-ssh-key-hotel']) {
                        sh '''
                            # Create deployment directory
                            echo "Creating deployment directory..."
                            ssh -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST "mkdir -p ~/frontend-deployment"

                            # Copy deployment files
                            echo "Copying deployment files..."
                            scp -o StrictHostKeyChecking=no docker-compose.yml .env $REMOTE_USER@$REMOTE_HOST:~/frontend-deployment/

                            # Execute deployment commands
                            echo "Starting deployment..."
                            ssh -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST bash << 'EOF'
                                cd ~/frontend-deployment

                                # Ensure Docker permissions are correct
                                sudo usermod -aG docker ubuntu

                                # Docker login
                                echo "$DOCKER_PASSWORD" | sudo docker login --username "$DOCKER_USERNAME" --password-stdin

                                # Stop existing frontend container
                                sudo docker-compose down || true

                                # Clean up old frontend resources
                                sudo docker rm -f myapp-frontend-hotel 2>/dev/null || true

                                # Pull latest images
                                sudo docker-compose pull || true

                                # Start containers
                                sudo docker-compose up -d

                                # Check container status
                                if ! sudo docker-compose ps | grep -q "Up"; then
                                    echo "Frontend container failed to start properly"
                                    sudo docker-compose logs
                                    exit 1
                                fi

                                # Print container status
                                echo "Container status:"
                                sudo docker-compose ps
                                echo "Frontend deployment completed successfully!"
EOF
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Clean up Docker resources
                sh 'docker logout || true'
                sh 'docker system prune -f || true'

                // Remove sensitive files
                sh '''
                    rm -f .env
                '''

                cleanWs()
            }
        }
        success {
            echo "Successfully deployed frontend to ${DEPLOY_ENV} environment at ${EC2_HOST}"
        }
        failure {
            echo "Frontend deployment to ${DEPLOY_ENV} failed"
        }
    }
}