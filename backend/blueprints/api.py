from sanic import Blueprint
from sanic.response import json

bp = Blueprint(
    'API',
    url_prefix='/api'
)


@bp.route('/get_nickname')
async def get_nickname(request):
    token = request.cookies.get('session')
    if token is None:
        return json(
            {
                'message': 'unauth'
            }, 
            401
        )
    
    user = request.ctx.login_manager.get_user(token)

    return json({
        'nickname': user.nickname
    })
