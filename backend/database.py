import os
import bson
from dataclasses import dataclass

from pymongo import MongoClient


@dataclass()
class UserModel:
    """
    Represents a user document in Mongo Database
    """
    email: str
    nickname: str
    fullname: list[str]

    hashed_password: bson.Binary
    salt: bson.Binary

    is_admin: bool


class MongoDB:
    def __init__(self, connection_url) -> None:
        self.client = MongoClient(connection_url)

        self.users = self.client.platform.users  # Users regisrty


db = MongoDB()
