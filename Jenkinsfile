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
    }

    tools {
        nodejs 'node18'
        jfrog 'jfrog-cli'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/gautamgoel789/Project.git'
            }
        }

    //     stage('Install Dependencies') {
    //         steps {
    //             sh 'npm install'
    //         }
    //     }

    //     stage('Build React App') {
    //         steps {
    //             sh 'npm run build'
    //         }
    //     }

    //     stage('Zip Artifact') {
    //         steps {
    //             sh "zip -r ${ARTIFACT_NAME} ${BUILD_DIR}/"
    //         }
    //     }

    //     stage('Upload to JFrog') {
    //         steps {
    //             withCredentials([usernamePassword(credentialsId: 'JF_ACCESS_TOKEN', usernameVariable: 'JFROG_USER', passwordVariable: 'JFROG_PASS')]) {
    //                 sh '''
    //                     jfrog rt config my-jfrog --url ${JFROG_URL} --user $JFROG_USER --password $JFROG_PASS --interactive=false
    //                     jfrog rt upload --server-id=my-jfrog --build-name=${BUILD_NAME} --build-number=${BUILD_NUMBER} "${ARTIFACT_NAME}" "${JFROG_REPO}/${JFROG_TARGET_PATH}"
    //                 '''
    //             }
    //         }
    //     }

    //     stage('Publish Build Info') {
    //         steps {
    //             sh '''
    //                 jfrog rt build-collect-env --server-id=my-jfrog --build-name=${BUILD_NAME} --build-number=${BUILD_NUMBER}
    //                 jfrog rt build-publish --server-id=my-jfrog --build-name=${BUILD_NAME} --build-number=${BUILD_NUMBER}
    //             '''
    //         }
    //     }
    // }

    // post {
    //     success {
    //         echo "✅ Build and upload to JFrog Artifactory successful!"
    //     }
    //     failure {
    //         echo "❌ Build or upload failed!"
    //     }
    }
}
