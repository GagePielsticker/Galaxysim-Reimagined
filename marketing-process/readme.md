# Marketing Process

Pretty simple process that connects to Top.gg, sets up a webhook to recieve votes, stores votes in mongodb, and post stats.

## Installing Dependencies
Navigate to the root directory and run the following. You will also need [mongodb](http://mongodb.com/) server running so the data stores.
```bash
npm install
```

## Usage
Once the dependencies are installed navigate to `src/settings.json` and enter the appropriate information for the bot. Then simply open terminal or whatever process and run the `npm start` script from the root directory.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.