class EZRest {

    static async init() {
        game.settings.register('ez-rest', 'enableHunterRole', {
          name: game.i18n.localize('EZRest.EnableHunterRole'),
          hint: game.i18n.localize('EZRest.EnableHunterRoleHint'),
          scope: 'client',
          config: true,
          type: Boolean,
          default: true,
          onChange: (value) => console.log('value', value)
        });
      }

    static openEZRest() {
		if (EZRest.requestor === undefined)
            console.log('undefined here?')
			EZRest.requestor = new EZRestRequestor();
		EZRest.requestor.render(true);
    }


    static getSceneControlButtons(buttons) {
		let tokenButton = buttons.find(b => b.name == "notes")

		if (tokenButton) {
			tokenButton.tools.push({
				name: "Camp",
				title: 'EZ Rest',
				icon: "fas fa-bed",
				visible: game.user.isGM,
				onClick: () => EZRest.openEZRest(),
                button: true
			});
		}
	}

    static ready() {
        console.log('ready is called')
        game.socket.on('module.ez-rest', EZRest.onMessage);

        EZRest.abilities = CONFIG.DND5E.abilities;
        EZRest.skills = CONFIG.DND5E.skills;
        EZRest.saves = CONFIG.DND5E.abilities;

    }

    static activeUsers() {
        let users = game.users.entities
        let activeUsers = []
        users.forEach((user) => {
            if(user.active){
                activeUsers.push(user)
            }
        })
        console.log(activeUsers)
        return activeUsers;
    }

    static onMessage(data) {
        console.log("CALLING ON MESAGE")
        console.log("EZRest data: ", data)
        // if (data.user === "character" &&
        //     (!game.user.character || !data.actors.includes(game.user.character.id)))
        //     return;
        // else if (!["character", "tokens"].includes(data.user) && data.user !== game.user.id)
        //     return;
        // let actors = [];
        // if (data.user === "character")
        //     actors = [game.user.character];
        // else if (data.user === "tokens")
        //     actors = canvas.tokens.controlled.map(t => t.actor).filter(a => data.actors.includes(a.id));
        // else
        //     actors = data.actors.map(id => game.actors.get(id));
        // actors = actors.filter(a => a);
        // if (actors.length === 0) return;
        
        let users = game.users.entities
        let activeUsers = []
        users.forEach((user) => {
            if(user.active){
                activeUsers.push(user)
            }
        })
        
        console.log("data data data", data)

        new EZRestResolve(actors, data).render(true);
    }

}


Hooks.once('init', EZRest.init);
Hooks.on('ready', EZRest.ready);
Hooks.on('getSceneControlButtons', EZRest.getSceneControlButtons)
