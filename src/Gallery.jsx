import React from "react";
import axios from "axios";
function Gallery(){
    var [photos,setPhotos]=React.useState([])
    var [album,setAlbum]=React.useState([])
    React.useEffect(function(){
      axios.get('https://picsum.photos/v2/list')
      .then((res)=>{
        console.log(res.data)
        var gallery = res.data.map((y)=>{
          return {...y,IsImageInGallery:false}
      });
        setPhotos(gallery)
      });
    },[]);
    
    function addtoGallery(i){
       var temp=[...photos]
       temp[i].IsImageInGallery=true;
       setAlbum([...album,temp[i]])
    } 


    function remove(b,ind){
        var temp=[...album]
        temp.splice(ind,1)
        setAlbum(temp,ind)
        var x=photos.findIndex((c)=>{
            return (c.id===b.id)
        })
        photos[x].IsImageInGallery=false;
    }
    return(
        <div className="d-flex flex-wrap">
            <div style={{width:'55%'}}>
            <center><h1>IMAGES</h1></center>
            <ul className="d-flex flex-wrap">
            {
                photos.map((a,i)=>{
                    return <div className="image card shadow-lg p-2 m-3 bg-light" style={{width: '14rem'}}>
                    
                    <div className="card-body d-flex flex-column justify-content-between">
                        <img src={a.download_url} style={{height:'160px',width:'160px'}}/>
                        <div className="gallery" onClick={()=>{addtoGallery(i)}}>Add to Gallery</div>
                    </div>  
                    
                  </div>
                })
            }
           </ul>
            </div>
            <div style={{position:'fixed',overflowY:'scroll',height:'100%',right:'35px',width:'45%',border:'5px dashed black'}}>
                <center><h1>Gallery</h1>
                <h3 style={(album.length===0)?{display:'block'}:{display:'none'}}>Your Gallery is Empty</h3></center>
                <ul className="d-flex flex-wrap m-2">
               {
                album.length>0 && album.map((b,ind)=>{
                    return <div className="card shadow-lg  rounded  m-2 mb-4 bg-light" style={{width: '14rem'}} >
                       <div className="card-body d-flex flex-column justify-content-between">
                        <center><img src={b.download_url} style={{height:'160px',width:'160px'}} alt="Card image cap"/></center>
                        
                    <div>
                    
                    <center><button className="btn btn-info mt-2" onClick={()=>{remove(b,ind)}}>Remove</button></center>
                      
                      
                    </div>
                      
                    </div>
                  </div>
                    
                })
               }
               </ul>
                
            </div>
           
        </div>
    )
}
export default Gallery;