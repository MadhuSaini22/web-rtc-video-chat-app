const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

//const { socket } = require("server/router");
//const { isFunction } = require("util");
const io = require("socket.io")(server, {
    cors: {
        origin:"*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client','build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
})

io.on('connection',(socket) => {
    socket.emit('me',socket.id);

    socket.on('disconnect',() => {
        d=socket.broadcast.emit("callended");
        
    });
    socket.on("calluser", ({userToCall,signalData,from,name}) => {
        io.to(userToCall).emit("calluser", { signal: signalData,from,name});
    });

    socket.on("answercall",(data) => {
        io.to(data.to).emit("callaccepted", data.signal);
    });
})

server.listen(PORT,() =>console.log(`Server listening on port ${PORT}`));