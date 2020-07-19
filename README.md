![Travic CI](https://travis-ci.com/GagePielsticker/Galaxysim-Reimagined.svg?token=bfVU7nuj6pEJvLPvtLmZ&branch=master&status=unknown)
# GalaxySim: Re-Imagined

GalaxySim is a space based MMO / RPG where players explore, fight, and colonize the infinite number of randomly generated star systems and planets.

## Project Structure
I styled this to be a pseudo-micro service styled backend. This includes seperating out ideas to their own process isntead of a more monolithic approach. This can be potentially harder to maintain but allows for much more flexability when scaling. The project currently has a REST API which handles the core functionality of the game, a bot integration for discord which is pretty much a middleman for api & the end user, a task process which handles all the cronjob / automated task of the game which wouldnt scale well with the rest api, and a marketing process which handles posting data to advertising websites such as Top.gg or bots.gg.

## Gameplay

### Key Features
- Procedurally Generated Map with millions of star systems
- One map / world for all users
- Player interaction & Roleplay
- Currently in Alpha stages of development, many updates to come

### Guide
Specific command usages / help type .help {command name}

Below is a guide of the game in its current state.

### Making an account
To make an account use any of the game commands available, and one will automatically be generated for you.

### Map
The map is a grid spanning from -1000 -&gt; 1000 on both x and y axis. 
Each coordinate pair (star system) has its own unique planets, resources, and asteroid belts. 
It is randomly generated as explored.

### Movement
To move you ship from one system to another, you will need to use the .warp {x} {y} command.
Warping takes time and fuel to do.

### Fuel
As you move around you will need fuel, you have two options. You can mine ore and use the .process {#}command to process fuel blocks, OR g$return to return to your closest colony to refuel for free or local trade system.

### Scanning
To find information about the system you are in and its planets, use .scan

### Colonies
Colonies are a big part of the game. To colonize planets simply scan a system and find a planet you want to place a colony on, then use g$colonize {planet-name} to colonize it for a price.

### Colonies and money
To grow your population of your colonies, you will need to invest money into them with the .invest {colony} {#}.
As your colonies population grows, so does the profit it generates and the speed of generation.
To generate money at a colony it requires raw ore (mined asteroids). To deposit asteroids in your colony from your ship use .deposit ore {colony} {#}.

### Bots & Automation
To automate the gathering of ores generating passive income you will need to buy miner bots for your colony. You can do so with .bots buy mining {#} {colony}.
NOTE: They consume asteroids in system so be careful of how many you put per system...

### Mining
To mine star systems asteroids, find a system that has plenty with .scan, then use .mine. This will activate your mining lasers and will take time depending on how much yield your lasers bring.

### Alliances
Alliances and corporations are a good way to team up with your friends and conquest space together. There are many commands associated with alliances, so i will list them below.is the general idea.

Alliance General Commands
- .ally create {name}
- .ally join {name}
- .ally leave
- .ally stats
- .ally members
- .ally invest {amount}

Alliance owner commands
- .ally apps list {#}
- .ally apps accept {#}
- .ally apps deny {#}
- .ally disband
- .ally kick {user}
- .ally set description {string}
- .ally set tax {%}
- .ally set home {x} {y}

### Upgrades
If you want to upgrade your ships subsystems, you can do so. Simple use .upgrade {type} {amount}
The current upgrade types available are as below
- mining
- warp
- scan
- attack
- defence

### Bounties
You can place bounties on users or add to their existing bounty with .bounty add {user} {#}

### Leaderboards
There are many leaderboards available to see the best of the best. The leaderboard commands are listed below.
- .leaderboard user credits {#}
- .leaderboard user colonies {#}
- .leaderboard alliance credits {#}
- .leaderboard alliance members {#}

### Quick Info
To quickly view your position use .pos
To quickly view your balance use .bal

### Side-Notes
Voting on DBL gives user a 20% industry boost for 12 hours.

Thanks to all the voters!~

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
