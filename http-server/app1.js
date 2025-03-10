const http = require("http");
const fs = require("fs");
const PORT = 6100;
// Для запуска сервера необходимо 
http.createServer(function(request, response){
       
    console.log(`Запрошенный адрес: ${request.url}`);
    // Получаем путь до файла после слеша
    const filePath = request.url.substring(1);
    // Проверяем наличие файла
    fs.access(filePath, fs.constants.R_OK, err => {
        // При ошибке - выводим сообщение об ошибке
        if(err){
            response.statusCode = 404;
            response.end("Error 404: Page not found!");
        }
        else{
            fs.createReadStream(filePath).pipe(response);
        }
      });
}).listen(PORT, function(){
    console.log(`Server started at ${PORT}`);
});