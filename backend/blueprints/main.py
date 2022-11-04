from sanic import Blueprint
from sanic.response import file, redirect

bp = Blueprint(
    'main',
    url_prefix=''
)


@bp.route('/')
@bp.route('/<path:path>')
async def index(request, path: str = None):
    if path == 'personal' and request.ctx.user is None:
        return redirect('/login')
        
    return await file('frontend/dist/index.html')


@bp.route('/logout')
async def logout(request):
    response = redirect('/')
    if 'session' in request.cookies:
        del response.cookies['session']
    
    return response
