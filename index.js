class EZRest {
    
    constructor(characters){
        this.characters = characters
    }

    static openEZRest() {
		if (EZRest.requestor === undefined)
        console.log('it is undefined..')
			EZRest.requestor = new EZRestRequestor();
        console.log('not gettin hgere')
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



Hooks.on('getSceneControlButtons', EZRest.getSceneControlButtons)
