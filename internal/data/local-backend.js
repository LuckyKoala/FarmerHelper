import initialArticle from './local-initial-data/article.json';
//import initialCarousel from './local-initial-data/carousel.json';
import initialUser from './local-initial-data/user.json';
import initialField from './local-initial-data/field.json';
import initialPerson from './local-initial-data/person.json';
import initialMachine from './local-initial-data/machine.json';
import initialMessage from './local-initial-data/message.json';

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var storage = new Storage({
	  size: 1000,
	  storageBackend: AsyncStorage,
	  defaultExpires: null,
	  enableCache: true,
	  sync : {
		    // we'll talk about the details later.
	  }
});

class Data {
    constructor(key, initialData) {
        this.key = key;
        this.initialData = initialData;
    }

    async init() {
        try {
            let hasInit = await storage.load({
                key: 'systemInit',
                id: this.key
            });
            if(!hasInit) {
                this.initialData.map(val => this.save(val));
                await storage.save({
                    key: 'systemInit',
                    id: this.key,
                    data: true
                });
            }
        } catch(err) {
	          console.warn(err.message);
            this.initialData.map(val => this.save(val));
            await storage.save({
                key: 'systemInit',
                id: this.key,
                data: true
            });
        }
    }

    save(obj) {
        storage.save({
	          key: this.key,
	          id: obj.id,
	          data: obj,
        });
    }

    add(obj) {
        this.save(obj);
    }

    update(id, val) {
        this.save(val);
    }

    filter(predicate) {
        return this.getAll().then(vals => vals.filter(predicate));
    }

    get(id) {
        return storage.load({
	          key: this.key,
	          id: id
        });
    }

    getAll() {
        return storage.getAllDataForKey(this.key);
    }
}

let article = new Data('article', initialArticle);
let user = new Data('user', initialUser);
let field = new Data('field', initialField);
let person = new Data('person', initialPerson);
let machine = new Data('machine', initialMachine);
let message = new Data('message', initialMessage);
let currentUser = new Data('currentUser', [{ id: 0, userId: -1 }]);

module.exports = {
    article,
    user,
    field,
    person,
    machine,
    message,
    currentUser
};
