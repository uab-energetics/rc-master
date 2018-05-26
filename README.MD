## Research Coder Master
This repository contains submodules for all of the services that compose Research Coder, 
as well as a top-level orchestration with docker-compose

### Installation and Usage

#### Cloning the repository
Clone the repository with
```bash
git clone --recursive https://github.com/uab-energetics/rc-master
```
If you didn't use recursive, you can always clone all of the submodules with
```bash
git submodule update --init --recursive
```
You may then wish to checkout a particular branch across all of the submodules
 (replacing master with the desired branch): 
```bash
git submodule foreach git checkout master
```
* Or just cd into a submodule directory and checkout whatever branch you want

#### Running the application
First, make your public and private authentication keys:
```bash
./scripts/generate-keys.sh
``` 
Second, ensure that the docker network research-coder exists:

