class EZRest {
    
    constructor(characters){
        this.characters = characters
    }

    static async init() {
        game.settings.register('ezrest', 'enableHunterRole', {
          name: game.i18n.localize('EZRest.EnableHunterRole'),
          hint: game.i18n.localize('EZRest.EnableHunterRoleHint'),
          scope: 'client',
          config: true,
          type: Boolean,
          default: true,
          onChange: (value) => LMRTFY.onThemeChange(value)
        });
      }

    static openEZRest() {
		if (EZRest.requestor === undefined)
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

}


Hooks.once('init', EZRest.init);

Hooks.on('getSceneControlButtons', EZRest.getSceneControlButtons)
