pipeline {
    agent any

    environment {
        ARTIFACT_NAME = 'site.zip'
        BUILD_DIR = 'build'
        JFROG_URL = 'https://trialmewlv1.jfrog.io'
        JFROG_REPO = 'generic-local'
        JFROG_TARGET_PATH = 'release-latest/'
    }

    tools {
        nodejs 'node18'          // Replace with your configured Node.js version label
        jfrog 'jfrog-cli'        // Make sure JFrog CLI tool is configured in Jenkins
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

        stage('Zip Artifact') {
            steps {
                sh "zip -r ${ARTIFACT_NAME} ${BUILD_DIR}/"
            }
        }

        stage('Upload to JFrog') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'jfrog-creds', usernameVariable: 'JFROG_USER', passwordVariable: 'JFROG_PASS')]) {
                    sh '''
                        jfrog rt config --url ${JFROG_URL} --user $JFROG_USER --password $JFROG_PASS --interactive=false
                        jfrog rt upload "${ARTIFACT_NAME}" "${JFROG_REPO}/${JFROG_TARGET_PATH}"
                    '''
                }
            }
        }

        stage('Publish Build Info') {
            steps {
                sh '''
                    jfrog rt build-collect-env
                    jfrog rt build-publish
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Build and upload to JFrog Artifactory successful!"
        }
        failure {
            echo "❌ Build or upload failed!"
        }
    }
}
