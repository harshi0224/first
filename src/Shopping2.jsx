import React from "react";
import axios from "axios";
function Shopping2(){
    var [products,setproducts]=React.useState([])
    var [cart,setcart]=React.useState([])
    React.useEffect(function(){
      axios.get('https://fakestoreapi.com/products')
      .then((res)=>{
        var items = res.data.map((y)=>{
          return {...y,IsProductInCart:false,count:0}
      });
        setproducts(items)
      })
    },[]);
   
    
    function addtocart(i){
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
    function remove(b,ind){
        var temp=[...cart]
        temp.splice(ind,1)
        setcart(temp,ind)
        var y=products.findIndex((c)=>{
            return (c.id===b.id);
        });
        products[y].IsProductInCart=false
        products[y].count=0
    }
    return(
        <div className="d-flex flex-wrap">
            <div style={{width:'55%'}}>
            <center><h1>PRODUCTS</h1></center>
            <ul className="d-flex flex-wrap">
            {
                products.map((a,i)=>{
                    return <div className="card shadow-lg p-3 rounded m-4 " style={{width: '14rem',backgroundColor:'orange'}}>
                    
                    <div className="card-body d-flex flex-column justify-content-between">
                        <img src={a.image} style={{height:'160px',width:'160px'}} alt="Card image cap"/>
                        <h5 className="card-title">{a.title}</h5>
                        <p className="card-text">{a.price}</p>
                    <div>
                    
                    <button  className="btn btn-info" onClick={()=>{addtocart(i)}}  disabled={a.IsProductInCart?true:false}>{a.IsProductInCart?'Added':'Add to Cart'}</button>
                      
                      
                    </div>
                      
                    </div>
                  </div>
                })
            }
           </ul>
            </div>
            <div className='p-3' style={{position:'fixed',overflowY:'scroll',height:'100%',right:'35px',width:'45%',border:'5px dashed black'}}>
                <center ><h1>Cart</h1>
                <h1 style={(cart.length===0)?{display:'block'}:{display:'none'}}>Your Cart is Empty</h1></center>

               {
                cart.length>0 && cart.map((b,ind)=>{
                    return <div className="card shadow-lg  rounded  m-2 mb-4" style={{backgroundColor:'orange'}} >
                       <div className="card-body d-flex justify-content-between" >
                            <center><img src={b.image} style={{height:'90px',width:'90px'}} alt="Card image cap"/></center>
                            <h5 className="card-title mb-5">{b.title}</h5>
                            <p className="card-text">${(b.count*b.price).toFixed(2)}</p></div>
                    <div><center style={{position:'absolute',bottom:'20px',left:'120px'}}>
                    <button className="btn btn-info" onClick={()=>{dec(ind)}} disabled={b.count===1?true:false}>-</button>
                    <span>{b.count}</span>
                    <button className="btn btn-info" onClick={()=>{inc(ind)}}>+</button>
                    <button className="btn btn-info" style={{position:'absolute',left:'100px'}} onClick={()=>{remove(b,ind)}}>Remove</button></center>
                    </div>
                    
                    
                    </div>
                    
                })
               }
                <div style={(cart.length===0)?{display:"none"}:{display:"block"}}>
                    
                <div style={{border:'1px dashed black'}}></div>
                <b >TOTAL PRICE : <span style={{position:'absolute',left:'85%'}}>$
                {
                    cart.reduce((t,p)=>{
                        t+=p.price*p.count
                        return t;
                    },0).toFixed(2)
                }
                </span>
                </b>
                </div>
            </div>
           
        </div>
    )
}
export default Shopping2;
