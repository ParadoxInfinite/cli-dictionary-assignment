const dataset = require('./dataset.json')
function findSynonyms(word){
    if(dataset[word]){
        return dataset[word].synonyms;
    }
}
module.exports = {
    findSynonyms
}