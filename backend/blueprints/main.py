from sanic import Blueprint
from sanic.response import file, redirect, text
import jwt

bp = Blueprint(
    'main',
    url_prefix=''
)


@bp.route('/')
@bp.route('/<path:path>')
async def index(request, path: str = None):
    if path == 'personal' and request.ctx.user is None:
        return redirect('/login')
    
    if path == 'admin':
        if request.ctx.user is None:
            return redirect('/login')
        elif not request.ctx.user.is_admin:
            return text('You have no privileges to access this page.', 403)
        
    if path and path.startswith('auth/verify'):
        try:
            token = path[12:]
            serialized = jwt.decode(
                token,
                request.app.config.SECRET,
                'HS256'
            ).get('user')

            request.ctx.db.update_one(
                {'email': serialized['email']},
                {'$set': {'verified': True}}
            )

            return text('Successfully verified!', 200)
        except Exception:
            return text('Unknown user.', 403)
        
    return await file('frontend/dist/index.html')


@bp.route('/logout')
async def logout(request):
    response = redirect('/')
    if 'session' in request.cookies:
        del response.cookies['session']
    
    return response
