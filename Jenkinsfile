pipeline {
    agent any

    environment {
        NODE_VERSION = '22.14.0'
    }

    triggers {
        cron('H 1 * * 1-5')  // Chạy lúc khoảng 1h giờ VN (11h UTC) từ thứ 2 đến thứ 6 hàng tuần (H để phân bổ load)
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Cypress') {
            steps {
                bat 'npx cypress install'
            }
        }

        stage('Run Cypress Tests + Build Report') {
            steps {
                bat 'npm run test:report'
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
