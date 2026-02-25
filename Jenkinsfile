pipeline {
    agent any

    environment {
        NODE_VERSION = '22.14.0'
    }

    triggers {
        cron('20 10 * * 1-5')  // Chạy lúc 17h20 giờ VN (10h20 UTC) từ thứ 2 đến thứ 6 hàng tuần
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