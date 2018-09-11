# NgxPhotoSearch

Web application to search for photos from [http://jsonplaceholder.typicode.com/photos](http://jsonplaceholder.typicode.com/photos).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

## Further changes / trade-offs
- Funtionality to filter by title not yet implemented
- Funtionality to alter number of photos shown per page not yet implemented
- Error Handling. No error handling on the API calls, need to add relevant tests and display messages etc.
- Accessibility enhancements / testing. With more time I would update the HTML/CSS to improve accessibility with some automated testing using something like [pa11y](https://www.npmjs.com/package/pa11y) or [Lighthouse](https://www.npmjs.com/package/lighthouse) and manual testing with screenreader etc.

## Development server

To run the project locally
- clone this repo:
```sh
git clone git@github.com:Benaud12/ngx-photo-search.git
```
- install dependencies:
```sh
npm install
```
- start the local server:
```sh
npm start
```

The application should now be accessible on [http://localhost:4200/](http://localhost:4200/).

This project has been set up to run with a mocked backed using [ng-apimock](https://www.npmjs.com/package/ng-apimock). The mocked backed server runs on [http://localhost:3000/](http://localhost:3000/) by default.

To run the project locally without mocks and connecting to the real API [http://jsonplaceholder.typicode.com/photos](http://jsonplaceholder.typicode.com/photos):
```sh
npm run start:prod
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

End-to-end tests run against a mocked backend using [ng-apimock](https://www.npmjs.com/package/ng-apimock).

## Running all tests

Run `npm run test:all` to run linting, unit tests and end-to-end tests.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
