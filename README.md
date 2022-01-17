# Site Asset Manager

Site Asset Manager is designed to inventory and manage large facility equipment.

The purpose of this application is provide large site managers and operators with an online database tool that will give them all of the advantages of storing data in a relational database engine. Sites, buildings, systems and equipment can all be created, updated and deleted in this web application.

Additionally, Site Asset Manager allows equipment operators the ability to track activity, issue and energy conservation items, with the intended purpose of assisting with maintenance and energy audit activities. A live record can be continually updated with new information, with obvious benefits over other alternatives.

## Getting Started

### Prerequisites
Before you get started, make sure you have the software below installed on your computer.

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### Installing

1. Create a new database called `site_asset_manager` and run [this SQL code.](database.sql)
2. Run `npm install`
3. Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

3. Start postgres if not running already by using `brew services start postgresql`
4. Run `npm run server`
5. Run `npm run client`
6. Navigate to `localhost:3000`

## Built With

- JavaScript
- React
- SQL
- Redux
- Postico
- Visual Studio Code
- Material-UI

## Authors

* **Warren O'Brien** - *Full Stack Web Developer*

## Acknowledgments

* Thank you to Prime Digital Academy for teaching me the skills neccessary to embrace modern web technologies to build this application.
* A special thank you to Matt Black, my Prime Academy cohort instructor, for his invaluable advice and support.
