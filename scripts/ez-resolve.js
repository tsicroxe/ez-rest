class EZRestResolve extends Application {
    constructor(actors, data) {
        super()
        this.actors = actors
        this.data = data
    }

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.title = game.i18n.localize("EZRest.Title");
        options.id = "ez-resolve";
        options.template = "modules/ez-rest/templates/ez-resolve.html";
        options.closeOnSubmit = false;
        options.popOut = true;
        options.width = 400;
        options.height = 300;
        options.classes = ["ez-rest", "ez-rest-requestor"];
        console.log('options', options)


        return options;
    }
    async getData() {
        // Returns data to the template

                // Only re-render if needed
                console.log('getting data', this.data)

                const data = this.data
                const actors = this.actors
        return {
            data,
            actors
        }
      
    }

    hack(){
        
    }

    render(force, context={}) {

        const {action, data} = context;
        if (action && !["create", "update", "delete"].includes(action)) return;
        if (action === "update" && !data.some(d => "character" in d)) return;
        if (force !== true && !action) return;
        return super.render(force, context);
      }

    

}
