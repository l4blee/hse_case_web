from dataclasses import dataclass
from typing import Optional

from sanic import Blueprint
from sanic.request import Request
from sanic.response import redirect, json
import bcrypt

from database import UserModel

bp = Blueprint(
    'authentication',
    url_prefix='/auth'
)


@dataclass
class AuthenticationPayload:
    email: str
    password: str
    nickname: Optional[str]
    fullname: Optional[list[str]]
    course: Optional[str]

    @classmethod
    def from_request(cls, request):
        data = request.json

        return cls(
            email=data.get('email'),
            password=data.get('password'),
            nickname=data.get('nickname'),
            fullname=data.get('fullname'),
            course=data.get('course')
        )


@bp.route('/login', methods=['POST'])
async def login(request: Request):
    payload = AuthenticationPayload.from_request(request)
    record = request.ctx.db.find_one({
        'email': payload.email
    })
    
    if record is not None:
        user = UserModel.from_record(record)
        if user.validate(payload.password.encode('utf-8')):
            response = redirect('/')
            response.cookies['session'] = request.ctx.login_manager.login_user(user)
            response.cookies['session']['max-age'] = request.app.config.COOKIE_MAX_AGE

            return response

    return json({'message': 'unauth'}, status=401)



@bp.route('/register', methods=['POST'])
async def register(request: Request):
    payload = AuthenticationPayload.from_request(request)
    record = request.ctx.db.find_one({
        'email': payload.email
    })

    if record is not None:
        return json({'message': 'already_exists'}, 409)
    
    salt = bcrypt.gensalt()
    hased_pwd = bcrypt.hashpw(payload.password.encode('utf-8'), salt)
    user = UserModel(
        email=payload.email,
        nickname=payload.nickname,
        fullname=payload.fullname,
        course=payload.course,
        hashed_password=hased_pwd,
        salt=salt,
        is_admin=False
    )

    request.ctx.db.insert_one(user.to_dict())

    response = redirect('/')
    response.cookies['session'] = request.ctx.login_manager.login_user(user)
    response.cookies['session']['max-age'] = request.app.config.COOKIE_MAX_AGE

    return response
