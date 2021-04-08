class EZRestRequestor extends FormApplication {
    constructor(...args) {
        super(...args)
        game.users.apps.push(this)
        this.roles = 
        [
            {title: "Hunting", name: 'hunting', defaultDC: 15},
            {title: "Camp Camouflage", name: 'camouflage', defaultDC: 10},
            {title: "Cooking", name: 'cooking', defaultDC: 10},
            {title: "First Guard", name: 'guardOne', defaultDC: 10},
            {title: "Second Guard", name: 'guardTwo', defaultDC: 10}]
    }

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.title = game.i18n.localize("EZRest.Title");
        options.id = "ez-rest";
        options.template = "modules/ez-rest/templates/ez-rest.html";
        options.closeOnSubmit = true;
        options.popOut = true;
        options.width = 800;
        options.height = 1000;
        options.classes = ["ez-rest", "ez-rest-requestor"];
        console.log('options', options)


        return options;
    }

    async getData() {
        // Returns data to the template
        const users = game.users.entities;
        let actors = []
        users.forEach(user => {
            if(!user.character){
                return;
            }
            actors.push(user.character);
        })
        const roles = this.roles
        return {
            actors,
            users,
            roles,
        };
    }

    activateListeners(html) {
        super.activateListeners(html);
        // this.element.find(".")
        // this.element.find(".select-all").click((event) => this.setActorSelection(event, true));
        // this.element.find(".deselect-all").click((event) => this.setActorSelection(event, false));
        // this.element.find("select[name=user]").change(this._onUserChange.bind(this));
        // this.element.find(".ezrest-save-presets").click((event)  => {
        //     console.log(event)
        // });
        // this.element.find(".lmrtfy-actor").hover(this._onHoverActor.bind(this));
        // this._onUserChange();
    }

    render(force, context={}) {
        // Only re-render if needed
        const {action, data} = context;
        if (action && !["create", "update", "delete"].includes(action)) return;
        if (action === "update" && !data.some(d => "character" in d)) return;
        if (force !== true && !action) return;
        return super.render(force, context);
      }

    async _resolveRolls(formData) {
        console.log('FORMADATAFDLKAJFADF', formData)

        let results = []

        this.roles.forEach(role => {
            console.log('')
            console.log('')

            let characterId = formData[role.name + '-user']
            if(characterId.length < 1){
                return;
            }
            

            let success = false;
            let autoSuccessName = role.name + '-auto-success'
            if(formData[autoSuccessName]){
                success = true;
            }
            

            
        

            let character = game.actors.get(characterId)
            console.log(`Now rolling for ${role.name} with ${character.name}`)

            let skills = character.data.data.skills
            console.log('skills', skills)
            let skillUsed = ''
            switch (role.name) {
                case "hunting":
                    skillUsed = 'sur'
                    break;
                case "cooking":
                    skillUsed = 'nat'
                    break;
                case "camouflage":
                    skillUsed = 'ste'
                    break;
                case "guardOne":
                    skillUsed = "prc"
                    break;
                case "guardTwo":
                    skillUsed = "prc"
                    break;
                default: "No match"
            }
            console.log(skillUsed)
            console.log(skills[skillUsed])

            let rolls = []

            let hasAdvantage = false;
            let hasAdvantageName = role.name + '-has-advantage'
            if(formData[hasAdvantageName]){
                hasAdvantage = true;
            }

            rolls.push(Math.floor((Math.random()*20)+1));
            if(hasAdvantage){
                rolls.push(Math.floor((Math.random()*20)+1));
            }
            let modifier = skills[skillUsed].total
            let total = 0
            rolls.forEach(roll => {
                console.log('roll', roll)
                console.log('total', total)
                if(roll > total){
                    total = roll;
                }
            })

            console.log('skills used total', skills[skillUsed].total)
            total += skills[skillUsed].total

            let dcName = role.name + '-dc'
            console.log(characterId)

            let dc = formData[dcName]

            if(total >= dc){
                success = true;
            }

            console.log('')
            console.log('')

            results.push({
                autoSuccess: formData[autoSuccessName],
                success,
                role: role.title,
                character,
                skillUsed,
                rolls,
                dc,
                modifier,
                total,
                hasAdvantage
            })

            console.log('results', results)

        })
        return results;

    }

    async _updateObject(event, formData) {
        console.log('formData: ', formData)
        //here we'll execute our rolls


        let results = await this._resolveRolls(formData);
        formData.results = results;
        const socketData = formData

        game.socket.emit('module.ez-rest', socketData);
        // Send to ourselves
        EZRest.onMessage(socketData);
        ui.notifications.info(game.i18n.localize("Sent Update"))
    }
    

}
