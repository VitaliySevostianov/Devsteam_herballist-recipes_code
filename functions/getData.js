import { db }                   from '../../content/DB.js'
import { fillPage, fillImages } from '../Redux/actions'


export const getData = (store, table) => {
    // console.log(db)
    db.transaction(tx => {
        // console.log(tx)
        tx.executeSql(`SELECT * FROM ${table}`, [], ((tx, results) => {
            console.log(tx)
            const rows = results.rows;

            let items = []
            let images = []

            for (let i = 0; i < rows.length; i++) {
                items.push({
                    ...rows.item(i),
                });
                if(table == 'Article'){
                    if(rows.item(i).img_path == null){
                        images[i] = `FILLER`
                    }else{
                        images[i] = `${(rows.item(i).img_path)}`
                    }
                    
                }else{
                    images[i] = `${(rows.item(i).html.match(/\/\w{4,9}\/\d{1,5}.jpg/))}`
                }
                images[i] = images[i].replace(/\.jpg/, '')
            }
                    
         

            store.dispatch(fillPage(items))
            store.dispatch(fillImages(images))
        }))
    })
}