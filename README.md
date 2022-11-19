# Maplestory Tracker

## Introduction

As a maplestory player, I used to make numerous spreadsheets to keep track of various information such as dailies, bosses and progression for each of my characters.
It was an extremely tedious process to set up the spreadsheets the the fields that I wanted and annoying to navigate between spreadsheets for different characters
as I had to duplicate every spreadsheet for the number of characters that I had. Not to mention, excel sheets are ugly and unpleasant to look at, with only visual
representations of raw data of words and numbers.

This was my inspiration for making this tracker app, to provide a convenient platform for players to keep track of their information in an interface that is simple to use and visually appealing. I catered this app for players in both the MapleSEA (Southeast Asia) and GMS (Global) servers, as I have played extensively in both regions
and also have friends in both regions who would potentially be using this app.

Link to <a href="https://github.com/midorinom/maplestory_tracker_backend">backend</a>

## Technologies Used

Frontend:

- React, Typescript, Redux, Material UI, MomentJS

Backend:

- PostgreSQL, Flask, Python, Flask-SQLAlchemy, Marshmallow, Psycopg2-binary, Flask-Migrate, Flask-Cors, Flask-Bcrypt, Uuid, Python-dotenv

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

Database name: maplestory_tracker

<img src="/src/images/readme/data_model_1.PNG" alt="Data Model 1" title="Data Model (1)">
<img src="/src/images/readme/data_model_2.PNG" alt="Data Model 1" title="Data Model (2)">

## Brief Explanation of Each Page

#### Login/Register

When registering, users have to select either the MapleSEA or GMS server, which defines the user's account type. There will be subtle differences in the app for each
type of user such as different item names and tooltip instructions. This is due to the game having localised differences across different regional servers.

<img src="/src/images/readme/login_page.PNG" alt="Login Page" title="Login Page">

#### Dashboard

If the user does not have characters, they would be shown a page that links to the character creation form where they would be able to fill in their IGN, Class, Level and an option to upload an iamge of their character. Class names vary slightly for MapleSEA and GMS and if no image is uploaded, the default image displayed throughout the app would be that of a faceless naked maplestory character.

The dashboard page displays the currently selected character, a list of all the user's characters that can be scrolled through, and a pie chart that consolidates all the weekly mesos acquired by the user over this bossing week (which resets on Thursday) alongside a timer that shows the number of days/hours/minutes until the weekly bossing reset.

The component combination of a currently selected character + character list is a common one that will be repeated in most of the other pages in the app. The character list is arranged in descending order by the character's level. However, if any character is assigned to be a "Main" character, that character would always be shown first in the list, regardless of the character's level. The first character in the list is also the one that would be displayed by default upon visiting any of the pages that has a currently selected character + character list feature.

<img src="/src/images/readme/dashboard_page.PNG" alt="Dashboard Page" title="Dashboard Page">

## Outstanding Features to Implement

Below I have included the images of the spreadsheets I made previously which I use as a reference to design the pages in this app.

#### Dailies/Weeklies Page

<img src="/src/images/readme/dailies_spreadsheet.PNG" alt="Dailies Spreadsheet" title="Dailies Spreadsheet">

#### Bossing Page

<img src="/src/images/readme/bossing_spreadsheet.PNG" alt="Bossing Spreadsheet" title="Bossing Spreadsheet">

#### Progression Page

<img src="/src/images/readme/progression_spreadsheet.PNG" alt="Progression Spreadsheet" title="Progression Spreadsheet">

#### Legion Page

<img src="/src/images/readme/legion_spreadsheet.PNG" alt="Legion Spreadsheet" title="Legion Spreadsheet">

#### Farming Page

<img src="/src/images/readme/farming_spreadsheet.PNG" alt="Farming Spreadsheet" title="Farming Spreadsheet">

#### Events Page

<img src="/src/images/readme/events_spreadsheet.PNG" alt="Events Spreadsheet" title="Events Spreadsheet">

#### Admin Page

Admin users will be able to edit the list of items that are used to display the dropdowns in the Progression page.
They can also edit the event information that will be displayed for both MapleSEA and GMS users, such as changing the main event, event shop items, quantity and cost, as well as setting the event calendar. The admin can perform full CRUD on all these pieces of data.
