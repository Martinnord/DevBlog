# Project Description

## Method

When developing this project I first started with planning. I have always been a fan of Kanban, but I also wanted to try out SCRUM. Instead of switching to a SCRUM directly I ended up with combining those two. I ended up with:


* All the features I wanted

* The design of the app

* What technologies I wanted to use

* The information structure

* How the navigation will be

  

After the planning I started developing the website and API. I started of with the core features:

* Being able to create an account

* Being able to create a article

* Browse all the articles

* Design the login-, register- and articles screen

## Tools

Both the frontend and backend will be using ESlint. Which is basically used to find problematic patterns or code that doesn't follow a certain style guidelines.

My IDE of choice is Visual Studio Code

#### Frontend (The actual website)

I'm using React.js to create the website since it's advocates "reusable components", components that you can use again as Lego bits. You can create small components that are then used by larger components. Each component has its own logic and determines how it will be rendered on the website. As you can reuse everywhere, it will cause your application to be consistent, making it easier to build on its code base and make the development process easier and faste.

The website will be using Apollo Client since my I have a GraphQL API. And Apollo Client works as a bridge between the app and the API.

#### Backend

The backend will be running on Node.js, with GraphQL as an API layer and PostgreSQL for database. One big reason I used to use Node.js was to write it with Javascript, ie. same language as a printer with React.js. Which leads to consistency between both front end and backend and more efficiency, since one does not need to write in different languages.

Instead of using the traditional REST way to type APIs, I chose to use GraphQL which is a query language for one's API. GraphQL asks a question more specifically what kind of data you want, instead of REST APIs just providing what's on a specific route.

## Informatoin Architecture
My IA is really basic, but it fits my needs.

Below is an image of my IA and it represents all of the routes of the website. All of the routes, except `PageNotFound`, `Login` and `Register`, will have a navbar component what makes it easy to navigate. With the navbar component, the user will be able to navigate to `NewArticle` (if he/she is logged in), `Settings`, `Profile`. The user will also have the option to sign out and land on the `Home` route again.

As I mentioned above React.js advocate "reusable components" which I use as lego blocks when I need them (see `Code structure` for some examples).

For example, I'm using a component called `PostCard` to render out all of the posts on the `Home` route and on I'm also using the component on the `Profile` route since you will be able to see a specific user's posts. 

Below is an image of my IA:

![Information Architecture](https://i.imgur.com/oZdnWiI.jpg)


## Code structure

My code structure has a pretty simple concept, but it also scales and is easy to maintain. The concept is to have the different routes as containers for other reusable components. The only issue is that I only have one css file. I could split it up to have different css files for all of the different routes. Below is a small set of `routes` and `components` that I use to illustrate the structure.

```
/src  

  /components  
    Post.js
    PostCard.js

  /routes  
    /Home.js
    /NewArticle.js
    /Login.js
    /Profile.js
    /Signup.js
    /index.js
    /styles.css

  index.js   

```
The routes will be able to import components from `/components` and use their functionality when they want. For example: I'm using `TextField` at `/Login`, `/Register` and `/CreateProduct`. 