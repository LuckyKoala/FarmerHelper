import initialArticle from './local-initial-data/article.json';
//import initialCarousel from './local-initial-data/carousel.json';
import initialUser from './local-initial-data/user.json';
import initialField from './local-initial-data/field.json';
import initialPerson from './local-initial-data/person.json';
import initialMachine from './local-initial-data/machine.json';

class Data {
    constructor(initial) {
        this.data = initial;
    }

    create(obj) {
        obj.id = this.data.length;
        return obj;
    }

    add(obj) {
        this.data.append(this.create(obj));
        return this.data.length;
    }

    remove(id) {
        this.data.splice(id, 1);
    }

    filter(predicate) {
        return this.data.filter(predicate);
    }

    getAll() {
        return this.data.slice();
    }
    //TODO 轮播信息（筛选）
}

let article = new Data(initialArticle);
let user = new Data(initialUser);
let field = new Data(initialField);
let person = new Data(initialPerson);
let machine = new Data(initialMachine);

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

module.exports = {
    article,
    user,
    field,
    person,
    machine,
};
