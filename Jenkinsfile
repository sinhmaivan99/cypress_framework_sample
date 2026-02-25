pipeline {
    agent any

    environment {
        NODE_VERSION = '22.14.0'  // Adjust based on your Node.js version
    }

    stages {
        stage('Checkout') {
            steps {
                // Assuming the code is in a Git repository
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                bat 'npx cypress run --spec "cypress/e2e/login.cy.js"'
            }
        }

        stage('Generate Reports') {
            steps {
                // Publish Mochawesome reports if configured
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'reports/mochawesome',
                    reportFiles: 'mochawesome.html',
                    reportName: 'Cypress Test Report'
                ])
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'reports/mochawesome/**/*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            // Clean up or send notifications if needed
            echo 'Pipeline completed.'
        }
        failure {
            // Handle failures, e.g., send email
            echo 'Pipeline failed.'
        }
    }
}