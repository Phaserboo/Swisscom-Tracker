# TRACKER UI - A GUI for blockchain based business process optimizer

> This is a live demo of data and transaction management for the TRACKER project

**Supported versions**
hyperledger-composer 0.18.2 and higher
hyperledger-fabric Fabric 1.1 and higher
node.js v8.9.x and higher
npm v8.9.x and higher

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
4. Start the playground
```bash
export FABRIC_VERSION=hlfv11
composer-playground
```
**How to run**
0. Go to the network folder, follow in tutorial and deploy the backend related code to the Hyperledger Fabric blockchain
1. Install dependencies
```bash
npm install
```
2. Run the rest API server using admin network card you have created during the step 0.
```bash
composer-rest-server -c admin@tracker-sample -n always -p 5000
```
3. Step into the client/app folder
4. Run the node.js server
```bash
npm start
```
5. The default browser should open (http://localhost:8080)

Enjoy!
