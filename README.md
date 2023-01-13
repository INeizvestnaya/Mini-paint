# Mini-paint project

This is to-do list, where you can create tasks for any day and 
check and uncheck this tasks.

## Task

https://drive.google.com/file/d/19cb4whI_HUVPzuaPyaj5r6hGotIVnhho/view

## How to run the app

If you don't have git, install it.

Clone the repository.

If you don't have node.js, install it from the official site.

Type

```
npm install
```

to install all the dependencies of the project.

This project uses firebase as a storage of pictures and their info.

You should write down your Firebase config.

Register on firebase.

Find .env.example file, use it as a template.

(This file contains my data)

Create .env file near it and write your firebase config data there in the same way as it's written in the example file.

Then type 

```
npm start
```

in the console, directed to the root folder of the project.

This command will run the app and open it in your browser.

The last step is registration in the app when you run it.

## Database snapshot

Data in this firebase project in stored in Firestore Database which is noSQL database.
There are collections and docs.

The main collections are "pictures" and "authors". They have documents for every picture and author.

Actions for setting the documents are stored in utils/firestoreActions.ts file

Files of pictures are stored in Firebase Storage in "pictures" folder

### Adding picture

When you are adding a picture it is saved in Firebase Storage.

At the same time name, author and unique id to refer to the storage are saved in Firestore database.

The author is also saved in separate collection because you need to have a list of all authors to filter them.

## Application stack

All used libraries are listed in dependencies and devDependencies in package.json file.

### React

A JavaScript library for creating user interfaces.

### Typescript

A programming language which is compiled into JavaScript and adds typing system to it.

### Material UI (MUI)

A library for react which simplifies creating UI and styles. It defines components such as buttons, labels, menus, icons.

### Redux

A state management system for react. Helps to store react state data in one place and manage it easily.

### React-toastify

A library for creating notifications when an error occurs during authorization.

### Eslint

A JavaScript linter. It helps to write cleaner code, checks it for the mistakes and enforces correct code style.

### Prettier

A code formatter to write code in same style everywhere.

### FIrebase

A database to store data.

### Uuid

A libarary to generate unique ids.

### husky

A tool to make git hooks.

## Folders of the application

### .husky

Configuration files for a pre-push hook.

It doesn't allow you to push anything when there are EsLint errors in the project.

### node_modules

Modules of the app. They are installed with npm and are ignored by git.

### src

Source folder of application and configuration files. It contains files written by developers of the app.

Contains TypeScript (.ts, .tsx) files. .tsx files are used for react library.

### src/components

Contains other react components.

### src/constants

Stores constants used in multiple files of the application.

### src/hooks

Stores custom hooks used by react library.

### src/pages 

Contains pages (url routed) of the application.

### src/redux

Contains redux logic.

### src/types

Stores TypeScript types used in multiple files of the application.

### src/utils

Contains different helper functions.
