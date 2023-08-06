<p align="center">
  <a href="#about-application">About Application</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#how-to-run">How to Run</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#project-status">Project Status</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

</br>

![docs](https://user-images.githubusercontent.com/72872854/201072742-cdb654d0-0f93-4dd7-bae7-2da3d4f912af.png)

<p align="center">
<a href="https://img.shields.io/github/stars/shunny2/jwt-node?style=social"><img src="https://img.shields.io/github/stars/shunny2/jwt-node?style=social" alt="Repo Stars"/></a>
<a href="https://img.shields.io/github/forks/shunny2/jwt-node?style=social"><img src="https://img.shields.io/github/forks/shunny2/jwt-node?style=social" alt="Forks"/></a>
<a href="https://img.shields.io/github/license/shunny2/jwt-node"><img src="https://img.shields.io/github/license/shunny2/jwt-node" alt="License"/></a>
</p>

## About Application

An application made with Nodejs, Express, and Mongoose to perform a JSON Web Token authentication flow.

API Documentation is available at: [/api/v1/docs](http://localhost:9000/api/v1/docs/)

## Technologies

<table>
  <thead>
  </thead>
  <tbody>
    <td>
      <a href="https://nodejs.org/en/" title="NodeJS"><img width="128" height="128" src="https://cdn.worldvectorlogo.com/logos/nodejs-1.svg" alt="Node.js logo image." /></a>
    </td>
    <td>
      <a href="https://expressjs.com/" title="Express"><img width="128" height="128" src="https://cdn.worldvectorlogo.com/logos/express-109.svg" alt="Express javascript logo image." /></a>
    </td>
    <td>
      <a href="https://jestjs.io/" title="Jest"><img width="128" height="128" src="https://cdn.worldvectorlogo.com/logos/jest-2.svg" alt="Jest logo image." /></a>
    </td>
    <td>
      <a href="https://www.mongodb.com/" title="MongoDB"><img width="128" height="128" src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress" 
        alt="MongoDB logo image." /></a>
    </td>
    <td>
      <a href="https://swagger.io/" title="Swagger Documentation"><img width="128" height="128" src="https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg" alt="Swagger logo image." /></a>
    </td>
    <td>
      <a href="https://www.docker.com/" title="Docker"><img width="128" height="128" src="https://cdn.worldvectorlogo.com/logos/docker.svg" alt="Docker logo image." /></a>
    </td>
  </tbody>
</table>

## How to Run

First, start by cloning the repository:
```shell
git clone https://github.com/shunny2/jwt-node
```

If you use docker, run the following command from the project root directory to build and run the project.
```bash
docker-compose up --build
```

But if you are not using docker, you can run the following to run the server:
```bash
npm run dev
```

Remember to put your MongoDB credentials to connect to the database.

### Running tests:

If you use docker, run the following command in the project's root directory to access the container.
```bash
docker exec -it NODEJS_SERVER /bin/sh
```

After entering the container, run the following command to run the tests:
```bash
npm run test
```

Note: if you are not using docker, you can just run ```npm run test```

## Project Status

> Status: Completed.

## License

This project is under an [MIT](https://opensource.org/licenses/MIT) license.

<hr/>

<p align="center">Created by <a href="https://github.com/shunny2"><b>Alexander Davis</b></a>.</p>
