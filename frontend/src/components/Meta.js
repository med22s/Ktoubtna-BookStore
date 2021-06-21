import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({keywords,title,description}) => {
    return (
        <Helmet>

            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
            
        </Helmet>
    )
}



Meta.defaultProps={
    title:'Welcome To Ktoubtna',
    description: 'Get you favorite book right now !',
    keywords: 'books, buy books, classics,novels'
}

export default Meta
