pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        S3_BUCKET = 'web-arti'
        ARTIFACT_NAME = 'site.zip'
        DEPLOY_TAG = 'release-latest'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/GoutamTx/Project.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Zip HTML Files') {
            steps {
                sh "zip -r ${ARTIFACT_NAME} ./*  || true"
            }
        }

        stage('Upload to S3') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
                    sh "aws s3 cp ${ARTIFACT_NAME} s3://${S3_BUCKET}/${DEPLOY_TAG}/${ARTIFACT_NAME} --region ${AWS_REGION}"
                }
            }
        }

        stage('Trigger EC2 Refresh') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
                    sh """
                    aws autoscaling start-instance-refresh \\
                        --auto-scaling-group-name asg-react \\
                        --strategy Rolling \\
                        --region ${AWS_REGION}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ HTML site deployed successfully!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
