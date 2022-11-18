# Maplestory Tracker

## Introduction
As a maplestory player, I used to make numerous spreadsheets to keep track of various information such as dailies, bosses and progression for each of my characters.
It was an extremely tedious process to set up the spreadsheets with the the fields that I wanted and annoying to navigate between spreadsheets for different characters
as I had to duplicate every spreadsheet for the number of characters that I had. Not to mention, excel sheets are just ugly and unpleasant to look at, with only visual
representations of raw data of words and numbers.

This was my inspiration for making this tracker app to provide a convenient platform for players to keep track of their information in an interface that is simple to use
and visually appealing. I catered this app for players in both the MapleSEA (Southeast Asia) and GMS (Global) servers, as I have played extensively in both regions
and also have friends in both regions, who would potentially be using this app.

Link to <a href="https://github.com/midorinom/maplestory_tracker_backend">backend</a>

## Technologies Used
Frontend: React, Typescript, Redux, Material UI, MomentJS

Backend: PostgreSQL, Flask, Python, Flask-SQLAlchemy, Marshmallow, Psycopg2-binary, Flask-Migrate, Flask-Cors, Flask-Bcrypt, Uuid, Python-dotenv

###### Installation Instructions
﻿alembic==1.8.1
apispec==6.0.1
asgiref==3.5.2
bcrypt==4.0.1
click==8.1.3
colorama==0.4.6
Flask==2.2.2
Flask-Bcrypt==1.0.1
Flask-Cors==3.0.10
Flask-Migrate==3.1.0
Flask-SQLAlchemy==3.0.2
greenlet==2.0.1
itsdangerous==2.1.2
Jinja2==3.1.2
Mako==1.2.3
MarkupSafe==2.1.1
marshmallow==3.18.0
packaging==21.3
psycopg2-binary==2.9.5
pyparsing==3.0.9
python-dotenv==0.21.0
six==1.16.0
SQLAlchemy==1.4.43
uuid==1.30
webargs==8.2.0
Werkzeug==2.2.2
## Component Hierarchy
```
App
  NavBar
  Login
    LoginComp
    Register
    Registered
  AddCharacters
  Dashboard
    FeaturedChar
    EditFeaturedChar
    CharsList
    CharCard
    Charts
  Dailies
    CharCard
    DailiesCard
    WeekliesCard
  Bossing
  Progression
  Legion
  Farming
  Events
```

## Endpoints
Link to <a href="https://docs.google.com/spreadsheets/d/1johWJthKgyvEfgcKUEl9HcQtabtmud5npe-F2_jlQRM/edit#gid=0">API dictionary</a>

## Data Model
<img src="/src/images/data_model_1.PNG" alt="Data Model 1" title="Data Model (1)">
<img src="/src/images/data_model_2.PNG" alt="Data Model 1" title="Data Model (2)">
