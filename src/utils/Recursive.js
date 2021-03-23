class Recursive {
    reorder(source, parent = 0, ids){
        if(source.length){
            for(let i in source){
                let item = source[i];
                if(item.parent_id == parent || item.id == parent){
                    ids.push(item.id);
                    let cloneSource = [...source];
                    cloneSource.splice(i, 1);
                    this.reorder(cloneSource, item.id, ids);
                }
            }
        }
    }
}

export default new Recursive();