# Assumptions

1. The search should only return children meeting the confidence criteria.

2. The target machine has docker installed.


# Usage

The `service` directory contains all the source code for this simple application. From the root directory, run either of the below command (`development` or `production` mode) in the CLI

### Development Mode
```
$ docker-compose -f "docker-compose.debug.yml" up -d --build


This command should setup all defined services and run the node app on port 9000 (default)
```

### Production Mode
```
$ docker-compose -f "docker-compose.yml" up -d --build


This command should setup all defined services and run the node app on port 8000 (default)
```

Navigate to `http://localhost:9000|8000/strongest?names=butterfree,wormadam-plant`


# Running Tests (Standalone)

This section assumes you have node, npm and yarn installed in your local machine.


### Service Application

Navigate to the `service` directory and run the following commands:

1. `yarn` to install application dependencies if `node_modules` directory is not present.

2. `yarn run test` to run tests and give a detailed coverage report.
