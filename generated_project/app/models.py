"""SQLAlchemy ORM models for the blog application.

This module defines the database tables used by the application. The
`Base` class is imported from :pymod:`app.database` which provides the
SQLAlchemy declarative base tied to the engine configuration.
"""

from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Post(Base):
    """Model representing a blog post.

    Attributes
    ----------
    id: int
        Primary key, auto‑incremented integer.
    title: str
        Title of the blog post; cannot be null.
    content: str
        Full text content of the post; cannot be null.
    created_at: datetime
        Timestamp when the post was created. Defaults to the current time.
    updated_at: datetime
        Timestamp of the last update. Updated automatically on changes.
    """

    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
