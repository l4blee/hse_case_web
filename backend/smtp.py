from smtplib import SMTP_SSL
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

with open('backend/verification_email.html') as f:
    mail_content = f.read()


class MailTransport:
    def __init__(self, *credentials) -> None:
        self.client = SMTP_SSL('smtp.yandex.ru', 465, timeout=10)
        self.mail, self.password = credentials

        self.client.login(self.mail, self.password)
        self.client.auth_plain()

    def send_auth_message(self, to: str, token: str):
        message = MIMEMultipart('alternative')
        message['Subject'] = 'Подтверждение регистрации'
        message['From'] = self.mail
        message['To'] = to

        ctn = mail_content.format(f'http://nosok.ddns.net/auth/verify/{token}')
        content = MIMEText(ctn, 'html')
        message.attach(content)

        self.client.sendmail(
            self.mail, 
            to, 
            message.as_string()
        )
