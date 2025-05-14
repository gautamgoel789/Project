pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        
        ARTIFACT_NAME = 'site.zip'
        DEPLOY_TAG = 'release-latest'
        ARTIFACTORY_SERVER = 'MyArtifactory' // Defined in Jenkins > Artifactory configuration
        ARTIFACTORY_REPO = 'generic-local'   // Target JFrog repository
    }

    tools {
        jfrog 'jfrog-cli'
        nodejs 'node18' // Must match your Jenkins tool name
    }

    stages {
        stage('Clone Repository') {
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

        stage('Zip Build Folder') {
            steps {
                sh "zip -r ${ARTIFACT_NAME} build"
            }
        }

      

        stage('Upload to JFrog Artifactory') {
            steps {
                script {
                    def server = Artifactory.server(ARTIFACTORY_SERVER)

                    def uploadSpec = """{
                        "files": [{
                            "pattern": "${ARTIFACT_NAME}",
                            "target": "${ARTIFACTORY_REPO}/${DEPLOY_TAG}/"
                        }]
                    }"""

                    server.upload(uploadSpec)
                }
            }
        }

        
    }

    post {
        success {
            echo "✅ Site deployed and artifact uploaded successfully!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}
