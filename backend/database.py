import bson
from dataclasses import dataclass

from pymongo import MongoClient
import bcrypt


@dataclass
class UserModel:
    """
    Represents a user document in Mongo Database
    """
    email: str
    nickname: str
    fullname: list[str]
    course: str

    hashed_password: bson.Binary
    salt: bson.Binary

    is_admin: bool
    verified: bool
    coins: int

    @classmethod
    def from_record(cls, record: dict):
        return cls(
            email=record.get('email'),
            nickname=record.get('nickname'),
            fullname=record.get('fullname'),
            course=record.get('course'),
            hashed_password=record.get('hashed_password').encode('utf-8'),
            salt=record.get('salt').encode('utf-8'),
            is_admin=record.get('is_admin', False),
            verified=record.get('verified', False),
            coins=record.get('coins', 0)
        )
    
    def to_dict(self) -> dict:
        return {
            'email': self.email,
            'nickname': self.nickname,
            'fullname': self.fullname,
            'course': self.course,
            'hashed_password': self.hashed_password.decode('utf-8'),
            'salt': self.salt.decode('utf-8'),
            'is_admin': self.is_admin,
            'verified': self.verified,
            'coins': self.coins
        }

    def validate(self, password: bytes) -> bool:
        return bcrypt.hashpw(password, self.salt) == self.hashed_password


class MongoDB:
    def __init__(self, connection_url) -> None:
        self.client = MongoClient(connection_url)

        self.users = self.client.platform.users  # Users regisrty
