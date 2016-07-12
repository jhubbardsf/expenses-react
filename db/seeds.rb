# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create({name: 'Regular User', email: 'user@expenses.com', password: 'Password12345'})
manager = User.create({name: 'Manager User', email: 'manager@expenses.com', role: 'manager', password: 'Password12345'})
admin = User.create({name: 'Admin User', email: 'admin@expenses.com', role: 'admin', password: 'Password12345'})