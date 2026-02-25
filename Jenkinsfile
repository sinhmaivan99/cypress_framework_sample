pipeline {
    agent any

    environment {
        NODE_VERSION = '22.14.0'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Cypress') {
            steps {
                bat 'npx cypress install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                bat 'npx cypress run --spec "cypress/e2e/login.cy.js"'
            }
        }

        stage('Generate Reports') {
            steps {
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
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}