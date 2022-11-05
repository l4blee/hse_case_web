import aiohttp
from sanic import Blueprint
from sanic.request import Request
from sanic.response import json, raw

bp = Blueprint(
    'API',
    url_prefix='/api'
)


@bp.route('/get_data', methods=['POST'])
async def get_data(request: Request):
    token = request.cookies.get('session')
    if token is None:
        return json(
            {
                'message': 'unauth'
            }, 
            401
        )
    
    requested: list = request.json.get('requested')
    requested = filter(lambda x: x not in ['hashed_password', 'salt'], requested)
    user = request.ctx.login_manager.get_user(token)

    returnable = {i: getattr(user, i, None) for i in requested}

    return json(returnable)


@bp.route('/get_qr')
async def get_qr(request):
    token = request.cookies.get('session')
    if token is None:
        return json(
            {
                'message': 'unauth'
            }, 
            401
        )
    
    async with aiohttp.ClientSession() as session:
        async with session.get(f'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data={token}') as response:
            return raw(await response.read(), content_type='image/png')
