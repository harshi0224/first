import React from "react";
import axios from "axios";
function Shopping(){
    var [products,setproducts]=React.useState([])
    var [cart,setcart]=React.useState([])
    React.useEffect(function(){
      axios.get('https://fakestoreapi.com/products')
      .then((res)=>{
        var products = res.data.map((y)=>{
          return {...y,IsProductInCart:false,count:0,total:0}
      });
        setproducts([...products])
      })
    },[])
   
    function addtocart(a,i,t){
       var temp=[...products]
       temp[i].IsProductInCart=true;
       temp[i].count++;
       setcart([...cart,temp[i]])
    }
    function inc(i){
      var temp=[...cart]
       temp[i].count++
        setcart(temp)
    }
    function dec(i){
      var temp=[...cart]
       temp[i].count--
        setcart(temp)
    }
    function remove(ind){
        var temp=[...cart]
        temp.splice(ind,1)
        setcart(temp,ind)
        

    }
    return(
        <div className="d-flex flex-wrap">
            <div style={{width:'55%'}}>
                <h1>Products</h1>
            <ul className="d-flex flex-wrap">
            {
                products.map((a,i)=>{
                    return <div  className="card shadow-lg p-3 mb-5 bg-white rounded m-4 bg-info-subtle text-emphasis-info" style={{width: '14rem'}}>
                    
                    <div className="card-body d-flex flex-column justify-content-between"  >
                    <img src={a.image} style={{height:'160px',width:'160px'}} alt="Card image cap"/>
                      <h5 className="card-title">{a.title}</h5>
                      <p className="card-text">{a.price}</p>
                      
                      <div>
                    
                      <button  className="btn btn-info" onClick={()=>{addtocart(a,i)}}  disabled={a.IsProductInCart?true:false}>Add to cart</button>
                      
                      
                      </div>
                      
                    </div>
                  </div>
                })
            }
           </ul>
            </div>
            <div className='p-3'style={{width:'45%',border:'5px dashed black'}}>
                <center><h1>Cart</h1></center>

               {
                cart.length>0 && cart.map((b,ind)=>{
                    return <div className="card shadow-lg bg-white rounded m-2 bg-info-subtle text-emphasis-info ">
                       <div className="card-body d-flex justify-content-between" >
                            <center><img src={b.image} style={{height:'90px',width:'90px'}} alt="Card image cap"/></center>
                            <h5 className="card-title">{b.title}</h5>
                            <p className="card-text">{b.count*b.price}</p></div>
                    <div><center style={{position:'absolute',bottom:'20px',left:'250px'}}>
                    <button className="btn btn-info" onClick={()=>{dec(ind)}} disabled={b.count===1?true:false}>-</button>
                    <span>{b.count}</span>
                    <button className="btn btn-info" onClick={()=>{inc(ind)}}>+</button>
                    <button className="btn btn-info" style={{position:'absolute',left:'200px'}} onClick={()=>{remove(ind)}}>Remove</button></center>
                    </div>
                    
                    
                    </div>
                    
                })
               }
               <div style={{border:'2px dashed black'}}></div>
                <h2>Total Price</h2>
            </div>
           
        </div>
    )
}
export default Shopping;
