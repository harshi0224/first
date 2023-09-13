import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
function Meal(){
    var [food,setFood] = React.useState([])
    React.useEffect(function(){
      axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res)=>{
        console.log(res.data)
        var items = res.data.meals
        setFood(items)
    })
    
    },[])
    return (
        <div style={{display:'flex',flexWrap:'wrap'}}>
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

            
        </div>
        
   )
    
    
}
export default Meal;