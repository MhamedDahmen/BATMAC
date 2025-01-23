import React, { useState } from 'react';
import axios from 'axios';
import DeletePost from './DeletePost';

const Post = ({post}) => {
    const [isEditing, setIsEditing]= useState(false);
    const[editedSlug, setEditSlug] = useState ("");








    const handleEdit =()=>
    {
        const data = {
           title:post.title,
           author:post.author,
           slug: editedSlug ? editedSlug : post.slug
        }
        axios.put('http://127.0.0.1:8000/blog/update/' + post.id, data).then(()=>{
         setIsEditing(false) ;
        })
         
    }


    return (
        
            <div className='article'>
            <div className='card-header'>
          <h3>{post.author}</h3>
          <em>{post.title}</em>
          <em>postée le {post.published}</em>
          {
              isEditing ? (
                  <textarea onChange={(e)=> setEditSlug(e.target.value)}></textarea>
              ) : (
              <p>{editedSlug ? editedSlug : post.slug}</p>
              )}
          <div>
          {
                isEditing ? (
                    <button onClick={handleEdit}>Valider</button>
                ):(
                    <button onClick={()=> setIsEditing(true) }>Edit</button>
                )
            }

           <DeletePost id={post.id} />
           


          </div>
        </div>
        </div>
    );
};

export default Post;