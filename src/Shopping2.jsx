import React from "react";
import axios from "axios";
function Shopping2(){
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
   
    function addtocart(i){
      var temp=[...products]
      temp[i].IsProductInCart=true
       temp[i].count++
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
        var delremove = window.confirm("Are You sure to remove from the cart");
        if(delremove){
        var temp=[...cart]
        temp.splice(ind,1)
        setcart(temp,ind)
        var p = products.findIndex((c)=>{
            return (c.id===b.id);
        })
        products[p].IsProductInCart=false;
        products[p].count=0;
    }
    }
    return(
        <div class="d-flex flex-wrap">
            <div style={{width:'55%'}}>
            <div class="d-flex flex-wrap">
            {
                products.map((a,i)=>{
                    return <div  class="card p-3 mb-5 rounded m-4 text-emphasis-info" style={{width: '14rem',backgroundColor:"orange",boxShadow:"20px"}}>
                    <img src={a.image} style={{height:'160px',width:'160px'}} alt="Card image cap"/>
                    <div class="card-body d-flex flex-column justify-content-between"  >
                      <h5 class="card-title">{a.title}</h5>
                      <p class="card-text text-success" >Price:{"$ "+a.price}</p>
                    <div>
                        <button  class="btn btn-info shopping" onClick={(ev)=>{addtocart(i)}}  disabled={a.IsProductInCart?true:false}>{(a.IsProductInCart)?"Added":"Add to cart"}</button>
                    </div>
                    </div>
                    </div>
                    })
            }
            </div>
            </div>
            <div class='p-3'style={{width:'45%',border:'3px dashed black',position:"fixed",height:"100%",overflowY:"scroll",right:"30px"}}>
                <center><h1 style={(cart.length===0)?{display:"block"}:{display:"none"}}>Your Cart is Empty</h1></center>
                {
                cart.length>0 && cart.map((b,ind)=>{
                    return <div class="card justify-content-between" style={{backgroundColor:"orange",marginBottom:"20px"}}>
                        <img src={b.image} style={{height:'80px',width:'80px',marginTop:"10px",borderRadius:"50%"}} alt="Card image cap"/>
                        <p class="card-title" style={{position:'absolute',left:"200px",marginTop:'10px',marginRight:'50px',color:'black'}}>{b.title}</p>
                       <div class="card-body d-flex justify-content-between" >
                       <button class="btn btn-info" style={{marginRight:"20px"}} onClick={()=>{dec(ind)}} disabled={b.count===1?true:false}>-</button>
                       <span style={{position:'absolute',left:'62px'}}>{b.count}</span>
                       <button class="btn btn-info" style={{position:'absolute',left:'90px'}}  onClick={()=>{inc(ind)}}>+</button>
                       <button class="btn btn-danger" style={{position:'absolute',left:'180px'}} onClick={()=>{remove(b,ind)}}>Remove</button>
                       <p class="card-text text-success" style={{fontSize:"large",fontWeight:"bold"}}>Price:{"$ "+ b.price*b.count}</p>
                    </div>
                    </div>
                    })
                    }
                <div style={(cart.length===0)?{display:"none"}:{display:"block"}}>
                    <p style={(cart.length===0)?null:{border:"2px dashed black"}}></p>
                    <h3 >Total Price : <span style={{position:"absolute",right:"40px"}} class="text-success">$
                    {
                    cart.reduce((acc,p)=>{
                        acc+=p.price*p.count
                        return acc;
                        setcart([acc])
                    },0).toFixed(2)
                    }
                    </span>
                    </h3>
                </div>
            </div>
            
           
        </div>
    )
}
export default Shopping2;