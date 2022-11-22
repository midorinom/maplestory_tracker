# Maplestory Tracker

## Introduction

As a maplestory player, I used to make numerous spreadsheets to keep track of various information such as dailies, bosses and gear progression for each of my characters.
It was an extremely tedious process to set up the spreadsheets the the fields that I wanted and annoying to navigate between spreadsheets for different characters
as I had to duplicate every spreadsheet for the number of characters that I had. Not to mention, excel sheets are ugly and unpleasant to look at, with only visual
representations of raw data of words and numbers.

This was my inspiration for making this tracker app, to provide a convenient platform for players to keep track of their information in an interface that is simple to use and visually appealing. I catered this app for players in both the MapleSEA (Southeast Asia) and GMS (Global) servers, as I have played extensively in both regions
and also have friends in both regions who would potentially be using this app.

Link to <a href="https://github.com/midorinom/maplestory_tracker_backend">backend</a>

## Technologies Used

Frontend:

- React, Typescript, Redux, Material UI, React-router-dom, MomentJS

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

<img src="/src/images/readme/login_page.png" alt="Login Page" title="Login Page">

#### Dashboard

If the user does not have characters, they would be shown a page that links to the character creation form where they would be able to fill in their IGN, Class, Level and an option to upload an image of their character. Class names vary slightly for MapleSEA and GMS and if no image is uploaded, the default image displayed throughout the app would be that of a faceless naked maplestory character.

The dashboard page displays the currently selected character, a list of all the user's characters that can be scrolled through, and a pie chart that consolidates all the weekly mesos acquired by the user over this bossing week (which resets on Thursday) alongside a timer that shows the number of days/hours/minutes until the weekly bossing reset. The user can add more characters, as well as delete or update the details of any of the existing characters, including changing the image. The user can also choose which pages they want to track for each character, by checking the respective checkboxes displayed under the currently selected character. The checkboxes are all checked by default.

The component combination of a currently selected character + character list is a common one that will be repeated in most of the other pages in the app. The character list is arranged in descending order by the character's level. However, if any character is assigned to be a "Main" character, that character would always be shown first in the list, regardless of the character's level. The first character in the list is also the one that would be displayed by default upon visiting any of the pages that has a currently selected character + character list feature.

<img src="/src/images/readme/dashboard_page.png" alt="Dashboard Page" title="Dashboard Page">

#### Dailies/Weeklies Page
A character list is generated upon visting the page, with the list being chosen from the characters that have "Dailies/Weeklies" checked in the dashboard page. The order of the characters is the same as described in the dashboard page. Selecting a character would show the list of dailies and weeklies for that character with checkboxes for the user to update whether a daily/weekly is done or not. 

Users can edit the dailies and weeklies list, changing the names as well as add or remove any of the options. There are also timers displayed that show the amount of days or hours(if <1 day) until the next daily and weekly resets. For MSEA accounts, the time is taken from the user's local time whereas for GMS accounts, the time is based off UTC as these are the respective ingame times that each respective server follows for the daily/weekly resets. 

If it is the first time today that the user has visited this page, the list of dailies with today's date will be automatically generated, with all checkboxes unchecked. The dailies list from the previous day will still be stored in the database and the user can freely view or update the list from the previous day. The weeklies list works similarly except it checks for whether it is the first time this week that the user has visited the page, instead of daily. Similarly, the previous week's record remains stored in the database. 

There will only ever be at most 2 entries at a time in the database (today and the previous day), with the oldest entry being automatically deleted from the database whenever a third entry is generated. The dailies and weeklies lists generated are copied from the ones from the previous day/week. However, if the character is new, a default set of dailies and weeklies are generated instead.

<img src="/src/images/readme/dailies_page.png" alt="Dailies/Weeklies Page" title="Dailies/Weeklies Page">

## Outstanding Features to Implement

Currently, I have fully developed the backend for all the following pages, all that remains is to do up the frontend. Below I have included the images of the spreadsheets I made previously which I am using as a reference to design the pages.

#### Dashboard Page

- Add pie chart to display total weekly mesos earned by the user

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
