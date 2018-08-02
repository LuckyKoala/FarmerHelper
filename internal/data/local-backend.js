import initialArticle from './local-initial-data/article.json';
//import initialCarousel from './local-initial-data/carousel.json';
import initialUser from './local-initial-data/user.json';
import initialField from './local-initial-data/field.json';
import initialPerson from './local-initial-data/person.json';
import initialMachine from './local-initial-data/machine.json';
import initialMessage from './local-initial-data/message.json';
let schema = require('js-schema');

let shouldInit = true;

class Data {
    constructor(key, initialData) {
        this.key = key;
        if(shouldInit) this.data = initialData;
        else this.loadAll();
    }

    save(obj) {
        storage.save({
	          key: this.key,
	          id: obj.id,
	          data: obj,
        });
    }

    add(obj) {
        this.data.append(obj);
        this.save(obj);
    }

    update(id, val) {
        this.data[id] = val;
        this.save(val);
    }

    filter(predicate) {
        return this.data.filter(predicate);
    }

    get(id) {
        return this.data[id];
    }

    getAll() {
        return this.data.slice();
    }

    saveAll() {
        this.data.map(val => this.save(val));
        storage.save({
            key: 'system',
            id: 'init',
            data: true
        });
    }

    loadAll() {
        storage.getAllDataForKey(this.key).then(vals => {
            this.data = vals;
        });
    }
}

let article = new Data('article', initialArticle);
let user = new Data('user', initialUser);
let field = new Data('field', initialField);
let person = new Data('person', initialPerson);
let machine = new Data('machine', initialMachine);
let message = new Data('message', initialMessage);

function checkInitStatus() {
    storage.load({
	      key: 'system',
	      id: 'init'
    }).then(ret => {
        shouldInit = ret;
    }).catch(err => {
        shouldInit = true;
	      console.warn(err.message);
    });
}

module.exports = {
    article,
    user,
    field,
    person,
    machine,
    message,
    checkInitStatus
};

class Database {
    //农民信息
    //简历信息

    //农田信息
    //招聘信息

    //个人讯息
    //交易信息
    //信用评价
    //动态历史
    //钱包信息
}
