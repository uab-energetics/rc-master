## Research Coder Master
This repository contains submodules for all of the services that compose Research Coder, 
as well as a top-level orchestration with docker-compose


### Cloning the repository
Clone the repository with
```bash
git clone --recursive https://github.com/uab-energetics/rc-master
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

### Setting up
First, make your public and private authentication keys:
```bash
./scripts/generate-keys.sh
``` 
Second, ensure that the docker network research-coder exists:
```bash
./scripts/create-network.sh
```

---

### Running the app
Since the majority of the services depend on `rabbitmq`, we provide a helper script to run it before starting the rest of the services with `docker-compose up`. Use it as follows:
```bash
./scripts/up.sh
```
Any arguments passed to `up.sh` will be passed along to `docker-compose up`. For example, if you want to rebuild and run detached, you would use
```bash
./scripts.up.sh --build -d
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

**This will only work if a service doesn't require a build step or has a file-watcher**
