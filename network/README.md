# TRACKER network - A blockchain based business process optimizer

> This is a live demo of data and transaction management for the TRACKER project

**Supported versions**
hyperledger-composer 0.18.2 and higher
hyperledger-fabric Fabric 1.1 and higher
node.js v8.9.x and higher
npm v8.9.x and higher

**Notice**
We'll be using the version 1.1 of the Fabric, it's necessary to set environmental variable in every terminal, you may use, to let scripts know this.
```bash
export FABRIC_VERSION=hlfv11
```

**Setup**
1. Install Hyperledger Fabric Composer 0.18.2 prerequisites (https://hyperledger.github.io/composer/installing/installing-prereqs.html)
2. Prepare the dev environment (https://hyperledger.github.io/composer/installing/development-tools.html)
3. Start Hyperledger Fabric
    ```bash
    cd ~/fabric-tools
    export FABRIC_VERSION=hlfv11
    ./startFabric.sh
    ./createPeerAdminCard.sh
    ```
4. Go to the root folder and generate files
```bash
composer archive create -t dir -n network
```
5. Install the runtime environment to the network
```bash
composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName tracker-sample
```
6. Deploy the created file to the network and start it
```bash
composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile tracker-sample@0.0.2.bna --file networkadmin.card
```
Enjoy!

You may need to update your network using the following command:
```bash
composer network update -a tracker-sample@0.0.2.bna -c admin@tracker-sample
```

Or reset the network (WILL CLEAR ALL DATA)
```bash
composer network reset --card admin@tracker-sample
```

