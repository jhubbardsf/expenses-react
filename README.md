# Expense Reporting Application

This is a simple application where users can create accounts and record their expenses. 

## Live Sample App

[Live App on Heroku](https://expenses-app-react.herokuapp.com/)

## Server requirements

* NodeJS
* PostgreSQL

## Installation (Development)

1. Clone git repository
2. Modify postgres variable in config/database.yml for your environment
3. Run bundle installer in app root
4. Setup database using `rake db:setup`
5. Type `rails s` in console to run development server

## Installation (Production)

1. Clone git repository
2. Modify production url for your PostgreSQL DB
3. Run bundle installer in app root
4. Run `RAILS_ENV=production bundle exec rake db:setup` in app root to setup DB
5. Run `foreman start` to start unicorn server in production mode

## Notes

Seed.rb automatically creates three users with three different roles.

*Role: user
*Email: user@expenses.com
*Password: Password12345

*Role: manager
*Email: manager@expenses.com
*Password: Password12345

*Role: admin
*Email: admin@expenses.com
*Password: Password12345


Users can modify their own expenses and their own user account. Managers can modify their own expenses, account, and other user accounts. Admins can modify any record through the API.