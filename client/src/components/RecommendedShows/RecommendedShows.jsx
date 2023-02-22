import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function RecommendedShows({ referencedShowId, categories }) {
    const products = useSelector((state) => state.products);
    const [productByCat, setProductByCat] = useState([])

    useEffect(() => {
        // console.log('categories', categories)
        // console.log('products', products)
        const filteredProducts = products.filter((p) => {
            console.log('product: ', p); 
            
            if (p.id === referencedShowId) return false;

            return p.Categories.filter((c) => {
                const isCategoryIncluded = categories.includes(c.id)
                console.log('category: ', c.id, isCategoryIncluded);

                return isCategoryIncluded;
            }).length > 0
        })
        setProductByCat(filteredProducts);
    }, [referencedShowId, categories, products])

    console.log('products', products)

    return (
        <div className='recommended_section'>
            {console.log('productByCat: ', productByCat)}
            {productByCat.map((p) => {
                return (
                    <div>
                        <h2>{p.name}</h2>
                    </div>
                )
            })}


            <p>HOla categories</p>
        </div>
    )
}
