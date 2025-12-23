from sqlalchemy import Column, Integer, String
from backend.database import Base

class TestingStandards(Base):
    __tablename__ = "testing_standards"

    id = Column(Integer, primary_key=True, index=True)
    regions = Column(String)
    recommended_standards = Column(String)
    preferred_standards = Column(String)
