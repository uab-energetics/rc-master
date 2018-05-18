## Research Coder Master
This repository contains submodules for all of the services that compose Research Coder, 
as well as a top-level orchestration with docker-compose

##### Notes:
+ watch out for using 'container_name', especially with mongodb.
    The container will not always create a new database as you might expect!
+ Dont forget to build after changing source!
+ Dont forget to create the research-coder network
+ Pro Tip: enter the source code, and run a development instance attached to the network to
    swap out services for development