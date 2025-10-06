import React from 'react'

const CollectionCard = ({title, author, description, coverImg}) => {
  return (
    <div>
        <img src={coverImg}></img>
        <p>{title}</p>
        <p>By: {author}</p>
        <p>{description.slice(0, 10)}</p>
    </div>
  )
}

export default CollectionCard