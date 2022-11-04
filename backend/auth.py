from functools import wraps
from typing import Optional

import jwt
from sanic.response import text

from database import UserModel


class LoginManager:
    def __init__(self, app) -> None:
        async def extract_user(request):
            user = None

            token = request.cookies.get('session')
            if token is not None:
                user = self.get_user(token)

            request.ctx.user = user

        app.register_middleware(extract_user, 'request')
        self._secret = app.config.SECRET
    
    def get_user(self, token: str) -> Optional[UserModel]:
        try:
            serialized = jwt.decode(
                token,
                self._secret,
                'HS256'
            ).get('user')

            user = UserModel(
                email=serialized['email'],
                nickname=serialized['nickname'],
                fullname=serialized['fullname'],
                course=serialized['course'],
                hashed_password=serialized['hashed_password'],
                salt=serialized['salt'],
                is_admin=serialized['is_admin']
            )
        except Exception:
            user = None

        return user

    def login_user(self, user: UserModel) -> str:
        return jwt.encode(
            {'user': user.to_dict()},
            self._secret,
            'HS256'
        )


def login_required(wrapped):
    def decorator(f):
        @wraps(f)
        async def decorated_function(request, *args, **kwargs):
            if request.ctx.user:
                response = await f(request, *args, **kwargs)
                return response
            else:
                return text("You are unauthorized.", 401)

        return decorated_function
    return decorator(wrapped)
