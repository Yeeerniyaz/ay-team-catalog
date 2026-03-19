# Используем самый легкий образ Nginx
FROM nginx:stable-alpine

# Копируем конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем твою локальную сборку (папку dist) в папку сервера
# Перед билдом образа на ноуте должна быть запущена команда npm run build
COPY dist /usr/share/nginx/html

# Открываем порт
EXPOSE 80

# Запускаем сервер
CMD ["nginx", "-g", "daemon off;"]