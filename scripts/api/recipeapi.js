class Api {
    constructor(url) {
        this._url = url;
    }

    async get() {
        return fetch(this._url)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                return res.recipes
            })
            .catch((err) => console.log("an error occurs", err));
    }
}

class RecipesApi extends Api {
    constructor(url) {
        super(url);
    }

    async getRecipe() {
        console.log(' get recipe ' + this.get())
        return await this.get();
    }
}