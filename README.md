You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

# Currency converter

Currency converter app built on client-server architecture, using [Currency layer](https://currencylayer.com/) Api.



### Table of contents
- [Server](#server)
  - [Technology Stack](#technology--stack)
  - [Folder Structure](#folder--structure)
  - [Resolvers](#resolvers)
  - [Services](#services)
    - [Currency converter](#converter-service)
  - [Start Up](#run-the-server)
- [Client](#client)
  - [Technology Stack](#technology-stack)
  - [Folder Structure](#folder-structure)
  - [Start Up](#startup)


## Server
Server is built with Node.js, providing graphql api.

#### Technology  stack
- [Typescript](https://www.typescriptlang.org/)
- [Yarn](https://yarnpkg.com/)
- [Apollo Server](https://www.npmjs.com/package/apollo-server-express) - graphql server middleware for [Express](https://expressjs.com)
- [TypeGraphql](https://typegraphql.com/) - graphql framework
- [MongoDb](https://www.mongodb.com/) - database system
- [Mongoose](https://mongoosejs.com/) - database management
- [Jest](https://jestjs.io/) - testing library

#### Folder  structure

  `| -- constants` - global server constants  
  `| -- models` - mongoose models  
  `| -- resolvers` - graphql api resolvers  
  `| -- services` - isolated services  
  `| -- typedefs` - graphql schema type definitions  
  `| -- types` - global types and type declarations 
  
  
  #### Resolvers
  
  Resolvers are built using [typegraphql.](https://typegraphql.com)  
  Multiple functions are split into resolvers based on area of api they cover.  
  Resolvers are isolated, access other functions from server using context.  
    Each resolver has access to contex (`src/index.ts:33`):  
   `- services` - available services  
   `- models` - available database models  
   `- req, res` - [express.js](http://expressjs.com/en/5x/api.html#req) request, response objects
  
  #### Services
  
  Services are isolated parts of app, providing specific functionality.
  
  ##### Converter service
  
  Converter service provides conversions logic for rest of the application. On initializing, service fetches initial data  
  (allowed currencies and exchange rates). If these initial requests fail, server is not able to start. Service also updates  
  exchange rates every 24hours. Data are stored in servers memory and not preserved on restart.
  
#### Run the server
  
  - clone repository
  - go to server directory  `/ cd server`
  - install packages `/ yarn`
  - For production:  
    - compile ts files `/ yarn build`
    - run `PORT=<port> CONVERSION_ACCESS_KEY=<currencylayer.com-key> MONGO_URI=<mongo-access> yarn start`  
  - For development:  
    - copy `.env.copy` to `.env`
    - run `yarn dev`
    
    
## Client

Single-page web application built with React.js.

#### Technology Stack
- [Typescript](https://www.typescriptlang.org/)
- [Yarn](https://yarnpkg.com/)
- [React](https://reactjs.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/) - graphql client
- [Styled Components](https://styled-components.com/) - css in js styling
- [Graphql Code Generator](https://www.graphql-code-generator.com/) - generator of type definitions for graphql schema

#### Folder structure
  `| -- api` - graphql client, queries, mutation, generated types  
  `| -- components`  - single file components, component folders including component specific styles, utils, types, etc...  
  `| -- core` - core files - App setup, routes, theme, global styles  
  `| -- hooks` - custom hooks  
  `| -- pages` - folders, including page component and page related styles, utils, types, etc..  
  `| -- types` - global types and type declarations 
  
#### Startup
  - clone repository
  - go to client directory  `/ cd web`
  - install packages `/ yarn`
  - For production:  
    - build `/ yarn build`
    - serve the build  
  - For development:  
    - copy `.env.copy` to `.env`
    - run `yarn start`
