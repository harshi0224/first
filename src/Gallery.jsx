import React from "react";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";

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
        let delConfirm=window.confirm("Are you sure you want to delete this image?")
        if(delConfirm){
          var temp=[...album]
          temp.splice(ind,1)
          setAlbum(temp)
        }
        var x=photos.findIndex((c)=>{
            return (c.id===b.id)
        })
        photos[x].IsImageInGallery=false;
    }
    return(
        <div className="d-flex flex-wrap">
            <div style={{width:'55%'}}>
            <center class="underline"><h1>IMAGES</h1></center>
            <ul className="d-flex flex-wrap">
            {
                photos.map((a,i)=>{
                    return <div className="image  m-3">
                    
                    <div className="card-body d-flex flex-column" style={{position:'relative'}}>
                        <img src={a.download_url} style={{height:'160px',width:'160px',borderRadius:'10px'}}/>
                        <button className="gallery"  onClick={()=>{addtoGallery(i)}} disabled={a.IsImageInGallery?true:false}>{a.IsImageInGallery?'Added':'Add to Gallery'}</button>
                    </div>  
                    
                  </div>
                })
            }
           </ul>
            </div>
            <div style={{position:'fixed',overflowY:'scroll',height:'100%',right:'25px',width:'46%',border:'5px dashed black'}}>
                <center class="underline"><h1>Gallery</h1>
                <h3 style={(album.length===0)?{display:'block'}:{display:'none'}}>Your Gallery is Empty</h3></center>
                <ul className="d-flex flex-wrap m-2">
               {
                album.length>0 && album.map((b,ind)=>{
                    return <div className="m-2 mb-4 ">
                       <div className="card-body d-flex flex-column" style={{position:'relative'}}>
                        <center><img src={b.download_url} style={{height:'149px',width:'149px',borderRadius:'130px'}} alt="Card image cap"/></center>    
                        <span onClick={()=>{remove(b,ind)}} style={{position:'absolute',left:'118px',fontSize:'large',top:'3px',backgroundColor:'white',color:'blue',borderRadius:'100%'}}>{<AiFillCloseCircle></AiFillCloseCircle>}</span>
                        {/* <center><button className="btn btn-info mt-2" onClick={()=>{remove(b,ind)}}>Remove</button></center> */}
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