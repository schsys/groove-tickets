import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function RecommendedShows({categories}) {
    const products = useSelector((state) => state.products);
    const [productByCat, setProductByCat] = useState([])


    useEffect(() => {
        console.log('categories', categories)
        console.log('products', products)
        setProductByCat(products.filter((p) => p.categories.filter((c) => categories.includes(c.Id)).length > 0
        ))
    }, [categories, products])

    console.log('products', products)
   
  return (
    <div className='recommended_section'>
        {productByCat.map((p) => {
            return(
                <div>
                    <h2>p.name</h2>
                    <h2>Titulo o algo</h2>
                </div>
            )
        })}
       
     
        <p>HOla categories</p>
    </div>
  )
}
