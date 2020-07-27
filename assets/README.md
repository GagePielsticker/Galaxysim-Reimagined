# Project Structure

### Bot Process
- Handles bot interinteraction of the api

### REST API process 
- Handles all the functionality & database interactions

### Database 
- Accessed through the API process
- MongoDB

### Cronjob Process
- Handles all automatic functions
- Regenerations in game

### Marketing Process
- Handles publishing guild counts to various sites and hosting the voting web hook for rewards

### Data

#### Keys
- REST API: `f8*Fj**jfsjen#flkj..148`
- Marketing - Webhook auth: `ad#%slkjfl#%askdfjas#%$#%lfj831452#%98352#*(%%(@*uiwttutub#))`

#### Database
- Defined as `gsim`
- collections: `user_data, user_analytics, bot_analytics, guilds`

#### Dates
- All dates are stored in unix MS time `new Date()`

### Github commit content
```
**Describe here what you added/deleted/made changes to**

## Semantic Versioning
- [ ] - **Major changes (new commands, events, tasks, etc)**
- [ ] - **Minor changes (renaming functions)**
- [ ] - **Revision (spelling)**```
