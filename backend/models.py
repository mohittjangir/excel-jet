from sqlalchemy import create_all, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True)  # Clerk User ID
    email = Column(String, unique=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    projects = relationship("Project", back_populates="owner")

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    raw_video_url = Column(String)
    status = Column(String, default="pending")  # pending, transcribing, clipping, completed, failed
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    owner_id = Column(String, ForeignKey("users.id"))
    owner = relationship("User", back_populates="projects")
    clips = relationship("Clip", back_populates="project")

class Clip(Base):
    __tablename__ = "clips"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    title = Column(String)
    start_time = Column(Integer)  # in seconds
    end_time = Column(Integer)
    clip_url = Column(String)
    caption = Column(Text)
    hook = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    project = relationship("Project", back_populates="clips")
