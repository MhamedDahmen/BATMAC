import React from 'react';
import axios from 'axios';

const DeletePost = ({id}) => {
       
    const handleDelete =()=> {
        axios.delete('http://127.0.0.1:8000/blog/delete/'+ id);
        window.Location.reload();
    };
 



    return (
      
         <button onClick={()=>{
          if(window.confirm('voulez vous supprimez cet article')){
              handleDelete();
          }
     }}>Supprimer</button>
        
    );
};

export default DeletePost;