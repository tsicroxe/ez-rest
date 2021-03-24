class EZRestRequestor extends FormApplication {
    constructor(...args) {
        super(...args)
        game.users.apps.push(this)
    }

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.title = game.i18n.localize("EZRest.Title");
        options.id = "ezrest";
        options.template = "modules/ez-rest/templates/index.html";
        options.closeOnSubmit = false;
        options.popOut = true;
        options.width = 600;
        options.height = "auto";
        options.classes = ["ezrest", "ezrest-requestor"];

        return options;
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
