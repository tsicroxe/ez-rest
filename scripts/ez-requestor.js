class EZRestRequestor extends FormApplication {
    constructor(...args) {
        super(...args)
        game.users.apps.push(this)
    }

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.title = game.i18n.localize("EZRest.Title");
        options.id = "ezrest";
        options.template = "modules/ez-rest/templates/ez-rest.html";
        options.closeOnSubmit = false;
        options.popOut = true;
        options.width = 800;
        options.height = 1000;
        options.classes = ["ezrest", "ezrest-requestor"];

        return options;
    }

    async getData() {
        // Returns data to the template
        const actors = game.actors.entities;
        const users = game.users.entities;
        const roles = [{name: "Hunting", notGuard:true},{name: "Camp Camouflage", notGuard:true},{name: "Cooking", notGuard:true},{name: "Guards", notGuard:false}]

        return {
            actors,
            users,
            roles
        };
    }

    render(force, context={}) {
        // Only re-render if needed
        const {action, data} = context;
        if (action && !["create", "update", "delete"].includes(action)) return;
        if (action === "update" && !data.some(d => "character" in d)) return;
        if (force !== true && !action) return;
        return super.render(force, context);
      }
    

}
