from sanic import Blueprint

bp = Blueprint(
    'authentication',
    url_prefix='/auth'
)

@bp.route('/login', methods=['POST'])
async def login(request):
    data = request.json()

    db_record = request.ctx.db.find_one({
        'email': data.get('email')
    })