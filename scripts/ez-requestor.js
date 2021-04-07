class EZRestRequestor extends FormApplication {
    constructor(...args) {
        super(...args)
        game.users.apps.push(this)
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
                console.log('no character, returning early')
                return;
            }
            actors.push(user.character);
        })
        const roles = 
                    [
                        {title: "Hunting", name: 'hunting', notGuard:true, defaultDC: 10},
                        {title: "Camp Camouflage", name: 'camouflage', notGuard:true, defaultDC: 10},
                        {title: "Cooking", name: 'cooking', notGuard:true, defaultDC: 10},
                        {title: "Guards", name: 'guards', notGuard:false, defaultDC: 10}]

        return {
            actors,
            users,
            roles,
        };
    }

    activateListeners(html) {
        super.activateListeners(html);
        console.log(html)
        // this.element.find(".")
        // this.element.find(".select-all").click((event) => this.setActorSelection(event, true));
        // this.element.find(".deselect-all").click((event) => this.setActorSelection(event, false));
        // this.element.find("select[name=user]").change(this._onUserChange.bind(this));
        // this.element.find(".lmrtfy-save-roll").click(this._onSubmit.bind(this));
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

    async _updateObject(event, formData) {
        console.log("Start of _updateObject")
        console.log('event: ', event)
        console.log('formData: ', formData)
        // const socketData = {
        //     formData
        // }
        // console.log("updating objects", event, formData)

        // game.socket.emit('module.ez-rest', socketData);
        // // Send to ourselves
        // EZRest.onMessage(socketData);
        // ui.notifications.info(game.i18n.localize("Sent Update"))
    }
    

}
