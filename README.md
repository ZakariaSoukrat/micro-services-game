# Micro-services-game

 This project is a microservices-based application with several independent services working together, including Gateway, Player, Admin, Authentication and Match services. While we initially containerized these services using Docker, we encountered some issues in the containerized environment. Therefore, we are providing instructions for running the services directly on your machine without Docker.

 ## Services 


The application is divided into the following services:

    Gateway: The entry point for the application, routing requests to appropriate services.
    Player: Manages player-related operations.
    Authentication: Handles user authentication and authorization.
    Match: Manages game match-making and related functionalities.


## Running Services Without Docker

Due to some issues encountered with the Docker setup, you can also run the services directly on your machine. Navigate to each service's directory and run the following commands in separate terminal windows:

### - npm run start_auth      
Starts the Authentication service
### - npm run start_player    
Starts the Player service
### - npm run start_gateway  
Starts the Gateway service
### - npm run start_match    
Starts the Match service

You can use the Postman collection JSON file for API testing.
