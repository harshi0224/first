import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
function Meal(){
    var [food,setFood] = React.useState([])
    var[item,setItem]=React.useState([])
    React.useEffect(function(){
      axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res)=>{
        console.log(res.data)
        var items = res.data.meals
        setFood(items)
    })
    
    },[]);
    function addtoCart(i){
        var temp=[...food]
        temp[i].IsItemInCart=true;
        setItem([...item,temp[i]])
    }
    function remove(b,ind)
    {
        let delconfirm=window.confirm("Are you sure you want to delete this image?")
        if(delconfirm){
            var temp=[...item]
            temp.splice(ind,1)
            setItem(temp)
        }
        var x=food.findIndex((c)=>{
            return (c.id===b.id)
        })
        food[x].IsItemInCart=false;
    }
    return (
        <div style={{display:'flex',flexWrap:'wrap'}}>
            <div style={{width:'30%'}}>
                <center class="underline"><h1>ITEMS</h1></center>
                <ul className='d-flex flex-wrap'>
            {
                food.map((a)=>{
                    return <Card sx={{ maxWidth: 345, minWidth:250 }}>
                            <CardMedia
                            sx={{ height: 140 }}
                            image={a.strMealThumb}
                            />
                            <Typography gutterBottom variant="h5" component="div">
                            {a.strMeal}
                            </Typography>
                            </Card>
                })
            }
                </ul>
            </div>
            
        </div>
 
        
   )
    
    
}
export default Meal;