import os

from sanic import Sanic

from database import MongoDB

app = Sanic(__name__)
db = MongoDB(
    os.getenv('DATABASE_URL').format(
                    os.getenv('DB_USERNAME'),
                    os.getenv('DB_PASSWORD')
    )  
)

@app.middleware
async def request(request):
    request.ctx.db = db
