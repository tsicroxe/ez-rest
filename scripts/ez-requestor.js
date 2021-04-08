class EZRestRequestor extends FormApplication {
    constructor(...args) {
        super(...args)
        game.users.apps.push(this)
        this.roles = 
        [
            {title: "Hunting", name: 'hunting', defaultDC: 10},
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
        this.roles.forEach((role) => {
            console.log(formData)
        })
    }

    async _updateObject(event, formData) {
        console.log('formData: ', formData)
        //here we'll execute our rolls

        let roll = Math.floor((Math.random()*20)+1)
        formData.roll = roll

        let results = this._resolveRolls();

        const socketData = formData

        game.socket.emit('module.ez-rest', socketData);
        // Send to ourselves
        EZRest.onMessage(socketData);
        ui.notifications.info(game.i18n.localize("Sent Update"))
    }
    

}
