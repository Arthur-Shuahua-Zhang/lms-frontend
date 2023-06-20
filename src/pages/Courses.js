import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';





export default function Course() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('jwt');

            if (!token) {
                console.error('No token found');
                return;
            }

            const response = await fetch('http://localhost:8082/course', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                setCourses(responseData);
            } else {
                console.error('Error fetching protected resource');
            }
        };

        fetchData();
    }, []);


    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>

            {courses.map((course, index) => (

               <Card sx={{ maxWidth: 345, margin: '20px'}} key={index}>
               <CardMedia
                 component="img"
                 alt=""
                 height="140"
                 image={course.url}
               />
               <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                   {course.title}
                 </Typography>
                 <Typography gutterBottom variant="h8" component="div">
                   {course.author}
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   {course.description}
                 </Typography>
               </CardContent>
               <CardActions>
                 <Button size="small">Add To List</Button>
                 <Button size="small">Learn</Button>
                 <Button size="small">Share</Button>
               </CardActions>
             </Card>
            ))}
        </div>
    );
}