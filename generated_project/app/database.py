from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite URL for a local file named blog.db in the current directory
SQLALCHEMY_DATABASE_URL = "sqlite:///./blog.db"

# Create the SQLAlchemy engine with the appropriate connection arguments for SQLite.
# echo=False disables SQL logging; future=True enables 2.0 style usage.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=False,
    future=True,
    connect_args={"check_same_thread": False},
)

# Session factory bound to the engine. future=True for 2.0 style sessions.
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    future=True,
)

# Base class for declarative class definitions.
Base = declarative_base()


def get_db():
    """Yield a database session for FastAPI dependency injection.

    Example usage in a FastAPI route:
        @app.get("/items/")
        def read_items(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
