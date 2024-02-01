# Main assumption during update endpoint of borrowedBooks API: 

    1. Rows of borrowedBooks is deleted if book is returned as it make conflict with 1-M relation between User and BorrowedBooks


# Make sure to have node js installed in your device
# Make sure to have mysql intalled in your device

Running this Project:

# Database setup:

    1. Create database and tables as provided in SQL_Commans.txt file in mysql workbench.
    2. Provide mysql configuration in dbConnection file inside API/database/dbConnection.js.

# API setup:

    1. Run command: npm install, inside API directory for installing all node packages.
    2. Run command: npm start to start project.


# File Structure:

    1. SQL_Commands has all the required commands for database setup.
    2. API is the main root folder of project.
    3. API/database has all functions required to interact with database.
    4. API/models has models for all the tables.
    5. API/routes has all the routes for all endpoints.