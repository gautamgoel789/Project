pipeline {
    agent any

    environment {
        ARTIFACT_NAME = 'site.zip'
        BUILD_DIR = 'build'
        JFROG_URL = 'https://trialmewlv1.jfrog.io'
        JFROG_REPO = 'generic-local'
        JFROG_TARGET_PATH = 'release-latest/'
        BUILD_NAME = 'react-website'
        BUILD_NUMBER = "${BUILD_NUMBER}"
         IMAGE_NAME = 'gautam789/project'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds-id')
        
    }

   

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/gautamgoel789/Project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $IMAGE_NAME .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $IMAGE_NAME'
            }
        }
        stage('Run Docker Container') {
            steps {
                sh '''
                    docker stop dazzling_chaum
                   docker rm dazzling_chaum
                  docker run -d --name dazzling_chaum -p 80:80 gautam789/project

                '''
            }
        }
    }
    

    post {
        always {
            sh 'docker logout'
        }
    }
}
