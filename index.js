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

        game.settings.register('ez-rest', 'enableCampCamouflageRole', {
            name: game.i18n.localize('EZRest.EnableCampCamouflageRole'),
            hint: game.i18n.localize('EZRest.EnableCampCamouflageRoleHint'),
            scope: 'client',
            config: true,
            type: Boolean,
            default: true,
            onChange: (value) => console.log('value', value)
          });

        game.settings.register('ez-rest', 'enableCampCookRole', {
            name: game.i18n.localize('EZRest.EnableCampCookRole'),
            hint: game.i18n.localize('EZRest.EnableCampCookRoleHint'),
            scope: 'client',
            config: true,
            type: Boolean,
            default: true,
            onChange: (value) => console.log('value', value)
        });
      
        game.settings.register('ez-rest', 'enableGuardOneRole', {
            name: game.i18n.localize('EZRest.EnableGuardOneRole'),
            hint: game.i18n.localize('EZRest.EnableGuardOneRoleHint'),
            scope: 'client',
            config: true,
            type: Boolean,
            default: true,
            onChange: (value) => console.log('value', value)
        });

        game.settings.register('ez-rest', 'enableGuardTwoRole', {
            name: game.i18n.localize('EZRest.EnableGuardTwoRole'),
            hint: game.i18n.localize('EZRest.EnableGuardTwoRoleHint'),
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
        let users = game.users.entities
        let activeUsers = []
        users.forEach((user) => {
            if(user.active){
                activeUsers.push(user)
            }
        })
        

        new EZRestResolve(actors, data).render(true);
    }

}


Hooks.once('init', EZRest.init);
Hooks.on('ready', EZRest.ready);
Hooks.on('getSceneControlButtons', EZRest.getSceneControlButtons)
