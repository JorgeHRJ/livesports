# livesports

This is a simple sports live feed made with Symfony 5 and the Mercure component. Just for practising.
Mercure component is used to send data from the server to the client in real-time. 
Read more about [Mercure](https://symfony.com/doc/current/mercure.html) component.

## Setting up

### Requirements

This app uses Docker, so you will need:

* [Docker](https://docs.docker.com/install/)
* [Docker Compose](https://docs.docker.com/compose/install/)

### Docker config

Create .env file for Docker and modify it in case you need it:
```bash
cd infra/docker
cp dist.env .env
```

Build and start containers:
```bash
docker-compose build
docker-compose up -d
```

Build node container:
```bash
docker build -t livesports-node node/ --no-cache
```

### App config

Install vendors via composer
```bash
docker exec -it livesports-php composer install
```

Install node dependencies
```bash
cd </project/root>
docker run -it -v $(pwd):/home/app livesports-node npm install
```

Build assets
```bash
cd </project/root>
docker run -it -v $(pwd):/home/app livesports-node yarn encore dev
```

If you want, you can set a local domain for the app updating the /etc/host
```bash
127.0.0.1 livesports.loc"
```

### Code quality
This project uses the following script in order to mantain the quality of the project
```bash
docker exec -it livesports-php bin/qualitify.sh
```

## Ready!
Open your browser and go to:
* http://livesports.loc
