import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 8000; 

app.listen(PORT, ()=>{console.log(`Server running on PORT: ${PORT}`)}); 
