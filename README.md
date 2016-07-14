# Expense Reporting Application

This is a simple application where users can create accounts and record their expenses. 

## Server requirements

* NodeJS
* PostgreSQL

## Installation

1. Clone git repository
2. Set environment variable DATABASE_URL to your production PostgreSQL URL (modify user/pass for development mode)
3. Run bundle installer
4. Setup database using `rake db:setup`
5. Type `rails s` in console to run development server