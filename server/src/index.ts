import 'dotenv/config'
import app from "./server";

app.listen(8000,() => {
    console.log('Server is running at 8000');
})

export default app;