## Research Coder Master
This repository contains submodules for all of the services that compose Research Coder, 
as well as a top-level orchestration with `docker-compose`.


### Cloning the repository
Clone the repository with
```bash
git clone --recursive https://github.com/uab-energetics/rc-master
cd rc-master
```
If you didn't use the `--recursive` switch, you can always clone all of the submodules with
```bash
git submodule update --init --recursive
```
You may then wish to checkout a particular branch across all of the submodules
 (replacing master with the desired branch): 
```bash
git submodule foreach git checkout master
```
* Or just cd into a submodule directory and checkout whatever branch you want

---

### Prerequisites
Of course, you'll want `docker` and `docker-compose`. If you don't add your user to the docker group, you may have to prefix following commands with `sudo`.

Make your public and private authentication keys:
```bash
./scripts/generate-keys.sh
``` 
Create the docker network `research-coder`:
```bash
./scripts/create-network.sh
```

---

### Running the app
You'll first want to build and start all of the services:
```bash
docker-compose up -d --build
```

Some of our services require some additional database setup before they're ready. Run the following to get everything squared away:
```bash
./scripts/migrate-seed.sh
```

---

### Local development
By default, the source directories of each submodule will be mapped into their respective container, and will update in real-time. This allows for:
* developing locally without constantly rebuilding containers
* eliminates downloading dependencies just to make changes e.g. `vendor` and `node_modules`
* **this will only work if a service doesn't require a build step or has a file-watcher**
* **changing a service's dependencies requires a rebuild of the container**
