import os
from pathlib import Path
from importlib import import_module

from sanic import Sanic
from sanic.log import logger
from sanic_cors import CORS

from database import MongoDB
from auth import LoginManager
from smtp import MailTransport

app = Sanic(__name__)
app.static('/assets', 'frontend/dist/assets')

app.config.SECRET = '02f24e90200099ec055f17819b97910a67571a11d762df36'
app.config.COOKIE_MAX_AGE = 60 * 60 * 2  # equal to 2 hours

for i in Path('backend/blueprints').glob('*.py'):
        mod = import_module(f'blueprints.{i.stem}')
        bp = mod.__dict__.get('bp')
        if bp is not None:
            app.blueprint(bp)

logger.info(f'Available blueprints: {", ".join(app.blueprints)}')
logger.info('Finished configuring Sanic, proceeding..')

cors = CORS(app)
db = MongoDB(
    os.getenv('DATABASE_URL').format(
                    os.getenv('DB_USERNAME'),
                    os.getenv('DB_PASSWORD')
    )  
)
login_manager = LoginManager(app)
mail = MailTransport(os.getenv('SMTP_LOGIN'), os.getenv('SMTP_PASSWORD'))

@app.middleware
async def request(request):
    request.ctx.mail = mail
    request.ctx.db = db.users
    request.ctx.login_manager = login_manager
    request.ctx.user = login_manager.get_user(request)
