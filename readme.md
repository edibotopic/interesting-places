# Interesting Places

A basic CRUD application for points-of-interest.

## The basic idea

There is a lot that can be done, but time is short!
Here are some essentials:

* User creates account and logs in
* Creates groups of places
* Places have associated data
* User stores groups in account
* The data is accessible via an API
* The API is documented

## Todo

* [x] Minimal extension to model (e.g., name, description, lat, long, rating)
* [~] Add enhancements (e.g., user images, admin user)
* [~] API docs
* [ ] Deploy
* [ ] Structure and complete README

### Standing item

* [ ] Update tests

## Bugs

* Invalid place details send user to faulty input screen (404 on input)
* Empty string for lat, long and rating returns 0 (not ideal)
