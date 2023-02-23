import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './RecommendedShows.css';

export default function RecommendedShows({ referencedShowId, categories }) {
    const products = useSelector((state) => state.products);
    const [productByCat, setProductByCat] = useState([])

    useEffect(() => {
        // console.log('categories', categories)
        // console.log('products', products)
        const filteredProducts = products.filter((p) => {
            console.log('product: ', p); 
            
            
            //Si el id de un pdto es = al id del pdto de ProductDetails da false
            if (p.id === referencedShowId) return false;

            //Sino, filtramos dentro de las cat del pdto
            return p.Categories.filter((c) => {
                //dentro de la cat que viene del detail tomamos la q tienen
                //el mismo id que viene de Detail y da true o false
                const isCategoryIncluded = categories.includes(c.id)
                console.log('category: ', c.id, isCategoryIncluded);

                console.log('isCategoryIncluded', isCategoryIncluded)
                return isCategoryIncluded;
            }).length > 0
        })
        console.log('filteredPRoducts', filteredProducts)
        setProductByCat(filteredProducts.slice(0, 3));
    }, [referencedShowId, categories, products])


    return (
        <div className='recommended_section'>
            {console.log('productByCat: ', productByCat)}
            {productByCat.map((p) => {
                return (
                    <div className='recommended_section_container'>
                        <Link className='recommended_link' to={`products/${p.id}`}>
                            <div className='recommended_section_photo'>
                                <img src={p.Photos[0].Path} alt="" />
                            </div>
                            <div className='recommended_section_info'>
                                <h2 className='recommended_section_h2'>{p.name}</h2>
                                <p className='recommended_section_text'>{p.startDate}</p>
                                <p className='recommended_section_text'>{p.Artist.Name}</p>
                                <h3 className='recommended_section_price'>${p.Price}</h3>
                            </div>
                        
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
